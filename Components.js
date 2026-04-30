window.Components = {
    // 1. ORIGINAL: Tarjeta de Película o Serie (SIN CAMBIOS)
    Card: (item, fIdx, cIdx) => {
        const id = fIdx === 'grid' ? `card-grid-${cIdx}` : `card-${fIdx}-${cIdx}`;
        const nombre = item.name || item.titulo || "";

        return `
            <div id="${id}" class="card flex-shrink-0 w-[180px] h-[270px] bg-zinc-900 rounded-xl overflow-hidden border-2 border-transparent transition-all duration-200 relative group">
                <img src="${item.logo}" 
                     class="w-full h-full object-cover" 
                     onerror="this.src='https://via.placeholder.com/300x450?text=SIN+POSTER'"
                     loading="lazy">
                
                <div class="title-overlay absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-[.focused]:opacity-100 transition-opacity">
                    <p class="text-[10px] font-black uppercase truncate italic text-white tracking-tighter">${nombre}</p>
                </div>
            </div>
        `;
    },

    // 2. ORIGINAL: Fila de TV (SIN CAMBIOS - Así evitamos la pantalla verde)
    TvRow: (item, fIdx, cIdx) => {
        const nombre = item.name || item.titulo || "Canal sin nombre";
        const id = `card-${fIdx}-${cIdx}`;

        return `
            <div id="${id}" class="tv-row p-4 bg-zinc-900/20 flex items-center gap-6 rounded-xl border-2 border-transparent transition-all duration-200 w-full mb-1">
                <div class="w-14 h-10 bg-black/40 rounded flex-shrink-0 overflow-hidden flex items-center justify-center p-1 border border-white/5">
                    <img src="${item.logo}" 
                         class="max-w-full max-h-full object-contain" 
                         onerror="this.src='https://via.placeholder.com/100x60?text=TV'">
                </div>
                <div class="flex flex-col overflow-hidden">
                    <span class="font-black text-lg italic uppercase tracking-tighter truncate text-zinc-300 group-[.focused]:text-white">
                        ${nombre}
                    </span>
                    <span class="text-[9px] font-bold text-green-600/50 uppercase tracking-[3px] -mt-1">EN VIVO</span>
                </div>
            </div>
        `;
    },

    // 3. MODIFICADO SOLO PARA DETALLES: Agregada clase 'card' para que funcione el DPad
    EpisodeCard: (item, index, isEpisode = true) => {
        const id = isEpisode ? `ep-${index}` : `sug-${index}`;
        const nombre = item.name || item.titulo || `EPISODIO ${index + 1}`;
        
        // El cambio es solo agregar 'card' aquí para la navegación en el modal
        return `
            <div id="${id}" class="card flex-shrink-0 w-64 h-36 bg-zinc-900 rounded-xl overflow-hidden relative border-2 border-transparent transition-all duration-200 shadow-lg cursor-pointer">
                <img src="${item.logo}" 
                     class="w-full h-full object-cover opacity-60" 
                     onerror="this.src='https://via.placeholder.com/320x180?text=PREVIEW'">
                
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                
                <div class="absolute bottom-0 left-0 right-0 p-4">
                    <div class="text-green-500 font-black text-[9px] tracking-[2px] uppercase mb-1">
                        ${isEpisode ? `EPISODIO ${index + 1}` : 'RECOMENDADO'}
                    </div>
                    <div class="truncate font-black italic uppercase text-xs text-white tracking-tight">
                        ${nombre}
                    </div>
                </div>

                <div class="absolute bottom-0 left-0 h-1 bg-green-600 w-1/3"></div>
            </div>
        `;
    }
};