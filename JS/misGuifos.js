var urlgif, file;
var apiKey = "NAz9pZ4kMqJeL2Nc9hRPXSHJL6jyOuYE";

//Elementos del HTML
const idBtnCrearGuifo = document.getElementById("btn-crear");
const idBtnCancelar = document.getElementById("btn-cancelar");
const idBtnGrabar = document.getElementById("btn-record");
const idBtnStop = document.getElementById("btn-stop")
const idBtnPlay = document.getElementById("btn-play");
const idBtnRepetir = document.getElementById("btn-repetir");
const idBtnSubir = document.getElementById("btn-subir");
const idBtnCancelSubir = document.getElementById("btn-cancelSubir");
const contenedorCrear = document.getElementsByClassName("crearGif")[0];
const contenedorCamara = document.getElementById("contRecord");
const contenedorSubir = document.getElementById("contSubir");
const tituloContenedor = document.getElementById("p-crear");
const barra = document.getElementById("barra");
const partesBarra = document.getElementsByClassName("bar");
const barraSubir = document.getElementById("barraSubir");
const partesBarraSb = document.getElementsByClassName("barsb");

//Clases
const camara = new Camara();
const contenedores = new Contenedores();
const cronometro = new Cronometro();
const consumoApi = new ConsumoAPI();

//Funcionalidad botones
idBtnCrearGuifo.addEventListener("click", () => {
    contenedores.contenedorCamara(contenedorCrear, tituloContenedor, contenedorCamara);
    camara.encender(contenedorCamara);
});

idBtnCancelar.addEventListener("click", () => document.location.href="../index.html");

idBtnGrabar.addEventListener("click", () => {
    contenedores.contenedorGrabando(tituloContenedor);
    camara.grabar(cronometro);
});

idBtnStop.addEventListener("click", () => {    
    file = camara.detenerGrabacion(cronometro);
    contenedores.contenedorPreview(tituloContenedor, barra);    
    camara.tomarFoto(contenedorCamara);
})

idBtnPlay.addEventListener("click", () => {
    imgPreview = document.getElementById("imgPreview");
    imgPreview.src = urlgif;
    cronometro.barra(partesBarra);
})

idBtnRepetir.addEventListener("click", () => location.reload());

idBtnSubir.addEventListener("click", () => {
    contenedores.contenerdorSubir(contenedorCamara, contenedorSubir, tituloContenedor, barraSubir);
    consumoApi.subirGif(apiKey, file);
    cronometro.barraSubir(partesBarraSb);    
});

idBtnCancelSubir.addEventListener("click", () => location.reload());

