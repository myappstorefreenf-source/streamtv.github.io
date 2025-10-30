// Variables y constantes globales
const CONTROLS_TIMEOUT = 1000; 
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

            <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-4">
                <ReproductorDeVideo titulo="Nephilim" url={heroVideoUrl} onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Simbad la aventura del minotauro" url="https://youtu.be/_k3CPvhzEVA?si=HUYPMxQi2Az3sK9N" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Alien Convergence" url="https://youtu.be/w6DKhpKjMTE?si=j-7kNNoz93l0UZk9" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Yeti el hombre de la nieve" url="https://youtu.be/_OWD2gaWdOM?si=M-7yKl2zS51hCOvf" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Invasion letal" url="https://youtu.be/DXmynnoZ8X8?si=iw3LVlBhXPAr5C2l" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Cazador de demonios" url="https://youtu.be/UHvttPWH--Q?si=6yON_SdMIwywMJSC" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Jeppers Creepers" url= "https://youtu.be/hmKnm2jH_2Y?si=2qWanAyVpHHkUAWo" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Target Earth" url="https://youtu.be/cHFL7a3-2aY?si=4KHcRxuBCuWZjVxV" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="40 dias y noches" url="https://youtu.be/QdvMupiWUd8?si=2wbVNPZTkB7o8Z9b" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Legion de Heroes" url="https://youtu.be/g4r-cpKVEos?si=5cA99gki-Nc9BYNC" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Hulk 2" url="https://youtu.be/rf_ixD_yD_4?si=k28TepUpPchZr2TV" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Guerra de otro mundo" url="https://youtu.be/Mr2JAzHAquo?si=62pLmQ9gmkKfQa90" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Angeles vs Zombies" url="https://youtu.be/TVazxWtCr_E?si=q7ws8E5kkuHRZ6Qe" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Tierra perdida" url="https://youtu.be/QVj2CVk-Nio?si=MQH3We5LeRLL3_jO" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Donha" url="https://youtu.be/NcdYo_eMv4U?si=t_oDPCj8TNRQNVkC" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Impacto inminente" url="https://youtu.be/5pEFz_e7bSw?si=hyV51hXmHV7ROgux" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Supervivencia" url="https://youtu.be/10Lzga1uDpM?si=mEYDmw8WHhMT8Vx9" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Invasion Oculta" url="https://youtu.be/jxrT8Bb5ilA?si=X6KIR-R3q0E4WFBj" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="El come huesos" url="https://youtu.be/d-eK3h5uDho?si=Gy3NDGqI-rAG4wz-" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Bermudas Avismo en el mar del norte" url="https://youtu.be/gwkUDXSGbxg?si=z966wQgljQviO304" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="La proxima generacion" url="https://youtu.be/ebvujopachw?si=FoZlTIM73kMVhB7o" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Secret Agent" url="https://youtu.be/X_dGD9oapyU?si=8CHKRMbktTSTH0W_" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="La Profesora Psicopata" url="https://youtu.be/fbdupvcfO6Q?si=fIRyTIZP0PFZbwUA" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="El secreto del Arca" url="https://youtu.be/pQ4bcl-5so0?si=nidy7Y0Z4ig4qLaI" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Drive" url="https://youtu.be/58yz3VijEcM?si=vitikf-8kg7LplPa" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Deep sea pithon" url="https://youtu.be/9yS6iJSrCAk?si=fMDse0Q2ltCkRb3H" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="impacto Final" url="https://youtu.be/42uqz1rMJVE?si=VKb63Pld6X3eshC6" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Starcraft" url="https://youtu.be/6_HQd1qnmxQ?si=rIOlxLjj_wj8L3Bk" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Venganza Mortal" url="https://youtu.be/VtIbY43Zajg?si=IudJM1cVTfB59uX7" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="The ninth gate" url="https://youtu.be/QskN9E6mCFk?si=iiRzaIMOX5yTxQQM" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Piratas del tesoro" url="https://youtu.be/Oh2x2KqrRDg?si=x5nrT14dLRHHfpFI" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Indiana Jone el Gran circulo" url="https://youtu.be/KONzw7qwEuA?si=X5gKKX3QzncutoIH" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Pasajeros" url="https://youtu.be/sg4HgAHmRac?si=3eH3jOjcPmqf3agq" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="La Rebelion" url="https://youtu.be/V0nxRnf2Izs?si=O04xJbq9fsL3CIxn" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="El 5to elemento" url="https://youtu.be/iqeatp1VXVA?si=nDi2V3NTNBgjj03f" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Cazadores del mas alla" url="https://youtu.be/eww-r8o-JOc?si=xARiJSGOx4KM0DVk" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="El defensor" url="https://youtu.be/hhnYJ9h4qXg?si=y7fi1a2zGs6K0L80" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Identidad alterada" url="https://youtu.be/Huoda3CKCBY?si=0Sl_sRT2ekJ2a6yC" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Furia de los siglos" url="https://youtu.be/z2FQd1m63yo?si=WoCrG87EvdH2wIkz" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Colombiana 2" url="https://youtu.be/O8mFkQtbZBU?si=w4JVJRk8w5NCqX4r" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="The Mud" url="https://youtu.be/RAFQBNlL0aw?si=Mpk5QJx6tYE0_RNC" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="La aventura de Aladino" url="https://youtu.be/fsSryNsqPDY?si=4DJz6qAjS1tbotxj" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Peligro en el Amazonas" url="https://youtu.be/JDOoSVKh5gc?si=On_VQV5CuB_dFo1I" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Diamantes de sangre" url="https://youtu.be/4pa862ZDFcA?si=qFRCPE3imUfWmFLn" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Codigo de venganza" url="https://youtu.be/T9r-ov2kfaw?si=8VSGJx4IqOAmtC6x" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Hard target" url="https://youtu.be/ABDYUbHkf18?si=Ce0AVEwzUa55rots" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Air colision" url="https://youtu.be/znfZrxm4Wwc?si=wDjI2OrDqB3pPYaj" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Agente de inteligencia" url="https://youtu.be/H2ZXxag2WrM?si=SNcQ1b3-vESRGzCy" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Calificaciones Mortales" url="https://youtu.be/_j2VVJSwpy4?si=GJZ9I1bUlXYufDFr" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Rescate" url="https://youtu.be/Cci1N25m9MU?si=HjyjkXsEWZKmTMAa" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Tumba abierta" url="https://youtu.be/F1MQUkFKwjU?si=DG-mKXkPJxAQspbJ" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Jeepers creepers 2" url="https://youtu.be/2oX9KsBtVfY?si=tmODVRS9CkBTYLz_" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Jeepers Creepers 3" url="https://youtu.be/q6XSShKe-9c?si=LsECidR-qCG1r4JN" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Guerra del desierto" url="https://youtu.be/plkx8J1cxe4?si=X7KFK9VV9JecGzsK" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="El renacer de los heroes" url="https://youtu.be/mrtzpYuDNZA?si=HksJO454Rl4br0Xm" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Virus" url="https://youtu.be/T7hhuUKl2Nc?si=ysIlmatmK79DenKe" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Tears on the sun" url="https://youtu.be/ZwfQ1xtssIs?si=m3yMI1v5nkMQI9zT" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Fuego en los cielos" url="https://youtu.be/Pc410AWg4gM?si=qZGwEBKqAQ7X5ajN" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="En nombre de mis hijos" url="https://youtu.be/7XpgTVBfo9k?si=FYyZxENw-ttKZSZS" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Bajo un mismo techo" url="https://youtu.be/4My3KEB8QIo?si=Hu0nZivaJlaMrne8" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Killer Shark" url="https://youtu.be/lqBOR1N_XU8?si=g-hgKcgdwsaObzac" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Comodo vs Cobra" url="https://youtu.be/37O8qW7WBCI?si=HuN9_lxGrcoB3OHH" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Comodo" url="https://youtu.be/YQ8jHZZIRVc?si=mkt64P-dpd98DmGV" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="Black Waterk" url="https://youtu.be/6fiaMiJJ9MA?si=fbTiVDzt-9EIsVdm" onPlay={setVideoEnFocoUrl} />
                <ReproductorDeVideo titulo="D-railed" url="https://youtu.be/Ggz2LT9hVb0?si=UYnxkh9g7UH1G8uB" onPlay={setVideoEnFocoUrl} />
            </div>
        </div>
    );
}

// Montaje de la aplicación
// NOTA: Esto asume que tienes ReactDOM importado o accesible globalmente (ej: usando un CDN)
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);



