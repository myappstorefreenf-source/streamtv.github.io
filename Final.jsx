const { useState, useEffect, useRef, useMemo } = React;

// --- UTILIDADES NATIVAS ---
const lanzarVideoNativo = (url, titulo) => {
    if (window.AndroidInterface && window.AndroidInterface.playVideo) {
        window.AndroidInterface.playVideo(url, titulo);
    } else {
        console.log("Simulación PC - Play:", titulo, url);
    }
};

// --- COMPONENTES DE UI ---
const VirtualKeyboard = ({ onKeyPress, onBackspace, onClose, busqueda }) => {
    const filas = [['A','B','C','D','E','F'],['G','H','I','J','K','L'],['M','N','O','P','Q','R'],['S','T','U','V','W','X'],['Y','Z','1','2','3','4'],['5','6','7','8','9','0']];
    const [f, setF] = useState(0);
    const [c, setC] = useState(0);
    const [isBottom, setIsBottom] = useState(false);
    const [bCol, setBCol] = useState(0);

    useEffect(() => {
        const handleK = (e) => {
            if (e.key === 'ArrowRight') isBottom ? setBCol(p => Math.min(p + 1, 2)) : setC(p => Math.min(p + 1, 5));
            if (e.key === 'ArrowLeft') isBottom ? setBCol(p => Math.max(p - 1, 0)) : setC(p => Math.max(p - 1, 0));
            if (e.key === 'ArrowDown') { if (!isBottom) { if (f === 5) setIsBottom(true); else setF(p => p + 1); } }
            if (e.key === 'ArrowUp') { if (isBottom) setIsBottom(false); else setF(p => Math.max(p - 1, 0)); }
            if (e.key === 'Enter' || e.keyCode === 13 || e.keyCode === 23) {
                if (!isBottom) onKeyPress(filas[f][c]);
                else { if (bCol === 0) onKeyPress(' '); if (bCol === 1) onBackspace(); if (bCol === 2) onClose(); }
            }
        };
        window.addEventListener('keydown', handleK);
        return () => window.removeEventListener('keydown', handleK);
    }, [f, c, isBottom, bCol, onKeyPress, onBackspace, onClose]);

    return (
        <div translate="no" className="bg-zinc-900/95 p-4 border rounded-2xl border-white/10 shadow-2xl w-[320px] select-none backdrop-blur-md">
            <div className="grid grid-cols-6 gap-1 mb-2">
                {filas.map((fila, rIdx) => fila.map((letra, cIdx) => (
                    <div key={`${rIdx}-${cIdx}`} className={`h-10 flex items-center justify-center rounded-lg font-bold text-sm ${!isBottom && f === rIdx && c === cIdx ? 'bg-green-600 text-white scale-105 shadow-md' : 'bg-zinc-800 text-zinc-500'}`}>{letra}</div>
                )))}
            </div>
            <div className="flex gap-1">
                {['ESPACIO', 'BORRAR', 'LISTO'].map((t, i) => (
                    <div key={t} className={`flex-1 py-2 rounded-lg text-[10px] font-black text-center ${isBottom && bCol === i ? 'bg-green-600 text-white shadow-md' : 'bg-zinc-800 text-zinc-600'}`}>{t}</div>
                ))}
            </div>
        </div>
    );
};

const TVChannelRow = ({ video, esSeleccionado, id }) => (
    <div id={id} className={`flex items-center gap-5 p-4 mx-24 mb-2 transition-all rounded-sm border-2
        ${esSeleccionado ? 'border-green-600 bg-zinc-900/80 shadow-[0_0_15px_rgba(34,197,94,0.3)] opacity-100 scale-[1.02]' : 'border-white/5 opacity-40 bg-transparent'}`}>
        <div className="w-14 h-10 bg-black rounded-md flex items-center justify-center overflow-hidden border border-white/10 shadow-inner">
            <img src={video.logo} className="w-full h-full object-contain" onError={(e)=>e.target.src='https://via.placeholder.com/100x60?text=TV'} />
        </div>
        <span className={`text-md font-black tracking-[0.1em] uppercase truncate ${esSeleccionado ? 'text-white' : 'text-zinc-500'}`}>
            {video.titulo}
        </span>
    </div>
);

