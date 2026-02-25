// Asegúrate de que React, ReactDOM y Hls.js estén cargados en el scope global.
// Por ejemplo:
// <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
// <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
// <script src="https://cdn.jsdelivr.net/npm/hls.js@1.5.0/dist/hls.min.js"></script>


// ----------------------------------------------------------------------
// 0. CONFIGURACIÓN Y DATOS LOCALES
// ----------------------------------------------------------------------

const LOCAL_M3U_DATA = [
     {
        title: "Prueba TV",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logotipo_de_America_TV.svg/1933px-Logotipo_de_America_TV.svg.png",
        category: "Argentina",
        url: "http://live.btv.mx:2424/stream/278774/smAVz_uhytj5REM-4pYNZbkrcB2",
        
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36" 
    },
       
    {
        title: "América TV",
        logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logotipo_de_America_TV.svg/1933px-Logotipo_de_America_TV.svg.png",
        category: "Argentina",
        url: "https://prepublish.f.qaotic.net/a07/americahls-100056/playlist_720p.m3u8"
    },
    {
        title: "Cronica Tv",
        logoUrl: "https://argentina.mom-gmr.org/uploads/_processed_/8/6/csm_16062-1639_import_3467384d27.png",//ttps://upload.wikimedia.org/wikipedia/commons/3/3a/Canal_9_2015.png",
        category: "Argentina",
        url: "https://proxyhls.myappstore-free-nf.workers.dev/elnueve",
        workerId: 'cronica',
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
        title: "Telefe Satelital",
        logoUrl: "https://images.seeklogo.com/logo-png/45/1/telefe-tv-logo-png_seeklogo-451860.png",
        category: "Argentina",
        // URL DASH (.mpd) que extrajimos
        url: "http://104.238.205.28:9090/278773_.m3u8",
       // referrer: "https://player.sensa.com.ar/&webtoken=1.0",
        // Objeto DRM para que Shaka Player lo reconozca
     //   drm: {
        //    clearkey: {
         //       "9bb54fccffaddd38916e85c08de98cc9": "d06f509c418eb6f1b2fc2b766445328b"
          //  }
       // }
    },
{
    title: "HBO HD",
    logoUrl: "https://github.com/masterentertainment/listas/blob/main/logos/HBOLA.png?raw=true",
    category: "HBO Pack",
    // Quitamos los caracteres extra después del .mpd para evitar errores de sintaxis
    url: "https://cdn.sensa.com.ar/live/eds/HBO/live_dash_cld/HBO.mpd?webtoken=1.0",
    referrer: "https://player.sensa.com.ar/",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    drm: {
        clearKeys: {
            "dead023f7a81634339ae639990c1517a": "ba970222b4466c61d0deccc67ab34452"
        }
    }
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
        url: "https://lemu.telecom.com.ar/eb5d51d53b38f1ae891163cf5fe76856/",
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
        title: "Cine Accion",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/cine/plutocineaccion.png",
        category: "Movies", // No se proporcionó la categoría en la fuente original.
        url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5dcb62e63d4d8f0009f36881/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&channel_id=channel&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&genre=ROKU_ADS_CONTENT_GENRE&is_lat=1&platform=web&rdid=channel&studio_id=viacom&tags=ROKU_CONTENT_TAGS"
    },
    {
        title: "Cine Comedia",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/cine/plutocinecomedia.png",
        category: "Movies",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5dcdde78f080d900098550e4/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Cine Drama",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/cine/plutocinedrama.png",
        category: "Movies",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5dcddfcb229eff00091b6bdf/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Cine Series",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/cine/plutoseries.png",
        category: "",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5dcde1317578340009b751d0/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Cine Terror",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/cine/plutocineterror.png",
        category: "Movies",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5dcddf1ed95e740009fef7ab/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Cine Clásico",
        logoUrl: "https://github.com/luisoddone/virus/blob/main/PTVC_F.png?raw=true",
        category: "Movies",
        url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/61373bb45168fe000773eecd/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&is_lat=1&platform=web&rdid=channel&tags=ROKU_CONTENT_TAGS"
    },
    {
        title: "Baby First",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/infantil/babyfirst.png",
        category: "infantil",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5ebac49ce4dc8b00078b23bc/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Baby Shark",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/infantil/babyshark.png",
        category: "infantil",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/619d5e6a093e7c0007489211/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Barney",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/infantil/barney.png",
        category: "infantil",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5f29ada4bdaebd000708d49d/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Bob Esponja",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/infantil/BOBSPONJA.png",
        category: "infantil",
        url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/6254598f5083f800076d8563/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&channel_id=channel&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&genre=ROKU_ADS_CONTENT_GENRE&is_lat=1&platform=web&rdid=channel&studio_id=viacom&tags=ROKU_CONTENT_TAGS"
    },

    {
        title: "Naruto",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef1df7889d3.64625793.png",
        category: "Anime",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5ee92e72fb286e0007285fec/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Yu Gi Oh",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/animacion/yugiho.png",
        category: "Anime",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5fceaab478f2af00080ff51f/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Tokusato",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef202af99e3.91256899.png",
        category: "Anime",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5ff608e60e2996000768c366/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "South Park",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef210cea4e0.80534942.png",
        category: "",
        url: "http://service-stitcher.clusters.pluto.tv/stitch/hls/channel/609ae5cd48d3200007b0a98e/master.m3u8?advertisingId=&appName=web&appVersion=unknown&appStoreUrl=&architecture=&buildVersion=&clientTime=0&deviceDNT=0&deviceId=bb430b50-dea7-11eb-be60-3b6a118ac8ac&deviceMake=Chrome&deviceModel=web&deviceType=web&deviceVersion=unknown&includeExtendedEvents=false&sid=463c119a-456a-46c9-a878-3ce9897b7179&userId=&serverSideAds=true"
    },
    {
        title: "Anime",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef2222dbe05.53860253.png",
        category: "Anime",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5dcde17bf6591d0009839e02/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Dead Note",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef23d640966.00590499.png",
        category: "Anime",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/626c2ed933a2890007e91422/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "One Piece",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef24f1f9b53.43877600.png",
        category: "Anime",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5ff4b9ccf938f8000779eb99/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Toons Clásico",
        logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBFZBjqP7jruvU05CdWsCnCRwZxtUmyg-EQQ&s",
        category: "infantil",
        url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/609e7e423e9173000706a681/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&channel_id=channel&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&genre=ROKU_ADS_CONTENT_GENRE&is_lat=1&platform=web&rdid=channel&studio_id=viacom&tags=ROKU_CONTENT_TAGS"
    },
    {
        title: "The Walking Dead",
        logoUrl: "https://pbs.twimg.com/media/EW7kzZtXYAYyy9m.jpg:large",
        category: "Series",
        url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5e82bb378601b80007b4bd78/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&channel_id=channel&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&genre=ROKU_ADS_CONTENT_GENRE&is_lat=1&platform=web&rdid=channel&studio_id=viacom&tags=ROKU_CONTENT_TAGS"
    },
    {
        title: "E-Sports",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef265e54b45.71265787.png",
        category: "Deportes",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5ff3934600d4c7000733ff49/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Comedy Central",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef2722e45a4.61454870.png",
        category: "Argentina",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5ffcc21a432945000762d06b/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Ridiculousness",
        logoUrl: "https://raw.githubusercontent.com/CINECITY2023/cinecity/refs/heads/cinecity.net/logos/comedia/Ridiculousness.png",
        category: "Argentina",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5e98a911c881310007d7aae2/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Humor",
        logoUrl: "https://vimetrix.lat/femonpanel/superadmin/paneltv/banners/68fef283aa57d0.66776865.png",
        category: "Argentina",
        url: "http://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5e8397936791b30007ebb5a7/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BTARGETOPT%7D&deviceId=%7BPSID%7D&advertisingId=%7BPSID%7D&us_privacy=1YNY&samsung_app_domain=%7BAPP_DOMAIN%7D&samsung_app_name=%7BAPP_NAME%7D&profileLimit=&profileFloor=&embedPartner=samsung-tvplus"
    },
    {
        title: "Comedia (Hecho en España)",
        logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTovkr8Wn_hthOdEcoy848ZLDDL5jzvOr-BZQ&s",
        category: "España",
        url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1abce155a03d0007718834/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&is_lat=1&platform=web&rdid=channel&tags=ROKU_CONTENT_TAGS"
    },
    {
        title: "Archivos Forense",
        logoUrl: "https://i.postimg.cc/PrHHZ2cZ/images-11.jpg",
        category: "Variedad",
        url: "https://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5efb8c19b2678b000780d032/master.m3u8?deviceType=unknown&deviceMake=unknown&deviceModel=unknown&deviceVersion=unknown&appVersion=unknown&deviceLat=90&deviceLon=0&deviceDNT=TARGETOPT&deviceId=PSID&advertisingId=PSID&us_privacy=1YNY&profileLimit=&profileFloor=&embedPartner="
        // Otros campos como 'type' y 'drm_license_uri' se han omitido para ajustarse a tu formato base.
    },
    {
        title: "Cazador de Homicidas",
        logoUrl: "https://i.postimg.cc/nhTmrF2j/thumbnail.jpg",
        category: "Variedad",
        url: "https://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/6109a9f5531b840007a4a187/master.m3u8?deviceType=unknown&deviceMake=unknown&deviceModel=unknown&deviceVersion=unknown&appVersion=unknown&deviceLat=90&deviceLon=0&deviceDNT=TARGETOPT&deviceId=PSID&advertisingId=PSID&us_privacy=1YNY&profileLimit=&profileFloor=&embedPartner="
    },
    {
        title: "Cazador de Recompensas",
        logoUrl: "https://i.postimg.cc/yNnKW7Yd/thumbnail-1.jpg",
        category: "Variedad",
        url: "https://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5f9992c685a2a80007fa414a/master.m3u8?deviceType=unknown&deviceMake=unknown&deviceModel=unknown&deviceVersion=unknown&appVersion=unknown&deviceLat=90&deviceLon=0&deviceDNT=TARGETOPT&deviceId=PSID&advertisingId=PSID&us_privacy=1YNY&profileLimit=&profileFloor=&embedPartner="
    },
    {
        title: "Empeño a lo Bestia",
        logoUrl: "https://i.postimg.cc/fLQfJS57/tile.jpg",
        category: "Variedad",
        url: "https://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/5f23102d5e239d00074b092a/master.m3u8?deviceType=unknown&deviceMake=unknown&deviceModel=unknown&deviceVersion=unknown&appVersion=unknown&deviceLat=90&deviceLon=0&deviceDNT=TARGETOPT&deviceId=PSID&advertisingId=PSID&us_privacy=1YNY&profileLimit=&profileFloor=&embedPartner="
    },
    {
        title: "Mtv Original",
        logoUrl: "https://images.pluto.tv/channels/5ca672f515a62078d2ec0ad2/featuredImage.jpg?auto=&q=70&fit=fill&fill=blur&ixlib=react-9.1.5",
        category: "Argentina",
        url: "https://service-stitcher.clusters.pluto.tv/stitch/hls/channel/5f1aadf373bed3000794d1d7/master.m3u8?advertisingId=&appName=web&appStoreUrl=&appVersion=DNT&app_name=&architecture=&buildVersion=&deviceDNT=0&deviceId=5f1aadf373bed3000794d1d7&deviceLat=41.1167&deviceLon=1.2500&deviceMake=web&deviceModel=web&deviceType=web&deviceVersion=DNT&includeExtendedEvents=false&marketingRegion=ES&serverSideAds=false&sid=300&terminate=false&userId="
    },
    {
        title: "TV Telenovelas",
        logoUrl: "https://i.blogs.es/d5bb53/startrtelenovelasek/450_1000.webp",
        category: "Series",
        url: "https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/60b4c06717da110007ee1af6/master.m3u8?advertisingId=channel&appName=rokuchannel&appVersion=1.0&bmodel=bm1&channel_id=channel&content=channel&content_rating=ROKU_ADS_CONTENT_RATING&content_type=livefeed&coppa=false&deviceDNT=1&deviceId=channel&deviceMake=rokuChannel&deviceModel=web&deviceType=rokuChannel&deviceVersion=1.0&embedPartner=rokuChannel&genre=ROKU_ADS_CONTENT_GENRE&is_lat=1&platform=web&rdid=channel&serverSideAds=false&studio_id=viacom&tags=ROKU_CONTENT_TAGS"
    },
   
    {
        title: "El Trece 2",
        logoUrl: "https://images.seeklogo.com/logo-png/2/1/canal-trece-argentina-logo-png_seeklogo-25582.png",
        category: "Argentina",
        url: "https://live-01-02-eltrece.vodgc.net/eltrecetv_noti/tracks-v3a1/mono.m3u8",
        referrer:"https://www.eltrecetv.com.ar/",
        origin: "https://www.eltrecetv.com.ar",
    },
   
    {
        title: "TV",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://stream.ads.ottera.tv/playlist.m3u8?network_id=4647"
        // Otros campos como 'type' y 'drm_license_uri' se han omitido para ajustarse a tu formato base.
    },
    {
        title: "Peliculas",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://run-rt-mx.otteravision.com/run/rt_mx/rt_mx_720p_high.m3u8"
    },
    {
        title: "Accion",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://run-rt-ac.otteravision.com/run/rt_ac/rt_ac_720.m3u8"
    },
    {
        title: "Comedia",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://run-rc-la.otteravision.com/run/rc_la/rc_la_720.m3u8"
    },
    {
        title: "Crimen",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://run-rucrl.otteravision.com/run/rucrl/rucrl_720.m3u8"
    },
    {
        title: "Terror",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://run-ruthr.otteravision.com/run/ruthr/ruthr_720.m3u8"
    },
    {
        title: "Romance",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://run-rurol.otteravision.com/run/rurol/rurol_720.m3u8"
    },
    {
        title: "Familia",
        logoUrl: "https://images.pluto.tv/channels/6086d3f420fc8500075f8dbf/colorLogoPNG.png",
        category: "Movies",
        url: "https://run-runfl.otteravision.com/run/runfl/runfl_720.m3u8"
    },
    {
    "title": "Peliculas Top",
    "url": "https://top-movies-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-5983/master.m3u8",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/645e383c-88f5-4378-88fd-0d4989c01cde.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Acción",
    "url": "https://action-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6069/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=action-rakuten-tv_es&ads.rtv_content_id=6069&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=dd0b8975-2e9a-4573-8ae3-48f7c8c45b46&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6069&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/cc0a135a-3a25-4b7a-84b3-d29d5ee6e4d8.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Comedia",
    "url": "https://comedy-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6180/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=comedy-rakuten-tv_es&ads.rtv_content_id=6180&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=995f8794-d611-42e8-988a-8e8cfe8eb04c&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6180&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/68048254-04b5-4438-bb14-118427a0ba3a.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Drama",
    "url": "https://drama-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6092/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=drama-rakuten-tv_es&ads.rtv_content_id=6092&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=8d302a07-b649-456f-9824-e9472065d247&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6092&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/400caa96-4298-41ae-92a4-8a2406fc81c8.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Románticas",
    "url": "https://romance-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6105/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=romance-rakuten-tv_es&ads.rtv_content_id=6105&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=4505a23d-c4c9-4022-a851-751f20890a26&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6105&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/ec9d1d83-74cc-443d-b2ec-b51b970fe831.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Cine Español",
    "url": "https://spanish-cinema-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6196/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=spanish-cinema-rakuten-tv_es&ads.rtv_content_id=6196&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=5173aa9f-6f63-4a9e-93f5-b67d1b838d66&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6196&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/294f65bc-fa27-494d-9cb5-423260b7e875.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Sci-Fi",
    "url": "https://sci-fi-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6740/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=sci-fi-rakuten-tv_es&ads.rtv_content_id=6740&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=1a68c7d0-9545-4784-b7d0-d7cf498ebc86&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6740&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/a0e491eb-8f73-4bd9-a034-0fe9fd6984d7.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Thrillers",
    "url": "https://thriller-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6480/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=18&ads.rtv_channel_name=thriller-rakuten-tv_es&ads.rtv_content_id=6480&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=ca0ef982-de5b-44c4-b5ce-a2da800491ca&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6480&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/6e6e627e-d9ef-46da-8f3a-eea4949f632e.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Trailers",
    "url": "https://1c4952408fa947df9b6aee4225ff9fd3.mediatailor.eu-west-1.amazonaws.com/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-4452/master.m3u8?ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rakutentv_channel=4452&ads.rating=16&ads.rtv_content_id=4452&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=d6379beb-40a8-4b46-bad9-ec401b2b150c&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=4452",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/bd19f8e4-0477-4129-96f7-89b5817f7957.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Cine Friki",
    "url": "https://zylo-cinefriki-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-zylo-cinefriki-rakuten/CDN/master.m3u8?ads_amagi_channel=851&ads_amznbrmid=&ads_amznregion=&ads_amznslots=&ads_app_bundle=com.rakuten.tv&ads_app_store_url=rakuten.tv&ads_app_version=&ads_brand_name=&ads_content_categories=IAB1&ads_content_genre=movies%2Cmystery&ads_content_livestream=0&ads_device_lmt=1&ads_device_make=&ads_device_model=&ads_device_type=web&ads_device_year=&ads_env=prod&ads_gam_correlator=&ads_gdpr_consent=&ads_ifa_type=ppid&ads_inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads_player_width=&ads_pod_type=playerpage_midroll&ads_ppid=&ads_prodq=1&ads.rating=12&ads_rtv_content_id=5016&ads_rtv_content_language=spa&ads.rtvid=271859&ads_streaming_id=014dda33-83f1-476a-9112-c590f1d82b51&ads_tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/2c7d3efb-0e8c-49b8-a130-05f95b4c53ba.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Dark Matter - Horror Visión",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=sci-fi%2Cmystery%2Chorror&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=DarkMatterTV&ads.content_livestream=0&ads.csid=zeus_es_tricoastdarkmatteres_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=4070&ads.rakuten_streaming_id=de4c0d84-f06f-4d5b-b64c-e4ced30eafa3&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883019&ads.xumo_contentId=3479&ads.xumo_contentName=TriCoastDarkMatterES&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=3479&ads.xumo_providerName=dark-matter-spa-rakutentv&ads.xumo_streamId=88883019",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/24715bce-c332-47de-b4bd-746e70068660.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Crimen",
    "url": "https://crime-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6220/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=crime-rakuten-tv_es&ads.rtv_content_id=6220&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=a03d0fe8-fab8-4054-9577-3de853011f18&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6220&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/726cbff5-c46e-48ec-b025-8ac30e53f370.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "FilmRise Sci-Fi",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=sci-fi&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=FilmRiseSciFiSpanish&ads.content_livestream=0&ads.csid=zeus_es_filmrisescifispanish_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=3689&ads.rakuten_streaming_id=20721652-d423-49ec-b394-a93e24524080&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883026&ads.xumo_contentId=2701&ads.xumo_contentName=FilmRiseSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2701&ads.xumo_providerName=filmrise-sci-fi-spa-rakutentv&ads.xumo_streamId=88883026",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/daba160d-25f2-4f06-9572-fc2a71dcf277-filmrise-sci-fi-1631546650.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "BBC Drama",
    "url": "https://amg00793-amg00793c40-rakuten-es-5444.playouts.now.amagi.tv/playlist/amg00793-bbcstudios-bbcdramaspain-rakutenes/playlist.m3u8?ads_amagi_channel=959&ads_amznbrmid=&ads_amznregion=&ads_amznslots=&ads_app_bundle=com.rakuten.tv&ads_app_store_url=rakuten.tv&ads_app_version=&ads_brand_name=&ads_content_categories=IAB1&ads_content_genre=drama%2Ccrime%2Chistory%2Cseries&ads_content_livestream=0&ads_device_lmt=1&ads_device_make=&ads_device_model=&ads_device_type=web&ads_device_year=&ads_env=prod&ads_gam_correlator=&ads_gdpr_consent=&ads_ifa_type=ppid&ads_inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=13&ads.rtv_content_id=3877&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=a8f0676c-3816-4218-bd95-56e7c735b537&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/b7955dd9-07e0-48b2-baf8-bbbee37cd2eb-bbc-drama-1639673931.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Beyblade",
    "url": "https://amg01796-amg01796c8-rakuten-es-5333.playouts.now.amagi.tv/playlist/amg01796-fastmediafast-beybladees-rakutenes/playlist.m3u8?ads_amagi_channel=953&ads_amznbrmid=&ads_amznregion=&ads_amznslots=&ads_app_bundle=com.rakuten.tv&ads_app_store_url=rakuten.tv&ads_app_version=&ads_brand_name=&ads_content_categories=IAB1&ads_content_genre=action%2Cseries%2Canimation&ads_content_livestream=0&ads_device_lmt=1&ads_device_make=&ads_device_model=&ads_device_type=web&ads_device_year=&ads_env=prod&ads_gam_correlator=&ads_gdpr_consent=&ads_ifa_type=ppid&ads_inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=0&ads.rtv_content_id=6421&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=d6489937-cb51-441f-91e0-9a4f7f463c35&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/dac38e6b-007a-4c8f-88e2-198b4cef2035.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "VIKI",
    "url": "https://c2332ac2eff14da0934ccff4817df4a8.mediatailor.us-east-1.amazonaws.com/v1/master/0fb304b2320b25f067414d481a779b77db81760d/RakutenTV-es_RakutenViki/playlist.m3u8?ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_categories=IAB1&ads.content_genre=series%2Cmovies%2Cdrama%2Cromance&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=0&ads.rtv_content_id=4398&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=469164eb-3f86-4383-ae30-a439b421abc1&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&ads.wurl_channel=1065",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/81260d9f-23aa-4dd7-86c1-a898cab5379f.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Vive Kanal D Drama",
    "url": "https://thema-vivekanald-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-thema-vivekanald-rakuten/CDN/master.m3u8?ads_amagi_channel=829&ads_amznbrmid=&ads_amznregion=&ads_amznslots=&ads_app_bundle=com.rakuten.tv&ads_app_store_url=rakuten.tv&ads_app_version=&ads_brand_name=&ads_content_categories=IAB1&ads_content_genre=soap-opera&ads_content_livestream=0&ads_device_lmt=1&ads_device_make=&ads_device_model=&ads_device_type=web&ads_device_year=&ads_env=prod&ads_gam_correlator=&ads_gdpr_consent=&ads_ifa_type=ppid&ads_inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads_ppid=&ads_prodq=1&ads.rating=12&ads_rtv_content_id=4486&ads_rtv_content_language=spa&ads_rtvid=271859&ads_streaming_id=79d1edb0-734e-4bfe-8ae3-74c87da9433f&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/bf0c7e3e-b46f-4f81-8d31-f096fba8d761.png",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Top Gear en español",
    "url": "https://amg00793-amg00793c50-rakuten-es-8130.playouts.now.amagi.tv/playlist/amg00793-bbcstudios-topgearspain-rakutenes/playlist.m3u8?ads_amagi_channel=1016&ads_amznbrmid=&ads_amznregion=&ads_amznslots=&ads_app_bundle=com.rakuten.tv&ads_app_store_url=rakuten.tv&ads_app_version=&ads_brand_name=&ads.content_categories=IAB17&ads.content_genre=entertainment%2Csports&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_content_id=4081&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=03b7d0f2-3081-4eda-a5c1-92af37028042&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/36527b18-2a5c-4977-8c04-60dd6e57db24-top-gear-en-espanol-1651835741.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Platos Sucios",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?=&ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=sitcom%2Ccomedy&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=PlatosSucios&ads.content_livestream=0&ads.csid=zeus_es_platossucious_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=6827&ads.rakuten_streaming_id=24c337e7-8f16-4262-92db-61bf3baed4d1&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883120&ads.xumo_contentId=2054&ads.xumo_contentName=IndigeniusSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2054&ads.xumo_providerName=platos-sucios-spa-rakutentv&ads.xumo_streamId=88883120",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/b5432e55-ba85-4c9a-bb4b-3ab9164df9a3.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Vaya semanita",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=comedy&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=IndigeniusSpanish&ads.content_livestream=0&ads.csid=zeus_es_vayasemanita_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=6978&ads.rakuten_streaming_id=3ae7c21b-380a-451f-bb0f-d3972dacb6db&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883129&ads.xumo_contentId=1103&ads.xumo_contentName=Indigenius&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=1103&ads.xumo_providerName=vaya-semanita-spa-rakutentv&ads.xumo_streamId=88883129",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/3fbef4db-f211-4cc3-90d2-084976a485bf.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "Merlí",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=soap-opera%2Cdrama%2Cromance&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=IndigeniusSpanish&ads.content_livestream=0&ads.csid=zeus_es_merli_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=6828&ads.rakuten_streaming_id=67a2fda7-78a7-444e-a35c-ad65773432dc&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883119&ads.xumo_contentId=2054&ads.xumo_contentName=IndigeniusSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2054&ads.xumo_providerName=merli-spa-rakutentv&ads.xumo_streamId=88883119",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/ea5a2b5e-dae7-46fe-80b3-31928901ea97.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "wedotv Amor",
    "url": "https://amg00735-amg00735c15-rakuten-es-8598.playouts.now.amagi.tv/playlist/amg00735-videosolutionsagfast-wedoamor-rakutenes/playlist.m3u8?ads_amagi_channel=1051&ads_amznbrmid=&ads_amznregion=&ads_amznslots=&ads_app_bundle=com.rakuten.tv&ads_app_store_url=rakuten.tv&ads_app_version=&ads_brand_name=&ads.content_categories=IAB1&ads.content_genre=romance%2Csoap-opera&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=12&ads.rtv_content_id=7049&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=77857760-c72a-4232-91ea-f5e8c435b5da&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/f2eabb04-9a91-4acb-97ff-8eab64c09446.jpeg",
    "category": "Cine y Series FAST"
  },
  {
    "title": "En Familia",
    "url": "https://family-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6205/master.m3u8?ads.Rakuten+TV+EU_channel=&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_name=RakutenTV&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_livestream=0&ads.content_url=rakutentv&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_year=&ads.did=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.google_ad_manager_nonce=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.platform=web&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=16&ads.rtv_channel_name=family-rakuten-tv_es&ads.rtv_content_id=6205&ads.rtv_content_language=spa&ads.rtv_language=spa&ads.rtvid=271859&ads.streaming_id=e7fc2a9a-fdd1-402c-bc2d-1d3764efd987&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&channel_id=6205&publishing_platform_id=5",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/55bcbbe9-d8ec-45de-849e-775854edea1e.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Mr. Bean",
    "url": "https://amg00627-amg00627c30-rakuten-es-3990.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanescc-rakutenes/playlist.m3u8?ads_amagi_channel=934&ads_amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_categories=IAB1&ads.content_genre=comedy%2Cchildren%2Canimation&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=0&ads.rtv_content_id=6165&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=d97072b8-f484-4451-9f8c-66d39f34e940&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/7ff74f0d-63d9-44f5-99e3-d11bdbf81197.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Mr. Bean - Live Action",
    "url": "https://amg00627-amg00627c40-rakuten-uk-5725.playouts.now.amagi.tv/playlist/amg00627-banijayfast-mrbeanpopupcc-rakutenuk/playlist.m3u8?ads_amagi_channel=975&ads_amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_categories=IAB1&ads.content_genre=comedy&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=0&ads.rtv_content_id=6617&ads.rtv_content_language=eng&ads.rtvid=271859&ads.streaming_id=fda60832-de8f-4deb-9658-aed3cde8804e&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/494bf8eb-ab6c-40ba-884a-3625c9181e1d.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Naturaleza",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=outdoors&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=IndigeniusNaturalezaSpanish&ads.content_livestream=0&ads.csid=zeus_es_indigeniusnaturalezaspanish_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=3688&ads.rakuten_streaming_id=b5bb6bca-5eab-44c7-8921-62d597722c8c&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883049&ads.xumo_contentId=2161&ads.xumo_contentName=IndigeniusNaturalezaSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2161&ads.xumo_providerName=naturaleza-spa-rakutentv&ads.xumo_streamId=88883049",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/7f26f4ea-f964-4d23-a365-dbbd55108e26.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Nature Time",
    "url": "https://amg00090-amgnaturetimeemea-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-bamus-naturetimeemeaspa/CDN/master.m3u8?ads_amagi_channel=809&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_categories=IAB1&ads.content_genre=outdoors%2Canimals&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=0&ads.rtv_content_id=4330&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=b45f9610-31b7-4190-9144-53570466bbe5&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/140fe96a-bda7-4ea2-b1ba-798224c28f46.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Historia y Vida",
    "url": "https://amg01821-amg01821c22-rakuten-gb-8651.playouts.now.amagi.tv/playlist/amg01821-lovetvfast-historiayvidacc-rakutengb/playlist.m3u8?ads_amagi_channel=1030&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_categories=IAB1&ads.content_genre=documentary%2Chistory&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=0&ads.rtv_content_id=6986&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=3f52cb67-5003-4428-bf58-6c91c3d7fd60&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/112ebdc0-159a-422f-9659-e9e6aa967df7.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Pilotos del Ártico",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=entertainment%2Coutdoors&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=IcePilotsSpanish&ads.content_livestream=0&ads.csid=zeus_es_indigeniusicepilots_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=5914&ads.rakuten_streaming_id=646658e3-4f7b-40ef-b05c-592d3c2f304b&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883090&ads.xumo_contentId=2504&ads.xumo_contentName=IndigeniusSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2504&ads.xumo_providerName=ice-pilots-spa-rakutentv&ads.xumo_streamId=88883090",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/47db66d1-8f73-451e-9244-34ce4b1c423c.jpeg",
    "category": "Variedad"
  },
  {
    "title": "La fiebre del jade",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=entertainment&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=JadeFeverSpanish&ads.content_livestream=0&ads.csid=zeus_es_indigeniuslefiebredeljade_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=5915&ads.rakuten_streaming_id=6d7744a6-d22f-4e3b-a1f2-85d2cf92fd2a&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883088&ads.xumo_contentId=2504&ads.xumo_contentName=IndigeniusSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2504&ads.xumo_providerName=jade-fever-spa-rakutentv&ads.xumo_streamId=88883088",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/4223433c-d101-452c-aced-2453b33d3126.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Cops En Español",
    "url": "https://69fc67603f914d73988ff4dc54a202c8.mediatailor.us-east-1.amazonaws.com/v1/master/44f73ba4d03e9607dcd9bebdcb8494d86964f1d8/RakutenTV-es_CopsEnEspanol/playlist.m3u8?ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.app_bundle=com.rakuten.tv&ads.app_store_url=rakuten.tv&ads.app_version=&ads.brand_name=&ads.content_categories=IAB1&ads.content_genre=action%2Ccrime%2Creality&ads.content_livestream=0&ads.device_lmt=1&ads.device_make=&ads.device_model=&ads.device_type=web&ads.device_year=&ads.env=prod&ads.gam_correlator=&ads.gdpr_consent=&ads.ifa_type=ppid&ads.inv_partner_domain=rakuten.tv&ads.market=es&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.player_height=&ads.player_width=&ads.pod_type=playerpage_midroll&ads.ppid=&ads.prodq=1&ads.rating=12&ads.rtv_content_id=6696&ads.rtv_content_language=spa&ads.rtvid=271859&ads.streaming_id=02f26af1-55a7-4178-a601-ec3e95433727&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.user_type=visitor&ads.wurl_channel=1470",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/ba80c0fa-a357-4a50-927b-12e34ad75737.jpeg",
    "category": "Variedad"
  },
  {
    "title": "El Conquistador",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=reality%2Coutdoors&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=IndigeniusSpanish&ads.content_livestream=0&ads.csid=zeus_es_elconsquistado_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=6975&ads.rakuten_streaming_id=f7f34570-5dac-45a8-9029-efe3820d792d&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883130&ads.xumo_contentId=2054&ads.xumo_contentName=IndigeniusSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2054&ads.xumo_providerName=el-conquistador-spa-rakutentv&ads.xumo_streamId=88883130",
    "type": "HLS",
    "logoUrl": "https://images-2.rakuten.tv/storage/global-live-channel/translation/artwork/3779a116-fc8f-4720-8656-1a8eef566691.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Estilo y Vida*",
    "url": "https://lifestyle-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6232/master.m3u8",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/84e0b7b3-1612-470a-afdc-67a8c5b0fbbe.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Los Gipsy Kings",
    "url": "https://gipsy-kings-rakuten-tv-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6752/master.m3u8",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/5cc63b2b-870e-46fd-889b-ae81f798c9d7.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Fashion TV",
    "url": "https://amg01546-amg01546c1-rakuten-gb-9592.playouts.now.amagi.tv/ts-eu-w1-n2/playlist/amg01546-fashiontv-fashiontv-rakutengb/playlist.m3u8",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/7995fcb8-ac5f-494c-8384-53e8f0a19cf6-fashion-tv-1602688597.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Travelxp",
    "url": "https://854164eda2f94a29ba557d887890363c.mediatailor.us-east-1.amazonaws.com/v1/master/04fd913bb278d8775298c26fdca9d9841f37601f/RakutenTV-eu_TravelXPES/playlist.m3u8",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/d439f753-ad31-4078-b63d-8109bfb0bf7d.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Ideas en 5 minutos",
    "url": "https://soul-5mincraftspa-rakuten.amagi.tv/hls/amagi_hls_data_rakutenAA-soul-5mincraftspanish-rakuten/CDN/master.m3u8",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/b5fc34b2-b51a-4418-a52d-bd479fd3d6e1.jpeg",
    "category": "Variedad"
  },
  {
    "title": "¡HOLA! Play",
    "url": "https://hola-play-2108fd06-86d4-44e8-9867-c35b4895a1c1-es.fast.rakuten.tv/v1/master/0547f18649bd788bec7b67b746e47670f558b6b2/production-LiveChannel-6433/master.m3u8",
    "type": "HLS",
    "logoUrl": "https://images-0.rakuten.tv/storage/global-live-channel/translation/artwork/b7fa7e1a-c47f-4d90-98e7-7c64c77dbbdb.png",
    "category": "Variedad"
  },
  {
    "title": "Archivos Forenses",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=series%2Ccrime&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=ArchivosForenses&ads.content_livestream=0&ads.csid=zeus_es_archivosforenses_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=3901&ads.rakuten_streaming_id=c14b5b9e-4b49-4bfe-8f6b-0ee24c4a8c92&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883012&ads.xumo_contentId=2648&ads.xumo_contentName=FilmRiseTrueCrimeMexico&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2648&ads.xumo_providerName=forensic-files-spa-rakutentv&ads.xumo_streamId=88883012",
    "type": "HLS",
    "logoUrl": "https://images-1.rakuten.tv/storage/global-live-channel/translation/artwork/33d033a2-326e-4f5b-b3dc-e8c8bf65e562-archivos-forenses-1642607532.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Todo Crimen",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=crime&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=IndigeniusCrimenSpanish&ads.content_livestream=0&ads.csid=zeus_es_indigeniuscrimenspanish_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=3687&ads.rakuten_streaming_id=f3a181db-089d-423e-8f0b-3f1be8f6b9de&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883018&ads.xumo_contentId=2192&ads.xumo_contentName=IndigeniusCrimenSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2192&ads.xumo_providerName=todo-crimen-spa-rakutentv&ads.xumo_streamId=88883018",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/c88bbe13-dfde-41ec-9631-b172537c8b1a.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Misterios sin resolver",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=crime%2Cmystery&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=FilmRise&ads.content_livestream=0&ads.csid=zeus_es_misteriossinresolver_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=6972&ads.rakuten_streaming_id=8a0f8e57-fd16-449a-a82d-5e22af7644fc&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883123&ads.xumo_contentId=2648&ads.xumo_contentName=FilmRiseTrueCrimeMexico&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=2648&ads.xumo_providerName=filmrise-unsolved-mysteries-spa-rakutentv&ads.xumo_streamId=88883123",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/2fc7195d-be0a-4c4c-bb7c-6b57202535b7.jpeg",
    "category": "Variedad"
  },
  {
    "title": "Historias de ultratumba",
    "url": "https://d39g1vxj2ef6in.cloudfront.net/v1/master/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-rakuten-stitched/master.m3u8?ads._fw_app_bundle=com.rakuten.tv&ads._fw_app_store_url=rakuten.tv&ads._fw_content_category=IAB1&ads._fw_content_genre=mystery%2Chorror%2Cthriller&ads._fw_content_language=es&ads._fw_content_rating=tv-14&ads._fw_deviceMake=&ads._fw_device_model=&ads._fw_devicetype=3-connected_tv&ads._fw_gdpr=1&ads._fw_gdpr_consent=&ads._fw_is_lat=1&ads._ifa_type=ppid&ads.amznbrmid=&ads.amznregion=&ads.amznslots=&ads.appName=RakutenTV&ads.app_version=&ads.brand_name=&ads.caid=IndigeniusFrance&ads.content_livestream=0&ads.csid=zeus_fr_ahaunting_ssai&ads.gam_correlator=&ads.inv_partner_domain=rakuten.tv&ads.network_name=RakutenTV&ads.os_language=&ads.placement=1&ads.prodq=1&ads.rakuten_content_type=live_channels&ads.rakuten_device_type=web&ads.rakuten_device_year=&ads.rakuten_env=prod&ads.rakuten_market=es&ads.rakuten_pod_type=playerpage_midroll&ads.rakuten_rtv_content_id=6974&ads.rakuten_streaming_id=66851df8-5314-4e64-b9f8-c19ecc094cb2&ads.rakuten_user_type=visitor&ads.tivo_devcountry=&ads.tivo_devmakedate=&ads.tivo_mvpd=&ads.tivo_platform=&ads.tivo_usid=&ads.tivo_uxloc=&ads.xumo_channelId=88883127&ads.xumo_contentId=4231&ads.xumo_contentName=IndigeniusCrimenSpanish&ads.xumo_ifa=&ads.xumo_ifaType=ppid&ads.xumo_providerId=4231&ads.xumo_providerName=a-haunting-spa-rakutentv&ads.xumo_streamId=88883127",
    "type": "HLS",
    "logoUrl": "https://images-3.rakuten.tv/storage/global-live-channel/translation/artwork/e70ee1d0-6aee-4c0b-97b3-f797acf6d6be.jpeg",
    "category": "Variedad"
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
//::::::::::::::::::COMIENZO CATADULTOS:::::::::::::::::::::::://
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
    },
     {
        title: "Russian",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://cdn.redtraffic.net/russian.m3u8"
    },
     {
        title: "Lesbian",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://cdn.redtraffic.net/lesbian.m3u8"
    },
     {
        title: "Rough",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://cdn.redtraffic.net/rough.m3u8"
    },
     {
        title: "Latina",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://cdn.redtraffic.net/latina.m3u8"
    },
     {
        title: "Anal",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://cdn.redtraffic.net/Anal.m3u8"
    },
     {
        title: "Adult Iptv",
        logoUrl: "https://www.shutterstock.com/image-photo/xxx-adult-rubber-stamp-over-600nw-135193052.jpg",
        category: "Adultos",
        url: "https://cdn.redtraffic.net/master.m3u8"
    },
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


const VideoPlayer = React.forwardRef(({ channel, isPlaying, onFinish }, ref) => {
    const url = channel ? channel.url : null;
    const drm = channel ? channel.drm : null;
    const referrer = channel ? channel.referrer : null;
    const userAgent = channel ? channel.userAgent : null;
    const headers = channel ? channel.headers : null;

    const finalHeaders = React.useMemo(() => {
        const combined = headers ? { ...headers } : {};
        if (referrer && !combined.Referer) combined.Referer = referrer;
        if (userAgent && !combined['User-Agent']) combined['User-Agent'] = userAgent;
        return Object.keys(combined).length > 0 ? combined : null;
    }, [headers, referrer, userAgent]);

    const setupXhr = React.useCallback((xhr) => {
        if (finalHeaders) {
            Object.entries(finalHeaders).forEach(([key, value]) => {
                try { xhr.setRequestHeader(key, value); } catch (e) { console.warn(e); }
            });
        }
    }, [finalHeaders]);

    React.useEffect(() => {
        const video = ref.current;
        if (!video || !url) return;

        let hls;
        let shakaPlayer;

        // Limpieza agresiva original
        if (video.__hlsInstance) { video.__hlsInstance.destroy(); delete video.__hlsInstance; }
        if (video.__shakaInstance) { video.__shakaInstance.destroy(); delete video.__shakaInstance; }
        
        video.pause();
        video.muted = true;
        video.removeAttribute('src');
        video.load();

        const handleReady = () => {
            if (isPlaying) {
                video.play().catch(e => console.error("Error Autoplay:", e));
                setTimeout(() => { if (video) video.muted = false; }, 500);
            }
        };

        // --- MODO DASH + DRM ---
        if (url.includes('.mpd') || drm) {
            shakaPlayer = new shaka.Player(video);
            video.__shakaInstance = shakaPlayer;

            shakaPlayer.configure({
                drm: { clearKeys: drm?.clearkey || {}, robustness: '' },
                streaming: { jumpLargeGaps: true, rebufferingGoal: 2 },
                manifest: { dash: { ignoreMinBufferTime: true } }
            });

            shakaPlayer.getNetworkingEngine().registerRequestFilter((type, request) => {
                if (finalHeaders) {
                    Object.entries(finalHeaders).forEach(([key, value]) => {
                        request.headers[key] = value;
                    });
                }
            });

            shakaPlayer.load(url).then(handleReady).catch(e => console.error("Shaka Error:", e));
        }

        // --- MODO HLS ---
        else if (window.Hls && Hls.isSupported() && (url.includes('.m3u8') || url.includes('8080'))) {
            // He añadido "url.includes('8080')" porque tus links de Zapping usan ese puerto y suelen ser HLS
            hls = new Hls({ xhrSetup: setupXhr, maxBufferLength: 30 });
            hls.loadSource(url);
            hls.attachMedia(video);
            video.__hlsInstance = hls;
            hls.on(Hls.Events.MANIFEST_PARSED, handleReady);
        } 
        
        // --- MODO NATIVO (MP4, MKV y otros) ---
        else {
            video.src = url;
            // IMPORTANTE: Esto ayuda a que el navegador intente reproducir formatos como MKV si el codec está presente
            video.type = url.includes('.mkv') ? 'video/x-matroska' : 'video/mp4';
            video.addEventListener('loadedmetadata', handleReady, { once: true });
        }

        return () => {
            if (video.__hlsInstance) video.__hlsInstance.destroy();
            if (video.__shakaInstance) video.__shakaInstance.destroy();
        };
    }, [url, drm, isPlaying, setupXhr, finalHeaders, ref]);

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black flex items-center justify-center">
            <img 
                src="https://raw.githubusercontent.com/myappstorefreenf-source/myappstorefreenf.github.io/main/icons/Spinnertx.gif" 
                className="absolute w-20 h-20 object-contain z-10 pointer-events-none" 
                alt="Cargando..."
                id="video-spinner"
            />
            <video
                ref={ref}
                className='react-player'
                poster="https://raw.githubusercontent.com/myappstorefreenf-source/myappstorefreenf.github.io/main/icons/Spinnertx1.gif"
                width='100%'
                height='100%'
                playsInline
                autoPlay
                controls={false}
                   crossOrigin="anonymous" // <--- AÑADE ESTO PARA EL WEBVIEW
                preload="auto"          // <--- AÑADE ESTO
                onLoadedData={() => {
                    const spinner = document.getElementById('video-spinner');
                    if(spinner) spinner.style.display = 'none';
                }}
                onWaiting={() => {
                    const spinner = document.getElementById('video-spinner');
                    if(spinner) spinner.style.display = 'block';
                }}
                onPlaying={() => {
                    const spinner = document.getElementById('video-spinner');
                    if(spinner) spinner.style.display = 'none';
                }}
            />
        </div>
    );
});
// App.js (o archivo que contiene las funciones de API)

