// Este código asume que React, ReactDOM, y window.YT están cargados en el entorno global.

// ----------------------------------------------------------------------
// UTILERÍAS Y LÓGICA DE VIDEO (SIN CAMBIOS)
// ----------------------------------------------------------------------

const CONTROLS_TIMEOUT = 3000; 
const YT = window.YT; 

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
// COMPONENTE ReproductorEnFoco (Reproductor a Pantalla Completa)
// ----------------------------------------------------------------------

function ReproductorEnFoco({ videoUrl, onBack }) {
    const { videoId, isYouTube } = obtenerVideoInfo(videoUrl);
    const playerRef = React.useRef(null); 
    const playerContainerRef = React.useRef(null); 
    const backButtonRef = React.useRef(null); 
    
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [showControls, setShowControls] = React.useState(true); 
    const [currentTime, setCurrentTime] = React.useState(0); 
    const [duration, setDuration] = React.useState(0);
    const [bufferedPercent, setBufferedPercent] = React.useState(0); 

    const timeoutRef = React.useRef(null); 
    const progressIntervalRef = React.useRef(null); 
    const isPlayingRef = React.useRef(false); 

    const startProgressInterval = React.useCallback(() => {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
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
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (isPlayingRef.current) { 
             timeoutRef.current = setTimeout(() => {
                 setShowControls(false);
             }, CONTROLS_TIMEOUT);
        }
    }, []);

    React.useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    React.useEffect(() => {
        // Foco al contenedor principal y al botón de Volver si los controles están visibles
        if (playerContainerRef.current) playerContainerRef.current.focus();
        if (showControls && backButtonRef.current) backButtonRef.current.focus();
    }, [showControls]);

    React.useEffect(() => {
        if (!isYouTube || !videoId || !window.YT) return;

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
                        if (timeoutRef.current) clearTimeout(timeoutRef.current);
                        setShowControls(true); 
                    }
                }
            }
        });

        return () => {
            stopProgressInterval(); 
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (playerRef.current && typeof playerRef.current.destroy === 'function') {
                playerRef.current.destroy();
                playerRef.current = null;
            }
        };
    }, [videoId, isYouTube, startProgressInterval, stopProgressInterval, resetControlTimeout]); 
    
    const handleOnBack = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        onBack();
    }
    
    const handleKeyDown = (e) => {
        if (!isYouTube) return; 

        resetControlTimeout(); 

        switch (e.key) {
            case 'Enter':
            case ' ': 
                e.preventDefault(); 
                playerRef.current?.getPlayerState() === YT.PlayerState.PLAYING ? playerRef.current.pauseVideo() : playerRef.current.playVideo();
                break;
            case 'ArrowLeft': 
                e.preventDefault(); 
                playerRef.current?.seekTo(playerRef.current.getCurrentTime() - 10, true);
                break;
            case 'ArrowRight': 
                e.preventDefault(); 
                playerRef.current?.seekTo(playerRef.current.getCurrentTime() + 10, true);
                break;
            case 'Escape': 
            case 'Backspace': 
            case 'Back': // Para TV Remotes
            case 'BrowserBack': // Para TV Remotes
                e.preventDefault();
                handleOnBack(); 
                break;
            default:
                break;
        }
    };

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
    
    const BackIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>;

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
                         {/* Fallback para videos externos o si YT no carga */}
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

                {/* CONTROLES SIMPLIFICADOS (Barra Fina y Botón Volver) */}
                {isYouTube && (
                    <div 
                        className={`absolute top-0 bottom-0 w-full flex flex-col p-10 
                                transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                        style={{maxWidth: '100%', maxHeight: '100%'}} 
                    >
                        {/* Contenedor del Botón Volver (Arriba a la izquierda) */}
                        <div className="flex justify-start w-full absolute top-5 left-5 p-5">
                             <button
                                ref={backButtonRef}
                                onClick={handleOnBack}
                                className="flex items-center space-x-2 p-2 rounded-full bg-gray-800/80 text-white shadow-lg transition-all duration-200 hover:bg-red-700 
                                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900" 
                                title="Volver al catálogo"
                                tabIndex={showControls ? 0 : -1}
                            >
                                <BackIcon />
                                <span className="text-xs">Volver</span>
                            </button>
                        </div>


                        {/* Contenedor de la barra de progreso (Abajo) */}
                        <div className="flex flex-col justify-end h-full w-full">
                            <div className="flex items-center space-x-3 w-full bg-gradient-to-t from-gray-900/90 to-transparent py-3 px-5">
                                
                                <span className="text-sm font-mono text-gray-300 whitespace-nowrap">{formatTime(currentTime)}</span>
                                
                                <div 
                                    className="progress-bar-container w-full bg-gray-600 rounded-full cursor-pointer group h-[2px] relative" 
                                    // tabIndex=-1: Se maneja con las flechas del D-Pad en el div principal.
                                    tabIndex={-1} 
                                    title="Barra de Progreso"
                                >
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-gray-400 opacity-50 rounded-full" 
                                        style={{ width: `${bufferedPercent}%` }}
                                    ></div>
                                    <div 
                                        className="progress-fill bg-red-600 rounded-full group-hover:bg-red-500 relative h-full" 
                                        style={{ width: `${progressPercent}%` }}
                                    ></div>
                                </div>

                                <span className="text-sm font-mono text-gray-300 whitespace-nowrap">{formatTime(duration)}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// COMPONENTES DE CATÁLOGO
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
                    tabIndex="0" // CRUCIAL para navegación D-Pad
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
            // CLASE video-card para ser identificada por el D-Pad Handler
            className="video-card cursor-pointer group relative overflow-hidden bg-gray-800 rounded-xl shadow-lg 
                        transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] flex flex-col h-full
                        focus:ring-[8px] focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none focus:shadow-xl"
            onClick={() => props.onPlay(props.url)} 
            tabIndex="0" // CRUCIAL: HACE LA TARJETA ENFOCABLE
        >
            <img 
                src={thumbnailUrl} 
                onError={handleImageError} 
                className="w-full aspect-video object-cover transition duration-500 group-hover:opacity-75"
                alt={`Miniatura de ${props.titulo}`}
            />

            <div className="p-3 flex-grow">
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

function VideoCarousel({ children }) {
    // La clase 'ocultar-scrollbar' es necesaria en CSS externo si se desea ocultar el scrollbar nativo
    return (
        <div className="flex overflow-x-auto space-x-4 p-2 pb-4 items-stretch ocultar-scrollbar">
            {children}
        </div>
    );
}

function TarjetaMas({ onShowAll, count }) {
    return (
        <div 
            // CLASE video-card para ser identificada por el D-Pad Handler
            className="video-card flex-shrink-0 w-full cursor-pointer group relative overflow-hidden bg-gray-700 rounded-xl shadow-lg 
                        transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] flex flex-col items-center justify-center h-full
                        focus:ring-[8px] focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none focus:shadow-xl"
            onClick={onShowAll}
            tabIndex="0" // CRUCIAL: HACE LA TARJETA ENFOCABLE
        >
            <div className="text-center p-4">
                <p className="text-6xl font-extrabold text-white mb-2">+</p>
                <h2 className="text-xl font-bold text-white line-clamp-2">Ver Más</h2>
                <p className="text-sm text-gray-300 mt-1 font-semibold">({count} videos más)</p>
            </div>
            
            <div className="w-full aspect-video bg-gray-600/50 flex items-center justify-center flex-grow">
                <span className="text-sm text-white/70">Toca para ver la cuadrícula</span>
            </div>
        </div>
    );
}

function MasVideosGrid({ categoria, videos, onPlay, onClose }) {
    return (
        <div className="fixed inset-0 bg-gray-900/95 z-40 overflow-y-auto p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-900/90 py-2 z-10">
                    <h1 className="text-3xl font-bold text-red-600 capitalize">
                        Todos los Videos de {categoria}
                    </h1>
                    <button 
                        onClick={onClose}
                        className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-red-700 
                                   focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                        tabIndex="0" 
                    >
                        Cerrar (ESC)
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {videos.map((video, index) => (
                        <ReproductorDeVideo 
                            key={index} 
                            titulo={video.titulo} 
                            url={video.url} 
                            onPlay={onPlay} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// CATÁLOGO
// ----------------------------------------------------------------------

const CATALOGO = {
    accion: [
        { titulo: "Nephilim", url: "https://youtu.be/bd7PTHImmaI?si=95uXGaIK9s9eZPpS" },
        { titulo: "Simbad la aventura del minotauro", url: "https://youtu.be/_k3CPvhzEVA?si=HUYPMxQi2Az3sK9N" },
        { titulo: "Alien Convergence", url: "https://youtu.be/w6DKhpKjMTE?si=j-7kNNoz93l0UZk9" },
        { titulo: "Yeti el hombre de la nieve", url: "https://youtu.be/_OWD2gaWdOM?si=M-7yKl2zS51hCOvf" },
        { titulo: "Invasion letal", url: "https://youtu.be/DXmynnoZ8X8?si=iw3LVlBhXPAr5C2l" },
        { titulo: "Cazador de demonios", url: "https://youtu.be/UHvttPWH--Q?si=6yON_SdMIwywMJSC" },
        { titulo: "Target Earth", url: "https://youtu.be/cHFL7a3-2aY?si=4KHcRxuBCuWZjVxV" },
        { titulo: "40 dias y noches", url: "https://youtu.be/QdvMupiWUd8?si=2wbVNPZTkB7o8Z9b" },
        { titulo: "Legion de Heroes", url: "https://youtu.be/g4r-cpKVEos?si=5cA99gki-Nc9BYNC" },
        { titulo: "Hulk 2", url: "https://youtu.be/rf_ixD_yD_4?si=k28TepUpPchZr2TV" },
        { titulo: "Guerra de otro mundo", url: "https://youtu.be/Mr2JAzHAquo?si=62pLmQ9gmkKfQa90" },
        { titulo: "Angeles vs Zombies", url: "https://youtu.be/TVazxWtCr_E?si=q7ws8E5kkuHRZ6Qe" },
        { titulo: "Tierra perdida", url: "https://youtu.be/QVj2CVk-Nio?si=MQH3We5LeRLL3_jO" },
        { titulo: "Impacto inminente", url: "https://youtu.be/5pEFz_e7bSw?si=hyV51hXmHV7ROgux" },
        { titulo: "Supervivencia", url: "https://youtu.be/10Lzga1uDpM?si=mEYDmw8WHhMT8Vx9" },
        { titulo: "Invasion Oculta", url: "https://youtu.be/jxrT8Bb5ilA?si=X6KIR-R3q0E4WFBj" },
        { titulo: "El come huesos", url: "https://youtu.be/d-eK3h5uDho?si=Gy3NDGqI-rAG4wz-" },
        { titulo: "Bermudas Avismo en el mar del norte", url: "https://youtu.be/gwkUDXSGbxg?si=z966wQgljQviO304" },
        { titulo: "La proxima generacion", url: "https://youtu.be/ebvujopachw?si=FoZlTIM73kMVhB7o" },
        { titulo: "Secret Agent", url: "https://youtu.be/X_dGD9oapyU?si=8CHKRMbktTSTH0W_" },
        { titulo: "El secreto del Arca", url: "https://youtu.be/pQ4bcl-5so0?si=nidy7Y0Z4ig4qLaI" },
        { titulo: "Drive", url: "https://youtu.be/58yz3VijEcM?si=vitikf-8kg7LplPa" },
        { titulo: "Deep sea pithon", url: "https://youtu.be/9yS6iJSrCAk?si=fMDse0Q2ltCkRb3H" },
        { titulo: "impacto Final", url: "https://youtu.be/42uqz1rMJVE?si=VKb63Pld6X3eshC6" },
        { titulo: "Starcraft", url: "https://youtu.be/6_HQd1qnmxQ?si=rIOlxLjj_wj8L3Bk" },
        { titulo: "Venganza Mortal", url: "https://youtu.be/VtIbY43Zajg?si=IudJM1cVTfB59uX7" },
        { titulo: "Piratas del tesoro", url: "https://youtu.be/Oh2x2KqrRDg?si=x5nrT14dLRHHfpFI" },
        { titulo: "Indiana Jone el Gran circulo", url: "https://youtu.be/KONzw7qwEuA?si=X5gKKX3QzncutoIH" },
        { titulo: "La Rebelion", url: "https://youtu.be/V0nxRnf2Izs?si=O04xJbq9fsL3CIxn" },
        { titulo: "El 5to elemento", url: "https://youtu.be/iqeatp1VXVA?si=nDi2V3NTNBgjj03f" },
        { titulo: "El defensor", url: "https://youtu.be/hhnYJ9h4qXg?si=y7fi1a2zGs6K0L80" },
        { titulo: "Furia de los siglos", url: "https://youtu.be/z2FQd1m63yo?si=WoCrG87EvdH2wIkz" },
        { titulo: "Colombiana 2", url: "https://youtu.be/O8mFkQtbZBU?si=w4JVJRk8w5NCqX4r" },
        { titulo: "Peligro en el Amazonas", url: "https://youtu.be/JDOoSVKh5gc?si=On_VQV5CuB_dFo1I" },
        { titulo: "Diamantes de sangre", url: "https://youtu.be/4pa862ZDFcA?si=qFRCPE3imUfWmFLn" },
        { titulo: "Codigo de venganza", url: "https://youtu.be/T9r-ov2kfaw?si=8VSGJx4IqOAmtC6x" },
        { titulo: "Hard target", url: "https://youtu.be/ABDYUbHkf18?si=Ce0AVEwzUa55rots" },
        { titulo: "Air colision", url: "https://youtu.be/znfZrxm4Wwc?si=wDjI2OrDqB3pPYaj" },
        { titulo: "Agente de inteligencia", url: "https://youtu.be/H2ZXxag2WrM?si=SNcQ1b3-vESRGzCy" },
        { titulo: "Rescate", url: "https://youtu.be/Cci1N25m9MU?si=HjyjkXsEWZKmTMAa" },
        { titulo: "Guerra del desierto", url: "https://youtu.be/plkx8J1cxe4?si=X7KFK9VV9JecGzsK" },
        { titulo: "El renacer de los heroes", url: "https://youtu.be/mrtzpYuDNZA?si=HksJO454Rl4br0Xm" },
        { titulo: "Virus", url: "https://youtu.be/T7hhuUKl2Nc?si=ysIlmatmK79DenKe" },
        { titulo: "Tears on the sun", url: "https://youtu.be/ZwfQ1xtssIs?si=m3yMI1v5nkMQI9zT" },
        { titulo: "Fuego en los cielos", url: "https://youtu.be/Pc410AWg4gM?si=qZGwEBKqAQ7X5ajN" },
        { titulo: "Killer Shark", url: "https://youtu.be/lqBOR1N_XU8?si=g-hgKcgdwsaObzac" },
        { titulo: "Comodo vs Cobra", url: "https://youtu.be/37O8qW7WBCI?si=HuN9_lxGrcoB3OHH" },
        { titulo: "Comodo", url: "https://youtu.be/YQ8jHZZIRVc?si=mkt64P-dpd98DmGV" },
        { titulo: "Black Waterk", url: "https://youtu.be/6fiaMiJJ9MA?si=fbTiVDzt-9EIsVdm" },
        { titulo: "D-railed", url: "https://mitelefe.com/vivo/" } 
    ],
    thriller: [
        { titulo: "Jeepers Creepers", url: "https://youtu.be/hmKnm2jH_2Y?si=2qWanAyVpHHkUAWo" },
        { titulo: "La Profesora Psicopata", url: "https://youtu.be/fbdupvcfO6Q?si=fIRyTIZP0PFZbwUA" },
        { titulo: "The ninth gate", url: "https://youtu.be/QskN9E6mCFk?si=iiRzaIMOX5yTxQQM" },
        { titulo: "Pasajeros", url: "https://youtu.be/sg4HgAHmRac?si=3eH3jOjcPmqf3agq" },
        { titulo: "Cazadores del mas alla", url: "https://youtu.be/eww-r8o-JOc?si=xARiJSGOx4KM0DVk" },
        { titulo: "Identidad alterada", url: "https://youtu.be/Huoda3CKCBY?si=0Sl_sRT2ekJ2a6yC" },
        { titulo: "Calificaciones Mortales", url: "https://youtu.be/_j2VVJSwpy4?si=GJZ9I1bUlXYufDFr" },
        { titulo: "Tumba abierta", url: "https://youtu.be/F1MQUkFKwjU?si=DG-mKXkPJxAQspbJ" },
        { titulo: "Jeepers creepers 2", url: "https://youtu.be/2oX9KsBtVfY?si=tmODVRS9CkBTYLz_" },
        { titulo: "Jeepers Creepers 3", url: "https://youtu.be/q6XSShKe-9c?si=LsECidR-qCG1r4JN" },
        { titulo: "Sombra en la pared", url: "https://youtu.be/GJZ9I1bUlXYufDFr" },
        { titulo: "El coleccionista", url: "https://youtu.be/DG-mKXkPJxAQspbJ" },
    ],
    comedia: [
        { titulo: "Donha", url: "https://youtu.be/NcdYo_eMv4U?si=t_oDPCj8TNRQNVkC" },
        { titulo: "El Mud", url: "https://youtu.be/RAFQBNlL0aw?si=Mpk5QJx6tYE0_RNC" },
        { titulo: "La aventura de Aladino", url: "https://youtu.be/fsSryNsqPDY?si=4DJz6qAjS1tbotxj" },
        { titulo: "En nombre de mis hijos", url: "https://youtu.be/7XpgTVBfo9k?si=FYyZxENw-ttKZSZS" },
        { titulo: "Bajo un mismo techo", url: "https://youtu.be/4My3KEB8QIo?si=Hu0nZivaJlaMrne8" },
        { titulo: "Un dia de locos", url: "https://youtu.be/4My3KEB8QIo?si=Hu0nZivaJlaMrne8" },
    ]
};

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL APP (D-Pad Handler Implementado)
// ----------------------------------------------------------------------

function App() {
    const [videoEnFocoUrl, setVideoEnFocoUrl] = React.useState(null);
    const [mostrarMasGrid, setMostrarMasGrid] = React.useState(null); 
    const heroButtonRef = React.useRef(null); 

    const handleBack = React.useCallback(() => {
        setVideoEnFocoUrl(null);
        setTimeout(() => {
            if (heroButtonRef.current) {
                // Devolvemos el foco al botón principal para reanudar la navegación D-Pad.
                heroButtonRef.current.focus();
            }
        }, 50); 
    }, []);

    // ------------------------------------------------------
    // CONTROLADOR DE NAVEGACIÓN D-PAD FORZADA (MEJORADO)
    // ------------------------------------------------------
    const handleDpadNavigation = React.useCallback((event) => {
        if (videoEnFocoUrl || mostrarMasGrid) return; 

        const currentFocusedElement = document.activeElement;
        
        // Obtener todos los elementos enfocables visibles
        const focusableElements = Array.from(
            document.querySelectorAll('button[tabindex="0"], div.video-card[tabindex="0"]')
        ).filter(el => el.offsetParent !== null); // Solo elementos visibles

        // 1. Manejo de navegación horizontal (carruseles)
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            const isInteractiveElement = currentFocusedElement && 
                (currentFocusedElement.classList.contains('video-card') || 
                 currentFocusedElement.tagName === 'BUTTON');

            if (isInteractiveElement) {
                event.preventDefault(); 
                const currentIndex = focusableElements.indexOf(currentFocusedElement);
                let nextIndex = -1;

                if (event.key === 'ArrowRight') {
                    nextIndex = currentIndex + 1;
                    if (nextIndex >= focusableElements.length) nextIndex = -1;
                } else if (event.key === 'ArrowLeft') {
                    nextIndex = currentIndex - 1;
                    if (nextIndex < 0) nextIndex = -1;
                }
                
                const nextElement = focusableElements[nextIndex];

                if (nextElement) {
                    nextElement.focus();
                    nextElement.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest', 
                        inline: 'center' 
                    });
                }
            }
        } 
        
        // 2. Manejo del salto vertical (del botón Hero a la 1ra tarjeta)
        else if (event.key === 'ArrowDown') {
            // Si estamos en el botón del Heroe, salta a la primera tarjeta del catálogo
            if (currentFocusedElement === heroButtonRef.current) {
                event.preventDefault(); 
                const firstCard = focusableElements.find(el => el.classList.contains('video-card'));
                if (firstCard) {
                    firstCard.focus();
                    firstCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }
        
    }, [videoEnFocoUrl, mostrarMasGrid]);

    // Listener global para el D-Pad
    React.useEffect(() => {
        window.addEventListener('keydown', handleDpadNavigation);
        return () => {
            window.removeEventListener('keydown', handleDpadNavigation);
        };
    }, [handleDpadNavigation]);
    // ------------------------------------------------------

    // Foco Inicial (Asegurado)
    React.useEffect(() => {
        if (!videoEnFocoUrl && !mostrarMasGrid) {
            setTimeout(() => {
                if (heroButtonRef.current) {
                     heroButtonRef.current.focus();
                }
            }, 100);
        }
    }, [videoEnFocoUrl, mostrarMasGrid]);
    
    // Manejo del botón de escape en la cuadrícula y en el reproductor
    React.useEffect(() => {
        const handleEscape = (event) => {
            if ((event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Back') && mostrarMasGrid) {
                event.preventDefault();
                setMostrarMasGrid(null);
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [mostrarMasGrid]);


    if (videoEnFocoUrl) {
        return <ReproductorEnFoco 
            videoUrl={videoEnFocoUrl} 
            onBack={handleBack} 
        />;
    }
    
    if (mostrarMasGrid) {
        return <MasVideosGrid 
            categoria={mostrarMasGrid.categoria}
            videos={mostrarMasGrid.videos}
            onPlay={setVideoEnFocoUrl}
            onClose={() => setMostrarMasGrid(null)}
        />;
    }

    const heroVideoUrl ="https://youtu.be/bd7PTHImmaI?si=95uXGaIK9s9eZPpS";

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-gray-900 text-white">
            
            {/* HERO BANNER */}
            <HeroBanner 
                ref={heroButtonRef}
                titulo="Estreno de la Semana"
                descripcion="Nephilim: Una aventura épica de ciencia ficción."
                videoUrl={heroVideoUrl}
                onPlay={setVideoEnFocoUrl} 
            />

            {/* SECCIONES DE CATEGORÍA CON CARRUSEL Y TARJETA 'MÁS' */}
            {Object.entries(CATALOGO).map(([categoria, videos]) => {
                
                const limiteCarrusel = 10;
                const tieneMas = videos.length > limiteCarrusel;
                
                const videosEnCarrusel = tieneMas ? videos.slice(0, limiteCarrusel - 1) : videos.slice(0, limiteCarrusel);
                const videosRestantesCount = videos.length - videosEnCarrusel.length;

                return (
                    <div key={categoria} className="mb-10">
                        
                        <h1 className="text-2xl font-bold mb-4 text-red-600 capitalize">
                            {categoria}
                        </h1>

                        <VideoCarousel>
                            
                            {/* Videos Normales en el Carrusel (Moviecards) */}
                            {videosEnCarrusel.map((video, index) => (
                                <div key={index} className="flex-shrink-0 w-40 sm:w-52 lg:w-64">
                                    <ReproductorDeVideo 
                                        titulo={video.titulo} 
                                        url={video.url} 
                                    onPlay={setVideoEnFocoUrl} 
                                    />
                                </div>
                            ))}

                            {/* Tarjeta "Más" */}
                            {videosRestantesCount > 0 && (
                                <div className="flex-shrink-0 w-40 sm:w-52 lg:w-64">
                                    <TarjetaMas 
                                        count={videosRestantesCount}
                                        onShowAll={() => setMostrarMasGrid({ categoria, videos })}
                                    />
                                </div>
                            )}
                            
                        </VideoCarousel>
                    </div>
                );
            })}
        </div>
    );
}

// Montaje de la aplicación
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
