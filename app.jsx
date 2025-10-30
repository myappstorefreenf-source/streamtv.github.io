// Variables y constantes globales
const CONTROLS_TIMEOUT = 3000; 
const YT = window.YT; 

// ----------------------------------------------------------------------
// UTILERÍAS: CONVERSIÓN DE SEGUNDOS A FORMATO HH:MM:SS
// ----------------------------------------------------------------------

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';

    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts = [m, s];
    if (h > 0) {
        parts.unshift(h); 
        return parts.map(v => v.toString().padStart(2, '0')).join(':');
    }

    return parts.map(v => v.toString().padStart(2, '0')).join(':');
}

// ----------------------------------------------------------------------
// LÓGICA DE CONVERSIÓN Y EXTRACCIÓN DE ID
// ----------------------------------------------------------------------

function obtenerVideoInfo(url) {
    const defaultVideoId = 'dQw4w9WgXcQ';
    let videoId = defaultVideoId;
    let isYouTube = false;

    if (url) {
        const youtubeRegex = /(?:youtube\.com|youtu\.be)\/(?:v=|embed\/|watch\?v=|\/v\/)?([a-zA-Z0-9_-]{11})/;
        const match = url.match(youtubeRegex);

        if (match && match[1]) {
            videoId = match[1];
            isYouTube = true;
        }
    }

    if (isYouTube) {
        const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`; 
        return { videoId, thumbnailUrl, isYouTube };
    } else {
        const thumbnailUrl = "https://placehold.co/1920x1080/1F2937/fff?text=VIDEO+EXTERNO"; 
        return { videoId: null, thumbnailUrl, isYouTube: false };
    }
}

// ----------------------------------------------------------------------
// COMPONENTE ReproductorEnFoco (CON CORRECCIÓN ESTRICTA DEL REINICIO)
// ----------------------------------------------------------------------

function ReproductorEnFoco({ videoUrl, onBack }) {
    const { videoId, isYouTube } = obtenerVideoInfo(videoUrl);
    const playerRef = React.useRef(null); 
    const playerContainerRef = React.useRef(null); 
    const backButtonRef = React.useRef(null); 
    
    // Estados principales
    const [isMuted, setIsMuted] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showControls, setShowControls] = React.useState(true); 
    const [currentTime, setCurrentTime] = React.useState(0); 
    const [duration, setDuration] = React.useState(0);
    const [bufferedPercent, setBufferedPercent] = React.useState(0); 

    // Refs para temporizadores e intervalos
    const timeoutRef = React.useRef(null); 
    const progressIntervalRef = React.useRef(null); 
    const isPlayingRef = React.useRef(false); 

    // Funciones de control estables (useCallback)
    const startProgressInterval = React.useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        progressIntervalRef.current = setInterval(() => {
            const player = playerRef.current;
            if (player && typeof player.getCurrentTime === 'function') {
                setCurrentTime(player.getCurrentTime());
                setDuration(player.getDuration()); 
                const bufferedFraction = player.getVideoLoadedFraction(); 
                setBufferedPercent(bufferedFraction * 100);
            }
        }, 250); 
    }, []);

    const stopProgressInterval = React.useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    const resetControlTimeout = React.useCallback(() => {
        setShowControls(true); 

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        if (isPlayingRef.current) { 
             timeoutRef.current = setTimeout(() => {
                 setShowControls(false);
             }, CONTROLS_TIMEOUT);
        }
    }, []);

    // Sincronización de Refs y Estados
    React.useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    React.useEffect(() => {
        if (playerContainerRef.current) {
            playerContainerRef.current.focus();
        }
        if (showControls && backButtonRef.current) {
            backButtonRef.current.focus();
        }
    }, [showControls]);


    // 🚨 CORRECCIÓN CLAVE A: ESCUCHA DE TECLADO EN TODO EL DOCUMENTO (WebView Fix) 🚨
    React.useEffect(() => {
        // Solo aplica la escucha global si estamos usando YouTube (donde el iframe puede robar el foco)
        if (!isYouTube) return; 
        
        // Vincula el listener a TODO el documento. Crucial para capturar la tecla 'BrowserBack'
        document.addEventListener('keydown', handleKeyDown);

        // Función de limpieza
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isYouTube, handleKeyDown]); // Depende de isYouTube y handleKeyDown

    
    // 🔴 BLOQUE CRÍTICO: Inicialización del Reproductor 🔴
    React.useEffect(() => {
        if (!isYouTube || !videoId || !window.YT) {
            return;
        }

        const playerId = 'youtube-player-container'; 

        const newPlayer = new window.YT.Player(playerId, {
            videoId: videoId,
            playerVars: {
                'autoplay': 1,
                'controls': 0, 
                'mute': 1, 
                'disablekb': 1, 
                'widget_referrer': window.location.href
            },
            events: {
                'onReady': (event) => {
                    playerRef.current = event.target; 
                    resetControlTimeout(); 

                    if (event.target.isMuted()) {
                        event.target.unMute(); 
                        setIsMuted(false);
                    }
                },
                'onStateChange': (event) => {
                    const state = event.data;
                    
                    if (state === YT.PlayerState.PLAYING) {
                        setIsPlaying(true);
                        startProgressInterval(); 
                        resetControlTimeout(); 
                        
                    } else if (state === YT.PlayerState.PAUSED || state === YT.PlayerState.BUFFERING) {
                        setIsPlaying(false);
                        stopProgressInterval(); 
                        
                    } else if (state === YT.PlayerState.ENDED) {
                        setIsPlaying(false);
                        stopProgressInterval(); 
                        if (timeoutRef.current) {
                            clearTimeout(timeoutRef.current);
                        }
                        setShowControls(true); 
                    }
                }
            }
        });

        // Limpieza: Destruye el reproductor al desmontar el componente o cambiar el videoId.
        return () => {
            stopProgressInterval(); 
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoId, isYouTube, startProgressInterval, stopProgressInterval, resetControlTimeout]); 
    // ----------------------------------------------------------------------
    
    // LÓGICA DE CONTROL DE REPRODUCCIÓN (Toggle, Seek, Keys)
    const togglePlayPause = () => {
        const player = playerRef.current;
        if (!player) return;

        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
        resetControlTimeout();
    };

    const toggleMute = () => {
        const player = playerRef.current;
        if (!player) return;

        if (player.isMuted()) {
            player.unMute();
            setIsMuted(false);
        } else {
            player.mute();
            setIsMuted(true);
        }
        resetControlTimeout();
    };
    
    const seekRelative = (seconds) => {
        const player = playerRef.current;
        if (!player) return;

        const newTime = player.getCurrentTime() + seconds;
        player.seekTo(newTime, true); 
        setCurrentTime(newTime); 
        resetControlTimeout();
    }

    const handleSeek = (e) => {
        const player = playerRef.current;
        if (!player || duration === 0) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const percent = clickX / rect.width;
        const newTime = duration * percent;

        player.seekTo(newTime, true);
        setCurrentTime(newTime); 
        resetControlTimeout(); 
    };

    const rewind = () => seekRelative(-10); 
    const fastForward = () => seekRelative(10); 

    const handleOnBack = () => {
        // Detener el timeout para los controles antes de salir
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        // Llama a la prop onBack, que maneja el cambio de estado en el padre (App)
        onBack();
    }
    
    const handleKeyDown = (e) => {
        if (!isYouTube) return; 

        resetControlTimeout(); 

        switch (e.key) {
            case 'Enter':
            case ' ': 
                e.preventDefault(); 
                togglePlayPause();
                break;
            case 'ArrowLeft': 
                e.preventDefault(); 
                rewind();
                break;
            case 'ArrowRight': 
                e.preventDefault(); 
                fastForward();
                break;
            case 'Escape': 
            case 'Backspace':
            case 'Back': 
            case 'BrowserBack': // Captura la tecla inyectada desde Android
                e.preventDefault();
                handleOnBack(); // Ejecuta la función para volver al catálogo
                break;
            default:
                break;
        }
    };

    // Cálculo del porcentaje de progreso
    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    // ICONOS (SVG)
    const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;
    const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4.004a1 1 0 001.555.832l3.224-2.002a1 1 0 000-1.664l-3.224-2.002a1 1 0 000-1.664z" clipRule="evenodd" /></svg>;
    const PauseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 011 1v4a1 1 0 11-2 0V7a1 1 0 011-1zm-3 4a1 1 0 002 0V7a1 1 0 00-2 0v4z" clipRule="evenodd" /></svg>;
    const VolumeIcon = () => isMuted ? 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zm10.024 2.193a1 1 0 010 1.414L17.243 10l2.164 2.163a1 1 0 01-1.414 1.414L15.829 11.414l-2.163 2.164a1 1 0 01-1.414-1.414L14.414 10l-2.163-2.163a1 1 0 011.414-1.414l2.163 2.164 2.164-2.163a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 5.059a1 1 0 011.414 0 9 9 0 010 12.582 1 1 0 11-1.414-1.414 7 7 0 000-9.754 1 1 0 010-1.414zM16.071 3.645a1 1 0 011.414 0 11 11 0 010 15.69 1 1 0 11-1.414-1.414 9 9 0 000-12.862 1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
    const RewindIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8.445 14.832A1 1 0 0010 14V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4zM14.445 14.832A1 1 0 0016 14V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" /></svg>;
    const FastForwardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4zM10.555 5.168A1 1 0 009 6v8a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4z" /></svg>;
    
    return (
        <div 
            ref={playerContainerRef}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center"
            onClick={resetControlTimeout} 
            onKeyDown={handleKeyDown} 
            tabIndex={0} 
            style={{outline: 'none'}} 
        >
            <div className="w-full h-full flex flex-col items-center justify-center relative">
                <div className="w-full h-full max-w-screen-xl max-h-[80vh] relative flex items-center justify-center">
                    <div 
                        id="youtube-player-container" 
                        tabIndex="-1" 
                        className="w-full h-full aspect-video rounded-xl shadow-2xl bg-gray-900 overflow-hidden"
                    >
                        {!isYouTube && (
                            <iframe
                                tabIndex="-1" 
                                className="youtube-iframe rounded-xl shadow-2xl bg-gray-900 w-full h-full"
                                src={videoUrl}
                                allow="autoplay; fullscreen"
                                allowFullScreen
                            ></iframe>
                        )}
                    </div>
                </div>

                {/* CONTROLES COMPLETOS (Barra + Botones + Tiempos) */}
                {isYouTube && (
                    <div 
                        className={`absolute bottom-10 w-full max-w-xl flex flex-col p-4 rounded-xl shadow-2xl 
                                 transition-opacity duration-300 ${showControls ? 'opacity-100 bg-gray-800/80' : 'opacity-0 pointer-events-none'}`}
                    >
                        {/* BARRA DE PROGRESO */}
                        <div 
                            onClick={handleSeek}
                            className="progress-bar-container w-full bg-gray-600 rounded-full cursor-pointer group mb-2 h-1.5 relative"
                            tabIndex={showControls ? 0 : -1} 
                            title="Barra de Progreso (Click para Saltar)"
                        >
                            {/* INDICADOR DE BUFFER */}
                            <div 
                                className="absolute top-0 left-0 h-full bg-gray-400 opacity-50 rounded-full" 
                                style={{ width: `${bufferedPercent}%` }}
                            ></div>

                            {/* INDICADOR DE TIEMPO REPRODUCIDO */}
                            <div 
                                className="progress-fill bg-red-600 rounded-full group-hover:bg-red-500 relative h-full" 
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>

                        {/* TIEMPOS */}
                        <div className="flex justify-between text-sm font-mono text-gray-300 mb-4">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>

                        {/* Botones de Control */}
                        <div className="flex justify-center space-x-4">
                            <button 
                                onClick={handleOnBack}
                                ref={backButtonRef}
                                className="control-button text-white p-2 rounded-full bg-red-600 hover:bg-red-700 
                                         focus:ring-4 focus:ring-white focus:outline-none"
                                tabIndex={showControls ? 0 : -1} 
                                title="Volver al Catálogo (Tecla Escape)"
                            >
                                <BackIcon />
                            </button>

                            <button 
                                onClick={rewind}
                                className="control-button text-white p-2 rounded-full bg-gray-600 hover:bg-gray-700 
                                         focus:ring-4 focus:ring-white focus:outline-none"
                                tabIndex={showControls ? 0 : -1}
                                title="Retroceder 10 segundos (Tecla Izquierda)"
                            >
                                <RewindIcon />
                            </button>

                            <button 
                                onClick={togglePlayPause}
                                className="control-button text-white p-2 rounded-full bg-red-600 hover:bg-red-700 
                                         focus:ring-4 focus:ring-white focus:outline-none"
                                tabIndex={showControls ? 0 : -1}
                                title={isPlaying ? "Pausar (Tecla Enter/Espacio)" : "Reproducir (Tecla Enter/Espacio)"}
                            >
                                {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>

                            <button 
                                onClick={toggleMute}
                                className="control-button text-white p-2 rounded-full bg-gray-600 hover:bg-gray-700 
                                         focus:ring-4 focus:ring-white focus:outline-none"
                                tabIndex={showControls ? 0 : -1}
                                title={isMuted ? "Desactivar silencio" : "Silenciar"}
                            >
                                <VolumeIcon />
                            </button>

                            <button 
                                onClick={fastForward}
                                className="control-button text-white p-2 rounded-full bg-gray-600 hover:bg-gray-700 
                                         focus:ring-4 focus:ring-white focus:outline-none"
                                tabIndex={showControls ? 0 : -1}
                                title="Avanzar 10 segundos (Tecla Derecha)"
                            >
                                <FastForwardIcon />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// COMPONENTES HERO BANNER Y TARJETA 
// ----------------------------------------------------------------------

const HeroBanner = React.forwardRef(({ titulo, descripcion, videoUrl, onPlay }, ref) => {
    const { thumbnailUrl } = obtenerVideoInfo(videoUrl);

    return (
        <div 
            className="hero-background w-full min-h-[50vh] flex items-end relative overflow-hidden mb-8 rounded-xl shadow-2xl bg-cover bg-center"
            tabIndex="-1" 
            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.8)), url('${thumbnailUrl}'), url('https://placehold.co/1920x1080/0d1117/333?text=CARGANDO...')` }}
        >
            <div className="relative p-8 max-w-xl">
                <h2 className="text-4xl font-extrabold mb-2 text-white drop-shadow-lg">
                    {titulo}
                </h2>
                <p className="text-base mb-4 text-gray-200 drop-shadow-md">
                    {descripcion}
                </p>

                <button 
                    ref={ref}
                    onClick={() => onPlay(videoUrl)} 
                    className="inline-block px-6 py-2 bg-red-600 text-white font-bold rounded-lg shadow-lg 
                             transition-all duration-300 hover:bg-red-700 
                             focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none"
                    tabIndex="0" 
                >
                    Ver Ahora
                </button>
            </div>
        </div>
    );
});
HeroBanner.displayName = 'HeroBanner';


