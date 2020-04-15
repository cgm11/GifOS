var recorder;
var cronometro;
var urlgif;
document.getElementById("btn-crear").onclick = () => {
    showStream();
    getStreamAndRecord();
};
document.getElementById("btn-cancelar").onclick = () => {
    document.location.href="../index.html";
};

document.getElementById("btn-record").onclick = () => {
    contenedorRecording();
    recordVideo();
}

document.getElementById("btn-stop").onclick = () => {
    stopRecord();
    contenedorPreview();
    takepicture();
}
document.getElementById("btn-play").onclick = () => {
    imgPreview = document.getElementById("imgPreview");
    console.log(urlgif);
    imgPreview.src = urlgif;
}
document.getElementById("btn-repetir").onclick = () =>{
    location.reload();
}

//Función para encender la camara
function getStreamAndRecord() {

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 434}
        }
    })
        .then(function (stream) {
            let contRecord = document.getElementById("contRecord");
            let video = document.createElement("video");
            video.classList.add("video");
            let foto = document.createElement("canvas");
            foto.id = "canvas";
            contRecord.appendChild(video);
            contRecord.appendChild(foto);
            video.srcObject = stream;
            video.play();
        })
}

//Función para cambiar el estilo del contenedor crearGif antes de encender la camara
function showStream() {
    let contCrear = document.getElementsByClassName("crearGif")[0];
    contCrear.classList.replace("crearGif", "crearGif-push");
    let contRecord = document.createElement("div");
    contRecord.id = "contRecord";
    document.getElementById("p-crear").innerHTML = "Un Chequeo Antes de Empezar";
    document.getElementById("window").style.display = "none";
    document.getElementsByClassName("cont-crear")[0].style.display = "none";
    document.getElementById('close-record').classList.remove("hidden");
    let contBtnIni = document.getElementsByClassName("btn")[0];//contenedor de botones iniciales
    let contBtnCap = document.getElementsByClassName("btn-capt")[0];//contenedor de botones para grabar
    contBtnIni.classList.replace("btn", "btn-capt");
    contBtnCap.classList.replace("btn-capt", "btn");
    contBtnCap.classList.add("btn-record");
    contCrear.appendChild(contRecord);
}

//funcion para cambiar el contenedor mientras se graba el video
function contenedorRecording() {
    let contBtnCap = document.getElementsByClassName("btn")[0];//contenedor de botones para grabar    
    contBtnCap.classList.remove("btn-record");
    contBtnCap.classList.replace("btn", "btn-capt");
    document.getElementById("p-crear").innerHTML = "Capturando Tu Guifo";
    let contStop = document.getElementById("stop");
    contStop.classList.replace("btn-capt", "btn");
    contStop.classList.add("btn-record");
    let cronometro = document.getElementById("timer");
    cronometro.classList.remove("btn-record");
    cronometro.setAttribute("style", "display: flex;");
}

function recordVideo() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(async function (stream) {
        recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            hidden: 240,
            canvas: {
                width: 840,
                height: 480
            },
            onGifRecordingStarted: function () {  
                StartTimer();
            },
        });
        recorder.startRecording();        
    });
}

function takepicture() {
    var videoEl = document.getElementsByTagName('video')[0];
        stream = videoEl.srcObject;// now get the steam         
        tracks = stream.getTracks();// now get all tracks        
        tracks.forEach(function (track) { // now close each track by having forEach loop            
            track.stop();// stopping every track
        });
        let canvas = document.getElementById("canvas");
        canvas.width = 832;
        canvas.height = 434;
        canvas.getContext('2d').drawImage(videoEl, 0, 0, 832, 434);
        var data = canvas.toDataURL('image/png');
        var preview = document.getElementById("contRecord");
        let contSuger = `<img id='imgPreview' src="${data}">`;
        preview.innerHTML = contSuger;
        videoEl.srcObject = null;// assign null to srcObject of video
        //recorder.camera.stop();
}

function stopRecord() {
    recorder.stopRecording(function () {
        let blob = recorder.getBlob();
        //invokeSaveAsDialog(blob);
        let form = new FormData();
        form.append('file', blob, 'myGif.gif');
        urlgif = URL.createObjectURL(blob);
        clearInterval(cronometro);
        console.log("No sé cual es: " + recorder);
       });
       
}

function StartTimer() {
    let contador_ms = 0,
        contador_sg = 0,
        contador_mn = 0,
        contador_hr = 0;
    let ms = document.getElementById("mili"),
        sg = document.getElementById("seg"),
        mn = document.getElementById("min"),
        hr = document.getElementById("hor");

    cronometro = setInterval(function () {
        if (contador_ms == 100) {
            contador_ms = 0;
            contador_sg = contador_sg + 10;
            sg.innerHTML = contador_sg;
            if (contador_sg == 60) {
                contador_sg = 0
                contador_mn++;
                mn.innerHTML = contador_mn;
                if (contador_mn == 60) {
                    contador_mn = 0;
                    contador_hr++;
                    hr.innerHTML = contador_hr;
                }
            }
        }
        ms.innerHTML = contador_ms;
        contador_ms++;
    }, 10);
}

function contenedorPreview() {
    let contBtnCap = document.getElementsByClassName("btn")[0];//contenedor de botones para detener grabación 
    contBtnCap.classList.replace("btn", "btn-capt");
    contBtnCap.classList.remove("btn-record");
    let contPreview = document.getElementById("preview");
    contPreview.classList.replace("btn-capt", "btn");
    let btnPlay = document.getElementById("btn-play");
    btnPlay.classList.remove("hidden");
    let barra = document.getElementById("barra");
    barra.classList.replace("hidden", "barra");
    document.getElementById("p-crear").innerHTML = "Vista Previa";
}

