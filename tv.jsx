// Asegúrate de que tu archivo HTML tiene:
// 1. Un CDN para React, ReactDOM, Babel, y Hls.js
// 2. Un div con id="root"
// 3. Un CDN de Tailwind CSS (o compilación local)
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
// 0. CONFIGURACIÓN
// ----------------------------------------------------------------------
const REMOTE_M3U_URL = 'https://raw.githubusercontent.com/myappstorefreenf-source/streamtv.github.io/main/playlist.m3u'; 
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
                category: groupMatch ? groupMatch[1].trim() : 'Otros',
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

const groupChannelsByCategory = (channels) => {
    if (!channels) return {};

    return channels.reduce((groups, channel) => {
        const category = channel.category || 'Otros';

        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(channel);
        return groups;
    }, {});
};


// ----------------------------------------------------------------------
// 1. COMPONENTE VIDEO CARD 
// ----------------------------------------------------------------------
const VideoCard = React.memo(React.forwardRef(({ video, onPlay, index, isActive, isFocusable }, ref) => {
    const handlePlay = () => onPlay(video.url); 
    
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
            role="button"
        >
            <img 
                src={video.logoUrl || 'https://via.placeholder.com/64x64?text=NO+LOGO'}
                alt={video.title}
                className="w-10 h-10 object-cover rounded mr-3 flex-shrink-0"
                onError={(e) => { e.target.style.display = 'none'; }}
            />
            <p className="text-white text-base font-medium truncate flex-grow">
                {video.title}
            </p>
        </div>
    );
}), (prevProps, nextProps) => {
    return prevProps.isActive === nextProps.isActive && 
           nextProps.isFocusable === nextProps.isFocusable &&
           prevProps.index === nextProps.index;
});


// ----------------------------------------------------------------------
// 2. COMPONENTE VIDEO PLAYER 
// ----------------------------------------------------------------------
const VideoPlayer = React.forwardRef(({ url, isPlaying, onFinish }, ref) => {
    
    React.useEffect(() => {
        const video = ref.current;
        if (!video || !url) return;
        
        let hls;
        const handleEnded = () => onFinish();
        video.addEventListener('ended', handleEnded);

        // ⭐ Destruir la instancia HLS anterior antes de cargar una nueva para evitar solapamiento de audio
        if (video.__hlsInstance) {
             video.__hlsInstance.destroy();
             delete video.__hlsInstance;
        }
        
        if (window.Hls && Hls.isSupported()) { 
            hls = new Hls();
            hls.loadSource(url); 
            hls.attachMedia(video);
            video.__hlsInstance = hls;
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                 // Intentar reproducir solo si el estado global lo permite
                 if (isPlaying) {
                     video.play().catch(e => console.error("Error al iniciar la reproducción (Autoplay):", e));
                 }
            });

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

        } else {
            // Reproducción nativa (Fallback)
            console.warn("Reproducción nativa. URL:", url);
            video.src = url;
            if (isPlaying) {
                video.play().catch(e => console.error("Error al iniciar la reproducción:", e));
            }
        }
        
        // Función de limpieza de React (Se ejecuta al cambiar 'url' o al desmontar)
        return () => {
            video.removeEventListener('ended', handleEnded);
             if (video.__hlsInstance) {
                 video.__hlsInstance.destroy();
                 delete video.__hlsInstance;
             }
        };
    }, [url, onFinish, ref, isPlaying]); // isPlaying es dependencia para recargar si cambia

    // useEffect para controlar la pausa/reproducción de la etiqueta <video>
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
                autoPlay // Lo dejamos aquí, pero el control final lo da isPlaying
                controls={false}
            />
        </div>
    );
});


