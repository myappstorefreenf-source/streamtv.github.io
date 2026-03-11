const lanzarVideoNativo = (url, titulo) => {
    // 1. Creamos una copia de la URL para modificarla
    let urlParaReproducir = url;

    // 2. Verificamos si es un video (evitamos tocar los .srt si los hubiera)
    // Buscamos que tenga el patrón "/play/" que usa tu Flask
    if (url.includes("/play/")) {
        // Reemplazamos "/play/" por ":8081/" 
        // Esto cambia la ruta de Flask por la de Nginx directamente
        urlParaReproducir = url.replace("/play/", ":8081/");
    }

    // 3. Enviamos la URL ya modificada al reproductor de la App
    if (window.AndroidInterface) {
        window.AndroidInterface.playVideo(urlParaReproducir, titulo);
    } else {
        console.log("URL Original:", url);
        console.log("URL para Nginx (8081):", urlParaReproducir);
    }
};
