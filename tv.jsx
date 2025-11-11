// ----------------------------------------------------------------------
// 0. PARSEADOR M3U
// ----------------------------------------------------------------------

const M3U_CONTENT = `
#EXTINF:-1 tvg-id="A24.ar" tvg-name="A24" tvg-logo="https://www.reportv.com.ar/buscador/img/Logos/48806494.jpg" group-title="ARGENTINA",A24
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2339
#EXTINF:-1 tvg-id="LA NACION+.ar" tvg-name="LN+ La Nación" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/8/81/LN%2B.png" group-title="ARGENTINA",LN+ La Nación
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2344
#EXTINF:-1 tvg-id="Canal 26.ar" tvg-name="Canal 26" tvg-logo="https://ibyme.org.ar/wp-content/uploads/2023/05/26-noticias.png" group-title="ARGENTINA",Canal 26
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/1891
#EXTINF:-1 tvg-id="TN.ar" tvg-name="TN op.2" tvg-logo="https://i.imgur.com/vFwPhPS.png" group-title="ARGENTINA",TN op.2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2341
#EXTINF:-1 tvg-id="CRONICA TV.ar" tvg-name="Crónica" tvg-logo="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh4DC0-vjxdknUnvyD_wtUZ3iAacVmZqmj7_O6aRYYGT30zyv7Up4KWSamHZ_eZ3H84uhvmrXs-XiVCG2KX_xVteVyguWXrPr1D_MNiBJT6ckBDA_-5Gx-FTnaXA0EXGl4o2i91qFqnI0Z5P9N45IKO5TX3bDdWMmqTXzua5KV5YRDJAJnkNPN0hx9h/s558/CRONICATV.png" group-title="ARGENTINA",Crónica
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2342
#EXTINF:-1 tvg-id="C5N.ar" tvg-name="C5N" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/c/c9/C5N_Logo_2015.PNG" group-title="ARGENTINA",C5N
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2340
#EXTINF:-1 tvg-id="AMERICA TV.ar" tvg-name="America TV" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Americatvlogo2015.svg/1200px-Americatvlogo2015.svg.png" group-title="ARGENTINA",America TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6989
#EXTINF:-1 tvg-id="AMERICA TV.ar" tvg-name="America TV HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Americatvlogo2015.svg/1200px-Americatvlogo2015.svg.png" group-title="ARGENTINA",America TV HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2345
#EXTINF:-1 tvg-id="EL NUEVE.ar" tvg-name="El Nueve" tvg-logo="https://www.seekpng.com/png/full/345-3453836_ar-canal-9-el-nueve-el-nueve-logo.png" group-title="ARGENTINA",El Nueve
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2346
#EXTINF:-1 tvg-id="EL NUEVE.ar" tvg-name="El Nueve HD" tvg-logo="https://www.seekpng.com/png/full/345-3453836_ar-canal-9-el-nueve-el-nueve-logo.png" group-title="ARGENTINA",El Nueve HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6987
#EXTINF:-1 tvg-id="EL TRECE.ar" tvg-name="El Trece" tvg-logo="https://4.bp.blogspot.com/-qbC3LvpmKVM/Ufm9YzqCi6I/AAAAAAAAAJw/CHVpYurVoMI/s1600/Logo_Canal_Trece_actual1.png" group-title="ARGENTINA",El Trece
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6988
#EXTINF:-1 tvg-id="EL TRECE.ar" tvg-name="El Trece HD" tvg-logo="https://4.bp.blogspot.com/-qbC3LvpmKVM/Ufm9YzqCi6I/AAAAAAAAAJw/CHVpYurVoMI/s1600/Logo_Canal_Trece_actual1.png" group-title="ARGENTINA",El Trece HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2347
#EXTINF:-1 tvg-id="TELEFE.ar" tvg-name="TELEFE" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/a/ac/Telefe.png" group-title="ARGENTINA",TELEFE
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6986
#EXTINF:-1 tvg-id="TELEFE.ar" tvg-name="TELEFE HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/a/ac/Telefe.png" group-title="ARGENTINA",TELEFE HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2348
#EXTINF:-1 tvg-id="TV PUBLICA.ar" tvg-name="TV Publica" tvg-logo="https://i.postimg.cc/cLtNCgRK/tvp.png" group-title="ARGENTINA",TV Publica
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/166
#EXTINF:-1 tvg-id="TV PUBLICA.ar" tvg-name="TV Publica (Android)" tvg-logo="https://i.postimg.cc/cLtNCgRK/tvp.png" group-title="ARGENTINA",TV Publica (Android)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/55020
#EXTINF:-1 tvg-id="TV PUBLICA.ar" tvg-name="TV Publica HD" tvg-logo="https://i.postimg.cc/cLtNCgRK/tvp.png" group-title="ARGENTINA",TV Publica HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/167
#EXTINF:-1 tvg-id="TV PUBLICA.ar" tvg-name="TV Publica HD (Android ARG)" tvg-logo="https://i.postimg.cc/cLtNCgRK/tvp.png" group-title="ARGENTINA",TV Publica HD (Android ARG)
https://g2.vxral-slo.transport.edge-access.net/b16/ngrp:c7_vivo01_dai_source-20001_all/c7_vivo01_dai_source-20001_720p.m3u8
#EXTINF:-1 tvg-id="CINEARTV.ar" tvg-name="CineAR" tvg-logo="https://www.festivaldebiarritz.com/wp-content/uploads/2019/08/logo-cinear-alt-sin-bajada-700x175.png" group-title="ARGENTINA",CineAR
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2349
#EXTINF:-1 tvg-id="I120.16395.schedulesdirect.org" tvg-name="Encuentro" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/0/06/Logo_canal_encuentro_2016.png" group-title="ARGENTINA",Encuentro
https://538d0bde28ccf.streamlock.net/live-cont.ar/encuentro/.m3u8
#EXTINF:-1 tvg-id="I631.112240.schedulesdirect.org" tvg-name="DeporTV" tvg-logo="https://cdn.m3u.cl/logo/1100_DEPORTV.png" group-title="ARGENTINA",DeporTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/164
#EXTINF:-1 tvg-id="CanaldelaCiudad.ar" tvg-name="Canal de la Ciudad" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/9/91/Logo_Canal_de_la_Ciudad.png" group-title="ARGENTINA",Canal de la Ciudad
https://g4.mc-hor.transport.edge-access.net/a06/ngrp:gcba_video4-100042_all/gcba_video4-100042_720p/index.m3u8
#EXTINF:-1 tvg-id="" tvg-name="CPE TV" tvg-logo="https://yt3.ggpht.com/a-/AN66SAyZxChYuXCH1F_ctKSB72DEf6oU7_ZXPZ9lpQ=s900-mo-c-c0xffffffff-rj-k-no" group-title="ARGENTINA",CPE TV
https://stream.arcast.live/cpe/ngrp:cpe_all/playlist.m3u8
#EXTINF:-1 tvg-id="EL GARAGE.ar" tvg-name="Garage TV" tvg-logo="https://www.cablevisionfibertel.com.ar/dyn/dyn/MEDIA_ProductCatalog/m790028_El_garage.png" group-title="ARGENTINA",Garage TV
https://stream1.sersat.com/hls/garagetv.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Chaco TV" tvg-logo="https://image.winudf.com/v2/image/Y29tLmVjb20uY2hhY290dl9pY29uXzE1MTk2OTYyOTBfMDYw/icon.png?w=170&fakeurl=1&type=.png" group-title="ARGENTINA",Chaco TV
https://wowzasrv.chaco.gov.ar/Streamtv/chacotv/playlist.m3u8
#EXTINF:-1 tvg-id="NET TV.ar" tvg-name="NET TV HD" tvg-logo="https://www.canalnet.tv/_templates/desktop/includes/img/lfooter.png" group-title="ARGENTINA",NET TV HD
https://unlimited1-buenosaires.dps.live/nettv/nettv.smil/playlist.m3u8
#EXTINF:-1 tvg-id="TELEMAX.ar" tvg-name="Telemax HD" tvg-logo="https://i.postimg.cc/t44v6WW9/Telemax.png" group-title="ARGENTINA",Telemax HD
https://stream-gtlc.telecentro.net.ar/hls/telemaxhls/0/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal Provincial - Bs.As." tvg-logo="http://canalprovincial.com/wp-content/themes/canalprovincia/images/footer.png" group-title="ARGENTINA",Canal Provincial - Bs.As.
https://cdn.trimi.com.ar/live/sm-live/PROVINCIAL/sa_live_hls/PROVINCIAL.m3u8
#EXTINF:-1 tvg-id="" tvg-name="24-7 Noticias - Neuquén" tvg-logo="https://www.cn247.tv/img/logo.png" group-title="ARGENTINA",24-7 Noticias - Neuquén
https://59c5c86e10038.streamlock.net/6605140/6605140/chunklist_w472204508.m3u8
#EXTINF:-1 tvg-id="" tvg-name="RTN Neuquén" tvg-logo="http://www.rtnweb.gob.ar/wp-content/uploads/2017/04/LOGO-RTN-Web.png" group-title="ARGENTINA",RTN Neuquén
http://media.neuquen.gov.ar/rtn/television/chunklist_w1330236482.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Aire - Santa Fe" tvg-logo="https://cdn.m3u.cl/logo/252_Aire_de_Santa_Fe.png" group-title="ARGENTINA",Aire - Santa Fe
https://unlimited1-us.dps.live/airedesantafetv/airedesantafetv.smil/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Somos La Pampa" tvg-logo="https://cdn.m3u.cl/logo/1072_Somos_La_Pampa.png" group-title="ARGENTINA",Somos La Pampa
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/75202
#EXTINF:-1 tvg-id="" tvg-name="Litus TV - Santa Fe" tvg-logo="https://yt3.ggpht.com/a-/AN66SAyCzjehM_QO5Z1-EpTFLN_--k7dJhCvDuiDog=s900-mo-c-c0xffffffff-rj-k-no" group-title="ARGENTINA",Litus TV - Santa Fe
http://arcast.com.ar:1935/litustv/ngrp:litustv_all/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="TDC TV - Santa Fe" tvg-logo="https://tdconline.com.ar/wp-content/uploads/2022/05/online.png" group-title="ARGENTINA",TDC TV - Santa Fe
https://5e7cdf2370883.streamlock.net/tdconline/smil:tdconline.smil/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Power HD - Pinamar" tvg-logo="http://www.radiopower.com.ar/img/logoPwrHD_small.png" group-title="ARGENTINA",Power HD - Pinamar
https://live2.tensila.com/1-1-1.power-tv/hls/live/mystream.m3u8
#EXTINF:-1 tvg-id="ARGENTINISIMA.ar" tvg-name="Argentinisima Satelital" tvg-logo="https://static-cdn.jtvnw.net/jtv_user_pictures/argentinisimasatelital-profile_image-9aa9b79bfdfe6068-300x300.jpeg" group-title="ARGENTINA",Argentinisima Satelital
https://stream1.sersat.com/hls/argentinisima.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 2 Telpin - Pinamar" tvg-logo="https://www.telpinteve.com.ar/imagenes/Canal2Logos-03.png" group-title="ARGENTINA",Canal 2 Telpin - Pinamar
https://wowza.telpin.com.ar:1935/telpintv/smil:ttv.stream.smil/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 3 - Formosa" tvg-logo="https://2.bp.blogspot.com/-XB7qQwxGgsY/WKsrFu7SEMI/AAAAAAAAUW4/nJA6XK03oeI0v0iYaxfb1J5P-zGHRWCKACLcB/s1600/logo%2Bcanal.jpg" group-title="ARGENTINA",Canal 3 - Formosa
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/173
#EXTINF:-1 tvg-id="" tvg-name="Canal 3 - Pinamar" tvg-logo="https://yt3.ggpht.com/a-/AN66SAzbSEtTNz0DswfRiIUk_GoXBS2_1Hqbmq5CIQ=s900-mo-c-c0xffffffff-rj-k-no" group-title="ARGENTINA",Canal 3 - Pinamar
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/183
#EXTINF:-1 tvg-id="" tvg-name="Canal 4 - Esquel" tvg-logo="http://www.canal4tv.net/assets/images/canal4-233x128.jpg" group-title="ARGENTINA",Canal 4 - Esquel
http://streaming.arcast.com.ar:1935/canal4esquel/canal4esquel/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 4 - Jujuy" tvg-logo="https://pbs.twimg.com/profile_images/732661005952618496/5pxo5q9h_400x400.jpg" group-title="ARGENTINA",Canal 4 - Jujuy
https://5cd577a3dd8ec.streamlock.net/CAMARAS/live6/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 4 BVC - Bahía Blanca" tvg-logo="http://cablenoticias.com.ar/wp-content/themes/news-mix-lite/images/logoC4.png" group-title="ARGENTINA",Canal 4 BVC - Bahía Blanca
https://bvclive1.boldmss.com/BVC_HD/BVC_HD.isml/BVC_HD.m3u8?dvr_window_length=60
#EXTINF:-1 tvg-id="" tvg-name="Canal 4 - Posadas" tvg-logo="https://canalcuatroposadas.com.ar/wp-content/uploads/2024/02/logo-web.png" group-title="ARGENTINA",Canal 4 - Posadas
https://iptv.ixfo.com.ar:30443/live-HD/C4POS/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 6 - Moreno" tvg-logo="https://image.winudf.com/v2/image1/Y29tLmFwcC5jYW5hbDZtb3Jlbm9hcHBva19zY3JlZW5fM18xNTUxMjA4MjkzXzAzMg/screen-3.jpg?fakeurl=1&type=.jpg" group-title="ARGENTINA",Canal 6 - Moreno
http://streaming.arcast.com.ar:1935/canal6moreno/canal6moreno/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 7 - Catamarca" tvg-logo="http://catamarcartv.com/wp-content/uploads/2013/11/Logo-canal-Nosotros.png" group-title="ARGENTINA",Canal 7 - Catamarca
https://stream.arcast.com.ar/canal7catamarca/ngrp:canal7catamarca_all/playlist.m3u8?DVR
#EXTINF:-1 tvg-id="" tvg-name="Canal 7 - Jujuy" tvg-logo="https://cdn.m3u.cl/logo/264_Canal_7_Jujuy.png" group-title="ARGENTINA",Canal 7 - Jujuy
https://stream.arcast.live/canal7jujuy/ngrp:canal7jujuy_all/chunklist_w2024774353_b1146880.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 9 Litoral - Entre Ríos" tvg-logo="http://fatpren.org.ar/wp-content/uploads/2017/04/canal9-240417.jpg" group-title="ARGENTINA",Canal 9 Litoral - Entre Ríos
https://stream.arcast.live/canal9litoral/ngrp:canal9litoral_all/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 9 Multivisión - Salta" tvg-logo="http://multivision.tv/wp-content/uploads/2018/08/HOR-HD.png" group-title="ARGENTINA",Canal 9 Multivisión - Salta
http://panel.dattalive.com:1935/8250/8250/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 10 - Córdoba" tvg-logo="https://i.imgur.com/87WCHtd.png" group-title="ARGENTINA",Canal 10 - Córdoba
https://stream.arcast.net:4443/canal10/ngrp:canal10_all/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 10 - Río Negro" tvg-logo="https://lh3.googleusercontent.com/jlRhaWLvnAjzr7XgcUvsNXYFYlwiQ7c2P9AR7UPyC-zG-XnOuZo6kxbJoml0hsWVnA=s180" group-title="ARGENTINA",Canal 10 - Río Negro
https://panel.dattalive.com/8204/8204/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 10 - Salta" tvg-logo="https://el10tv.com/wp-content/uploads/2022/10/cropped-logo-1.png" group-title="ARGENTINA",Canal 10 - Salta
https://restreamer.el10tv.com/memfs/725003c4-79c2-4565-8311-f429db4f7777.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 11 Lapacho - Formosa" tvg-logo="https://www.lapachotv.com.ar/wp-content/uploads/2018/04/marca_web_1.png" group-title="ARGENTINA",Canal 11 Lapacho - Formosa
https://vivo.solumedia.com:19360/lapacho/lapacho.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 12 - Madryn TV" tvg-logo="https://4.bp.blogspot.com/-_1R4AhZ0Wj8/TsUMruA9iJI/AAAAAAAAV2w/6MSs421aY98/s1600/logocanal12.png" group-title="ARGENTINA",Canal 12 - Madryn TV
https://5f700d5b2c46f.streamlock.net/madryntv/madryntv/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 13 - La Rioja" tvg-logo="https://pbs.twimg.com/profile_images/527086915544027139/U_NBWuTA_400x400.jpeg" group-title="ARGENTINA",Canal 13 - La Rioja
http://arcast.net:1935/mp/mp/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Canal 13 Max - Corrientes" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/f/f4/Logo_13max_HD.png" group-title="ARGENTINA",Canal 13 Max - Corrientes
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/157
#EXTINF:-1 tvg-id="" tvg-name="Cadena 103" tvg-logo="http://arcast.com.ar/cadena103/wp-content/uploads/2017/07/logofoot.png" group-title="ARGENTINA",Cadena 103
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30356
#EXTINF:-1 tvg-id="" tvg-name="Canal 50 Morteros" tvg-logo="https://canal50.tv/public/images/logos/CANAL50_HDBLANCO.png" group-title="ARGENTINA",Canal 50 Morteros
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30357
#EXTINF:-1 tvg-id="" tvg-name="Ciudad TV" tvg-logo="https://www.ciudadtv.ar/storage/2023/04/Redes-Base-CiudadTV-05-222x82.png" group-title="ARGENTINA",Ciudad TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30358
#EXTINF:-1 tvg-id="" tvg-name="Canal 4 Telecondor" tvg-logo="https://i.postimg.cc/tTY6Cgy5/condor.jpg" group-title="ARGENTINA",Canal 4 Telecondor
https://videostream.shockmedia.com.ar:19360/canal4telecondor/canal4telecondor.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Gen TV (CABA)" tvg-logo="https://i.postimg.cc/xCZ3zMHQ/gen-caba.jpg" group-title="ARGENTINA",Gen TV (CABA)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/37488
#EXTINF:-1 tvg-id="" tvg-name="Milennio TV" tvg-logo="https://i.postimg.cc/nzJcLsyF/milenn.jpg" group-title="ARGENTINA",Milennio TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49552
#EXTINF:-1 tvg-id="" tvg-name="Canal 79 Mar del Plata" tvg-logo="https://tvonlinegratis.com/wp-content/uploads/2014/06/canal79-logo-300x300.jpg" group-title="ARGENTINA",Canal 79 Mar del Plata
https://streamconex.com:1936/mardelplata/mardelplata/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="5TV" tvg-logo="" group-title="ARGENTINA",5TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51985
#EXTINF:-1 tvg-id="" tvg-name="Nortevision" tvg-logo="https://www.nortevision.es/wp-content/uploads/cropped-FACEBOOKK-VINETA-v7.png" group-title="ARGENTINA",Nortevision
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51986
#EXTINF:-1 tvg-id="" tvg-name="Canal 13 Jujuy" tvg-logo="" group-title="ARGENTINA",Canal 13 Jujuy
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51987
#EXTINF:-1 tvg-id="" tvg-name="Canal 20 Villamaria" tvg-logo="" group-title="ARGENTINA",Canal 20 Villamaria
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51990
#EXTINF:-1 tvg-id="" tvg-name="Canal 21 TV" tvg-logo="" group-title="ARGENTINA",Canal 21 TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51991
#EXTINF:-1 tvg-id="" tvg-name="Canal 22 Web - Buenos Aires" tvg-logo="https://canal22web.com/wp-content/uploads/2024/05/logo-canal-22-letras-blancas-xs.png" group-title="ARGENTINA",Canal 22 Web - Buenos Aires
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51992
#EXTINF:-1 tvg-id="EL TRECE.ar" tvg-name="El Trece (Web)" tvg-logo="https://4.bp.blogspot.com/-qbC3LvpmKVM/Ufm9YzqCi6I/AAAAAAAAAJw/CHVpYurVoMI/s1600/Logo_Canal_Trece_actual1.png" group-title="ARGENTINA",El Trece (Web)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/45669
#EXTINF:-1 tvg-id="TN.ar" tvg-name="TN op.1" tvg-logo="https://i.imgur.com/vFwPhPS.png" group-title="ARGENTINA",TN op.1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/72756
#EXTINF:-1 tvg-id="" tvg-name="Quatro TV" tvg-logo="https://cdn.m3u.cl/logo/286_Quatro_TV.png" group-title="ARGENTINA",Quatro TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/75190
#EXTINF:-1 tvg-id="" tvg-name="San Luis+" tvg-logo="https://static.wikia.nocookie.net/logopedia/images/5/57/San_Luis_%2B_%28Logo_2024%29.png" group-title="ARGENTINA",San Luis+
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/79890
#EXTINF:-1 tvg-id="CANAL 9 TELEVIDA.ar" tvg-name="Canal 9 Televida | Mendoza" tvg-logo="https://cdn.m3u.cl/logo/309_Canal_9_Televida.png" group-title="ARGENTINA",Canal 9 Televida | Mendoza
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/75130
#EXTINF:-1 tvg-id="" tvg-name="Agofa TV - Rosario" tvg-logo="https://agofatv.com.ar/wp-content/uploads/2024/09/AGOFA_TV.png" group-title="ARGENTINA",Agofa TV - Rosario
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81935
#EXTINF:-1 tvg-id="" tvg-name="Neo TV" tvg-logo="https://i.imgur.com/Xtu85tb.png" group-title="ARGENTINA",Neo TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/69881
#EXTINF:-1 tvg-id="" tvg-name="Avivamiento TV " tvg-logo="https://i.postimg.cc/1Rc5rN22/Avivamiento.png" group-title="COLOMBIA",Avivamiento TV 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/19631
#EXTINF:-1 tvg-id="CaliTV.co" tvg-name="Cali Tv" tvg-logo="https://i.postimg.cc/7L2qGCSB/CaliTV2.png" group-title="COLOMBIA",Cali Tv
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/19632
#EXTINF:-1 tvg-id="Canal Institucional.co" tvg-name="Canal Insitucional" tvg-logo="https://lh3.googleusercontent.com/-7A8sit9InV0/XzghOGQu8QI/AAAAAAAA4X4/9FutdpnVfwg0pZ6e258mTpljbB1RtHvagCK8BGAsYHg/s0/2020-08-15.png" group-title="COLOMBIA",Canal Insitucional
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13321
#EXTINF:-1 tvg-id="Canal 1.co" tvg-name="Canal 1" tvg-logo="https://i.ibb.co/7pMZ9gg/1.png" group-title="COLOMBIA",Canal 1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/36067
#EXTINF:-1 tvg-id="Canal 1.co" tvg-name="Canal 1 HD" tvg-logo="https://i.ibb.co/7pMZ9gg/1.png" group-title="COLOMBIA",Canal 1 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56581
#EXTINF:-1 tvg-id="" tvg-name="Canal TDI" tvg-logo="https://cdn.colombia.com/canales/tdi-colombia-4792.jpg" group-title="COLOMBIA",Canal TDI
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/19633
#EXTINF:-1 tvg-id="Canal TRO.co" tvg-name="Canal TRO" tvg-logo="https://lh3.googleusercontent.com/-fpmZty2YwYo/XzghYb0Ii5I/AAAAAAAA4X8/pFIdyPz9X-Uaj2c-1TYEoVx0sG2Gob1WwCK8BGAsYHg/s0/2020-08-15.png" group-title="COLOMBIA",Canal TRO
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/54979
#EXTINF:-1 tvg-id="" tvg-name="Canal Vision Dorada" tvg-logo="https://cdn.colombia.com/canales/canal-vision-dorada-2371.jpg" group-title="COLOMBIA",Canal Vision Dorada
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2616
#EXTINF:-1 tvg-id="Canal TR3CE.co" tvg-name="Canal Tr3ce" tvg-logo="https://i.imgur.com/jySvMsw.png" group-title="COLOMBIA",Canal Tr3ce
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2614
#EXTINF:-1 tvg-id="" tvg-name="Caracol Noticias" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Noticias_Caracol_imagotype.svg/1200px-Noticias_Caracol_imagotype.svg.png" group-title="COLOMBIA",Caracol Noticias
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13322
#EXTINF:-1 tvg-id="Caracol.co" tvg-name="Caracol  1" tvg-logo="https://i.postimg.cc/52gv3ynd/caracol.png" group-title="COLOMBIA",Caracol  1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2369
#EXTINF:-1 tvg-id="I156.18567.schedulesdirect.org" tvg-name="Caracol 2" tvg-logo="https://i.postimg.cc/52gv3ynd/caracol.png" group-title="COLOMBIA",Caracol 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30606
#EXTINF:-1 tvg-id="Caracol HD.co" tvg-name="Caracol HD" tvg-logo="https://i.postimg.cc/52gv3ynd/caracol.png" group-title="COLOMBIA",Caracol HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/38211
#EXTINF:-1 tvg-id="I156.18567.schedulesdirect.org" tvg-name="Caracol FHD" tvg-logo="https://i.postimg.cc/52gv3ynd/caracol.png" group-title="COLOMBIA",Caracol FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/38210
#EXTINF:-1 tvg-id="I134.39719.schedulesdirect.org" tvg-name="Caracol Internacional" tvg-logo="https://i.ibb.co/jTPvRbf/int.jpg" group-title="COLOMBIA",Caracol Internacional
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30720
#EXTINF:-1 tvg-id="Citytv.co" tvg-name="City TV" tvg-logo="" group-title="COLOMBIA",City TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2373
#EXTINF:-1 tvg-id="" tvg-name="CNC Medellín" tvg-logo="http://canalcncmedellin.com/recursos/images/logo_cnc.png" group-title="COLOMBIA",CNC Medellín
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13328
#EXTINF:-1 tvg-id="" tvg-name="CNC Pasto" tvg-logo="http://www.cncpasto.com/wp-content/uploads/2018/04/Untitled-1.png" group-title="COLOMBIA",CNC Pasto
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13330
#EXTINF:-1 tvg-id="" tvg-name="Cosmovisión" tvg-logo="https://www.cosmovision.tv/dayparting-assets/undefined-show.jpg" group-title="COLOMBIA",Cosmovisión
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13326
#EXTINF:-1 tvg-id="Canal Capital.co" tvg-name="Canal Capital" tvg-logo="https://conexioncapital.co/wp-content/uploads/2020/03/logo-canal-2020e.png" group-title="COLOMBIA",Canal Capital
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30363
#EXTINF:-1 tvg-id="" tvg-name="CTV" tvg-logo="https://lh3.googleusercontent.com/-HEzkYTo02Rk/Xzgh99tP4iI/AAAAAAAA4YQ/mTot01o9dXAeWSFyVaHucohKWQSBIcEVgCK8BGAsYHg/s0/2020-08-15.jpg" group-title="COLOMBIA",CTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30364
#EXTINF:-1 tvg-id="" tvg-name="Eureka" tvg-logo="https://s3.amazonaws.com/imagenes.conexioncapital.co/wp-content/uploads/2021/06/29232153/logo-eureka-new-1.png" group-title="COLOMBIA",Eureka
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51030
#EXTINF:-1 tvg-id="NTN24.co" tvg-name="NTN24" tvg-logo="https://imagenes.noticiasrcn.com/ImgNoticias/styles/530xauto/s3/noticias/ntn24.jpg" group-title="COLOMBIA",NTN24
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2374
#EXTINF:-1 tvg-id="" tvg-name="Noticiero 90 Minutos" tvg-logo="https://i2.paste.pics/711d250f609782c10c5afef0d9628632.png" group-title="COLOMBIA",Noticiero 90 Minutos
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13327
#EXTINF:-1 tvg-id="" tvg-name="Oasis TV" tvg-logo="https://lh3.googleusercontent.com/-412AERiYMxI/YKQhU6rdR0I/AAAAAAABCYU/dIiDILugmbA8oKWQjiJuQCUlFD44BctuwCK8BGAsYHg/s512/2021-05-18.jpg" group-title="COLOMBIA",Oasis TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13324
#EXTINF:-1 tvg-id="RCN HD.co" tvg-name="RCN " tvg-logo="https://i.postimg.cc/264Sq3GW/rcn.png" group-title="COLOMBIA",RCN 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7112
#EXTINF:-1 tvg-id="RCN HD.co" tvg-name="RCN HD" tvg-logo="https://i.postimg.cc/264Sq3GW/rcn.png" group-title="COLOMBIA",RCN HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30679
#EXTINF:-1 tvg-id="RCN HD.co" tvg-name="RCN FHD" tvg-logo="https://i.postimg.cc/264Sq3GW/rcn.png" group-title="COLOMBIA",RCN FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/44540
#EXTINF:-1 tvg-id="RCN Novelas.co" tvg-name="RCN Novelas" tvg-logo="https://i.ibb.co/Kx2HwGP/rc.png" group-title="COLOMBIA",RCN Novelas
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30612
#EXTINF:-1 tvg-id="" tvg-name="RCN Más+" tvg-logo="https://www.cxtv.com.br/img/Tvs/Logo/webp-l/e4170c37a43492253041d788cd353786.webp" group-title="COLOMBIA",RCN Más+
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57151
#EXTINF:-1 tvg-id="Señal Colombia.co" tvg-name="Señal Colombia HD" tvg-logo="https://cdn.m3u.cl/logo/128_Senal_Colombia.png" group-title="COLOMBIA",Señal Colombia HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51027
#EXTINF:-1 tvg-id="" tvg-name="Suram TV HD" tvg-logo="https://i.postimg.cc/bv8mbWtK/LOGO-SURAM.png" group-title="COLOMBIA",Suram TV HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/19635
#EXTINF:-1 tvg-id="Telemedellín HD.co" tvg-name="Tele Medellin" tvg-logo="https://i.postimg.cc/QCRbMyDY/telemedellin.png" group-title="COLOMBIA",Tele Medellin
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/19636
#EXTINF:-1 tvg-id="Teleantioquia HD.co" tvg-name="Teleantioquia " tvg-logo="https://1.bp.blogspot.com/-1tWrFwjBSfI/WIYTBL-JGnI/AAAAAAAAkbU/7OnJUIEkW247d5amflFaGh86fBRAkq4ggCLcB/w1200-h630-p-k-no-nu/large.Teleantioquia.png.5e54041611d5b156482d93ff8c2f0bd2.png" group-title="COLOMBIA",Teleantioquia 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31854
#EXTINF:-1 tvg-id="Telecafe.co" tvg-name="Telecafé" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/7/7f/Telecafe2017.png" group-title="COLOMBIA",Telecafé
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2377
#EXTINF:-1 tvg-id="Telecaribe.co" tvg-name="Telecaribe" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/4/41/Telecaribe2017.png" group-title="COLOMBIA",Telecaribe
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2378
#EXTINF:-1 tvg-id="" tvg-name="Telecaribe2" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/4/41/Telecaribe2017.png" group-title="COLOMBIA",Telecaribe2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48451
#EXTINF:-1 tvg-id="Teleislas.co" tvg-name="Teleislas" tvg-logo="https://i.postimg.cc/XNTmq2s0/Teleislas.png" group-title="COLOMBIA",Teleislas
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13323
#EXTINF:-1 tvg-id="" tvg-name="Tele Familia" tvg-logo="" group-title="COLOMBIA",Tele Familia
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48452
#EXTINF:-1 tvg-id="" tvg-name="Telemusica HD" tvg-logo="https://i.postimg.cc/3rDfsXYf/telenusica.png" group-title="COLOMBIA",Telemusica HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/19637
#EXTINF:-1 tvg-id="Telepacifico.co" tvg-name="Telepacifico" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/f/fe/Telepac%C3%ADfico.png" group-title="COLOMBIA",Telepacifico
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2617
#EXTINF:-1 tvg-id="" tvg-name="TV Peñol" tvg-logo="https://lh3.googleusercontent.com/-IjTc4ETC9nM/YJrm_HJajaI/AAAAAAABCPA/SwuODmd0rtIduTCeQniwOaSBvR_YqDykgCK8BGAsYHg/s512/2021-05-11.png" group-title="COLOMBIA",TV Peñol
https://stmv1.voxtvhd.com.br/tvpenol/tvpenol/chunklist_w101353964.m3u8
#EXTINF:-1 tvg-id="" tvg-name="TDI" tvg-logo="https://lh3.googleusercontent.com/-vyt5Jhg2zHM/Xzgifjcw9EI/AAAAAAAA4Yo/w6AHqx1V86URrFxDMQ7mjNIZ9b97NbjswCK8BGAsYHg/s0/2020-08-15.jpg" group-title="COLOMBIA",TDI
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51029
#EXTINF:-1 tvg-id="" tvg-name="Tu Universo Tv" tvg-logo="https://www.cxtv.com.br/img/Tvs/Logo/webp-m/739a50b1dceef6584293d88b88d1ec92.webp" group-title="COLOMBIA",Tu Universo Tv
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52926
#EXTINF:-1 tvg-id="" tvg-name="VEO TV" tvg-logo="https://cdn.m3u.cl/logo/1157_Veo_TV.png" group-title="COLOMBIA",VEO TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/19634
#EXTINF:-1 tvg-id="Cablenoticias.co" tvg-name="Cablenoticias" tvg-logo="https://i.imgur.com/FfhOGR9.png" group-title="COLOMBIA",Cablenoticias
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/67064
#EXTINF:-1 tvg-id="" tvg-name="Canal 2 - Cali" tvg-logo="https://www.canal2.co/wp-content/uploads/2015/11/cropped-logo-master-PNG-300x300.png" group-title="COLOMBIA",Canal 2 - Cali
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76555
#EXTINF:-1 tvg-id="Señal Colombia.co" tvg-name="Señal Colombia SD" tvg-logo="https://cdn.m3u.cl/logo/128_Senal_Colombia.png" group-title="COLOMBIA",Señal Colombia SD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/74949
#EXTINF:-1 tvg-id="" tvg-name="Mi Música Popular" tvg-logo="https://perezacevedo.com/wp-content/uploads/2023/07/blog-verano.jpg" group-title="COLOMBIA",Mi Música Popular
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76958
#EXTINF:-1 tvg-id="" tvg-name="Cantina TV" tvg-logo="https://cdn.m3u.cl/logo/1221_Cantina_TV.png" group-title="COLOMBIA",Cantina TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/74754
#EXTINF:-1 tvg-id="" tvg-name="La Kalle TV" tvg-logo="https://static.wikia.nocookie.net/logopedia/images/c/cf/Lakallecol.png" group-title="COLOMBIA",La Kalle TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81018
#EXTINF:-1 tvg-id="Citytv.co" tvg-name="City TV HD" tvg-logo="" group-title="COLOMBIA",City TV HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81207
#EXTINF:-1 tvg-id="" tvg-name="Entel Tv " tvg-logo="" group-title="BOLIVIA",Entel Tv 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81522
#EXTINF:-1 tvg-id="AandE.cl" tvg-name="A&E" tvg-logo="https://vignette.wikia.nocookie.net/newlogosfake/images/7/7e/A%26E_Network_2004.png" group-title="CINE",A&E
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7046
#EXTINF:-1 tvg-id="I607.71743.schedulesdirect.org" tvg-name="A&E HD" tvg-logo="https://vignette.wikia.nocookie.net/newlogosfake/images/7/7e/A%26E_Network_2004.png" group-title="CINE",A&E HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2432
#EXTINF:-1 tvg-id="AMC.cl" tvg-name="AMC" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/AMC_logo_2016.png/640px-AMC_logo_2016.png" group-title="CINE",AMC
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7047
#EXTINF:-1 tvg-id="I1210.91817.schedulesdirect.org" tvg-name="AMC HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/AMC_logo_2016.png/640px-AMC_logo_2016.png" group-title="CINE",AMC HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2619
#EXTINF:-1 tvg-id="AXN.cl" tvg-name="AXN" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/axn.png" group-title="CINE",AXN
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7048
#EXTINF:-1 tvg-id="I209.26083.schedulesdirect.org" tvg-name="AXN HD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/axn.png" group-title="CINE",AXN HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2620
#EXTINF:-1 tvg-id="AXNWhite.us" tvg-name="AXN Movies HD" tvg-logo="https://static.wikia.nocookie.net/logopedia/images/7/7c/Axn_movies_ca.png" group-title="CINE",AXN Movies HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29513
#EXTINF:-1 tvg-id="Az Cinema.cl" tvg-name="Az Cinema" tvg-logo="https://live.staticflickr.com/1704/25634859013_a66a77b084_w.jpg" group-title="CINE",Az Cinema
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14135
#EXTINF:-1 tvg-id="CINECANAL.ar" tvg-name="Cinecanal" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/cinecanal.png" group-title="CINE",Cinecanal
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7054
#EXTINF:-1 tvg-id="I93.67920.schedulesdirect.org" tvg-name="Cinecanal HD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/cinecanal.png" group-title="CINE",Cinecanal HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2622
#EXTINF:-1 tvg-id="CinemaxSouth.us" tvg-name="Cinemax " tvg-logo="https://www.ushuaiavision.com.ar/images/canales/cinemax.png" group-title="CINE",Cinemax 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2623
#EXTINF:-1 tvg-id="CINEMAX HD.ar" tvg-name="Cinemax HD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/cinemax.png" group-title="CINE",Cinemax HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50833
#EXTINF:-1 tvg-id="Cinelatino.pe" tvg-name="Cine Latino" tvg-logo="https://s3.castbox.fm/29/e1/43/98e45d48d39a208a4d9dd5c2f0.png" group-title="CINE",Cine Latino
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49062
#EXTINF:-1 tvg-id="CinemaDinamita.mx" tvg-name="Cinema Dinamita" tvg-logo="https://pbs.twimg.com/media/CKoz2slVAAAaSEB.png" group-title="CINE",Cinema Dinamita
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49384
#EXTINF:-1 tvg-id="" tvg-name="Cinema Disney Family" tvg-logo="https://i.pinimg.com/564x/85/28/a7/8528a75f13fbf7c4482ac68007abfd8e.jpg" group-title="CINE",Cinema Disney Family
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48949
#EXTINF:-1 tvg-id="" tvg-name="Cinema Disney " tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/36/Disney_cinema_logo.png" group-title="CINE",Cinema Disney 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49063
#EXTINF:-1 tvg-id="" tvg-name="Cinema Familia " tvg-logo="https://i.pinimg.com/564x/49/e2/d7/49e2d72c9a05d3ee6cf346bc891ced9f.jpg" group-title="CINE",Cinema Familia 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6883
#EXTINF:-1 tvg-id="CanalHollywood.es" tvg-name="Canal Hollywood" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/HWD_logo.svg/1200px-HWD_logo.svg.png" group-title="CINE",Canal Hollywood
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29483
#EXTINF:-1 tvg-id="" tvg-name="Clover Channel" tvg-logo="https://cloverchannel.com/wp-content/uploads/2023/12/Clover_7.png" group-title="CINE",Clover Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/79927
#EXTINF:-1 tvg-id="" tvg-name="+Cine" tvg-logo="https://cdn.m3u.cl/logo/1435__Cine.png" group-title="CINE",+Cine
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51765
#EXTINF:-1 tvg-id="I489.16288.schedulesdirect.org" tvg-name="De Película" tvg-logo="https://cdn.mitvstatic.com/channels/cl_de-pelicula_m.png" group-title="CINE",De Película
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2624
#EXTINF:-1 tvg-id="I442.74016.schedulesdirect.org" tvg-name="De Película Plus" tvg-logo="https://1000marcas.net/wp-content/uploads/2022/01/De-Pelicula-Plus-Logo-2017.png" group-title="CINE",De Película Plus
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2625
#EXTINF:-1 tvg-id="" tvg-name="De Película Clásico" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/30/De_Pel%C3%ADcula_Cl%C3%A1sico.png" group-title="CINE",De Película Clásico
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14716
#EXTINF:-1 tvg-id="" tvg-name="Dreamworks" tvg-logo="https://www.thedailytelevision.com/sites/default/files/notas/imagenes/interior/dreamworks_grande_1.jpg" group-title="CINE",Dreamworks
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56978
#EXTINF:-1 tvg-id="I1515.99979.schedulesdirect.org" tvg-name="Europa Europa " tvg-logo="https://www.lincolnonline.com.ar/archivos/tv/184.png" group-title="CINE",Europa Europa 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2626
#EXTINF:-1 tvg-id="FilmArtsPanregional.us" tvg-name="Film & Arts" tvg-logo="http://1.bp.blogspot.com/_YkZZPo1aKZU/St0Z_LWhnvI/AAAAAAAALJw/mHFmlgr1Cf0/s400/film_arts.jpg" group-title="CINE",Film & Arts
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2627
#EXTINF:-1 tvg-id="FILM AND ARTS.ar" tvg-name="Film & Arts HD" tvg-logo="http://1.bp.blogspot.com/_YkZZPo1aKZU/St0Z_LWhnvI/AAAAAAAALJw/mHFmlgr1Cf0/s400/film_arts.jpg" group-title="CINE",Film & Arts HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56693
#EXTINF:-1 tvg-id="FX.ar" tvg-name="FX" tvg-logo="https://vignette.wikia.nocookie.net/iceagefanon/images/d/d7/Fx-logo.png/revision/latest?cb=20151205215619" group-title="CINE",FX
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30432
#EXTINF:-1 tvg-id="FX.ar" tvg-name="FX HD" tvg-logo="https://vignette.wikia.nocookie.net/iceagefanon/images/d/d7/Fx-logo.png/revision/latest?cb=20151205215619" group-title="CINE",FX HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2636
#EXTINF:-1 tvg-id="GOLDEN HD.co" tvg-name="Golden" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Logo_Golden_TV.svg/180px-Logo_Golden_TV.svg.png" group-title="CINE",Golden
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2638
#EXTINF:-1 tvg-id="GOLDEN EDGE.co" tvg-name="Golden Edge" tvg-logo="http://1.bp.blogspot.com/-3h0AASjOe10/VbVd3tZ5JrI/AAAAAAAAESA/uX-yz5HDPmA/s1600/GOLDEN%2BEDGE.png" group-title="CINE",Golden Edge
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2639
#EXTINF:-1 tvg-id="I592.68317.schedulesdirect.org" tvg-name="Golden Plus" tvg-logo="https://i.postimg.cc/Sxd9XyY0/gplus.png" group-title="CINE",Golden Plus
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2640
#EXTINF:-1 tvg-id="Golden Premier HD.co" tvg-name="Golden Premier" tvg-logo="https://cdn.mitvstatic.com/channels/co_golden-premier-hd_m.png" group-title="CINE",Golden Premier
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49061
#EXTINF:-1 tvg-id="I436.68317.schedulesdirect.org" tvg-name="Golden Premier 2" tvg-logo="https://i.ibb.co/vspxFtD/descarga.png" group-title="CINE",Golden Premier 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/53388
#EXTINF:-1 tvg-id="HBO.cl" tvg-name="HBO" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7010
#EXTINF:-1 tvg-id="HBO.cl" tvg-name="HBO HD" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2642
#EXTINF:-1 tvg-id="HBO 2.ar" tvg-name="HBO 2" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7011
#EXTINF:-1 tvg-id="HBO 2.cl" tvg-name="HBO 2 HD" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO 2 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2643
#EXTINF:-1 tvg-id="HBO FAMILY.ar" tvg-name="HBO Family" tvg-logo="https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/HBO_Family_Asia_logo.svg/512px-HBO_Family_Asia_logo.svg.png" group-title="CINE",HBO Family
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7013
#EXTINF:-1 tvg-id="HBO Family.cl" tvg-name="HBO Family HD" tvg-logo="https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/HBO_Family_Asia_logo.svg/512px-HBO_Family_Asia_logo.svg.png" group-title="CINE",HBO Family HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2644
#EXTINF:-1 tvg-id="HBO MUNDI.ar" tvg-name="HBO Mundi " tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Mundi 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/15618
#EXTINF:-1 tvg-id="HBO MUNDI.ar" tvg-name="HBO Mundi  HD" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Mundi  HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30415
#EXTINF:-1 tvg-id="HBO PLUS.ar" tvg-name="HBO Plus" tvg-logo="https://cdn.mitvstatic.com/channels/ar_hbo-plus-este_m.png" group-title="CINE",HBO Plus
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7012
#EXTINF:-1 tvg-id="HBO PLUS HD.ar" tvg-name="HBO Plus HD" tvg-logo="https://cdn.mitvstatic.com/channels/ar_hbo-plus-este_m.png" group-title="CINE",HBO Plus HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2645
#EXTINF:-1 tvg-id="HBO POP HD.ar" tvg-name="HBO Pop " tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Pop 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/15619
#EXTINF:-1 tvg-id="HBO POP HD.ar" tvg-name="HBO Pop HD" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Pop HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30416
#EXTINF:-1 tvg-id="HBO SIGNATURE.ar" tvg-name="HBO Signature" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Signature
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7014
#EXTINF:-1 tvg-id="HBO Signature.cl" tvg-name="HBO Signature HD" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Signature HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2646
#EXTINF:-1 tvg-id="HBO XTREME.ar" tvg-name="HBO Xtreme" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Xtreme
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30625
#EXTINF:-1 tvg-id="HBO XTREME.ar" tvg-name="HBO Xtreme HD" tvg-logo="https://seeklogo.com/images/H/HBO-logo-49E64C6314-seeklogo.com.png" group-title="CINE",HBO Xtreme HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2695
#EXTINF:-1 tvg-id="AMCPanregional.us" tvg-name="Movistar Cine" tvg-logo="" group-title="CINE",Movistar Cine
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2647
#EXTINF:-1 tvg-id="" tvg-name="MultiPremier" tvg-logo="https://multipremier.com/wp-content/uploads/2020/10/mp-1.png" group-title="CINE",MultiPremier
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/77337
#EXTINF:-1 tvg-id="" tvg-name="Netflix Cinema 1" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" group-title="CINE",Netflix Cinema 1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51451
#EXTINF:-1 tvg-id="" tvg-name="Netflix Cinema 2" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" group-title="CINE",Netflix Cinema 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51452
#EXTINF:-1 tvg-id="" tvg-name="Netflix Cinema 3" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" group-title="CINE",Netflix Cinema 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51453
#EXTINF:-1 tvg-id="" tvg-name="Netflix Cinema 4" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" group-title="CINE",Netflix Cinema 4
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51454
#EXTINF:-1 tvg-id="" tvg-name="Netflix Cinema 5" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" group-title="CINE",Netflix Cinema 5
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51455
#EXTINF:-1 tvg-id="" tvg-name="Disney Cinema 1" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/36/Disney_cinema_logo.png" group-title="CINE",Disney Cinema 1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51456
#EXTINF:-1 tvg-id="" tvg-name="Disney Cinema 2" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/36/Disney_cinema_logo.png" group-title="CINE",Disney Cinema 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51457
#EXTINF:-1 tvg-id="" tvg-name="Disney Cinema 3" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/36/Disney_cinema_logo.png" group-title="CINE",Disney Cinema 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51458
#EXTINF:-1 tvg-id="" tvg-name="Orbit TV" tvg-logo="http://dominicanchannels.com/wp-content/uploads/2014/10/orbit-tv-1.png" group-title="CINE",Orbit TV
https://vdo2.streamgato.us:3670/live/orbittvlive.m3u8
#EXTINF:-1 tvg-id="Paramount Network.cl" tvg-name="Paramount Channel" tvg-logo="https://i.ya-webdesign.com/images/paramount-pictures-logo-png-14.png" group-title="CINE",Paramount Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/4884
#EXTINF:-1 tvg-id="PARAMOUNT CHANNEL.ar" tvg-name="Paramount Channel HD" tvg-logo="https://i.ya-webdesign.com/images/paramount-pictures-logo-png-14.png" group-title="CINE",Paramount Channel HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30626
#EXTINF:-1 tvg-id="Panico.mx" tvg-name="Panico Tv" tvg-logo="https://i.ibb.co/1fCF2yZ/10449923-671832862898253-3650884333216094980-n.jpg" group-title="CINE",Panico Tv
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/27625
#EXTINF:-1 tvg-id="" tvg-name="Prime Video" tvg-logo="https://cinetvymas.cl/wp-content/uploads/2023/08/amazon-prime-chile.png" group-title="CINE",Prime Video
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2657
#EXTINF:-1 tvg-id="" tvg-name="Plex Indie" tvg-logo="https://i.postimg.cc/pXnNZzXr/plex.jpg" group-title="CINE",Plex Indie
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7001
#EXTINF:-1 tvg-id="" tvg-name="Plex Movie" tvg-logo="https://i.postimg.cc/pXnNZzXr/plex.jpg" group-title="CINE",Plex Movie
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7002
#EXTINF:-1 tvg-id="" tvg-name="Plex Retro" tvg-logo="https://i.postimg.cc/pXnNZzXr/plex.jpg" group-title="CINE",Plex Retro
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7003
#EXTINF:-1 tvg-id="STAR CHANNEL HD.ar" tvg-name="Star Channel" tvg-logo="https://i.postimg.cc/Y0KsKMk5/st-ch.png" group-title="CINE",Star Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7015
#EXTINF:-1 tvg-id="STAR CHANNEL HD.ar" tvg-name="Star Channel HD" tvg-logo="https://i.postimg.cc/Y0KsKMk5/st-ch.png" group-title="CINE",Star Channel HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2628
#EXTINF:-1 tvg-id="SonyChannelMexico.mx" tvg-name="Sony " tvg-logo="https://la.sonychannel.com/sites/all/themes/responsive/responsive_sony_channel/logo.png" group-title="CINE",Sony 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2648
#EXTINF:-1 tvg-id="SONY HD.ar" tvg-name="Sony HD" tvg-logo="https://la.sonychannel.com/sites/all/themes/responsive/responsive_sony_channel/logo.png" group-title="CINE",Sony HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30414
#EXTINF:-1 tvg-id="CineSony.us" tvg-name="Sony Cine" tvg-logo="https://pbs.twimg.com/profile_images/1356336769801670657/FPYpB4S7_400x400.jpg" group-title="CINE",Sony Cine
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52273
#EXTINF:-1 tvg-id="SONY MOVIES.ar" tvg-name="Sony Movies " tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Sony_Movies_Logo.svg/512px-Sony_Movies_Logo.svg.png" group-title="CINE",Sony Movies 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/72017
#EXTINF:-1 tvg-id="SPACE.ar" tvg-name="Space" tvg-logo="https://3.bp.blogspot.com/-ifCagZ77nfw/W6ls2LsJInI/AAAAAAAAAN0/_I_JmomLjTQi9WTGmoACu3q4mRNmJW03wCPcBGAYYCw/s1600/space.png" group-title="CINE",Space
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/47856
#EXTINF:-1 tvg-id="SPACE HD.ar" tvg-name="Space HD" tvg-logo="https://3.bp.blogspot.com/-ifCagZ77nfw/W6ls2LsJInI/AAAAAAAAAN0/_I_JmomLjTQi9WTGmoACu3q4mRNmJW03wCPcBGAYYCw/s1600/space.png" group-title="CINE",Space HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2649
#EXTINF:-1 tvg-id="STUDIO UNIVERSAL HD.ar" tvg-name="Studio Universal " tvg-logo="http://3.bp.blogspot.com/-KDeHIqXKzfQ/ThNLgA6wOlI/AAAAAAAAPyE/W9XoHa0HkuU/s1600/studiouniversal.png" group-title="CINE",Studio Universal 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2658
#EXTINF:-1 tvg-id="STUDIO UNIVERSAL.ar" tvg-name="Studio Universal HD" tvg-logo="http://3.bp.blogspot.com/-KDeHIqXKzfQ/ThNLgA6wOlI/AAAAAAAAPyE/W9XoHa0HkuU/s1600/studiouniversal.png" group-title="CINE",Studio Universal HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30627
#EXTINF:-1 tvg-id="USA.co" tvg-name="USA" tvg-logo="https://static.wikia.nocookie.net/world-of-media/images/3/36/USA_Network_logo.png" group-title="CINE",USA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2660
#EXTINF:-1 tvg-id="USA.co" tvg-name="USA HD" tvg-logo="https://static.wikia.nocookie.net/world-of-media/images/3/36/USA_Network_logo.png" group-title="CINE",USA HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30628
#EXTINF:-1 tvg-id="" tvg-name="Showtime West " tvg-logo="https://static.wixstatic.com/media/e72c62_f88f950900fe4505b0a725a0382045c9~mv2.png" group-title="CINE",Showtime West 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14717
#EXTINF:-1 tvg-id="" tvg-name="Showtime Beyond" tvg-logo="https://static.wixstatic.com/media/e72c62_f88f950900fe4505b0a725a0382045c9~mv2.png" group-title="CINE",Showtime Beyond
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30725
#EXTINF:-1 tvg-id="" tvg-name="Showtime East " tvg-logo="https://static.wixstatic.com/media/e72c62_f88f950900fe4505b0a725a0382045c9~mv2.png" group-title="CINE",Showtime East 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30726
#EXTINF:-1 tvg-id="" tvg-name="Showtime Extreme " tvg-logo="https://static.wixstatic.com/media/e72c62_f88f950900fe4505b0a725a0382045c9~mv2.png" group-title="CINE",Showtime Extreme 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30727
#EXTINF:-1 tvg-id="" tvg-name="Starz Action " tvg-logo="http://digipalms.com/images/starz-logo.png" group-title="CINE",Starz Action 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2654
#EXTINF:-1 tvg-id="" tvg-name="Starz Family" tvg-logo="http://digipalms.com/images/starz-logo.png" group-title="CINE",Starz Family
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6884
#EXTINF:-1 tvg-id="" tvg-name="Starz Cinema " tvg-logo="http://digipalms.com/images/starz-logo.png" group-title="CINE",Starz Cinema 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2650
#EXTINF:-1 tvg-id="" tvg-name="Starz Classic " tvg-logo="https://seeklogo.com/images/S/star-classics-logo-DA1825A08D-seeklogo.com.png" group-title="CINE",Starz Classic 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2655
#EXTINF:-1 tvg-id="" tvg-name="Starz Comedy " tvg-logo="http://digipalms.com/images/starz-logo.png" group-title="CINE",Starz Comedy 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2651
#EXTINF:-1 tvg-id="" tvg-name="Starz Kids & Family " tvg-logo="http://digipalms.com/images/starz-logo.png" group-title="CINE",Starz Kids & Family 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2653
#EXTINF:-1 tvg-id="" tvg-name="Starz Oeste HD" tvg-logo="http://digipalms.com/images/starz-logo.png" group-title="CINE",Starz Oeste HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6886
#EXTINF:-1 tvg-id="" tvg-name="Starz Suspense " tvg-logo="http://digipalms.com/images/starz-logo.png" group-title="CINE",Starz Suspense 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2656
#EXTINF:-1 tvg-id="TNT.ar" tvg-name="TNT" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/TNT_TV_logo.svg/1200px-TNT_TV_logo.svg.png" group-title="CINE",TNT
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/82030
#EXTINF:-1 tvg-id="TNT HD.ar" tvg-name="TNT HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/TNT_TV_logo.svg/1200px-TNT_TV_logo.svg.png" group-title="CINE",TNT HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57187
#EXTINF:-1 tvg-id="TNT SERIES HD.ar" tvg-name="TNT Series" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/6/62/TNT_Serie_Logo_2016.png" group-title="CINE",TNT Series
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57188
#EXTINF:-1 tvg-id="TNT NOVELAS.ar" tvg-name="TNT Novelas" tvg-logo="https://www.anda.cl/wp-content/uploads/2023/05/TNTNovelas_SPA.jpg" group-title="CINE",TNT Novelas
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57189
#EXTINF:-1 tvg-id="TCM.ar" tvg-name="TCM" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/e/ef/Turner_Classic_Movies_%28TCM%2C_Latin_America%29_-_2015_logo.png" group-title="CINE",TCM
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2662
#EXTINF:-1 tvg-id="" tvg-name="Ultra Kidz" tvg-logo="https://i.postimg.cc/YCwmfMmq/hqdefault.jpg" group-title="CINE",Ultra Kidz
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/23668
#EXTINF:-1 tvg-id="" tvg-name="Ultra Cine " tvg-logo="https://assets.cdn.olympusat.com/wp-content/uploads/UltraCine_NLogo.png" group-title="CINE",Ultra Cine 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5688
#EXTINF:-1 tvg-id="" tvg-name="Ultra Familia " tvg-logo="https://assets.cdn.olympusat.com/wp-content/uploads/UltraFamilia_NLogo.png" group-title="CINE",Ultra Familia 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5691
#EXTINF:-1 tvg-id="" tvg-name="+Cine" tvg-logo="https://assets.cdn.olympusat.com/wp-content/uploads/UltraFilm_NLogo.png" group-title="CINE",+Cine
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5687
#EXTINF:-1 tvg-id="UNIVERSAL CHANNEL HD.co" tvg-name="Universal Channel" tvg-logo="http://1.bp.blogspot.com/-vZ7-rkLTaQA/TgeZExzxYcI/AAAAAAAABpM/ZtVIi2OJm2o/s1600/Universal+Channel+logo+2010.png" group-title="CINE",Universal Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7051
#EXTINF:-1 tvg-id="UNIVERSAL CHANNEL HD.co" tvg-name="Universal Channel HD" tvg-logo="http://1.bp.blogspot.com/-vZ7-rkLTaQA/TgeZExzxYcI/AAAAAAAABpM/ZtVIi2OJm2o/s1600/Universal+Channel+logo+2010.png" group-title="CINE",Universal Channel HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2665
#EXTINF:-1 tvg-id="UniversalCinema.us" tvg-name="Universal Cinema" tvg-logo="https://www.universalplus.com/assets/logo_cinema_hero.png" group-title="CINE",Universal Cinema
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50467
#EXTINF:-1 tvg-id="UniversalCinema.us" tvg-name="Universal Cinema 2" tvg-logo="https://www.universalplus.com/assets/logo_cinema_hero.png" group-title="CINE",Universal Cinema 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50835
#EXTINF:-1 tvg-id="UniversalCrimeEast.us" tvg-name="Universal Crime" tvg-logo="https://www.universalplus.com/assets/logo_crime_hero.png" group-title="CINE",Universal Crime
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50468
#EXTINF:-1 tvg-id="" tvg-name="Universal Comedy" tvg-logo="https://www.universalplus.com/assets/logo_comedy_hero.png" group-title="CINE",Universal Comedy
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56568
#EXTINF:-1 tvg-id="UniversalComedy.us" tvg-name="Universal Comedy HD" tvg-logo="https://www.universalplus.com/assets/logo_comedy_hero.png" group-title="CINE",Universal Comedy HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50469
#EXTINF:-1 tvg-id="" tvg-name="Universal Premiere" tvg-logo="https://www.universalplus.com/assets/logo_premiere_hero.png" group-title="CINE",Universal Premiere
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56569
#EXTINF:-1 tvg-id="UniversalPremiereEast.us" tvg-name="Universal Premiere HD" tvg-logo="https://www.universalplus.com/assets/logo_premiere_hero.png" group-title="CINE",Universal Premiere HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50470
#EXTINF:-1 tvg-id="UniversalReality.us" tvg-name="Universal Reality" tvg-logo="https://www.universalplus.com/assets/logo_reality_hero.png" group-title="CINE",Universal Reality
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50466
#EXTINF:-1 tvg-id="Warner Channel.cl" tvg-name="Warner Channel" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/5/5e/Warner2018LA.png" group-title="CINE",Warner Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7049
#EXTINF:-1 tvg-id="WARNER CHANNEL HD.ar" tvg-name="Warner Channel HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/5/5e/Warner2018LA.png" group-title="CINE",Warner Channel HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2666
#EXTINF:-1 tvg-id="" tvg-name="My Time Movie Network - En Español" tvg-logo="https://i.imgur.com/pw4NZK1.png" group-title="CINE",My Time Movie Network - En Español
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/69792
#EXTINF:-1 tvg-id="" tvg-name="TV Retro" tvg-logo="https://image.roku.com/developer_channels/prod/57ab74c4faa79c70ed4ac4a5e84e17dc731fbded16d330e3bf320a4613a9f5e6.png" group-title="CINE",TV Retro
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76552
#EXTINF:-1 tvg-id="" tvg-name="RetroX" tvg-logo="https://www.vivalivetv.com/public/files/shows/0/1/3033-294x165-FFFFFF.jpg" group-title="CINE",RetroX
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76558
#EXTINF:-1 tvg-id="" tvg-name="Top Cine" tvg-logo="https://latinartv.com/sites/default/files/styles/poster/public/logos/top-cine.jpg" group-title="CINE",Top Cine
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/72786
#EXTINF:-1 tvg-id="" tvg-name="Cine Romantico" tvg-logo="https://img3.static-ottera.com/prod/cnm/linear_channel/thumbnails/widescreen/960x540/linear-cine-romantico.jpg" group-title="CINE",Cine Romantico
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76560
#EXTINF:-1 tvg-id="" tvg-name="Terror TV" tvg-logo="https://cdn.m3u.cl/logo/1420_Terror_TV.png" group-title="CINE",Terror TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/75670
#EXTINF:-1 tvg-id="I34.90324.schedulesdirect.org" tvg-name="Dark " tvg-logo="https://www.movistar.es/estaticos/imagenes/tv-ocio/imagenes/logos-tv/140x114/dark.jpg" group-title="OTROS",Dark 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/67762
#EXTINF:-1 tvg-id="" tvg-name="Netflix Cinema 6" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/2048px-Netflix_icon.svg.png" group-title="CINE",Netflix Cinema 6
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50733
#EXTINF:-1 tvg-id="I160.58452.schedulesdirect.org" tvg-name="USA Network" tvg-logo="http://mhc.banhtml.com/wp-content/uploads/2016/02/2000px-USA_Network_logo_2006.svg.png" group-title="CINE",USA Network
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6693
#EXTINF:-1 tvg-id="ANIMAL PLANET HD.ar" tvg-name="Animal Planet " tvg-logo="https://e7.pngegg.com/pngimages/694/46/png-clipart-animal-planet-logo-icons-logos-emojis-iconic-brands.png" group-title="CULTURA",Animal Planet 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2454
#EXTINF:-1 tvg-id="ANIMAL PLANET HD.ar" tvg-name="Animal Planet HD" tvg-logo="https://www.newslinereport.com/online/nota_animal-planet-renueva-su-imagen-en-america-latina.jpg" group-title="CULTURA",Animal Planet HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2685
#EXTINF:-1 tvg-id="CGTN Español HD.uy" tvg-name="CGTN en Español" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/9/9c/CGTN_Espanol.png" group-title="CULTURA",CGTN en Español
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6
#EXTINF:-1 tvg-id="DISCOVERY CHANNEL HD.ar" tvg-name="Discovery Channel" tvg-logo="http://img1.wikia.nocookie.net/__cb20141027100430/logopedia/images/b/bd/Discovery_Channel_logo.png" group-title="CULTURA",Discovery Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2455
#EXTINF:-1 tvg-id="DISCOVERY CHANNEL HD.ar" tvg-name="Discovery Channel HD" tvg-logo="http://img1.wikia.nocookie.net/__cb20141027100430/logopedia/images/b/bd/Discovery_Channel_logo.png" group-title="CULTURA",Discovery Channel HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2686
#EXTINF:-1 tvg-id="" tvg-name="Discovery Familia" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Discovery_Familia_logo_%282%29.svg/1200px-Discovery_Familia_logo_%282%29.svg.png" group-title="CULTURA",Discovery Familia
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/37281
#EXTINF:-1 tvg-id="I382.46609.schedulesdirect.org" tvg-name="Discovery Familia HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Discovery_Familia_logo_%282%29.svg/1200px-Discovery_Familia_logo_%282%29.svg.png" group-title="CULTURA",Discovery Familia HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2456
#EXTINF:-1 tvg-id="DISCOVERY HOME AND HEALTH HD.ar" tvg-name="Discovery Home & Health" tvg-logo="https://assets-global.website-files.com/605a3cacba514a77ca2e6ab5/6065f6924cdade706debff8d_homeandhealth.png" group-title="CULTURA",Discovery Home & Health
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2457
#EXTINF:-1 tvg-id="DISCOVERY HOME AND HEALTH HD.ar" tvg-name="Discovery Home & Health HD" tvg-logo="https://assets-global.website-files.com/605a3cacba514a77ca2e6ab5/6065f6924cdade706debff8d_homeandhealth.png" group-title="CULTURA",Discovery Home & Health HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2687
#EXTINF:-1 tvg-id="DISCOVERY ID HD.ar" tvg-name="Discovery Investigation " tvg-logo="https://upload.wikimedia.org/wikipedia/commons/d/d5/Idlogo2016.png" group-title="CULTURA",Discovery Investigation 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30608
#EXTINF:-1 tvg-id="DISCOVERY ID HD.ar" tvg-name="Discovery Investigation HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/d/d5/Idlogo2016.png" group-title="CULTURA",Discovery Investigation HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2458
#EXTINF:-1 tvg-id="DISCOVERY SCIENCE.ar" tvg-name="Discovery Science " tvg-logo="https://www.skymedia.co.uk/wp-content/uploads/2016/01/channel-logo-discovery-science.png" group-title="CULTURA",Discovery Science 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30609
#EXTINF:-1 tvg-id="DISCOVERY SCIENCE.ar" tvg-name="Discovery Science HD" tvg-logo="https://www.skymedia.co.uk/wp-content/uploads/2016/01/channel-logo-discovery-science.png" group-title="CULTURA",Discovery Science HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2459
#EXTINF:-1 tvg-id="DISCOVERY THEATER HD.ar" tvg-name="Discovery Theater" tvg-logo="https://vignette.wikia.nocookie.net/tvcable/images/b/b4/LOGO_THEATER_BLACK1.png/revision/latest?cb=20150325154716&path-prefix=es" group-title="CULTURA",Discovery Theater
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/38519
#EXTINF:-1 tvg-id="Discovery Theater.cl" tvg-name="Discovery Theater HD" tvg-logo="https://vignette.wikia.nocookie.net/tvcable/images/b/b4/LOGO_THEATER_BLACK1.png/revision/latest?cb=20150325154716&path-prefix=es" group-title="CULTURA",Discovery Theater HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2460
#EXTINF:-1 tvg-id="DISCOVERY TURBO.ar" tvg-name="Discovery Turbo" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Discovery_Turbo_logo.svg/1280px-Discovery_Turbo_logo.svg.png" group-title="CULTURA",Discovery Turbo
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2462
#EXTINF:-1 tvg-id="DISCOVERY TURBO.ar" tvg-name="Discovery Turbo HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Discovery_Turbo_logo.svg/1280px-Discovery_Turbo_logo.svg.png" group-title="CULTURA",Discovery Turbo HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2690
#EXTINF:-1 tvg-id="DISCOVERY WORLD HD.ar" tvg-name="Discovery World " tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/World_Discovery_HD_logo.svg/1200px-World_Discovery_HD_logo.svg.png" group-title="CULTURA",Discovery World 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30610
#EXTINF:-1 tvg-id="DISCOVERY WORLD HD.ar" tvg-name="Discovery World HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/World_Discovery_HD_logo.svg/1200px-World_Discovery_HD_logo.svg.png" group-title="CULTURA",Discovery World HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/4891
#EXTINF:-1 tvg-id="H2 HD.ar" tvg-name="H2" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/d/d1/H2_channel_logo.PNG" group-title="CULTURA",H2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2463
#EXTINF:-1 tvg-id="H2 HD.ar" tvg-name="H2 HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/d/d1/H2_channel_logo.PNG" group-title="CULTURA",H2 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50969
#EXTINF:-1 tvg-id="H2 HD.ar" tvg-name="H2 FHD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/d/d1/H2_channel_logo.PNG" group-title="CULTURA",H2 FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30470
#EXTINF:-1 tvg-id="HISTORY HD.ar" tvg-name="History" tvg-logo="https://i.postimg.cc/C57MNtWL/histiry.png" group-title="CULTURA",History
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7062
#EXTINF:-1 tvg-id="HISTORY HD.ar" tvg-name="History HD" tvg-logo="https://i.postimg.cc/C57MNtWL/histiry.png" group-title="CULTURA",History HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2464
#EXTINF:-1 tvg-id="HISTORY HD.ar" tvg-name="History FHD" tvg-logo="https://i.postimg.cc/C57MNtWL/histiry.png" group-title="CULTURA",History FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2691
#EXTINF:-1 tvg-id="HGTV.ar" tvg-name="HGTV" tvg-logo="https://i.ibb.co/yFWQjGt/descarga.png" group-title="CULTURA",HGTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30822
#EXTINF:-1 tvg-id="" tvg-name="Love Nature HD" tvg-logo="https://2.bp.blogspot.com/-WXbh7TcBGoo/W4WLHuVLzLI/AAAAAAABLvM/yUaNuY9jgaQ1tm44c1x_ScT0A3U15oudQCLcBGAs/s1600/brand_love-nature.jpg" group-title="CULTURA",Love Nature HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51512
#EXTINF:-1 tvg-id="NAT GEO.ar" tvg-name="National Geographic" tvg-logo="https://i.ibb.co/gzxhzPf/2560px-National-Geographic-Logo-svg.png" group-title="CULTURA",National Geographic
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2465
#EXTINF:-1 tvg-id="NAT GEO.ar" tvg-name="National Geographic HD" tvg-logo="https://i.ibb.co/gzxhzPf/2560px-National-Geographic-Logo-svg.png" group-title="CULTURA",National Geographic HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30611
#EXTINF:-1 tvg-id="National Geographic Wild.pe" tvg-name="Nat Geo WILD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/nat_geo_wild.png" group-title="CULTURA",Nat Geo WILD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2466
#EXTINF:-1 tvg-id="National Geographic Wild.pe" tvg-name="Nat Geo WILD FHD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/nat_geo_wild.png" group-title="CULTURA",Nat Geo WILD FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2692
#EXTINF:-1 tvg-id="" tvg-name="Nat Geo Mundo" tvg-logo="https://p1.hiclipart.com/preview/323/20/6/tv-channel-icons-pack-nat-geo-mundo-color-png-icon.jpg" group-title="CULTURA",Nat Geo Mundo
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76057
#EXTINF:-1 tvg-id="" tvg-name="INTI" tvg-logo="https://digitaltv.prensariozone.com/wp-content/uploads/2021/10/IntiLogo2021ok-768x404.png" group-title="CULTURA",INTI
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57148
#EXTINF:-1 tvg-id="TLC.cl" tvg-name="Discovery TLC HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/TLC_Logo_Germany.svg/800px-TLC_Logo_Germany.svg.png" group-title="CULTURA",Discovery TLC HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/128784
#EXTINF:-1 tvg-id="TLC.bo" tvg-name="Discovery TLC" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/TLC_Logo_Germany.svg/800px-TLC_Logo_Germany.svg.png" group-title="CULTURA",Discovery TLC
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/128785
#EXTINF:-1 tvg-id="" tvg-name="Eventos Especiales" tvg-logo="https://static-assets.bamgrid.com/product/starplus/images/share-default.d72cf588f6d06cba22171f5ae44289d3.png" group-title="DEPORTES",Eventos Especiales
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50562
#EXTINF:-1 tvg-id="" tvg-name="Eventos Deportivos Disney+" tvg-logo="https://www.eazycityblog.com/wp-content/uploads/2016/05/Wikinews_Sports.png" group-title="DEPORTES",Eventos Deportivos Disney+
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/55037
#EXTINF:-1 tvg-id="" tvg-name="All Sports" tvg-logo="https://i.ibb.co/Fz7qRJb/images-q-tbn-ANd9-Gc-Re7pv-Dq-T6-Vqh-L1p-M2j-O8lp-Dphw-BWAytlep-Qw-usqp-CAU.jpg" group-title="DEPORTES",All Sports
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31755
#EXTINF:-1 tvg-id="" tvg-name="LA LIGA" tvg-logo="https://i.ibb.co/J5qrZJ5/meta-image.jpg" group-title="DEPORTES",LA LIGA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81751
#EXTINF:-1 tvg-id="I1.91203.schedulesdirect.org" tvg-name="BEIN SPORTS LIGA" tvg-logo="https://i.postimg.cc/05nYKLDg/bein-nor.jpg" group-title="DEPORTES",BEIN SPORTS LIGA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3419
#EXTINF:-1 tvg-id="" tvg-name="Bein Sports Ñ" tvg-logo="https://i.postimg.cc/65QdrYf8/bein-es.jpg" group-title="DEPORTES",Bein Sports Ñ
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3061
#EXTINF:-1 tvg-id="" tvg-name="Bein Sports Extra" tvg-logo="https://img.sport-tv-guide.live/images/stations/a1164.png" group-title="DEPORTES",Bein Sports Extra
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51476
#EXTINF:-1 tvg-id="" tvg-name="Bein Sports USA" tvg-logo="https://i.postimg.cc/05nYKLDg/bein-nor.jpg" group-title="DEPORTES",Bein Sports USA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/37457
#EXTINF:-1 tvg-id="" tvg-name="Bein Sports Xtra" tvg-logo="https://i.postimg.cc/05nYKLDg/bein-nor.jpg" group-title="DEPORTES",Bein Sports Xtra
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51370
#EXTINF:-1 tvg-id="" tvg-name="Bein Sports 4" tvg-logo="https://i.postimg.cc/05nYKLDg/bein-nor.jpg" group-title="DEPORTES",Bein Sports 4
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76983
#EXTINF:-1 tvg-id="TNT Sports Premium HD.cl" tvg-name="TN Sports Premium" tvg-logo="https://i.ibb.co/sp4wTqb/descarga.png" group-title="DEPORTES",TN Sports Premium
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57154
#EXTINF:-1 tvg-id="TNT Sports Premium.cl" tvg-name="TN Sports Premium SD" tvg-logo="https://i.ibb.co/sp4wTqb/descarga.png" group-title="DEPORTES",TN Sports Premium SD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57155
#EXTINF:-1 tvg-id="TNT Sports Premium.cl" tvg-name="TN Sports Premium HD" tvg-logo="https://i.ibb.co/sp4wTqb/descarga.png" group-title="DEPORTES",TN Sports Premium HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57156
#EXTINF:-1 tvg-id="TNT Sports Premium HD.cl" tvg-name="TN Sports Premium FHD" tvg-logo="https://i.ibb.co/sp4wTqb/descarga.png" group-title="DEPORTES",TN Sports Premium FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81707
#EXTINF:-1 tvg-id="TNT Sports.cl" tvg-name="TN Sports SD" tvg-logo="https://i.postimg.cc/y8YqmCkM/TN1.png" group-title="DEPORTES",TN Sports SD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57160
#EXTINF:-1 tvg-id="TNT Sports.cl" tvg-name="TN Sports  HD" tvg-logo="https://i.postimg.cc/y8YqmCkM/TN1.png" group-title="DEPORTES",TN Sports  HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57161
#EXTINF:-1 tvg-id="TNT SPORTS.ar" tvg-name=" TN Argentina" tvg-logo="https://i.postimg.cc/y8YqmCkM/TN1.png" group-title="DEPORTES", TN Argentina
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57162
#EXTINF:-1 tvg-id="TNT SPORTS.ar" tvg-name="TN Argentina HD" tvg-logo="https://i.postimg.cc/y8YqmCkM/TN1.png" group-title="DEPORTES",TN Argentina HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57163
#EXTINF:-1 tvg-id="CDO Básico.cl" tvg-name="CDO" tvg-logo="https://i.postimg.cc/XvNCGb6T/CDO-250.jpg" group-title="DEPORTES",CDO
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3117
#EXTINF:-1 tvg-id="CDO Premium.cl" tvg-name="CDO 2" tvg-logo="https://i.postimg.cc/6QHGCm9T/cdo.jpg" group-title="DEPORTES",CDO 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/9399
#EXTINF:-1 tvg-id="" tvg-name="Combate (Brasil)" tvg-logo="https://www.exorbeo.com/wp-content/uploads/2013/07/canal-combate.jpg" group-title="DEPORTES",Combate (Brasil)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14128
#EXTINF:-1 tvg-id="CLARO SPORTS HD.co" tvg-name="Claro Sports" tvg-logo="https://i.ibb.co/YTYgjGx/d.png" group-title="DEPORTES",Claro Sports
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/39993
#EXTINF:-1 tvg-id="CLARO SPORTS HD.co" tvg-name="Claro Sports HD" tvg-logo="https://i.ibb.co/YTYgjGx/d.png" group-title="DEPORTES",Claro Sports HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/39994
#EXTINF:-1 tvg-id="DirecTVSportsArgentina.ar" tvg-name="Direc*TV SP (Arg)" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES",Direc*TV SP (Arg)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/47580
#EXTINF:-1 tvg-id="DirecTVSportsArgentina.ar" tvg-name="Direc*TV SP HD (arg)" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES",Direc*TV SP HD (arg)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/33608
#EXTINF:-1 tvg-id="AmericaTV.ar" tvg-name="Direc*TV SP (Chi)" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES",Direc*TV SP (Chi)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31759
#EXTINF:-1 tvg-id="AMCPanregional.us" tvg-name="Direc*TV SP HD (Chi)" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES",Direc*TV SP HD (Chi)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51491
#EXTINF:-1 tvg-id="" tvg-name="Direc*TV SP (Col)" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES",Direc*TV SP (Col)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52452
#EXTINF:-1 tvg-id="" tvg-name="Direc*TV SP (Ecu)" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES",Direc*TV SP (Ecu)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56979
#EXTINF:-1 tvg-id="DirecTVSportsPlus.us" tvg-name="Direc*TV SP +" tvg-logo="https://i.postimg.cc/3J0QRgcj/D.png" group-title="DEPORTES",Direc*TV SP +
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31761
#EXTINF:-1 tvg-id="AmericaTV.ar" tvg-name="Direc*TV SP + HD" tvg-logo="https://i.postimg.cc/3J0QRgcj/D.png" group-title="DEPORTES",Direc*TV SP + HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/32680
#EXTINF:-1 tvg-id="DirecTVSports2.us" tvg-name="Direc*TV SP 2" tvg-logo="https://i.postimg.cc/Wbkwt36q/D2.png" group-title="DEPORTES",Direc*TV SP 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31760
#EXTINF:-1 tvg-id="DirecTVSports2.us" tvg-name="Direc*TV SP 2 HD" tvg-logo="https://i.postimg.cc/Wbkwt36q/D2.png" group-title="DEPORTES",Direc*TV SP 2 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/37484
#EXTINF:-1 tvg-id="DirecTVSportsFight.us" tvg-name="Direc*TV SP FIGHT" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES",Direc*TV SP FIGHT
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52506
#EXTINF:-1 tvg-id="ESPN.ar" tvg-name="ES*PN ARG 1 " tvg-logo="https://i.postimg.cc/gkRW1qcD/e748f3c0-3f7c-3088-a90a-0ccb2588e0ed.png" group-title="DEPORTES",ES*PN ARG 1 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51157
#EXTINF:-1 tvg-id="ESPN.ar" tvg-name="ES*PN ARG 1 HD" tvg-logo="https://i.postimg.cc/gkRW1qcD/e748f3c0-3f7c-3088-a90a-0ccb2588e0ed.png" group-title="DEPORTES",ES*PN ARG 1 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51155
#EXTINF:-1 tvg-id="ESPN.ar" tvg-name="ES*PN ARG 1 FHD" tvg-logo="https://i.postimg.cc/gkRW1qcD/e748f3c0-3f7c-3088-a90a-0ccb2588e0ed.png" group-title="DEPORTES",ES*PN ARG 1 FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51154
#EXTINF:-1 tvg-id="ESPN 2.ar" tvg-name="ES*PN ARG 2 " tvg-logo="https://i.postimg.cc/DZK8nWWp/espn2.png" group-title="DEPORTES",ES*PN ARG 2 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51158
#EXTINF:-1 tvg-id="ESPN 2.ar" tvg-name="ES*PN ARG 2 HD" tvg-logo="https://i.postimg.cc/DZK8nWWp/espn2.png" group-title="DEPORTES",ES*PN ARG 2 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51156
#EXTINF:-1 tvg-id="ESPN 2.ar" tvg-name="ES*PN ARG 2 FHD" tvg-logo="https://i.postimg.cc/DZK8nWWp/espn2.png" group-title="DEPORTES",ES*PN ARG 2 FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5600
#EXTINF:-1 tvg-id="ESPN 3.ar" tvg-name="ES*PN ARG 3" tvg-logo="https://i.postimg.cc/wvc3v6Lq/espn3.png" group-title="DEPORTES",ES*PN ARG 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5601
#EXTINF:-1 tvg-id="ESPN 3.ar" tvg-name="ES*PN ARG 3 HD" tvg-logo="https://i.postimg.cc/wvc3v6Lq/espn3.png" group-title="DEPORTES",ES*PN ARG 3 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31026
#EXTINF:-1 tvg-id="ESPN PREMIUM.ar" tvg-name="Es*pn Premium Argentina" tvg-logo="https://static.wikia.nocookie.net/logopedia/images/5/5a/ESPN_Premium_%28red_and_white%29_2022.png" group-title="DEPORTES",Es*pn Premium Argentina
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6463
#EXTINF:-1 tvg-id="ESPN PREMIUM.ar" tvg-name="Es*pn Premium Argentina HD" tvg-logo="https://static.wikia.nocookie.net/logopedia/images/5/5a/ESPN_Premium_%28red_and_white%29_2022.png" group-title="DEPORTES",Es*pn Premium Argentina HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3085
#EXTINF:-1 tvg-id="ESPN 4.cl" tvg-name="ES*PN 4" tvg-logo="https://i.postimg.cc/Dfcvzc3w/61a4c896fc740bb1476f0225-LOGO-ESPN4-2.png" group-title="DEPORTES",ES*PN 4
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50373
#EXTINF:-1 tvg-id="ESPN 4.cl" tvg-name="ES*PN 4 HD" tvg-logo="https://i.postimg.cc/Dfcvzc3w/61a4c896fc740bb1476f0225-LOGO-ESPN4-2.png" group-title="DEPORTES",ES*PN 4 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50372
#EXTINF:-1 tvg-id="ESPN 5.cl" tvg-name="ES*PN 5" tvg-logo="https://www.tumundo.cl/wp-content/uploads/2022/11/Proyecto-nuevo-1.png" group-title="DEPORTES",ES*PN 5
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52202
#EXTINF:-1 tvg-id="ESPN 5.cl" tvg-name="ES*PN 5 HD" tvg-logo="https://www.tumundo.cl/wp-content/uploads/2022/11/Proyecto-nuevo-1.png" group-title="DEPORTES",ES*PN 5 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76707
#EXTINF:-1 tvg-id="ESPN 6.cl" tvg-name="ES*PN 6" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/ESPN_6_logo.svg/2560px-ESPN_6_logo.svg.png" group-title="DEPORTES",ES*PN 6
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/54541
#EXTINF:-1 tvg-id="ESPN 6.cl" tvg-name="ES*PN 6 HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/ESPN_6_logo.svg/2560px-ESPN_6_logo.svg.png" group-title="DEPORTES",ES*PN 6 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3084
#EXTINF:-1 tvg-id="ESPN 7.cl" tvg-name="ES*PN 7" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/ESPN_7_logo.svg/2560px-ESPN_7_logo.svg.png" group-title="DEPORTES",ES*PN 7
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/37134
#EXTINF:-1 tvg-id="ESPN 7.cl" tvg-name="ES*PN 7 HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/ESPN_7_logo.svg/2560px-ESPN_7_logo.svg.png" group-title="DEPORTES",ES*PN 7 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3083
#EXTINF:-1 tvg-id="ESPN HD.cl" tvg-name="ES*PN Chile" tvg-logo="https://i.postimg.cc/3wGdsjwD/espn.png" group-title="DEPORTES",ES*PN Chile
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50968
#EXTINF:-1 tvg-id="ESPN HD.cl" tvg-name="ES*PN Chile HD" tvg-logo="https://i.postimg.cc/3wGdsjwD/espn.png" group-title="DEPORTES",ES*PN Chile HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51270
#EXTINF:-1 tvg-id="ESPN Premium.cl" tvg-name="Es*pn Premium Chile" tvg-logo="https://static.wikia.nocookie.net/logopedia/images/5/5a/ESPN_Premium_%28red_and_white%29_2022.png" group-title="DEPORTES",Es*pn Premium Chile
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81532
#EXTINF:-1 tvg-id="ESPN 2.cl" tvg-name="ES*PN 2 Chile HD" tvg-logo="https://i.postimg.cc/3wGdsjwD/espn.png" group-title="DEPORTES",ES*PN 2 Chile HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/79153
#EXTINF:-1 tvg-id="ESPN.co" tvg-name="ES*PN Colombia" tvg-logo="https://i.postimg.cc/3wGdsjwD/espn.png" group-title="DEPORTES",ES*PN Colombia
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/54850
#EXTINF:-1 tvg-id="AEBrazil.br" tvg-name="ES*PN Extra Brasil" tvg-logo="http://cdn.vizio.com/skin/frontend/enterprise/vizio/landingpages/gamedaylanding2/images/gd-apps-logo-ESPN-extra.png" group-title="DEPORTES",ES*PN Extra Brasil
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14132
#EXTINF:-1 tvg-id="ESPN.co" tvg-name="ES*PN 1 Latino" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1280px-ESPN_wordmark.svg.png" group-title="DEPORTES",ES*PN 1 Latino
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7023
#EXTINF:-1 tvg-id="ESPN.co" tvg-name="ES*PN 1 Latino HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/1280px-ESPN_wordmark.svg.png" group-title="DEPORTES",ES*PN 1 Latino HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/53419
#EXTINF:-1 tvg-id="ESPN 2.co" tvg-name="ES*PN 2 Latino" tvg-logo="https://vignette.wikia.nocookie.net/disney/images/d/d9/2000px-ESPN2_logo.png" group-title="DEPORTES",ES*PN 2 Latino
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7024
#EXTINF:-1 tvg-id="ESPN 2.co" tvg-name="ES*PN 2 Latino HD" tvg-logo="https://vignette.wikia.nocookie.net/disney/images/d/d9/2000px-ESPN2_logo.png" group-title="DEPORTES",ES*PN 2 Latino HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3075
#EXTINF:-1 tvg-id="ESPN 3.co" tvg-name="ES*PN 3 Latino" tvg-logo="http://dshm.tmsimg.com/h3/NowShowing/73833/s73833_h3_aa.png" group-title="DEPORTES",ES*PN 3 Latino
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7025
#EXTINF:-1 tvg-id="ESPN 3 HD.co" tvg-name="ES*PN 3 Latino HD" tvg-logo="http://dshm.tmsimg.com/h3/NowShowing/73833/s73833_h3_aa.png" group-title="DEPORTES",ES*PN 3 Latino HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3077
#EXTINF:-1 tvg-id="ESPNDeportes.us" tvg-name="ES*PN Deportes" tvg-logo="https://espnpressroom.com/us/files/2011/04/RS1129_ESPN_Deportes_CLR_Pos-scr.jpg" group-title="DEPORTES",ES*PN Deportes
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/53387
#EXTINF:-1 tvg-id="ESPN Extra.co" tvg-name="Es*pn Extra" tvg-logo="https://cdn.mitvstatic.com/channels/ar_espn-1_m.png" group-title="DEPORTES",Es*pn Extra
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50010
#EXTINF:-1 tvg-id="ESPN Extra.cl" tvg-name="Es*pn Extra HD" tvg-logo="https://cdn.mitvstatic.com/channels/ar_espn-1_m.png" group-title="DEPORTES",Es*pn Extra HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/54070
#EXTINF:-1 tvg-id="I206.10179.schedulesdirect.org" tvg-name="ES*PN Usa" tvg-logo="https://i.postimg.cc/3wGdsjwD/espn.png" group-title="DEPORTES",ES*PN Usa
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30900
#EXTINF:-1 tvg-id="I207.16485.schedulesdirect.org" tvg-name="ESPN News Usa" tvg-logo="https://i.ibb.co/mC80pL4/espn-news-logo.gif" group-title="DEPORTES",ESPN News Usa
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30902
#EXTINF:-1 tvg-id="Eurosport1.fr" tvg-name="EURO*SPORTS 1" tvg-logo="https://w7.pngwing.com/pngs/917/857/png-transparent-eurosport-1-logo-lyngsat-television-hot-bird-13b-discovery-channel-logo-purple-television-blue.png" group-title="DEPORTES",EURO*SPORTS 1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51159
#EXTINF:-1 tvg-id="Eurosport1.fr" tvg-name="EURO*SPORTS 1 HD" tvg-logo="https://w7.pngwing.com/pngs/917/857/png-transparent-eurosport-1-logo-lyngsat-television-hot-bird-13b-discovery-channel-logo-purple-television-blue.png" group-title="DEPORTES",EURO*SPORTS 1 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51367
#EXTINF:-1 tvg-id="0porMovistarPlus.es" tvg-name="EURO*SPORTS 2" tvg-logo="http://vfes-images.ott.kaltura.com/351be6f3a78f44b6b4673c0b3e3ad570_288X162.png" group-title="DEPORTES",EURO*SPORTS 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3424
#EXTINF:-1 tvg-id="Eurosport2.fr" tvg-name="EURO*SPORTS 2 HD" tvg-logo="http://vfes-images.ott.kaltura.com/351be6f3a78f44b6b4673c0b3e3ad570_288X162.png" group-title="DEPORTES",EURO*SPORTS 2 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51368
#EXTINF:-1 tvg-id="Canal AandE (Ecuador).ec" tvg-name="ECDF" tvg-logo="https://i.postimg.cc/d3KfXstS/el-c-d-f.jpg" group-title="DEPORTES",ECDF
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52252
#EXTINF:-1 tvg-id="" tvg-name="D*AZN 1" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN 1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81516
#EXTINF:-1 tvg-id="" tvg-name="D*AZN 1HD" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN 1HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81513
#EXTINF:-1 tvg-id="" tvg-name="D*AZN 2" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81515
#EXTINF:-1 tvg-id="" tvg-name="D*AZN 2HD" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN 2HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81514
#EXTINF:-1 tvg-id="" tvg-name="D*AZN 3" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81520
#EXTINF:-1 tvg-id="" tvg-name="D*AZN 4" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN 4
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81521
#EXTINF:-1 tvg-id="" tvg-name="D*AZN HD" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81512
#EXTINF:-1 tvg-id="" tvg-name="D*AZN LIGA " tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN LIGA 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81518
#EXTINF:-1 tvg-id="" tvg-name="D*AZN LIGA2" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN LIGA2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81517
#EXTINF:-1 tvg-id="" tvg-name="Fight Time" tvg-logo="https://pbs.twimg.com/profile_images/817806134702702592/fsfGoMK3_400x400.jpg" group-title="DEPORTES",Fight Time
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6915
#EXTINF:-1 tvg-id="" tvg-name="Flow Sports" tvg-logo="https://www.stlucianewsonline.com/wp-content/uploads/2015/11/index.png" group-title="DEPORTES",Flow Sports
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6872
#EXTINF:-1 tvg-id="FOX SPORTS.ar" tvg-name="Fox Sports 1 Argentina " tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Logo_fox_sports_2012.png/640px-Logo_fox_sports_2012.png" group-title="DEPORTES",Fox Sports 1 Argentina 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3082
#EXTINF:-1 tvg-id="FOX SPORTS.ar" tvg-name="Fox Sports 1 Argentina HD " tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Logo_fox_sports_2012.png/640px-Logo_fox_sports_2012.png" group-title="DEPORTES",Fox Sports 1 Argentina HD 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30935
#EXTINF:-1 tvg-id="FOX SPORTS 2.ar" tvg-name="Fox Sports 2 Argentina" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Fox_Sports_2_Argentina_2023.svg/800px-Fox_Sports_2_Argentina_2023.svg.png" group-title="DEPORTES",Fox Sports 2 Argentina
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3086
#EXTINF:-1 tvg-id="FOX SPORTS 2.ar" tvg-name="Fox Sports 2 Argentina HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Fox_Sports_2_Argentina_2023.svg/800px-Fox_Sports_2_Argentina_2023.svg.png" group-title="DEPORTES",Fox Sports 2 Argentina HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76708
#EXTINF:-1 tvg-id="FOX SPORTS 3.ar" tvg-name="Fox Sports 3 Argentina" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Fox_Sports_3_Argentina_2023.svg/1200px-Fox_Sports_3_Argentina_2023.svg.png" group-title="DEPORTES",Fox Sports 3 Argentina
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76709
#EXTINF:-1 tvg-id="FOX SPORTS 3.ar" tvg-name="Fox Sports 3 Argentina HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Fox_Sports_3_Argentina_2023.svg/1200px-Fox_Sports_3_Argentina_2023.svg.png" group-title="DEPORTES",Fox Sports 3 Argentina HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76710
#EXTINF:-1 tvg-id="FOX Sports.co" tvg-name="Fox Sports 1 Latino " tvg-logo="https://i.postimg.cc/5NNj4Ygj/f1lat.png" group-title="DEPORTES",Fox Sports 1 Latino 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3087
#EXTINF:-1 tvg-id="FOX Sports.co" tvg-name="Fox Sports 1 Latino HD" tvg-logo="https://i.postimg.cc/5NNj4Ygj/f1lat.png" group-title="DEPORTES",Fox Sports 1 Latino HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3088
#EXTINF:-1 tvg-id="FOX Sports 2.co" tvg-name="Fox Sports 2 Latino " tvg-logo="https://i.postimg.cc/kg24S0km/f2lat.png" group-title="DEPORTES",Fox Sports 2 Latino 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3089
#EXTINF:-1 tvg-id="FOX Sports 2.co" tvg-name="Fox Sports 2 Latino HD" tvg-logo="https://i.postimg.cc/kg24S0km/f2lat.png" group-title="DEPORTES",Fox Sports 2 Latino HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3090
#EXTINF:-1 tvg-id="FOX Sports 3.co" tvg-name="Fox Sports 3 Latino " tvg-logo="https://i.postimg.cc/DwRzPCTb/f3lat.png" group-title="DEPORTES",Fox Sports 3 Latino 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3091
#EXTINF:-1 tvg-id="FOX Sports 3.co" tvg-name="Fox Sports 3 Latino HD" tvg-logo="https://i.postimg.cc/DwRzPCTb/f3lat.png" group-title="DEPORTES",Fox Sports 3 Latino HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3092
#EXTINF:-1 tvg-id="FOX SPORTS.mx" tvg-name="Fox Sports México HD" tvg-logo="https://i.postimg.cc/g0VFfsf5/fsmx.png" group-title="DEPORTES",Fox Sports México HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5616
#EXTINF:-1 tvg-id="FOX Sports Premium.ar" tvg-name="Fox Sports Premium" tvg-logo="https://i.postimg.cc/G3jHnJkZ/f1ar.png" group-title="DEPORTES",Fox Sports Premium
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52561
#EXTINF:-1 tvg-id="AEBrazil.br" tvg-name="Fox Sports 2 Brasil" tvg-logo="https://i.postimg.cc/zGYhJXyQ/sp-br.png" group-title="DEPORTES",Fox Sports 2 Brasil
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14134
#EXTINF:-1 tvg-id="Fox Sports 1 HD (1652).us" tvg-name="Fox Sports USA" tvg-logo="https://i.postimg.cc/G3jHnJkZ/f1ar.png" group-title="DEPORTES",Fox Sports USA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/77437
#EXTINF:-1 tvg-id="Fox Sports 2 HD (1651).us" tvg-name="Fox Sports 2 USA" tvg-logo="https://i.postimg.cc/G3jHnJkZ/f1ar.png" group-title="DEPORTES",Fox Sports 2 USA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56087
#EXTINF:-1 tvg-id="I1.91203.schedulesdirect.org" tvg-name="Formula 1 HD" tvg-logo="https://soymotor.com/sites/default/files/styles/mega/public/imagenes/noticia/dazn-movistar-f1-television-2021-soymtoor-2.jpg" group-title="DEPORTES",Formula 1 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/38487
#EXTINF:-1 tvg-id="GOL TV.pe" tvg-name="Gol Peru" tvg-logo="https://2.bp.blogspot.com/-usJcxF6gJIg/WUVrMywkyzI/AAAAAAAAAi8/DV9fYjhJyKM5Qzd_HIJQKZ1aB-BXRi6CQCLcBGAs/s1600/gol%2Bperu.jpg" group-title="DEPORTES",Gol Peru
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14029
#EXTINF:-1 tvg-id="GOL TV.pe" tvg-name="Gol Peru HD" tvg-logo="https://2.bp.blogspot.com/-usJcxF6gJIg/WUVrMywkyzI/AAAAAAAAAi8/DV9fYjhJyKM5Qzd_HIJQKZ1aB-BXRi6CQCLcBGAs/s1600/gol%2Bperu.jpg" group-title="DEPORTES",Gol Peru HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3098
#EXTINF:-1 tvg-id="Golf Channel HD.co" tvg-name="Golf Channel USA (ingles)" tvg-logo="https://i.postimg.cc/YSSSbNKy/Daco-2104238.png" group-title="DEPORTES",Golf Channel USA (ingles)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3099
#EXTINF:-1 tvg-id="Golf Channel HD.co" tvg-name="Golf Channel USA (español)" tvg-logo="https://i.postimg.cc/YSSSbNKy/Daco-2104238.png" group-title="DEPORTES",Golf Channel USA (español)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/38903
#EXTINF:-1 tvg-id="" tvg-name="GOLTV" tvg-logo="https://d2po7v53a8yrck.cloudfront.net/static/2/Open/SourceLogos/Cleared%20Logos/GolTV.JPG" group-title="DEPORTES",GOLTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57191
#EXTINF:-1 tvg-id="" tvg-name="GolTV  HD" tvg-logo="https://d2po7v53a8yrck.cloudfront.net/static/2/Open/SourceLogos/Cleared%20Logos/GolTV.JPG" group-title="DEPORTES",GolTV  HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3095
#EXTINF:-1 tvg-id="" tvg-name="Liga 1 Perú" tvg-logo="https://tiermaker.com/images/templates/camisetas-liga1-per-2022-suplente-y-especiales--15374014/153740141665267601.png" group-title="DEPORTES",Liga 1 Perú
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56088
#EXTINF:-1 tvg-id="" tvg-name="Liga 1max" tvg-logo="https://tiermaker.com/images/templates/camisetas-liga1-per-2022-suplente-y-especiales--15374014/153740141665267601.png" group-title="DEPORTES",Liga 1max
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/128114
#EXTINF:-1 tvg-id="" tvg-name="Liga 1 Max Perú" tvg-logo="https://tiermaker.com/images/templates/camisetas-liga1-per-2022-suplente-y-especiales--15374014/153740141665267601.png" group-title="DEPORTES",Liga 1 Max Perú
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56089
#EXTINF:-1 tvg-id="" tvg-name="Liga Hypermotion" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/LaLiga_TV_Hypermotion_2023_Logo.svg/1200px-LaLiga_TV_Hypermotion_2023_Logo.svg.png" group-title="DEPORTES",Liga Hypermotion
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81869
#EXTINF:-1 tvg-id="" tvg-name="Liga Hypermotion 2" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/LaLiga_TV_Hypermotion_2023_Logo.svg/1200px-LaLiga_TV_Hypermotion_2023_Logo.svg.png" group-title="DEPORTES",Liga Hypermotion 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81870
#EXTINF:-1 tvg-id="" tvg-name="Mov*istar Deportes España" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Movistar_Deportes.svg/1280px-Movistar_Deportes.svg.png" group-title="DEPORTES",Mov*istar Deportes España
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3100
#EXTINF:-1 tvg-id="M DEPORTES HD.pe" tvg-name="Mov*istar Deportes Peru" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Movistar_Deportes.svg/1280px-Movistar_Deportes.svg.png" group-title="DEPORTES",Mov*istar Deportes Peru
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3102
#EXTINF:-1 tvg-id="" tvg-name="Mov*istar Vamos" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Movistar_Deportes.svg/1280px-Movistar_Deportes.svg.png" group-title="DEPORTES",Mov*istar Vamos
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30360
#EXTINF:-1 tvg-id="I1.91203.schedulesdirect.org" tvg-name="Mov*istar Golf HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Movistar_Golf.svg/1280px-Movistar_Golf.svg.png" group-title="DEPORTES",Mov*istar Golf HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3103
#EXTINF:-1 tvg-id="" tvg-name="Mov*istar Liga" tvg-logo="" group-title="DEPORTES",Mov*istar Liga
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/105868
#EXTINF:-1 tvg-id="" tvg-name="Mov*istar Liga De Campeones" tvg-logo="" group-title="DEPORTES",Mov*istar Liga De Campeones
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49752
#EXTINF:-1 tvg-id="I213.62081.schedulesdirect.org" tvg-name="MLB Network" tvg-logo="https://i.ibb.co/JxBvMgh/1200px-MLBNetwork-Logo-svg.png" group-title="DEPORTES",MLB Network
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/38900
#EXTINF:-1 tvg-id="" tvg-name="MLB Network 2" tvg-logo="https://i.ibb.co/JxBvMgh/1200px-MLBNetwork-Logo-svg.png" group-title="DEPORTES",MLB Network 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49190
#EXTINF:-1 tvg-id="" tvg-name="MLB Network 3" tvg-logo="https://i.ibb.co/JxBvMgh/1200px-MLBNetwork-Logo-svg.png" group-title="DEPORTES",MLB Network 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49191
#EXTINF:-1 tvg-id="" tvg-name="MLB Network 4" tvg-logo="https://i.ibb.co/JxBvMgh/1200px-MLBNetwork-Logo-svg.png" group-title="DEPORTES",MLB Network 4
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52073
#EXTINF:-1 tvg-id="" tvg-name="MLB Network 5" tvg-logo="https://i.ibb.co/JxBvMgh/1200px-MLBNetwork-Logo-svg.png" group-title="DEPORTES",MLB Network 5
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76978
#EXTINF:-1 tvg-id="" tvg-name="MLB Network 6" tvg-logo="https://i.ibb.co/JxBvMgh/1200px-MLBNetwork-Logo-svg.png" group-title="DEPORTES",MLB Network 6
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76979
#EXTINF:-1 tvg-id="" tvg-name="ML-S" tvg-logo="https://cdn2.mediotiempo.com/uploads/media/2021/06/21/liga-comenzara-finales-marzo-imagen-1.jpg" group-title="DEPORTES",ML-S
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51474
#EXTINF:-1 tvg-id="NBA TV HD.co" tvg-name="NBA TV" tvg-logo="https://sc.dish.com/shared/images/station-logos/NBATV.png" group-title="DEPORTES",NBA TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3104
#EXTINF:-1 tvg-id="NBA TV USA HD (1632).us" tvg-name="NBA Network" tvg-logo="https://sc.dish.com/shared/images/station-logos/NBATV.png" group-title="DEPORTES",NBA Network
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50943
#EXTINF:-1 tvg-id="" tvg-name="NBA (Solo Eventos)" tvg-logo="https://sc.dish.com/shared/images/station-logos/NBATV.png" group-title="DEPORTES",NBA (Solo Eventos)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76980
#EXTINF:-1 tvg-id="I215.58690.schedulesdirect.org" tvg-name="NHL Network" tvg-logo="https://www.seekpng.com/png/full/141-1414099_national-hockey-league-logo-1917-1938-nhl-logo.png" group-title="DEPORTES",NHL Network
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/47581
#EXTINF:-1 tvg-id="NFL Network HD (1630).us" tvg-name="NFL Network" tvg-logo="https://live-tv-channels.org/pt-data/uploads/logo/us-nfl-network-9913.jpg" group-title="DEPORTES",NFL Network
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/43879
#EXTINF:-1 tvg-id="" tvg-name="NFL Channel" tvg-logo="https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/ce/ae/b6/ceaeb6b1-b0c5-1d7a-e9ca-3405a8c933d6/AppIcon-release-1x_U007emarketing-0-7-0-85-220.png/512x512bb.jpg" group-title="DEPORTES",NFL Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/43878
#EXTINF:-1 tvg-id="PremiereClubes.br" tvg-name="Premiere Clube (Brasil)" tvg-logo="http://www.atualeletronica.com.br/sistema/images/01042019-121344-banners-pacotes-premiere.png" group-title="DEPORTES",Premiere Clube (Brasil)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14129
#EXTINF:-1 tvg-id="" tvg-name="PGA Tour" tvg-logo="https://a4.espncdn.com/combiner/i?img=%2Fi%2Fespn%2Fmisc_logos%2F500%2Fpga_tour.png" group-title="DEPORTES",PGA Tour
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51475
#EXTINF:-1 tvg-id="Teletrak.cl" tvg-name="Sporting Club Chile" tvg-logo="https://media.licdn.com/dms/image/C560BAQEMbVBwIAFpqA/company-logo_200_200/0?e=2159024400&v=beta&t=WIFFwrGlCuS3rLWj9Ai3JaogcqpEWmgDv1NQVtq7zVY" group-title="DEPORTES",Sporting Club Chile
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6331
#EXTINF:-1 tvg-id="" tvg-name="STAR +1" tvg-logo="https://static-assets.bamgrid.com/product/starplus/images/share-default.d72cf588f6d06cba22171f5ae44289d3.png" group-title="DEPORTES",STAR +1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50006
#EXTINF:-1 tvg-id="" tvg-name="STAR +2" tvg-logo="https://static-assets.bamgrid.com/product/starplus/images/share-default.d72cf588f6d06cba22171f5ae44289d3.png" group-title="DEPORTES",STAR +2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50007
#EXTINF:-1 tvg-id="" tvg-name="STAR +3" tvg-logo="https://static-assets.bamgrid.com/product/starplus/images/share-default.d72cf588f6d06cba22171f5ae44289d3.png" group-title="DEPORTES",STAR +3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50009
#EXTINF:-1 tvg-id="" tvg-name="STAR +4" tvg-logo="https://static-assets.bamgrid.com/product/starplus/images/share-default.d72cf588f6d06cba22171f5ae44289d3.png" group-title="DEPORTES",STAR +4
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50008
#EXTINF:-1 tvg-id="" tvg-name="STAR +5" tvg-logo="https://static-assets.bamgrid.com/product/starplus/images/share-default.d72cf588f6d06cba22171f5ae44289d3.png" group-title="DEPORTES",STAR +5
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50481
#EXTINF:-1 tvg-id="" tvg-name="SK*Y SPORTS" tvg-logo="https://m.media-amazon.com/images/I/514+unLCgEL.png" group-title="DEPORTES",SK*Y SPORTS
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51267
#EXTINF:-1 tvg-id="" tvg-name="SK*Y PREMIER" tvg-logo="https://m.media-amazon.com/images/I/514+unLCgEL.png" group-title="DEPORTES",SK*Y PREMIER
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51269
#EXTINF:-1 tvg-id="" tvg-name="SK*Y LIGA" tvg-logo="" group-title="DEPORTES",SK*Y LIGA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/81708
#EXTINF:-1 tvg-id="" tvg-name="TD+" tvg-logo="https://i.ibb.co/Zmrt5zF/2w-I2-B-TY-400x400.jpg" group-title="DEPORTES",TD+
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30477
#EXTINF:-1 tvg-id="" tvg-name="TD+2" tvg-logo="https://i.ibb.co/D4Ryh8M/1200px-TD-M-s-2-Logo-svg.png" group-title="DEPORTES",TD+2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30478
#EXTINF:-1 tvg-id="Teletrak HD.cl" tvg-name="Teletrak Chile" tvg-logo="http://www.teletrak.cl/imagenes/logo2.png" group-title="DEPORTES",Teletrak Chile
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7009
#EXTINF:-1 tvg-id="" tvg-name="TV Turf" tvg-logo="http://tvturf.cl/tvturf/site/artic/20181221/imag/foto_0000000120181221154000/logo_tvturf.png" group-title="DEPORTES",TV Turf
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30915
#EXTINF:-1 tvg-id="I217.33395.schedulesdirect.org" tvg-name="Tennis Channel USA HD" tvg-logo="https://i.postimg.cc/Jh2PsPGL/tennis.jpg" group-title="DEPORTES",Tennis Channel USA HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3108
#EXTINF:-1 tvg-id="Tigo Sports.py" tvg-name="Tigo Sports" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57134
#EXTINF:-1 tvg-id="" tvg-name="Tigo Sports Bolivia" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports Bolivia
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3123
#EXTINF:-1 tvg-id="" tvg-name="Tigo Sports 2 Bolivia" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports 2 Bolivia
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56860
#EXTINF:-1 tvg-id="" tvg-name="Tigo Sports 3 Bolivia" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports 3 Bolivia
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7092
#EXTINF:-1 tvg-id="" tvg-name="Tigo Sports Costa Rica" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports Costa Rica
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3125
#EXTINF:-1 tvg-id="" tvg-name="Tigo Sports Guatemala" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports Guatemala
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/55825
#EXTINF:-1 tvg-id="" tvg-name="Tigo Sports Honduras" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports Honduras
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3124
#EXTINF:-1 tvg-id="Tigo Sports.py" tvg-name="Tigo Sports Paraguay" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES",Tigo Sports Paraguay
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3122
#EXTINF:-1 tvg-id="" tvg-name="TVC Deportes" tvg-logo="http://vignette3.wikia.nocookie.net/logopedia/images/e/e1/TVC_Deportes_(2016-_).png" group-title="DEPORTES",TVC Deportes
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/13689
#EXTINF:-1 tvg-id="" tvg-name="Deportes TVC" tvg-logo="" group-title="DEPORTES",Deportes TVC
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/77400
#EXTINF:-1 tvg-id="TYC SPORTS HD.ar" tvg-name="TyC Sports" tvg-logo="http://1.bp.blogspot.com/-lfBqQgLIqeo/VkLMvxnL7ZI/AAAAAAAAS8I/0ZShko69LPA/s1600/zrtn_021p4fd1d019_tn.jpg" group-title="DEPORTES",TyC Sports
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5582
#EXTINF:-1 tvg-id="TYC SPORTS HD.ar" tvg-name="TyC Sports HD" tvg-logo="http://1.bp.blogspot.com/-lfBqQgLIqeo/VkLMvxnL7ZI/AAAAAAAAS8I/0ZShko69LPA/s1600/zrtn_021p4fd1d019_tn.jpg" group-title="DEPORTES",TyC Sports HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3110
#EXTINF:-1 tvg-id="Teledeporte.es" tvg-name="Teledeporte" tvg-logo="https://www.chillglobal.com/images/channels/teledeporte-1432657347.jpg" group-title="DEPORTES",Teledeporte
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49493
#EXTINF:-1 tvg-id="" tvg-name="TVG Network" tvg-logo="https://cdn.pastthewire.com/wp-content/uploads/2020/09/TVG_Logo.jpg" group-title="DEPORTES",TVG Network
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50004
#EXTINF:-1 tvg-id="" tvg-name="TVG 2 Network " tvg-logo="https://cdn.tvpassport.com/image/station/240x135/tvg2.png" group-title="DEPORTES",TVG 2 Network 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50005
#EXTINF:-1 tvg-id="TUDN.mx" tvg-name="TU*DN" tvg-logo="https://i.ibb.co/T1ymgkP/1200x630wa.png" group-title="DEPORTES",TU*DN
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57110
#EXTINF:-1 tvg-id="UFC Network HD.co" tvg-name="UFC Network" tvg-logo="https://www.newslinereport.com/online/nota_ufc-networks-se-expande-en-la-regin.jpg" group-title="DEPORTES",UFC Network
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3112
#EXTINF:-1 tvg-id="" tvg-name="UFC Fight Pass" tvg-logo="https://dvh1deh6tagwk.cloudfront.net/finder-us/wp-uploads/sites/5/2020/07/UFCFightPass_FightPass_738x410.jpg" group-title="DEPORTES",UFC Fight Pass
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50530
#EXTINF:-1 tvg-id="Win Sports.co" tvg-name="Win Sports" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/0/03/WinSports2017.png" group-title="DEPORTES",Win Sports
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/7715
#EXTINF:-1 tvg-id="Win Sports HD.co" tvg-name="Win Sports HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/0/03/WinSports2017.png" group-title="DEPORTES",Win Sports HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3115
#EXTINF:-1 tvg-id="Win+Futbol.co" tvg-name="Win Sports+" tvg-logo="https://i.postimg.cc/LXWfBjTb/Win-Sportsm.png" group-title="DEPORTES",Win Sports+
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/15348
#EXTINF:-1 tvg-id="Win+Futbol.co" tvg-name="Win Sports+ HD" tvg-logo="https://i.postimg.cc/LXWfBjTb/Win-Sportsm.png" group-title="DEPORTES",Win Sports+ HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/15349
#EXTINF:-1 tvg-id="Win+Futbol.co" tvg-name="Win Sports+ FHD" tvg-logo="https://i.postimg.cc/LXWfBjTb/Win-Sportsm.png" group-title="DEPORTES",Win Sports+ FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50262
#EXTINF:-1 tvg-id="" tvg-name="W*W*E " tvg-logo="https://i.ibb.co/J3b6FGw/RESEM87300wwenetwork.jpg" group-title="DEPORTES",W*W*E 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31856
#EXTINF:-1 tvg-id="" tvg-name="YES Network USA" tvg-logo="https://upload.wikimedia.org/wikipedia/en/0/06/YES_Network_logo.png" group-title="DEPORTES",YES Network USA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6349
#EXTINF:-1 tvg-id="" tvg-name="Sports Net 1 (Canada)" tvg-logo="https://www.start.ca/wp-content/uploads/2022/09/StartTV_ChannelLogos_SportsnetOne.png" group-title="DEPORTES",Sports Net 1 (Canada)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56054
#EXTINF:-1 tvg-id="" tvg-name="Sports Net Ontario (Canada)" tvg-logo="https://www.start.ca/wp-content/uploads/2022/09/StartTV_ChannelLogos_SportsnetOne.png" group-title="DEPORTES",Sports Net Ontario (Canada)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56055
#EXTINF:-1 tvg-id="" tvg-name="SsporTV" tvg-logo="https://i.ibb.co/T4674Kw/1200px-Spor-TV-2017-logo-svg.png" group-title="DEPORTES",SsporTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/127250
#EXTINF:-1 tvg-id="" tvg-name="Ssportv  2" tvg-logo="https://i.ibb.co/T4674Kw/1200px-Spor-TV-2017-logo-svg.png" group-title="DEPORTES",Ssportv  2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/127251
#EXTINF:-1 tvg-id="" tvg-name="Ssportv 3" tvg-logo="https://i.ibb.co/T4674Kw/1200px-Spor-TV-2017-logo-svg.png" group-title="DEPORTES",Ssportv 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/127252
#EXTINF:-1 tvg-id="" tvg-name="FuTV" tvg-logo="https://www.larepublica.net/storage/images/2020/07/20/20200720191227.20200709160812futv.jpg" group-title="DEPORTES",FuTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57436
#EXTINF:-1 tvg-id="" tvg-name="Red Bull TV" tvg-logo="https://i.imgur.com/BcN8B3D.png" group-title="DEPORTES",Red Bull TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/71434
#EXTINF:-1 tvg-id="" tvg-name="PANAM SPORTS DTC" tvg-logo="https://www.instagram.com/davidtomera/posts/?l=1" group-title="DEPORTES",PANAM SPORTS DTC
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57834
#EXTINF:-1 tvg-id="" tvg-name="Dubai Sports" tvg-logo="https://www.logolynx.com/images/logolynx/d9/d9ef18eb544187cf05ce58ad3e2a4db1.png" group-title="DEPORTES",Dubai Sports
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30454
#EXTINF:-1 tvg-id="" tvg-name="Dubai Sports 2" tvg-logo="https://www.logolynx.com/images/logolynx/d9/d9ef18eb544187cf05ce58ad3e2a4db1.png" group-title="DEPORTES",Dubai Sports 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30455
#EXTINF:-1 tvg-id="" tvg-name="D*AZN F1" tvg-logo="https://images.icon-icons.com/2389/PNG/512/dazn_logo_icon_145353.png" group-title="DEPORTES",D*AZN F1
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/82189
#EXTINF:-1 tvg-id="" tvg-name="Fox Soccer Plus" tvg-logo="" group-title="DEPORTES",Fox Soccer Plus
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/36
#EXTINF:-1 tvg-id="" tvg-name="Futsal Chile PPV" tvg-logo="https://thumbs.dreamstime.com/b/vector-del-logotipo-escudo-futsal-de-f%C3%BAtbol-concepto-dise%C3%B1o-la-prima-vectorial-futbol-169843661.jpg" group-title="DEPORTES",Futsal Chile PPV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/123399
#EXTINF:-1 tvg-id="TNT Sports Premium HD.cl" tvg-name="TNT SPORTS MAX" tvg-logo="https://auvaromaia.com/wp-content/uploads/2024/10/Max-e-TNT-900x333.png" group-title="DEPORTES PREMIUM",TNT SPORTS MAX
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57153
#EXTINF:-1 tvg-id="TNT Sports Premium.cl" tvg-name="TNT CHILE PREMIUM SD" tvg-logo="https://i.ibb.co/sp4wTqb/descarga.png" group-title="DEPORTES PREMIUM",TNT CHILE PREMIUM SD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56931
#EXTINF:-1 tvg-id="TNT Sports Premium HD.cl" tvg-name="TNT CHILE PREMIUM HD" tvg-logo="https://i.ibb.co/sp4wTqb/descarga.png" group-title="DEPORTES PREMIUM",TNT CHILE PREMIUM HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56932
#EXTINF:-1 tvg-id="TNT Sports Premium HD.cl" tvg-name="TNT CHILE PREMIUM FHD" tvg-logo="https://i.ibb.co/sp4wTqb/descarga.png" group-title="DEPORTES PREMIUM",TNT CHILE PREMIUM FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56933
#EXTINF:-1 tvg-id="TNT Sports.cl" tvg-name="TNT CHILE SD" tvg-logo="https://i.postimg.cc/y8YqmCkM/TN1.png" group-title="DEPORTES PREMIUM",TNT CHILE SD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76241
#EXTINF:-1 tvg-id="TNT Sports.cl" tvg-name="TNT CHILE HD" tvg-logo="https://i.postimg.cc/y8YqmCkM/TN1.png" group-title="DEPORTES PREMIUM",TNT CHILE HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76243
#EXTINF:-1 tvg-id="" tvg-name="TIGO SPORTS" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/3/3b/Tigo_Sports_2025.png" group-title="DEPORTES PREMIUM",TIGO SPORTS
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57108
#EXTINF:-1 tvg-id="" tvg-name="EVENTOS DEL DIA" tvg-logo="https://www.mundoprimaria.com/wp-content/uploads/2020/07/deporte.jpg" group-title="DEPORTES PREMIUM",EVENTOS DEL DIA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57133
#EXTINF:-1 tvg-id="" tvg-name="DISNEY+" tvg-logo="https://e7.pngegg.com/pngimages/168/253/png-clipart-disney-logo-tech-companies.png" group-title="DEPORTES PREMIUM",DISNEY+
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56934
#EXTINF:-1 tvg-id="" tvg-name="LIGA 2D & DISNEY+" tvg-logo="https://assets.diarioconcepcion.cl/2024/02/Liga-2D.jpg" group-title="DEPORTES PREMIUM",LIGA 2D & DISNEY+
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76785
#EXTINF:-1 tvg-id="" tvg-name="LIGA MOVIST" tvg-logo="https://cdn.sincroguia.tv/uploads/images/t/x/1/xmovistar-la-liga.jpg.pagespeed.ic.ms2Jjy3cbG.jpg" group-title="DEPORTES PREMIUM",LIGA MOVIST
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76981
#EXTINF:-1 tvg-id="" tvg-name="DIRECTV SPORTS" tvg-logo="https://i.postimg.cc/J7gQ1JJW/D1.png" group-title="DEPORTES PREMIUM",DIRECTV SPORTS
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76848
#EXTINF:-1 tvg-id="" tvg-name="SKKY SPORTS" tvg-logo="https://m.media-amazon.com/images/I/514+unLCgEL.png" group-title="DEPORTES PREMIUM",SKKY SPORTS
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57435
#EXTINF:-1 tvg-id="Win Sports HD.co" tvg-name="FUTBOL COLOMBIA SD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/0/03/WinSports2017.png" group-title="DEPORTES PREMIUM",FUTBOL COLOMBIA SD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56940
#EXTINF:-1 tvg-id="Win Sports HD.co" tvg-name="FUTBOL COLOMBIA HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/0/03/WinSports2017.png" group-title="DEPORTES PREMIUM",FUTBOL COLOMBIA HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56941
#EXTINF:-1 tvg-id="Win+Futbol.co" tvg-name="FUTBOL COLOMBIA+FHD" tvg-logo="https://i.postimg.cc/LXWfBjTb/Win-Sportsm.png" group-title="DEPORTES PREMIUM",FUTBOL COLOMBIA+FHD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56942
#EXTINF:-1 tvg-id="ESPN.cl" tvg-name="ESPN HD" tvg-logo="https://i.postimg.cc/gkRW1qcD/e748f3c0-3f7c-3088-a90a-0ccb2588e0ed.png" group-title="DEPORTES PREMIUM",ESPN HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56935
#EXTINF:-1 tvg-id="ESPN 2.cl" tvg-name="ESPN 2 HD" tvg-logo="https://i.postimg.cc/DZK8nWWp/espn2.png" group-title="DEPORTES PREMIUM",ESPN 2 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56936
#EXTINF:-1 tvg-id="ESPN.cl" tvg-name="ESPN PREMIUM" tvg-logo="https://i.ibb.co/c3KSp7k/TAVI-Espn-Premium-Fox-Sports-Premium.png" group-title="DEPORTES PREMIUM",ESPN PREMIUM
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76711
#EXTINF:-1 tvg-id="FOX Sports.cl" tvg-name="FOX PREMIUM" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Logo_fox_sports_2012.png/640px-Logo_fox_sports_2012.png" group-title="DEPORTES PREMIUM",FOX PREMIUM
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/79152
#EXTINF:-1 tvg-id="FOX Sports 1 HD.cl" tvg-name="FOX SPORTS 1 HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Logo_fox_sports_2012.png/640px-Logo_fox_sports_2012.png" group-title="DEPORTES PREMIUM",FOX SPORTS 1 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56053
#EXTINF:-1 tvg-id="FOX Sports 2.cl" tvg-name="FOX SPORTS 2 HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Fox_Sports_2_Argentina_2023.svg/800px-Fox_Sports_2_Argentina_2023.svg.png" group-title="DEPORTES PREMIUM",FOX SPORTS 2 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56938
#EXTINF:-1 tvg-id="FOX Sports 3.cl" tvg-name="FOX SPORTS 3 HD" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Fox_Sports_3_Argentina_2023.svg/1200px-Fox_Sports_3_Argentina_2023.svg.png" group-title="DEPORTES PREMIUM",FOX SPORTS 3 HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76712
#EXTINF:-1 tvg-id="" tvg-name="ZAPPING & TNT MAX" tvg-logo="https://davinci.zappingtv.com/gato/media/256/canales/color/zappingsports.jpg" group-title="DEPORTES PREMIUM",ZAPPING & TNT MAX
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76741
#EXTINF:-1 tvg-id="ADULT SWIM HD.ar" tvg-name="Adult Swim" tvg-logo="https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/01/adult-swim-hbo-1849689.jpg" group-title="INFANTIL",Adult Swim
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2449
#EXTINF:-1 tvg-id="BabyTV.ar" tvg-name="Baby TV" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/baby_tv.png" group-title="INFANTIL",Baby TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2467
#EXTINF:-1 tvg-id="" tvg-name="Baby First" tvg-logo="https://seeklogo.com/images/B/babyfirst-tv-logo-B87A17BB2F-seeklogo.com.png" group-title="INFANTIL",Baby First
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5825
#EXTINF:-1 tvg-id="" tvg-name="Bitme" tvg-logo="https://as.com/meristation/imagenes/2019/07/10/mexico/1562735338_991055_1562735648_noticia_normal.jpg" group-title="INFANTIL",Bitme
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/55394
#EXTINF:-1 tvg-id="" tvg-name="Boing" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Boing_2020.svg/512px-Boing_2020.svg.png" group-title="INFANTIL",Boing
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/56044
#EXTINF:-1 tvg-id="NickMusic.us" tvg-name="Cine Familiar" tvg-logo="https://www.centroculturaldepaine.cl/imagenes/ccp_agosto_1_interna.jpg" group-title="INFANTIL",Cine Familiar
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48615
#EXTINF:-1 tvg-id="CartoonitoArgentina.ar" tvg-name="Magic Kids" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/d/d6/Logomagic96.png" group-title="INFANTIL",Magic Kids
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2469
#EXTINF:-1 tvg-id="CARTOONITO.ar" tvg-name="Cartoonito HD" tvg-logo="https://www.elespectador.com/resizer/7I0rhbnhoe8WuoJI4TmeHALbMwY=/525x350/filters:format(jpeg)/cloudfront-us-east-1.images.arcpublishing.com/elespectador/Q5GZ2WZL6VHNVCFVJK72P7UIHA.jpg" group-title="INFANTIL",Cartoonito HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/47838
#EXTINF:-1 tvg-id="CARTOON NETWORK HD.ar" tvg-name="Cartoon Network " tvg-logo="https://marcas-logos.net/wp-content/uploads/2020/03/Cartoon-Network-s%C3%ADmbolo.jpg" group-title="INFANTIL",Cartoon Network 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2470
#EXTINF:-1 tvg-id="CARTOON NETWORK HD.ar" tvg-name="Cartoon Network HD" tvg-logo="https://marcas-logos.net/wp-content/uploads/2020/03/Cartoon-Network-s%C3%ADmbolo.jpg" group-title="INFANTIL",Cartoon Network HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48374
#EXTINF:-1 tvg-id="DISCOVERY KIDS HD.ar" tvg-name="Discovery Kids " tvg-logo="https://www.ushuaiavision.com.ar/images/canales/discovery_kids.png" group-title="INFANTIL",Discovery Kids 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2471
#EXTINF:-1 tvg-id="DISCOVERY KIDS HD.ar" tvg-name="Discovery Kids HD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/discovery_kids.png" group-title="INFANTIL",Discovery Kids HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/47837
#EXTINF:-1 tvg-id="DISNEY HD.ar" tvg-name="Disney Channel " tvg-logo="https://www.ushuaiavision.com.ar/images/canales/disneychannel.png" group-title="INFANTIL",Disney Channel 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2472
#EXTINF:-1 tvg-id="DISNEY HD.ar" tvg-name="Disney Channel HD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/disneychannel.png" group-title="INFANTIL",Disney Channel HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30366
#EXTINF:-1 tvg-id="DISNEY JR.ar" tvg-name="Disney Junior " tvg-logo="https://www.ushuaiavision.com.ar/images/canales/disney-junior.png" group-title="INFANTIL",Disney Junior 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2473
#EXTINF:-1 tvg-id="DISNEY JR.ar" tvg-name="Disney Junior HD" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/disney-junior.png" group-title="INFANTIL",Disney Junior HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48375
#EXTINF:-1 tvg-id="AMCLatinAmerica.us" tvg-name="Dreamworks HD" tvg-logo="https://www.thedailytelevision.com/sites/default/files/notas/imagenes/interior/dreamworks_grande_1.jpg" group-title="INFANTIL",Dreamworks HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2476
#EXTINF:-1 tvg-id="" tvg-name="Dios Teve Kids" tvg-logo="https://i.ibb.co/S6dqrVx/02505b330e44a59b5cbbf0b595e757d0dadc776b5c0aec342f53d571c766bc2d.png" group-title="INFANTIL",Dios Teve Kids
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30916
#EXTINF:-1 tvg-id="ETC TV.cl" tvg-name="ETC TV" tvg-logo="http://static.etc.cl/_common/images/logoetc_2015.png" group-title="INFANTIL",ETC TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30467
#EXTINF:-1 tvg-id="" tvg-name="El Chavo Del 8 TV" tvg-logo="https://i.ibb.co/vJRC5TN/el-chavo-chespirito-razon-dejaran-de-emitir-televisa-crop1596463418845-jpg-1005196607.jpg" group-title="INFANTIL",El Chavo Del 8 TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/3614
#EXTINF:-1 tvg-id="" tvg-name="Latino Kids" tvg-logo="https://i.ibb.co/SVBbSYq/b22f37-db459382223d48f092d71151178a3797-mv2.png" group-title="INFANTIL",Latino Kids
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51709
#EXTINF:-1 tvg-id="" tvg-name="Locomotion" tvg-logo="http://locomotiontv.com/imgs/loco/logo_white.png" group-title="INFANTIL",Locomotion
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/20
#EXTINF:-1 tvg-id="NICKELODEON.ar" tvg-name="Nickelodeon " tvg-logo="https://www.edigitalagency.com.au/wp-content/uploads/Nickelodeon-logo-png.png" group-title="INFANTIL",Nickelodeon 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2477
#EXTINF:-1 tvg-id="NICKELODEON.ar" tvg-name="Nickelodeon HD" tvg-logo="https://www.edigitalagency.com.au/wp-content/uploads/Nickelodeon-logo-png.png" group-title="INFANTIL",Nickelodeon HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/42923
#EXTINF:-1 tvg-id="Nick 2.ar" tvg-name="Nick 2 " tvg-logo="https://upload.wikimedia.org/wikipedia/commons/8/87/Nick_2_Logo_alternative.png" group-title="INFANTIL",Nick 2 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2479
#EXTINF:-1 tvg-id="NICK JR.ar" tvg-name="Nick Jr." tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Nick_Jr._logo_2009.svg/1280px-Nick_Jr._logo_2009.svg.png" group-title="INFANTIL",Nick Jr.
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2478
#EXTINF:-1 tvg-id="I315.60506.schedulesdirect.org" tvg-name="Nick Classics" tvg-logo="https://static.wikia.nocookie.net/nickelodeon/images/6/61/NickClassicslogo.png" group-title="INFANTIL",Nick Classics
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/32359
#EXTINF:-1 tvg-id="PAKAPAKA.ar" tvg-name="Paka-Paka" tvg-logo="https://www.ushuaiavision.com.ar/images/canales/pakapaka.png" group-title="INFANTIL",Paka-Paka
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2480
#EXTINF:-1 tvg-id="I310.47485.schedulesdirect.org" tvg-name="Planeta Kids" tvg-logo="https://dojiw2m9tvv09.cloudfront.net/10434/2/S_logoplanetakids4355.jpg" group-title="INFANTIL",Planeta Kids
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5154
#EXTINF:-1 tvg-id="" tvg-name="Pequeradio TV" tvg-logo="https://i.ibb.co/8B1QWjL/76b12f-b725806aac4c416da697ccf6a5c6dd83-mv2.png" group-title="INFANTIL",Pequeradio TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/51767
#EXTINF:-1 tvg-id="NatGeoKidsPanregional.us" tvg-name="Reino Infantil" tvg-logo="https://images-na.ssl-images-amazon.com/images/S/pv-target-images/13f9c08deee4a72c7e190e4044032b38457178b204e8fc4ad04f187018ef77a7._RI_V_TTW_.jpg" group-title="INFANTIL",Reino Infantil
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30604
#EXTINF:-1 tvg-id="AMCPanregional.us" tvg-name="Teen Nick" tvg-logo="https://fandetda.files.wordpress.com/2010/04/teenick_logo_2005.png" group-title="INFANTIL",Teen Nick
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2474
#EXTINF:-1 tvg-id="TOONCAST.ar" tvg-name="Tooncast" tvg-logo="http://files.linehd.webnode.com/200000001-1c4c21d460/tooncast.png" group-title="INFANTIL",Tooncast
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2482
#EXTINF:-1 tvg-id="TOONCAST.ar" tvg-name="Tooncast HD" tvg-logo="http://files.linehd.webnode.com/200000001-1c4c21d460/tooncast.png" group-title="INFANTIL",Tooncast HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30603
#EXTINF:-1 tvg-id="ZOOMOO HD.ar" tvg-name="Zoomoo" tvg-logo="https://www.zoomookids.com.br/wp-content/uploads/2022/11/cropped-shadow-zoomoo-kids-logo.png" group-title="INFANTIL",Zoomoo
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76242
#EXTINF:-1 tvg-id="" tvg-name="Senpai TV" tvg-logo="https://senpaitv.com/wp-content/themes/tsunayoshi/assets/img/logosenpai2.png" group-title="INFANTIL",Senpai TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/80031
#EXTINF:-1 tvg-id="Concert Channel HD.co" tvg-name="Concert Channel" tvg-logo="https://i.postimg.cc/PqcrMnXT/concert.png" group-title="MUSICA",Concert Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31212
#EXTINF:-1 tvg-id="HTV.co" tvg-name="HTV" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Htv_logo.svg/100px-Htv_logo.svg.png" group-title="MUSICA",HTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/14127
#EXTINF:-1 tvg-id="MTV.co" tvg-name="MTV" tvg-logo="https://cdn130.picsart.com/261469776004212.png" group-title="MUSICA",MTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30451
#EXTINF:-1 tvg-id="MTV.co" tvg-name="MTV HD" tvg-logo="https://cdn130.picsart.com/261469776004212.png" group-title="MUSICA",MTV HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2538
#EXTINF:-1 tvg-id="I1.24519.schedulesdirect.org" tvg-name="MTV Classic" tvg-logo="https://i.postimg.cc/59PFwYH5/mtv-classic.jpg" group-title="MUSICA",MTV Classic
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/16039
#EXTINF:-1 tvg-id="MTV HITS.co" tvg-name="MTV Hits" tvg-logo="https://www.middelfart-antenneforening.dk/wp-content/uploads/2019/05/mtvhits-300x294.png" group-title="MUSICA",MTV Hits
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2537
#EXTINF:-1 tvg-id="MTV Live.co" tvg-name="MTV Live HD" tvg-logo="https://i.ibb.co/z5HNM0t/descarga.png" group-title="MUSICA",MTV Live HD
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30877
#EXTINF:-1 tvg-id="" tvg-name=" MTV Spankin New" tvg-logo="https://cdn130.picsart.com/261469776004212.png" group-title="MUSICA", MTV Spankin New
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6773
#EXTINF:-1 tvg-id="I1265.109487.schedulesdirect.org" tvg-name="Music Top" tvg-logo="https://i.postimg.cc/8c9pPnCm/musictop.png" group-title="MUSICA",Music Top
https://stream-gtlc.telecentro.net.ar/hls/musictophls/0/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Mundo De La Musica" tvg-logo="https://media.revistagq.com/photos/5ca60706f552a16a6832f739/master/pass/la_musica_del_fin_del_mundo_3965.JPG" group-title="MUSICA",Mundo De La Musica
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29528
#EXTINF:-1 tvg-id="" tvg-name="Ibiza Global TV" tvg-logo="https://i1.sndcdn.com/artworks-000241057733-qn6kd8-t500x500.jpg" group-title="MUSICA",Ibiza Global TV
https://ibgrtv.streaming-pro.com/hls/ibgrlive.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Planeta Tv Music" tvg-logo="https://i1.sndcdn.com/avatars-000301903594-twktkx-t500x500.jpg" group-title="MUSICA",Planeta Tv Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29530
#EXTINF:-1 tvg-id="VH1 Classic USA.co" tvg-name="VH1 Classic" tvg-logo="https://i.postimg.cc/m2t1VLMv/VH1-CLASSIC.png" group-title="MUSICA",VH1 Classic
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/2540
#EXTINF:-1 tvg-id="" tvg-name="Retro Plus Tv" tvg-logo="https://i.ibb.co/nDBg3d5/106798-Retro-Plus-TV.png" group-title="MUSICA",Retro Plus Tv
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/30314
#EXTINF:-1 tvg-id="" tvg-name="Retro Plus 2 " tvg-logo="https://i.ibb.co/nDBg3d5/106798-Retro-Plus-TV.png" group-title="MUSICA",Retro Plus 2 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/44700
#EXTINF:-1 tvg-id="" tvg-name="Retro Plus 3" tvg-logo="https://i.ibb.co/nDBg3d5/106798-Retro-Plus-TV.png" group-title="MUSICA",Retro Plus 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/27624
#EXTINF:-1 tvg-id="" tvg-name="Rewind" tvg-logo="https://image.roku.com/developer_channels/prod/1a30d757bf7bfb8d26b8ddebc3151043a101efb20767c653fbb7c243f8386820.png" group-title="MUSICA",Rewind
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/44
#EXTINF:-1 tvg-id="" tvg-name="Retro Music Television" tvg-logo="https://i.postimg.cc/C53XtK5f/zaltv.png" group-title="MUSICA",Retro Music Television
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29593
#EXTINF:-1 tvg-id="" tvg-name="Radio Agricultura TV" tvg-logo="https://pbs.twimg.com/profile_images/1133369215849775104/-r95r4rv.png" group-title="MUSICA",Radio Agricultura TV
https://hls-audio-cl-1-isp.dps.live/agricultura/gotardis/audio/now/nimble-absolute-url-livestream1-edge.m3u8?nimblesessionid=11636801&nimbleabsoluteurl=F30nS1a0jGsCc+I4D0BVsdjA9yI3clLBytliTVtsOjzGCXJv7RJeiF07%2FkbS1nI2%2FfRymtt8YwHT%2F0hX2a%2F70+fRJ9kFrgwmySG6Kk5QsuYRH7mDY7fimQRbrk9LQgyL&nimbleurlhash=K77%2FLRP+ae5ZWuLfq4DDdg==&nimbleurliv=ABQ4dx3XN+W9h+%2FncUxhuA==
#EXTINF:-1 tvg-id="" tvg-name="Radio Javan TV" tvg-logo="https://i.imgur.com/4XTyMST.jpg" group-title="MUSICA",Radio Javan TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29590
#EXTINF:-1 tvg-id="" tvg-name="Radio Maxima TV" tvg-logo="https://i.postimg.cc/sDzScZyv/max-ra.jpg" group-title="MUSICA",Radio Maxima TV
http://server1.oklanet.cl:1935/maximavideo1/maximavideo1/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Radio Onda TV" tvg-logo="https://tv.ondaradio.cl/img/logo.png" group-title="MUSICA",Radio Onda TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/32
#EXTINF:-1 tvg-id="" tvg-name="Radio Piter Pan TV" tvg-logo="https://i.imgur.com/DfugVgy.png" group-title="MUSICA",Radio Piter Pan TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29591
#EXTINF:-1 tvg-id="" tvg-name="Radio PROS" tvg-logo="https://i.imgur.com/RMjFeGE.png" group-title="MUSICA",Radio PROS
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29592
#EXTINF:-1 tvg-id="" tvg-name="Radio Romantica TV" tvg-logo="http://db.radioline.fr/pictures/radio_bed8343a7cfa69057e7c80b55b72d9e8/logo200.jpg" group-title="MUSICA",Radio Romantica TV
http://unlimited1-us.dps.live/romanticatv/romanticatv.smil/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Radio Recuerdos Retro" tvg-logo="http://www.videoluctv.net/wp-content/uploads/2016/10/telehit.jpg" group-title="MUSICA",Radio Recuerdos Retro
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/5963
#EXTINF:-1 tvg-id="" tvg-name="Radio Soberania" tvg-logo="https://www.soberaniaradio.cl/img/logo.png" group-title="MUSICA",Radio Soberania
https://tls-cl.cdnz.cl/radiosoberania/live/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Radio Zeta" tvg-logo="https://www.radio.es/images/broadcasts/bb/c3/27710/1/c300.png" group-title="MUSICA",Radio Zeta
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29543
#EXTINF:-1 tvg-id="" tvg-name="Radio Via Libre" tvg-logo="https://player.voxhd.com.br/app-multi-plataforma/logo-7646.png" group-title="MUSICA",Radio Via Libre
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29551
#EXTINF:-1 tvg-id="" tvg-name="Radio Hoy" tvg-logo="https://static.mytuner.mobi/media/tvos_radios/skb5qjdyjljp.png" group-title="MUSICA",Radio Hoy
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29558
#EXTINF:-1 tvg-id="" tvg-name="Radio Fiesta TV" tvg-logo="https://cdn-radiotime-logos.tunein.com/p298677d.png" group-title="MUSICA",Radio Fiesta TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29559
#EXTINF:-1 tvg-id="" tvg-name="Radio Favorita TV" tvg-logo="https://favoritatv.cl/wp-content/uploads/2022/01/cropped-logo-FTV.png" group-title="MUSICA",Radio Favorita TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29560
#EXTINF:-1 tvg-id="" tvg-name="Radio Ñuble TV" tvg-logo="https://pbs.twimg.com/profile_images/537345410793107456/OV22duyl_400x400.jpeg" group-title="MUSICA",Radio Ñuble TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29561
#EXTINF:-1 tvg-id="" tvg-name="Radio Fantasia TV" tvg-logo="https://pbs.twimg.com/profile_images/1350807727736573955/eOxOPOIQ_400x400.jpg" group-title="MUSICA",Radio Fantasia TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29562
#EXTINF:-1 tvg-id="" tvg-name="Kuriakos Music" tvg-logo="https://i.imgur.com/q6K4S0N.png" group-title="MUSICA",Kuriakos Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29563
#EXTINF:-1 tvg-id="" tvg-name="Radio Camila TV" tvg-logo="https://yellow.place/file/image/thumb/0/0/1049/medeufaymkirxkiw.jpg" group-title="MUSICA",Radio Camila TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29564
#EXTINF:-1 tvg-id="" tvg-name="Radio Universal" tvg-logo="https://universal881.com/wp-content/uploads/2020/02/UNIVERSAL_977_512.jpg" group-title="MUSICA",Radio Universal
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29552
#EXTINF:-1 tvg-id="" tvg-name="Radio Polar" tvg-logo="http://comunicaciones.ucsh.cl/wp-content/uploads/2021/11/Logo-Radio-Polar-500x300.png" group-title="MUSICA",Radio Polar
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29553
#EXTINF:-1 tvg-id="" tvg-name="Radio Las Nieves" tvg-logo="https://www.rln.cl/wp-content/uploads/2018/04/radio_las_nieves.jpg" group-title="MUSICA",Radio Las Nieves
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29554
#EXTINF:-1 tvg-id="" tvg-name="Radio Actitud TV" tvg-logo="https://cdn-radiotime-logos.tunein.com/s222997d.png" group-title="MUSICA",Radio Actitud TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29568
#EXTINF:-1 tvg-id="" tvg-name="Radio Lado Oscuro TV" tvg-logo="https://radioladooscurotv.cl/wp-content/uploads/2021/05/cropped-logoweb-238x79.png" group-title="MUSICA",Radio Lado Oscuro TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29556
#EXTINF:-1 tvg-id="" tvg-name="Radio La Serena" tvg-logo="https://4.bp.blogspot.com/-E3Q5GmKfWeU/WNE4zcKV5MI/AAAAAAAABPI/vDMq7PVZi2c1P81gDLSDgF1NB5MKQ2NYQCLcB/s1600/Radio%2BLa%2BSerena%2BLogo.png" group-title="MUSICA",Radio La Serena
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29532
#EXTINF:-1 tvg-id="" tvg-name="Radio Patagonia TV" tvg-logo="https://www.guiapenquista.cl/imagenes/radios/x-region/puerto-montt/radio-patagonia.jpg" group-title="MUSICA",Radio Patagonia TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29534
#EXTINF:-1 tvg-id="" tvg-name="Radio Red Fueguina" tvg-logo="https://www.guiapenquista.cl/imagenes/radios/xii/porvenir/radio-red-fueguina.jpg" group-title="MUSICA",Radio Red Fueguina
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29536
#EXTINF:-1 tvg-id="" tvg-name="Radio Tiempo" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Radio_Tiempo_logo.svg/1200px-Radio_Tiempo_logo.svg.png" group-title="MUSICA",Radio Tiempo
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29574
#EXTINF:-1 tvg-id="" tvg-name="Retro TV" tvg-logo="http://www.gustavorivas.com.ar/wp-content/uploads/2009/03/logo-canal-retro1.jpg" group-title="MUSICA",Retro TV
http://stream.mediawork.cz/retrotv/retrotvHQ1/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Ancoa TV" tvg-logo="https://s3-mspro.nyc3.digitaloceanspaces.com/tenant/5fd388ccfae2191165f5a37b/settings/logos/cd703c18-9a90-48b4-b9ee-9d5ffe616eeb.png" group-title="MUSICA",Ancoa TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29572
#EXTINF:-1 tvg-id="" tvg-name="Afrobeats" tvg-logo="https://i.pinimg.com/originals/ef/da/b3/efdab37789e36d8da6c84679c1170f85.jpg" group-title="MUSICA",Afrobeats
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29527
#EXTINF:-1 tvg-id="" tvg-name="AE Music" tvg-logo="https://i2.paste.pics/f8b890eebda6062f306024bdc70afafa.png" group-title="MUSICA",AE Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29573
#EXTINF:-1 tvg-id="" tvg-name="ACB TV" tvg-logo="" group-title="MUSICA",ACB TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29526
#EXTINF:-1 tvg-id="" tvg-name="4FUN TV" tvg-logo="https://i.imgur.com/c59VWgF.jpg" group-title="MUSICA",4FUN TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29524
#EXTINF:-1 tvg-id="" tvg-name="B4U Kadak" tvg-logo="http://mhdtvworld.com/wp-content/uploads/2019/07/b4u-kadak-in.png" group-title="MUSICA",B4U Kadak
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29529
#EXTINF:-1 tvg-id="" tvg-name="Baraza TV" tvg-logo="https://i.imgur.com/mW6c2QR.png" group-title="MUSICA",Baraza TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29531
#EXTINF:-1 tvg-id="" tvg-name="Baraza TV Greek Music Hits" tvg-logo="https://i.imgur.com/mW6c2QR.png" group-title="MUSICA",Baraza TV Greek Music Hits
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29533
#EXTINF:-1 tvg-id="" tvg-name="California Music Channel" tvg-logo="https://cdn.tvpassport.com/image/station/240x135/cmc-cali-tv.png" group-title="MUSICA",California Music Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29535
#EXTINF:-1 tvg-id="" tvg-name="California Music Channel 2" tvg-logo="http://3.bp.blogspot.com/-Ngn_IHUGV-E/VoGzyGsSlkI/AAAAAAAAAjc/XTspAPwP2TE/s1600/CMC-Music-Channel.png" group-title="MUSICA",California Music Channel 2
https://cmc-ono.amagi.tv/amRdirect/device[did]=%7BPSID%7D&device[dnt]=%7BDID%7D&us_privacy=%7BUS_PRIVACY%7D&coppa=%7BCOPPA%7D&uid=1g37bbrro-s3n9-atg-wtq6-8p1mmn2gib/hls/amagi_hls_data_cmcAAAAAA-cmc-ono/CDN/1280x720_2890800/index.m3u8
#EXTINF:-1 tvg-id="" tvg-name="City Music TV" tvg-logo="https://i.imgur.com/LJ4Hpdc.png" group-title="MUSICA",City Music TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29537
#EXTINF:-1 tvg-id="" tvg-name="Company TV" tvg-logo="https://www.coolstreaming.us/img/ch/image87899621576.jpg" group-title="MUSICA",Company TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29538
#EXTINF:-1 tvg-id="" tvg-name="Credo TV" tvg-logo="https://i.imgur.com/AX5NsOv.jpg" group-title="MUSICA",Credo TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29539
#EXTINF:-1 tvg-id="" tvg-name="Desi Channel" tvg-logo="https://www.coolstreaming.us/img/ch/image25906697754.jpg" group-title="MUSICA",Desi Channel
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29540
#EXTINF:-1 tvg-id="" tvg-name="Dijlah Tarab" tvg-logo="https://www.dijlah.tv/templates/default-2/live-page/images/tarab-logo.png" group-title="MUSICA",Dijlah Tarab
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29541
#EXTINF:-1 tvg-id="" tvg-name="DBox" tvg-logo="" group-title="MUSICA",DBox
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29542
#EXTINF:-1 tvg-id="" tvg-name="EBC1 TV" tvg-logo="https://www.livefarsi.com/uploads/tv_image/ebc1-tv.jpg" group-title="MUSICA",EBC1 TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29550
#EXTINF:-1 tvg-id="" tvg-name="GO-RTV" tvg-logo="https://i.imgur.com/zAFt893.png" group-title="MUSICA",GO-RTV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29555
#EXTINF:-1 tvg-id="" tvg-name="Jhanjar Music" tvg-logo="https://i.imgur.com/gIYOu4i.jpg" group-title="MUSICA",Jhanjar Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29557
#EXTINF:-1 tvg-id="" tvg-name="Marutam Music" tvg-logo="" group-title="MUSICA",Marutam Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29566
#EXTINF:-1 tvg-id="" tvg-name="Mastiii" tvg-logo="http://mhdtvworld.com/wp-content/uploads/2018/12/MASTIII.png" group-title="MUSICA",Mastiii
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29567
#EXTINF:-1 tvg-id="" tvg-name="Mifa" tvg-logo="http://www.gemonline.tv/Assets/channels-box/mifa.png?1212" group-title="MUSICA",Mifa
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29569
#EXTINF:-1 tvg-id="" tvg-name="Mi Radio TV" tvg-logo="" group-title="MUSICA",Mi Radio TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29570
#EXTINF:-1 tvg-id="" tvg-name="Inter Radio TV" tvg-logo="http://guiadelaradio.com/wp-content/uploads/2019/01/Radio_Inter_54524-678x381.jpg" group-title="MUSICA",Inter Radio TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29571
#EXTINF:-1 tvg-id="" tvg-name="Music 24" tvg-logo="https://i.imgur.com/lBbbPI4.jpg" group-title="MUSICA",Music 24
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29575
#EXTINF:-1 tvg-id="" tvg-name="Music Top" tvg-logo="https://i.imgur.com/dKpLbh6.png" group-title="MUSICA",Music Top
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29576
#EXTINF:-1 tvg-id="" tvg-name="Nago TV" tvg-logo="https://i.imgur.com/uisopuM.png" group-title="MUSICA",Nago TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29577
#EXTINF:-1 tvg-id="" tvg-name="Navahang TV" tvg-logo="http://www.navahang.com/apple-touch-icon.png" group-title="MUSICA",Navahang TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29578
#EXTINF:-1 tvg-id="" tvg-name="NG" tvg-logo="http://i.imgur.com/pK2p5ey.png" group-title="MUSICA",NG
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29579
#EXTINF:-1 tvg-id="" tvg-name="NRJ Hits TV" tvg-logo="https://i.imgur.com/d2wbX6e.jpg" group-title="MUSICA",NRJ Hits TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29580
#EXTINF:-1 tvg-id="" tvg-name="Operator Radio" tvg-logo="https://i.imgur.com/yjuaHY1.jpg" group-title="MUSICA",Operator Radio
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29581
#EXTINF:-1 tvg-id="" tvg-name="OTVconline" tvg-logo="https://i.imgur.com/wCrNtxp.png" group-title="MUSICA",OTVconline
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29582
#EXTINF:-1 tvg-id="" tvg-name="Cloud Music" tvg-logo="https://i.imgur.com/wCrNtxp.png" group-title="MUSICA",Cloud Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29583
#EXTINF:-1 tvg-id="" tvg-name="Play TV" tvg-logo="https://i.imgur.com/mvgRAZw.jpg" group-title="MUSICA",Play TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29584
#EXTINF:-1 tvg-id="" tvg-name="Portalfoxmix" tvg-logo="" group-title="MUSICA",Portalfoxmix
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29585
#EXTINF:-1 tvg-id="" tvg-name="Portalfoxmix" tvg-logo="https://i.imgur.com/umdJ2mP.jpg" group-title="MUSICA",Portalfoxmix
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29586
#EXTINF:-1 tvg-id="" tvg-name="Public Music" tvg-logo="http://mhdtvworld.com/wp-content/uploads/2018/12/public_music_in.png" group-title="MUSICA",Public Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29587
#EXTINF:-1 tvg-id="" tvg-name="Q-Music" tvg-logo="https://i.imgur.com/s0CZjmi.png" group-title="MUSICA",Q-Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29588
#EXTINF:-1 tvg-id="" tvg-name="Qmusic" tvg-logo="https://i.imgur.com/P8cVMle.jpg" group-title="MUSICA",Qmusic
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29589
#EXTINF:-1 tvg-id="" tvg-name="Radiomania" tvg-logo="https://nosomosnonos.com/wp-content/uploads/2021/11/7cfee8e331bd26cb493780bdd411b803c05fc671d937f10735d74cd1b738fda0-rimg-w526-h296-gmir.jpg" group-title="MUSICA",Radiomania
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29594
#EXTINF:-1 tvg-id="" tvg-name="Tile Mousiki" tvg-logo="http://i.imgur.com/piGhf3m.png" group-title="MUSICA",Tile Mousiki
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29595
#EXTINF:-1 tvg-id="" tvg-name="TMA" tvg-logo="https://i.imgur.com/fQUzBsz.png" group-title="MUSICA",TMA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29596
#EXTINF:-1 tvg-id="" tvg-name="Top New Radio" tvg-logo="https://i.imgur.com/0RcNFXt.jpg" group-title="MUSICA",Top New Radio
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29597
#EXTINF:-1 tvg-id="" tvg-name="V2BEAT TV" tvg-logo="https://i.imgur.com/Ll6GlqY.png" group-title="MUSICA",V2BEAT TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29598
#EXTINF:-1 tvg-id="" tvg-name="VIVA TV" tvg-logo="https://i.imgur.com/qCLICfC.jpg" group-title="MUSICA",VIVA TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29599
#EXTINF:-1 tvg-id="" tvg-name="7S Music" tvg-logo="https://www.pay2easy.com/uploads/5154-7S%20Music.jpg" group-title="MUSICA",7S Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29525
#EXTINF:-1 tvg-id="" tvg-name="Xalastra TV" tvg-logo="http://i.imgur.com/LgQBtTh.jpg" group-title="MUSICA",Xalastra TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/29600
#EXTINF:-1 tvg-id="" tvg-name="Zapping Music" tvg-logo="https://i.ibb.co/sm712VH/45112-Zapping-Music.png" group-title="MUSICA",Zapping Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/33180
#EXTINF:-1 tvg-id="" tvg-name="Xtv Music" tvg-logo="https://i.ibb.co/4NC5Tp4/112843-XTV-Music.png" group-title="MUSICA",Xtv Music
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/33407
#EXTINF:-1 tvg-id="" tvg-name="Tv Pop" tvg-logo="https://i.ibb.co/dtxbY2F/74166-TV-POP.jpg" group-title="MUSICA",Tv Pop
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/33408
#EXTINF:-1 tvg-id="" tvg-name="Cadena Elite" tvg-logo="https://i2.paste.pics/9beaf1949244b5eb5e5ed3af28304f52.png" group-title="MUSICA",Cadena Elite
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/52578
#EXTINF:-1 tvg-id="" tvg-name="Radio Latina TV" tvg-logo="https://www.latina101.com.ar/images/logo.png" group-title="MUSICA",Radio Latina TV
https://stream-gtlc.telecentro.net.ar/hls/radiolatinahls/0/playlist.m3u8
#EXTINF:-1 tvg-id="" tvg-name="DeeJay TV" tvg-logo="" group-title="MUSICA",DeeJay TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/41238
#EXTINF:-1 tvg-id="" tvg-name="Lobo TV" tvg-logo="" group-title="MUSICA",Lobo TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57149
#EXTINF:-1 tvg-id="" tvg-name="Mad TV" tvg-logo="" group-title="MUSICA",Mad TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57150
#EXTINF:-1 tvg-id="" tvg-name="Maxima TV" tvg-logo="" group-title="MUSICA",Maxima TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/42509
#EXTINF:-1 tvg-id="" tvg-name="Top Latino 24/7" tvg-logo="https://i.ibb.co/SJTnQT6/96280-TOP-Latino-TV.png" group-title="MUSICA",Top Latino 24/7
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/33409
#EXTINF:-1 tvg-id="" tvg-name="TV Cosmos | PE" tvg-logo="https://cdn.m3u.cl/logo/701_TV_Cosmos_15_1.png" group-title="MUSICA",TV Cosmos | PE
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/74816
#EXTINF:-1 tvg-id="" tvg-name="Mi Musica" tvg-logo="https://bittchannel.com/wp-content/uploads/2023/06/Logo-MiMusica-Salsa-Alpha-AOriginal-e1687304739946.png" group-title="COLOMBIA",Mi Musica
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76740
#EXTINF:-1 tvg-id="QUIERO.ar" tvg-name="Quiero Musica" tvg-logo="https://cdn.m3u.cl/logo/36_Telemusica.png" group-title="MUSICA",Quiero Musica
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/74961
#EXTINF:-1 tvg-id="Telehit.ar" tvg-name="Telehit" tvg-logo="" group-title="MUSICA",Telehit
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/70174
#EXTINF:-1 tvg-id="" tvg-name="408 Stingray Pop Adult" tvg-logo="" group-title="MUSICA",408 Stingray Pop Adult
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/40115
#EXTINF:-1 tvg-id="" tvg-name="Stingray Pop Adult " tvg-logo="" group-title="MUSICA",Stingray Pop Adult 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/45190
#EXTINF:-1 tvg-id="" tvg-name="HALLOWEEN DARK TV" tvg-logo="https://historia.nationalgeographic.com.es/medio/2022/10/28/calabaza_98056d65_1280x854.jpg" group-title="EVENTOS 24/7",HALLOWEEN DARK TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57855
#EXTINF:-1 tvg-id="" tvg-name="HALLOWEEN TERROR" tvg-logo="https://historia.nationalgeographic.com.es/medio/2022/10/28/calabaza_98056d65_1280x854.jpg" group-title="EVENTOS 24/7",HALLOWEEN TERROR
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57861
#EXTINF:-1 tvg-id="" tvg-name="HALLOWEEN MISTERIOS " tvg-logo="https://historia.nationalgeographic.com.es/medio/2022/10/28/calabaza_98056d65_1280x854.jpg" group-title="EVENTOS 24/7",HALLOWEEN MISTERIOS 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57859
#EXTINF:-1 tvg-id="" tvg-name="HALLOWEEN HISTORIAS DE ULTRA TUMBA" tvg-logo="https://historia.nationalgeographic.com.es/medio/2022/10/28/calabaza_98056d65_1280x854.jpg" group-title="EVENTOS 24/7",HALLOWEEN HISTORIAS DE ULTRA TUMBA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/80051
#EXTINF:-1 tvg-id="" tvg-name="ESPECIAL ANIME" tvg-logo="https://i.etsystatic.com/32736505/r/il/1f543d/3502420205/il_300x300.3502420205_i1cf.jpg" group-title="EVENTOS 24/7",ESPECIAL ANIME
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57862
#EXTINF:-1 tvg-id="" tvg-name="ESPECIAL CINE" tvg-logo="https://i.etsystatic.com/32736505/r/il/1f543d/3502420205/il_300x300.3502420205_i1cf.jpg" group-title="EVENTOS 24/7",ESPECIAL CINE
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50735
#EXTINF:-1 tvg-id="" tvg-name="ESPECIAL COMEDIA" tvg-logo="https://i.etsystatic.com/32736505/r/il/1f543d/3502420205/il_300x300.3502420205_i1cf.jpg" group-title="EVENTOS 24/7",ESPECIAL COMEDIA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/76198
#EXTINF:-1 tvg-id="" tvg-name="ESPECIAL DRAMA" tvg-logo="https://i.etsystatic.com/32736505/r/il/1f543d/3502420205/il_300x300.3502420205_i1cf.jpg" group-title="EVENTOS 24/7",ESPECIAL DRAMA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/80050
#EXTINF:-1 tvg-id="" tvg-name="ESPECIAL FAMILIA" tvg-logo="https://i.etsystatic.com/32736505/r/il/1f543d/3502420205/il_300x300.3502420205_i1cf.jpg" group-title="EVENTOS 24/7",ESPECIAL FAMILIA
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48307
#EXTINF:-1 tvg-id="" tvg-name="ESPECIAL TERROR" tvg-logo="https://i.etsystatic.com/32736505/r/il/1f543d/3502420205/il_300x300.3502420205_i1cf.jpg" group-title="EVENTOS 24/7",ESPECIAL TERROR
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/69214
#EXTINF:-1 tvg-id="" tvg-name="NETFLIX" tvg-logo="https://www.muycomputer.com/wp-content/uploads/2021/09/TUDUM.jpg" group-title="EVENTOS 24/7",NETFLIX
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50737
#EXTINF:-1 tvg-id="" tvg-name="ARCHIVOS EXTRATERRESTRES" tvg-logo="https://media.minutouno.com/p/d5e77b8b0a69e0b7955501007e7bb4b0/adjuntos/150/imagenes/027/562/0027562306/610x0/smart/extraterrestres.png" group-title="EVENTOS 24/7",ARCHIVOS EXTRATERRESTRES
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/80052
#EXTINF:-1 tvg-id="" tvg-name="CONCIERTOS" tvg-logo="https://services.meteored.com/img/article/cuales-son-los-proximos-conciertos-en-chile-cartelera-de-abril-a-julio-1713374921938_1280.jpeg" group-title="EVENTOS 24/7",CONCIERTOS
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/57277
#EXTINF:-1 tvg-id="" tvg-name="MUSICALES" tvg-logo="https://cdn.m3u.cl/logo/1550_M_Music_TV.png" group-title="EVENTOS 24/7",MUSICALES
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31699
#EXTINF:-1 tvg-id="" tvg-name="MIX HITS " tvg-logo="https://i.ibb.co/rwPVMBV/113075-Mix-24-7.png" group-title="EVENTOS 24/7",MIX HITS 
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48306
#EXTINF:-1 tvg-id="" tvg-name="MIX CONCIERTOS" tvg-logo="https://i.ibb.co/rwPVMBV/113075-Mix-24-7.png" group-title="EVENTOS 24/7",MIX CONCIERTOS
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/48305
#EXTINF:-1 tvg-id="" tvg-name="MIX POP" tvg-logo="https://i.ibb.co/rwPVMBV/113075-Mix-24-7.png" group-title="EVENTOS 24/7",MIX POP
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31701
#EXTINF:-1 tvg-id="" tvg-name="MIX TOP 100" tvg-logo="https://i.ibb.co/rwPVMBV/113075-Mix-24-7.png" group-title="EVENTOS 24/7",MIX TOP 100
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31703
#EXTINF:-1 tvg-id="" tvg-name="RETRO TV" tvg-logo="https://images.squarespace-cdn.com/content/v1/6011bffa317a1f7611f12428/a38d22de-4b7a-4901-b16c-16652c02bb58/Retro_banner.png" group-title="EVENTOS 24/7",RETRO TV
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/31702
#EXTINF:-1 tvg-id="" tvg-name="RETRO TV 2" tvg-logo="https://images.squarespace-cdn.com/content/v1/6011bffa317a1f7611f12428/a38d22de-4b7a-4901-b16c-16652c02bb58/Retro_banner.png" group-title="EVENTOS 24/7",RETRO TV 2
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/49665
#EXTINF:-1 tvg-id="" tvg-name="RETRO TV 3" tvg-logo="https://images.squarespace-cdn.com/content/v1/6011bffa317a1f7611f12428/a38d22de-4b7a-4901-b16c-16652c02bb58/Retro_banner.png" group-title="EVENTOS 24/7",RETRO TV 3
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/50734
#EXTINF:-1 tvg-id="ATB.bo" tvg-name="ATB" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/5/5a/ATB_logo_nuevo.png" group-title="BOLIVIA",ATB
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/6692
#EXTINF:-1 tvg-id="" tvg-name="Advenir" tvg-logo="https://i.ibb.co/CbkL5fR/Red-Advenir-en-vivo-Online-218x150.png" group-title="BOLIVIA",Advenir
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/39628
#EXTINF:-1 tvg-id="BOLIVIA TV.bo" tvg-name="Bolivia TV (7.1)" tvg-logo="https://static.eldeber.com.bo/Files/Sizes/2020/12/8/la-nueva-imagen-de-bolivia-tv-i-captura._1038948677_1140x520.jpg" group-title="BOLIVIA",Bolivia TV (7.1)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/95
#EXTINF:-1 tvg-id="" tvg-name="Bolivia TV (7.2)" tvg-logo="https://static.eldeber.com.bo/Files/Sizes/2020/12/8/la-nueva-imagen-de-bolivia-tv-i-captura._1038948677_1140x520.jpg" group-title="BOLIVIA",Bolivia TV (7.2)
http://stkip.ddns.me:2082/IreneTello/sHfy5gWfDWFw/90
#EXTINF:-1 tvg-id="BOLIVISION.bo" tvg-name="Bolivisión" tvg-logo="https://vignette.wikia.nocookie.net/logopedia/images/2/2c/BOLIVISION.png" group-title="BOLIVIA",Bolivisión
https://live.airstream.run/alba-bo-bolivision-bolivision/original.m3u8
#EXTINF:-1 tvg-id="" tvg-name="CVC TV" tvg-logo="https://lh3.ggpht.com/qfYBaBhYvtfGtsOpmzs0YLAHGcpbMNcxIUB41tGu8hMmqRPOkUCrcJlzL8pWI_K2vWU8=s180-rw" group-title="BOLIVIA",CVC TV
https://5d00db0e0fcd5.streamlock.net/7034/7034/chunklist_w1269524023.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Mundo Visión TV" tvg-logo="https://i.ibb.co/9wpx5Gs/Mundovisi-n-en-vivo-Online-218x150.png" group-title="BOLIVIA",Mundo Visión TV
https://movil.ejeserver.com/live/mundovisiontv.m3u8
`;

