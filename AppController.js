window.AppController = {
    renderHome: function() {
        State.view = 'home';
        // Al renderizar el Home, nos aseguramos de que no haya ninguna grilla pendiente
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
                    <div id="card-${fIdx}-10" class="card flex-shrink-0 w-[180px] h-[270px] bg-green-600/10 border-2 border-green-600/30 rounded-xl flex items-center justify-center transition-all duration-200 group cursor-pointer" onclick="AppController.abrirGrilla('${cat.replace(/'/g, "\\'")}')">
                        <span class="text-green-500 font-black italic text-center px-4 leading-tight uppercase text-sm">
                            Ver Más<br>
                            <span class="text-[10px] opacity-60">+${allItems.length - 10} items</span>
                        </span>
                    </div>`;
            }

            container.insertAdjacentHTML('beforeend', `
                <div class="mb-12 px-10">
                    <h3 class="text-green-600 font-black text-[11px] tracking-[5px] mb-5 uppercase opacity-40 italic">${cat}</h3>
                    <div class="${isTV ? 'flex flex-col gap-1' : 'flex flex-row gap-6 overflow-hidden'}">
                        ${rowHtml}
                    </div>
                </div>`);
        });
        
        window.updateFocus();
    },

    abrirGrilla: function(catName) {
        State.view = 'grid';
        State.currentGridCat = catName; // Aquí guardamos "Solicitadas", "Suspenso", etc.
        State.col = 0; 
        const items = State.catalog[State.source][catName];
        const modal = document.getElementById('modal-full');
        modal.classList.remove('hidden');
        modal.scrollTop = 0; 

        modal.innerHTML = `
            <div class="p-20 bg-black min-h-screen">
                <div class="mb-12">
                    <h1 class="text-6xl font-black italic uppercase text-green-600 tracking-tighter">${catName}</h1>
                    <div class="h-1 w-24 bg-green-600 mt-2"></div>
                </div>
                <div class="grid grid-cols-6 gap-8 pb-20">
                    ${items.map((item, idx) => `
                        <div id="card-grid-${idx}" class="card card-grid-item relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border-2 border-transparent transition-all cursor-pointer" onclick='AppController.abrirDetalle(${JSON.stringify(item).replace(/'/g, "&apos;")})'>
                            <img src="${item.logo}" class="w-full h-full object-cover" onerror="this.src='https://via.placeholder.com/300x450?text=SIN+POSTER'">
                            <div class="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
                                <p class="text-[10px] font-black uppercase truncate italic text-white">${item.name || item.titulo}</p>
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
            <div id="ep-${idx}" class="card flex-none w-56 h-32 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden transition-all cursor-pointer group relative" onclick='window.reproducir(${JSON.stringify(ep).replace(/'/g, "&apos;")})'>
                <div class="p-4 h-full flex flex-col justify-between bg-zinc-900 group-[.focused]:bg-green-600/20 transition-colors">
                    <div>
                        <div class="text-green-600 text-[9px] font-black italic uppercase tracking-tighter">Episodio ${inicio + idx + 1}</div>
                        <div class="text-xs font-bold text-zinc-200 group-[.focused]:text-white line-clamp-2 uppercase italic leading-tight mt-1">${ep.titulo}</div>
                    </div>
                    <div class="flex items-center gap-2">
                        <div class="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                            <svg class="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                        <span class="text-[8px] font-black italic uppercase text-white tracking-widest">VER</span>
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

    abrirDetalle: function(item) {
        // Detectamos si venimos del Home para limpiar cualquier rastro de Grilla (como Solicitadas)
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
            <div id="sug-${idx}" class="card flex-none w-64 aspect-video bg-zinc-900 rounded-lg overflow-hidden border-2 border-transparent transition-all cursor-pointer relative group" onclick='AppController.abrirDetalle(${JSON.stringify(sim).replace(/'/g, "&apos;")})'>
                <img src="${sim.logo}" class="w-full h-full object-cover opacity-60 group-[.focused]:opacity-100 transition-opacity" onerror="this.src='https://via.placeholder.com/400x225?text=SIN+PREVIA'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div class="absolute bottom-2 left-3 right-3 text-[10px] font-black italic uppercase truncate text-white tracking-widest">${sim.name || sim.titulo}</div>
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
                <div id="range-${i}" class="card flex-none w-fit h-8 px-4 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[10px] font-black italic uppercase text-zinc-400 transition-all cursor-pointer whitespace-nowrap shrink-0" onclick='AppController.cambiarRango(${i}, "${episodiosString}")'>
                    ${inicio}-${fin}
                </div>`;
            }).join('');

            const htmlCardsEpisodios = grupos[0].map((ep, idx) => `
                <div id="ep-${idx}" class="card flex-none w-56 h-32 bg-zinc-900 border border-white/5 rounded-xl overflow-hidden transition-all cursor-pointer group relative" onclick='window.reproducir(${JSON.stringify(ep).replace(/'/g, "&apos;")})'>
                    <div class="p-4 h-full flex flex-col justify-between bg-zinc-900 group-[.focused]:bg-green-600/20 transition-colors">
                        <div>
                            <div class="text-green-600 text-[9px] font-black italic uppercase tracking-tighter">Episodio ${idx + 1}</div>
                            <div class="text-xs font-bold text-zinc-200 group-[.focused]:text-white line-clamp-2 uppercase italic leading-tight mt-1">${ep.titulo}</div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center">
                                <svg class="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                            </div>
                            <span class="text-[8px] font-black italic uppercase text-white tracking-widest">VER</span>
                        </div>
                    </div>
                </div>`).join('');

            htmlSeccionEpisodios = `
                <div class="mt-12">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-xl font-black italic uppercase tracking-tighter text-white opacity-80">Capítulos</h3>
                        <div class="flex gap-2 overflow-x-auto no-scrollbar">${htmlBotonesRangos}</div>
                    </div>
                    <div id="contenedor-episodios" class="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                        ${htmlCardsEpisodios}
                    </div>
                </div>`;
        }

        const sinopsis = item.plot || item.desc || item.sinopsis || "Sinopsis no disponible.";

        modal.innerHTML = `
            <div class="relative min-h-screen w-full bg-[#080808] text-white overflow-x-hidden font-sans">
                <div class="absolute top-0 left-0 w-full h-[70vh] opacity-20 blur-[100px] pointer-events-none scale-150">
                    <img src="${item.logo}" class="w-full h-full object-cover">
                </div>
                <div class="relative z-10 p-10 lg:p-20 flex flex-col min-h-screen">
                    <div class="flex flex-col md:flex-row gap-12 items-start">
                        <div class="w-64 flex-shrink-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                            <img src="${item.logo}" class="w-full h-full object-cover">
                        </div>
                        <div class="flex-1 pt-4">
                            <div class="flex items-center gap-4 mb-5">
                                <span class="bg-white text-black px-3 py-1 text-[10px] font-black italic uppercase rounded">HOOD PRO</span>
                                <span class="text-green-600 font-black italic text-xs uppercase tracking-[3px] opacity-70">${item.grupo}</span>
                            </div>
                            <h1 class="text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-tight mb-8 max-w-4xl">${item.name || item.titulo}</h1>
                            <p class="text-zinc-400 text-lg max-w-2xl leading-relaxed mb-10">${sinopsis}</p>
                            ${!item.episodios ? `
                               <div id="btn-play" class="card flex-none w-fit min-w-[220px] h-[58px] px-8 bg-green-600 rounded-full flex items-center justify-center gap-4 cursor-pointer shadow-xl shadow-green-600/20 transition-all shrink-0 self-start" onclick='window.reproducir(State.currentItem)'>
                                    <div class="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                                        <svg class="w-3.5 h-3.5 text-green-600 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    </div>
                                    <span class="text-black font-black italic uppercase text-lg">Reproducir</span>
                                </div>` : ''}
                        </div>
                    </div>
                    ${htmlSeccionEpisodios}
                    <div class="mt-16 mt-auto">
                        <h3 class="text-zinc-500 font-black italic text-[10px] uppercase tracking-[4px] mb-6">Porque viste ${item.grupo}</h3>
                        <div class="flex gap-4 overflow-x-auto pb-8 no-scrollbar">
                            ${htmlSimilares}
                        </div>
                    </div>
                </div>
            </div>`;
        window.updateFocus();
    },

    cerrarModal: function() {
        const modal = document.getElementById('modal-full');
        
        // Lógica de salida inteligente
        if (State.view === 'details') {
            if (State.currentGridCat) {
                // Si veníamos de una grilla (ej. Solicitadas), volvemos ahí
                this.abrirGrilla(State.currentGridCat);
            } else {
                // Si veníamos del Home, limpiamos y volvemos al Home
                this.limpiarYRegresarAlHome();
            }
        } else {
            // Si cerramos una grilla directamente
            this.limpiarYRegresarAlHome();
        }
    },

    limpiarYRegresarAlHome: function() {
        const modal = document.getElementById('modal-full');
        State.view = 'home';
        State.currentGridCat = null; // LIMPIEZA ABSOLUTA
        modal.classList.add('hidden');
        modal.innerHTML = '';
        State.col = 0; // Reset de foco para que no salte al azar en el home
        window.updateFocus();
    }
};
