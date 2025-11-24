// Asegúrate de que React, ReactDOM, y Hls.js estén cargados en tu HTML.

// ----------------------------------------------------------------------
// 0. CONFIGURACIÓN Y DATOS LOCALES
// ----------------------------------------------------------------------

const LOCAL_M3U_DATA = [
    {
        title: "América TV",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logotipo_de_America_TV.svg/1933px-Logotipo_de_America_TV.svg.png",
        category: "Argentina",
        url: "https://prepublish.f.qaotic.net/a07/americahls-100056/playlist_720p.m3u8"
    },
    {
        title: "El Trece",
        logoUrl: "https://images.seeklogo.com/logo-png/2/1/canal-trece-argentina-logo-png_seeklogo-25582.png",
        category: "Argentina",
        url: "https://livetrx01.vodgc.net/eltrecetv/index.m3u8"
    },
    {
        title: "Net TV",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Net_TV_logo.png",
        category: "Argentina",
        url: "https://unlimited1-saopaulo.dps.live/nettv/nettv.smil/playlist.m3u8"
    },
    {
        title: "Telefe",
        logoUrl: "https://images.seeklogo.com/logo-png/45/1/telefe-tv-logo-png_seeklogo-451860.png",
        category: "Argentina",
        url: "https://telefe.com/Api/Videos/GetSourceUrl/694564/0/HLS?.m3u8"
    },
    {
        title: "Canal 26",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Canal_26_logo_%282022%29.svg/2048px-Canal_26_logo_%282022%29.svg.png",
        category: "Argentina",
        url: "https://stream-gtlc.telecentro.net.ar/hls/canal26hls/main.m3u8"
    },
    {
        title: "Canal E",
        logoUrl: "https://files.catbox.moe/tacipf.png",
        category: "Argentina",
        url: "https://unlimited1-saopaulo.dps.live/perfiltv/perfiltv.smil/playlist.m3u8"
    },
    {
        title: "TN",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/TN_todo_noticias_logo.svg/2560px-TN_todo_noticias_logo.svg.png",
        category: "Noticias",
        url: "https://live-01-01-tn.vodgc.net/TN24/index_TN24_1080.m3u8",
        referrer: "https://tn.com.ar/envivo/24hs", 
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" 
    },
     {
        title: "Cronica",
        logoUrl: "https://argentina.mom-gmr.org/uploads/_processed_/8/6/csm_16062-1639_import_3467384d27.png",
        category: "Noticias",
        url: "https://g4.vxral-slo.transport.edge-access.net/a14/ngrp:cronicatv_video1-100044_all/cronicatv_video1-100044_720p.m3u8",
        referrer: "https://vmf.edge-apps.net/", 
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" 
    },
    {
        title: "Argentinisima Satelital",
        logoUrl: "https://files.catbox.moe/7cghqq.png",
        category: "Argentina",
        url: "https://stream1.sersat.com/hls/argentinisima.m3u8"
    },
    {
        title: "Canal 9 Multivisión",
        logoUrl: "https://files.catbox.moe/iqx1h4.png",
        category: "Argentina",
        url: "https://panel.host-live.com:19360/8250/8250.m3u8"
    },
    {
        title: "Ciudad Magazine",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Ciudad_magazine_logo.png",
        category: "Argentina",
        url: "https://livetrx01.vodgc.net/live-01-07-ciudad.vodgc.net/tracks-v1a1/mono.m3u8"
    },
    {
        title: "Telemax",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/13/Telemax_Argentina_%282018%29.png",
        category: "Argentina",
        url: "https://stream-gtlc.telecentro.net.ar/hls/telemaxhls/main.m3u8"
    },
    {
        title: "5tv SD",
        logoUrl: "https://i.imgur.com/mSn7ACs.png",
        category: "Argentina",
        url: "http://www.coninfo.net:1935/tvcinco/live1/playlist.m3u8"
    },
    {
        title: "24/7 Canal de Noticias SD",
        logoUrl: "https://i.imgur.com/4hDCB1M.png",
        category: "Argentina",
        url: "https://panel.host-live.com:19360/cn247tv/cn247tv.m3u8"
    },
    {
        title: "Aire de Santa Fe SD",
        logoUrl: "https://i.imgur.com/60vSWW0.png",
        category: "Argentina",
        url: "https://unlimited1-us.dps.live/airedesantafetv/airedesantafetv.smil/playlist.m3u8"
    },
    {
        title: "Argentinisima Satelital SD",
        logoUrl: "https://i.imgur.com/xFgJawa.png",
        category: "Argentina",
        url: "https://stream1.sersat.com/hls/argentinisima.m3u8"
    },
    {
        title: "Bayres TV SD",
        logoUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjKrroOZ4RYMYlzGqMQjiIO2QbRNVndEM9PiC-CaRn0PO2AoB_YKyrt6Eigzh4M1gPZaVn5udDL5YzrzxAmyQCj_HTF8Pszo46dk9dABt9TpepY43_IEzT80atZEMaiMcdrqt3lmxAbZYaLwCgr6vDUgV1HlvmhIOJ99UlwAhG2FoHgtCm13CWEugV7Bvg/w1200-h630-p-k-no-nu/bayres-tv-removebg-preview.png",
        category: "General",
        url: "https://streaming01.mikrolive.tv/bayrestv/live/playlist.m3u8"
    },
    {
        title: "Canal 2 de Ushuaia SD",
        logoUrl: "https://i.ibb.co/q5NPdK2/canal2-logo.png",
        category: "Argentina",
        url: "https://nd106.republicaservers.com:4433/hls/c6611/index.m3u8"
    },
    {
        title: "Canal 3 La Pampa SD",
        logoUrl: "https://i.imgur.com/SsNFudP.png",
        category: "Argentina",
        url: "https://stream.arcast.com.ar/c3lapampa/ngrp:c3lapampa_all/playlist.m3u8"
    },
    {
        title: "Canal 4 Jujuy SD",
        logoUrl: "https://i.imgur.com/qB6I274.png",
        category: "Argentina",
        url: "https://5cd577a3dd8ec.streamlock.net/CANAL4/smil:CANAL4.smil/playlist.m3u8"
    },
    {
        title: "Canal 4 Posadas SD",
        logoUrl: "https://i.imgur.com/tElJr3e.png",
        category: "Argentina",
        url: "https://iptv.ixfo.com.ar:30443/live/C4POS/playlist.m3u8"
    },
    {
        title: "Canal 4 San Juan SD",
        logoUrl: "https://i.imgur.com/MsCnwRA.png",
        category: "Argentina",
        url: "https://streamlov.alsolnet.com/canal4sanjuan/live/playlist.m3u8"
    },
    {
        title: "Canal 5 Del Pueblo SD",
        logoUrl: "https://i.ibb.co/XzcYYMc/Canal-5-alcorta-ver.jpg",
        category: "Interior",
        url: "https://stmv4.voxtvhd.com.br/canal5pueblo/canal5pueblo/playlist.m3u8"
    },
    {
        title: "Canal 5 Pico Truncado SD",
        logoUrl: "https://i.imgur.com/VwUiSVF.png",
        category: "Interior",
        url: "https://stream.arcast.com.ar/canal5picotruncado/canal5picotruncado/playlist.m3u8"
    },
    {
        title: "Canal 6 Posadas SD",
        logoUrl: "https://i.imgur.com/OamBiS5.png",
        category: "Interior",
        url: "https://iptv.ixfo.com.ar:30443/live/c6digital/playlist.m3u8"
    },
    {
        title: "Canal 7 Jujuy SD",
        logoUrl: "https://i.imgur.com/K0jk8p4.png",
        category: "Interior",
        url: "https://stream.arcast.live/canal7jujuy/ngrp:canal7jujuy_all/playlist.m3u8"
    },
    {
        title: "Canal 7 Neuquen SD",
        logoUrl: "https://i.ibb.co/BrvQsWm/C7neuquenlogo2023.png",
        category: "Interior",
        url: "https://stream.arcast.com.ar/c7nq/ngrp:c7nq_all/playlist.m3u"
    },
    {
        title: "Canal 7 Salta SD",
        logoUrl: "https://i.imgur.com/CudG6sl.png",
        category: "Interior",
        url: "https://vivo.solumedia.com:19360/cooperativa/cooperativa.m3u8"
    },
    {
        title: "Canal 9 Resistencia SD",
        logoUrl: "https://i.imgur.com/xqgRFpC.png",
        category: "Interior",
        url: "http://coninfo.net:1935/9linklivert/smil:9linkmultibr.smil/playlist.m3u8"
    },
    {
        title: "Canal 10 Cordoba SD",
        logoUrl: "https://i.imgur.com/87WCHtd.png",
        category: "Interior",
        url: "https://stream.arcast.net:4443/canal10/ngrp:canal10_all/playlist.m3u8"
    },
    {
        title: "Canal 11 de la Costa SD",
        logoUrl: "https://i.imgur.com/yYExcq1.jpg",
        category: "la costa",
        url: "https://vivo.solumedia.com:19360/dadaproductora/dadaproductora.m3u8"
    },
    {
        title: "Canal 13 Jujuy SD",
        logoUrl: "https://i.imgur.com/lmKLiJ3.jpg",
        category: "Religious",
        url: "https://genexservicios.com:19360/canal13jujuy/canal13jujuy.m3u8"
    },
    {
        title: "Canal 13 San Luis SD",
        logoUrl: "https://i.imgur.com/NcfMC29.png",
        category: "Interior",
        url: "https://stream.radiosmundiales.com:19360/sanluismas/sanluismas.m3u8"
    },
    {
        title: "Somos La Pampa SD",
        logoUrl: "https://i.imgur.com/BUNvyTY.png",
        category: "Interior",
        url: "https://stream.arcast.com.ar/somosnoticias/somosnoticias/playlist.m3u8"
    },
    {
        title: "Telemax SD",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Telemax_Argentina_%282018%29.png/512px-Telemax_Argentina_%282018%29.svg.png",
        category: "entertainment",
        url: "https://stream-gtlc.telecentro.net.ar/hls/telemaxhls/main.m3u8"
    },
    {
        title: "X Level Media SD",
        logoUrl: "https://i.imgur.com/BGwQdQW.jpeg",
        category: "Music",
        url: "https://tuvideoonline.com.ar:3332/live/xlevelmedialive.m3u8"
    },
    {
        title: "Xtrema Accion SD",
        logoUrl: "https://i.imgur.com/z5NwizH.png",
        category: "Movies",
        url: "https://stmv6.voxtvhd.com.br/cineaccion/cineaccion/playlist.m3u8",
        referrer: "https://xtrematv.com/?p=1434"
    },
    {
        title: "Xtrema Animal SD",
        logoUrl: "https://i.imgur.com/HQxKLlK.png",
        category: "Argentina",
        url: "https://stmv6.voxtvhd.com.br/xtremaanimal/xtremaanimal/playlist.m3u8",
        referrer: "https://xtrematv.com/?p=1504"
    },
    {
        title: "Xtrema Cartoons SD",
        logoUrl: "https://i.imgur.com/X2d8y4e.png",
        category: "Infantil",
        url: "https://stmv6.voxtvhd.com.br/xtremacartoons/xtremacartoons/playlist.m3u8",
        referrer: "https://xtrematv.com/?p=1390"
    },
    {
        title: "Xtrema Cine Clasico SD",
        logoUrl: "https://i.imgur.com/j91M4Yf.png",
        category: "Movies",
        url: "https://stmv6.voxtvhd.com.br/cineclasico/cineclasico/playlist.m3u8",
        referrer: "https://xtrematv.com/?p=1460"
    },
    {
        title: "Xtrema Terror SD",
        logoUrl: "https://i.imgur.com/FcaTUym.png",
        category: "Movies",
        url: "https://stmv6.voxtvhd.com.br/cineterror/cineterror/playlist.m3u8",
        referrer: "https://xtrematv.com/?p=1456"
    },
    {
        title: "Canal 21 TV SD",
        logoUrl: "https://i.imgur.com/Am7yMXg.png",
        category: "Interior",
        url: "https://iptv.ixfo.com.ar:30443/c21tv/hd/c21tv/playlist.m3u8"
    },
    {
        title: "Canal 22 SD",
        logoUrl: "https://i.imgur.com/R4wXVxf.png",
        category: "Interior",
        url: "https://5f700d5b2c46f.streamlock.net/canal22/canal22/playlist.m3u8"
    },
    {
        title: "Canal 26 SD",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Canal_26_logo_%282022%29.svg/512px-Canal_26_logo_%282022%29.svg.png",
        category: "Noticias",
        url: "https://stream-gtlc.telecentro.net.ar/hls/canal26hls/0/playlist.m3u8"
    },
    {
        title: "Canal 34 San Juan SD",
        logoUrl: "https://i.imgur.com/bZMEiYe.png",
        category: "Interior",
        url: "https://streamyes.alsolnet.com/canal34hd/live/playlist.m3u8"
    },
    {
        title: "Canal 79 La Costa SD",
        logoUrl: "https://i.imgur.com/HYuSqJy.png",
        category: "La costa",
        url: "https://streamconex.com:19360/lacosta/lacosta.m3u8"
    },
    {
        title: "Canal 79 Puan SD",
        logoUrl: "https://i.imgur.com/HYuSqJy.png",
        category: "La costa",
        url: "https://streamconex.com:19360/puan/puan.m3u8"
    },
    {
        title: "Canal E SD",
        logoUrl: "https://i.ibb.co/y4pkxH3/Qtc8-M2-PG-400x400.jpg",
        category: "Noticias",
        url: "https://unlimited1-us.dps.live/perfiltv/perfiltv.smil/playlist.m3u8"
    },
    {
        title: "Canal Orbe 21 SD",
        logoUrl: "https://i.postimg.cc/gjgm8h55/canalorbe21.png",
        category: "Religious",
        url: "https://stream.arcast.net:4443/canal21/ngrp:canal21_all/playlist.m3u8"
    },
    {
        title: "Canal Santa Maria SD",
        logoUrl: "https://www.canalsantamaria.com.ar/images/santamaria_logo.jpg",
        category: "Religious",
        url: "https://streaming.telered.com.ar/santa-maria/streaming/mystream.m3u8"
    },
    {
        title: "Catamarca TV SD",
        logoUrl: "https://i.imgur.com/CEuPoqG.png",
        category: "Interior",
        url: "https://stream.arcast.com.ar/canal7catamarca/ngrp:canal7catamarca_all/playlist.m3u8?DVR="
    },
    {
        title: "Celta TV SD",
        logoUrl: "https://i.imgur.com/rwoIF4w.png",
        category: "Interior",
        url: "https://vivo.solumedia.com:19360/celta/celta.m3u8"
    },
    {
        title: "Cosmos Tv SD",
        logoUrl: "https://cdn4.fmcosmos.com/s4/2025/11/03/fmcosmos/images/15/92/159284_a18e887e336fef3bc6b188314a173ce10cbe51575966e839517e2b0428d7aed46/xs.webp",
        category: "Movies",
        url: "https://canaletaplus.com:3922/hybrid/play.m3u8"
    },
    {
        title: "Garage TV Latin America SD",
        logoUrl: "https://i.imgur.com/FqFxog1.png",
        category: "Autos",
        url: "https://stream1.sersat.com/hls/garagetv.m3u8"
    },
    {
        title: "Lapacho TV Canal 11 SD",
        logoUrl: "https://i.imgur.com/PmFBL7x.png",
        category: "General",
        url: "https://vivo.solumedia.com:19360/lapacho/lapacho.m3u8"
    },
    {
        title: "Litus TV SD",
        logoUrl: "https://i.imgur.com/QIGSf4L.png",
        category: "General",
        url: "https://stream.arcast.com.ar/litustv/ngrp:litustv_all/playlist.m3u8"
    },
    {
        title: "Metro TV SD",
        logoUrl: "https://i.imgur.com/7f7M7zl.png",
        category: "Movies",
        url: "https://streamtv12.ddns.net:5443/LiveApp/streams/193945633734205616732920.m3u8"
    },
    {
        title: "Misiones Cuatro SD",
        logoUrl: "https://i.imgur.com/HXRpRlK.png",
        category: "General",
        url: "https://iptv.ixfo.com.ar:30443/live-HD/MISIONES4/playlist.m3u8"
    },
    {
        title: "Multivision Federal SD",
        logoUrl: "https://i.imgur.com/jX0lqy1.png",
        category: "General",
        url: "https://panel.host-live.com:19360/8250/8250.m3u8"
    },
    {
        title: "Neox TV SD",
        logoUrl: "https://i.imgur.com/eIX71c9.png",
        category: "General",
        url: "https://tv.streamcasthd.com:3076/live/sonicaargentinalive.m3u8"
    },
    {
        title: "NET TV SD",
        logoUrl: "https://i.imgur.com/IhJ0BjF.png",
        category: "General",
        url: "https://unlimited1-us.dps.live/nettv/nettv.smil/playlist.m3u8"
    },
    {
        title: "BRAZZERS",
        logoUrl: "http://www.tps.uk.com/img/products/120/Brazzers-TV-Viaccess-12-month.jpg",
        category: "Adultos",
        url: "https://live.adultiptv.net/blonde.m3u8"
    },
    {
        title: "Sextreme",
        logoUrl: "https://es.wikipedia.org/wiki/Sextreme#/media/Archivo:Sextreme_logo.png",
        category: "Adultos",
        url: "https://live.adultiptv.net/anal.m3u8"
    },
    {
        title: "PenthouseX",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Penthouse_text_logo.svg",
        category: "Adultos",
        url: "https://live.adultiptv.net/rough.m3u8"
    },
    {
        title: "VENUS",
        logoUrl: "http://vignette3.wikia.nocookie.net/logopedia/images/4/48/Logo_venus_out_color.jpg",
        category: "Adultos",
        url: "https://live.redtraffic.xyz/russian.m3u8?fluxuslust.m3u8"
    },
    {
        title: "Jasmin TV",
        logoUrl: "https://i.imgur.com/DLEFDcv.png",
        category: "Adultos",
        url: "https://live.adultiptv.net/pornstar.m3u8"
    },
    {
        title: "HOT",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://live.adultiptv.net/threesome.m3u8"
    },
    {
        title: "Teen",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://live.adultiptv.net/teen.m3u8"
    }
];


