// 1. Códigos de Tecla D-pad (Android TV)
const KEY_LEFT = 21;
const KEY_UP = 19;
const KEY_RIGHT = 22;
const KEY_DOWN = 20;
const KEY_ENTER = 23; 
const KEY_SELECT = 66; 
const KEY_BACK = 27;

// 2. Estado de la App
let currentFocus = null;
let isVideoPlaying = false; 

// 3. 🎯 MAPA DE VIDEOS (¡IMPORTANTE! AQUÍ SE CAMBIAN LOS VIDEOS)
// Usa solo el ID del video de YouTube (los 11 caracteres después de v= o youtu.be/)
const VIDEO_MAP = {
    // ID DEL BANNER
    'hero-1':'KjhWL-7cmws', 
    
    // IDS DE LA CUADRÍCULA (incluyendo el último ID: iqeatp1VXVA)
            'g-2-1': 'iqeatp1VXVA', // Video A
            'g-2-2': 'NcdYo_eMv4U', // Video B
            'g-2-3': 'QskN9E6mCFk', // Video C
            'g-2-4': 'fsSryNsqPDY', // Video D
            'g-3-1': 'cHFL7a3-2aY', // Video E
            'g-3-2': '6_HQd1qnmxQ', // Video F
            'g-3-3': 'hpfTQF3q4qs', // Video G
            'g-3-4': 'KjhWL-7cmws', // Video H
};

// Función auxiliar para generar URL del thumbnail de YouTube
function getThumbnailUrl(videoId, type = 'mqdefault') {
    // default, hqdefault, mqdefault, sddefault, maxresdefault
    return `https://i.ytimg.com/vi/${videoId}/${type}.jpg`;
}

/**
 * 🖼️ Carga todas las miniaturas al cargar la página (llamado por <body>).
 */
window.setThumbnails = function() {
    // Cuadrícula (g-x-x)
    document.querySelectorAll('.video-grid .movie-card img').forEach(imgElement => {
        const id = imgElement.id.replace('img-', ''); // g-2-1
        const videoId = VIDEO_MAP[id];
        if (videoId) {
            // Usamos 'mqdefault' para miniaturas de póster (verticales)
            imgElement.src = getThumbnailUrl(videoId, 'mqdefault');
        }
    });

    // Foco inicial
    const initialFocus = document.getElementById('nav-peliculas');
    if (initialFocus) {
        initialFocus.focus();
        currentFocus = initialFocus;
    }
};

// 4. Control del Reproductor de Video

/**
 * 🎥 Muestra el reproductor y carga el video.
 * Recibe el ID de YouTube o una URL directa MP4.
 */
window.showVideoPlayer = function(videoIdentifier) {
    const playerContainer = document.getElementById('video-player-container');
    const videoElement = document.getElementById('main-video-player');
    const backButton = document.getElementById('back-button');

    document.getElementById('header').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    
    let embedUrl = '';
    
    // Si el identificador es un ID de YouTube (lo más probable en este contexto)
    if (videoIdentifier.length === 11) {
        const videoId = videoIdentifier;
        // Parámetros para incrustación en WebView
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&hl=es`;
    } else {
        // Si es una URL directa (ej: .mp4)
        embedUrl = videoIdentifier;
    }

    // Mostrar el reproductor y cargar la URL
    playerContainer.style.display = 'block';
    isVideoPlaying = true;
    videoElement.src = embedUrl;
    
    // Poner el foco en el botón de atrás
    setTimeout(() => { backButton.focus(); }, 100);
};

/**
 * Oculta el reproductor y vuelve a la cuadrícula.
 */
window.hideVideoPlayer = function() {
    const playerContainer = document.getElementById('video-player-container');
    const videoElement = document.getElementById('main-video-player');

    // Limpiar el src para detener el video
    videoElement.src = ''; 
    playerContainer.style.display = 'none';
    isVideoPlaying = false;

    document.getElementById('header').style.display = 'flex'; 
    document.getElementById('main-content').style.display = 'block';
    
    if (currentFocus) {
        currentFocus.focus();
        currentFocus.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    } else {
         document.getElementById('nav-peliculas').focus();
    }
};

/**
 * Función de Acción (Manejador de selección - se llama con ENTER o click)
 */
window.handleSelection = function(id) {
    console.log("Elemento seleccionado/clicado: " + id);
    
    const videoId = VIDEO_MAP[id];
    
    if (videoId) {
        // Pasamos el ID del video a la función showVideoPlayer
        showVideoPlayer(videoId);
    } else if (id.startsWith('nav-')) {
        // Elemento de navegación
        alert(`Navegando a: ${id}`);
        return;
    }
};


// 5. Lógica de Navegación D-Pad

function findNextFocus(direction) {
    if (!currentFocus) return null;

    const currentRow = parseInt(currentFocus.getAttribute('data-row'));
    const currentCol = parseInt(currentFocus.getAttribute('data-col'));
    
    let nextRow = currentRow;
    let nextCol = currentCol;

    if (direction === 'right') { nextCol++; } 
    else if (direction === 'left') { nextCol--; } 
    else if (direction === 'down') { nextRow++; } 
    else if (direction === 'up') { nextRow--; }

    // Lógica de salto entre filas
    if (currentRow === 1 && direction === 'up') {
        return document.querySelector(`[data-row="0"][data-col="${currentCol}"]`);
    }
    if (currentRow === 0 && nextRow === 1 && direction === 'down') {
        return document.querySelector(`[data-row="1"][data-col="1"]`);
    }
    if (currentRow === 1 && nextRow === 2 && direction === 'down') {
        return document.querySelector(`[data-row="2"][data-col="1"]`);
    }
    
    let nextElement = document.querySelector(`[data-row="${nextRow}"][data-col="${nextCol}"]`);
    
    return nextElement;
}

// Manejador principal de teclado
document.addEventListener('keydown', (event) => {
    
    if (event.keyCode === KEY_BACK || event.keyCode === 8) {
        if (isVideoPlaying) {
            event.preventDefault(); 
            hideVideoPlayer();
            return;
        }
    }

    if (isVideoPlaying) {
        return; 
    }
    
    let nextElement = null;
    let direction = null;

    switch (event.keyCode) {
        case KEY_RIGHT: direction = 'right'; break;
        case KEY_LEFT: direction = 'left'; break;
        case KEY_DOWN: direction = 'down'; break;
        case KEY_UP: direction = 'up'; break;
        case KEY_ENTER:
        case KEY_SELECT:
            if (currentFocus) {
                currentFocus.click();
            }
            return; 
        default:
            return; 
    }

    nextElement = findNextFocus(direction);

    if (nextElement && nextElement !== currentFocus) {
        event.preventDefault(); 
        
        nextElement.focus();
        currentFocus = nextElement;
        
        currentFocus.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
});