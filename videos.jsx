const { useState, useEffect, useRef, useMemo } = React;

// --- TECLADO VIRTUAL ---
const VirtualKeyboard = ({ onKeyPress, onBackspace, onClose, busqueda }) => {
    const filas = [['A','B','C','D','E','F'],['G','H','I','J','K','L'],['M','N','O','P','Q','R'],['S','T','U','V','W','X'],['Y','Z','1','2','3','4'],['5','6','7','8','9','0']];
    const [f, setF] = useState(0);
    const [c, setC] = useState(0);
    const [isBottom, setIsBottom] = useState(false);
    const [bCol, setBCol] = useState(0);

    useEffect(() => {
        const handleK = (e) => {
            e.preventDefault();
            if (e.key === 'ArrowRight') isBottom ? setBCol(p => Math.min(p + 1, 2)) : setC(p => Math.min(p + 1, 5));
            if (e.key === 'ArrowLeft') isBottom ? setBCol(p => Math.max(p - 1, 0)) : setC(p => Math.max(p - 1, 0));
            if (e.key === 'ArrowDown') { if (!isBottom) { if (f === 5) setIsBottom(true); else setF(p => p + 1); } }
            if (e.key === 'ArrowUp') { if (isBottom) setIsBottom(false); else setF(p => Math.max(p - 1, 0)); }
            if (e.key === 'Enter' || e.keyCode === 13) {
                if (!isBottom) onKeyPress(filas[f][c]);
                else { if (bCol === 0) onKeyPress(' '); if (bCol === 1) onBackspace(); if (bCol === 2) onClose(); }
            }
        };
        window.addEventListener('keydown', handleK);
        return () => window.removeEventListener('keydown', handleK);
    }, [f, c, isBottom, bCol]);

    return (
        <div translate="no" className="bg-zinc-900 p-4 border rounded-2xl border-white/10 shadow-2xl w-[320px] select-none">
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

const VideoCard = ({ video, esSeleccionado, id, esEpisodio, esVerMas, total, esSugerencia }) => (
    <div id={id} className={`flex-shrink-0 transition-all duration-300 ${esSugerencia ? 'w-24' : esEpisodio ? 'w-28 h-28' : 'w-32'} ${esSeleccionado ? 'scale-90 ring-4 ring-green-600 z-10 opacity-100 shadow-[0_0_20px_rgba(22,163,74,0.4)]' : 'opacity-70'}`}>
        <div className={`rounded-xl overflow-hidden border border-white/5 flex items-center justify-center ${esVerMas ? 'bg-green-700 aspect-[2/3]' : esEpisodio ? 'h-full bg-zinc-800 shadow-inner rounded-2xl' : 'bg-zinc-900 aspect-[2/3] shadow-lg'}`}>
            {esVerMas ? (
                <div className="text-center p-4"><span className="block text-4xl mb-1">＋</span><span className="block text-[10px] font-black uppercase italic">Ver {total}</span></div>
            ) : esEpisodio ? (
                <div className="text-center"><div className="text-[10px] opacity-50 font-bold uppercase">Ep</div><div className="text-3xl font-black">{video.num}</div></div>
            ) : (
                <img src={video.logo} className="w-full h-full object-fill" loading="lazy" />
            )}
        </div>
        {!esEpisodio && <p className={`mt-2 text-[8px] font-bold truncate text-center uppercase ${esSeleccionado ? 'text-white' : 'text-zinc-600'}`}>{esVerMas ? "Explorar Todo" : video.titulo}</p>}
    </div>
);

function App() {
    const [catalogo, setCatalogo] = useState({});
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

    const buscarResena = async (titulo) => {
        setCargandoInfo(true);
        setExtraInfo(null);
        setSugerencias([]);
        try {
            const queryClean = titulo.split('(')[0].split('-')[0].trim();
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(queryClean)}&language=es-ES`);
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const info = data.results[0];
                setExtraInfo(info);

                const tipo = info.media_type === 'tv' ? 'tv' : 'movie';
                const simRes = await fetch(`https://api.themoviedb.org/3/${tipo}/${info.id}/recommendations?api_key=${API_KEY}&language=es-ES`);
                const simData = await simRes.json();
                
                const formateadas = simData.results.slice(0, 10).map(item => ({
                    titulo: item.title || item.name,
                    logo: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : "",
                    url: "#",
                    categoria: tipo === 'tv' ? 'SERIE' : 'PELICULA'
                }));
                setSugerencias(formateadas);
            }
        } catch (e) { console.error(e); }
        setCargandoInfo(false);
    };

    useEffect(() => {
        const rawData = window.m3uData || "";
        if (!rawData) return;
        const lineas = rawData.split('\n');
        const temp = {};
        for (let i = 0; i < lineas.length; i++) {
            const linea = lineas[i].trim();
            if (linea.startsWith('#EXTINF')) {
                const next = lineas[i + 1] ? lineas[i + 1].trim() : "";
                const groupMatch = linea.match(/group-title="([^"]+)"/);
                const category = groupMatch ? groupMatch[1] : "Otros";
                const logoMatch = linea.match(/tvg-logo="([^"]+)"/);
                const nameMatch = linea.match(/tvg-name="([^"]+)"/);
                const title = nameMatch ? nameMatch[1] : (linea.split(',')[1] || "Sin título");
                if (next.startsWith('http')) {
                    if (!temp[category]) temp[category] = [];
                    temp[category].push({ titulo: title, logo: logoMatch ? logoMatch[1] : "", url: next, categoria: category });
                }
            }
        }
        setCatalogo(temp);
    }, []);

    const catalogoFiltrado = useMemo(() => {
        if (!busqueda) return catalogo;
        const res = {};
        Object.keys(catalogo).forEach(cat => {
            const matches = catalogo[cat].filter(v => v.titulo.toLowerCase().includes(busqueda.toLowerCase()));
            if (matches.length > 0) res[cat] = matches;
        });
        return res;
    }, [busqueda, catalogo]);

    const categoriasKeys = Object.keys(catalogoFiltrado);

    const handleCerrarVista = () => {
        setVistaActual({ tipo: 'home', data: null });
        setFocoZona('grid');
        setIndiceAux(0);
        setSugerencias([]);
    };

    const lanzarVideoNativo = (url, titulo) => {
        if (window.AndroidInterface) window.AndroidInterface.playVideo(url, titulo);
        else console.log("Play:", url);
    };

    // --- SCROLL AUTOMATICO ---
    useEffect(() => {
        if (mostrarTeclado) return;
        const timer = setTimeout(() => {
            let id = "";
            if (vistaActual.tipo === 'home') id = filaActiva === -1 ? "fake-search" : `item-${filaActiva}-${columnaActiva}`;
            else if (vistaActual.tipo === 'grilla') id = `grid-item-${indiceAux}`;
            else if (vistaActual.tipo === 'detalle') {
                if (focoZona === 'visor') id = 'visor-container';
                else if (focoZona === 'selector') id = `range-${rangoCapitulos}`;
                else if (focoZona === 'grid') id = `cap-${indiceAux}`;
                else if (focoZona === 'sugerencias') id = `sug-${indiceAux}`;
            }
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
        }, 100);
        return () => clearTimeout(timer);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, mostrarTeclado, indiceAux, rangoCapitulos]);

    // --- MANEJO DE TECLAS (NAVEGACION) ---
    useEffect(() => {
        const handleKeys = (e) => {
            const isEnter = e.key === 'Enter' || e.keyCode === 13;
            const isBack = e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 8 || e.keyCode === 27;

            if (isBack) {
                e.preventDefault();
                if (mostrarTeclado) { setMostrarTeclado(false); return; }
                if (vistaActual.tipo === 'detalle') {
                    if (vistaActual.fromGrid) setVistaActual({ tipo: 'grilla', data: vistaActual.fromGrid });
                    else handleCerrarVista();
                    return;
                }
                if (vistaActual.tipo === 'grilla') { handleCerrarVista(); return; }
                if (busqueda) { setBusqueda(""); return; }
            }

            if (mostrarTeclado) return;

            if (vistaActual.tipo === 'home') {
                if (e.key === 'ArrowUp') { setFilaActiva(p => Math.max(p - 1, -1)); setColumnaActiva(0); }
                if (e.key === 'ArrowDown') { setFilaActiva(p => Math.min(p + 1, categoriasKeys.length - 1)); setColumnaActiva(0); }
                if (filaActiva !== -1) {
                    const items = catalogoFiltrado[categoriasKeys[filaActiva]] || [];
                    const maxCol = items.length > 10 ? 10 : items.length - 1;
                    if (e.key === 'ArrowRight') setColumnaActiva(p => Math.min(p + 1, maxCol));
                    if (e.key === 'ArrowLeft') setColumnaActiva(p => Math.max(p - 1, 0));
                    if (isEnter) {
                        if (columnaActiva === 10) {
                            setVistaActual({ tipo: 'grilla', data: { titulo: categoriasKeys[filaActiva], items } });
                            setIndiceAux(0);
                        } else {
                            const v = items[columnaActiva];
                            setVistaActual({ tipo: 'detalle', data: { info: v, items } });
                            setFocoZona('visor'); setRangoCapitulos(0); setIndiceAux(0);
                            buscarResena(v.titulo);
                        }
                    }
                } else if (isEnter) setMostrarTeclado(true);

            } else if (vistaActual.tipo === 'grilla') {
                const total = vistaActual.data.items.length;
                const cols = 6;
                if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, total - 1));
                if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                if (e.key === 'ArrowDown') setIndiceAux(p => Math.min(p + cols, total - 1));
                if (e.key === 'ArrowUp') setIndiceAux(p => Math.max(p - cols, 0));
                if (isEnter) {
                    const v = vistaActual.data.items[indiceAux];
                    setVistaActual({ tipo: 'detalle', data: { info: v, items: vistaActual.data.items }, fromGrid: vistaActual.data });
                    setFocoZona('visor');
                    buscarResena(v.titulo);
                }

            } else if (vistaActual.tipo === 'detalle') {
                const esSerie = vistaActual.data.info.categoria.toUpperCase().includes("SERIE");
                
                if (focoZona === 'visor') {
                    if (isEnter) lanzarVideoNativo(vistaActual.data.info.url, vistaActual.data.info.titulo);
                    if (e.key === 'ArrowDown') setFocoZona(esSerie ? 'selector' : sugerencias.length > 0 ? 'sugerencias' : 'visor');
                    if (focoZona === 'visor' && e.key === 'ArrowDown' && sugerencias.length > 0 && !esSerie) setIndiceAux(0);
                } 
                else if (focoZona === 'selector') {
                    if (e.key === 'ArrowUp') setFocoZona('visor');
                    if (e.key === 'ArrowDown') setFocoZona('grid');
                    if (e.key === 'ArrowRight') setRangoCapitulos(p => Math.min(p + 1, Math.ceil(vistaActual.data.items.length / 10) - 1));
                    if (e.key === 'ArrowLeft') setRangoCapitulos(p => Math.max(p - 1, 0));
                } 
                else if (focoZona === 'grid') {
                    const maxInPage = Math.min(10, vistaActual.data.items.length - (rangoCapitulos * 10)) - 1;
                    if (e.key === 'ArrowUp') setFocoZona('selector');
                    if (e.key === 'ArrowDown' && sugerencias.length > 0) { setFocoZona('sugerencias'); setIndiceAux(0); }
                    if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, maxInPage));
                    if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                    if (isEnter) {
                        const ep = vistaActual.data.items[(rangoCapitulos * 10) + indiceAux];
                        lanzarVideoNativo(ep.url, `${vistaActual.data.info.titulo} - Ep ${(rangoCapitulos * 10) + indiceAux + 1}`);
                    }
                } 
                else if (focoZona === 'sugerencias') {
                    if (e.key === 'ArrowUp') setFocoZona(esSerie ? 'grid' : 'visor');
                    if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, sugerencias.length - 1));
                    if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                    if (isEnter) {
                        const sug = sugerencias[indiceAux];
                        setVistaActual({ tipo: 'detalle', data: { info: sug, items: [sug] } });
                        setFocoZona('visor'); setIndiceAux(0);
                        buscarResena(sug.titulo);
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, categoriasKeys, catalogoFiltrado, indiceAux, rangoCapitulos, busqueda, sugerencias]);

    return (
        <div translate="no" className="inset-0 fixed bg-black text-white font-sans overflow-hidden select-none">
            <style>{`
                * { -webkit-tap-highlight-color: transparent !important; outline: none !important; }
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .line-clamp-6 { display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; }
            `}</style>

            {/* --- HOME --- */}
            {vistaActual.tipo === 'home' && (
                <div className="h-full overflow-y-auto p-12 no-scrollbar">
                    <div className="flex justify-between items-start mb-16">
                        <div className="flex flex-col">
                            <h1 className="text-5xl font-black text-green-500 italic uppercase leading-none">Hood</h1>
                            <span className="text-xs font-bold tracking-[0.3em] text-zinc-500">PREMIUM STREAMING</span>
                        </div>
                        <div className="relative flex flex-col items-end">
                            <div id="fake-search" className={`w-72 px-5 py-3 rounded-xl border-2 transition-all flex justify-between items-center ${filaActiva === -1 ? 'border-green-600 bg-zinc-800 scale-105' : 'border-white/10 bg-zinc-900'}`}>
                                <span className={`truncate text-sm ${busqueda ? 'text-white font-bold' : 'text-zinc-700'}`}>{busqueda || "Buscar contenido..."}</span>
                                <div className="bg-green-600 text-[10px] px-2 py-0.5 rounded font-black shadow-lg">OK</div>
                            </div>
                            {mostrarTeclado && <div className="absolute top-16 right-0 z-[2000]"><VirtualKeyboard busqueda={busqueda} onKeyPress={(t)=>setBusqueda(p=>p+t)} onBackspace={()=>setBusqueda(p=>p.slice(0,-1))} onClose={()=>setMostrarTeclado(false)} /></div>}
                        </div>
                    </div>
                    {categoriasKeys.map((cat, fIdx) => (
                        <div key={cat} className="mb-14">
                            <h2 className={`text-lg font-bold mb-4 uppercase tracking-widest ${filaActiva === fIdx ? 'text-green-600' : 'text-zinc-800'}`}>{cat}</h2>
                            <div className="flex gap-6 overflow-x-auto no-scrollbar py-4">
                                {catalogoFiltrado[cat].slice(0, 11).map((v, cIdx) => (
                                    cIdx < 10 ?
                                    <VideoCard key={cIdx} id={`item-${fIdx}-${cIdx}`} video={v} esSeleccionado={filaActiva === fIdx && columnaActiva === cIdx} /> :
                                    <VideoCard id={`item-${fIdx}-10`} esVerMas={true} total={catalogoFiltrado[cat].length} esSeleccionado={filaActiva === fIdx && columnaActiva === 10} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* --- GRILLA --- */}
            {vistaActual.tipo === 'grilla' && (
                <div className="h-full overflow-y-auto p-12 no-scrollbar bg-zinc-950">
                    <h2 className="text-3xl font-black text-green-600 uppercase italic mb-10">{vistaActual.data.titulo}</h2>
                    <div className="grid grid-cols-6 gap-8 pb-32">
                        {vistaActual.data.items.map((v, i) => <VideoCard key={i} id={`grid-item-${i}`} video={v} esSeleccionado={indiceAux === i} />)}
                    </div>
                </div>
            )}

            {/* --- DETALLE --- */}
            {vistaActual.tipo === 'detalle' && (
                <div className="inset-0 fixed bg-zinc-950 z-[100] p-10 flex flex-col overflow-hidden">
                    {extraInfo?.backdrop_path && (
                        <img src={`https://image.tmdb.org/t/p/original${extraInfo.backdrop_path}`} className="absolute inset-0 w-full h-full object-cover opacity-10 blur-sm" />
                    )}
                    
                    <div className="relative z-10 flex items-start gap-12 mb-6">
                        <div className="w-52 aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0 bg-zinc-900">
                            <img src={vistaActual.data.info.logo} className="w-full h-full object-fill" />
                        </div>
                        
                        <div className="flex-1 pt-4">
                            <h2 className="text-4xl font-black uppercase italic mb-2 tracking-tighter leading-tight text-green-500">
                                {vistaActual.data.info.titulo}
                            </h2>
                            <div className="flex gap-4 mb-4 items-center">
                                <span className="bg-zinc-800 px-3 py-1 rounded-lg font-black text-[10px] text-zinc-400 uppercase border border-white/5">
                                    {vistaActual.data.info.categoria}
                                </span>
                                {extraInfo?.vote_average && (
                                    <span className="text-yellow-500 font-bold text-sm">⭐ {extraInfo.vote_average.toFixed(1)}</span>
                                )}
                            </div>
                            <div className="max-w-2xl bg-black/40 p-6 rounded-2xl border border-white/5 backdrop-blur-sm">
                                <p className="text-zinc-300 text-sm leading-relaxed italic font-medium line-clamp-6">
                                    {cargandoInfo ? "Cargando sinopsis..." : extraInfo?.overview || "No hay reseña disponible para este título."}
                                </p>
                            </div>
                        </div>

                        <div id="visor-container" className={`relative w-[320px] aspect-video bg-zinc-900 rounded-3xl overflow-hidden border-4 transition-all duration-500 flex-shrink-0 ${focoZona === 'visor' ? 'border-green-600 scale-100 shadow-[0_0_50px_rgba(22,163,74,0.3)]' : 'border-zinc-800 opacity-50'}`}>
                            <img src={vistaActual.data.info.logo} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-md" />
                            <img src={vistaActual.data.info.logo} className="relative z-10 w-full h-full object-contain p-12" />
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20">
                                <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${focoZona === 'visor' ? 'bg-green-600 scale-110' : 'bg-white/20'}`}>
                                    <span className="text-4xl ml-2 text-white">▶</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECCION SERIES */}
                    {vistaActual.data.info.categoria.toUpperCase().includes("SERIE") && (
                        <div className="mt-4 relative z-10">
                            <div className="flex gap-3 mb-4 overflow-x-auto no-scrollbar">
                                {Array.from({ length: Math.ceil(vistaActual.data.items.length / 10) }).map((_, i) => (
                                    <div key={i} id={`range-${i}`} className={`px-6 py-2 rounded-xl text-[10px] font-black border transition-all ${rangoCapitulos === i ? 'bg-green-600 border-green-500 text-white' : 'bg-zinc-900 border-white/5 text-zinc-600'} ${focoZona === 'selector' && rangoCapitulos === i ? 'ring-2 ring-white scale-105' : ''}`}>
                                        {i * 10 + 1}-{Math.min((i + 1) * 10, vistaActual.data.items.length)}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-6 overflow-x-auto no-scrollbar py-4 px-2">
                                {vistaActual.data.items.slice(rangoCapitulos * 10, (rangoCapitulos + 1) * 10).map((v, i) => (
                                    <VideoCard key={i} id={`cap-${i}`} video={{...v, num: (rangoCapitulos * 10) + i + 1}} esSeleccionado={focoZona === 'grid' && indiceAux === i} esEpisodio={true} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* SECCION SUGERENCIAS */}
                    {sugerencias.length > 0 && (
                        <div className="mt-auto relative z-10 pt-4 pb-8">
                            <h3 className="text-[10px] font-black text-green-500 uppercase tracking-widest mb-3 opacity-60">Te podría gustar</h3>
                            <div className="flex gap-4 overflow-x-auto no-scrollbar">
                                {sugerencias.map((sug, i) => (
                                    <VideoCard 
                                        key={i} 
                                        id={`sug-${i}`} 
                                        video={sug} 
                                        esSugerencia={true} 
                                        esSeleccionado={focoZona === 'sugerencias' && indiceAux === i} 
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
