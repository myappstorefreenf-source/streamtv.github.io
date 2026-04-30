window.SearchController = {
    keys: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".split(""),

    renderKeyboard: function() {
        const grid = document.getElementById('keyboard-grid');
        if (!grid) return;

        grid.innerHTML = this.keys.map((key, i) => `
            <div id="key-${i}" class="key-item p-4 bg-zinc-900 text-white text-center rounded-xl font-black border-2 border-transparent transition-all" 
                 onclick="SearchController.addLetter('${key}')">
                ${key}
            </div>
        `).join('');
        
        // Vinculamos los botones de abajo manualmente para asegurar que funcionen
        document.getElementById('key-100').onclick = () => this.addLetter('BORRAR');
        document.getElementById('key-101').onclick = () => this.addLetter('ESPACIO');
        document.getElementById('key-102').onclick = () => window.cerrarBuscador();
    },

  addLetter: function(letra) {
    const display = document.getElementById('current-search-text');
    const resultsContainer = document.getElementById('search-results-container');
    const rowsContainer = document.getElementById('rows-container');

    if (!display) return;

    if (letra === 'BORRAR') {
        display.innerText = display.innerText.slice(0, -1);
        
        // --- MEJORA: Limpieza total cuando no hay texto ---
        if (display.innerText.trim() === "") {
            if (resultsContainer) {
                resultsContainer.innerHTML = ""; // Borramos los posters viejos
                resultsContainer.style.display = 'none';
            }
            if (rowsContainer) {
                rowsContainer.style.display = 'block'; // Volvemos al Home
            }
            
            State.view = 'search'; // El foco se queda en el teclado
            State.resultsCount = 0; // Importante para que el DPad no intente ir a la derecha
            window.updateFocus();
            return;
        }
    } else if (letra === 'ESPACIO') {
        display.innerHTML += "&nbsp;"; 
    } else {
        display.innerText += letra;
    }

    // Ejecutamos la búsqueda con el texto limpio
    const textoLimpio = display.innerText.replace(/\u00a0/g, " ").trim();
    
    if (textoLimpio.length > 0) {
        this.ejecutarBusqueda(textoLimpio);
    }
},
   ejecutarBusqueda: function(texto) {
    const busqueda = texto.toLowerCase().trim();
    const main = document.getElementById('main-content');
    if (!main) return;

    if (busqueda === "") {
        if (window.AppController) window.AppController.renderHome();
        return;
    }

    let encontrados = [];

    if (State.catalog) {
        // Entramos en cada fuente (tv, movies, series)
        Object.keys(State.catalog).forEach(sourceKey => {
            const fuente = State.catalog[sourceKey];
            
            // Entramos en cada categoría de esa fuente
            Object.keys(fuente).forEach(catKey => {
                const listaItems = fuente[catKey];
                
                // Verificamos que sea un array antes de filtrar
                if (Array.isArray(listaItems)) {
                    const filtrados = listaItems.filter(item => {
                        const nombre = (item.name || item.title || "").toLowerCase();
                        return nombre.includes(busqueda);
                    });
                    encontrados = [...encontrados, ...filtrados];
                }
            });
        });
    }

    console.log("Busqueda:", busqueda, "| Items encontrados:", encontrados.length);

    // Quitar duplicados por URL o Nombre
    const unicos = Array.from(new Map(encontrados.map(item => [item.url || item.name, item])).values());
    this.pintarResultados(unicos);
},
pintarResultados: function(items) {
    const resultsContainer = document.getElementById('search-results-container');
    const rowsContainer = document.getElementById('rows-container');
    
    if (rowsContainer) rowsContainer.style.display = 'none'; 
    if (resultsContainer) {
        resultsContainer.style.display = 'block'; 
        resultsContainer.innerHTML = ""; 
    }

    let html = `<h2 class="text-white text-4xl font-black mb-10 uppercase italic">Resultados (${items.length})</h2>`;
    html += `<div class="grid grid-cols-5 gap-6">`;
    
    items.forEach((item, i) => {
        const esTV = item.logo && !item.poster;
        const nombreLimpio = (item.name || item.title || "Sin título").replace(/'/g, "\\'");
        
        const infoParaDetalles = JSON.stringify({
            ...item, 
            name: nombreLimpio,
            logo: item.logo,
            poster: item.poster || item.logo || '',
            plot: (item.plot || item.desc || 'Sin descripción').replace(/'/g, "\\'")
        }).replace(/"/g, '&quot;');

        html += `
        <div id="res-${i}" 
             class="card group bg-zinc-900 rounded-2xl overflow-hidden border-4 border-transparent transition-all shadow-lg cursor-pointer"
             onclick="event.preventDefault(); window.reproducirItemDeBusqueda('${item.url}', '${nombreLimpio}', JSON.parse(this.getAttribute('data-extra')))"
             data-url="${item.url}" 
             data-nombre="${nombreLimpio}" 
             data-extra='${infoParaDetalles}'>
            
            <div class="${esTV ? 'aspect-video' : 'aspect-[2/3]'} bg-black flex items-center justify-center pointer-events-none">
                <img src="${item.poster || item.logo || ''}" 
                     onerror="this.src='https://via.placeholder.com/300x450?text=SIN+IMAGEN'"
                     class="w-full h-full ${esTV ? 'object-contain p-4' : 'object-cover'}">
            </div>

            <div class="p-4 text-white font-bold truncate text-sm pointer-events-none">
                ${esTV ? '📺 ' : '🎬 '} ${nombreLimpio}
            </div>
        </div>`;
    });

    html += `</div>`; // Cerramos el grid
    
    if (resultsContainer) {
        resultsContainer.innerHTML = html;
    }

    // --- CRUCIAL: Solo actualizamos el conteo, NO cambiamos la vista ---
    State.resultsCount = items.length;
    
    // Si queremos que el foco se mantenga en el teclado, no tocamos State.view
    console.log("Búsqueda renderizada. Resultados:", State.resultsCount);
}
};