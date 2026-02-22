const { useState, useEffect, useRef } = React;

// --- COMPONENTE CARÁTULA ---
const VideoCard = ({ video, esSeleccionado, id, esEpisodio, onClick, esVerMas, total }) => (
    <div 
        id={id}
        onClick={onClick}
        className={`flex-shrink-0 transition-all duration-300 cursor-pointer ${
            esEpisodio ? 'w-28 h-28' : 'w-44'
        } ${esSeleccionado ? 'scale-110 ring-4 ring-red-600 z-10 opacity-100' : 'opacity-40'}`}
    >
        <div className={`rounded-xl overflow-hidden shadow-lg border border-white/10 flex items-center justify-center ${
            esVerMas ? 'bg-red-700 aspect-[2/3]' : 
            esEpisodio ? 'h-full bg-zinc-800' : 'aspect-[2/3] bg-zinc-900'
        }`}>
            {esVerMas ? (
                <div className="text-center p-4">
                    <span className="block text-4xl mb-2">＋</span>
                    <span className="block text-xs font-black uppercase italic">Ver {total}</span>
                </div>
            ) : esEpisodio ? (
                <div className="flex flex-col items-center">
                    <span className="text-[10px] opacity-50 uppercase font-bold">Ep</span>
                    <span className="text-4xl font-black">{video.num}</span>
                </div>
            ) : (
                <img src={video.logo} className="w-full h-full object-cover" loading="lazy" />
            )}
        </div>
        {!esEpisodio && (
            <p className="mt-2 text-[10px] font-bold truncate text-center text-zinc-400 uppercase">
                {esVerMas ? "Explorar Todo" : video.titulo}
            </p>
        )}
    </div>
);

