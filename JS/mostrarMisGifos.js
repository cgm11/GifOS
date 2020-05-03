var apiKey = "NAz9pZ4kMqJeL2Nc9hRPXSHJL6jyOuYE";
const tema = localStorage.getItem("theme");
const principal = document.querySelector("body");
const idBtnTema = document.getElementById("tema");
const idBtnDia = document.getElementById("btn-dia");
const idBtnNoche = document.getElementById("btn-noche");

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
    logoOscuro.src = "../assets/gifOF_logo_dark.png";
    let menu = document.querySelector(".logo ul");
    menu.style.display = "none";
    principal.classList.add("SailorNight");
    document.getElementsByClassName("juntos")[0].classList.remove("active");
    document.getElementsByClassName("juntos")[1].classList.remove("active");
    localStorage.setItem("theme", "SailorNight");
})

idBtnDia.addEventListener("click", () => {
    let logoOscuro = document.querySelector(".cont-logo .logo img");
    logoOscuro.src = "../assets/gifOF_logo.png";
    let menu = document.querySelector(".logo ul");
    menu.style.display = "none";
    principal.classList.remove("SailorNight");
    document.getElementsByClassName("juntos")[0].classList.remove("active");
    document.getElementsByClassName("juntos")[1].classList.remove("active");
    localStorage.setItem("theme", "");
})


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
misGifos = () => {
    let ids = localStorage.getItem("id's");
    console.log(`api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids}`);
    fetch(`https://api.giphy.com/v1/gifs?api_key=${apiKey}&ids=${ids}`)
        .then(response => {
            return response.json();
        })
        .then(datos => {
            let misGifs = document.getElementById("cont-misGifos");
            let cont =document.getElementsByClassName("contMisGigos")[0];
            cont.style.marginTop = "16px";
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
cambioTema(tema);
misGifos();