const parseM3U = (m3uString) => {
    const lines = m3uString.trim().split('\n');
    const playlist = [];
    let currentItem = {};

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        if (line.startsWith('#EXTINF')) {
            const logoMatch = line.match(/tvg-logo="([^"]*)"/);
            const titleMatch = line.match(/,(.*)$/);
            
            currentItem = {
                title: titleMatch ? titleMatch[1].trim() : 'Video sin título',
                logoUrl: logoMatch ? logoMatch[1] : null,
                url: null,
            };
        } else if (line.startsWith('http') || line.startsWith('https')) {
            if (currentItem.title) {
                currentItem.url = line;
                playlist.push(currentItem);
                currentItem = {}; 
            }
        }
    }
    return playlist;
};

const VIDEO_CATALOG = parseM3U(M3U_CONTENT);

// ----------------------------------------------------------------------
// 1. COMPONENTE VIDEO CARD (Foco mejorado)
// ----------------------------------------------------------------------

const VideoCard = React.forwardRef(({ video, onPlay, index, isFocused }, ref) => {
    const handlePlay = () => onPlay(video.url);

    return (
        <div 
            ref={ref}
            className={`video-card w-40 h-60 m-2 cursor-pointer transition-all duration-300 
                        hover:scale-110 focus:scale-110 
                        focus:ring-8 focus:ring-yellow-400 focus:ring-offset-4 focus:ring-offset-gray-900 z-10`}
            onClick={handlePlay}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handlePlay();
                }
            }}
            tabIndex="0" 
            data-index={index} 
        >
            <div className="relative w-ll h-full rounded-lg overflow-hidden shadow-lg bg-gray-700"> 
                <img 
                    src={video.logoUrl || 'https://via.placeholder.com/160x240?text=NO+LOGO'}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.border = '2px solid red'; e.target.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-2">
                    <p className="text-white text-xs font-semibold leading-tight break-words max-h-full overflow-hidden">
                        {video.title}
                    </p>
                </div>
            </div>
        </div>
    );
});

