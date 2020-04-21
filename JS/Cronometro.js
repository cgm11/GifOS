var timeBegan = null,
    timeStopped = null,
    stoppedDuration = 0,
    started = null,
    index = 0,
    indexSb = 0,
    colores,
    timeElapsed,
    repetir = 0;

class Cronometro {
    constructor() {
    }

    start = () => {
        if (timeBegan === null) {
            timeBegan = new Date();
        }

        if (timeStopped !== null) {
            stoppedDuration += (new Date() - timeStopped);
        }

        started = setInterval(() => {
            var currentTime = new Date();
                timeElapsed = new Date(currentTime - timeBegan - stoppedDuration);
            var hour = timeElapsed.getUTCHours()
                , min = timeElapsed.getUTCMinutes()
                , sec = timeElapsed.getUTCSeconds()
                , ms = timeElapsed.getUTCMilliseconds();

            document.getElementById("timer").innerHTML =
                (hour > 9 ? hour : "0" + hour) + ":" +
                (min > 9 ? min : "0" + min) + ":" +
                (sec > 9 ? sec : "0" + sec) + "." +
                (ms > 99 ? ms : ms > 9 ? "0" + ms : "00" + ms);
        }, 10);
    }

    stop = () => {
        timeStopped = new Date();
        clearInterval(started);
        timeElapsed = Number(timeElapsed);
    }

    reset = () => {
        clearInterval(started);
        stoppedDuration = 0;
        timeBegan = null;
        timeStopped = null;
        document.getElementById("timer").innerHTML = "00:00:00.000";
    }

    barra = (barra) => {  
        clearInterval(colores);
        index = 0;    
        colores = setInterval(() => {
            barra[index].classList.toggle("cambioColor");
            index++;
            if (index >= barra.length) {
                index = 0;
            }
        }, timeElapsed/17);
    }

    barraSubir = (barra) => {      
        indexSb = 0;
        colores = setInterval(() => {
            barra[indexSb].classList.toggle("cambioColor");
            indexSb++;
            if (indexSb >= barra.length) {           
                indexSb = 0;
            }
        }, 500);
    }
}