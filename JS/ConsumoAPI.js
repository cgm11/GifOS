class ConsumoAPI {
    constructor() {

    }

    subirGif = (file, contenedores, contenedorListo, contenedorSubir, tituloContenedor, consumoApi) => {
        fetch(`https://upload.giphy.com/v1/gifs`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: file
        })
            .then(response => {
                return response.json();
            })
            .then(datos => {
                console.log("Gifo subido con exito");
                let ids = localStorage.getItem("id's");
                if (ids === null || ids === undefined) {
                    ids = datos.data.id;
                } else {
                    ids = ids + "," + datos.data.id;
                }
                localStorage.setItem("id's", ids);
                contenedores.contenedorListo(contenedorListo, contenedorSubir, tituloContenedor, urlImg);

            })
            .catch(error => {
                console.log(error);
                return error;
            })
    }

    urlGifById = () => {
        let id = localStorage.getItem("id's").split(",")[0];
        let gifById = `https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${id}`
        const el = document.createElement('textarea');
        el.value = gifById;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    misGifos = () => {
        let ids = localStorage.getItem("id's");
        console.log(`api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids}`);
        fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids}`)
            .then(response => {
                return response.json();
            })
            .then(datos => {
                let misGifs = document.getElementById("cont-misGifos");
                misGifs.innerHTML = "";
                for (let i = 0; i < datos.data.length; i++) {
                    let gif = datos.data[i].images.original.url;
                    let width = datos.data[i].images.original.width;
                    let contSuger = `<div class="cont cont-suger">
                                        <img id="miGif${i}" src="${gif}" class="cont-suger">
                                    </div>`;
                    let div = document.createElement("div");
                    div.className = "guifos-column marginGif";
                    div.innerHTML = contSuger;
                    misGifs.append(div);
                    document.getElementById(`miGif${i}`).style.width = "280px";
                    document.getElementById(`miGif${i}`).style.height = "280px";                    
                }
            })
            .catch(error => console.log('error', error));
    }
}