function App() {
    const [catalogo, setCatalogo] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [filaActiva, setFilaActiva] = useState(0);
    const [columnaActiva, setColumnaActiva] = useState(0);
    const [vistaActual, setVistaActual] = useState({ tipo: 'home', data: null });
    const [indiceAux, setIndiceAux] = useState(0);
    const [rangoCapitulos, setRangoCapitulos] = useState(0); 
    const [focoZona, setFocoZona] = useState('grid');
    const [enPantallaCompleta, setEnPantallaCompleta] = useState(false);
    
    const videoRef = useRef(null);

    useEffect(() => {
        const data = window.m3uData || "";
        const lines = data.split('\n');
        const d = {};
        lines.forEach((line, i) => {
            if (line.startsWith('#EXTINF')) {
                const url = lines[i + 1]?.trim();
                const cat = line.match(/group-title="([^"]+)"/)?.[1] || "Otros";
                if (!d[cat]) d[cat] = [];
                if (url?.startsWith('http')) {
                    d[cat].push({
                        titulo: line.match(/tvg-name="([^"]+)"/)?.[1] || line.split(',')[1] || "Sin título",
                        logo: line.match(/tvg-logo="([^"]+)"/)?.[1] || "",
                        url,
                        categoria: cat
                    });
                }
            }
        });
        setCatalogo(d);
        setCategorias(Object.keys(d));
    }, []);

    // ENGINE DE SCROLL (D-PAD)
    useEffect(() => {
        if (enPantallaCompleta) return;
        let id = "";
        if (vistaActual.tipo === 'home') id = `item-${filaActiva}-${columnaActiva}`;
        else if (vistaActual.tipo === 'grilla') id = `grid-item-${indiceAux}`;
        else if (vistaActual.tipo === 'detalle') {
            if (focoZona === 'visor') id = 'visor-container';
            else if (focoZona === 'selector') id = `range-${rangoCapitulos}`;
            else id = `cap-${indiceAux}`;
        }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }, [filaActiva, columnaActiva, indiceAux, vistaActual, focoZona, rangoCapitulos, enPantallaCompleta]);

    // AUTO-PLAY
    useEffect(() => {
        if (videoRef.current && videoActualUrl) {
            videoRef.current.load();
            videoRef.current.play().catch(() => {
                setTimeout(() => videoRef.current?.play(), 200);
            });
        }
    }, [vistaActual.data, indiceAux, rangoCapitulos]);

    // LÓGICA DE TECLAS
    useEffect(() => {
        const handleKeys = (e) => {
            const isEnter = e.key === 'Enter' || e.keyCode === 13;
            const isBack = e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 8 || e.keyCode === 4;

            if (isBack) {
                if (enPantallaCompleta) { e.preventDefault(); setEnPantallaCompleta(false); return; }
                if (vistaActual.tipo !== 'home') {
                    e.preventDefault();
                    setVistaActual({ tipo: 'home', data: null });
                    setIndiceAux(0); setRangoCapitulos(0); setFocoZona('grid');
                    return;
                }
                return;
            }

            if (enPantallaCompleta || focoZona === 'visor') {
                if (e.key === 'ArrowRight') { e.preventDefault(); if(videoRef.current) videoRef.current.currentTime += 10; return; }
                if (e.key === 'ArrowLeft') { e.preventDefault(); if(videoRef.current) videoRef.current.currentTime -= 10; return; }
                if (isEnter) {
                    e.preventDefault();
                    if(videoRef.current) videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
                    if(!enPantallaCompleta && focoZona === 'visor') setEnPantallaCompleta(true);
                    return;
                }
            }

            if (vistaActual.tipo === 'home') {
                const items = catalogo[categorias[filaActiva]] || [];
                const limite = items.length > 10 ? 11 : items.length;
                if (e.key === 'ArrowRight') setColumnaActiva(p => Math.min(p + 1, limite - 1));
                if (e.key === 'ArrowLeft') setColumnaActiva(p => Math.max(p - 1, 0));
                if (e.key === 'ArrowDown') { setFilaActiva(p => Math.min(p + 1, categorias.length - 1)); setColumnaActiva(0); }
                if (e.key === 'ArrowUp') { setFilaActiva(p => Math.max(p - 1, 0)); setColumnaActiva(0); }
                if (isEnter) {
                    if (columnaActiva === 10) setVistaActual({ tipo: 'grilla', data: { titulo: categorias[filaActiva], items: items } });
                    else setVistaActual({ tipo: 'detalle', data: { info: items[columnaActiva], items: items } });
                }
            } else if (vistaActual.tipo === 'grilla') {
                const total = vistaActual.data.items.length;
                if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, total - 1));
                if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                if (e.key === 'ArrowDown') setIndiceAux(p => Math.min(p + 5, total - 1));
                if (e.key === 'ArrowUp') setIndiceAux(p => Math.max(p - 5, 0));
                if (isEnter) setVistaActual({ tipo: 'detalle', data: { info: vistaActual.data.items[indiceAux], items: vistaActual.data.items } });
            } else if (vistaActual.tipo === 'detalle') {
                const esSerie = vistaActual.data.info.categoria.toUpperCase().includes("SERIES");
                const totalCaps = vistaActual.data.items.length;
                if (focoZona === 'visor') {
                    if (e.key === 'ArrowDown') setFocoZona(esSerie ? 'selector' : 'grid');
                } else if (focoZona === 'selector') {
                    if (e.key === 'ArrowUp') setFocoZona('visor');
                    if (e.key === 'ArrowDown') setFocoZona('grid');
                    if (e.key === 'ArrowRight') setRangoCapitulos(p => Math.min(p + 1, Math.ceil(totalCaps / 10) - 1));
                    if (e.key === 'ArrowLeft') setRangoCapitulos(p => Math.max(p - 1, 0));
                } else {
                    const maxEnEsteRango = Math.min(10, totalCaps - (rangoCapitulos * 10)) - 1;
                    if (e.key === 'ArrowUp') setFocoZona(esSerie ? 'selector' : 'visor');
                    if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, maxEnEsteRango));
                    if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                    if (isEnter) setFocoZona('visor');
                }
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, indiceAux, rangoCapitulos, enPantallaCompleta, categorias, catalogo]);

    const videoActualUrl = vistaActual.tipo === 'detalle' 
        ? (vistaActual.data.info.categoria.toUpperCase().includes("SERIES") 
            ? vistaActual.data.items[(rangoCapitulos * 10) + indiceAux]?.url 
            : vistaActual.data.info.url) : "";

    return (
        <div className="fixed inset-0 bg-black text-white font-sans overflow-hidden select-none">
            
            {vistaActual.tipo === 'home' && (
                <div className="h-full overflow-y-auto p-12 no-scrollbar touch-pan-y">
                    <h1 className="text-4xl font-black text-red-600 mb-12 italic tracking-tighter uppercase">MovieTube</h1>
                    {categorias.map((cat, fIdx) => (
                        <div key={cat} className="mb-16">
                            <h2 className={`text-xl font-bold mb-4 uppercase ${filaActiva === fIdx ? 'text-white' : 'text-zinc-700'}`}>{cat}</h2>
                            <div className="flex gap-6 overflow-x-auto no-scrollbar touch-pan-x p-4">
                                {catalogo[cat].slice(0, 10).map((v, cIdx) => (
                                    <VideoCard 
                                        key={cIdx} id={`item-${fIdx}-${cIdx}`} video={v} 
                                        esSeleccionado={filaActiva === fIdx && columnaActiva === cIdx} 
                                        onClick={() => { setFilaActiva(fIdx); setColumnaActiva(cIdx); setVistaActual({ tipo: 'detalle', data: { info: v, items: catalogo[cat] } }); }}
                                    />
                                ))}
                                {catalogo[cat].length > 10 && (
                                    <VideoCard 
                                        id={`item-${fIdx}-10`} esVerMas={true} total={catalogo[cat].length} 
                                        esSeleccionado={filaActiva === fIdx && columnaActiva === 10} 
                                        onClick={() => { setFilaActiva(fIdx); setColumnaActiva(10); setVistaActual({ tipo: 'grilla', data: { titulo: cat, items: catalogo[cat] } }); }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {vistaActual.tipo === 'grilla' && (
                <div className="h-full overflow-y-auto p-12 no-scrollbar bg-zinc-950">
                    <h2 className="text-3xl font-black mb-10 uppercase italic">Todo en {vistaActual.data.titulo}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12">
                        {vistaActual.data.items.map((v, i) => (
                            <VideoCard 
                                key={i} id={`grid-item-${i}`} video={v} esSeleccionado={indiceAux === i} 
                                onClick={() => { setIndiceAux(i); setVistaActual({ tipo: 'detalle', data: { info: v, items: vistaActual.data.items } }); }}
                            />
                        ))}
                    </div>
                </div>
            )}

            {vistaActual.tipo === 'detalle' && (
                <div className="fixed inset-0 bg-zinc-950 z-[100] p-6 md:p-10 flex flex-col overflow-y-auto no-scrollbar">
                    <div className="flex flex-col md:flex-row gap-10 mb-8">
                        <div className="flex gap-6 flex-1">
                            <img src={vistaActual.data.info.logo} className="w-32 h-48 md:w-44 md:h-64 rounded-xl object-cover shadow-2xl border border-white/10" />
                            <div>
                                <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase italic tracking-tighter leading-none">{vistaActual.data.info.titulo}</h2>
                                <button onClick={() => setVistaActual({tipo:'home', data:null})} className="bg-zinc-800 px-6 py-2 rounded-lg text-xs font-bold uppercase">← Volver</button>
                            </div>
                        </div>
                        
                        <div id="visor-container" onClick={() => setEnPantallaCompleta(true)} className={`${enPantallaCompleta ? 'fixed inset-0 z-[500] bg-black' : 'relative w-full md:w-[450px] aspect-video bg-black rounded-2xl overflow-hidden border-4 ' + (focoZona === 'visor' ? 'border-red-600 scale-105' : 'border-zinc-800')}`}>
                            <video ref={videoRef} src={videoActualUrl} key={videoActualUrl} className="w-full h-full object-contain" autoPlay playsInline controls={enPantallaCompleta} />
                            {!enPantallaCompleta && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center font-black text-xs uppercase text-red-500 animate-pulse">
                                    {videoRef.current?.paused ? '▶ PAUSA' : 'OK Fullscreen'}
                                </div>
                            )}
                        </div>
                    </div>

                    {vistaActual.data.info.categoria.toUpperCase().includes("SERIES") && (
                        <div className="mt-auto">
                            {/* SELECTOR RECTANGULAR DE CAPÍTULOS */}
                            <div className="flex gap-3 mb-6 overflow-x-auto no-scrollbar touch-pan-x p-2">
                                {Array.from({ length: Math.ceil(vistaActual.data.items.length / 10) }).map((_, i) => (
                                    <div 
                                        key={i} id={`range-${i}`} 
                                        onClick={() => setRangoCapitulos(i)}
                                        className={`px-5 py-2 rounded-lg text-[11px] font-black transition-all cursor-pointer border border-white/5 ${rangoCapitulos === i ? 'bg-red-600 text-white' : 'bg-zinc-900 text-zinc-500 opacity-60'} ${focoZona === 'selector' && rangoCapitulos === i ? 'ring-2 ring-white scale-110 opacity-100' : ''}`}>
                                        {i * 10 + 1}-{Math.min((i + 1) * 10, vistaActual.data.items.length)}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-6 p-4 overflow-x-auto no-scrollbar touch-pan-x">
                                {vistaActual.data.items.slice(rangoCapitulos * 10, (rangoCapitulos + 1) * 10).map((v, i) => (
                                    <VideoCard 
                                        key={i} id={`cap-${i}`} video={{...v, num: (rangoCapitulos * 10) + i + 1}} 
                                        esSeleccionado={focoZona === 'grid' && indiceAux === i} esEpisodio={true} 
                                        onClick={() => { setIndiceAux(i); setFocoZona('visor'); }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