// ----------------------------------------------------------------------
// 2. COMPONENTE VIDEO PLAYER (Lógica para aplicar tiempo de inicio)
// ----------------------------------------------------------------------

const VideoPlayer = React.forwardRef(({ url, isPlaying, onFinish }, ref) => {
    
    React.useEffect(() => {
        const video = ref.current;
        if (!video) return;

        const startMatch = url.match(/start=(\d+)/);
        const startTime = startMatch ? parseInt(startMatch[1], 10) : 0;
        
        const cleanUrl = url.split('?')[0];

        let hls;
        const handleEnded = () => onFinish();
        video.addEventListener('ended', handleEnded);

        if (Hls.isSupported() && !cleanUrl.toLowerCase().endsWith('.mp4')) {
            hls = new Hls();
            hls.loadSource(cleanUrl); 
            hls.attachMedia(video);
            
            hls.on(Hls.Events.MANIFEST_PARSED, function() {
                if (startTime > 0) {
                    video.currentTime = startTime;
                }
            });
        } else {
            video.src = cleanUrl;
            
            video.onloadedmetadata = function() {
                if (startTime > 0 && video.readyState >= 2) {
                    video.currentTime = startTime;
                }
            };
        }

        return () => {
            video.removeEventListener('ended', handleEnded);
            video.onloadedmetadata = null; 
            if (hls) {
                hls.destroy();
            }
        };
    }, [url, onFinish, ref]); 

    React.useEffect(() => {
        const video = ref.current;
        if (video) {
            if (isPlaying) {
                video.play().catch(e => console.error("Error al iniciar la reproducción:", e));
            } else {
                video.pause();
            }
        }
    }, [isPlaying, ref]);


    return (
        <div className="player-wrapper bg-black">
            <video
                ref={ref}
                className='react-player'
                width='100%'
                height='100%'
                playsInline
            />
        </div>
    );
});