// 1. CONSTANTE DE LA URL BASE DE TU WORKER (La variable local)
// Usamos la URL base que no tiene el servicio añadido
const WORKER_BASE_URL = "https://proxyhls.myappstore-free-nf.workers.dev/"; 

/**
 * Función para obtener la URL HLS fresca con token.
 * ESTA FUNCIÓN SE EJECUTA EN EL HILO PRINCIPAL (mínimo cambio).
 * @param {string} serviceName - Identificador del canal (ej: 'telefe', 'eltrece').
 * @returns {Promise<string|null>} URL de la transmisión con token, o null en caso de error.
 */
async function fetchTokenizedChannelUrl(serviceName) {
    if (!serviceName) {
        console.error("El nombre del servicio es requerido para el Worker.");
        return null;
    }
    
    // Construye la URL completa: BASE_URL + serviceName
    const serviceUrl = WORKER_BASE_URL + serviceName;
    
    try {
        // Tu lógica original, ahora usando la URL dinámica
        const response = await fetch(serviceUrl); 
        
        if (!response.ok) {
            throw new Error(`Worker falló con estado: ${response.status}. URL: ${serviceUrl}`);
        }
        
        const finalUrl = (await response.text()).trim(); 
        
        return finalUrl;
        
    } catch (error) {
        console.error(`Error al obtener la URL para ${serviceName}:`, error);
        return null; 
    }
}
// ----------------------------------------------------------------------
// 4. COMPONENTE PRINCIPAL APP (MODIFICADO PARA SEGURIDAD)
// ----------------------------------------------------------------------
function App() {
    const [videoCatalog, setVideoCatalog] = React.useState(null); 
    const [currentChannel, setCurrentChannel] = React.useState(null); 
    const currentChannelUrl = currentChannel ? currentChannel.url : null;
   const [isAppReady, setIsAppReady] = React.useState(false); //retraso en la carga para dar tiempo al renderizado global
    const [isMenuVisible, setIsMenuVisible] = React.useState(true); 
    const playerRef = React.useRef(null);
    const [focusedIndex, setFocusedIndex] = React.useState(-1); 
    const [focusedFilteredIndex, setFocusedFilteredIndex] = React.useState(-1);
    const [focusedCategoryIndex, setFocusedCategoryIndex] = React.useState(-1); // -1: Todos, -2: Películas, 0+: Categoría
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const [isCategoryMenuVisible, setIsCategoryMenuVisible] = React.useState(false);
    const [isPlaying, setIsPlaying] = React.useState(false); 
    
    const allChannels = videoCatalog || [];
    const cardRefs = React.useRef(new Map());
    const categoryListRef = React.useRef(null); 

    // ⭐ NUEVO ESTADO DE SEGURIDAD
    const ADULTOS_CATEGORY_NAME = "Adultos"; // Nombre de la categoría a proteger
    const ADULTOS_PASSWORD = "1234"; // Contraseña de ejemplo (¡Cámbiala!)
    
    const [isAdultosUnlocked, setIsAdultosUnlocked] = React.useState(false); 
    const [isPasswordModalVisible, setIsPasswordModalVisible] = React.useState(false);
    const [passwordInput, setPasswordInput] = React.useState(''); 
    // FIN NUEVO ESTADO
    
    const groupedChannels = React.useMemo(() => {
        return groupChannelsByCategory(allChannels);
    }, [allChannels]);

    const categories = React.useMemo(() => Object.keys(groupedChannels), [groupedChannels]);
    
const filteredChannels = React.useMemo(() => {
    // Empezamos con todos los canales
    let channels = allChannels;
    
    // ⭐ 1. Excluir canales 'Adultos' si está bloqueado, independientemente de la categoría seleccionada
    if (!isAdultosUnlocked) {
        channels = channels.filter(channel => channel.category !== ADULTOS_CATEGORY_NAME);
    }

    // ⭐ 2. Aplicar el filtro de categoría (si aplica)
    if (selectedCategory !== null) {
        channels = channels.filter(channel => channel.category === selectedCategory);
    }
    
    // ⭐ 3. Si se seleccionó la categoría 'Adultos' estando bloqueada, la lista será vacía.
    //    (Este caso ya se cubre implícitamente por el punto 1 y 2, pero lo mantenemos
    //     como nota mental si la lógica fuera más compleja).
    
    return channels;
}, [allChannels, selectedCategory, isAdultosUnlocked, ADULTOS_CATEGORY_NAME]);

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


    const openMenu = React.useCallback(() => {
        setIsCategoryMenuVisible(false); 
        setIsMenuVisible(true);
        setIsPlaying(false); 
        
        if (filteredChannels.length > 0) {
            const initialFocusIndex = focusedFilteredIndex !== -1 ? focusedFilteredIndex : 0;
            requestAnimationFrame(() => focusChannelCard(initialFocusIndex)); 
        }
    }, [focusChannelCard, focusedFilteredIndex, filteredChannels.length]);

    const openCategoryMenu = React.useCallback(() => {
        if (!isMenuVisible) return;
        setIsCategoryMenuVisible(true);
        setIsPlaying(false);
        requestAnimationFrame(() => {
            const targetId = focusedCategoryIndex === -1 ? 'cat-focus--1' : 
                                 focusedCategoryIndex === -2 ? 'cat-focus--2' : 
                                 `cat-focus-${focusedCategoryIndex}`;
            document.getElementById(targetId)?.focus();
        });
    }, [isMenuVisible, focusedCategoryIndex]);


 const handlePlayChannel = React.useCallback(async (channelObject) => { 
    
    // 1. Inicializa la URL que se va a usar en el reproductor
    let urlToPlay = channelObject.url;
    
    // ⭐ NUEVO IDENTIFICADOR: Usa la propiedad workerId
    const serviceId = channelObject.workerId; // Será 'telefe' para ese canal

    // 2. Lógica para verificar y obtener el token
    if (serviceId) { // Verifica si existe un workerId
        
        console.log(`Detectado canal tokenizado. Llamando al Worker para ${serviceId}...`);
        
        // Llama a la función, pasándole el identificador
        const tokenizedUrl = await fetchTokenizedChannelUrl(serviceId); 
        
        if (tokenizedUrl) {
            urlToPlay = tokenizedUrl; 
        } else {
            console.error("No se pudo obtener la URL tokenizada. Usando URL de fallback.");
        }
    } 

    // 3. Crear el objeto de canal final con la URL actualizada o la URL original
    const finalChannelObject = {
        ...channelObject,
        url: urlToPlay,
        // ⭐ CLAVE: Limpiar headers y referrer para evitar conflictos con el token de Akamai
        headers: serviceId ? null : channelObject.headers,
        referrer: serviceId ? null : channelObject.referrer
    };

    setCurrentChannel(finalChannelObject); 
    
    // 4. Lógica de enfoque e interfaz (el resto de tu lógica original)
    const newGlobalIndex = allChannels.findIndex(c => c.url === channelObject.url); 
    setFocusedIndex(newGlobalIndex);
    
    const newFilteredIndex = filteredChannels.findIndex(c => c.url === channelObject.url);
    setFocusedFilteredIndex(newFilteredIndex !== -1 ? newFilteredIndex : 0);
    
    setIsCategoryMenuVisible(false);
    setIsMenuVisible(false);
    setIsPlaying(true);
    
}, [allChannels, filteredChannels]); // Asegúrate de incluir todas las dependencias
 

    
    const handleVideoEnd = React.useCallback(() => {
        setIsMenuVisible(true);
        setIsPlaying(false);
        
        const initialFocusIndex = focusedFilteredIndex !== -1 ? focusedFilteredIndex : 0; 
        
        setTimeout(() => focusChannelCard(initialFocusIndex), 10); 
    }, [focusChannelCard, focusedFilteredIndex]);


   // Carga de datos local e inicialización (CON RETRASO ARTIFICIAL)
React.useEffect(() => {
    // 1. Cargamos los datos inmediatamente
    const data = LOCAL_M3U_DATA; 
    setVideoCatalog(data);
    
    if (data.length > 0) {
        setFocusedIndex(0);
        setFocusedFilteredIndex(0); 
        setSelectedCategory(null);
        setFocusedCategoryIndex(-1);
    }

    // 2. ⭐ FORZAMOS EL TIEMPO DE ESPERA (3000ms = 3 segundos)
    const timer = setTimeout(() => {
        setIsAppReady(true);
    }, 5000);

    return () => clearTimeout(timer); // Limpieza de memoria
}, []);
    
    // Lógica de scroll para el menú de categorías
    const scrollCategoryList = React.useCallback((newCatIndex) => {
        const catList = categoryListRef.current;
        if (!catList || newCatIndex === -2) return; 
        
        const elementId = newCatIndex === -1 ? 'cat-focus--1' : `cat-focus-${newCatIndex}`;
        const element = document.getElementById(elementId);
        
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


    // ⭐ FUNCIÓN PARA CAMBIAR DE PÁGINA (USA NAVEGACIÓN NATIVA)
    const handleMainOptionSelect = React.useCallback((page) => {
        setIsMenuVisible(false); 
        setIsCategoryMenuVisible(false); 
        setIsPlaying(false); 
        
        if (page === 'movies') {
            window.location.href = 'videos.html'; 
        }
    }, []);


    // ⭐ NUEVA LÓGICA DE VALIDACIÓN DE CONTRASEÑA
    const [error, setError] = React.useState('');
    const handleUnlockAdultos = React.useCallback((password) => {
        if (password === ADULTOS_PASSWORD) {
            setIsAdultosUnlocked(true);
            setIsPasswordModalVisible(false);
            setPasswordInput('');
            
            // Regresar al menú de canales, con la categoría Adultos seleccionada
            setIsMenuVisible(true);
            setIsCategoryMenuVisible(false);
            
            // Necesitamos asegurarnos de que la categoría Adultos quede seleccionada
            setSelectedCategory(ADULTOS_CATEGORY_NAME);
            
            // Damos foco al primer canal de la lista filtrada de Adultos
            requestAnimationFrame(() => focusChannelCard(0));

        }
         else {
          
    setError("Contraseña incorrecta. Inténtalo de nuevo.");
    setPasswordInput('');
    // El error se limpia después de unos segundos si quieres
    setTimeout(() => setError(''), 3000);
        }
    }, [ADULTOS_PASSWORD, ADULTOS_CATEGORY_NAME, focusChannelCard]);

    const handleCloseModal = React.useCallback(() => {
        setIsPasswordModalVisible(false);
        setPasswordInput('');
        // Regresa el foco al menú de categorías
        openCategoryMenu(); 
    }, [openCategoryMenu]);
    // FIN NUEVA LÓGICA DE SEGURIDAD


    // ⭐ LÓGICA DE NAVEGACIÓN D-PAD (MODIFICADA para el cambio de canal rápido)
    const handleDpadNavigation = React.useCallback((event) => {
        
        const key = event.key;
        const isDpadKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(key);

        if (!isMenuVisible) {
            // --- Manejo al ver el video ---
            if (isPasswordModalVisible) {
                // Si el modal de contraseña está abierto, prevenimos la navegación del video
                event.preventDefault();
                return;
            }
            
            if (key === 'ArrowLeft' || key === 'Enter' || key === ' ') {
                event.preventDefault();
                openMenu(); 
                setIsCategoryMenuVisible(false); // Abrir menú de canales
                return; 
            } 
            
            // ⭐ LÓGICA DE CAMBIO DE CANAL RÁPIDO (Flecha Arriba/Abajo)
            if (isPlaying && (key === 'ArrowUp' || key === 'ArrowDown')) {
                event.preventDefault();
                
                const totalChannels = filteredChannels.length;
                if (totalChannels === 0) return;

                const currentFilteredIndex = focusedFilteredIndex;
                let newFilteredIndex = currentFilteredIndex;

                if (key === 'ArrowUp') {
                    newFilteredIndex = (currentFilteredIndex === 0) ? totalChannels - 1 : currentFilteredIndex - 1;
                } else if (key === 'ArrowDown') {
                    newFilteredIndex = (currentFilteredIndex === totalChannels - 1) ? 0 : currentFilteredIndex + 1;
                }

                const nextChannelToPlay = filteredChannels[newFilteredIndex];
                
                if (nextChannelToPlay) {
                    handlePlayChannel(nextChannelToPlay); 
                }
                return;
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
        
        
        // --- Manejo en el Menú de Categorías (Sub-Menú) ---
        if (isCategoryMenuVisible) {
            
             let newCatIndex = focusedCategoryIndex;
             const isLastCategory = focusedCategoryIndex === totalCategories - 1;
             
             if (key === 'ArrowUp' || key === 'ArrowDown') {
                 if (totalCategories === 0) return; 

                 if (key === 'ArrowUp') {
                     if (focusedCategoryIndex === -1) { 
                         newCatIndex = -2;
                     } else if (focusedCategoryIndex === 0) { 
                         newCatIndex = -1;
                     } else if (focusedCategoryIndex === -2) { 
                         newCatIndex = totalCategories - 1;
                     } else {
                         newCatIndex -= 1;
                     }
                 } else { // ArrowDown
                      if (isLastCategory) { 
                          newCatIndex = -2;
                      } else if (focusedCategoryIndex === -2) { 
                          newCatIndex = -1;
                      } else {
                          newCatIndex += 1;
                      }
                 }

                 setFocusedCategoryIndex(newCatIndex);
                 requestAnimationFrame(() => {
                     let targetId;
                     if (newCatIndex === -1) targetId = 'cat-focus--1';
                     else if (newCatIndex === -2) targetId = 'cat-focus--2';
                     else targetId = `cat-focus-${newCatIndex}`;
                     
                     document.getElementById(targetId)?.focus();
                     scrollCategoryList(newCatIndex); 
                 });


             } else if (key === 'ArrowRight' || key === 'Enter' || key === ' ') {
                 
                 // ⭐ Lógica para usar el nuevo handleCategorySelect
                 const categoryName = newCatIndex === -1 ? null : categories[newCatIndex];
                 
                 // Si es la categoría Adultos y está bloqueada, abrirá el modal, si no, seleccionará la categoría.
                 if (categoryName === ADULTOS_CATEGORY_NAME && !isAdultosUnlocked) {
                     setIsCategoryMenuVisible(false); 
                     setIsPasswordModalVisible(true);
                     setFocusedCategoryIndex(newCatIndex); 
                     return;
                 }
                 
                 if (newCatIndex === -2) {
                     handleMainOptionSelect('movies');
                     return;
                 }
                 
                 setSelectedCategory(categoryName);
                 setIsCategoryMenuVisible(false); 
                 setFocusedFilteredIndex(-1); 
                 requestAnimationFrame(() => focusChannelCard(0));


             } else if (key === 'ArrowLeft') {
                 setIsCategoryMenuVisible(false);
                 setIsMenuVisible(false);
                 if (currentChannel) setIsPlaying(true); 
             }

        // --- Manejo en el Menú Principal de Canales (Lista de Canales) ---
        } else {
            
             if (key === 'Enter' || key === ' ') {
                  const channelToPlay = filteredChannels[focusedFilteredIndex]; 
                  if (channelToPlay) {
                      handlePlayChannel(channelToPlay); 
                  } else {
                      focusChannelCard(0);
                  }
                  return;

              } else if (key === 'ArrowLeft') {
                  const currentSelectedCatIndex = selectedCategory === null ? -1 : categories.findIndex(c => c === selectedCategory);
                  setFocusedCategoryIndex(currentSelectedCatIndex);
                  openCategoryMenu(); 
                  return;

              } else if (key === 'ArrowRight') {
                  setIsMenuVisible(false); 
                  if (currentChannel) setIsPlaying(true);
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
    }, [isMenuVisible, isCategoryMenuVisible, focusedFilteredIndex, filteredChannels, allChannels, focusChannelCard, handlePlayChannel, openMenu, openCategoryMenu, focusedCategoryIndex, categories, selectedCategory, scrollCategoryList, currentChannel, handleMainOptionSelect, isPasswordModalVisible, ADULTOS_CATEGORY_NAME, isAdultosUnlocked]);


   // ⭐ EFFECT PARA ESCUCHAR D-PAD (MODIFICADO)
React.useEffect(() => {
    
    // Si el modal de contraseña está abierto, solo manejamos las teclas relevantes para el modal.
    if (isPasswordModalVisible) {
        
        const handleModalKeys = (e) => {
            const focusedElement = document.activeElement;
            const isInputFocused = focusedElement && focusedElement.tagName === 'INPUT' && focusedElement.type === 'password';

            if (e.key === 'Enter') {
                e.preventDefault();
                // Si el foco está en el input, el form se envía (comportamiento nativo).
                // Si el foco está en el botón 'Desbloquear', lo activamos.
                if (!isInputFocused) {
                    document.querySelector('.password-submit-button')?.click();
                }
            } 
            
            if (e.key === 'Escape' || e.key === 'ArrowLeft') {
                e.preventDefault();
                // ⭐ Permitimos que Flecha Izquierda funcione como cancelar.
                handleCloseModal();
            }
        };
        
        window.addEventListener('keydown', handleModalKeys);
        return () => window.removeEventListener('keydown', handleModalKeys);
    }
    
    // Si el modal no está visible, usamos la navegación normal
    window.addEventListener('keydown', handleDpadNavigation);
    return () => window.removeEventListener('keydown', handleDpadNavigation);
    
}, [handleDpadNavigation, isPasswordModalVisible, handleCloseModal]);

    
    // Componente CategoryMenu (Renderizado interno - MODIFICADO para seguridad)
    const CategoryMenu = () => {
        
        if (categories.length === 0) return null;

        const isCategoryListVisible = isMenuVisible && isCategoryMenuVisible;
        const isFocusableCategory = isCategoryListVisible;
        
        // ⭐ LÓGICA MODIFICADA DE SELECCIÓN DE CATEGORÍA
        const handleCategorySelect = (categoryName, index) => {
             // 1. Manejar la opción Películas
             if (index === -2) {
                 handleMainOptionSelect('movies');
                 return;
             } 
             
             // 2. Manejar la categoría Adultos: Si está bloqueada, mostramos el modal
             if (categoryName === ADULTOS_CATEGORY_NAME && !isAdultosUnlocked) {
                setPasswordInput('');
                 setIsCategoryMenuVisible(false); 
                 setIsMenuVisible(false); 
                 setIsPlaying(false);
                 setPasswordInput('');
                 setIsPasswordModalVisible(true); 
                 setFocusedCategoryIndex(index); 
                 return;
             }
             
             // 3. Selección normal de categoría
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
                              ? 'translateX(0)' 
                              : 'translateX(-100%)',
                 }}
            >
                <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2">
                    📺 TV
                </h2>
                
                <div className="space-y-1">
                    {/* Opción "Todos los Canales" */}
                    <button
                        id={`cat-focus--1`} 
                        className={`w-full text-left p-2 rounded-md transition-colors duration-200 
                                     ${selectedCategory === null && focusedCategoryIndex !== -2 ? 'bg-blue-600' : 'hover:bg-gray-700'}
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
                                          ${selectedCategory === category && focusedCategoryIndex !== -2 ? 'bg-blue-600' : 'hover:bg-gray-700'}
                                          ${focusedCategoryIndex === index && isFocusableCategory ? 'focus:ring-2 focus:ring-blue-500 focus:outline-none' : ''}`}
                             onClick={() => handleCategorySelect(category, index)}
                             tabIndex={isFocusableCategory ? "0" : "-1"}
                         >
                             {category}
                             {/* ⭐ INDICADOR DE CANDADO */}
                             {category === ADULTOS_CATEGORY_NAME && !isAdultosUnlocked && ' 🔒'} 
                         </button>
                    ))}
                    
                      <div className="h-4"></div> 
                    
                    {/* ⭐ OPCIÓN "PELÍCULAS" */}
                    <h2 className="text-2xl font-bold mb-4 border-b border-gray-700 pb-2 pt-2">
                         🎬 Navegación
                    </h2>
                    <button
                         id={`cat-focus--2`} 
                         className={`w-full text-left p-2 rounded-md transition-colors duration-200 font-bold 
                                            ${focusedCategoryIndex === -2 ? 'bg-red-600' : 'hover:bg-gray-700'}
                                            ${focusedCategoryIndex === -2 && isFocusableCategory ? 'focus:ring-2 focus:ring-red-500 focus:outline-none' : ''}`}
                         onClick={() => handleMainOptionSelect('movies')}
                         tabIndex={isFocusableCategory ? "0" : "-1"}
                    >
                         Películas
                    </button>
                </div>
            </div>
        );
    };


    // Componente ChannelsMenu (Renderizado interno - YA MODIFICADO ANTERIORMENTE)
    const ChannelsMenu = () => {
        
        const setCardRef = (index, element) => {
            if (element) {
                cardRefs.current.set(index, element);
            } else {
                cardRefs.current.delete(index);
            }
        };

        const currentCategoryTitle = selectedCategory || "Todos los Canales";
        
        const isChannelsMenuVisible = isMenuVisible && !isCategoryMenuVisible;
        const isFocusableChannel = isChannelsMenuVisible;
        
        const groupedFilteredChannels = React.useMemo(() => groupChannelsByCategory(filteredChannels), [filteredChannels]);
        const filteredCategories = Object.keys(groupedFilteredChannels);
        
        // --- Lógica de Renderizado de Canales ---
        const renderChannels = () => {
            if (filteredChannels.length === 0) {
                 if (selectedCategory === ADULTOS_CATEGORY_NAME && !isAdultosUnlocked) {
                    return (
                        <div className="p-4 text-sm text-red-500 flex-grow">
                             Categoría Adultos bloqueada. Introduce la contraseña.
                        </div>
                    );
                }
                return (
                    <div className="p-4 text-sm text-yellow-500 flex-grow">
                        No hay canales en esta categoría.
                    </div>
                );
            }

            // Caso 1: Se seleccionó una categoría específica (No nula).
            if (selectedCategory !== null) {
                return filteredCategories.map((category) => (
                    <div key={category} className="category-group">
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
                ));
            }

            // Caso 2: Se seleccionó "Todos los Canales" (selectedCategory === null).
            // Renderizamos la lista plana sin agrupar por categorías.
            return (
                <div className="space-y-1">
                    {filteredChannels.map((video) => {
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
            );
        };


        return (
            <div 
                className={`absolute top-0 left-0 h-full bg-gray-900/90 text-white transition-all duration-300 z-20 w-1/3 max-w-md flex flex-col`}
                 style={{
                      transform: isChannelsMenuVisible
                              ? 'translateX(0)' 
                              : 'translateX(-100%)',
                 }}
            >
                <div className={`p-8 h-full flex flex-col ${isChannelsMenuVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                    {/* ⭐ AÑADIDO: BOTÓN PARA ABRIR EL MENÚ DE CATEGORÍAS */}
            <button
                className="absolute top-2 right-2 p-2 bg-gray-700/70 rounded-full text-white z-40 
                           transition-colors duration-200 
                           hover:bg-gray-600/90 focus:bg-gray-600/90 focus:ring-2 focus:ring-blue-500 text-lg"
                onClick={openCategoryMenu}
                tabIndex={isChannelsMenuVisible ? "0" : "-1"}
                aria-label="Abrir menú de categorías"
            >
                 <span role="img" aria-label="Flecha izquierda">
                    &#x25C0; {/* Símbolo de triángulo/flecha izquierda */}
                 </span>
            </button>
            {/* FIN BOTÓN */}
                    <h1 className="text-4xl font-bold mb-6 text-blue-400 flex-shrink-0">
                        {currentCategoryTitle}
                    </h1>
                    
                    <div 
                        id="channels-list-container"
                        className="space-y-4 overflow-y-auto flex-grow custom-scrollbar" 
                        tabIndex="-1"
                    > 
                        {renderChannels()}
                    </div>

                   <div className="text-sm text-gray-500 mt-4 flex-shrink-0">
                        Canales visibles: **{filteredChannels.length}**←
                    </div>
                </div>
            </div>
        );
    };

 // ⭐ COMPONENTE MODAL DE CONTRASEÑA (NUEVO Y ACTUALIZADO)
const PasswordModal = ({ isVisible, onClose, onUnlock, onInputChange, inputValue }) => {
    if (!isVisible) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onUnlock(inputValue);
    };

    return (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900/95 flex items-center justify-center z-50">
            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-96 text-white">
                <h3 className="text-2xl font-bold mb-4">Acceso a {ADULTOS_CATEGORY_NAME}</h3>
                <p className="text-sm text-gray-400 mb-6">Ingresa la contraseña para ver esta categoría.</p>
                {/* 🔴 SECCIÓN DE ERROR INTEGRADA */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg animate-pulse text-center">
                        <p className="text-red-500 text-sm font-bold">⚠️ {error}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={inputValue}
                        onChange={(e) => onInputChange(e.target.value)}
                        className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        tabIndex="0" 
                        autoFocus
                        autoComplete="new-password"
                        // ⭐ 1. AÑADIR LA CLAVE PARA FORZAR LA LIMPIEZA
                        key={isVisible ? 'password-show' : 'password-hide'} 
                    />
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition"
                            tabIndex="0"
                        >
                            Cancelar (←)
                        </button>
                        <button
                            type="submit"
                            // ⭐ 2. AÑADIR LA CLASE PARA ACTIVACIÓN CON ENTER DESDE EL useEffect
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition password-submit-button" 
                            tabIndex="0"
                        >
                            Desbloquear (Enter)
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

    // RENDERIZADO PRINCIPAL (Solo la página de TV)
    return (
        <div className="relative w-screen h-screen bg-black overflow-hidden">
            {/* 1. Video Player */}
            {videoCatalog !== null && currentChannelUrl && (
                <VideoPlayer 
                    ref={playerRef} 
                    channel={currentChannel} 
                    isPlaying={isPlaying} 
                    onFinish={handleVideoEnd} 
                />
            )}
            
           {/* 2. Pantalla de carga */}
{!isAppReady && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 text-white z-[100]">
        <div className="flex flex-col items-center">
            {/* Texto de carga */}
            <h1 className="text-2xl font-bold mb-8 animate-pulse">Cargando...</h1>
            
            {/* Contenedor del Spinner */}
            <div className="relative w-24 h-24 flex items-center justify-center">
                <img 
                    src="https://raw.githubusercontent.com/myappstorefreenf-source/myappstorefreenf.github.io/main/icons/Spinnertx.gif" 
                    className="w-full h-full object-contain pointer-events-none" 
                    alt="Cargando..."
                />
            </div>
        </div>
    </div>
)}
            {/* 3. Menús */}
            {videoCatalog !== null && (
                <React.Fragment>
                     <CategoryMenu />
                     <ChannelsMenu />
                </React.Fragment>
            )}

            {/* 4. Overlay de video (Cuando no hay canal activo y se cerró el menú) */}
            {videoCatalog !== null && !isMenuVisible && !currentChannelUrl && (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-900/90 flex items-center justify-center text-white z-0">
                    <p className="text-xl"> (←)</p>
                </div>
            )}

            {/* 5. Botón para abrir menú */}
            {!isMenuVisible && ( 
                <button
                     className="absolute top-4 left-4 p-2 bg-gray-900/70 rounded-lg text-white z-10 
                                  transition-all duration-200 
                                  hover:bg-gray-700/90 focus:bg-gray-700/90 focus:ring-2 focus:ring-blue-500"
                     onClick={openMenu}
                     tabIndex="0" 
                     aria-label="Abrir lista de canales"
                >
                    <p className="text-sm font-light">
                        ← 
                    </p>
                </button>
            )}

            {/* ⭐ 6. Modal de Contraseña (NUEVO) */}
            <PasswordModal 
                isVisible={isPasswordModalVisible}
                onClose={handleCloseModal}
                onUnlock={handleUnlockAdultos}
                onInputChange={setPasswordInput}
                inputValue={passwordInput}
            />
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
    console.error("No se encontró el elemento 'root'. Asegúrate de que tu HTML tiene <div id='root'></div>");
}