// ----------------------------------------------------------------------
// 3. COMPONENTE PRINCIPAL APP 
// ----------------------------------------------------------------------
function App() {
    const [videoCatalog, setVideoCatalog] = React.useState(null); 
    const [currentChannelUrl, setCurrentChannelUrl] = React.useState(null); 
    const [isMenuVisible, setIsMenuVisible] = React.useState(true); 
    const playerRef = React.useRef(null);
    const [focusedIndex, setFocusedIndex] = React.useState(-1);
    
    const [focusedCategoryIndex, setFocusedCategoryIndex] = React.useState(-1);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [isCategoryMenuVisible, setIsCategoryMenuVisible] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false); // ⭐ ESTADO DE CONTROL DE REPRODUCCIÓN

    const allChannels = videoCatalog || [];
    const cardRefs = React.useRef(new Map());
    const categoryListRef = React.useRef(null); 

    const groupedChannels = React.useMemo(() => {
        return groupChannelsByCategory(allChannels);
    }, [allChannels]);

    const categories = React.useMemo(() => Object.keys(groupedChannels), [groupedChannels]);
    
    const filteredChannels = React.useMemo(() => {
        if (selectedCategory === null) {
            return allChannels;
        }
        return allChannels.filter(channel => channel.category === selectedCategory);
    }, [allChannels, selectedCategory]);


    const focusChannelCard = React.useCallback((indexToFocus) => {
        
        const totalChannels = filteredChannels.length;
        if (totalChannels === 0) return;

        let finalIndex = indexToFocus;
        if (finalIndex === -1) {
            finalIndex = 0; 
        } else if (finalIndex >= totalChannels) {
            finalIndex = totalChannels - 1; 
        }

        const channelToFocus = filteredChannels[finalIndex];
        const globalIndex = allChannels.findIndex(c => c.url === channelToFocus.url);
        if (globalIndex === -1) return;
        
        setFocusedIndex(globalIndex); 
        
        requestAnimationFrame(() => {
             const card = cardRefs.current.get(globalIndex); 
             if (card) {
                card.focus();
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                });
             } 
        });
        
    }, [filteredChannels, allChannels]);


    const openMenu = React.useCallback(() => {
        setIsCategoryMenuVisible(false);
        setIsMenuVisible(true);
        setIsPlaying(false); // ⭐ Pausa la reproducción al abrir el menú
        if (filteredChannels.length > 0) {
             const currentChannel = allChannels[focusedIndex];
             const focusedFilteredIndex = filteredChannels.findIndex(c => c.url === currentChannel?.url);
             requestAnimationFrame(() => focusChannelCard(focusedFilteredIndex !== -1 ? focusedFilteredIndex : 0));
        }
    }, [focusedIndex, focusChannelCard, filteredChannels.length, allChannels]);

    const openCategoryMenu = React.useCallback(() => {
        if (!isMenuVisible) return;
        setIsCategoryMenuVisible(true);
        setIsPlaying(false); // ⭐ Pausa la reproducción al abrir el menú
        requestAnimationFrame(() => {
            document.getElementById(`cat-focus-${focusedCategoryIndex}`)?.focus();
        });
    }, [isMenuVisible, focusedCategoryIndex]);


    const handlePlayChannel = React.useCallback((originalUrl) => {
        setCurrentChannelUrl(originalUrl); 
        
        const newIndex = allChannels.findIndex(c => c.url === originalUrl); 
        setFocusedIndex(newIndex);
        
        setIsCategoryMenuVisible(false);
        setIsMenuVisible(false);
        setIsPlaying(true); // ⭐ Inicia la reproducción del nuevo canal
    }, [allChannels]);

    
    const handleVideoEnd = React.useCallback(() => {
        setIsMenuVisible(true);
        setIsPlaying(false); // ⭐ Pausa el audio cuando el stream termina
        const currentChannel = allChannels[focusedIndex];
        const focusedFilteredIndex = filteredChannels.findIndex(c => c.url === currentChannel?.url);
        setTimeout(() => focusChannelCard(focusedFilteredIndex !== -1 ? focusedFilteredIndex : 0), 10); 
    }, [focusedIndex, focusChannelCard, allChannels, filteredChannels]);


    React.useEffect(() => {
        fetchM3UContent(REMOTE_M3U_URL).then(data => {
            setVideoCatalog(data);
            
            if (data.length > 0) {
                const defaultChannelIndex = data.findIndex(c => c.url === DEFAULT_START_CHANNEL_URL);
                const initialIndex = defaultChannelIndex !== -1 ? defaultChannelIndex : 0;
                const initialUrl = defaultChannelIndex !== -1 ? DEFAULT_START_CHANNEL_URL : data[0].url;
                
                setCurrentChannelUrl(initialUrl); 
                setFocusedIndex(initialIndex);
                setSelectedCategory(null);
                setFocusedCategoryIndex(-1);
                setIsPlaying(true); // ⭐ Inicia la reproducción del canal por defecto al cargar.
            }
        });
    }, []);
    
    // ------------------------------------------------------------
    // --- LÓGICA DE SCROLL DE CATEGORÍAS (Limitado/Centrado) ---
    // ------------------------------------------------------------
    const scrollCategoryList = React.useCallback((newCatIndex) => {
        const container = categoryListRef.current;
        if (!container) return;
        
        const focusedElementId = `cat-focus-${newCatIndex}`;
        const focusedElement = document.getElementById(focusedElementId);
        if (!focusedElement) return;

        const containerHeight = container.clientHeight;
        const itemHeight = focusedElement.offsetHeight; 
        const itemTop = focusedElement.offsetTop;
        const currentScroll = container.scrollTop;

        // Limite visible 
        const SCROLL_OFFSET = itemHeight * 2; 

        // 1. Si el elemento está fuera del límite inferior visible
        if (itemTop + itemHeight > currentScroll + containerHeight - SCROLL_OFFSET) {
            container.scrollTop = itemTop + itemHeight - containerHeight + SCROLL_OFFSET;
        } 
        // 2. Si el elemento está fuera del límite superior visible
        else if (itemTop < currentScroll + SCROLL_OFFSET) {
            container.scrollTop = itemTop - SCROLL_OFFSET;
        }
    }, []);
    
    
    // ------------------------------------------------------------
    // --- LÓGICA DE NAVEGACIÓN D-PAD ---
    // ------------------------------------------------------------
    const handleDpadNavigation = React.useCallback((event) => {
        
        const key = event.key;
        const isDpadKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(key);

        if (!isMenuVisible) {
            if (key === 'ArrowLeft' || key === 'Enter' || key === ' ') {
                event.preventDefault();
                openMenu();
            }
            return;
        }

        if (isDpadKey) {
            event.preventDefault();
        } else {
            return;
        }

        const totalCategories = categories.length;
        const totalFilteredChannels = filteredChannels.length;

        if (isCategoryMenuVisible) {
            // MENÚ DE CATEGORÍAS
            let newCatIndex = focusedCategoryIndex;
            const totalOptions = totalCategories + 1; // Incluyendo TODOS

            if (key === 'ArrowUp' || key === 'ArrowDown') {
                 if (totalOptions === 0) return;

                 const currentIndexInList = focusedCategoryIndex === -1 ? 0 : focusedCategoryIndex + 1; 
                 let newIndexInList;

                 if (key === 'ArrowUp') {
                     newIndexInList = (currentIndexInList === 0) ? totalOptions - 1 : currentIndexInList - 1;
                 } else { // ArrowDown
                     newIndexInList = (currentIndexInList === totalOptions - 1) ? 0 : currentIndexInList + 1;
                 }

                 newCatIndex = newIndexInList === 0 ? -1 : newIndexInList - 1;

                 setFocusedCategoryIndex(newCatIndex);
                 requestAnimationFrame(() => {
                     document.getElementById(`cat-focus-${newCatIndex}`)?.focus();
                     scrollCategoryList(newCatIndex); 
                 });

            } else if (key === 'ArrowRight' || key === 'Enter' || key === ' ') {
                 const categoryName = newCatIndex === -1 ? null : categories[newCatIndex];

                 setSelectedCategory(categoryName);
                 setIsCategoryMenuVisible(false); 
                 requestAnimationFrame(() => focusChannelCard(0));

            } else if (key === 'ArrowLeft') {
                 setIsCategoryMenuVisible(false);
                 setIsMenuVisible(false);
                 setIsPlaying(true); // Reanuda la reproducción al salir del menú
            }

        } else {
            // MENÚ PRINCIPAL DE CANALES
            
            if (key === 'Enter' || key === ' ') {
                 const channelToPlay = allChannels[focusedIndex];
                 if (channelToPlay) {
                     handlePlayChannel(channelToPlay.url);
                 } else {
                     focusChannelCard(0);
                 }
                 return;

            } else if (key === 'ArrowLeft') {
                 if (totalCategories > 0) {
                     const currentSelectedCatIndex = selectedCategory === null ? -1 : categories.findIndex(c => c === selectedCategory);
                     setFocusedCategoryIndex(currentSelectedCatIndex);
                     openCategoryMenu(); 
                 } else {
                     setIsMenuVisible(false);
                     setIsPlaying(true); // Reanuda la reproducción al minimizar el menú si no hay categorías
                 }
                 return;

            } else if (key === 'ArrowRight') {
                 setIsMenuVisible(false); 
                 setIsPlaying(true); // Reanuda la reproducción al salir del menú
                 return;

            } else if (key === 'ArrowUp' || key === 'ArrowDown') {
                 if (totalFilteredChannels === 0) return;

                 let newFilteredIndex = filteredChannels.findIndex(c => c.url === allChannels[focusedIndex]?.url);
                 if (newFilteredIndex === -1) newFilteredIndex = 0;

                 if (key === 'ArrowUp') {
                     newFilteredIndex = (newFilteredIndex === 0) ? totalFilteredChannels - 1 : newFilteredIndex - 1;
                 } else if (key === 'ArrowDown') {
                     newFilteredIndex = (newFilteredIndex === totalFilteredChannels - 1) ? 0 : newFilteredIndex + 1;
                 }

                 focusChannelCard(newFilteredIndex);
            }
        }

    }, [isMenuVisible, isCategoryMenuVisible, focusedIndex, filteredChannels, allChannels, focusChannelCard, handlePlayChannel, openMenu, openCategoryMenu, focusedCategoryIndex, categories, selectedCategory, scrollCategoryList, setIsPlaying]);


    // --- LISTENERS GLOBALES y FOCO INICIAL ---
    React.useEffect(() => {
        window.addEventListener('keydown', handleDpadNavigation);
        
        if (videoCatalog && videoCatalog.length > 0 && isMenuVisible && !isCategoryMenuVisible) {
            const currentChannel = allChannels[focusedIndex];
            const focusedFilteredIndex = filteredChannels.findIndex(c => c.url === currentChannel?.url);
            requestAnimationFrame(() => focusChannelCard(focusedFilteredIndex !== -1 ? focusedFilteredIndex : 0));
        }
        
        window.consumeBackButton = () => {
             if (isCategoryMenuVisible) {
                 setIsCategoryMenuVisible(false);
                 return true;
             }
             if (isMenuVisible) {
                 setIsMenuVisible(false);
                 setIsPlaying(true); // ⭐ Reanuda la reproducción al minimizar el menú
                 return true; 
             }
             return false; 
        };

        return () => {
            window.removeEventListener('keydown', handleDpadNavigation);
            window.consumeBackButton = null; 
        };
    }, [handleDpadNavigation, videoCatalog, isMenuVisible, isCategoryMenuVisible, focusedIndex, focusChannelCard, allChannels, filteredChannels, setIsPlaying]);


    // ----------------------------------------------------------------------
    // --- Componente de Menú de CATEGORÍAS 
    // ----------------------------------------------------------------------
    const CategoryMenu = () => {
        if (!isMenuVisible || !isCategoryMenuVisible) return null; 

        return (
            <div
                className={`absolute top-0 left-0 min-h-screen bg-gray-800/95 text-white transition-transform duration-300 z-30
                            translate-x-0 w-1/4 max-w-xs flex flex-col`} 
            >
                <div className="p-8 flex flex-col flex-grow h-full"> 
                    <h2 className="text-2xl font-bold mb-4 text-yellow-400 sticky top-0 bg-gray-800/95 z-40">Categorías</h2>
                    
                    {/* Contenedor con scroll limitado */}
                    <div 
                        ref={categoryListRef}
                        className="space-y-2 overflow-y-auto custom-scrollbar flex-grow max-h-[70vh]" 
                    >

                        {/* Botón "TODOS" */}
                        <button
                            className={`text-left p-3 rounded transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none w-full flex-shrink-0
                                ${selectedCategory === null ? 'bg-blue-600 ring-2 ring-blue-400' : 'hover:bg-gray-700'}
                                ${focusedCategoryIndex === -1 ? 'bg-gray-600 border-l-4 border-yellow-500' : ''}`}
                            onClick={() => { setSelectedCategory(null); setIsCategoryMenuVisible(false); focusChannelCard(0); }}
                            tabIndex={isCategoryMenuVisible ? "0" : "-1"}
                            id="cat-focus--1"
                        >
                            <span className='truncate'>**TODOS** ({allChannels.length})</span>
                        </button>
                        
                        {/* Lista de Categorías */}
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                id={`cat-focus-${index}`}
                                className={`text-left p-3 rounded transition-colors focus:ring-2 focus:ring-blue-500 focus:outline-none w-full flex-shrink-0
                                    ${index === focusedCategoryIndex ? 'bg-gray-600 border-l-4 border-yellow-500' : 'hover:bg-gray-700'}
                                    ${category === selectedCategory ? 'bg-blue-600 ring-2 ring-blue-400' : ''}`}
                                onClick={() => { setSelectedCategory(category); setIsCategoryMenuVisible(false); focusChannelCard(0); }}
                                tabIndex={isCategoryMenuVisible ? "0" : "-1"}
                            >
                                <span className='truncate'>{category} ({groupedChannels[category].length})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // ----------------------------------------------------------------------
    // --- Componente del Menú de Canales 
    // ----------------------------------------------------------------------
    const ChannelsMenu = () => {
        
        const setCardRef = (index, element) => {
            if (element) {
                cardRefs.current.set(index, element);
            } else {
                cardRefs.current.delete(index);
            }
        };

        const currentCategoryTitle = selectedCategory || "Todos los Canales";
        
        const isChannelsMenuVisible = isMenuVisible && !isCategoryMenuVisible;
        const isFocusableChannel = isChannelsMenuVisible;
        
        const groupedFilteredChannels = groupChannelsByCategory(filteredChannels);
        const filteredCategories = Object.keys(groupedFilteredChannels);
        
        return (
            <div 
                className={`absolute top-0 left-0 h-full bg-gray-900/90 text-white transition-all duration-300 z-20 w-1/3 max-w-md flex flex-col`}
                style={{
                     // Ocultar completamente si no debe estar visible (trasladar -100%)
                     transform: isChannelsMenuVisible
                         ? 'translateX(0)' 
                         : 'translateX(-100%)',
                }}
            >
                <div className={`p-8 h-full flex flex-col ${isChannelsMenuVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    
                    {/* Título Fijo */}
                    <h1 className="text-4xl font-bold mb-6 text-blue-400 flex-shrink-0">
                        {currentCategoryTitle}
                    </h1>
                    
                    {filteredChannels.length === 0 ? (
                        <div className="p-4 text-sm text-yellow-500 flex-grow">
                            No hay canales en esta categoría.
                        </div>
                    ) : (
                        // La lista de canales
                        <div 
                            id="channels-list-container"
                            className="space-y-4 overflow-y-auto flex-grow custom-scrollbar" 
                            tabIndex="-1"
                        > 
                            {filteredCategories.map((category) => (
                                <div key={category} className="category-group">
                                    {/* Muestra el título de la categoría solo si estamos en la vista "TODOS" */}
                                    {selectedCategory === null && (
                                        <h2 className={`text-xl font-semibold mb-2 pt-1 pb-1 sticky top-0 bg-gray-900/90 z-30 transition-colors`}>
                                            {category}
                                        </h2>
                                    )}
                                    <div className="space-y-1">
                                         {groupedFilteredChannels[category].map((video) => {
                                             const globalIndex = allChannels.findIndex(c => c.url === video.url);

                                             return (
                                                 <VideoCard 
                                                     ref={(el) => setCardRef(globalIndex, el)}
                                                     key={video.url}
                                                     video={video} 
                                                     onPlay={handlePlayChannel} 
                                                     index={globalIndex} 
                                                     isActive={globalIndex === focusedIndex} 
                                                     isFocusable={isFocusableChannel}
                                                 />
                                             );
                                         })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                 <div className="text-sm text-gray-500 mt-4 flex-shrink-0">
                     Canales visibles: **{filteredChannels.length}**←
                 </div>
                </div>
            </div>
        );
    };
    
    // --- RENDERIZADO PRINCIPAL ---
    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">
            
            {/* 1. Video Player */}
            {videoCatalog !== null && currentChannelUrl && (
                <VideoPlayer 
                    ref={playerRef} 
                    url={currentChannelUrl} 
                    isPlaying={isPlaying} // ⭐ Controlamos la reproducción con estado
                    onFinish={handleVideoEnd} 
                />
            )}
            
             {/* 2. Pantalla de Carga */}
             {videoCatalog === null && (
                 <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white z-30">
                     <h1 className="text-xl">Cargando catálogo... ⏳</h1>
                 </div>
             )}
            
            {/* 3. Menú de Navegación */}
            {videoCatalog !== null && (
                 <React.Fragment>
                      <CategoryMenu />
                      <ChannelsMenu />
                 </React.Fragment>
             )}

            {/* 4. Mini Controles Fijos */}
             {!isMenuVisible && (
                 <button
                      className="absolute top-4 left-4 p-2 bg-gray-900/70 rounded-lg text-white z-10 
                                 transition-all duration-200 
                                 hover:bg-gray-700/90 focus:bg-gray-700/90 focus:ring-2 focus:ring-blue-500"
                      onClick={openMenu}
                      tabIndex="0" 
                      aria-label="Abrir lista de canales"
                 >
                      <p className="text-sm font-light">
                           ←
                      </p>
                 </button>
             )}
        </div>
    );
}


// ----------------------------------------------------------------------
// RENDERIZADO DE LA APLICACIÓN
// ----------------------------------------------------------------------
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    console.error("No se encontró el elemento 'root'. Asegúrate de que tu HTML tiene <div id='root'></div>");
}