function ReproductorDeVideo(props) {
    const { videoId, thumbnailUrl, isYouTube } = obtenerVideoInfo(props.url);
    const genericPlaceholderUrl = "https://placehold.co/600x337/333/fff?text=VIDEO+EXTERNO";

    const handleImageError = (e) => {
        e.target.onerror = null; 
        if (isYouTube && videoId && e.target.src.includes('maxresdefault')) {
            e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            return;
        } 
        e.target.src = genericPlaceholderUrl;
    };

    return (
        <div 
            className="video-card cursor-pointer group relative overflow-hidden bg-gray-800 rounded-xl shadow-lg 
                         transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] 
                         focus:ring-4 focus:ring-red-500 focus:outline-none"
            onClick={() => props.onPlay(props.url)} 
            tabIndex="0" 
        >
            <img 
                src={thumbnailUrl} 
                onError={handleImageError} 
                className="w-full aspect-video object-cover transition duration-500 group-hover:opacity-75"
                alt={`Miniatura de ${props.titulo}`}
            />

            <div className="p-3">
                <h2 className="text-base font-semibold text-red-400 group-focus:text-red-300 line-clamp-2">
                    {props.titulo || "Título del Video"}
                </h2>
                <p className="mt-1 text-gray-400 text-xs">
                    Fuente: {isYouTube ? "YouTube" : "Externa"}
                </p>
            </div>

        </div>
    );
}

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL APP
// ----------------------------------------------------------------------

