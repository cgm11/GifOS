var recorder, elementCamara;
var blob;
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
        blob = await recorder.getBlob();
        let form = new FormData();
        form.append('api_key', apiKey);
        form.append('username', 'cgm11');        
        form.append('file', blob, 'myGif.gif');
        form.append('tags', 'Carolina, García, cgm11, DWFS');
        urlgif = URL.createObjectURL(blob);
        video.srcObject.getTracks().forEach(track => { // now close each track by having forEach loop            
            track.stop();// stopping every track
        });
        await recorder.reset();
        await recorder.destroy();
        cronometro.stop();
        video.srcObject = null;
        return form;
    }

    tomarFoto = () => {
        let video = document.getElementById("video");
        let canvas = document.getElementById("canvas");
        canvas.width = 832;
        canvas.height = 434;
        canvas.getContext('2d').drawImage(video, 0, 0, 832, 434);
        urlImg = canvas.toDataURL('image/png');
        let contSuger = `<img id='imgPreview' src="${urlImg}">`;
        return contSuger;
    }

    descagarGif = () =>{
        invokeSaveAsDialog(blob);
    }
}