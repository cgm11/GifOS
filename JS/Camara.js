var recorder, elementCamara;
class Camara {

    constructor() {

    }

    encender = (contenedor) => {//Función para encender la camara
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true
        })
            .then(function (stream) {
                elementCamara = document.createElement("video");
                elementCamara.id = "video";
                contenedor.appendChild(elementCamara);
                elementCamara.srcObject = stream;
                elementCamara.play();
                //Crear el contenedor para tomar foto
                let foto = document.createElement("canvas");
                foto.id = "canvas";
                contenedor.appendChild(foto);
            })
    };

    grabar = (cronometro) => {
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        }).then(async function (stream) {
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                hidden: 240,
                onGifRecordingStarted: function () {
                    cronometro.start();
                },
            });
            recorder.startRecording();
        });
    }

    detenerGrabacion = async (cronometro) => {
        let video = document.getElementById("video");
        await recorder.stopRecording();
        const blob = await recorder.getBlob();
        let form = new FormData();
        await form.append('file', blob, 'myGif.gif');
        urlgif = URL.createObjectURL(blob);
        video.srcObject.getTracks().forEach(track => { // now close each track by having forEach loop            
            track.stop();// stopping every track
        });
        await recorder.reset();
        await recorder.destroy();
        video.srcObject = null;
        cronometro.stop()
        return urlgif;
    }

    tomarFoto = (contenedor) => {
        let video = document.getElementById("video");
        let canvas = document.getElementById("canvas");
        canvas.width = 832;
        canvas.height = 434;
        canvas.getContext('2d').drawImage(video, 0, 0, 832, 434);
        var data = canvas.toDataURL('image/png');
        let contSuger = `<img id='imgPreview' src="${data}">`;
        contenedor.innerHTML = contSuger;
    }
}