// ----------------------------------------------------------------------
// 3. COMPONENTE CONTROLES DEL REPRODUCTOR 
// ----------------------------------------------------------------------

const PlayerControls = React.forwardRef(({ 
    onTogglePlay, 
    onSeekForward, 
    onSeekBackward, 
    isPlaying,
    onBack 
}, ref) => {
    const playButtonRef = React.useRef(null);
    const rewindButtonRef = React.useRef(null);
    const forwardButtonRef = React.useRef(null);
    const backButtonRef = React.useRef(null); 

    React.useImperativeHandle(ref, () => ({
        back: backButtonRef.current, 
        rewind: rewindButtonRef.current,
        play: playButtonRef.current,
        forward: forwardButtonRef.current,
        getControls: () => [
            backButtonRef.current, 
            rewindButtonRef.current, 
            playButtonRef.current, 
            forwardButtonRef.current
        ]
    }));

    const buttonClass = "px-6 py-3 bg-blue-600 text-white font-bold rounded-full transition-all duration-200 hover:bg-blue-500 focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 mx-2";

    return (
        <div className="flex justify-center absolute bottom-10 w-full z-50">
            <button
                ref={backButtonRef}
                onClick={onBack}
                className={buttonClass + " bg-gray-500"} 
                tabIndex="0"
                data-control="back"
            >
                🔙 Atrás
            </button>
            <button 
                ref={rewindButtonRef}
                onClick={onSeekBackward}
                className={buttonClass}
                tabIndex="0"
                data-control="rewind"
            >
                ⏪ -10s
            </button>
            <button
                ref={playButtonRef}
                onClick={onTogglePlay}
                className={buttonClass + (isPlaying ? " bg-red-600" : " bg-green-600")}
                tabIndex="0"
                data-control="play"
            >
                {isPlaying ? '⏸️ Pausar' : '▶️ Reanudar'}
            </button>
            <button
                ref={forwardButtonRef}
                onClick={onSeekForward}
                className={buttonClass}
                tabIndex="0"
                data-control="forward"
            >
                ⏩ +10s
            </button>
        </div>
    );
});