const VideoCard = ({ video, esSeleccionado, id, esEpisodio, esVerMas, total, esSugerencia }) => (
    <div id={id} className={`flex-shrink-0 transition-all duration-300 ${esSugerencia ? 'w-24' : esEpisodio ? 'w-28 h-28' : 'w-32'} ${esSeleccionado ? 'scale-110 ring-2 ring-green-600 z-10 opacity-100 shadow-[0_0_25px_rgba(34,197,94,0.4)]' : 'opacity-95'}`}>
        <div className={`relative overflow-hidden border border-white/5 flex items-center justify-center ${esVerMas ? 'bg-green-700 aspect-[2/3] rounded-sm' : esEpisodio ? 'h-full bg-zinc-800 rounded-lg' : 'bg-zinc-900 aspect-[2/3] rounded-sm'}`}>
            {esVerMas ? (
                <div className="text-center p-4"><span className="block text-4xl mb-1">＋</span><span className="block text-[10px] font-black uppercase italic">Ver {total}</span></div>
            ) : esEpisodio ? (
                <div className="text-center"><div className="text-[10px] opacity-50 font-bold uppercase tracking-tighter">Ep</div><div className="text-3xl font-black">{video.num}</div></div>
            ) : (
                <>
                    <img src={video.logo} className="w-full h-full object-cover" loading="lazy" onError={(e)=>e.target.src='https://via.placeholder.com/200x300?text=No+Image'}/>
                    {video.episodios?.length > 1 && (
                        <div className="absolute top-2 right-2 bg-green-600 text-[8px] px-1.5 py-0.5 rounded-sm font-black shadow-lg">{video.episodios.length} EPS</div>
                    )}
                </>
            )}
        </div>
        {!esEpisodio && <p className={`mt-3 text-[10px] font-bold truncate uppercase tracking-tight ${esSeleccionado ? 'text-white' : 'text-zinc-600'}`}>{esVerMas ? "Explorar Todo" : video.titulo}</p>}
    </div>
);