function App() {
    const [videoEnFocoUrl, setVideoEnFocoUrl] = React.useState(null);
    const heroButtonRef = React.useRef(null); 

    // 🚨 CORRECCIÓN CLAVE B: Aumentar el tiempo de espera para el re-enfoque 🚨
    const handleBack = React.useCallback(() => {
        setVideoEnFocoUrl(null);
        setTimeout(() => {
            if (heroButtonRef.current) {
                // Devolver el foco al botón del HeroBanner
                heroButtonRef.current.focus();
            }
        }, 50); // Tiempo incrementado (antes era 0)
    }, []);


    if (videoEnFocoUrl) {
        return <ReproductorEnFoco 
            videoUrl={videoEnFocoUrl} 
            onBack={handleBack} 
        />;
    }

    const heroVideoUrl ="https://youtu.be/bd7PTHImmaI?si=95uXGaIK9s9eZPpS";

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-gray-900 text-white">
            <HeroBanner 
                ref={heroButtonRef}
                titulo="Estreno de la Semana"
                descripcion="Controles D-Pad funcionales y catálogo optimizado."
                videoUrl={heroVideoUrl}
                onPlay={setVideoEnFocoUrl} 
            />

            <h1 className="text-2xl font-bold mb-4 text-red-600">
                Peliculas
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                <ReproductorDeVideo titulo="Nephilim" url={heroVideoUrl} onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Simbad la aventura del minotauro" url="https://youtu.be/_k3CPvhzEVA?si=HUYPMxQi2Az3sK9N" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Alien Convergence" url="https://youtu.be/w6DKhpKjMTE?si=j-7kNNoz93l0UZk9" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Yeti el hombre de la nieve" url="https://youtu.be/_OWD2gaWdOM?si=M-7yKl2zS51hCOvf" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Invasion letal" url="https://youtu.be/DXmynnoZ8X8?si=iw3LVlBhXPAr5C2l" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Otro Video Externo" url="https://external-video-url.com/video.mp4" onPlay={setVideoEnFocoUrl} />
            </div>
        </div>
    );
}

// Montaje de la aplicación
// NOTA: Esto asume que tienes ReactDOM importado o accesible globalmente (ej: usando un CDN)
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

