var apiKey = "NAz9pZ4kMqJeL2Nc9hRPXSHJL6jyOuYE";
document.getElementById("btn-buscar").onclick = () => getSearchResults("");
const tema = localStorage.getItem("theme");

const idBtnTema = document.getElementById("tema");
const idBtnDia = document.getElementById("btn-dia");
const idBtnNoche = document.getElementById("btn-noche");
const principal = document.querySelector("body");
const inputValue = document.getElementById("in-buscar");
const lupa = document.querySelector(".cont-buscar button img");
const btnBuscar = document.getElementById("btn-buscar");
const ul = document.getElementsByTagName("ul")[1];
const valorBusqueda = document.getElementById("valorBusqueda");

idBtnTema.addEventListener("click", () => {
    let menu = document.querySelector(".logo ul");
    let elementStyle = window.getComputedStyle(menu);
    let elementDisplay = elementStyle.getPropertyValue('display');
    if(elementDisplay == "none"){
        menu.style.display = "flex";
        document.getElementsByClassName("juntos")[0].classList.add("active");
        document.getElementsByClassName("juntos")[1].classList.add("active");
    }else{
        menu.style.display = "none";
        document.getElementsByClassName("juntos")[0].classList.remove("active");
        document.getElementsByClassName("juntos")[1].classList.remove("active");
    }
})

idBtnNoche.addEventListener("click", () => {
    let logoOscuro = document.querySelector(".cont-logo .logo img");
    logoOscuro.src = "./assets/gifOF_logo_dark.png";
    let imgLupa = document.querySelector(".cont-buscar button img");
    imgLupa.src = "./assets/Combined Shape.svg";
    let menu = document.querySelector(".logo ul");
    menu.style.display = "none";
    principal.classList.add("SailorNight");
    document.getElementsByClassName("juntos")[0].classList.remove("active");
    document.getElementsByClassName("juntos")[1].classList.remove("active");
    localStorage.setItem("theme", "SailorNight");
})

idBtnDia.addEventListener("click", () => {
    let logoOscuro = document.querySelector(".cont-logo .logo img");
    logoOscuro.src = "./assets/gifOF_logo.png";
    let imgLupa = document.querySelector(".cont-buscar button img");
    imgLupa.src = "./assets/lupa_inactive.svg";
    let menu = document.querySelector(".logo ul");
    menu.style.display = "none";
    principal.classList.remove("SailorNight");
    document.getElementsByClassName("juntos")[0].classList.remove("active");
    document.getElementsByClassName("juntos")[1].classList.remove("active");
    localStorage.setItem("theme", "");
})


palabrasRelacionadas = () =>{
    let letras = inputValue.value;    
    if(letras.length > 2){
        lupa.src = "./assets/lupa.svg"
        btnBuscar.classList.remove("btn-buscar-inactive");
        if(principal.classList.contains("SailorNight")){
            btnBuscar.classList.add("btn-buscar-active");
            lupa.src = "./assets/lupa_light.svg"
        }
        ul.style.display = "flex";
    }else{
        lupa.src = "./assets/lupa_inactive.svg"
        btnBuscar.classList.add("btn-buscar-inactive");
        btnBuscar.classList.remove("btn-buscar-push");
        btnBuscar.classList.remove("btn-buscar-active");
        if(principal.classList.contains("SailorNight")){
            lupa.src = "./assets/Combined Shape.svg";
        }
        ul.style.display = "none";        
    }
    document.querySelector(".btn-busqueda").style.display = "none";
}

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
                let title = datos.data[i].title;                
                title = title.split("GIF");
                let contSuger = `<div class="min-header head-suger">
                                    <p>#${title[0].replace(/ /g, '')}</p>
                                    <img src="./assets/button3.svg" alt="Botón cerrar">
                                </div>
                                <div class="cont cont-suger">
                                    <img id="imHoy${i}" src="${gif}" class="cont-suger">
                                    <button class="btn-azul" onclick="getSearchResults('${title[0]}')">Ver más...</button>
                                </div>`;
                let div = document.createElement("div");
                div.className = "guifos-column";
                div.innerHTML = contSuger;
                document.getElementById("gifSuger").append(div);
                document.getElementById(`imHoy${i}`).style.width = "280px";
                document.getElementById(`imHoy${i}`).style.height = "280px";
            }
            //Ciclo para insertar los gifs de la seccion tendencias
            for (let i = 4; i < datos.data.length; i++) {
                let gif = datos.data[i].images.original.url;
                let width = datos.data[i].images.original.width;
                let title = datos.data[i].title;
                title = title.split("GIF");
                let contTrend = `<div class="cont cont-trend">
                                    <img id="trend${i}" src="${gif}" class="cont-suger">
                                </div>
                                <div class="min-header head-trend">
                                    <p id="p-trend${i}">#${title[0]}</p>
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
function getSearchResults(boton) { 
    let search   
    if(boton == ""){
        search = document.getElementById("in-buscar").value;
    }else{
        search = boton;
    }
    const found = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${search}&limit=21&offset=0&rating=G`)
        .then(response => {
            return response.json();
        })
        .then(datos => {   
            for (let i = 4; i < datos.data.length; i++) {
                let gif = datos.data[i].images.original.url;
                let title = datos.data[i].title;
                title = title.split("GIF");
                document.getElementById(`trend${i}`).setAttribute("src", gif);
                document.getElementById(`p-trend${i}`).innerHTML = `#${title[0]}`;
            }            
            if(boton == ""){
                valorBusqueda.innerHTML = `${inputValue.value} (resultados)`;
            }else{
                valorBusqueda.innerHTML = `${boton} (resultados)`;
            }            
            btnBuscar.classList.remove("btn-buscar-inactive");
            btnBuscar.classList.add("btn-buscar-push");
            if(principal.classList.contains("SailorNight")){
                lupa.src = "./assets/lupa_light.svg"
            }else{
                lupa.src = "./assets/lupa.svg"
            }
            ul.style.display = "none";
            document.querySelector(".btn-busqueda").style.display = "block";
        })
        .catch(error => {
            return error;
        })        
}
function cambioTema(tema){
    if (tema) {
        // Change css theme
        if (tema === 'SailorNight') {
            principal.classList.add('SailorNight');
            let logoOscuro = document.querySelector(".cont-logo .logo img");
            logoOscuro.src = "./assets/gifOF_logo_dark.png";
            let imgLupa = document.querySelector(".cont-buscar button img");
            imgLupa.src = "./assets/Combined Shape.svg";
        } else {
            principal.classList.remove('SailorNight');
            let logoOscuro = document.querySelector(".cont-logo .logo img");
            logoOscuro.src = "./assets/gifOF_logo.png";
            let imgLupa = document.querySelector(".cont-buscar button img");
            imgLupa.src = "./assets/lupa_inactive.svg";
        }
      }
}
cambioTema(tema);