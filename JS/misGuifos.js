var urlgif, file, foto, urlImg;
var apiKey = "NAz9pZ4kMqJeL2Nc9hRPXSHJL6jyOuYE";
const tema = localStorage.getItem("theme");

//Elementos del HTML
const principal = document.querySelector("body");
const idBtnCrearGuifo = document.getElementById("btn-crear");
const idBtnCancelar = document.getElementById("btn-cancelar");
const idBtnGrabar = document.getElementById("btn-record");
const idBtnStop = document.getElementById("btn-stop");
const idBtnPlay = document.getElementById("btn-play");
const idBtnRepetir = document.getElementById("btn-repetir");
const idBtnSubir = document.getElementById("btn-subir");
const idBtnCancelSubir = document.getElementById("btn-cancelSubir");
const idBtnListo = document.getElementById("btn-listo");
const idBtnDescargar = document.getElementById("btn-descargar");
const idBtnCopiarUrl = document.getElementById("btn-copiar");
const contenedorCrear = document.getElementsByClassName("crearGif")[0];
const contenedorCamara = document.getElementById("contRecord");
const contenedorSubir = document.getElementById("contSubir");
const contenedorListo = document.getElementById("cont-gifListo");
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

idBtnStop.addEventListener("click", async ()  => {  
    foto = camara.tomarFoto();  
    file = await camara.detenerGrabacion(cronometro);
    contenedores.contenedorPreview(tituloContenedor, barra, contenedorCamara, foto);        
})

idBtnPlay.addEventListener("click", () => {
    imgPreview = document.getElementById("imgPreview");
    imgPreview.src = urlgif;
    cronometro.barra(partesBarra);
})

idBtnRepetir.addEventListener("click", () => location.reload());

idBtnSubir.addEventListener("click", () => {
    contenedores.contenerdorSubir(contenedorCamara, contenedorSubir, tituloContenedor, barraSubir);
    consumoApi.subirGif(file, contenedores, contenedorListo, contenedorSubir, tituloContenedor, urlImg, consumoApi);
    cronometro.barraSubir(partesBarraSb);    
});

idBtnCancelSubir.addEventListener("click", () => location.reload());

idBtnListo.addEventListener("click", () => {
    consumoApi.misGifos();
    document.location.href="../index.html";
});

idBtnDescargar.addEventListener("click", () => {
    camara.descagarGif();
})

idBtnCopiarUrl.addEventListener("click", () => {
    consumoApi.urlGifById();
})
consumoApi.misGifos();

function cambioTema(tema){
    if (tema) {
        // Change css theme
        if (tema === 'SailorNight') {
            principal.classList.add('SailorNight');
            let logoOscuro = document.querySelector(".cont-logo .logo img");
            logoOscuro.src = "../assets/gifOF_logo_dark.png";
        } else {
            principal.classList.remove('SailorNight');
            let logoOscuro = document.querySelector(".cont-logo .logo img");
            logoOscuro.src = "../assets/gifOF_logo.png";
        }
      }
}
cambioTema(tema);