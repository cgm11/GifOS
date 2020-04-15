var apiKey = "NAz9pZ4kMqJeL2Nc9hRPXSHJL6jyOuYE";

document.getElementById("btn-buscar").onclick = () => getSearchResults();

//Función para obtener los guifos de la sección hoy te sugerimos cuando recargan la página
function getWeSuggestResults() {
    const found = fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=21&rating=G`)
        .then(response => {
            return response.json();
        })
        .then(datos => {
            //ciclo para insertar los 4 gifs de la parte hoy te sugerimos
            for (let i = 0; i < 4; i++) {
                let gif = datos.data[i].images.original.url;
                let width = datos.data[i].images.original.width;
                let contSuger = `<div class="min-header head-suger">
                                    <p>#ejemplo</p>
                                    <img src="./assets/button3.svg" alt="Botón cerrar">
                                </div>
                                <div class="cont cont-suger">
                                    <img id="imHoy${i}" src="${gif}" class="cont-suger">
                                    <button>Ver más...</button>
                                </div>`;
                let div = document.createElement("div");
                div.className = "guifos-column";
                div.innerHTML = contSuger;
                document.getElementById("gifSuger").append(div);
                if (width <= 480) {
                    document.getElementById(`imHoy${i}`).style.width = "280px";
                    document.getElementById(`imHoy${i}`).style.height = "280px";
                } else {
                    
                    document.getElementById(`imHoy${i}`).style.width = "570px";
                    document.getElementById(`imHoy${i}`).style.height = "280px";
                }
            }
            //Ciclo para insertar los gifs de la seccion tendencias
            for (let i = 4; i < datos.data.length; i++) {
                let gif = datos.data[i].images.original.url;
                let width = datos.data[i].images.original.width;
                let contTrend = `<div class="cont cont-trend">
                                    <img id="trend${i}" src="${gif}" class="cont-suger">
                                </div>`;
                let div = document.createElement("div");
                div.className = "guifos-column";
                div.innerHTML = contTrend;
                document.getElementById("gifTrend").append(div);
                if (width <= 480) {
                    document.getElementById(`trend${i}`).style.width = "280px";
                    document.getElementById(`trend${i}`).style.height = "298px";
                } else {
                    
                    document.getElementById(`trend${i}`).style.width = "570px";
                    document.getElementById(`trend${i}`).style.height = "298px";
                }
            }
        })
        .catch(error => {
            return error;
        })
}
getWeSuggestResults();

//Función para buscar Gifos
function getSearchResults() {
    let search = document.getElementById("in-buscar").value;
    const found = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=21&offset=0&rating=G`)
        .then(response => {
            return response.json();
        })
        .then(datos => {
            for (let i = 0; i < 4; i++) {
                let gif = datos.data[i].images.original.url;
                document.getElementById(`imHoy${i}`).setAttribute("src", gif)
            }   
            for (let i = 4; i < datos.data.length; i++) {
                let gif = datos.data[i].images.original.url;
                console.log(gif);
                document.getElementById(`trend${i}`).setAttribute("src", gif)
            }         
        })
        .catch(error => {
            return error;
        })
}