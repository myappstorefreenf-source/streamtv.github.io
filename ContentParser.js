/**
 * HOOD PROJECT - CONTENT PARSER
 * Versión corregida: Agrupa episodios en una sola serie y separa Películas, Series y Adultos.
 */
const ContentParser = {
    
    // Función para limpiar el nombre (Ej: "The Boys S01E01" -> "The Boys")
    obtenerNombreBase: function(titulo) {
        return titulo
            .replace(/\sS\d+E\d+.*/i, '') // Quita S01E01 y lo que siga
            .replace(/\sS\d+.*/i, '')     // Quita S01 y lo que siga
            .replace(/\sT\d+.*/i, '')     // Quita T01 (Temporada)
            .replace(/\sE\d+.*/i, '')     // Quita E01 (Episodio)
            .replace(/Capítulo\s\d+/i, '')
            .replace(/Cap\.\s\d+/i, '')
            .trim();
    },

    parsearTV: function(m3uString) {
        if (!m3uString) return {};
        const lineas = m3uString.split('\n');
        const categorias = {};
        let currentItem = null;

        lineas.forEach(linea => {
            const l = linea.trim();
            if (l.startsWith('#EXTINF:')) {
                const info = l.split(',');
                const metadata = info[0];
                const titulo = info[1] ? info[1].trim() : "Sin nombre";
                const logoMatch = metadata.match(/tvg-logo="([^"]+)"/i);
                const grupoMatch = metadata.match(/group-title="([^"]+)"/i);
                const grupo = grupoMatch ? grupoMatch[1].toUpperCase() : "GENERAL";
                
                if (!categorias[grupo]) categorias[grupo] = [];
                currentItem = {
                    name: titulo,
                    titulo: titulo,
                    logo: logoMatch ? logoMatch[1] : "https://via.placeholder.com/300x300?text=TV",
                    grupo: grupo
                };
            } else if (l.startsWith('http') && currentItem) {
                currentItem.url = l;
                categorias[currentItem.grupo].push(currentItem);
                currentItem = null;
            }
        });
        return categorias;
    },

    parsearVOD: function(m3uString) {
        if (!m3uString) return { peliculas: {}, series: {}, adultos: {} };
        
        const lineas = m3uString.split('\n');
        const catalogo = { peliculas: {}, series: {}, adultos: {} };
        
        // Diccionario para agrupar episodios por Serie
        const seriesTemp = {}; 
        let currentItem = null;

        lineas.forEach(linea => {
            const l = linea.trim();
            if (l.startsWith('#EXTINF:')) {
                const info = l.split(',');
                const metadata = info[0];
                const titulo = info[1] ? info[1].trim() : "Sin nombre";
                
                const logoMatch = metadata.match(/tvg-logo="([^"]+)"/i);
                const grupoMatch = metadata.match(/group-title="([^"]+)"/i);
                const grupoOriginal = grupoMatch ? grupoMatch[1] : "VARIOS";
                const grupoKey = grupoOriginal.toUpperCase();
                
                const searchString = (grupoOriginal + " " + titulo).toLowerCase();
                const esAdulto = /xxx|adulto|porn|erotica|\+18|sexy|playboy|venus/i.test(searchString);
                const esSerie = !esAdulto && /series|temporada|season|s\d+|e\d+|cap\.|capitulo/i.test(searchString);

                if (esAdulto) {
                    if (!catalogo.adultos[grupoKey]) catalogo.adultos[grupoKey] = [];
                    currentItem = { name: titulo, logo: logoMatch ? logoMatch[1] : "", tipo: 'adultos', grupo: grupoKey };
                } else if (esSerie) {
                    const nombreSerie = this.obtenerNombreBase(titulo);
                    // Creamos una llave única por grupo y nombre de serie
                    const serieId = `${grupoKey}_${nombreSerie}`;

                    if (!seriesTemp[serieId]) {
                        seriesTemp[serieId] = {
                            name: nombreSerie,
                            titulo: nombreSerie,
                            logo: logoMatch ? logoMatch[1] : "https://via.placeholder.com/300x450?text=SERIE",
                            grupo: grupoKey,
                            episodios: [] // Aquí guardaremos los links
                        };
                        if (!catalogo.series[grupoKey]) catalogo.series[grupoKey] = [];
                        catalogo.series[grupoKey].push(seriesTemp[serieId]);
                    }
                    // Marcamos este item como episodio para que el siguiente 'http' sepa dónde ir
                    currentItem = { isEpisodio: true, serieId: serieId, epTitulo: titulo };
                } else {
                    if (!catalogo.peliculas[grupoKey]) catalogo.peliculas[grupoKey] = [];
                    currentItem = { name: titulo, titulo: titulo, logo: logoMatch ? logoMatch[1] : "https://via.placeholder.com/300x450?text=VOD", tipo: 'peliculas', grupo: grupoKey };
                }
            } else if (l.startsWith('http') && currentItem) {
                if (currentItem.isEpisodio) {
                    // Guardamos el link dentro de la serie agrupada
                    seriesTemp[currentItem.serieId].episodios.push({
                        titulo: currentItem.epTitulo,
                        url: l
                    });
                } else {
                    currentItem.url = l;
                    catalogo[currentItem.tipo][currentItem.grupo].push(currentItem);
                }
                currentItem = null;
            }
        });
        return catalogo;
    },

    buscarEnCatalogo: function(query, fuente) {
        const termino = query.toLowerCase();
        const resultados = [];
        const data = State.catalog[fuente];
        if (!data) return [];

        Object.keys(data).forEach(cat => {
            data[cat].forEach(item => {
                if (item.name.toLowerCase().includes(termino)) {
                    resultados.push(item);
                }
            });
        });
        return resultados;
    }
};

window.ContentParser = ContentParser;