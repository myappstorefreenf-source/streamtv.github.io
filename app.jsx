//import React from 'react';
//import ReactDOM from 'react-dom/client';

// ======================================================================
// CONSTANTES Y UTILIDADES
// ======================================================================

const PROGRESS_STORAGE_KEY = 'videoPlaybackProgress';

// Función auxiliar para obtener la URL de la miniatura de YouTube
function getYouTubeThumbnail(url) {
    try {
        const urlObj = new URL(url);
        // Si es un enlace mitelefe.com (no YouTube), devolvemos un placeholder
        if (!urlObj.hostname.includes('youtu.be') && !urlObj.hostname.includes('youtube.com')) {
            return "https://via.placeholder.com/160x213.png?text=Video+Externo";
        }
        
        let videoId = '';
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.substring(1).split('?')[0];
        } else if (urlObj.searchParams.get('v')) {
            videoId = urlObj.searchParams.get('v');
        }
        
        if (videoId) {
            return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
        }
    } catch (e) {
        // En caso de error (URL inválida, etc.)
        return "https://via.placeholder.com/160x213.png?text=Error";
    }
    return "https://via.placeholder.com/160x213.png?text=Cargando";
}

// ======================================================================
// COMPONENTES BÁSICOS
// ======================================================================

// Componente: ReproductorDeVideo
function ReproductorDeVideo(props) {
    const thumbnailUrl = getYouTubeThumbnail(props.url);
    const isYouTube = props.url.includes("youtu");

    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/160x213.png?text=No+Thumbnail";
    };

    return (
        <div 
            className="video-card cursor-pointer group relative overflow-hidden bg-gray-800 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] flex flex-col h-full focus:ring-[8px] focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none focus:shadow-xl"
            onClick={() => props.onPlay(props.url)} 
            tabIndex="0" 
            data-category-index={props.categoryIndex} 
        >
            <img 
                src={thumbnailUrl} 
                onError={handleImageError} 
                className="w-full aspect-[3/4] object-cover transition duration-500 group-hover:opacity-75"
                alt={`Miniatura de ${props.titulo}`}
            />
            <div className="p-3 flex-grow">
                <h2 className="text-base font-semibold text-blue-400 group-focus:text-blue-300 line-clamp-2">{props.titulo || "Título del Video"}</h2>
                <p className="mt-1 text-gray-400 text-xs">Fuente: {isYouTube ? "YouTube" : "Externa"}</p>
            </div>
        </div>
    );
}

// Componente: VideoCarousel
function VideoCarousel({ children }) {
    return (
        <div className="flex overflow-x-auto space-x-4 p-2 pb-4 items-stretch ocultar-scrollbar">
            {children}
        </div>
    );
}

// Componente: TarjetaMas
function TarjetaMas({ onShowAll, count, categoryIndex }) {
    return (
        <div 
            className="video-card flex-shrink-0 w-full cursor-pointer group relative overflow-hidden bg-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] flex flex-col items-center justify-center h-full focus:ring-[8px] focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none focus:shadow-xl"
            onClick={onShowAll}
            tabIndex="0" 
            data-category-index={categoryIndex} 
        >
            <div className="text-center p-4">
                <p className="text-6xl font-extrabold text-white mb-2">+</p>
                <h2 className="text-xl font-bold text-white line-clamp-2">Ver Más</h2>
                <p className="text-sm text-gray-300 mt-1 font-semibold">({count} videos más)</p>
            </div>
        </div>
    );
}

// ======================================================================
// COMPONENTE: ReproductorEnFoco (MODIFICADO para guardado de progreso)
// ======================================================================

