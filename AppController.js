window.AppController = {
    renderHome: function() {
        State.view = 'home';
        State.currentGridCat = null; 
        
        const container = document.getElementById('rows-container');
        const titleElement = document.getElementById('section-title');
        
        container.innerHTML = '';
        const source = State.source;
        const data = State.catalog[source] || {};
        const isTV = source === 'tv';

        const seccionActual = State.secciones.find(s => s.id === source);
        if (titleElement && seccionActual) {
            titleElement.innerText = seccionActual.label;
        }

        Object.keys(data).forEach((cat, fIdx) => {
            const allItems = data[cat];
            const displayItems = isTV ? allItems : allItems.slice(0, 10);
            const hasMore = !isTV && allItems.length > 10;

            let rowHtml = displayItems.map((item, cIdx) => 
                isTV ? Components.TvRow(item, fIdx, cIdx) : Components.Card(item, fIdx, cIdx)
            ).join('');

            if (hasMore) {
                rowHtml += `
                    <div id="card-${fIdx}-10" class="card flex-shrink-0 w-[160px] h-[240px] bg-green-600/10 border-2 border-green-600/30 rounded-xl flex items-center justify-center transition-all duration-200 group cursor-pointer" onclick="AppController.abrirGrilla('${cat.replace(/'/g, "\\'")}')">
                        <span class="text-green-500 font-black italic text-center px-4 leading-tight uppercase text-[10px]">
                            Ver Más<br>
                            <span class="text-[8px] opacity-60">+${allItems.length - 10} items</span>
                        </span>
                    </div>`;
            }

            container.insertAdjacentHTML('beforeend', `
                <div class="mb-10 px-10">
                    <h3 class="text-green-600 font-black text-[10px] tracking-[4px] mb-4 uppercase opacity-50 italic">${cat}</h3>
                    <div class="${isTV ? 'flex flex-col gap-1' : 'flex flex-row gap-6 overflow-visible'}">
                        ${rowHtml}
                    </div>
                </div>`);
        });
        
        window.updateFocus();
    },

    abrirGrilla: function(catName) {
        State.view = 'grid';
        State.currentGridCat = catName;
        State.col = 0; 
        const items = State.catalog[State.source][catName];
        const modal = document.getElementById('modal-full');
        modal.classList.remove('hidden');
        modal.scrollTop = 0; 

        modal.innerHTML = `
            <div class="p-16 bg-black min-h-screen">
                <div class="mb-10">
                    <h1 class="text-4xl font-black italic uppercase text-green-600 tracking-tighter">${catName}</h1>
                    <div class="h-1 w-16 bg-green-600 mt-2"></div>
                </div>
                <div class="grid grid-cols-7 gap-6 pb-20"> ${items.map((item, idx) => `
                        <div id="card-grid-${idx}" class="card card-grid-item relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-transparent transition-all cursor-pointer" onclick='AppController.abrirDetalle(${JSON.stringify(item).replace(/'/g, "&apos;")})'>
                            <img src="${item.logo}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/300x450?text=SIN+POSTER'">
                            <div class="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black to-transparent">
                                <p class="text-[8px] font-black uppercase truncate italic text-white">${item.name || item.titulo}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>`;
        window.updateFocus();
    },

    cambiarRango: function(index, episodiosJSON) {
        const episodios = JSON.parse(decodeURIComponent(episodiosJSON));
        const inicio = index * 10;
        const nuevosEpisodios = episodios.slice(inicio, inicio + 10);
        
        const contenedor = document.getElementById('contenedor-episodios');
        if (!contenedor) return;

        contenedor.innerHTML = nuevosEpisodios.map((ep, idx) => `
            <div id="ep-${idx}" class="card flex-none w-48 h-28 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden transition-all cursor-pointer group relative" onclick='window.reproducir(${JSON.stringify(ep).replace(/'/g, "&apos;")})'>
                <div class="p-3 h-full flex flex-col justify-between bg-zinc-900 group-[.focused]:bg-green-600/20 transition-colors">
                    <div>
                        <div class="text-green-600 text-[8px] font-black italic uppercase tracking-tighter">Episodio ${inicio + idx + 1}</div>
                        <div class="text-[10px] font-bold text-zinc-200 group-[.focused]:text-white line-clamp-2 uppercase italic leading-tight mt-1">${ep.titulo}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                            <svg class="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span class="text-[7px] font-black italic uppercase text-white tracking-widest">VER</span>
                    </div>
                </div>
            </div>`).join('');
        
        setTimeout(() => {
            const todasLasCards = Array.from(document.querySelectorAll('#modal-full .card'));
            const miBotonId = `range-${index}`;
            const nuevoIndice = todasLasCards.findIndex(c => c.id === miBotonId);
            if (nuevoIndice !== -1) State.col = nuevoIndice;
            window.updateFocus();
        }, 10);
    },

    // INTEGRACIÓN API.JS AQUÍ:
    abrirDetalle: async function(item) {
        if (State.view === 'home') {
            State.currentGridCat = null;
        }

        State.view = 'details';
        State.col = 0;
        State.currentItem = item;

        const modal = document.getElementById('modal-full');
        modal.classList.remove('hidden');
        modal.scrollTop = 0;

        const categoriaActual = State.catalog[State.source][item.grupo] || [];
        const similares = categoriaActual
            .filter(i => (i.name || i.titulo) !== (item.name || item.titulo))
            .slice(0, 12);

        const htmlSimilares = similares.map((sim, idx) => `
            <div id="sug-${idx}" class="card flex-none w-52 aspect-video bg-zinc-900 rounded-lg overflow-hidden border-2 border-transparent transition-all cursor-pointer relative group" onclick='AppController.abrirDetalle(${JSON.stringify(sim).replace(/'/g, "&apos;")})'>
                <img src="${sim.logo}" class="w-full h-full object-cover opacity-50 group-[.focused]:opacity-100 transition-opacity" onerror="this.src='https://via.placeholder.com/400x225?text=SIN+PREVIA'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-2 left-3 right-3 text-[9px] font-black italic uppercase truncate text-white tracking-widest">${sim.name || sim.titulo}</div>
            </div>`).join('');

        let htmlSeccionEpisodios = '';
        if (item.episodios && item.episodios.length > 0) {
            const grupos = [];
            for (let i = 0; i < item.episodios.length; i += 10) {
                grupos.push(item.episodios.slice(i, i + 10));
            }

            const episodiosString = encodeURIComponent(JSON.stringify(item.episodios));
            const htmlBotonesRangos = grupos.map((g, i) => {
                const inicio = (i * 10) + 1;
                const fin = Math.min((i + 1) * 10, item.episodios.length);
                return `
                <div id="range-${i}" class="card flex-none w-fit h-7 px-3 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[9px] font-black italic uppercase text-zinc-400 transition-all cursor-pointer whitespace-nowrap" onclick='AppController.cambiarRango(${i}, "${episodiosString}")'>
                    ${inicio}-${fin}
                </div>`;
            }).join('');

            const htmlCardsEpisodios = grupos[0].map((ep, idx) => `
                <div id="ep-${idx}" class="card flex-none w-48 h-28 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden transition-all cursor-pointer group relative" onclick='window.reproducir(${JSON.stringify(ep).replace(/'/g, "&apos;")})'>
                    <div class="p-3 h-full flex flex-col justify-between bg-zinc-900 group-[.focused]:bg-green-600/20 transition-colors">
                        <div>
                            <div class="text-green-600 text-[8px] font-black italic uppercase tracking-tighter">Episodio ${idx + 1}</div>
                            <div class="text-[10px] font-bold text-zinc-200 group-[.focused]:text-white line-clamp-2 uppercase italic leading-tight mt-1">${ep.titulo}</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                                <svg class="w-2 h-2 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            <span class="text-[7px] font-black italic uppercase text-white tracking-widest">VER</span>
                        </div>
                    </div>
                </div>`).join('');

            htmlSeccionEpisodios = `
                <div class="mt-8">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-black italic uppercase tracking-tighter text-white opacity-60">Capítulos</h3>
                        <div class="flex gap-2 overflow-visible">${htmlBotonesRangos}</div>
                    </div>
                    <div id="contenedor-episodios" class="flex gap-4 overflow-visible py-4 no-scrollbar">
                        ${htmlCardsEpisodios}
                    </div>
                </div>`;
        }

        // Sinopsis inicial rápida (del M3U o placeholder)
        const sinopsisPlaceholder = item.overview || item.plot || item.desc || "Buscando sinopsis...";

        modal.innerHTML = `
            <div class="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden font-sans">
                <div id="detalle-bg-container" class="absolute top-0 left-0 w-full h-[60vh] opacity-20 blur-[80px] pointer-events-none scale-125 transition-opacity duration-1000">
                    <img id="detalle-bg" src="${item.logo}" class="w-full h-full object-cover">
                </div>
                <div class="relative z-10 p-12 lg:p-16 flex flex-col min-h-screen">
                    <div class="flex flex-row gap-10 items-start">
                        <div class="w-52 flex-shrink-0 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-white/5">
                            <img src="${item.logo}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1 pt-2">
                            <div class="flex items-center gap-3 mb-4">
                                <span class="bg-green-600 text-black px-2 py-0.5 text-[9px] font-black italic uppercase rounded">HOOD PRO</span>
                                <span class="text-white/40 font-black italic text-[10px] uppercase tracking-[2px]">${item.grupo}</span>
                            </div>
                            <h1 class="text-4xl lg:text-5xl font-black italic uppercase tracking-tighter leading-none mb-6 max-w-3xl">${item.name || item.titulo}</h1>
                            <p id="detalle-sinopsis" class="text-zinc-400 text-sm max-w-xl leading-relaxed mb-8 line-clamp-5 transition-all duration-500">${sinopsisPlaceholder}</p>
                            
                            ${!item.episodios ? `
                               <div id="btn-play" class="card flex-none w-fit h-12 px-8 bg-green-600 rounded-full flex items-center justify-center gap-3 cursor-pointer transition-all" onclick='window.reproducir(State.currentItem)'>
                                    <div class="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                                        <svg class="w-3 h-3 text-green-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                    <span class="text-black font-black italic uppercase text-sm">Reproducir</span>
                                </div>` : ''}
                        </div>
                    </div>
                    ${htmlSeccionEpisodios}
                    <div class="mt-auto pt-10">
                        <h3 class="text-zinc-500 font-black italic text-[9px] uppercase tracking-[3px] mb-4 opacity-50">Sugerencias</h3>
                        <div class="flex gap-4 overflow-visible pb-4 no-scrollbar">
                            ${htmlSimilares}
                        </div>
                    </div>
                </div>
            </div>`;
            
        window.updateFocus();

        // LLAMADA A LA API DE FORMA INVISIBLE
        if (!item.overview || item.overview === "Buscando sinopsis...") {
            try {
                const infoReal = await API.obtenerDetalles(item);
                
                // Si el usuario sigue en el modal, actualizamos el texto suavemente
                const pSinopsis = document.getElementById('detalle-sinopsis');
                if (pSinopsis && State.view === 'details') {
                    pSinopsis.innerText = infoReal;
                }

                // Si hay fondo nuevo de TMDB, lo aplicamos
                const imgBg = document.getElementById('detalle-bg');
                const containerBg = document.getElementById('detalle-bg-container');
                if (imgBg && item.backdrop) {
                    imgBg.src = item.backdrop;
                    containerBg.style.opacity = "0.4"; // Subimos un poco la opacidad si es HD
                }
            } catch (e) {
                console.log("No se pudo obtener info de la API");
            }
        }
    },

    cerrarModal: function() {
        if (State.view === 'details') {
            if (State.currentGridCat) {
                this.abrirGrilla(State.currentGridCat);
            } else {
                this.limpiarYRegresarAlHome();
            }
        } else {
            this.limpiarYRegresarAlHome();
        }
    },

    limpiarYRegresarAlHome: function() {
        const modal = document.getElementById('modal-full');
        State.view = 'home';
        State.currentGridCat = null;
        modal.classList.add('hidden');
        modal.innerHTML = '';
        State.col = 0; 
        window.updateFocus();
    }
};
