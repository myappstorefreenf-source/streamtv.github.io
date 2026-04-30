// Definimos los movimientos del DPad para la vista de búsqueda
if (!window.DPad) window.DPad = { handlers: {} };

window.DPad.handlers.search = function(e) {
    const columnas = 6;
    const totalLetras = window.SearchController.letras.length;

    switch(e.key) {
        case 'ArrowRight':
            if (State.col < totalLetras - 1) State.col++;
            else if (State.col < 100) State.col = 100; // Salta a botones especiales
            else if (State.col < 102) State.col++;
            break;

        case 'ArrowLeft':
            if (State.col > 0 && State.col < 100) State.col--;
            else if (State.col === 100) State.col = totalLetras - 1;
            else if (State.col > 100) State.col--;
            break;

        case 'ArrowDown':
            if (State.col + columnas < totalLetras) State.col += columnas;
            else State.col = 100; // Baja a los botones (Borrar/Espacio)
            break;

        case 'ArrowUp':
            if (State.col >= columnas && State.col < 100) State.col -= columnas;
            else if (State.col >= 100) State.col = totalLetras - 1; // Sube a las letras
            break;

        case 'Enter':
            // IMPORTANTE: Aquí llamamos al otro archivo
            window.SearchController.handleSelect();
            break;
            
        case 'Backspace':
        case 'Escape':
            cerrarBuscador();
            break;
    }
};