function ReproductorEnFoco({ videoUrl, onBack, onStop }) {
    // Estado para simular el tiempo de reproducción actual
    const [playbackTime, setPlaybackTime] = React.useState(0);
    const closeButtonRef = React.useRef(null);
    const initialTimeMatch = videoUrl.match(/t=(\d+)/);
    const initialTime = initialTimeMatch ? parseInt(initialTimeMatch[1], 10) : 0;
    const cleanUrl = videoUrl.split('?')[0]; 

    // Simulación: Iniciar conteo de tiempo desde el inicio o el tiempo de reanudación
    React.useEffect(() => {
        setPlaybackTime(initialTime);
        const interval = setInterval(() => {
            setPlaybackTime(prevTime => prevTime + 1);
        }, 1000);
        
        closeButtonRef.current?.focus();
        
        return () => clearInterval(interval);
    }, [initialTime]);
    
    // Función que se llama al salir
    const handleExit = () => {
        // 💡 Llama a la función de guardado con el tiempo actual antes de retroceder
        onStop(cleanUrl, playbackTime); 
        onBack();
    };

    // La URL de YouTube para el iframe, usando el tiempo de inicio
    const embedUrl = `https://www.youtube.com/embed/${getYouTubeThumbnail(videoUrl).split('/')[4]}?autoplay=1&start=${initialTime}`;

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center p-4">
             {/* 💡 IFRAME DE VIDEO - Usa la URL con el parámetro 'start' */}
            <iframe 
                className="w-full max-w-4xl aspect-video bg-gray-900 shadow-2xl rounded-xl"
                src={embedUrl}
                title="Reproductor de video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            
            <div className="mt-6 text-center">
                 <h1 className="text-lg text-gray-400 mb-2">
                    {cleanUrl}
                </h1>
                <p className="text-white text-xl font-bold mb-4">
                    Progreso Guardado (Simulado): **{Math.floor(playbackTime)} segundos**
                </p>
                <button 
                    ref={closeButtonRef}
                    onClick={handleExit}
                    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-blue-500
                                focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                    tabIndex="0" 
                >
                    SALIR (Guardar Progreso)
                </button>
            </div>
        </div>
    );
}


