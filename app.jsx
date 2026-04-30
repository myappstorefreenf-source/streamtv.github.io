const { useState, useEffect, useMemo, useRef } = React;

function App() {
    const [catalogos, setCatalogos] = useState(null);
    const [seccionActual, setSeccionActual] = useState('tv'); 
    const [filaIdx, setFilaIdx] = useState(0);
    const [colIdx, setColIdx] = useState(0);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [categoriaExpandida, setCategoriaExpandida] = useState(null);
    const [itemSeleccionado, setItemSeleccionado] = useState(null); // Para la vista de detalle profunda
    
    useEffect(() => {
        const iniciarApp = () => {
            if (!window.ContentParser || !window.m3uTV || !window.m3uVOD) return;
            setCatalogos({
                tv: window.ContentParser.parsearTV(window.m3uTV),
                ...window.ContentParser.parsearVOD(window.m3uVOD)
            });
        };
        setTimeout(iniciarApp, 300);
    }, []);

    const contenidoVisible = useMemo(() => {
        if (!catalogos) return {};
        return catalogos[seccionActual] || {};
    }, [seccionActual, catalogos]);

    const categoriasKeys = Object.keys(contenidoVisible);
    
    const itemEnFoco = useMemo(() => {
        if (seccionActual === 'tv' || categoriaExpandida) return null;
        const cat = categoriasKeys[filaIdx];
        return contenidoVisible[cat]?.[colIdx] || null;
    }, [filaIdx, colIdx, contenidoVisible, categoriasKeys, seccionActual, categoriaExpandida]);

    useEffect(() => {
        const id = itemSeleccionado ? 'btn-play' : menuAbierto ? `menu-${filaIdx}` : categoriaExpandida ? `grid-${colIdx}` : `card-${filaIdx}-${colIdx}`;
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }, [filaIdx, colIdx, menuAbierto, categoriaExpandida, itemSeleccionado]);

    useEffect(() => {
        const handleKeys = (e) => {
            if (e.key === 'Escape' || e.keyCode === 27) {
                if (itemSeleccionado) setItemSeleccionado(null);
                else if (categoriaExpandida) { setCategoriaExpandida(null); setColIdx(0); }
                else if (menuAbierto) setMenuAbierto(false);
                return;
            }

            if (itemSeleccionado) {
                if (e.key === 'Enter') {
                    if (window.AndroidInterface) window.AndroidInterface.playVideo(itemSeleccionado.url, itemSeleccionado.titulo);
                }
                return;
            }

            if (menuAbierto) {
                if (e.key === 'ArrowDown') setFilaIdx(p => Math.min(p + 1, window.AppConfig.SECCIONES.length - 1));
                if (e.key === 'ArrowUp') setFilaIdx(p => Math.max(p - 1, 0));
                if (e.key === 'Enter') {
                    setSeccionActual(window.AppConfig.SECCIONES[filaIdx].id);
                    setMenuAbierto(false); setCategoriaExpandida(null); setFilaIdx(0); setColIdx(0);
                }
            } else if (categoriaExpandida) {
                const items = contenidoVisible[categoriaExpandida] || [];
                if (e.key === 'ArrowRight') setColIdx(p => Math.min(p + 1, items.length - 1));
                if (e.key === 'ArrowLeft') setColIdx(p => Math.max(p - 1, 0));
                if (e.key === 'ArrowDown') setColIdx(p => Math.min(p + 5, items.length - 1));
                if (e.key === 'ArrowUp') setColIdx(p => Math.max(p - 5, 0));
                if (e.key === 'Enter') setItemSeleccionado(items[colIdx]);
            } else {
                const filaData = contenidoVisible[categoriasKeys[filaIdx]] || [];
                
                if (seccionActual === 'tv') {
                    if (e.key === 'ArrowDown') {
                        if (colIdx < filaData.length - 1) setColIdx(p => p + 1);
                        else if (filaIdx < categoriasKeys.length - 1) { setFilaIdx(p => p + 1); setColIdx(0); }
                    }
                    if (e.key === 'ArrowUp') {
                        if (colIdx > 0) setColIdx(p => p - 1);
                        else if (filaIdx > 0) {
                            setFilaIdx(p => p - 1);
                            setColIdx(contenidoVisible[categoriasKeys[filaIdx-1]].length - 1);
                        }
                    }
                    if (e.key === 'ArrowLeft') setMenuAbierto(true);
                    if (e.key === 'Enter') {
                        const item = filaData[colIdx];
                        if (item && window.AndroidInterface) window.AndroidInterface.playVideo(item.url, item.titulo);
                    }
                } else {
                    const limite = Math.min(filaData.length, 10);
                    if (e.key === 'ArrowRight') setColIdx(p => Math.min(p + 1, limite));
                    if (e.key === 'ArrowLeft' && colIdx === 0) setMenuAbierto(true);
                    else if (e.key === 'ArrowLeft') setColIdx(p => Math.max(p - 1, 0));
                    if (e.key === 'ArrowDown' && filaIdx < categoriasKeys.length - 1) { setFilaIdx(p => p + 1); setColIdx(0); }
                    if (e.key === 'ArrowUp' && filaIdx > 0) { setFilaIdx(p => p - 1); setColIdx(0); }
                    
                    if (e.key === 'Enter') {
                        if (colIdx === 10) { setCategoriaExpandida(categoriasKeys[filaIdx]); setColIdx(0); }
                        else setItemSeleccionado(filaData[colIdx]);
                    }
                }
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [menuAbierto, filaIdx, colIdx, categoriasKeys, contenidoVisible, categoriaExpandida, seccionActual, itemSeleccionado]);

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden font-sans select-none">
            {/* VISTA DE DETALLE COMPLETA (MODAL) */}
            {itemSeleccionado && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-20 animate-in fade-in zoom-in duration-300">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" />
                    <div className="relative flex gap-12 max-w-6xl w-full">
                        <img src={itemSeleccionado.logo} className="w-96 rounded-2xl shadow-2xl border border-white/10" />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-7xl font-black italic uppercase mb-4 tracking-tighter text-green-600">{itemSeleccionado.titulo}</h1>
                            <p className="text-zinc-400 text-xl mb-10 max-w-2xl leading-relaxed">
                                Disfruta de este contenido en alta definición. Parte de la selección exclusiva de Hood Project.
                            </p>
                            <div id="btn-play" className="bg-green-600 text-black px-10 py-4 rounded-xl font-black text-2xl flex items-center gap-4 w-fit scale-110 shadow-[0_0_50px_rgba(22,163,74,0.4)]">
                                <span>▶</span> REPRODUCIR AHORA
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SIDEBAR */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-zinc-900 border-r border-green-900/20 transition-transform duration-300 ${menuAbierto ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-10">
                    <h2 className="text-3xl font-black text-green-600 italic mb-10">H- PROJECT</h2>
                    {window.AppConfig.SECCIONES.map((sec, i) => (
                        <div key={sec.id} id={`menu-${i}`} className={`p-4 mb-3 rounded-lg flex items-center gap-4 ${menuAbierto && filaIdx === i ? 'bg-green-600' : 'opacity-30'}`}>
                            <span className="font-black text-xs uppercase tracking-widest">{sec.label}</span>
                        </div>
                    ))}
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className={`flex-1 transition-all duration-500 ${menuAbierto ? 'ml-72 opacity-20' : 'ml-0'}`}>
                <div className="h-full p-12">
                    {categoriaExpandida ? (
                        <div className="h-full overflow-y-auto no-scrollbar">
                            <h1 className="text-5xl font-black text-green-600 mb-10 uppercase italic">{categoriaExpandida}</h1>
                            <div className="grid grid-cols-5 gap-6 pb-20">
                                {contenidoVisible[categoriaExpandida].map((item, i) => (
                                    <div key={i} id={`grid-${i}`} className={`aspect-[2/3] border-4 rounded-xl overflow-hidden transition-all ${colIdx === i ? 'border-green-600 scale-105 shadow-lg' : 'border-transparent opacity-40'}`}>
                                        <img src={item.logo} className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex h-full gap-8">
                            <div className={`${seccionActual === 'tv' ? 'w-full' : 'w-2/3'} h-full overflow-y-auto no-scrollbar pb-32`}>
                                <h1 className="text-7xl font-black italic uppercase mb-12 tracking-tighter">{seccionActual}</h1>
                                {categoriasKeys.map((cat, fIdx) => (
                                    <div key={cat} className="mb-14">
                                        <h2 className="text-zinc-600 font-black text-[10px] tracking-[0.4em] uppercase mb-6">{cat}</h2>
                                        <div className={`flex ${seccionActual === 'tv' ? 'flex-col gap-2' : 'gap-6'}`}>
                                            {contenidoVisible[cat].slice(0, seccionActual === 'tv' ? 999 : 10).map((item, cIdx) => (
                                                <div key={cIdx} id={`card-${fIdx}-${cIdx}`} className={`flex-shrink-0 transition-all border-4 rounded-xl overflow-hidden ${filaIdx === fIdx && colIdx === cIdx ? 'border-green-600 scale-[1.03] z-10 shadow-2xl' : 'border-transparent opacity-40'} ${seccionActual === 'tv' ? 'w-full max-w-3xl h-16' : 'w-40 aspect-[2/3]'}`}>
                                                    {seccionActual === 'tv' ? (
                                                        <div className="flex items-center h-full px-6 bg-zinc-900/50 gap-4">
                                                            <img src={item.logo} className="w-10 h-6 object-contain" />
                                                            <span className="font-black italic text-sm">{item.titulo}</span>
                                                        </div>
                                                    ) : <img src={item.logo} className="w-full h-full object-cover" />}
                                                </div>
                                            ))}
                                            {seccionActual !== 'tv' && contenidoVisible[cat].length > 10 && (
                                                <div id={`card-${fIdx}-10`} className={`flex-shrink-0 w-40 aspect-[2/3] border-4 rounded-xl flex flex-col items-center justify-center bg-zinc-900 transition-all ${filaIdx === fIdx && colIdx === 10 ? 'border-green-600 scale-110 shadow-2xl' : 'border-transparent opacity-40'}`}>
                                                    <span className="text-4xl font-black text-green-600">+</span>
                                                    <span className="text-[10px] font-black">VER TODO</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {/* DETALLES LADO DERECHO (NAVEGACIÓN) */}
                            {seccionActual !== 'tv' && (
                                <div className="w-1/3 flex flex-col items-center pt-20 text-center">
                                    {itemEnFoco && colIdx !== 10 && (
                                        <div className="animate-in fade-in duration-500">
                                            <img src={itemEnFoco.logo} className="w-64 aspect-[2/3] object-cover rounded-2xl shadow-2xl mb-8 border border-white/10" />
                                            <h2 className="text-4xl font-black italic uppercase leading-none">{itemEnFoco.titulo}</h2>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);