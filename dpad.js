window.DPad = {
    handlers: {
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

       // --- NAVEGACIÓN EN DETALLES (SISTEMA HÍBRIDO PELÍCULAS/SERIES) ---
        details: (e) => {
            const cards = Array.from(document.querySelectorAll('#modal-full .card'));
            if (cards.length === 0) return;

            const currentCard = cards[State.col];
            if (!currentCard) return;

            // Identificamos zona actual
            const isBtnPlay = currentCard.id === 'btn-play';
            const isEpisodio = currentCard.id.startsWith('ep-');
            const isSugerencia = currentCard.id.startsWith('sug-');
            // Un rango es lo que sea 'card' pero que no sea play, ep ni sug
            const isRango = !isBtnPlay && !isEpisodio && !isSugerencia;

            // Buscador inteligente de secciones
            const findSection = (type) => {
                if (type === 'play') return cards.findIndex(c => c.id === 'btn-play');
                if (type === 'rango') return cards.findIndex(c => !c.id.startsWith('ep-') && !c.id.startsWith('sug-') && c.id !== 'btn-play');
                if (type === 'ep') return cards.findIndex(c => c.id.startsWith('ep-'));
                if (type === 'sug') return cards.findIndex(c => c.id.startsWith('sug-'));
                return -1;
            };

            if (e.key === 'ArrowDown') {
                if (isBtnPlay) {
                    // Intenta bajar a: Rango -> Si no, Episodio -> Si no, Sugerencia
                    let target = findSection('rango');
                    if (target === -1) target = findSection('ep');
                    if (target === -1) target = findSection('sug');
                    if (target !== -1) State.col = target;
                } 
                else if (isRango) {
                    // De Rango intenta bajar a: Episodio -> Si no, Sugerencia
                    let target = findSection('ep');
                    if (target === -1) target = findSection('sug');
                    if (target !== -1) State.col = target;
                }
                else if (isEpisodio) {
                    // De Episodio siempre baja a Sugerencia
                    let target = findSection('sug');
                    if (target !== -1) State.col = target;
                }
                e.preventDefault();
            } 
            else if (e.key === 'ArrowUp') {
                if (isSugerencia) {
                    // Intenta subir a: Episodio -> Si no, Rango -> Si no, Play
                    let target = findSection('ep');
                    if (target === -1) target = findSection('rango');
                    if (target === -1) target = findSection('play');
                    if (target !== -1) State.col = target;
                } 
                else if (isEpisodio) {
                    // Intenta subir a: Rango -> Si no, Play
                    let target = findSection('rango');
                    if (target === -1) target = findSection('play');
                    if (target !== -1) State.col = target;
                }
                else if (isRango) {
                    // De Rango siempre sube a Play
                    let target = findSection('play');
                    if (target !== -1) State.col = target;
                }
                e.preventDefault();
            }

            // --- NAVEGACIÓN LATERAL ---
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
            const backKeys = ['Escape', 'Backspace', 'GoBack', 'Back'];
            const isBack = backKeys.includes(e.key) || e.keyCode === 10009 || e.keyCode === 461;

            if (isBack) {
                if (State.menu) {
                    State.menu = false;
                    e.preventDefault();
                } else if (State.view !== 'home') {
                    window.AppController.cerrarModal();
                    e.preventDefault();
                }
            }
        },

        menu: (e) => {
            if (e.key === 'ArrowDown') State.idxMenu = (State.idxMenu + 1) % State.secciones.length;
            if (e.key === 'ArrowUp') State.idxMenu = (State.idxMenu - 1 + State.secciones.length) % State.secciones.length;
            if (e.key === 'ArrowRight' || e.key === 'Enter') {
                const nueva = State.secciones[State.idxMenu].id;
                if (State.source !== nueva) {
                    State.source = nueva; State.fila = 0; State.col = 0;
                    window.AppController.renderHome();
                }
                State.menu = false;
            }
            if (e.key === 'ArrowLeft') State.menu = false;
        }
    }
};