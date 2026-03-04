const { useState, useEffect, useRef, useMemo } = React;

// --- COMPONENTE: TECLADO VIRTUAL (HÍBRIDO) ---
const VirtualKeyboard = ({ onKeyPress, onBackspace, onClose, busqueda }) => {
    const rows = [
        ['A','B','C','D','E','F'],['G','H','I','J','K','L'],
        ['M','N','O','P','Q','R'],['S','T','U','V','W','X'],
        ['Y','Z','1','2','3','4'],['5','6','7','8','9','0']
    ];
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
            if (e.key === 'Enter') {
                if (!isBottom) onKeyPress(rows[f][c]);
                else { if (bCol === 0) onKeyPress(' '); if (bCol === 1) onBackspace(); if (bCol === 2) onClose(); }
            }
        };
        window.addEventListener('keydown', handleK);
        return () => window.removeEventListener('keydown', handleK);
    }, [f, c, isBottom, bCol]);

    return (
        <div className="bg-zinc-900 p-4 rounded-2xl border border-white/10 shadow-2xl w-[320px] select-none touch-none">
            <div className="grid grid-cols-6 gap-1 mb-2">
                {rows.map((row, rIdx) => row.map((letra, cIdx) => (
                    <div 
                        key={`${rIdx}-${cIdx}`} 
                        onClick={() => onKeyPress(letra)}
                        className={`h-10 flex items-center justify-center rounded-lg font-bold text-sm cursor-pointer transition-transform active:scale-90 ${!isBottom && f === rIdx && c === cIdx ? 'bg-green-600 text-white scale-105 shadow-md' : 'bg-zinc-800 text-zinc-500'}`}
                    >
                        {letra}
                    </div>
                )))}
            </div>
            <div className="flex gap-1">
                {['ESPACIO', 'BORRAR', 'LISTO'].map((t, i) => (
                    <div 
                        key={t} 
                        onClick={() => { if(i===0) onKeyPress(' '); if(i===1) onBackspace(); if(i===2) onClose(); }}
                        className={`flex-1 py-3 rounded-lg text-[10px] font-black text-center cursor-pointer active:opacity-70 ${isBottom && bCol === i ? 'bg-green-600 text-white' : 'bg-zinc-800 text-zinc-600'}`}
                    >
                        {t}
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- COMPONENTE: VIDEO CARD (HÍBRIDO) ---
const VideoCard = ({ video, esSeleccionado, id, esEpisodio, esVerMas, total, onClick }) => (
    <div 
        id={id} 
        onClick={onClick}
        className={`flex-shrink-0 transition-all duration-300 cursor-pointer touch-manipulation ${esEpisodio ? 'w-28 h-28' : 'w-32'} ${esSeleccionado ? 'scale-95 ring-4 ring-green-600 z-10 opacity-100' : 'opacity-90'}`}
    >
        <div className={`rounded-xl overflow-hidden border border-white/5 flex items-center justify-center ${esVerMas ? 'bg-green-700 aspect-[2/3]' : esEpisodio ? 'h-full bg-zinc-800 shadow-inner rounded-2xl' : 'bg-zinc-900 aspect-[2/3] shadow-lg'}`}>
            {esVerMas ? (
                <div className="text-center p-4"><span className="block text-4xl mb-1">＋</span><span className="block text-[10px] font-black uppercase italic">Ver {total}</span></div>
            ) : esEpisodio ? (
                <div className="text-center"><div className="text-[10px] opacity-50 font-bold uppercase">Ep</div><div className="text-3xl font-black">{video.num}</div></div>
            ) : (
                <img src={video.logo} className="w-full h-full object-fill pointer-events-none" loading="lazy" />
            )}
        </div>
        {!esEpisodio && <p className={`mt-2 text-[10px] font-bold truncate text-center uppercase ${esSeleccionado ? 'text-white' : 'text-zinc-600'}`}>{esVerMas ? "Explorar Todo" : video.titulo}</p>}
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

    // --- CARGA DE DATOS ---
    useEffect(() => {
        const rawData = window.m3uData || "";
        if (!rawData) return;
        const lines = rawData.split('\n');
        const temp = {};
        lines.forEach((line, i) => {
            if (line.startsWith('#EXTINF')) {
                const next = lines[i + 1]?.trim() || "";
                const group = line.match(/group-title="([^"]+)"/)?.[1] || "Otros";
                const logo = line.match(/tvg-logo="([^"]+)"/)?.[1] || "";
                const title = line.match(/tvg-name="([^"]+)"/)?.[1] || line.split(',')[1] || "Sin título";
                if (next.startsWith('http')) {
                    if (!temp[group]) temp[group] = [];
                    temp[group].push({ titulo: title, logo, url: next, categoria: group });
                }
            }
        });
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

    // --- ACCIONES ---
    const lanzarVideoNativo = (url, titulo) => {
        if (window.AndroidInterface) window.AndroidInterface.playVideo(url, titulo);
        else console.log("Web Play:", url);
    };

    const navegarADetalle = (video, lista, extra = {}) => {
        setVistaActual({ tipo: 'detalle', data: { info: video, items: lista }, ...extra });
        setFocoZona('visor');
        setRangoCapitulos(0);
        setIndiceAux(0);
    };

    const handleCerrarVista = () => {
        if (vistaActual.fromGrid) setVistaActual({ tipo: 'grilla', data: vistaActual.fromGrid });
        else { setVistaActual({ tipo: 'home', data: null }); setFocoZona('grid'); }
    };

    // --- CONTROL REMOTO / TECLADO ---
    useEffect(() => {
        if (mostrarTeclado) return;
        const handleKeys = (e) => {
            const isEnter = e.key === 'Enter' || e.keyCode === 13;
            const isBack = ['Escape', 'Backspace'].includes(e.key) || e.keyCode === 8 || e.keyCode === 461;

            if (isBack) {
                e.preventDefault();
                if (vistaActual.tipo !== 'home') handleCerrarVista();
                else if (busqueda) setBusqueda("");
                return;
            }

            if (vistaActual.tipo === 'home') {
                if (e.key === 'ArrowUp') setFilaActiva(p => Math.max(p - 1, -1));
                if (e.key === 'ArrowDown') setFilaActiva(p => Math.min(p + 1, categoriasKeys.length - 1));
                if (filaActiva === -1) { if (isEnter) setMostrarTeclado(true); }
                else {
                    const items = catalogoFiltrado[categoriasKeys[filaActiva]] || [];
                    const maxCol = items.length > 10 ? 10 : items.length - 1;
                    if (e.key === 'ArrowRight') setColumnaActiva(p => Math.min(p + 1, maxCol));
                    if (e.key === 'ArrowLeft') setColumnaActiva(p => Math.max(p - 1, 0));
                    if (isEnter) {
                        if (columnaActiva === 10) setVistaActual({ tipo: 'grilla', data: { titulo: categoriasKeys[filaActiva], items } });
                        else navegarADetalle(items[columnaActiva], items);
                    }
                }
            } else if (vistaActual.tipo === 'grilla') {
                const total = vistaActual.data.items.length;
                if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, total - 1));
                if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                if (e.key === 'ArrowDown') setIndiceAux(p => Math.min(p + 6, total - 1));
                if (e.key === 'ArrowUp') setIndiceAux(p => Math.max(p - 6, 0));
                if (isEnter) navegarADetalle(vistaActual.data.items[indiceAux], vistaActual.data.items, { fromGrid: vistaActual.data });
            } else if (vistaActual.tipo === 'detalle') {
                const esSerie = vistaActual.data.info.categoria.toUpperCase().includes("SERIES");
                if (focoZona === 'visor') {
                    if (isEnter) lanzarVideoNativo(vistaActual.data.info.url, vistaActual.data.info.titulo);
                    if (e.key === 'ArrowDown') setFocoZona(esSerie ? 'selector' : 'grid');
                } else if (focoZona === 'selector') {
                    if (e.key === 'ArrowUp') setFocoZona('visor');
                    if (e.key === 'ArrowDown') setFocoZona('grid');
                    if (e.key === 'ArrowRight') setRangoCapitulos(p => Math.min(p + 1, Math.ceil(vistaActual.data.items.length / 10) - 1));
                    if (e.key === 'ArrowLeft') setRangoCapitulos(p => Math.max(p - 1, 0));
                } else if (focoZona === 'grid') {
                    const maxInPage = Math.min(10, vistaActual.data.items.length - (rangoCapitulos * 10)) - 1;
                    if (e.key === 'ArrowUp') setFocoZona(esSerie ? 'selector' : 'visor');
                    if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, maxInPage));
                    if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                    if (isEnter) {
                        const ep = vistaActual.data.items[(rangoCapitulos * 10) + indiceAux];
                        lanzarVideoNativo(ep.url, ep.titulo);
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, mostrarTeclado, busqueda, indiceAux, rangoCapitulos]);

    return (
        <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
            {/* VISTA HOME */}
            {vistaActual.tipo === 'home' && (
                <div className="h-full overflow-y-auto p-6 md:p-12 no-scrollbar">
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <h1 className="text-4xl font-black text-green-500 italic uppercase leading-none">Hood</h1>
                            <span className="text-[8px] text-zinc-600 font-bold tracking-[0.3em] uppercase">Mobile & TV Ready</span>
                        </div>
                        <div className="relative">
                            <div 
                                onClick={() => setMostrarTeclado(true)}
                                className={`w-48 md:w-72 px-4 py-2 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${filaActiva === -1 ? 'border-green-600 bg-zinc-800' : 'border-white/10 bg-zinc-900'}`}
                            >
                                <span className="truncate text-xs text-zinc-400">{busqueda || "Buscar..."}</span>
                                <div className="bg-green-600 text-[8px] px-2 py-1 rounded font-black">OK</div>
                            </div>
                            {mostrarTeclado && <div className="absolute top-12 right-0 z-[2000] shadow-2xl"><VirtualKeyboard busqueda={busqueda} onKeyPress={(t)=>setBusqueda(p=>p+t)} onBackspace={()=>setBusqueda(p=>p.slice(0,-1))} onClose={()=>setMostrarTeclado(false)} /></div>}
                        </div>
                    </div>

                    {categoriasKeys.map((cat, fIdx) => (
                        <div key={cat} className="mb-10">
                            <h2 className={`text-sm font-bold mb-3 uppercase tracking-widest ${filaActiva === fIdx ? 'text-green-500' : 'text-zinc-700'}`}>{cat}</h2>
                            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 scroll-smooth touch-pan-x">
                                {catalogoFiltrado[cat].slice(0, 11).map((v, cIdx) => (
                                    cIdx < 10 ? 
                                    <VideoCard key={cIdx} id={`item-${fIdx}-${cIdx}`} video={v} esSeleccionado={filaActiva === fIdx && columnaActiva === cIdx} onClick={() => navegarADetalle(v, catalogoFiltrado[cat])} /> :
                                    <VideoCard id={`item-${fIdx}-10`} esVerMas={true} total={catalogoFiltrado[cat].length} esSeleccionado={filaActiva === fIdx && columnaActiva === 10} onClick={() => setVistaActual({ tipo: 'grilla', data: { titulo: cat, items: catalogoFiltrado[cat] } })} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* VISTA GRILLA (VER TODO) */}
            {vistaActual.tipo === 'grilla' && (
                <div className="h-full overflow-y-auto p-6 md:p-12 bg-zinc-950 no-scrollbar">
                    <button onClick={handleCerrarVista} className="mb-6 bg-zinc-800 px-4 py-2 rounded-full text-xs font-bold uppercase">← Volver</button>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-8 pb-20">
                        {vistaActual.data.items.map((v, i) => <VideoCard key={i} id={`grid-item-${i}`} video={v} esSeleccionado={indiceAux === i} onClick={() => navegarADetalle(v, vistaActual.data.items, { fromGrid: vistaActual.data })} />)}
                    </div>
                </div>
            )}

            {/* VISTA DETALLE */}
            {vistaActual.tipo === 'detalle' && (
                <div className="fixed inset-0 bg-zinc-950 z-[100] p-6 md:p-10 flex flex-col overflow-y-auto no-scrollbar">
                    <div className="flex flex-col md:flex-row gap-6 md:gap-10 mb-6">
                        <div className="w-32 md:w-48 aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 mx-auto md:mx-0 flex-shrink-0">
                            <img src={vistaActual.data.info.logo} className="w-full h-full object-fill" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h2 className="text-2xl md:text-4xl font-black uppercase italic mb-2 tracking-tighter">{vistaActual.data.info.titulo}</h2>
                            <span className="inline-block bg-green-600/20 text-green-500 px-3 py-1 rounded text-xs font-bold mb-6">{vistaActual.data.info.categoria}</span>
                            <div className="flex flex-col md:flex-row gap-4">
                                <button onClick={() => lanzarVideoNativo(vistaActual.data.info.url, vistaActual.data.info.titulo)} className="bg-green-600 px-8 py-3 rounded-xl font-black uppercase text-sm shadow-lg active:scale-95">Reproducir Ahora</button>
                                <button onClick={handleCerrarVista} className="bg-zinc-800 px-8 py-3 rounded-xl font-black uppercase text-sm active:scale-95">Regresar</button>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN EPISODIOS (SOLO SI ES SERIE) */}
                    {vistaActual.data.info.categoria.toUpperCase().includes("SERIES") && (
                        <div className="mt-8 border-t border-white/5 pt-6">
                            <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
                                {Array.from({ length: Math.ceil(vistaActual.data.items.length / 10) }).map((_, i) => (
                                    <div 
                                        key={i} 
                                        onClick={() => { setRangoCapitulos(i); setFocoZona('grid'); }}
                                        className={`px-4 py-2 rounded-lg text-[10px] font-black cursor-pointer whitespace-nowrap ${rangoCapitulos === i ? 'bg-green-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}
                                    >
                                        CAPS {i * 10 + 1}-{Math.min((i + 1) * 10, vistaActual.data.items.length)}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4 overflow-x-auto no-scrollbar py-2 touch-pan-x">
                                {vistaActual.data.items.slice(rangoCapitulos * 10, (rangoCapitulos + 1) * 10).map((v, i) => (
                                    <VideoCard 
                                        key={i} 
                                        video={{...v, num: (rangoCapitulos * 10) + i + 1}} 
                                        esSeleccionado={focoZona === 'grid' && indiceAux === i} 
                                        esEpisodio={true} 
                                        onClick={() => lanzarVideoNativo(v.url, v.titulo)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
