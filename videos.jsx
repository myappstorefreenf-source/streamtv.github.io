const { useState, useEffect, useRef, useCallback } = React;

// --- COMPONENTE CARÁTULA ---
const VideoCard = ({ video, esSeleccionado, id, esEpisodio }) => (
    <div 
        id={id}
        className={`flex-shrink-0 transition-all duration-300 ${
            esEpisodio ? 'w-24 h-24' : 'w-44'
        } ${esSeleccionado ? 'scale-110 ring-4 ring-red-600 z-10' : 'opacity-50'}`}
    >
        <div className={`rounded-xl overflow-hidden shadow-lg border border-white/5 ${
            esEpisodio ? 'h-full bg-zinc-800 flex items-center justify-center' : 'aspect-[2/3] bg-zinc-900'
        }`}>
            {esEpisodio ? (
                <div className="flex flex-col items-center">
                    <span className="text-[10px] uppercase opacity-50">Cap</span>
                    <span className="text-3xl font-black">{video.num}</span>
                </div>
            ) : (
                <img src={video.logo} className="w-full h-full object-cover" loading="lazy" />
            )}
        </div>
        {!esEpisodio && (
            <p className="mt-2 text-[10px] font-bold truncate text-center text-zinc-400 uppercase">{video.titulo}</p>
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
    const [focoEnSelector, setFocoEnSelector] = useState(false);
    const [focoEnVideo, setFocoEnVideo] = useState(false);
    const [enPantallaCompleta, setEnPantallaCompleta] = useState(false);

    useEffect(() => {
        // Leemos directamente de la variable global que creamos en lista.js
        const data = window.m3uData;
        if (!data) {
            console.error("No se encontró la variable m3uData en lista.js");
            return;
        }

        const lines = data.split('\n');
        const d = {};
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('#EXTINF')) {
                const info = lines[i];
                const url = lines[i + 1]?.trim();
                const cat = info.match(/group-title="([^"]+)"/)?.[1] || "Películas";
                if (!d[cat]) d[cat] = [];
                if (url && url.startsWith('http')) {
                    d[cat].push({
                        titulo: info.match(/tvg-name="([^"]+)"/)?.[1] || info.split(',')[1] || "Sin título",
                        logo: info.match(/tvg-logo="([^"]+)"/)?.[1] || "",
                        url: url,
                        categoria: cat
                    });
                }
            }
        }
        setCatalogo(d);
        setCategorias(Object.keys(d));
    }, []);

    const reproducir = (url, titulo) => {
        if (window.AndroidInterface) {
            window.AndroidInterface.playVideo(url, titulo);
        } else {
            console.log("PLAY:", titulo, url);
        }
    };

    // NAVEGACIÓN GLOBAL
    useEffect(() => {
        const handleKeys = (e) => {
            const isEnter = e.key === 'Enter' || e.keyCode === 13;
            const isBack = e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 8;

            if (enPantallaCompleta) {
                if (isBack) {
                    e.preventDefault();
                    setEnPantallaCompleta(false);
                    if (document.fullscreenElement) document.exitFullscreen();
                }
                return;
            }

            if (isBack) {
                if (vistaActual.tipo !== 'home') {
                    setVistaActual({ tipo: 'home', data: null });
                    setIndiceAux(0);
                    setFocoEnSelector(false);
                    setFocoEnVideo(false);
                    return;
                }
            }

            if (vistaActual.tipo === 'detalle') {
                const esSerie = vistaActual.data.info.categoria.toUpperCase().includes("SERIES");
                const items = vistaActual.data.items;

                if (focoEnVideo) {
                    if (e.key === 'ArrowDown') setFocoEnVideo(false);
                    if (isEnter) {
                        setEnPantallaCompleta(true);
                        const elem = document.getElementById('visor-serie');
                        if (elem.requestFullscreen) elem.requestFullscreen();
                    }
                } else if (focoEnSelector && esSerie) {
                    if (e.key === 'ArrowUp') setFocoEnVideo(true);
                    if (e.key === 'ArrowDown') { setFocoEnSelector(false); setIndiceAux(0); }
                    if (e.key === 'ArrowRight') setRangoCapitulos(p => Math.min(p + 1, Math.ceil(items.length / 10) - 1));
                    if (e.key === 'ArrowLeft') setRangoCapitulos(p => Math.max(p - 1, 0));
                } else {
                    if (e.key === 'ArrowUp') {
                        if (esSerie) setFocoEnSelector(true);
                        else setFocoEnVideo(true);
                    }
                    if (esSerie) {
                        const maxEnRango = Math.min(10, items.length - (rangoCapitulos * 10)) - 1;
                        if (e.key === 'ArrowRight') setIndiceAux(p => Math.min(p + 1, maxEnRango));
                        if (e.key === 'ArrowLeft') setIndiceAux(p => Math.max(p - 1, 0));
                    }
                    if (isEnter) setFocoEnVideo(true);
                }
                return;
            }

            if (vistaActual.tipo === 'home') {
                const catNombre = categorias[filaActiva];
                const filaItems = catalogo[catNombre] || [];
                const maxCol = Math.min(filaItems.length - 1, 9);

                if (e.key === 'ArrowRight') setColumnaActiva(p => Math.min(p + 1, maxCol));
                if (e.key === 'ArrowLeft') setColumnaActiva(p => Math.max(p - 1, 0));
                if (e.key === 'ArrowDown') { setFilaActiva(p => Math.min(p + 1, categorias.length - 1)); setColumnaActiva(0); }
                if (e.key === 'ArrowUp') { setFilaActiva(p => Math.max(p - 1, 0)); setColumnaActiva(0); }
                
                if (isEnter) {
                    const item = filaItems[columnaActiva];
                    setVistaActual({ tipo: 'detalle', data: { info: item, items: filaItems } });
                    setRangoCapitulos(0); setIndiceAux(0);
                }
            }
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [filaActiva, columnaActiva, categorias, catalogo, vistaActual, indiceAux, rangoCapitulos, focoEnSelector, focoEnVideo, enPantallaCompleta]);

    // SCROLL PRO RESTAURADO
    useEffect(() => {
        if (enPantallaCompleta) return;
        let id = "";
        if (vistaActual.tipo === 'home') {
            id = `item-${filaActiva}-${columnaActiva}`;
            // Forzar scroll de la fila primero
            document.getElementById(`row-${filaActiva}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (vistaActual.tipo === 'detalle') {
            id = focoEnVideo ? "visor-serie" : (focoEnSelector ? `sel-${rangoCapitulos}` : `cap-${indiceAux}`);
        }
        
        if (id) {
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
            }, 50);
        }
    }, [filaActiva, columnaActiva, indiceAux, vistaActual, rangoCapitulos, focoEnSelector, focoEnVideo, enPantallaCompleta]);

    return (
        <div className="min-h-screen bg-black text-white p-8 font-sans overflow-hidden">
            {vistaActual.tipo === 'home' && (
                <div className="pb-96 pt-10">
                    <h1 className="text-4xl font-black text-red-600 mb-16 italic tracking-tighter">MOVIETUBE</h1>
                    {categorias.map((cat, fIdx) => (
                        <div key={cat} id={`row-${fIdx}`} className="mb-24">
                            <h2 className={`text-2xl font-black mb-6 uppercase ${filaActiva === fIdx ? 'text-white' : 'text-zinc-800'}`}>{cat}</h2>
                            <div className="flex gap-6 overflow-x-hidden p-4 items-center">
                                {catalogo[cat].slice(0, 10).map((v, cIdx) => (
                                    <VideoCard key={cIdx} id={`item-${fIdx}-${cIdx}`} video={v} esSeleccionado={filaActiva === fIdx && columnaActiva === cIdx} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {vistaActual.tipo === 'detalle' && (
                <div className="fixed inset-0 bg-zinc-950 z-[100] p-12 flex flex-col">
                    <div className="flex justify-between items-start mb-10 border-b border-white/5 pb-8">
                        <div className="flex gap-8 max-w-2xl">
                            <img src={vistaActual.data.info.logo} className="w-44 h-64 rounded-xl shadow-2xl object-cover" />
                            <div>
                                <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-4">{vistaActual.data.info.titulo}</h2>
                                <p className="text-red-600 font-bold uppercase tracking-[0.2em] text-sm mb-6">
                                    {vistaActual.data.info.categoria.toUpperCase().includes("SERIES") ? "Serie de TV" : "Película"}
                                </p>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    {vistaActual.data.info.categoria.toUpperCase().includes("SERIES") 
                                        ? "Disfruta de todos los capítulos de esta temporada. Selecciona un episodio abajo para comenzar la reproducción en el visor."
                                        : "Esta película está disponible en alta definición. Puedes ver un adelanto en el visor lateral o pulsar OK en el visor para disfrutarla en pantalla completa."}
                                </p>
                            </div>
                        </div>
                        
                        <div 
                            id="visor-serie" 
                            className={`relative transition-all duration-300 ${
                                enPantallaCompleta 
                                ? 'fixed inset-0 z-[200] bg-black w-screen h-screen' 
                                : `w-[500px] aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border-4 ${
                                    focoEnVideo ? 'border-red-600 scale-105 ring-8 ring-red-600/20' : 'border-zinc-800 opacity-80'
                                  }`
                            }`}
                        >
                            <video 
                                key={vistaActual.data.info.categoria.toUpperCase().includes("SERIES") 
                                    ? vistaActual.data.items[(rangoCapitulos * 10) + indiceAux]?.url 
                                    : vistaActual.data.info.url}
                                src={vistaActual.data.info.categoria.toUpperCase().includes("SERIES") 
                                    ? vistaActual.data.items[(rangoCapitulos * 10) + indiceAux]?.url 
                                    : vistaActual.data.info.url}
                                autoPlay muted={!enPantallaCompleta} loop={!enPantallaCompleta}
                                className="w-full h-full object-contain"
                            />
                            {focoEnVideo && !enPantallaCompleta && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                    <div className="bg-red-600 text-white px-5 py-2 rounded-full font-black text-[10px] animate-pulse">OK PANTALLA COMPLETA</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {vistaActual.data.info.categoria.toUpperCase().includes("SERIES") && (
                        <>
                            <div className="flex gap-3 mb-10">
                                {Array.from({ length: Math.ceil(vistaActual.data.items.length / 10) }).map((_, i) => (
                                    <div key={i} id={`sel-${i}`} className={`px-5 py-1.5 rounded-full font-black text-sm transition-all ${rangoCapitulos === i && focoEnSelector ? 'bg-red-600 scale-110' : rangoCapitulos === i ? 'bg-zinc-700' : 'bg-zinc-900 opacity-40'}`}>
                                        {i * 10 + 1}-{Math.min((i + 1) * 10, vistaActual.data.items.length)}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-6 p-4">
                                {vistaActual.data.items.slice(rangoCapitulos * 10, (rangoCapitulos + 1) * 10).map((v, i) => (
                                    <VideoCard 
                                        key={i} id={`cap-${i}`} 
                                        video={{...v, num: (rangoCapitulos * 10) + i + 1}} 
                                        esSeleccionado={!focoEnSelector && !focoEnVideo && indiceAux === i} 
                                        esEpisodio={true} 
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);