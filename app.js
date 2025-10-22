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

// ----------------------------------------------------
// === LÓGICA DE VISIBILIDAD DE BOTÓN DE VOLVER ===
// ----------------------------------------------------
let buttonTimer = null;

/**
 * Muestra el botón de volver y lo oculta después de 3 segundos de inactividad.
 */
function showBackButtonTemporary() {
    const backButton = document.getElementById('back-button');
    
    // 1. Limpiar el temporizador anterior
    clearTimeout(buttonTimer);

    // 2. Mostrar el botón
    backButton.classList.add('visible');
    
    // 3. Establecer el nuevo temporizador para ocultarlo
    buttonTimer = setTimeout(() => {
        // Solo ocultamos si no tiene el foco actualmente (ej: si se está usando el D-Pad)
        if (document.activeElement !== backButton) {
            backButton.classList.remove('visible');
        }
    }, 3000); // 3 segundos
}

// ----------------------------------------------------
// 3. 🎯 MAPA DE VIDEOS 
// ----------------------------------------------------
const VIDEO_MAP = {
    // ID DEL BANNER
    'hero-1':'KjhWL-7cmws', 
    
    // IDS DE LA CUADRÍCULA 
    'g-2-1': 'iqeatp1VXVA', 
    'g-2-2': 'NcdYo_eMv4U', 
    'g-2-3': 'QskN9E6mCFk', 
    'g-2-4': 'fsSryNsqPDY', 
    'g-3-1': 'cHFL7a3-2aY', 
    'g-3-2': '6_HQd1qnmxQ', 
    'g-3-3': 'hpfTQF3q4qs', 
    'g-3-4': 'KjhWL-7cmws', 
    'g-4-1': 'WLg7dt0i9Jo', 
    'g-4-2': 'MNd_6q7FBxc',   
};

// Función auxiliar para generar URL del thumbnail de YouTube
function getThumbnailUrl(videoId, type = 'mqdefault') {
    return `https://i.ytimg.com/vi/${videoId}/${type}.jpg`;
}

/**
 * 🖼️ Carga todas las miniaturas al cargar la página.
 */
window.setThumbnails = function() {
    document.querySelectorAll('.video-grid .movie-card img').forEach(imgElement => {
        const id = imgElement.id.replace('img-', ''); 
        const videoId = VIDEO_MAP[id];
        if (videoId && videoId.length === 11) {
            imgElement.src = getThumbnailUrl(videoId, 'mqdefault');
        }
    });

    const initialFocus = document.getElementById('nav-peliculas');
    if (initialFocus) {
        initialFocus.focus();
        currentFocus = initialFocus;
    }
};

// ----------------------------------------------------
// 4. Control del Reproductor de Video
// ----------------------------------------------------

/**
 * 🎥 Muestra el reproductor, carga el video. Se ha eliminado la solicitud automática de pantalla completa para Chrome.
 */
window.showVideoPlayer = function(videoIdentifier) {
    const playerContainer = document.getElementById('video-player-container');
    const videoElement = document.getElementById('main-video-player');
    const backButton = document.getElementById('back-button');

    document.getElementById('header').style.display = 'none';
    document.getElementById('main-content').style.display = 'none';
    
    let embedUrl = '';
    
    if (videoIdentifier.length === 11) {
        const videoId = videoIdentifier;
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&hl=es`;
    } else {
        embedUrl = videoIdentifier;
    }

    playerContainer.style.display = 'block';
    isVideoPlaying = true;
    videoElement.src = embedUrl;
    
    // ⚠️ PANTALLA COMPLETA AUTOMÁTICA (Comentado para evitar errores en navegadores de escritorio)
    // if (playerContainer.requestFullscreen) {
    //     playerContainer.requestFullscreen();
    // } else if (playerContainer.webkitRequestFullscreen) {
    //     playerContainer.webkitRequestFullscreen();
    // } else if (playerContainer.msRequestFullscreen) {
    //     playerContainer.msRequestFullscreen();
    // }
    
    // Poner el foco en el botón de atrás Y mostrarlo temporalmente
    setTimeout(() => { 
        // backButton.focus(); // Se quita el foco explícito para mejor UX en desktop
        showBackButtonTemporary();
    }, 100);
};

/**
 * Oculta el reproductor y vuelve a la cuadrícula.
 */
window.hideVideoPlayer = function() {
    const playerContainer = document.getElementById('video-player-container');
    const videoElement = document.getElementById('main-video-player');
    const backButton = document.getElementById('back-button'); // Necesario para limpiar la clase

    // Limpiar el src para detener el video
    videoElement.src = ''; 
    playerContainer.style.display = 'none';
    isVideoPlaying = false;

    // LIMPIEZA DEL BOTÓN DE VOLVER
    clearTimeout(buttonTimer); 
    backButton.classList.remove('visible'); // Asegura que la clase se elimine

    // Salir del modo fullscreen si está activo
    if (document.fullscreenElement) {
        document.exitFullscreen();
    }
    
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
        showVideoPlayer(videoId);
    } else if (id.startsWith('nav-')) {
        // ⚠️ CORREGIDO: Usar console.log en lugar de alert()
        console.log(`Navegación simulada a: ${id}`);
        return;
    }
};


// ----------------------------------------------------
// 5. Lógica de Navegación D-Pad y Event Listeners
// ----------------------------------------------------

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
        // MOSTRAR BOTÓN DE VOLVER AL PULSAR CUALQUIER TECLA (D-PAD)
        showBackButtonTemporary();
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

// 6. Detección de Mouse/Táctil
// Estos eventos activan la visibilidad del botón si el video está en reproducción.
document.addEventListener('mousemove', () => {
    if (isVideoPlaying) {
        showBackButtonTemporary();
    }
});

document.addEventListener('touchstart', () => {
    if (isVideoPlaying) {
        showBackButtonTemporary();
    }
});
