window.DPad = {
    handlers: {
   // --- DENTRO DE DPad.js -> handlers ---
// --- DENTRO DE DPad.js -> handlers -> search ---
// Dentro de DPad.handlers
search: (e) => {
    const cols = 5; 
    const totalKeys = 36;

    if (typeof State.col === 'undefined') State.col = 0;

    if (e.key === 'ArrowRight') {
        const esUltimaColumna = (State.col % cols === 4) || State.col === 102;
        if (esUltimaColumna && State.resultsCount > 0) {
            State.view = 'search_results';
            State.col = 0;
            window.updateFocus();
            return;
        }
        if (State.col < totalKeys - 1) State.col++;
        else if (State.col === 100) State.col = 101; 
        else if (State.col === 101) State.col = 102; 
    }
    else if (e.key === 'ArrowLeft') {
        if (State.col > 0 && State.col < 100) State.col--;
        else if (State.col === 102) State.col = 101;
        else if (State.col === 101) State.col = 100;
        else if (State.col === 0) window.cerrarBuscador();
    }
    else if (e.key === 'ArrowDown') {
        if (State.col + cols < totalKeys) State.col += cols;
        else if (State.col < totalKeys) State.col = (State.col % cols < 2) ? 100 : 101; 
        else if (State.col === 100 || State.col === 101) State.col = 102;
    }
    else if (e.key === 'ArrowUp') {
        if (State.col === 102) State.col = 100;
        else if (State.col >= 100) State.col = totalKeys - 1; 
        else if (State.col - cols >= 0) State.col -= cols;
    }
    else if (e.key === 'Enter') {
        const el = document.getElementById(`key-${State.col}`);
        if (el) el.click();
    }
    // Si pulsas atrás en el teclado, cerramos el buscador
    else if (['Escape', 'Back', 'Backspace'].includes(e.key) && !document.getElementById('current-search-text').innerText) {
        window.cerrarBuscador();
    }

    e.preventDefault();
},
search_results: (e) => {
    const cols = 5;

    if (e.key === 'ArrowRight') {
        if (State.col < State.resultsCount - 1) State.col++;
    }
    else if (e.key === 'ArrowLeft') {
        if (State.col % cols === 0) {
            State.view = 'search'; // Volvemos al teclado
            State.col = 4; // Enfocamos la tecla 'E' (columna derecha)
        } else {
            State.col--;
        }
    }
    else if (e.key === 'ArrowDown') {
        if (State.col + cols < State.resultsCount) State.col += cols;
    }
    else if (e.key === 'ArrowUp') {
        if (State.col - cols >= 0) State.col -= cols;
        else {
            State.view = 'search';
            State.col = 0;
        }
    }
    else if (e.key === 'Enter') {
        const el = document.getElementById(`res-${State.col}`);
        if (el) el.click();
    }
    // NUEVO: Al dar atrás en los resultados, vuelve al teclado
    else if (['Escape', 'Back'].includes(e.key)) {
        State.view = 'search';
        State.col = 0;
        window.updateFocus();
    }
    
    e.preventDefault();
},
        home: (e) => {
            const data = State.catalog[State.source] || {};
            const categories = Object.keys(data);
            if (categories.length === 0) return;

            const currentCatName = categories[State.fila];
            const allItems = data[currentCatName] || [];
            
            const isTV = State.source === 'tv';
            const hasMore = !isTV && allItems.length > 10;
            const maxColIndex = hasMore ? 10 : allItems.length - 1;

            if (isTV) {
                if (e.key === 'ArrowDown') {
                    if (State.col < allItems.length - 1) State.col++; 
                    else if (State.fila < categories.length - 1) { 
                        State.fila++; 
                        State.col = 0; 
                    }
                }
                else if (e.key === 'ArrowUp') {
                    if (State.col > 0) State.col--; 
                    else if (State.fila > 0) {
                        State.fila--; 
                        State.col = (data[categories[State.fila]] || []).length - 1;
                    }
                }
                else if (e.key === 'ArrowLeft') State.menu = true;
            } else {
                if (e.key === 'ArrowRight') {
                    if (State.col < maxColIndex) State.col++;
                }
                else if (e.key === 'ArrowLeft') {
                    if (State.col === 0) State.menu = true;
                    else State.col--;
                }
                else if (e.key === 'ArrowDown') {
                    if (State.fila < categories.length - 1) {
                        State.fila++;
                        State.col = 0;
                    }
                }
                else if (e.key === 'ArrowUp') {
                    if (State.fila > 0) {
                        State.fila--;
                        State.col = 0;
                    }
                }
            }

            if (e.key === 'Enter') {
                if (!isTV && State.col === 10) {
                    window.AppController.abrirGrilla(currentCatName);
                } else {
                    const item = allItems[State.col];
                    if (item) {
                        if (isTV) window.reproducir(item);
                        else window.AppController.abrirDetalle(item);
                    }
                }
            }
        },

        grid: (e) => {
            const data = State.catalog[State.source][State.currentGridCat] || [];
            const cols = 6; 

            if (e.key === 'ArrowRight' && State.col < data.length - 1) State.col++;
            if (e.key === 'ArrowLeft' && State.col > 0) State.col--;
            
            if (e.key === 'ArrowDown') {
                if (State.col + cols < data.length) State.col += cols;
                else State.col = data.length - 1;
            }
            if (e.key === 'ArrowUp') {
                if (State.col - cols >= 0) State.col -= cols;
            }
            if (e.key === 'Enter') {
                window.AppController.abrirDetalle(data[State.col]);
            }
        },

        details: (e) => {
            const cards = Array.from(document.querySelectorAll('#modal-full .card'));
            if (cards.length === 0) return;

            const currentCard = cards[State.col];
            if (!currentCard) return;

            const isBtnPlay = currentCard.id === 'btn-play';
            const isEpisodio = currentCard.id.startsWith('ep-');
            const isSugerencia = currentCard.id.startsWith('sug-');
            const isRango = !isBtnPlay && !isEpisodio && !isSugerencia;

            const findSection = (type) => {
                if (type === 'play') return cards.findIndex(c => c.id === 'btn-play');
                if (type === 'rango') return cards.findIndex(c => !c.id.startsWith('ep-') && !c.id.startsWith('sug-') && c.id !== 'btn-play');
                if (type === 'ep') return cards.findIndex(c => c.id.startsWith('ep-'));
                if (type === 'sug') return cards.findIndex(c => c.id.startsWith('sug-'));
                return -1;
            };

            if (e.key === 'ArrowDown') {
                if (isBtnPlay) {
                    let target = findSection('rango');
                    if (target === -1) target = findSection('ep');
                    if (target === -1) target = findSection('sug');
                    if (target !== -1) State.col = target;
                } 
                else if (isRango) {
                    let target = findSection('ep');
                    if (target === -1) target = findSection('sug');
                    if (target !== -1) State.col = target;
                }
                else if (isEpisodio) {
                    let target = findSection('sug');
                    if (target !== -1) State.col = target;
                }
                e.preventDefault();
            } 
            else if (e.key === 'ArrowUp') {
                if (isSugerencia) {
                    let target = findSection('ep');
                    if (target === -1) target = findSection('rango');
                    if (target === -1) target = findSection('play');
                    if (target !== -1) State.col = target;
                } 
                else if (isEpisodio) {
                    let target = findSection('rango');
                    if (target === -1) target = findSection('play');
                    if (target !== -1) State.col = target;
                }
                else if (isRango) {
                    let target = findSection('play');
                    if (target !== -1) State.col = target;
                }
                e.preventDefault();
            }
            else if (e.key === 'ArrowRight') {
                if (State.col < cards.length - 1) {
                    const nextCard = cards[State.col + 1];
                    if (nextCard.parentElement === currentCard.parentElement) State.col++;
                }
                e.preventDefault();
            }
            else if (e.key === 'ArrowLeft') {
                if (State.col > 0) {
                    const prevCard = cards[State.col - 1];
                    if (prevCard.parentElement === currentCard.parentElement) State.col--;
                }
                e.preventDefault();
            }

            if (e.key === 'Enter') {
                if (currentCard) currentCard.click(); 
                e.preventDefault();
            }
            
            if (window.updateFocus) window.updateFocus();
        },

 global: (e) => {
    const backKeys = ['Escape', 'Back', 'Backspace'];
    if (!backKeys.includes(e.key)) return;

    e.preventDefault();

    // Caso A: Si el modal de detalles o grilla está abierto, lo cerramos
    const modal = document.getElementById('modal-full');
    if (modal && !modal.classList.contains('hidden')) {
        window.AppController.cerrarModal();
        return;
    }

    // Caso B: Si estamos en los RESULTADOS de búsqueda, volvemos al TECLADO
    if (State.view === 'search_results') {
        State.view = 'search';
        State.col = 0; // O podés poner 4 para que caiga en la 'E' del teclado
        window.updateFocus();
        return;
    }

    // Caso C: Si estamos en el TECLADO, cerramos el buscador y vamos al Home
    if (State.view === 'search') {
        window.AppController.limpiarYRegresarAlHome();
        window.cerrarBuscador();
    }
},

       menu: (e) => {
    if (e.key === 'ArrowDown') State.idxMenu = (State.idxMenu + 1) % State.secciones.length;
    if (e.key === 'ArrowUp') State.idxMenu = (State.idxMenu - 1 + State.secciones.length) % State.secciones.length;
    
    if (e.key === 'ArrowRight' || e.key === 'Enter') {
        const seccion = State.secciones[State.idxMenu];
        
        if (seccion.id === 'buscar') {
            if (window.abrirBuscador) window.abrirBuscador();
            return;
        }

        // --- NUEVO: Si cambiamos a cualquier otra sección, limpiamos búsqueda ---
        if (window.AppController && window.AppController.limpiarYRegresarAlHome) {
            window.AppController.limpiarYRegresarAlHome();
        }

        if (State.source !== seccion.id) {
            State.source = seccion.id; 
            State.fila = 0; 
            State.col = 0;
            window.AppController.renderHome();
        }
        State.menu = false;
    }
    if (e.key === 'ArrowLeft') State.menu = false;
}
    }
};
