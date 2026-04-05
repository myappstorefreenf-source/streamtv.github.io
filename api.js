/**
 * HOOD PROJECT - API SERVICE (TMDB)
 * Maneja la obtención de sinopsis y fondos de alta calidad.
 */
const API = {
    key: '7ba138ff630dcf197f29d58e9de8ce10', // Reemplaza con tu clave de TMDB

    // Limpia el nombre del canal/película para que la búsqueda sea efectiva
    limpiarNombre: function(nombre) {
        if (!nombre) return "";
        return nombre
            .replace(/\b(1080p|720p|4k|uhd|latino|castellano|multi|subs|dual|h264|x265|bluray|rip|xvid|hdtv)\b/gi, '')
            .replace(/[\[\(\{\].*?[\}\)\]]/g, '') // Quita (2024), [Dual], etc.
            .replace(/\s+/g, ' ') // Quita espacios dobles
            .trim();
    },

    // Obtiene la sinopsis y el fondo de una película o serie
    obtenerDetalles: async function(item) {
        // 1. Si ya tiene sinopsis guardada, no gasta la API (Caché local)
        if (item.overview && item.overview !== "Buscando sinopsis...") return item.overview;

        const nombreLimpio = this.limpiarNombre(item.name || item.titulo);
        const tipo = item.episodios ? 'tv' : 'movie';
        
        const url = `https://api.themoviedb.org/3/search/${tipo}?api_key=${this.key}&query=${encodeURIComponent(nombreLimpio)}&language=es-ES`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error en red');
            
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const info = data.results[0];
                
                // Guardamos los datos en el objeto original para no pedirlos de nuevo
                item.overview = info.overview || "Sinopsis no disponible.";
                
                // Solo guardamos el backdrop si existe
                if (info.backdrop_path) {
                    item.backdrop = `https://image.tmdb.org/t/p/w1280${info.backdrop_path}`;
                }
                
                return item.overview;
            }
        } catch (error) {
            console.error("API Error:", error);
        }

        item.overview = "Sinopsis no disponible.";
        return item.overview;
    }
};

window.API = API;