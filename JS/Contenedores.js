class Contenedores {
    constructor() { }

    //**las clases btn y btn-capt se usan para mostrar y ocultar los botones respectivamente según sea necesario

    //Función para cambiar el estilo del contenedor crearGif antes de encender la camara
    contenedorCamara = (contCrear, tituloContenedor, contenedorCamara) => {
        contCrear.classList.replace("crearGif", "crearGif-push");
        contenedorCamara.classList.remove("hidden");
        tituloContenedor.innerHTML = "Un Chequeo Antes de Empezar";
        document.getElementById("window").style.display = "none";
        document.getElementsByClassName("cont-crear")[0].style.display = "none";
        document.getElementById('close-record').classList.remove("hidden");
        let contBtnIni = document.getElementsByClassName("btn")[0];//contenedor de botones iniciales
        let contBtnCap = document.getElementsByClassName("btn-capt")[0];//contenedor de botones para grabar
        contBtnIni.classList.replace("btn", "btn-capt");
        contBtnCap.classList.replace("btn-capt", "btn");
        contBtnCap.classList.add("btn-record");
    }

    //funcion para cambiar el contenedor mientras se graba el video
    contenedorGrabando = (tituloContenedor) => {
        let contBtnCap = document.getElementsByClassName("btn")[0];//contenedor de botones para grabar    
        contBtnCap.classList.remove("btn-record");
        contBtnCap.classList.replace("btn", "btn-capt");
        tituloContenedor.innerHTML = "Capturando Tu Guifo";
        let contStop = document.getElementById("stop");
        contStop.classList.replace("btn-capt", "btn");
        contStop.classList.add("btn-record");
        let cronometro = document.getElementById("timer");
        cronometro.classList.remove("btn-record");
        cronometro.setAttribute("style", "display: flex;");
    }

    //funcion para camiar el contenedor para mostrar el preview del gif
    contenedorPreview = (tituloContenedor, barra) => {
        let contBtnStop = document.getElementsByClassName("btn")[0];//contenedor de botones para detener grabación 
        contBtnStop.classList.replace("btn", "btn-capt");
        contBtnStop.classList.remove("btn-record");
        let contPreview = document.getElementById("preview");
        contPreview.classList.replace("btn-capt", "btn");
        let btnPlay = document.getElementById("btn-play");
        btnPlay.classList.remove("hidden");
        barra.classList.replace("hidden", "barra");
        tituloContenedor.innerHTML = "Vista Previa";
    }

    contenerdorSubir(contenedorCamara, contenedorSubir, tituloContenedor, barra){
        let contBtnCancel = document.getElementsByClassName("btn")[0];//contenedor de botones para subir gif
        contBtnCancel.classList.replace("btn", "btn-capt");        
        let contSubir = document.getElementById("subir");
        contSubir.classList.replace("btn-capt", "btn");
        document.getElementById("grid").classList.replace("grid", "hidden");
        contenedorCamara.classList.add("hidden");
        contenedorSubir.classList.replace("hidden", "contSubir");
        tituloContenedor.innerHTML = "Subiendo Guifo";
        barra.classList.add("barraSubir");
    }
}