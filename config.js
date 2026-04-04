window.AppConfig = {
    // 1. PIN de Seguridad para Adultos
    PIN_ADULTOS: "1234",

    // 2. Definición del Menú Lateral
    // El "id" debe coincidir con los nombres que usa el Parser y la App
    SECCIONES: [
        { id: 'tv', label: 'TV EN VIVO', icon: '📺' },
        { id: 'peliculas', label: 'PELÍCULAS', icon: '🎬' },
        { id: 'series', label: 'SERIES', icon: '🍿' },
        { id: 'infantiles', label: 'INFANTILES', icon: '🧸' },
        { id: 'adultos', label: 'ADULTOS (+18)', icon: '🔞' },
        { id: 'favoritos', label: 'MIS FAVORITOS', icon: '⭐' }
    ],

    // 3. Categorías que siempre deben pedir PIN (por seguridad extra)
    CATEGORIAS_BLOQUEADAS: ["XXX", "ADULTOS", "HOT", "EROTICA", "18+"]
};