// ----------------------------------------------------------------------
// 1. FUNCIONES DE UTILIDAD
// ----------------------------------------------------------------------

const groupChannelsByCategory = (channels) => {
    if (!channels) return {};

    return channels.reduce((groups, channel) => {
        const category = channel.category || 'Otros';

        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(channel);
        return groups;
    }, {});
};


// ----------------------------------------------------------------------
// 2. COMPONENTE VIDEO CARD 
// ----------------------------------------------------------------------
const VideoCard = React.memo(React.forwardRef(({ video, onPlay, index, isActive, isFocusable }, ref) => {
    const handlePlay = () => onPlay(video);
    
    const tabIndexValue = isFocusable ? "0" : "-1"; 

    return (
        <div 
            ref={ref}
            className={`video-card flex items-center justify-start w-full h-16 p-2 mb-1 cursor-pointer 
                        transition-all duration-300 border-l-4 
                        ${isActive ? 'border-blue-500 bg-gray-700' : 'border-transparent hover:bg-gray-800'}
                        focus:ring-2 focus:ring-blue-500 focus:outline-none z-10`}
            onClick={handlePlay}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handlePlay();
                }
            }}
            tabIndex={tabIndexValue} 
            data-index={index} 
            role="button"
        >
            <img 
                src={video.logoUrl || 'https://via.placeholder.com/64x64?text=NO+LOGO'}
                alt={video.title}
                className="w-10 h-10 object-cover rounded mr-3 flex-shrink-0"
                onError={(e) => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/64x64?text=NO+LOGO'; }}
            />
            <p className="text-white text-base font-medium truncate flex-grow">
                {video.title}
            </p>
        </div>
    );
}), (prevProps, nextProps) => {
    return prevProps.isActive === nextProps.isActive && 
           nextProps.isFocusable === nextProps.isFocusable &&
           prevProps.index === nextProps.index;
});


