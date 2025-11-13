// Este código asume que tienes las librerías React, ReactDOM y Hls.js disponibles
// (por ejemplo, cargadas vía CDN: https://unpkg.com/react@18/umd/react.development.js, https://unpkg.com/react-dom@18/umd/react-dom.development.js, https://cdn.jsdelivr.net/npm/hls.js@latest)

// ----------------------------------------------------------------------
// 0. CONFIGURACIÓN   https://raw.githubusercontent.com/myappstorefreenf-source/streamtv.github.io/main/playlist.m3u
// ----------------------------------------------------------------------
// 🚨🚨 REEMPLAZA ESTA URL CON TU ENLACE M3U REMOTO 🚨🚨
const REMOTE_M3U_URL = 'https://raw.githubusercontent.com/myappstorefreenf-source/streamtv.github.io/main/playlist.m3u'; 
// URL de canal inicial. Elige un canal seguro para que inicie al cargar.
const DEFAULT_START_CHANNEL_URL = 'https://live.airederadiotv.airederadiotv.sml/play/playlist.m3u8'; 
// ----------------------------------------------------------------------
// 0. PARSEADOR M3U Y CARGA REMOTA 
// ----------------------------------------------------------------------
const parseM3U = (m3uString) => {
    const lines = m3uString.trim().split('\n');
    const playlist = [];
    let currentItem = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('#EXTINF')) {
            const logoMatch = line.match(/tvg-logo="([^"]*)"/);
            const titleMatch = line.match(/,(.*)$/);
            const groupMatch = line.match(/group-title="([^"]*)"/); 
            
            currentItem = {
                title: titleMatch ? titleMatch[1].trim() : 'Video sin título',
                logoUrl: logoMatch ? logoMatch[1] : null,
                category: groupMatch ? groupMatch[1] : 'Otros', 
                url: null,
            };
        } else if (line.startsWith('http') || line.startsWith('https')) {
            if (currentItem.title) { 
                currentItem.url = line;
                playlist.push(currentItem);
                currentItem = {}; 
            }
        }
    }
    return playlist;
};
const fetchM3UContent = async (url) => {
    try {
        console.log(`Cargando lista desde: ${url}`);
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Fallo al cargar la lista: ${response.statusText}`);
        }
        
        const m3uString = await response.text();
        return parseM3U(m3uString);
    } catch (error) {
        console.error("Error al cargar la lista M3U remota:", error);
        alert(`ERROR: No se pudo cargar la lista M3U. Detalle: ${error.message}`);
        return [];
    }
};
// ----------------------------------------------------------------------
// 1. COMPONENTE VIDEO CARD (Para lista vertical)
// ----------------------------------------------------------------------
const VideoCard = React.forwardRef(({ video, onPlay, index, isActive, isFocusable }, ref) => {
    const handlePlay = () => onPlay(video.url);
    
    // Si el menú no está visible, el tabIndex debe ser -1 para prevenir la navegación por Tab
    const tabIndexValue = isFocusable ? "0" : "-1"; 

    return (
        <div 
            ref={ref}
            className={`video-card flex items-center justify-start w-full h-16 p-2 mb-1 cursor-pointer 
                        transition-all duration-300 border-l-4 
                        ${isActive ? 'border-blue-500 bg-gray-700' : 'border-transparent hover:bg-gray-800'}
                        focus:ring-2 focus:ring-blue-500 focus:outline-none z-10`}
            onClick={handlePlay}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handlePlay();
                }
            }}
            tabIndex={tabIndexValue} 
            data-index={index} 
            role="button" // Añadir role para accesibilidad
        >
            <img 
                src={video.logoUrl || 'https://via.placeholder.com/64x64?text=NO+LOGO'}
                alt={video.title}
                className="w-10 h-10 object-cover rounded mr-3"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p className="text-white text-base font-medium truncate">
                {video.title}
            </p>
        </div>
    );
});
// ----------------------------------------------------------------------
// 2. COMPONENTE VIDEO PLAYER (Simplificado para el Overlay)
// ----------------------------------------------------------------------
const VideoPlayer = React.forwardRef(({ url, isPlaying, onFinish }, ref) => {
    
    React.useEffect(() => {
        const video = ref.current;
        if (!video || !url) return;
        const cleanUrl = url.split('?')[0];
        let hls;
        const handleEnded = () => onFinish();
        video.addEventListener('ended', handleEnded);

        // Limpiar instancia HLS anterior
        if (video.__hlsInstance) {
             video.__hlsInstance.destroy();
             delete video.__hlsInstance;
        }
        
        // Uso de HLS.js
        if (window.Hls && Hls.isSupported() && !cleanUrl.toLowerCase().endsWith('.mp4')) {
            hls = new Hls();
            hls.loadSource(cleanUrl); 
            hls.attachMedia(video);
            video.__hlsInstance = hls;
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                 video.play().catch(e => console.error("Error al iniciar la reproducción (Autoplay):", e));
            });

            // 💡 MEJORA: Manejo de errores fatales de HLS.js para mayor robustez
            hls.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    switch(data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error("Error fatal de red. Intentando recuperar...", data);
                            hls.startLoad(); 
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("Error fatal de media. Intentando recuperar...", data);
                            hls.recoverMediaError(); 
                            break;
                        default:
                            console.error("Error fatal desconocido. Destruyendo HLS...", data);
                            hls.destroy();
                            break;
                    }
                }
            });
            // --------------------------------------------------------------------

        } else {
            // Reproducción nativa (MP4, etc.)
            video.src = cleanUrl;
            video.play().catch(e => console.error("Error al iniciar la reproducción:", e));
        }
        
        return () => {
            video.removeEventListener('ended', handleEnded);
             if (video.__hlsInstance) {
                 video.__hlsInstance.destroy();
                 delete video.__hlsInstance;
            }
        };
    }, [url, onFinish, ref]); 

    React.useEffect(() => {
        const video = ref.current;
        if (video) {
            if (isPlaying) {
                video.play().catch(e => console.error("Error al reanudar:", e));
            } else {
                video.pause();
            }
        }
    }, [isPlaying, ref]);
    
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black">
            <video
                ref={ref}
                className='react-player'
                width='100%'
                height='100%'
                playsInline
                autoPlay
                controls={false}
            />
        </div>
    );
});
// ----------------------------------------------------------------------
// 3. COMPONENTE PRINCIPAL APP (Lista Simple Superpuesta)
// ----------------------------------------------------------------------
function App() {
    const [videoCatalog, setVideoCatalog] = React.useState(null); 
    const [currentChannelUrl, setCurrentChannelUrl] = React.useState(null); 
    const [isMenuVisible, setIsMenuVisible] = React.useState(true); 
    const playerRef = React.useRef(null);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    const allChannels = videoCatalog || [];

    // --- Carga de la lista M3U ---
    React.useEffect(() => {
        fetchM3UContent(REMOTE_M3U_URL).then(data => {
            setVideoCatalog(data);
            
            if (data.length > 0) {
                 // Busca el índice del canal de inicio o usa el primero
                 const defaultChannelIndex = data.findIndex(c => c.url === DEFAULT_START_CHANNEL_URL);
                 const initialUrl = defaultChannelIndex !== -1 ? DEFAULT_START_CHANNEL_URL : data[0].url;
                 
                 setCurrentChannelUrl(initialUrl);
                 // Establece el foco inicial en el canal de inicio o en el primero (0)
                 setFocusedIndex(defaultChannelIndex !== -1 ? defaultChannelIndex : 0);
            }
        });
    }, []);
    
    // --- Lógica de Reproducción ---
    const handlePlayChannel = React.useCallback((url) => {
        setCurrentChannelUrl(url); 
        // Actualiza el focusedIndex al canal reproducido para el foco futuro
        const newIndex = allChannels.findIndex(c => c.url === url);
        setFocusedIndex(newIndex);
        
        setIsMenuVisible(false); // Oculta el menú al seleccionar un canal
    }, [allChannels]);

    
    const handleVideoEnd = React.useCallback(() => {
          setIsMenuVisible(true);
          // Si el video termina, el foco volverá automáticamente al último canal reproducido
          setTimeout(focusChannelCard, 50, focusedIndex);
    }, [focusedIndex]);


    // Función auxiliar para forzar el foco a un índice específico
    const focusChannelCard = React.useCallback((indexToFocus) => {
        if (indexToFocus === -1 && allChannels.length > 0) {
            indexToFocus = 0; // Foco al primero si es -1
        }

        if (indexToFocus !== -1) {
             setTimeout(() => {
                 const card = document.querySelector(`.video-card[data-index="${indexToFocus}"][tabIndex="0"]`);
                 if (card) {
                     card.focus();
                     
                     // 💡 CORRECCIÓN PARA EL SCROLL FLUIDO: 
                     // Usamos 'instant' para que no haya animación de scroll que cause saltos.
                     // 'nearest' para que solo se mueva si está fuera de la vista.
                     card.scrollIntoView({ 
                         behavior: 'instant', 
                         block: 'nearest' 
                     });
                 } else if (allChannels.length > 0) {
                     // Fallback si no encuentra el elemento, ir al primero
                     document.querySelector('.video-card[data-index="0"][tabIndex="0"]')?.focus();
                 }
             }, 50);
             setFocusedIndex(indexToFocus); // Sincroniza el estado
        }
    }, [allChannels.length]);
    
    // ------------------------------------------------------------
    // --- LÓGICA DE NAVEGACIÓN D-PAD (Lista Única Vertical) ---
    // ------------------------------------------------------------
    const handleDpadNavigation = React.useCallback((event) => {
        
        const key = event.key;
        // Solo D-PAD y Enter/Space deben ser manejados aquí (y prevenir el default)
        const isDpadKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(key);
        
        // 1. Lógica de apertura/cierre del menú (Tecla Izquierda ←)
        if (key === 'ArrowLeft') {
             event.preventDefault(); // Siempre prevenir para ArrowLeft
             if (isMenuVisible) {
                 // Ocultar si está visible
                 setIsMenuVisible(false);
             } else {
                 // Mostrar si está oculto y forzar el foco al último índice enfocado
                 setIsMenuVisible(true);
                 focusChannelCard(focusedIndex); 
             }
             return;
        }

        // Si el menú está oculto, solo Enter/Space puede abrirlo.
        if (!isMenuVisible) {
             if (key === 'Enter' || key === ' ') {
                 setIsMenuVisible(true);
                 focusChannelCard(focusedIndex);
                 event.preventDefault();
             }
             return;
        }
        
        // Si el menú está visible, prevenimos el comportamiento por defecto de las teclas D-Pad
        if (isDpadKey) {
             event.preventDefault(); 
        } else {
            // Permitir otras teclas (ej. Tab, letras) si no son D-Pad
            return; 
        }

        // 2. Navegación en el Menú Visible (Lógica principal)
        
        // --- Lógica de Enter/Espacio (Reproducir) ---
        if (key === 'Enter' || key === ' ') {
             // Reproduce el canal del índice enfocado
             const channelToPlay = allChannels[focusedIndex];
             if (channelToPlay) {
                 handlePlayChannel(channelToPlay.url);
             } else {
                 focusChannelCard(0); // Si el foco se perdió, intenta ir al primero
             }
             return;
        }

        // --- NAVEGACIÓN DENTRO DEL CATÁLOGO DE CANALES (Vertical y Horizontal) ---
        
        if (key === 'ArrowUp' || key === 'ArrowDown') {
             const totalChannels = allChannels.length;
             let newIndex = focusedIndex;
             
             if (totalChannels === 0) return;

             if (key === 'ArrowUp') {
                 // Ciclo hacia arriba: si está en el primero (0), va al último (length - 1)
                 newIndex = (focusedIndex === 0) ? totalChannels - 1 : focusedIndex - 1;
             } else if (key === 'ArrowDown') {
                 // Ciclo hacia abajo: si está en el último, va al primero
                 newIndex = (focusedIndex === totalChannels - 1) ? 0 : focusedIndex + 1;
             }
             
             // Forzar el foco al nuevo índice y actualizar el estado
             focusChannelCard(newIndex);
             
        } else if (key === 'ArrowRight') {
             // Presionar Derecha oculta el menú
             setIsMenuVisible(false);
             return;
        } 

        // Si el menú está visible, pero no hay un foco válido, forzar el foco.
        if (isMenuVisible && focusedIndex === -1 && allChannels.length > 0) {
             focusChannelCard(0);
        }

    }, [isMenuVisible, focusedIndex, allChannels, focusChannelCard, handlePlayChannel]);


    // --- LISTENERS GLOBALES y LÓGICA DE FOCO INICIAL ---
    React.useEffect(() => {
        window.addEventListener('keydown', handleDpadNavigation);
        
        // Foco inicial cuando la lista carga y el menú es visible
        if (videoCatalog && videoCatalog.length > 0 && isMenuVisible && focusedIndex !== -1) {
             focusChannelCard(focusedIndex);
        }
        
        // Lógica para el botón "Atrás" físico del control de TV:
        window.consumeBackButton = () => {
             if (isMenuVisible) {
                 // Si el menú está abierto, la tecla Atrás lo oculta
                 setIsMenuVisible(false);
                 return true; 
             }
             return false; 
        };

        return () => {
            window.removeEventListener('keydown', handleDpadNavigation);
            window.consumeBackButton = null; 
        };
    }, [handleDpadNavigation, videoCatalog, isMenuVisible, focusedIndex, focusChannelCard]);
    
    // --- Componente del Menú de Canales (Superposición) ---
    const ChannelsMenu = () => (
        <div 
            className={`absolute top-0 left-0 h-full bg-gray-900/90 text-white transition-transform duration-300 z-20 
                        ${isMenuVisible ? 'translate-x-0 w-1/3 max-w-md' : '-translate-x-full w-0'}`}
        >
            <div className={`p-8 h-full flex flex-col ${isMenuVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
                
                {/* Título Fijo */}
                <h1 className="text-4xl font-bold mb-6 text-blue-400">
                    Canales
                </h1>
                
                {allChannels.length === 0 ? (
                    <div className="p-4 text-sm text-gray-400">
                        {videoCatalog === null ? 'Cargando...' : 'No hay canales cargados.'}
                    </div>
                ) : (
                    // La lista de canales
                    <div className="space-y-1 overflow-y-auto flex-grow custom-scrollbar" tabIndex="-1"> 
                        {allChannels.map((video, index) => (
                            <VideoCard 
                                key={video.url}
                                video={video} 
                                onPlay={handlePlayChannel} 
                                index={index} 
                                // El estilo de "activo" (borde azul) lo maneja el focusedIndex
                                isActive={index === focusedIndex} 
                                // El canal solo es enfocable si el menú está visible
                                isFocusable={isMenuVisible}
                            />
                        ))}
                    </div>
                )}

                 <div className="text-sm text-gray-500 mt-4">
                     Total de canales: **{allChannels.length}**.
                 </div>
            </div>
        </div>
    );
    
    // --- RENDERIZADO PRINCIPAL (Player + Overlay) ---
    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">
            
            {/* 1. Video Player (Fondo Fijo) */}
            {videoCatalog !== null && currentChannelUrl && (
                <VideoPlayer 
                    ref={playerRef} 
                    url={currentChannelUrl} 
                    isPlaying={true} 
                    onFinish={handleVideoEnd} 
                />
            )}
            
             {/* 2. Pantalla de Carga (Overlay) */}
             {videoCatalog === null && (
                 <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white z-30">
                     <h1 className="text-xl">Cargando catálogo... ⏳</h1>
                 </div>
             )}
            
            {/* 3. Menú de Navegación (Superposición) */}
            {videoCatalog !== null && <ChannelsMenu />}

            {/* 4. Mini Controles Fijos (Si el menú está oculto) */}
             {!isMenuVisible && (
                 <div className="absolute top-4 left-4 p-2 bg-gray-900/70 rounded-lg text-white z-10">
                     <p className="text-sm font-light">Presiona **←** o **Enter** para abrir la lista.</p>
                 </div>
             )}
        </div>
    );
}
// ----------------------------------------------------------------------
// RENDERIZADO
// ----------------------------------------------------------------------
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