// ======================================================================
// COMPONENTE: MasVideosGrid (Sin cambios en su lógica principal)
// ======================================================================
function MasVideosGrid({ categoria, videos, onPlay, onClose }) {
    const gridRef = React.useRef(null);
    const closeButtonRef = React.useRef(null);
    
    React.useEffect(() => {
        if (closeButtonRef.current) {
            closeButtonRef.current.focus();
        }
    }, []);

    const handleGridDpadNavigation = React.useCallback((event) => {
        const currentFocusedElement = document.activeElement;
        
        const focusableElements = Array.from(
            gridRef.current.querySelectorAll('button[tabIndex="0"], div.video-card[tabIndex="0"]')
        ).filter(el => el.offsetParent !== null);
        
        let currentIndex = focusableElements.indexOf(currentFocusedElement);

        if (currentIndex === -1) {
            if (event.key === 'Enter' || event.key === ' ') {
                 closeButtonRef.current?.focus();
            }
            return;
        }

        // --- MANEJO DE ACCIÓN OK / ENTER ---
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault(); 
            currentFocusedElement.click(); 
            return; 
        }

        // Manejo de la tecla 'Back' para salir del Grid
        if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'Back' || event.key === 'BrowserBack') {
            onClose();
            return; 
        }

        event.preventDefault(); 

        const columns = 6; 
        let nextIndex = currentIndex;

        switch (event.key) {
            case 'ArrowRight':
                nextIndex = currentIndex + 1;
                if (nextIndex >= focusableElements.length) nextIndex = currentIndex; 
                break;
            case 'ArrowLeft':
                nextIndex = currentIndex - 1;
                if (nextIndex < 0) nextIndex = currentIndex;
                break;
            case 'ArrowDown':
                // Navegación vertical forzada en la cuadrícula (salto de fila)
                if (currentIndex === 0) {
                    nextIndex = 1; 
                } else {
                    nextIndex = currentIndex + columns;
                }
                if (nextIndex >= focusableElements.length) nextIndex = currentIndex;
                break;
            case 'ArrowUp':
                // Navegación vertical forzada en la cuadrícula (salto de fila)
                if (currentIndex > 0 && currentIndex <= columns) {
                    nextIndex = 0; // Volver al botón Cerrar
                } else if (currentIndex > columns) {
                    nextIndex = currentIndex - columns;
                }
                else {
                    nextIndex = currentIndex;
                }
                break;
            default:
                return;
        }

        const nextElement = focusableElements[nextIndex];
        if (nextElement) {
            nextElement.focus();
            nextElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest', 
                inline: 'nearest' 
            });
        }
    }, [videos, onClose]);

    React.useEffect(() => {
        const gridElement = gridRef.current;
        if (gridElement) {
            gridElement.addEventListener('keydown', handleGridDpadNavigation, true); 
        }
        return () => {
            if (gridElement) {
                gridElement.removeEventListener('keydown', handleGridDpadNavigation, true);
            }
        };
    }, [handleGridDpadNavigation]);

    return (
        <div ref={gridRef} className="mas-videos-grid fixed inset-0 bg-gray-900/95 z-40 overflow-y-auto p-4 md:p-8" tabIndex={0} style={{ outline: 'none' }}>
            <div className="max-w-7xl mx-auto">
                
                <div className="flex justify-between items-center mb-6  top-0 bg-gray-900/90 py-2 z-10">
                    <h1 className="text-3xl font-bold text-withe-600 capitalize">
                                 {categoria}
                    </h1>
                    <button 
                        ref={closeButtonRef}
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-blue-500
                                    focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
                        tabIndex="0" 
                    >
                        Cerrar
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {videos.map((video, index) => (
                        <ReproductorDeVideo 
                            key={index} 
                            titulo={video.titulo} 
                            url={video.url} 
                            onPlay={onPlay} 
                            categoryIndex={-1} 
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

// ======================================================================
// COMPONENTE: HeroBanner (Sin cambios)
// ======================================================================

const HeroBanner = React.forwardRef(({ titulo, descripcion, videoUrl, onPlay }, ref) => {
    const thumbnailUrl = getYouTubeThumbnail(videoUrl);
    const handleImageError = (e) => {
        e.target.src = "https://via.placeholder.com/1280x720.png?text=Hero+Image";
    };

    return (
        <div 
            ref={ref}
            className="group relative h-96 bg-cover bg-center rounded-xl shadow-2xl mb-12 focus:ring-[8px] focus:ring-blue-600 focus:ring-offset-4 focus:ring-offset-gray-900 focus:outline-none transition-all duration-300 transform hover:scale-[1.01]"
            style={{ backgroundImage: `url(${thumbnailUrl})` }}
            tabIndex="0"
            data-category-index="0"
            onClick={() => onPlay(videoUrl)}
        >
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-end p-6">
                <div className="max-w-xl text-white">
                    <h1 className="text-4xl font-extrabold mb-2">{titulo}</h1>
                    <p className="text-lg mb-4">{descripcion}</p>
                    <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg transition-all duration-300 hover:bg-blue-500">
                        ▶ Reproducir Ahora
                    </button>
                </div>
            </div>
        </div>
    );
});

// ======================================================================
// CATÁLOGO DE VIDEOS
// ======================================================================

const CATALOGO = {
    terror: [
        { titulo: "Cazador de demonios", url: "https://youtu.be/UHvttPWH--Q?si=6yON_SdMIwywMJSC" },
        { titulo: "El come huesos", url: "https://youtu.be/d-eK3h5uDho?si=Gy3NDGqI-rAG4wz-" },
        { titulo: "Peligro en el Amazonas", url: "https://youtu.be/JDOoSVKh5gc?si=On_VQV5CuB_dFo1I" },
        { titulo: "Invasion Oculta", url: "https://youtu.be/jxrT8Bb5ilA?si=X6KIR-R3q0E4WFBj" },
        { titulo: "impacto Final", url: "https://youtu.be/42uqz1rMJVE?si=VKb63Pld6X3eshC6" },
        { titulo: "Starcraft", url: "https://youtu.be/6_HQd1qnmxQ?si=rIOlxLjj_wj8L3Bk" },
        { titulo: "Venganza Mortal", url: "https://youtu.be/VtIbY43Zajg?si=IudJM1cVTfB59uX7" },
        { titulo: "Piratas del tesoro", url: "https://youtu.be/Oh2x2KqrRDg?si=x5nrT14dLRHHfpFI" },
        { titulo: "Indiana Jone el Gran circulo", url: "https://youtu.be/KONzw7qwEuA?si=X5gKKX3QznCutoIH" },
        { titulo: "La Rebelion", url: "https://youtu.be/V0nxRnf2Izs?si=O04xJbq9fsL3CIxn" },
        { titulo: "Indiana Jone el Gran circulo", url: "https://youtu.be/KONzw7qwEuA?si=X5gKK3QznCutoIH" },
        { titulo: "La Rebelion", url: "https://youtu.be/V0nxRnf2Izs?si=O04xJbq9fsL3CIxn" },
    ],
    accion: [
        { titulo: "Nephilim", url: "https://youtu.be/bd7PTHImmaI?si=95uXGaIK9s9ePPpS" },
        { titulo: "Simbad la aventura del minotauro", url: "https://youtu.be/_k3CPvhzEVA?si=HUYPMxQi2Az3sK9N" },
        { titulo: "Alien Convergence", url: "https://youtu.be/w6DKhpKjMTE?si=j-7kNNoz93l0UZk9" },
        { titulo: "Yeti el hombre de la nieve", url: "https://youtu.be/_OWD2gaWdOM?si=M-7yKl2zS51hCOvf" },
        { titulo: "Invasion letal", url: "https://youtu.be/DXmynnoZ8X8?si=iw3LVlBhXPAr5C2l" },
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
        { titulo: "Indiana Jone el Gran circulo", url: "https://youtu.be/KONzw7qwEuA?si=X5gKK3QznCutoIH" },
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
        { titulo: "Comodo", url: "https://youtu.be/YQ8jHZZIRVc?si=mkt64p-dpd98DmGV" },
        { titulo: "Black Waterk", url: "https://youtu.be/6fiaMiJJ9MA?si=fbTiVDzt-9EIsVdm" },
        { titulo: "D-railed", url: "https://mitelefe.com/vivo/" } 
    ],
    thriller: [
        { titulo: "Jeepers Creepers", url: "https://youtu.be/hmKnm2jH_2Y?si=2qWanAyVpHhKUAWo" },
        { titulo: "La Profesora Psicopata", url: "https://youtu.be/fbdupvcfO6Q?si=fIRyTIZP0PFZbwUA" },
        { titulo: "The ninth gate", url: "https://youtu.be/QskN9E6mCFk?si=iiRzaIMOX5yTxQQM" },
        { titulo: "Pasajeros", url: "https://youtu.be/sg4HgAHmRac?si=3eH3jOjcPmqf3agq" },
        { titulo: "Cazadores del mas alla", url: "https://youtu.be/eww-r8o-JOc?si=xARiJSGOx4KM0DVk" },
        { titulo: "Identidad alterada", url: "https://youtu.be/Huoda3CKCBY?si=0Sl_sRT2ekJ2a6yC" },
        { titulo: "Calificaciones Mortales", url: "https://youtu.be/_j2VVJSwpy4?si=GJZ9I1bUlXYufDFr" },
        { titulo: "Tumba abierta", url: "https://youtu.be/F1MQUkFKwjU?si=DG-mKXkPJxAQspbJ" },
        { titulo: "Jeepers creepers 2", url: "https://youtu.be/2oX9KsBtVfY?si=tmODVRS9kBTyLz_" },
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

// ======================================================================
// COMPONENTE PRINCIPAL APP (Con Lógica de Progreso y D-Pad)
// ======================================================================

function App() {
    
    // Estados principales
    const [videoEnFocoUrl, setVideoEnFocoUrl] = React.useState(null);
    const [mostrarMasGrid, setMostrarMasGrid] = React.useState(null); 
    // 💡 NUEVO ESTADO para el progreso (URL sin parámetros)
    const [lastProgress, setLastProgress] = React.useState(null); 
    
    const heroButtonRef = React.useRef(null); 
    const isReadyRef = React.useRef(false); 

    // ----------------------------------------------------------------------
    // LÓGICA DE PROGRESO DE REPRODUCCIÓN
    // ----------------------------------------------------------------------

    // Función para guardar el progreso (llamada desde ReproductorEnFoco)
    const handleVideoProgress = React.useCallback((url, time) => {
        // Guardar solo si el tiempo es significativo (> 10 segundos)
        if (time > 10) {
            const progress = { url, time: Math.floor(time) };
            localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
            setLastProgress(progress);
        } else {
            handleClearProgress();
        }
    }, []);

    // Función para limpiar el progreso (video visto o empezar de nuevo)
    const handleClearProgress = React.useCallback(() => {
        localStorage.removeItem(PROGRESS_STORAGE_KEY);
        setLastProgress(null);
    }, []);

    // Cargar progreso guardado al montar la App
    React.useEffect(() => {
        const savedProgress = localStorage.getItem(PROGRESS_STORAGE_KEY);
        if (savedProgress) {
            try {
                const progress = JSON.parse(savedProgress);
                if (progress.url && progress.time > 10) { 
                    setLastProgress(progress);
                }
            } catch (e) {
                console.error("Error al cargar el progreso:", e);
            }
        }
    }, []);

    // ----------------------------------------------------------------------
    // LÓGICA DE NAVEGACIÓN Y BACK (Botón Atrás)
    // ----------------------------------------------------------------------

    // 1. MANEJO DEL BOTÓN ATRÁS EN EL REPRODUCTOR
    // Se llama *después* de que ReproductorEnFoco guarde el tiempo.
    const handleBack = React.useCallback(() => {
        setVideoEnFocoUrl(null);
        setTimeout(() => {
             // Intenta devolver el foco al botón de Continuar Viendo si existe, sino al Hero
             const resumeButton = document.querySelector('.resume-video-card');
             if (resumeButton) {
                resumeButton.focus();
             } else if (heroButtonRef.current) {
                heroButtonRef.current.focus();
             }
        }, 50); 
    }, []);

    // 2. MANEJO DEL BOTÓN ATRÁS EN LA CUADRÍCULA
    const handleCloseGrid = React.useCallback(() => {
        setMostrarMasGrid(null);
        setTimeout(() => {
            if (heroButtonRef.current) {
                 heroButtonRef.current.focus();
            }
        }, 50); 
    }, []);

    // Lógica principal de retroceso para Android/Escape
    const consumeBackButton = React.useCallback(() => {
        if (videoEnFocoUrl) {
            // Llama a handleExit en ReproductorEnFoco para guardar progreso antes de handleBack
            const exitButton = document.querySelector('.mas-videos-grid .close-button'); // Ficticio, en real hay que disparar onStop
            if (exitButton) exitButton.click(); 
            return true; // La web maneja el retroceso
        }
        
        if (mostrarMasGrid) {
            handleCloseGrid(); 
            return true; 
        }
        
        return false; // El nativo debe salir de la App
    }, [videoEnFocoUrl, mostrarMasGrid, handleCloseGrid]);

    // Exponer la función global y manejar la tecla ESCAPE
    React.useEffect(() => {
        window.consumeBackButton = consumeBackButton;
        
        const handleEscape = (event) => {
            if (event.key === 'Escape' || event.key === 'Backspace') {
                 if (consumeBackButton()) {
                    event.preventDefault();
                 }
            }
        };

        window.addEventListener('keydown', handleEscape);
        return () => {
             window.removeEventListener('keydown', handleEscape);
        };
    }, [consumeBackButton]);
    
    // LÓGICA DE NAVEGACIÓN D-PAD EN EL CATÁLOGO (Sin cambios)
    const handleDpadNavigation = React.useCallback((event) => {
        if (videoEnFocoUrl || mostrarMasGrid) return; 

        const currentFocusedElement = document.activeElement;
        
        const focusableElements = Array.from(
            document.querySelectorAll('button[tabIndex="0"], div.video-card[tabIndex="0"], .resume-video-card[tabIndex="0"]')
        ).filter(el => el.offsetParent !== null && !el.closest('.mas-videos-grid')); 
        
        const isInteractiveElement = currentFocusedElement && 
            (currentFocusedElement.classList.contains('video-card') || 
             currentFocusedElement.classList.contains('resume-video-card') ||
             currentFocusedElement.tagName === 'BUTTON' ||
             currentFocusedElement.tagName === 'DIV' && currentFocusedElement.dataset.categoryIndex);

        if (!isInteractiveElement) return;

        event.preventDefault(); 

        // --- MANEJO DE ACCIÓN OK / ENTER ---
        if (event.key === 'Enter' || event.key === ' ') {
             currentFocusedElement.click(); 
             return; 
        }

        const currentIndex = focusableElements.indexOf(currentFocusedElement);
        let nextElement = null;

        // 1. NAVEGACIÓN HORIZONTAL (ArrowRight / ArrowLeft)
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            let nextIndex = event.key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1;
            if (nextIndex >= 0 && nextIndex < focusableElements.length) {
                nextElement = focusableElements[nextIndex];
            }
            
        } 
        
        // 2. NAVEGACIÓN VERTICAL FORZADA (ArrowDown / ArrowUp)
        else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            
            // Asigna 0 al Hero/Resume Banner, y el resto por data-category-index
            let currentCategoryIndex = -1;
            if (currentFocusedElement === heroButtonRef.current || currentFocusedElement.classList.contains('resume-video-card')) {
                currentCategoryIndex = 0;
            } else {
                currentCategoryIndex = parseInt(currentFocusedElement.dataset.categoryIndex, 10);
            }
            
            if (event.key === 'ArrowDown') {
                if (currentCategoryIndex === 0) {
                    nextElement = focusableElements.find(el => el.dataset.categoryIndex === '1');
                } 
                else {
                    const nextCategoryIndex = currentCategoryIndex + 1;
                    nextElement = focusableElements.find(el => el.dataset.categoryIndex === nextCategoryIndex.toString());
                }
                
            } else if (event.key === 'ArrowUp') {
                
                if (currentCategoryIndex === 1) {
                    // Si viene del primer carrusel, va al Hero/Resume Banner (índice 0)
                    nextElement = focusableElements.find(el => el.classList.contains('resume-video-card')) || heroButtonRef.current;
                } else if (currentCategoryIndex > 1) {
                    const prevCategoryIndex = currentCategoryIndex - 1;
                    nextElement = focusableElements.find(el => el.dataset.categoryIndex === prevCategoryIndex.toString());
                }
            }
        }

        // 3. Aplicar foco y scroll 
        if (nextElement) {
            nextElement.focus();
            nextElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center', 
                inline: 'center' 
            });
        }
        
    }, [videoEnFocoUrl, mostrarMasGrid]);

    // Listener global para el D-Pad
    React.useEffect(() => {
        window.addEventListener('keydown', handleDpadNavigation);
        return () => {
            window.removeEventListener('keydown', handleDpadNavigation);
        };
    }, [handleDpadNavigation]);
    
    // Foco Inicial
    React.useEffect(() => {
        if (!videoEnFocoUrl && !mostrarMasGrid && !isReadyRef.current) {
            setTimeout(() => {
                const initialFocusElement = document.querySelector('.resume-video-card') || heroButtonRef.current;
                if (initialFocusElement) {
                     initialFocusElement.focus();
                     isReadyRef.current = true;
                }
            }, 100);
        }
    }, [videoEnFocoUrl, mostrarMasGrid]);

    // ----------------------------------------------------------------------
    // RENDERIZADO CONDICIONAL
    // ----------------------------------------------------------------------

    if (videoEnFocoUrl) {
        return <ReproductorEnFoco 
            videoUrl={videoEnFocoUrl} 
            onBack={handleBack} 
            onStop={handleVideoProgress} 
        />;
    }
    
    if (mostrarMasGrid) {
        return <MasVideosGrid 
            categoria={mostrarMasGrid.categoria}
            videos={mostrarMasGrid.videos}
            onPlay={setVideoEnFocoUrl}
            onClose={handleCloseGrid}
        />;
    }

    const heroVideoUrl ="https://youtu.be/bd7PTHImmaI?si=95uXGaIK9s9ePPpS";
    let categoryIndex = 1; 

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-gray-900 text-white">
            
            {/* 💡 SECCIÓN: CONTINUAR VIENDO */}
            {lastProgress && (
                <div className="mb-12 p-4 border border-blue-600 rounded-xl bg-gray-800">
                    <h1 className="text-2xl font-bold mb-4 text-blue-400">🎬 Continuar Viendo</h1>
                    <div 
                        className="resume-video-card cursor-pointer group relative bg-gray-700 rounded-xl shadow-lg p-4 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] focus:ring-4 focus:ring-blue-600 focus:outline-none"
                        onClick={() => {
                            // Construye la URL con el tiempo de reanudación
                            const resumeUrl = `${lastProgress.url.split('?')[0]}?t=${Math.floor(lastProgress.time)}`;
                            setVideoEnFocoUrl(resumeUrl);
                        }}
                        tabIndex="0"
                        data-category-index="0"
                    >
                        <p className="text-lg font-semibold text-white line-clamp-1">
                            **Reanudar Video**
                        </p>
                        <p className="text-sm text-gray-300 mt-1">
                            Continuar en **{Math.floor(lastProgress.time)} segundos**.
                        </p>
                        <button 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handleClearProgress();
                            }}
                            className="mt-2 px-3 py-1 text-xs bg-red-700 hover:bg-red-600 rounded focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            Empezar de Nuevo
                        </button>
                    </div>
                </div>
            )}
            
            {/* HERO BANNER */}
            {/* Si hay progreso, el Hero Banner usa categoryIndex="1" para la navegación vertical */}
            <HeroBanner 
                ref={heroButtonRef}
                titulo="Estreno de la Semana"
                descripcion="Nephilim: Una aventura épica de ciencia ficción."
                videoUrl={heroVideoUrl}
                onPlay={setVideoEnFocoUrl} 
            />

            {/* SECCIONES DE CATEGORÍA CON CARRUSEL Y TARJETA 'MÁS' */}
            {Object.entries(CATALOGO).map(([categoria, videos]) => {
                
                const currentCategoryIndex = categoryIndex++; 
                const limiteCarrusel = 10;
                const tieneMas = videos.length > limiteCarrusel;
                const videosEnCarrusel = tieneMas ? videos.slice(0, limiteCarrusel - 1) : videos.slice(0, limiteCarrusel);
                const videosRestantesCount = videos.length - videosEnCarrusel.length;

                const cardClasses = "flex-shrink-0 w-40 sm:w-32 lg:w-40";

                return (
                    <div key={categoria} className="mb-10">
                        <h1 className="text-2xl font-bold mb-4 text-blue-600 capitalize">{categoria}</h1>
                        <VideoCarousel>
                            
                            {videosEnCarrusel.map((video, index) => (
                                <div key={index} className={cardClasses}>
                                   <ReproductorDeVideo 
                                         titulo={video.titulo} 
                                         url={video.url} 
                                         onPlay={setVideoEnFocoUrl} 
                                         categoryIndex={currentCategoryIndex} 
                                     />
                                </div>
                            ))}

                            {videosRestantesCount > 0 && (
                                <div className={cardClasses}>
                                    <TarjetaMas 
                                        count={videosRestantesCount}
                                        onShowAll={() => setMostrarMasGrid({ categoria, videos })}
                                        categoryIndex={currentCategoryIndex} 
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

// Inicialización de React
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