// ----------------------------------------------------------------------
// 3. COMPONENTE VIDEO PLAYER (Maneja HLS y la limpieza agresiva de audio)
// ----------------------------------------------------------------------
const VideoPlayer = React.forwardRef(({ channel, isPlaying, onFinish }, ref) => {
    
    const url = channel ? channel.url : null;
    const referrer = channel ? channel.referrer : null;
    const userAgent = channel ? channel.userAgent : null;
    
    // Función para manejar la configuración del XHR (Referer/User-Agent)
    const setupXhr = React.useCallback((xhr, url) => {
        if (referrer) {
            try {
                xhr.setRequestHeader('Referer', referrer); 
            } catch (e) {
                console.warn("No se pudo establecer el Referer.", e);
            }
        }
        if (userAgent) {
            try {
                xhr.setRequestHeader('User-Agent', userAgent);
            } catch (e) {
                // console.warn("No se pudo establecer User-Agent.", e);
            }
        }
    }, [referrer, userAgent]);

    React.useEffect(() => {
        const video = ref.current;
        const currentUrl = url;
        
        // No hacer nada si no hay URL para cargar
        if (!video || !currentUrl) return;
        
        let hls;
        const handleEnded = () => onFinish();
        video.addEventListener('ended', handleEnded);

        // ⭐ LIMPIEZA AGRESIVA INICIAL (Detiene el audio del canal anterior)
        if (video.__hlsInstance) {
             video.__hlsInstance.destroy();
             delete video.__hlsInstance;
        }
        video.pause();
        
        // ⭐ PASO CLAVE 1: MUTE INMEDIATO PARA EVITAR EL ECO
        video.muted = true; 
        
        // Limpieza de fuente nativa
        video.removeAttribute('src'); 
        video.load(); 
        
        
        if (window.Hls && Hls.isSupported()) { 
            
            const hlsConfig = {
                // Configuración de HLS para búfer y headers
                maxBufferLength: 30,     
                minBufferLength: 5,      
                autoSyncBuffer: 3,
                xhrSetup: setupXhr 
            };
            if (video) {
    video.pause(); // Asegura la pausa antes de la destrucción
    video.muted = true; // Doble chequeo de silencio

    if (video.__hlsInstance) {
        video.__hlsInstance.stopLoad(); // Detiene la descarga de segmentos
        video.__hlsInstance.detachMedia(); // Desconecta HLS del elemento <video>
        video.__hlsInstance.destroy(); // Destruye todo
        delete video.__hlsInstance;
    }
    
    // ⭐ REFUERZO: Reiniciar el tiempo y fuente del video
    video.currentTime = 0; // Reiniciar el puntero de reproducción
    video.removeAttribute('src'); 
    video.load(); 
}
            hls = new Hls(hlsConfig);
            hls.loadSource(currentUrl); 
            hls.attachMedia(video);
            video.__hlsInstance = hls;
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                 if (isPlaying) {
                     video.play().catch(e => console.error("Error al iniciar la reproducción (Autoplay):", e));
                     
                     // ⭐ PASO CLAVE 2: DESMUTE CON RETRASO
                     // Damos 500ms al sistema operativo para que el reproductor nativo
                     // se silencie o se resuelva el conflicto de decodificación.
                     setTimeout(() => {
                         if (video && video.muted) {
                             video.muted = false; // Reactivar el audio
                             console.log("Audio Reactivado después del Mute Agresivo.");
                         }
                     }, 6000); 
                 }
            });

            hls.on(Hls.Events.ERROR, function (event, data) {
                 if (data.fatal) {
                     console.error("Error fatal de HLS:", data);
                 }
            });

        } else {
            // Reproducción nativa (Fallback)
            video.src = currentUrl;
            if (isPlaying) {
                 video.play().catch(e => console.error("Error al iniciar la reproducción:", e));
                 // Aplicar el desmute también al fallback nativo
             /*    setTimeout(() => {
                     if (video && video.muted) video.muted = false; 
                 }, 2500);*/
            }
        }
        
        // ⭐ FUNCIÓN DE LIMPIEZA FINAL 
        return () => {
             video.removeEventListener('ended', handleEnded);
             video.pause();
             // Asegurarse de silenciar el elemento saliente
             video.muted = true; 
             
             if (video.__hlsInstance) {
                 video.__hlsInstance.destroy();
                 delete video.__hlsInstance;
             }
             video.removeAttribute('src');
             video.load();
        };
    }, [url, onFinish, ref, isPlaying, setupXhr]); // Dependencia actualizada a setupXhr
    
    // useEffect para controlar la pausa/reproducción
    React.useEffect(() => {
        const video = ref.current;
        if (video) {
            if (isPlaying) {
                video.play().catch(e => console.error("Error al reanudar:", e));
            } else {
                video.pause();
            }
        }
    }, [isPlaying, ref]);
    
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black">
            <video
                ref={ref}
                className='react-player'
                width='100%'
                height='100%'
                playsInline
                autoPlay
                controls={false}
            />
        </div>
    );
});


