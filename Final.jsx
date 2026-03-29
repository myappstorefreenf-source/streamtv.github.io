const { useState, useEffect, useRef, useMemo } = React;

// --- COMPONENTE: TECLADO VIRTUAL ---
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
            if (e.key === 'Enter' || e.keyCode === 13) {
                if (!isBottom) onKeyPress(filas[f][c]);
                else { if (bCol === 0) onKeyPress(' '); if (bCol === 1) onBackspace(); if (bCol === 2) onClose(); }
            }
        };
        window.addEventListener('keydown', handleK);
        return () => window.removeEventListener('keydown', handleK);
    }, [f, c, isBottom, bCol]);

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

// --- COMPONENTE: VIDEO CARD ---
const VideoCard = ({ video, esSeleccionado, id, esEpisodio, esVerMas, total, esSugerencia }) => (
    <div id={id} className={`flex-shrink-0 transition-all duration-300 ${esSugerencia ? 'w-24' : esEpisodio ? 'w-28 h-28' : 'w-32'} ${esSeleccionado ? 'scale-110 ring-2 ring-green-600 z-10 opacity-100 shadow-[0_0_25px_rgba(34,197,94,0.4)]' : 'opacity-60'}`}>
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

// --- COMPONENTE: SIDE MENU (Transparente y Fijo) ---
const SideMenu = ({ activo, itemSeleccionado }) => {
    const opciones = [
        { id: 'search', label: 'BUSCAR', icon: '🔍' },
        { id: 'tv', label: 'VIVO', icon: '📺' },
        { id: 'vod', label: 'CONTENIDO', icon: '🎬' }
    ];

    return (
        <div className={`fixed left-0 top-0 h-screen z-[500] flex flex-col items-center py-10 transition-all duration-500
            ${activo ? 'w-64 bg-black/40 backdrop-blur-xl' : 'w-20 bg-transparent'}`}>
            <div className="mb-20 text-white font-black text-3xl italic">{activo ? 'HOOD' : 'H'}</div>
            <div className="flex flex-col gap-10 w-full items-center">
                {opciones.map((opt, index) => (
                    <div key={opt.id} className={`flex items-center transition-all duration-300 w-full px-6 ${itemSeleccionado === index ? 'text-green-500 scale-110' : 'text-zinc-500'}`}>
                        <span className="text-2xl min-w-[32px] text-center">{opt.icon}</span>
                        <span className={`ml-4 font-black tracking-widest overflow-hidden transition-all duration-500 whitespace-nowrap ${activo ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'}`}>{opt.label}</span>
                    </div>
                ))}
            </div>
            <div className="absolute left-0 w-1 bg-green-500 transition-all duration-300 rounded-r-full" style={{ height: '40px', top: `${176 + (itemSeleccionado * 72)}px`, opacity: itemSeleccionado >= 0 ? 1 : 0 }} />
        </div>
    );
};

// --- APP PRINCIPAL ---
function App() {
    const [menuActivo, setMenuActivo] = useState(false);
    const [menuIdx, setMenuIdx] = useState(1);
    const [fuenteActual, setFuenteActual] = useState('tv'); 
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
        try {
            const queryClean = titulo.split('(')[0].split('-')[0].trim();
            const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(queryClean)}&language=es-ES`);
            const data = await response.json();
            if (data.results?.[0]) {
                const info = data.results[0];
                setExtraInfo(info);
                const tipo = info.media_type === 'tv' ? 'tv' : 'movie';
                const simRes = await fetch(`https://api.themoviedb.org/3/${tipo}/${info.id}/recommendations?api_key=${API_KEY}&language=es-ES`);
                const simData = await simRes.json();
                const todos = Object.values(catalogo).flat();
                const filtradas = simData.results.map(sug => {
                    const n = (sug.title || sug.name).toLowerCase();
                    return todos.find(m => m.titulo.toLowerCase().includes(n));
                }).filter(Boolean).slice(0, 8);
                setSugerencias(filtradas);
            }
        } catch (e) { console.error(e); }
        setCargandoInfo(false);
    };

    useEffect(() => {
        const rawData = fuenteActual === 'tv' ? (window.m3uTV || "") : (window.m3uVOD || "");
        if (!rawData) return;
        const lineas = rawData.split('\n');
        const temp = {};
        lineas.forEach((linea, i) => {
            if (linea.startsWith('#EXTINF')) {
                const next = lineas[i + 1]?.trim() || "";
                if (!next.startsWith('http')) return;
                const category = linea.match(/group-title="([^"]+)"/)?.[1] || "Otros";
                const logo = linea.match(/tvg-logo="([^"]+)"/)?.[1] || "";
                const rawTitle = linea.match(/tvg-name="([^"]+)"/)?.[1] || linea.split(',')[1] || "Sin título";
                if (!temp[category]) temp[category] = [];
                const nombreSerie = rawTitle.split(/S\d+|E\d+|Capitulo| - /i)[0].trim();
                const esSerie = category.toUpperCase().includes("SERIE");
                if (esSerie) {
                    let s = temp[category].find(x => x.titulo === nombreSerie);
                    if (s) s.episodios.push({ titulo: rawTitle, url: next });
                    else temp[category].push({ titulo: nombreSerie, logo, url: next, categoria: category, episodios: [{ titulo: rawTitle, url: next }] });
                } else {
                    temp[category].push({ titulo: rawTitle, logo, url: next, categoria: category, episodios: [] });
                }
            }
        });
        setCatalogo(temp);
    }, [fuenteActual]);

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

    const lanzarVideoNativo = (url, titulo) => {
        if (window.AndroidInterface) window.AndroidInterface.playVideo(url, titulo);
        else console.log("Play:", url);
    };

    useEffect(() => {
        const handleKeys = (e) => {
            const isEnter = e.key === 'Enter' || e.keyCode === 13;
            const isBack = e.key === 'Escape' || e.key === 'Backspace' || e.keyCode === 8 || e.keyCode === 27;

            if (isBack) {
                e.preventDefault();
                if (mostrarTeclado) { setMostrarTeclado(false); return; }
                if (menuActivo) { setMenuActivo(false); return; }
                if (vistaActual.tipo === 'detalle') {
                    setVistaActual(vistaActual.fromGrid ? { tipo: 'grilla', data: vistaActual.fromGrid } : { tipo: 'home', data: null });
                    setFocoZona('grid'); return;
                }
                if (vistaActual.tipo === 'grilla') { setVistaActual({ tipo: 'home', data: null }); return; }
                if (busqueda) { setBusqueda(""); return; }
            }

            if (mostrarTeclado) return;

            if (menuActivo) {
                if (e.key === 'ArrowUp') setMenuIdx(p => Math.max(0, p - 1));
                if (e.key === 'ArrowDown') setMenuIdx(p => Math.min(2, p + 1));
                if (e.key === 'ArrowRight' || isEnter) {
                    if (menuIdx === 0) { setMenuActivo(false); setFilaActiva(-1); setMostrarTeclado(true); } 
                    else {
                        const nuevaFuente = menuIdx === 1 ? 'tv' : 'vod';
                        if (fuenteActual !== nuevaFuente) { setFuenteActual(nuevaFuente); setFilaActiva(0); setColumnaActiva(0); }
                        setMenuActivo(false);
                    }
                }
                return;
            }

            if (vistaActual.tipo === 'home') {
                if (e.key === 'ArrowLeft' && (columnaActiva === 0 || filaActiva === -1)) { setMenuActivo(true); return; }
                if (e.key === 'ArrowUp') { setFilaActiva(p => Math.max(p - 1, -1)); setColumnaActiva(0); }
                if (e.key === 'ArrowDown') { setFilaActiva(p => Math.min(p + 1, categoriasKeys.length - 1)); setColumnaActiva(0); }
                
                if (filaActiva !== -1) {
                    const items = catalogoFiltrado[categoriasKeys[filaActiva]] || [];
                    const maxCol = items.length > 10 ? 10 : items.length - 1;
                    if (e.key === 'ArrowRight') setColumnaActiva(p => Math.min(p + 1, maxCol));
                    if (e.key === 'ArrowLeft') setColumnaActiva(p => Math.max(p - 1, 0));
                    if (isEnter) {
                        if (columnaActiva === 10) { setVistaActual({ tipo: 'grilla', data: { titulo: categoriasKeys[filaActiva], items } }); setIndiceAux(0); } 
                        else {
                            const v = items[columnaActiva];
                            if (fuenteActual === 'tv') lanzarVideoNativo(v.url, v.titulo);
                            else { setVistaActual({ tipo: 'detalle', data: { info: v, items: v.episodios.length ? v.episodios : [v] } }); setFocoZona('visor'); setRangoCapitulos(0); setIndiceAux(0); buscarResena(v.titulo); }
                        }
                    }
                } else if (isEnter) setMostrarTeclado(true);
            }
            // ... (Resto de la lógica de grilla y detalle se mantiene igual)
        };
        window.addEventListener('keydown', handleKeys);
        return () => window.removeEventListener('keydown', handleKeys);
    }, [filaActiva, columnaActiva, vistaActual, focoZona, categoriasKeys, catalogoFiltrado, indiceAux, rangoCapitulos, busqueda, sugerencias, menuActivo, menuIdx, fuenteActual]);

    return (
        <div translate="no" className="inset-0 fixed bg-[#050505] text-white font-sans overflow-hidden select-none">
            <style>{`* { outline: none !important; } .no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
            
            <SideMenu activo={menuActivo} itemSeleccionado={menuIdx} />

            <div className={`h-full transition-all duration-500 flex flex-col ${menuActivo ? 'opacity-40 blur-sm' : ''}`}>
                {vistaActual.tipo === 'home' && (
                    <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
                        {/* BUSCADOR */}
                        <div className="flex justify-end p-10 pt-12">
                            <div id="fake-search" className={`w-72 px-5 py-3 rounded-md border-2 transition-all flex justify-between items-center ${filaActiva === -1 ? 'border-green-600 bg-zinc-800' : 'border-white/5 bg-transparent'}`}>
                                <span className="text-[10px] font-black tracking-widest text-zinc-400">{busqueda || "BUSCAR..."}</span>
                            </div>
                        </div>

                        {/* CABECERA DINÁMICA */}
                        <div className="pl-24 pr-10 mb-10">
                            <p className="text-green-500 text-xl font-black uppercase mb-1">{categoriasKeys[filaActiva] || 'Catálogo'}</p>
                            <h2 className="text-white text-6xl font-black uppercase italic italic tracking-tighter">{fuenteActual === 'tv' ? 'TV en Vivo' : 'Streaming'}</h2>
                        </div>

                        {/* FILAS DE CONTENIDO */}
                        {categoriasKeys.map((cat, fIdx) => (
                            <div key={cat} className="mb-12">
                                <h2 className={`text-[18px] font-black mb-4 uppercase tracking-[0.3em] pl-24 ${filaActiva === fIdx ? 'text-green-600' : 'text-zinc-800'}`}>{cat}</h2>
                                <div className="flex gap-6 overflow-x-auto no-scrollbar py-4">
                                    {/* SEPARADOR INVISIBLE PARA NO ENCIMAR EL MENÚ */}
                                    <div className="flex-shrink-0 w-20 h-full"></div> 
                                    {catalogoFiltrado[cat].slice(0, 11).map((v, cIdx) => (
                                        cIdx < 10 ? 
                                        <VideoCard key={cIdx} id={`item-${fIdx}-${cIdx}`} video={v} esSeleccionado={filaActiva === fIdx && columnaActiva === cIdx} /> :
                                        <VideoCard key="ver-mas" id={`item-${fIdx}-10`} esVerMas={true} total={catalogoFiltrado[cat].length} esSeleccionado={filaActiva === fIdx && columnaActiva === 10} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {mostrarTeclado && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <VirtualKeyboard onKeyPress={(t)=>setBusqueda(p=>p+t)} onBackspace={()=>setBusqueda(p=>p.slice(0,-1))} onClose={()=>setMostrarTeclado(false)} />
                </div>
            )}
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