const SideMenu = ({ activo, itemSeleccionado }) => {
    const opciones = [
        { id: 'search', label: 'BUSCAR', icon: '🔍' }, 
        { id: 'tv', label: 'VIVO', icon: '📺' }, 
        { id: 'vod', label: 'CONTENIDO', icon: '🎬' }
    ];

    return (
        /* Cambiamos transition-all por transition-[width] para que el fondo no haga 'zoom' */
        <div className={`fixed left-0 top-0 h-screen z-[500] flex flex-col items-center py-10 transition-[width] duration-150 ease-out
            ${activo ? 'w-64 bg-[#0a0a0a]' : 'w-20 bg-transparent'}`}>
            
            <div className="flex flex-col gap-8 w-full items-center mt-20">
                {opciones.map((opt, index) => (
                    <div key={opt.id} 
                         /* Transición rápida solo para el color, sin escalas */
                         className={`flex items-center w-full px-6 py-2 transition-colors duration-100
                         ${itemSeleccionado === index ? 'text-green-500 bg-zinc-900 border-l-4 border-green-600' : 'text-zinc-500 bg-transparent border-l-4 border-transparent'}`}>
                        
                        <span className="text-2xl min-w-[32px] text-center">{opt.icon}</span>
                        
                        {/* El texto aparece/desaparece rápido sin animar opacidad pesada */}
                        <span className={`ml-4 font-black tracking-widest overflow-hidden ${activo ? 'max-w-xs' : 'max-w-0'}`}>
                            {opt.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* El indicador lateral: Cambiamos transition-all por transition-[top] */}
            <div className="absolute left-0 w-1 bg-green-500 transition-[top] duration-150 ease-out" 
                 style={{ 
                    height: '40px', 
                    top: `${154 + (itemSeleccionado * 60)}px`, 
                    opacity: itemSeleccionado >= 0 ? 1 : 0 
                 }} 
            />
        </div>
    );
};
// --- APLICACIÓN PRINCIPAL ---
function App() {
    const [menuActivo, setMenuActivo] = useState(false);
    const [menuIdx, setMenuIdx] = useState(1);
    const [fuenteActual, setFuenteActual] = useState('tv'); 
    const [catalogosCargados, setCatalogosCargados] = useState({ tv: {}, vod: {} });
    const [isParsing, setIsParsing] = useState(false); // Estado para el Lazy Loading
    const [busqueda, setBusqueda] = useState("");
    const [filaActiva, setFilaActiva] = useState(0);
    const [columnaActiva, setColumnaActiva] = useState(0);
    const [vistaActual, setVistaActual] = useState({ tipo: 'home', data: null });
    const [mostrarTeclado, setMostrarTeclado] = useState(false);
    const [indiceAux, setIndiceAux] = useState(0);
    const [rangoCapitulos, setRangoCapitulos] = useState(0);
    const [focoZona, setFocoZona] = useState('grid');
    const [extraInfo, setExtraInfo] = useState(null);
    const [cargandoInfo, setCargandoInfo] = useState(false);
    const [sugerencias, setSugerencias] = useState([]);
    const API_KEY = "7ba138ff630dcf197f29d58e9de8ce10";

    // CARGA CON LAZY LOADING (CHUNKED PARSING)
    useEffect(() => {
        const parsearM3UAsync = (raw) => {
            return new Promise((resolve) => {
                if (!raw) return resolve({});
                const lineas = raw.split('\n');
                const temp = {};
                const totalLineas = lineas.length;
                let i = 0;
                const chunkSize = 400; // Procesa 400 líneas por ciclo de CPU

                const procesarSiguienteChunk = () => {
                    const fin = Math.min(i + chunkSize, totalLineas);
                    for (; i < fin; i++) {
                        if (lineas[i].startsWith('#EXTINF')) {
                            const url = lineas[i + 1]?.trim();
                            if (!url || !url.startsWith('http')) continue;

                            const category = lineas[i].match(/group-title="([^"]+)"/)?.[1] || "Otros";
                            const logo = lineas[i].match(/tvg-logo="([^"]+)"/)?.[1] || "";
                            let rawTitle = lineas[i].split(',').slice(1).join(',').trim() || "Sin título";

                            const tituloLimpio = rawTitle
                                .replace(/tvg-logo="[^"]*"/gi, '').replace(/group-title="[^"]*"/gi, '')
                                .replace(/tvg-id="[^"]*"/gi, '').replace(/tvg-name="[^"]*"/gi, '')
                                .replace(/强制="[^"]*"/gi, '').replace(/"/g, '').trim();

                            if (!temp[category]) temp[category] = [];
                            const esSerie = category.toUpperCase().includes("SERIE");

                            if (esSerie) {
                                const nombreSerie = tituloLimpio.split(/S\d+|E\d+|Capitulo| - /i)[0].trim();
                                let s = temp[category].find(x => x.titulo === nombreSerie);
                                if (s) {
                                    s.episodios.push({ titulo: tituloLimpio, url });
                                } else {
                                    temp[category].push({ 
                                        titulo: nombreSerie, logo, url, categoria: category, 
                                        episodios: [{ titulo: tituloLimpio, url }] 
                                    });
                                }
                            } else {
                                temp[category].push({ titulo: tituloLimpio, logo, url, categoria: category, episodios: [] });
                            }
                        }
                    }

                    if (i < totalLineas) {
                        setTimeout(procesarSiguienteChunk, 0); // Cede el control a la UI
                    } else {
                        resolve(temp);
                    }
                };
                procesarSiguienteChunk();
            });
        };

        const cargarTodo = async () => {
            setIsParsing(true);
            const tv = await parsearM3UAsync(window.m3uTV || "");
            const vod = await parsearM3UAsync(window.m3uVOD || "");
            setCatalogosCargados({ tv, vod });
            setIsParsing(false);
        };

        cargarTodo();
    }, []);

    const catalogoActual = useMemo(() => catalogosCargados[fuenteActual] || {}, [catalogosCargados, fuenteActual]);

    const buscarResena = async (video) => {
        setCargandoInfo(true);
        const similares = catalogoActual[video.categoria]
            ?.filter(v => v.titulo !== video.titulo).sort(() => 0.5 - Math.random()).slice(0, 8) || [];
        setSugerencias(similares);

        try {
            const queryClean = video.titulo.split('(')[0].split('-')[0].trim();
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(queryClean)}&language=es-ES`);
            const data = await response.json();
            setExtraInfo(data.results?.[0] || null);
        } catch (e) { console.error(e); }
        setCargandoInfo(false);
    };

    const catalogoFiltrado = useMemo(() => {
        if (!busqueda) return catalogoActual;
        const res = {};
        Object.keys(catalogoActual).forEach(cat => {
            const matches = catalogoActual[cat].filter(v => v.titulo.toLowerCase().includes(busqueda.toLowerCase()));
            if (matches.length > 0) res[cat] = matches;
        });
        return res;
    }, [busqueda, catalogoActual]);

    const categoriasKeys = Object.keys(catalogoFiltrado);

    // --- MANEJO DE TECLAS (REMOTE CONTROL) ---
    useEffect(() => {
        const handleKeys = (e) => {
            const isEnter = e.key === 'Enter' || e.keyCode === 13 || e.keyCode === 23;
            const isBack = e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 8 || e.keyCode === 27 || e.keyCode === 4;

            if (isBack) {
                e.preventDefault();
                if (mostrarTeclado) { setMostrarTeclado(false); return; }
                if (menuActivo) { setMenuActivo(false); return; }
                if (vistaActual.tipo === 'detalle') { setVistaActual(vistaActual.fromGrid ? { tipo: 'grilla', data: vistaActual.fromGrid } : { tipo: 'home', data: null }); setFocoZona('grid'); return; }
                if (vistaActual.tipo === 'grilla') { setVistaActual({ tipo: 'home', data: null }); return; }
                if (busqueda) { setBusqueda(""); return; }
            }

            if (mostrarTeclado) return;

            if (menuActivo) {
                if (e.key === 'ArrowUp') setMenuIdx(p => Math.max(0, p - 1));
                if (e.key === 'ArrowDown') setMenuIdx(p => Math.min(2, p + 1));
                if (e.key === 'ArrowRight' || isEnter) {
                    if (menuIdx === 0) { setMenuActivo(false); setMostrarTeclado(true); } 
                    else {
                        const nf = menuIdx === 1 ? 'tv' : 'vod';
                        if (fuenteActual !== nf) { setFuenteActual(nf); setFilaActiva(0); setColumnaActiva(0); }
                        setMenuActivo(false);
                    }
                }
                return;
            }

            if (vistaActual.tipo === 'home') {
                // --- MODO TV (LISTA VERTICAL) ---
                if (fuenteActual === 'tv') {
                    // Acceso al menú desde cualquier elemento pulsando IZQUIERDA
                    if (e.key === 'ArrowLeft') { setMenuActivo(true); return; }

                    if (e.key === 'ArrowUp') {
                        if (columnaActiva > 0) setColumnaActiva(p => p - 1);
                        else { setFilaActiva(p => Math.max(p - 1, -1)); setColumnaActiva(0); }
                    }
                    if (e.key === 'ArrowDown') {
                        const items = catalogoFiltrado[categoriasKeys[filaActiva]]?.length || 0;
                        if (columnaActiva < items - 1) setColumnaActiva(p => p + 1);
                        else { setFilaActiva(p => Math.min(p + 1, categoriasKeys.length - 1)); setColumnaActiva(0); }
                    }
                    if (isEnter) {
                        if (filaActiva === -1) setMostrarTeclado(true);
                        else { const v = catalogoFiltrado[categoriasKeys[filaActiva]][columnaActiva]; lanzarVideoNativo(v.url, v.titulo); }
                    }
                } 
                // --- MODO CONTENIDO (CARRUSELES VOD) ---
                else {
                    // Solo entra al menú si está en la primera columna (0) o en el buscador (-1)
                    if (e.key === 'ArrowLeft') {
                        if (columnaActiva === 0 || filaActiva === -1) { setMenuActivo(true); return; }
                        else { setColumnaActiva(p => Math.max(p - 1, 0)); }
                    }

                    if (e.key === 'ArrowUp') { setFilaActiva(p => Math.max(p - 1, -1)); setColumnaActiva(0); }
                    if (e.key === 'ArrowDown') { setFilaActiva(p => Math.min(p + 1, categoriasKeys.length - 1)); setColumnaActiva(0); }
                    
                    if (filaActiva !== -1) {
                        const items = catalogoFiltrado[categoriasKeys[filaActiva]] || [];
                        const maxCol = items.length > 10 ? 10 : items.length - 1;
                        if (e.key === 'ArrowRight') setColumnaActiva(p => Math.min(p + 1, maxCol));
                        
                        if (isEnter) {
                            if (columnaActiva === 10) { 
                                setVistaActual({ tipo: 'grilla', data: { titulo: categoriasKeys[filaActiva], items } }); setIndiceAux(0); 
                            } else {
                                const v = items[columnaActiva];
                                setVistaActual({ tipo: 'detalle', data: { info: v, items: v.episodios.length ? v.episodios : [v] } }); 
                                setFocoZona('visor'); setRangoCapitulos(0); setIndiceAux(0); buscarResena(v);
                            }
                        }
                    } else if (isEnter) setMostrarTeclado(true);
                }
            } else if (vistaActual.tipo === 'grilla') {
                const total = vistaActual.data.items.length;
                if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, total - 1));
                if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                if (e.key === 'ArrowDown') setIndiceAux(p => Math.min(p + 6, total - 1));
                if (e.key === 'ArrowUp') setIndiceAux(p => Math.max(p - 6, 0));
                if (isEnter) {
                    const v = vistaActual.data.items[indiceAux];
                    if (fuenteActual === 'tv') lanzarVideoNativo(v.url, v.titulo);
                    else { setVistaActual({ tipo: 'detalle', data: { info: v, items: v.episodios.length ? v.episodios : [v] }, fromGrid: vistaActual.data }); setFocoZona('visor'); buscarResena(v); }
                }
            } else if (vistaActual.tipo === 'detalle') {
                const esSerie = vistaActual.data.items.length > 1;
                if (focoZona === 'visor') {
                    if (isEnter) lanzarVideoNativo(vistaActual.data.items[0].url, vistaActual.data.items[0].titulo);
                    if (e.key === 'ArrowDown') { if (esSerie) setFocoZona('selector'); else if (sugerencias.length) { setFocoZona('sugerencias'); setIndiceAux(0); } }
                } else if (focoZona === 'selector') {
                    if (e.key === 'ArrowUp') setFocoZona('visor');
                    if (e.key === 'ArrowDown') { setFocoZona('grid'); setIndiceAux(0); }
                    if (e.key === 'ArrowRight') setRangoCapitulos(p => Math.min(p + 1, Math.ceil(vistaActual.data.items.length / 10) - 1));
                    if (e.key === 'ArrowLeft') setRangoCapitulos(p => Math.max(p - 1, 0));
                } else if (focoZona === 'grid') {
                    const maxInPage = Math.min(10, vistaActual.data.items.length - (rangoCapitulos * 10)) - 1;
                    if (e.key === 'ArrowUp') setFocoZona('selector');
                    if (e.key === 'ArrowDown' && sugerencias.length) { setFocoZona('sugerencias'); setIndiceAux(0); }
                    if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, maxInPage));
                    if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                    if (isEnter) { const ep = vistaActual.data.items[(rangoCapitulos * 10) + indiceAux]; lanzarVideoNativo(ep.url, ep.titulo); }
                } else if (focoZona === 'sugerencias') {
                    if (e.key === 'ArrowUp') setFocoZona(esSerie ? 'grid' : 'visor');
                    if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, sugerencias.length - 1));
                    if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                    if (isEnter) {
                        const sug = sugerencias[indiceAux];
                        setVistaActual({ tipo: 'detalle', data: { info: sug, items: sug.episodios.length ? sug.episodios : [sug] } });
                        setFocoZona('visor'); setIndiceAux(0); setRangoCapitulos(0); buscarResena(sug);
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, categoriasKeys, catalogoFiltrado, indiceAux, rangoCapitulos, busqueda, sugerencias, menuActivo, menuIdx, fuenteActual, mostrarTeclado]);
    // --- AUTO-SCROLL ---
    useEffect(() => {
        if (mostrarTeclado || menuActivo) return;
        const timer = setTimeout(() => {
            let id = vistaActual.tipo === 'home' ? (filaActiva === -1 ? "fake-search" : `item-${filaActiva}-${columnaActiva}`) : 
                     vistaActual.tipo === 'grilla' ? `grid-item-${indiceAux}` : 
                     focoZona === 'visor' ? 'visor-container' : focoZona === 'selector' ? `range-${rangoCapitulos}` : focoZona === 'grid' ? `cap-${indiceAux}` : `sug-${indiceAux}`;
            document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'center' });
        }, 100);
        return () => clearTimeout(timer);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, mostrarTeclado, menuActivo, indiceAux, rangoCapitulos]);

    return (
        <div translate="no" className="inset-0 fixed bg-[#050505] text-white font-sans overflow-hidden select-none">
            <style>{`* { outline: none !important; } .no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            
            {/* SPINNER DE CARGA LAZY */}
            {isParsing && (
                <div className="fixed inset-0 z-[3000] bg-black/90 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className="text-green-500 font-black tracking-widest text-xl animate-pulse italic">H- ANALIZANDO CONTENIDO...</p>
                </div>
            )}

            <div className="absolute top-8 left-8 z-[1100] flex items-center">
                <span className="text-white font-black text-3xl italic">H-</span>
            </div>

            <div className="absolute top-8 right-10 z-[1100]">
                <div id="fake-search" className={`w-72 px-5 py-3 rounded-md border-2 transition-all flex justify-between items-center ${filaActiva === -1 || mostrarTeclado ? 'border-green-600 bg-zinc-800 scale-95 shadow-[0_0_20px_rgba(22,163,74,0.2)]' : 'border-white/5 bg-transparent'}`}>
                    <span className={`truncate text-[10px] font-black tracking-widest ${busqueda ? 'text-white' : 'text-zinc-400'}`}>{busqueda || "BUSCAR TÍTULO..."}</span>
                    <div className="bg-green-600 text-[8px] px-1.5 py-0.5 rounded-sm font-black text-white">OK</div>
                </div>
                {mostrarTeclado && (
                    <div className="absolute top-14 right-0 z-[2000] animate-in slide-in-from-top-2 duration-300">
                        <VirtualKeyboard busqueda={busqueda} onKeyPress={(t)=>setBusqueda(p=>p+t)} onBackspace={()=>setBusqueda(p=>p.slice(0,-1))} onClose={()=>setMostrarTeclado(false)} />
                    </div>
                )}
            </div>

            <SideMenu activo={menuActivo} itemSeleccionado={menuIdx} />

            <div className={`h-full transition-all duration-500 flex flex-col ${menuActivo ? 'opacity-50 scale-95 blur-sm pl-20' : 'pl-20'}`}>
                {vistaActual.tipo === 'home' && (
                    <div className="flex-1 pt-32 overflow-y-auto no-scrollbar pb-32">
                        <div className="pl-32 mb-12">
                            <p className="text-green-500 text-xl font-black tracking-widest uppercase mb-1">{categoriasKeys[filaActiva] || 'Cargando...'}</p>
                            <h2 className="text-white text-6xl font-black tracking-tighter uppercase italic">{fuenteActual === 'tv' ? 'TV en Vivo' : 'Streaming'}</h2>
                        </div>

                        {categoriasKeys.map((cat, fIdx) => (
                            <div key={cat} className="mb-14">
                                <h2 className={`text-[18px] font-black mb-6 uppercase tracking-[0.3em] pl-24 ${filaActiva === fIdx ? 'text-green-600' : 'text-zinc-800'}`}>{cat}</h2>
                                {fuenteActual === 'tv' ? (
                                    <div className="flex flex-col gap-1">
                                        {catalogoFiltrado[cat].map((v, cIdx) => (
                                            <TVChannelRow key={cIdx} id={`item-${fIdx}-${cIdx}`} video={v} esSeleccionado={filaActiva === fIdx && columnaActiva === cIdx} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex gap-6 overflow-x-auto no-scrollbar py-4">
                                        <div className="flex-shrink-0 w-8" aria-hidden="true"></div>
                                        {catalogoFiltrado[cat].slice(0, 11).map((v, cIdx) => (
                                            cIdx < 10 ? 
                                            <VideoCard key={cIdx} id={`item-${fIdx}-${cIdx}`} video={v} esSeleccionado={filaActiva === fIdx && columnaActiva === cIdx} /> :
                                            <VideoCard key="ver-mas" id={`item-${fIdx}-10`} esVerMas={true} total={catalogoFiltrado[cat].length} esSeleccionado={filaActiva === fIdx && columnaActiva === 10} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {vistaActual.tipo === 'grilla' && (
                    <div className="flex-1 pt-32 px-10 overflow-y-auto no-scrollbar bg-black">
                        <h2 className="text-4xl font-black text-green-600 uppercase italic mb-10">{vistaActual.data.titulo}</h2>
                        <div className="grid grid-cols-6 gap-8 pb-32">
                            {vistaActual.data.items.map((v, i) => <VideoCard key={i} id={`grid-item-${i}`} video={v} esSeleccionado={indiceAux === i} />)}
                        </div>
                    </div>
                )}
            </div>

            {vistaActual.tipo === 'detalle' && (
                <div className="inset-0 fixed bg-black z-[1200] p-12 flex flex-col overflow-hidden animate-in fade-in duration-500">
                    {extraInfo?.backdrop_path && <img src={`https://image.tmdb.org/t/p/original${extraInfo.backdrop_path}`} className="absolute inset-0 w-full h-full object-cover opacity-85 blur-sm scale-105" />}
                    
                    <div className="relative z-10 flex items-start gap-12 mb-8">
                        <div className="w-56 aspect-[2/3] rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-black flex-shrink-0">
                            <img src={vistaActual.data.info.logo} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 pt-4">
                            <h2 className="text-2xl font-black uppercase text-green-500 mb-4 italic tracking-tighter">{vistaActual.data.info.titulo}</h2>
                            <div className="flex gap-4 mb-8 items-center">
                                <span className="bg-zinc-800 px-3 py-1 rounded-sm font-black text-[10px] text-zinc-400 uppercase tracking-widest">{vistaActual.data.info.categoria}</span>
                                {extraInfo?.vote_average && <span className="text-yellow-500 font-black text-sm">★ {extraInfo.vote_average.toFixed(1)}</span>}
                            </div>
                            <div className="max-w-3xl bg-black/40 p-8 rounded-sm border border-white/5 backdrop-blur-md">
                                <p className="text-zinc-400 text-xs font-bold leading-relaxed line-clamp-5 uppercase tracking-wide">{cargandoInfo ? "OBTENIENDO INFORMACIÓN..." : extraInfo?.overview || "DESCRIPCIÓN NO DISPONIBLE."}</p>
                            </div>
                        </div>
                        
                        <div id="visor-container" className={`relative w-[400px] aspect-video bg-black rounded-xl overflow-hidden border-4 transition-all duration-500 flex-shrink-0 ${focoZona === 'visor' ? 'border-green-600 scale-105 shadow-[0_0_60px_rgba(22,163,74,0.4)]' : 'border-zinc-800 opacity-30'}`}>
                            <div className="absolute inset-0 z-20 flex items-center justify-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all ${focoZona === 'visor' ? 'bg-green-600 scale-110' : 'bg-white/10'}`}><span className="text-3xl ml-1">▶</span></div>
                            </div>
                        </div>
                    </div>

                    {vistaActual.data.items.length > 1 && (
                        <div className="mt-4 relative z-10">
                            <div className="flex gap-3 mb-4 overflow-x-auto no-scrollbar">
                                {Array.from({ length: Math.ceil(vistaActual.data.items.length / 10) }).map((_, i) => (
                                    <div key={i} id={`range-${i}`} className={`px-6 py-2 rounded-sm text-[10px] font-black border transition-all ${rangoCapitulos === i ? 'bg-green-600 border-green-500 text-white' : 'bg-black border-white/5 text-zinc-600'} ${focoZona === 'selector' && rangoCapitulos === i ? 'ring-2 ring-white scale-105' : ''}`}>{i * 10 + 1}-{Math.min((i + 1) * 10, vistaActual.data.items.length)}</div>
                                ))}
                            </div>
                            <div className="flex gap-6 overflow-x-auto no-scrollbar py-4">
                                {vistaActual.data.items.slice(rangoCapitulos * 10, (rangoCapitulos + 1) * 10).map((v, i) => (
                                    <VideoCard key={i} id={`cap-${i}`} video={{...v, num: (rangoCapitulos * 10) + i + 1}} esSeleccionado={focoZona === 'grid' && indiceAux === i} esEpisodio={true} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-auto relative z-10">
                         <h3 className="text-xs font-black text-zinc-500 mb-4 tracking-widest uppercase">Te puede interesar</h3>
                         <div className="flex gap-5 overflow-x-auto no-scrollbar pb-10">
                             {sugerencias.map((sug, i) => (
                                 <VideoCard key={i} id={`sug-${i}`} video={sug} esSeleccionado={focoZona === 'sugerencias' && indiceAux === i} esSugerencia={true} />
                             ))}
                         </div>
                    </div>
                </div>
            )}
            <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-black via-[#050505] to-[#0a0a0a] opacity-95" />
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