// ----------------------------------------------------------------------
// 4. COMPONENTE PRINCIPAL APP 
// ----------------------------------------------------------------------
function App() {
    const [videoCatalog, setVideoCatalog] = React.useState(null); 
    const [currentChannel, setCurrentChannel] = React.useState(null); 
    const currentChannelUrl = currentChannel ? currentChannel.url : null;
    
    // Estados de visibilidad del menú
    const [isMenuVisible, setIsMenuVisible] = React.useState(true); 
    const [isCategoryMenuVisible, setIsCategoryMenuVisible] = React.useState(false);
    // 🆕 Nuevo estado para el menú principal (TV/Pelis/Salir)
    const [isMainMenuVisible, setIsMainMenuVisible] = React.useState(false); 

    const playerRef = React.useRef(null);
    const [focusedIndex, setFocusedIndex] = React.useState(-1); 
    const [focusedFilteredIndex, setFocusedFilteredIndex] = React.useState(-1);
    const [focusedCategoryIndex, setFocusedCategoryIndex] = React.useState(-1);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [isPlaying, setIsPlaying] = React.useState(false); // Inicia sin reproducción

    const allChannels = videoCatalog || [];
    const cardRefs = React.useRef(new Map());
    const categoryListRef = React.useRef(null); 

    const groupedChannels = React.useMemo(() => {
        return groupChannelsByCategory(allChannels);
    }, [allChannels]);

    const categories = React.useMemo(() => Object.keys(groupedChannels), [groupedChannels]);
    
    const filteredChannels = React.useMemo(() => {
        if (selectedCategory === null) {
            return allChannels;
        }
        return allChannels.filter(channel => channel.category === selectedCategory);
    }, [allChannels, selectedCategory]);


    const focusChannelCard = React.useCallback((indexToFocus) => {
        const totalChannels = filteredChannels.length;
        if (totalChannels === 0) return;

        let finalIndex = indexToFocus;
        if (finalIndex === -1) {
            finalIndex = 0; 
        } else if (finalIndex >= totalChannels) {
            finalIndex = totalChannels - 1; 
        }

        setFocusedFilteredIndex(finalIndex);
        
        const channelToFocus = filteredChannels[finalIndex];
        const globalIndex = allChannels.findIndex(c => c.url === channelToFocus.url);
        
        if (globalIndex === -1) return;
        
        setFocusedIndex(globalIndex); 
        
        requestAnimationFrame(() => {
             const card = cardRefs.current.get(globalIndex); 
             if (card) {
                 card.focus();
                 card.scrollIntoView({ 
                     behavior: 'smooth', 
                     block: 'nearest' 
                 });
             } 
        });
        
    }, [filteredChannels, allChannels]);


    // 🆕 Función para abrir el Menú Principal (TV/Pelis/Salir)
    const openMainMenu = React.useCallback(() => {
        setIsMenuVisible(true);
        setIsCategoryMenuVisible(false);
        setIsMainMenuVisible(true);
        setIsPlaying(false);
        
        // Enfocar el primer elemento del Main Menu
        requestAnimationFrame(() => {
            document.getElementById('main-menu-tv-select')?.focus();
        });
    }, []);

    // 🆕 Función para cerrar todos los menús y volver al video
    const closeAllMenus = React.useCallback(() => {
        setIsCategoryMenuVisible(false);
        setIsMainMenuVisible(false);
        setIsMenuVisible(false);
        if (currentChannel) setIsPlaying(true);
    }, [currentChannel]);

    // Función para abrir el menú de canales (el que tiene la lista de canales)
    const openChannelMenu = React.useCallback(() => {
        setIsMainMenuVisible(false); // Cierra el menú principal
        setIsCategoryMenuVisible(false); // Cierra el menú de categorías
        setIsMenuVisible(true); // Abre el menú base (ChannelsMenu)
        setIsPlaying(false); 
        
        if (filteredChannels.length > 0) {
            const initialFocusIndex = focusedFilteredIndex !== -1 ? focusedFilteredIndex : 0;
            requestAnimationFrame(() => focusChannelCard(initialFocusIndex));
        }
    }, [focusChannelCard, focusedFilteredIndex, filteredChannels.length]);
    
    // Función para abrir el menú de categorías (Lista de géneros)
    const openCategoryMenu = React.useCallback(() => {
        if (!isMenuVisible) return;
        setIsMainMenuVisible(false); // Cierra el menú principal
        setIsCategoryMenuVisible(true);
        setIsPlaying(false);
        requestAnimationFrame(() => {
            const targetId = focusedCategoryIndex === -1 ? 'cat-focus--1' : `cat-focus-${focusedCategoryIndex}`;
            document.getElementById(targetId)?.focus();
        });
    }, [isMenuVisible, focusedCategoryIndex]);


    const handlePlayChannel = React.useCallback((channelObject) => {
        setCurrentChannel(channelObject); 
        
        const newGlobalIndex = allChannels.findIndex(c => c.url === channelObject.url); 
        setFocusedIndex(newGlobalIndex);
        
        const newFilteredIndex = filteredChannels.findIndex(c => c.url === channelObject.url);
        setFocusedFilteredIndex(newFilteredIndex !== -1 ? newFilteredIndex : 0);
        
        setIsCategoryMenuVisible(false);
        setIsMainMenuVisible(false);
        setIsMenuVisible(false);
        setIsPlaying(true);
    }, [allChannels, filteredChannels]);

    
    const handleVideoEnd = React.useCallback(() => {
        setIsMenuVisible(true);
        setIsPlaying(false);
        
        const initialFocusIndex = focusedFilteredIndex !== -1 ? focusedFilteredIndex : 0; 
        
        setTimeout(() => focusChannelCard(initialFocusIndex), 10); 
    }, [focusChannelCard, focusedFilteredIndex]);


    // Carga de datos local e inicialización (SIN INICIO DE VIDEO)
    React.useEffect(() => {
        
        const data = LOCAL_M3U_DATA; 
        
        setVideoCatalog(data);
        
        if (data.length > 0) {
            // Inicializar el foco en el primer canal. 
            setFocusedIndex(0);
            setFocusedFilteredIndex(0); 
            setSelectedCategory(null);
            setFocusedCategoryIndex(-1);
            // Mostrar el menú principal (TV/Pelis) al inicio
            setIsMainMenuVisible(true); 
            setIsMenuVisible(true);
        }
        
    }, []); 
    
    
    // Lógica de scroll para el menú de categorías
    const scrollCategoryList = React.useCallback((newCatIndex) => {
        const catList = categoryListRef.current;
        if (!catList) return;
        
        const element = document.getElementById(`cat-focus-${newCatIndex}`);
        if (element) {
            const listTop = catList.scrollTop;
            const listBottom = listTop + catList.clientHeight;
            const elemTop = element.offsetTop;
            const elemBottom = elemTop + element.clientHeight;
            
            if (elemBottom > listBottom) {
                catList.scrollTop = elemBottom - catList.clientHeight;
            } else if (elemTop < listTop) {
                catList.scrollTop = elemTop;
            }
        }
    }, []);
    // =========================================================
    // ⭐ FUNCIÓN CRUCIAL PARA LA INTEGRACIÓN NATIVA (AndroidBridge)
    // =========================================================
    React.useEffect(() => {
        
        const stopVideoAndConsumeBackButton = () => {
            const video = playerRef.current;
            
            // Si no hay reproductor de video montado, no hacemos nada y devolvemos 'false'
            if (!video) {
                return "false";
            }
            
            // 1. Detención agresiva del reproductor (Misma lógica del VideoPlayer cleanup)
            video.pause();
            video.muted = true; // Silenciar inmediatamente
            
            if (video.__hlsInstance) {
                 video.__hlsInstance.destroy();
                 delete video.__hlsInstance;
            }
            video.removeAttribute('src'); 
            video.load(); 

            // 2. Notificar a React que detuvimos la reproducción y abrimos el menú
            // Usamos un timeout por seguridad, aunque un 'setter' directo suele ser suficiente.
            setTimeout(() => {
                 // Abrir el menú principal después de detener la reproducción
                 openMainMenu(); 
            }, 50); 
            
            // 3. Devolver 'true' para que Kotlin sepa que el JS consumió la acción.
            return "true";
        };
        
        // Exponemos la función al ámbito global
        window.stopVideoAndConsumeBackButton = stopVideoAndConsumeBackButton;
        
        // Limpiamos la función al desmontar el componente (aunque en Android TV la App rara vez desmonta)
        return () => {
            delete window.stopVideoAndConsumeBackButton;
        };
    }, [playerRef, openMainMenu]); // Dependencias: playerRef y openMainMenu
    
    // ⭐ LÓGICA DE NAVEGACIÓN D-PAD
    const handleDpadNavigation = React.useCallback((event) => {
        
        const key = event.key;
        const isDpadKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(key);

        if (!isMenuVisible) {
            // Si el menú está oculto (viendo el video)
            if (key === 'ArrowLeft' || key === 'Enter' || key === ' ') {
                event.preventDefault();
                // Ahora abre el MainMenu en lugar del ChannelMenu directamente
                openMainMenu(); 
            }
            return;
        }

        if (isDpadKey) {
            event.preventDefault();
        } else {
            return;
        }

        const totalCategories = categories.length;
        const totalFilteredChannels = filteredChannels.length;

        if (isMainMenuVisible) {
            // 🆕 MENÚ PRINCIPAL (TV / PELIS / SALIR)
            const focusedElement = document.activeElement;
            const focusedId = focusedElement ? focusedElement.id : '';
            
            const mainOptions = ['main-menu-tv-select', 'main-menu-pelis-select', 'main-menu-exit'];
            let newIndex = mainOptions.findIndex(id => id === focusedId);
            if (newIndex === -1) newIndex = 0; // Enfocar TV por defecto
            
            if (key === 'ArrowUp') {
                newIndex = (newIndex === 0) ? mainOptions.length - 1 : newIndex - 1;
            } else if (key === 'ArrowDown') {
                newIndex = (newIndex === mainOptions.length - 1) ? 0 : newIndex + 1;
            } else if (key === 'ArrowLeft') {
                // Si el usuario presiona izquierda, cerramos todos los menús
                closeAllMenus();
                return;
            } else if (key === 'ArrowRight' || key === 'Enter' || key === ' ') {
                // Lógica de Selección
                if (focusedId === 'main-menu-tv-select') {
                    // Seleccionó TV -> Abrir submenú de categorías
                    openCategoryMenu(); 
                } else if (focusedId === 'main-menu-pelis-select') {
                    // Seleccionó Pelis -> Redirigir a pelis.html
                    window.location.href = 'index.html'; 
                    // No es necesario cerrar menus/poner isPlaying=true porque la página se recarga.
                } else if (focusedId === 'main-menu-exit') {
                    // Seleccionó Salir -> Función nativa
                    const volverALaTV = () => {
                        if (window.AndroidBridge && typeof window.AndroidBridge.exitApp === 'function') {
                            window.AndroidBridge.exitApp();
                        } else {
                            console.log("Saliendo de la aplicación y volviendo a la TV (Simulación)");
                            closeAllMenus();
                        }
                    };
                    volverALaTV();
                }
                return;
            }
            
            requestAnimationFrame(() => {
                document.getElementById(mainOptions[newIndex])?.focus();
            });
            return;

        } else if (isCategoryMenuVisible) {
            // MENÚ DE CATEGORÍAS (Izquierda del CanalMenu)
             let newCatIndex = focusedCategoryIndex;
             const totalOptions = totalCategories + 1; 

             if (key === 'ArrowUp' || key === 'ArrowDown') {
                 if (totalOptions === 0) return;

                 const currentIndexInList = focusedCategoryIndex === -1 ? 0 : focusedCategoryIndex + 1; 
                 let newIndexInList;

                 if (key === 'ArrowUp') {
                     newIndexInList = (currentIndexInList === 0) ? totalOptions - 1 : currentIndexInList - 1;
                 } else { 
                     newIndexInList = (currentIndexInList === totalOptions - 1) ? 0 : currentIndexInList + 1;
                 }

                 newCatIndex = newIndexInList === 0 ? -1 : newIndexInList - 1;

                 setFocusedCategoryIndex(newCatIndex);
                 requestAnimationFrame(() => {
                     const targetId = newCatIndex === -1 ? 'cat-focus--1' : `cat-focus-${newCatIndex}`;
                     document.getElementById(targetId)?.focus();
                     scrollCategoryList(newCatIndex); 
                 });

             } else if (key === 'ArrowRight' || key === 'Enter' || key === ' ') {
                 const categoryName = newCatIndex === -1 ? null : categories[newCatIndex];

                 setSelectedCategory(categoryName);
                 setIsCategoryMenuVisible(false); // Cierra CategoryMenu
                 setFocusedFilteredIndex(-1); 
                 requestAnimationFrame(() => focusChannelCard(0)); // Abre ChannelMenu

             } else if (key === 'ArrowLeft') {
                 // Izquierda en el CategoryMenu vuelve al MainMenu
                 openMainMenu(); 
             }

        } else {
            // MENÚ PRINCIPAL DE CANALES (ChannelsMenu)
            
            if (key === 'Enter' || key === ' ') {
                 const channelToPlay = filteredChannels[focusedFilteredIndex]; 
                 if (channelToPlay) {
                     handlePlayChannel(channelToPlay); 
                 } else {
                     focusChannelCard(0);
                 }
                 return;

            } else if (key === 'ArrowLeft') {
                 // Izquierda en ChannelMenu abre el CategoryMenu
                 if (totalCategories > 0) {
                     const currentSelectedCatIndex = selectedCategory === null ? -1 : categories.findIndex(c => c === selectedCategory);
                     setFocusedCategoryIndex(currentSelectedCatIndex);
                     openCategoryMenu(); 
                 } else {
                     // Si no hay categorías, volvemos al Main Menu (aunque es raro)
                     openMainMenu();
                 }
                 return;

            } else if (key === 'ArrowRight') {
                 closeAllMenus();
                 return;

            } else if (key === 'ArrowUp' || key === 'ArrowDown') {
                 if (totalFilteredChannels === 0) return;

                 let newFilteredIndex = focusedFilteredIndex;
                 if (newFilteredIndex === -1) newFilteredIndex = 0;

                 if (key === 'ArrowUp') {
                     newFilteredIndex = (newFilteredIndex === 0) ? totalFilteredChannels - 1 : newFilteredIndex - 1;
                 } else if (key === 'ArrowDown') {
                     newFilteredIndex = (newFilteredIndex === totalFilteredChannels - 1) ? 0 : newFilteredIndex + 1;
                 }

                 focusChannelCard(newFilteredIndex);
            }
        }
    }, [isMenuVisible, isCategoryMenuVisible, isMainMenuVisible, focusedFilteredIndex, filteredChannels, allChannels, focusChannelCard, handlePlayChannel, openMainMenu, openCategoryMenu, focusedCategoryIndex, categories, selectedCategory, scrollCategoryList, currentChannel, closeAllMenus]);


    // EFFECT PARA ESCUCHAR D-PAD
    React.useEffect(() => {
        window.addEventListener('keydown', handleDpadNavigation);
        return () => window.removeEventListener('keydown', handleDpadNavigation);
    }, [handleDpadNavigation]);


    // ----------------------------------------------------------------------
    // NUEVO COMPONENTE: MainMenu (TV/Pelis/Salir)
    // ----------------------------------------------------------------------
    const MainMenu = () => {
        const isVisible = isMenuVisible && isMainMenuVisible;
        
        return (
            <div 
                className={`absolute top-0 left-0 h-full bg-gray-900/95 text-white transition-all duration-300 z-40 w-56 p-4 flex flex-col justify-start space-y-4`}
                style={{
                    transform: isVisible
                        ? 'translateX(0)' 
                        : 'translateX(-100%)',
                }}
            >
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
                    Menú
                </h2>
                
                {/* 1. Opción TV (Abre el CategoryMenu) */}
                <button
                    id="main-menu-tv-select"
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 bg-gray-700 hover:bg-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    onClick={openCategoryMenu}
                    tabIndex={isVisible ? "0" : "-1"}
                >
                    <span role="img" aria-label="TV">📺</span> Canales de TV
                </button>

                {/* 2. Opción Películas (Redirecciona a pelis.html) */}
                <button
                    id="main-menu-pelis-select"
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 bg-blue-700 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    onClick={goToPelis}
                    tabIndex={isVisible ? "0" : "-1"}
                >
                    <span role="img" aria-label="Películas">🎬</span> Películas
                </button>
                
                {/* 3. Opción Salir (Llama a la función nativa) */}
                <button
                    id="main-menu-exit"
                    className={`w-full text-left p-3 rounded-md transition-colors duration-200 bg-red-700 hover:bg-red-600 focus:ring-2 focus:ring-blue-500 focus:outline-none`}
                    onClick={() => {
                        if (window.AndroidBridge && typeof window.AndroidBridge.exitApp === 'function') {
                            window.AndroidBridge.exitApp();
                        } else {
                            console.log("Saliendo de la aplicación y volviendo a la TV (Simulación)");
                            closeAllMenus();
                        }
                    }}
                    tabIndex={isVisible ? "0" : "-1"}
                >
                    <span role="img" aria-label="Salir">❌</span> Salir de la App
                </button>
            </div>
        );
    };
    
    // 🆕 Función auxiliar para goToPelis, usada en MainMenu y en el D-PAD
    const goToPelis = () => {
        window.location.href = 'pelis.html'; 
    };


    // Componente CategoryMenu (Renderizado interno)
    const CategoryMenu = () => {
        if (categories.length === 0) return null;

        const isCategoryListVisible = isMenuVisible && isCategoryMenuVisible && !isMainMenuVisible;
        const isFocusableCategory = isCategoryListVisible;
        
        const handleCategorySelect = (categoryName, index) => {
            setSelectedCategory(categoryName);
            setIsCategoryMenuVisible(false);
            setFocusedFilteredIndex(-1);
            setFocusedCategoryIndex(index); 
            requestAnimationFrame(() => focusChannelCard(0));
        };
        
        return (
            <div 
                ref={categoryListRef}
                className={`absolute top-0 left-0 h-full bg-gray-900/95 text-white transition-all duration-300 z-30 w-56 p-4 overflow-y-auto custom-scrollbar`}
                style={{
                     transform: isCategoryListVisible
                         ? 'translateX(56px)' // Mover a la derecha del MainMenu
                         : 'translateX(-100%)',
                }}
            >
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
                    Categorías
                </h2>
                
                <div className="space-y-1">
                    {/* Opción "Todos los Canales" */}
                    <button
                        id={`cat-focus--1`} 
                        className={`w-full text-left p-2 rounded-md transition-colors duration-200 
                                     ${selectedCategory === null ? 'bg-blue-600' : 'hover:bg-gray-700'}
                                     ${focusedCategoryIndex === -1 && isFocusableCategory ? 'focus:ring-2 focus:ring-blue-500 focus:outline-none' : ''}`}
                        onClick={() => handleCategorySelect(null, -1)}
                        tabIndex={isFocusableCategory ? "0" : "-1"}
                    >
                        Todos los Canales
                    </button>
                    
                    {/* Lista de Categorías */}
                    {categories.map((category, index) => (
                        <button
                            id={`cat-focus-${index}`}
                            key={category}
                            className={`w-full text-left p-2 rounded-md transition-colors duration-200 
                                         ${selectedCategory === category ? 'bg-blue-600' : 'hover:bg-gray-700'}
                                         ${focusedCategoryIndex === index && isFocusableCategory ? 'focus:ring-2 focus:ring-blue-500 focus:outline-none' : ''}`}
                            onClick={() => handleCategorySelect(category, index)}
                            tabIndex={isFocusableCategory ? "0" : "-1"}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
        );
    };


    // Componente ChannelsMenu (Renderizado interno)
    const ChannelsMenu = () => {
        
        const setCardRef = (index, element) => {
            if (element) {
                cardRefs.current.set(index, element);
            } else {
                cardRefs.current.delete(index);
            }
        };

        const currentCategoryTitle = selectedCategory || "Todos los Canales";
        
        // La visibilidad depende de que el menú base esté abierto y los submenús estén cerrados
        const isChannelsMenuVisible = isMenuVisible && !isCategoryMenuVisible && !isMainMenuVisible;
        const isFocusableChannel = isChannelsMenuVisible;
        
        const groupedFilteredChannels = groupChannelsByCategory(filteredChannels);
        const filteredCategories = Object.keys(groupedFilteredChannels);
        
        return (
            <div 
                className={`absolute top-0 left-0 h-full bg-gray-900/90 text-white transition-all duration-300 z-20 w-1/3 max-w-md flex flex-col`}
                style={{
                     transform: isChannelsMenuVisible
                         ? 'translateX(0)' // Mantenemos el ChannelsMenu en posición 0
                         : 'translateX(-100%)',
                }}
            >
                <div className={`p-8 h-full flex flex-col ${isChannelsMenuVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    
                    <h1 className="text-4xl font-bold mb-6 text-blue-400 flex-shrink-0">
                        {currentCategoryTitle}
                    </h1>
                    
                    {filteredChannels.length === 0 ? (
                        <div className="p-4 text-sm text-yellow-500 flex-grow">
                            No hay canales en esta categoría.
                        </div>
                    ) : (
                        <div 
                            id="channels-list-container"
                            className="space-y-4 overflow-y-auto flex-grow custom-scrollbar" 
                            tabIndex="-1"
                        > 
                            {filteredCategories.map((category) => (
                                <div key={category} className="category-group">
                                    {selectedCategory === null && (
                                        <h2 className={`text-xl font-semibold mb-2 pt-1 pb-1 sticky top-0 bg-gray-900/90 z-30 transition-colors`}>
                                            {category}
                                        </h2>
                                    )}
                                    <div className="space-y-1">
                                             {groupedFilteredChannels[category].map((video) => {
                                                     const globalIndex = allChannels.findIndex(c => c.url === video.url);

                                                     return (
                                                         <VideoCard 
                                                             ref={(el) => setCardRef(globalIndex, el)}
                                                             key={video.url}
                                                             video={video} 
                                                             onPlay={handlePlayChannel} 
                                                             index={globalIndex} 
                                                             isActive={globalIndex === focusedIndex} 
                                                             isFocusable={isFocusableChannel}
                                                         />
                                                     );
                                             })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                   <div className="text-sm text-gray-500 mt-4 flex-shrink-0">
                        Canales visibles: **{filteredChannels.length}**←
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">
            
            {/* 1. Video Player: Solo renderiza si hay un canal seleccionado */}
            {videoCatalog !== null && currentChannelUrl && (
                <VideoPlayer 
                    ref={playerRef} 
                    channel={currentChannel} 
                    isPlaying={isPlaying} 
                    onFinish={handleVideoEnd} 
                />
            )}
            
             {/* 2. Pantalla de carga */}
             {videoCatalog === null && (
                 <div className="flex items-center justify-center w-full h-full bg-gray-900 text-white z-30">
                     <h1 className="text-xl">Cargando catálogo localmente... ⏳</h1>
                 </div>
             )}
            
            {/* 3. Menús */}
            {videoCatalog !== null && (
                 <React.Fragment>
                     <MainMenu /> {/* 🆕 Nuevo MainMenu (z-40) */}
                     <CategoryMenu /> {/* CategoryMenu (z-30) */}
                     <ChannelsMenu /> {/* ChannelsMenu (z-20) */}
                 </React.Fragment>
             )}

             {/* 4. Overlay de video (aparece si el menú está oculto y no hay canal activo) */}
             {videoCatalog !== null && !isMenuVisible && !currentChannelUrl && (
                 <div className="absolute top-0 left-0 w-full h-full bg-gray-900/90 flex items-center justify-center text-white z-0">
                     <p className="text-xl">Selecciona un canal en el menú (←)</p>
                 </div>
             )}

             {/* 5. Botón para abrir menú (Ahora abre el MainMenu) */}
             {!isMenuVisible && (
                 <button
                      className="absolute top-4 left-4 p-2 bg-gray-900/70 rounded-lg text-white z-10 
                                         transition-all duration-200 
                                         hover:bg-gray-700/90 focus:bg-gray-700/90 focus:ring-2 focus:ring-blue-500"
                      onClick={openMainMenu} // 🆕 Ahora llama a openMainMenu
                      tabIndex="0" 
                      aria-label="Abrir lista de canales"
                 >
                      <p className="text-sm font-light">
                             ←
                      </p>
                 </button>
             )}
        </div>
    );
}


// ----------------------------------------------------------------------
// 5. RENDERIZADO DE LA APLICACIÓN
// ----------------------------------------------------------------------
const rootElement = document.getElementById('root');
if (rootElement) {
    // Si estás usando React 18+
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
} else {
    // Si estás usando una versión anterior de React
    // ReactDOM.render(<App />, document.getElementById('root'));
    console.error("No se encontró el elemento 'root'. Asegúrate de que tu HTML tiene <div id='root'></div>");
}