// ----------------------------------------------------------------------
// 4. COMPONENTE PRINCIPAL APP (Lógica de Catálogo y Reproductor)
// ----------------------------------------------------------------------

function App() {
    const [videoEnFocoUrl, setVideoEnFocoUrl] = React.useState(null); 
    const [isPlaying, setIsPlaying] = React.useState(true);

    const playerRef = React.useRef(null);
    const controlsRef = React.useRef(null);
    const catalogRef = React.useRef(null);

    const [initialFocusSet, setInitialFocusSet] = React.useState(false);


    // --- LÓGICA DE REPRODUCTOR Y PROGRESO ---

    const togglePlay = React.useCallback(() => {
        setIsPlaying(prev => !prev);
    }, []);

    const seek = React.useCallback((amount) => {
        if (playerRef.current) {
            playerRef.current.currentTime += amount;
        }
    }, []);

    const seekForward = React.useCallback(() => seek(10), [seek]);
    const seekBackward = React.useCallback(() => seek(-10), [seek]);
    
    const handleVideoStop = React.useCallback((url, currentTime) => {
        const videoId = url.split('?')[0];
        const timeInSeconds = Math.floor(currentTime);
        
        if (window.AndroidBridge && window.AndroidBridge.saveVideoProgress) {
            if (timeInSeconds > 10) {
                window.AndroidBridge.saveVideoProgress(videoId, timeInSeconds);
                console.log(`Guardado en Android: ${videoId} @ ${timeInSeconds}s`);
            } else if (window.AndroidBridge.clearVideoProgress) {
                window.AndroidBridge.clearVideoProgress(videoId);
                console.log(`Progreso borrado: ${videoId}`);
            }
        }
    }, []);
    
    const handlePlayVideo = React.useCallback((url) => {
        let finalUrl = url;
        const videoId = url.split('?')[0]; 

        if (window.AndroidBridge && window.AndroidBridge.getVideoProgress) {
            const savedTime = window.AndroidBridge.getVideoProgress(videoId); 

            if (savedTime > 10) {
                finalUrl = `${videoId}?start=${savedTime}`; 
                console.log(`Reanudando video ${videoId} en: ${savedTime}s`);
            }
        }
        
        setVideoEnFocoUrl(finalUrl); 
        setIsPlaying(true);
    }, []);

    const handleBack = React.useCallback(() => {
        if (videoEnFocoUrl && playerRef.current) {
            handleVideoStop(videoEnFocoUrl, playerRef.current.currentTime); 
        }
        
        setVideoEnFocoUrl(null); 
        setIsPlaying(false);
        
        setTimeout(() => {
            const firstCard = document.querySelector('.video-card[data-index="0"]');
            if (firstCard) firstCard.focus();
        }, 50);
    }, [videoEnFocoUrl, handleVideoStop]); 
    
    
    const handleVideoEnd = React.useCallback(() => {
        if (videoEnFocoUrl) {
             handleVideoStop(videoEnFocoUrl, 0); 
        }
        handleBack(); 
        alert("Video finalizado. Volviendo al catálogo.");
    }, [handleBack, videoEnFocoUrl, handleVideoStop]);


    // --- LÓGICA DE NAVEGACIÓN D-PAD EN CATÁLOGO (CORREGIDA FINALMENTE) ---
    // --- LÓGICA DE NAVEGACIÓN D-PAD EN CATÁLOGO (CORREGIDA FINAL) ---
const handleCatalogDpadNavigation = React.useCallback((event) => {
    if (videoEnFocoUrl) return; 

    const key = event.key;
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', ' '].includes(key)) {
        return;
    }

    const currentFocusedElement = document.activeElement;
    const isVideoCard = currentFocusedElement.classList.contains('video-card');

    if (!isVideoCard) return;

    event.preventDefault(); 

    if (key === 'Enter' || key === ' ') {
        currentFocusedElement.click();
        return;
    }

    const focusableElements = Array.from(document.querySelectorAll('.video-card[tabIndex="0"]'));
    // Aseguramos que el índice se lea correctamente
    const currentIndex = parseInt(currentFocusedElement.getAttribute('data-index'), 10);
    
    let nextIndex = -1;
    const TOTAL_ELEMENTS = focusableElements.length;
    const COLUMNS = 6; // NÚMERO DE COLUMNAS DE TU GRID

    if (isNaN(currentIndex) || currentIndex < 0 || currentIndex >= TOTAL_ELEMENTS) {
        console.error("Índice de elemento enfocado no válido.");
        return;
    }

    if (key === 'ArrowRight') {
        // Horizontal Derecha: +1, solo si no es el último elemento del catálogo
        if (currentIndex < TOTAL_ELEMENTS - 1) {
            nextIndex = currentIndex + 1;
        }
    } else if (key === 'ArrowLeft') {
        // Horizontal Izquierda: -1, solo si no es el primer elemento
        if (currentIndex > 0) {
            nextIndex = currentIndex - 1;
        }
    } 
    else if (key === 'ArrowDown') {
        // Vertical Abajo: Salta el número de columnas
        const potentialNextIndex = currentIndex + COLUMNS;
        if (potentialNextIndex < TOTAL_ELEMENTS) {
             nextIndex = potentialNextIndex;
        } else {
             // Si no hay más elementos abajo, saltamos al primer elemento de la ÚLTIMA fila
             nextIndex = TOTAL_ELEMENTS - (TOTAL_ELEMENTS % COLUMNS);
             if (nextIndex === TOTAL_ELEMENTS) {
                 nextIndex = TOTAL_ELEMENTS - COLUMNS; // Asegurar que no exceda el límite
             }
        }
    } else if (key === 'ArrowUp') {
        // Vertical Arriba: Resta el número de columnas
        const potentialNextIndex = currentIndex - COLUMNS;
        if (potentialNextIndex >= 0) {
            nextIndex = potentialNextIndex;
        } else {
            // Si no hay más elementos arriba, saltamos al primer elemento del catálogo (index 0)
            nextIndex = 0;
        }
    }

    // Buscamos y enfocamos el elemento por el nuevo índice calculado
    if (nextIndex >= 0 && nextIndex < TOTAL_ELEMENTS) {
        // Usamos el query selector para encontrar el elemento por su índice
        const nextElement = document.querySelector(`.video-card[data-index="${nextIndex}"]`);
        
        if (nextElement) {
            nextElement.focus();
            nextElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        } else {
             // Esto ocurre si hay un agujero en los índices, lo cual no debería pasar.
             console.warn(`No se encontró el elemento con data-index="${nextIndex}"`);
        }
    }
}, [videoEnFocoUrl]);
    
    // --- LÓGICA DE NAVEGACIÓN D-PAD EN CONTROLES DE REPRODUCTOR ---
    const handleControlsDpadNavigation = React.useCallback((event) => {
        if (!videoEnFocoUrl) return; 
        
        const key = event.key;
        const controls = controlsRef.current ? controlsRef.current.getControls() : [];
        const currentFocusedElement = document.activeElement;
        
        if (!controls.includes(currentFocusedElement) && key !== 'Enter') return; 

        event.preventDefault();

        const currentIndex = controls.indexOf(currentFocusedElement);
        let nextElement = null;

        if (key === 'Enter' || key === ' ') {
            if (currentIndex === -1) {
                 controlsRef.current.play.focus();
            } else {
                 currentFocusedElement.click();
            }
            return;
        }
        
        if (key === 'Escape' || key === 'Backspace') {
              handleBack();
              return;
        }
        
        if (key === 'ArrowRight' || key === 'ArrowLeft') {
            if (currentIndex === -1) return; 

            const nextIndex = key === 'ArrowRight' ? currentIndex + 1 : currentIndex - 1;
            if (nextIndex >= 0 && nextIndex < controls.length) {
                nextElement = controls[nextIndex];
            }
        }
        
        if (nextElement) {
            nextElement.focus();
        }

    }, [videoEnFocoUrl, handleBack]);


    // --- LISTENERS GLOBALES Y FOCO INICIAL ---
    React.useEffect(() => {
        window.addEventListener('keydown', handleCatalogDpadNavigation);
        window.addEventListener('keydown', handleControlsDpadNavigation);
        
        if (!initialFocusSet) {
             setTimeout(() => {
                 const firstCard = document.querySelector('.video-card[data-index="0"]');
                 if (firstCard) {
                     firstCard.focus();
                     setInitialFocusSet(true);
                 }
             }, 500); 
        }

        window.consumeBackButton = () => {
            if (videoEnFocoUrl) {
                handleBack();
                return true; 
            }
            return false; 
        };


        return () => {
            window.removeEventListener('keydown', handleCatalogDpadNavigation);
            window.removeEventListener('keydown', handleControlsDpadNavigation);
            window.consumeBackButton = null; 
        };
    }, [handleCatalogDpadNavigation, handleControlsDpadNavigation, initialFocusSet, videoEnFocoUrl, handleBack]);
    
    
    // --- RENDERIZADO CONDICIONAL ---

    if (videoEnFocoUrl) {
        return (
            <div className="relative w-screen h-screen bg-black">
                <VideoPlayer 
                    ref={playerRef} 
                    url={videoEnFocoUrl} 
                    isPlaying={isPlaying}
                    onFinish={handleVideoEnd} 
                />
                
                <PlayerControls
                    ref={controlsRef}
                    onTogglePlay={togglePlay}
                    onSeekForward={seekForward}
                    onSeekBackward={seekBackward}
                    isPlaying={isPlaying}
                    onBack={handleBack}
                />
                
                <div className="absolute top-4 right-4 text-gray-400 z-50 text-sm">
                    Reproduciendo: {VIDEO_CATALOG.find(v => v.url === videoEnFocoUrl.split('?')[0])?.title || "Desconocido"}
                </div>
            </div>
        );
    }

    return (
        <div ref={catalogRef} className="p-8 max-w-7xl mx-auto min-h-screen bg-gray-900 text-white">
             <h1 className="text-4xl font-bold mb-8 text-blue-500">
                 🎞️ Catálogo Studio Ghibli
             </h1>
             
             <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6">
                 {VIDEO_CATALOG.map((video, index) => (
                     <VideoCard 
                         key={video.url}
                         video={video} 
                         onPlay={handlePlayVideo} 
                         index={index}
                     />
                 ))}
             </div>
             
             <div className="text-center text-sm text-gray-500 mt-10">
                 Usa las flechas (D-Pad) para navegar y Enter/Espacio para seleccionar.
             </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// RENDERIZADO
// ----------------------------------------------------------------------

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);