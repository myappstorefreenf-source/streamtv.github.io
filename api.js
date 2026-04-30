/**
 * HOOD PROJECT - API SERVICE (TMDB)
 * Maneja la obtención de sinopsis y fondos de alta calidad.
 */
const API = {
    key: '7ba138ff630dcf197f29d58e9de8ce10',

    limpiarNombre: function(nombre) {
        if (!nombre) return "";
        // Eliminamos etiquetas comunes de archivos y años entre paréntesis
        return nombre
            .replace(/\b(1080p|720p|4k|uhd|latino|castellano|multi|subs|dual|h264|x265|bluray|rip|xvid|hdtv)\b/gi, '')
            .replace(/[\[\(\{\].*?[\}\)\]]/g, '') 
            .replace(/\s+/g, ' ') 
            .trim();
    },

    obtenerDetalles: async function(item) {
        // 1. IMPORTANTE: Validar contra el mismo texto que usa AppController
        // Si ya tiene una sinopsis real (larga), no llamar a la API
        if (item.overview && item.overview.length > 50) return item.overview;

        const nombreLimpio = this.limpiarNombre(item.name || item.titulo);
        
        // 2. Detección de tipo mejorada
        // Si tiene episodios es 'tv', si no, verificamos el State global si existe
        const esTV = (item.episodios && item.episodios.length > 0) || (window.State && window.State.source === 'tv');
        const tipo = esTV ? 'tv' : 'movie';
        
        const url = `https://api.themoviedb.org/3/search/${tipo}?api_key=${this.key}&query=${encodeURIComponent(nombreLimpio)}&language=es-ES`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Error en red');
            
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                // Buscamos el mejor match (el primero usualmente)
                const info = data.results[0];
                
                // Guardamos la sinopsis
                item.overview = info.overview || "Sinopsis no disponible en este idioma.";
                
                // Guardamos el fondo en alta resolución
                if (info.backdrop_path) {
                    item.backdrop = `https://image.tmdb.org/t/p/w1280${info.backdrop_path}`;
                }
                
                return item.overview;
            } else {
                // Si no hay resultados, intentamos buscar como el tipo opuesto 
                // (útil si una serie está mal categorizada como película)
                const otroTipo = tipo === 'movie' ? 'tv' : 'movie';
                const urlRetry = `https://api.themoviedb.org/3/search/${otroTipo}?api_key=${this.key}&query=${encodeURIComponent(nombreLimpio)}&language=es-ES`;
                const resRetry = await fetch(urlRetry);
                const dataRetry = await resRetry.json();
                
                if (dataRetry.results && dataRetry.results.length > 0) {
                    const infoR = dataRetry.results[0];
                    item.overview = infoR.overview;
                    if (infoR.backdrop_path) item.backdrop = `https://image.tmdb.org/t/p/w1280${infoR.backdrop_path}`;
                    return item.overview;
                }
            }
        } catch (error) {
            console.error("API Error:", error);
            return "Error al cargar información.";
        }

        item.overview = "No se encontró información para este título.";
        return item.overview;
    }
};

window.API = API;