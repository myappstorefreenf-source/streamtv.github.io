window.ControlAdultos = {
    estaBloqueado: true,
    
    verificarAcceso: (callbackExito) => {
        const pin = prompt("INGRESE EL PIN DE SEGURIDAD:"); // En TV usaremos un modal propio
        if (pin === window.AppConfig.PIN_ADULTOS) {
            window.ControlAdultos.estaBloqueado = false;
            callbackExito();
        } else {
            alert("PIN INCORRECTO");
        }
    },
    
    filtrarLista: (lista) => {
        if (!window.ControlAdultos.estaBloqueado) return lista;
        return lista.filter(cat => !window.AppConfig.CATEGORIAS_BLOQUEADAS.includes(cat.toUpperCase()));
    }
};