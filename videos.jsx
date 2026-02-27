const { useState, useEffect, useRef, useMemo } = React;

// --- TECLADO VIRTUAL ---
const VirtualKeyboard = ({ onKeyPress, onBackspace, onClose, busqueda }) => {
    const rows = [['A','B','C','D','E','F'],['G','H','I','J','K','L'],['M','N','O','P','Q','R'],['S','T','U','V','W','X'],['Y','Z','1','2','3','4'],['5','6','7','8','9','0']];
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
                if (!isBottom) onKeyPress(rows[f][c]);
                else { if (bCol === 0) onKeyPress(' '); if (bCol === 1) onBackspace(); if (bCol === 2) onClose(); }
            }
        };
        window.addEventListener('keydown', handleK);
        return () => window.removeEventListener('keydown', handleK);
    }, [f, c, isBottom, bCol]);

    return (
        <div translate="no" className="bg-zinc-900 p-4 rounded-2xl border border-white/10 shadow-2xl w-[320px] select-none">
            <div className="grid grid-cols-6 gap-1 mb-2">
                {rows.map((row, rIdx) => row.map((letra, cIdx) => (
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

const VideoCard = ({ video, esSeleccionado, id, esEpisodio, esVerMas, total }) => (
    <div id={id} className={`flex-shrink-0 transition-all duration-300 ${esEpisodio ? 'w-28 h-28' : 'w-32'} ${esSeleccionado ? 'scale-95 ring-4  ring-green-600 z-10 opacity-100' : 'opacity-90'}`}>
        <div className={`rounded-xl overflow-hidden border border-white/5 flex items-center justify-center ${esVerMas ? 'bg-green-700 aspect-[2/3]' : esEpisodio ? 'h-full bg-zinc-800 shadow-inner rounded-2xl' : 'bg-zinc-900 aspect-[2/3] shadow-lg'}`}>
            {esVerMas ? (
                <div className="text-center p-4"><span className="block text-4xl mb-1">＋</span><span className="block text-[10px] font-black uppercase italic">Ver {total}</span></div>
            ) : esEpisodio ? (
                <div className="text-center"><div className="text-[10px] opacity-50 font-bold uppercase">Ep</div><div className="text-3xl font-black">{video.num}</div></div>
            ) : (
                <img src={video.logo} className="w-full h-full object-fill" loading="lazy" />
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
    const [enPantallaCompleta, setEnPantallaCompleta] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const rawData = window.m3uData || "";
        if (!rawData) return;
        const lines = rawData.split('\n');
        const temp = {};
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.startsWith('#EXTINF')) {
                const next = lines[i + 1] ? lines[i + 1].trim() : "";
                const groupMatch = line.match(/group-title="([^"]+)"/);
                const category = groupMatch ? groupMatch[1] : "Otros";
                const logoMatch = line.match(/tvg-logo="([^"]+)"/);
                const nameMatch = line.match(/tvg-name="([^"]+)"/);
                const title = nameMatch ? nameMatch[1] : (line.split(',')[1] || "Sin título");
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
        setEnPantallaCompleta(false);
        setVistaActual({ tipo: 'home', data: null });
        setFocoZona('grid');
        setIndiceAux(0);
        setTimeout(() => setColumnaActiva(c => c), 50);
    };

    useEffect(() => {
        if (enPantallaCompleta || mostrarTeclado) return;
        const timer = setTimeout(() => {
            let id = "";
            if (vistaActual.tipo === 'home') id = filaActiva === -1 ? "fake-search" : `item-${filaActiva}-${columnaActiva}`;
            else if (vistaActual.tipo === 'grilla') id = `grid-item-${indiceAux}`;
            else if (vistaActual.tipo === 'detalle') {
                id = focoZona === 'visor' ? 'visor-container' : focoZona === 'selector' ? `range-${rangoCapitulos}` : `cap-${indiceAux}`;
            }
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }
        }, 100); 
        return () => clearTimeout(timer);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, mostrarTeclado, enPantallaCompleta, indiceAux, rangoCapitulos]);

    useEffect(() => {
        const handleKeys = (e) => {
            const isEnter = e.key === 'Enter' || e.keyCode === 13;
            const isBack = e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 8 || e.keyCode === 461 || e.keyCode === 27;

            if (isBack) {
                e.preventDefault();
                if (mostrarTeclado) { setMostrarTeclado(false); return; }
                if (enPantallaCompleta) { setEnPantallaCompleta(false); return; }
                if (vistaActual.tipo === 'detalle') {
                    if (vistaActual.fromGrid) setVistaActual({ tipo: 'grilla', data: vistaActual.fromGrid });
                    else handleCerrarVista();
                    return;
                }
                if (vistaActual.tipo === 'grilla') { handleCerrarVista(); return; }
                if (busqueda) { setBusqueda(""); return; } 
            }

            if (enPantallaCompleta && videoRef.current) {
                if (isEnter) { 
                    e.preventDefault(); 
                    if (videoRef.current.paused) videoRef.current.play().catch(()=>{}); 
                    else videoRef.current.pause();
                }
                if (e.key === 'ArrowRight') { e.preventDefault(); videoRef.current.currentTime += 10; }
                if (e.key === 'ArrowLeft') { e.preventDefault(); videoRef.current.currentTime -= 10; }
                return;
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
                            setVistaActual({ tipo: 'detalle', data: { info: items[columnaActiva], items } }); 
                            setFocoZona('visor'); setRangoCapitulos(0); setIndiceAux(0); 
                        }
                    }
                } else if (isEnter) setMostrarTeclado(true);
            } else if (vistaActual.tipo === 'grilla') {
                const total = vistaActual.data.items.length;
                const columnas = 6; // Coincide con el grid-cols-6 del diseño
                if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, total - 1));
                if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                // ARREGLO AQUÍ: Navegación vertical en la grilla
                if (e.key === 'ArrowDown') setIndiceAux(p => Math.min(p + columnas, total - 1));
                if (e.key === 'ArrowUp') setIndiceAux(p => Math.max(p - columnas, 0));
                
                if (isEnter) { 
                    setVistaActual({ tipo: 'detalle', data: { info: vistaActual.data.items[indiceAux], items: vistaActual.data.items }, fromGrid: vistaActual.data }); 
                    setFocoZona('visor'); 
                }
            } else if (vistaActual.tipo === 'detalle') {
                const esSerie = vistaActual.data.info.categoria.toUpperCase().includes("SERIES");
                if (focoZona === 'visor') {
                    if (isEnter) setEnPantallaCompleta(true);
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
                    if (isEnter) setEnPantallaCompleta(true);
                }
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, mostrarTeclado, enPantallaCompleta, categoriasKeys, catalogoFiltrado, indiceAux, rangoCapitulos, busqueda]);

    const videoActualUrl = vistaActual.tipo === 'detalle' ? (vistaActual.data.info.categoria.toUpperCase().includes("SERIES") ? vistaActual.data.items[(rangoCapitulos * 10) + indiceAux]?.url : vistaActual.data.info.url) : "";

    return (
        <div translate="no" className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
            {vistaActual.tipo === 'home' && (
                <div className="h-full overflow-y-auto p-12 no-scrollbar">
                    <div className="flex justify-between items-start mb-16">
                        <div className="flex flex-col">
                            <h1 className="text-5xl font-black text-green-300 italic uppercase leading-none">Hood</h1>
                            <span className="text-[10px] text-zinc-700 font-bold tracking-[0.3em] ml-1 uppercase">Premium Interface</span>
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

            {vistaActual.tipo === 'grilla' && (
                <div className="h-full overflow-y-auto p-12 no-scrollbar bg-zinc-950">
                    <div className="flex items-center gap-6 mb-10">
                        <button onClick={handleCerrarVista} className="bg-zinc-800 p-2 rounded-full text-zinc-400">←</button>
                        <h2 className="text-3xl font-black text-green-600 uppercase italic tracking-tighter leading-none">{vistaActual.data.titulo}</h2>
                    </div>
                    {/* El grid es de 6 columnas */}
                    <div className="grid grid-cols-6 gap-8 pb-32">
                        {vistaActual.data.items.map((v, i) => <VideoCard key={i} id={`grid-item-${i}`} video={v} esSeleccionado={indiceAux === i} />)}
                    </div>
                </div>
            )}

            {vistaActual.tipo === 'detalle' && (
                <div className="fixed inset-0 bg-zinc-950 z-[100] p-10 flex flex-col no-scrollbar overflow-hidden">
                    <div className="flex gap-10 mb-6">
                        <div className="w-48 aspect-[2/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex-shrink-0"><img src={vistaActual.data.info.logo} className="w-full h-full object-fill" /></div>
                        <div className="flex-1 overflow-hidden pt-4">
                            <h2 className="text-xl font-black uppercase italic mb-2 tracking-tighter leading-none truncate">{vistaActual.data.info.titulo}</h2>
                            <div className="flex gap-4 mb-6">
                                <span className="text- px-3 py-1 rounded text-[12px] font-black uppercase">{vistaActual.data.info.categoria}</span>
                                <span className="text-zinc-600 text-[10px] font-bold uppercase pt-1"></span>
                            </div>
                            <button onClick={handleCerrarVista} className="bg-zinc-800 px-8 py-3 rounded-xl text-[10px] font-black uppercase hover:bg-green-600 transition-all shadow-lg border border-white/5">← Volver al Menú</button>
                        </div>
                        <div id="visor-container" className={`${enPantallaCompleta ? 'fixed inset-0 z-[500] bg-black' : 'relative w-[480px] aspect-video bg-black rounded-3xl overflow-hidden border-4 ' + (focoZona === 'visor' ? 'border-green-600 scale-105 shadow-2xl shadow-green-600/30' : 'border-zinc-800')}`}>
                            <video ref={videoRef} src={videoActualUrl} key={videoActualUrl} className="w-full h-full object-contain" autoPlay disableRemotePlayback controls={enPantallaCompleta} />
                            {!enPantallaCompleta && <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1 rounded-full text-[8px] font-black text-white/50 uppercase tracking-widest">OK PARA PANTALLA COMPLETA</div>}
                        </div>
                    </div>
                    {vistaActual.data.info.categoria.toUpperCase().includes("SERIES") && (
                        <div className="mt-auto border-t border-white/5 pt-6 bg-zinc-950/50 backdrop-blur">
                            <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar py-1">
                                {Array.from({ length: Math.ceil(vistaActual.data.items.length / 10) }).map((_, i) => (
                                    <div key={i} id={`range-${i}`} className={`px-6 py-2 rounded-xl text-[10px] font-black border transition-all ${rangoCapitulos === i ? 'bg-green-600 border-green-500 text-white shadow-lg' : 'bg-zinc-900 border-white/5 text-zinc-600'} ${focoZona === 'selector' && rangoCapitulos === i ? 'ring-2 ring-white scale-10' : ''}`}>
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
                </div>
            )}
            <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .scroll-smooth { scroll-behavior: smooth; }`}</style>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
