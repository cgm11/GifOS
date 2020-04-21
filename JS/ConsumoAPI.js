class ConsumoAPI{
    constructor(){

    }

    subirGif = (apiKey, file) => {
        fetch(`upload.giphy.com/v1/gifs?api_key=${apiKey}&username=cgm11&file=${file}&tags=Caro, cgm11, Garcia, DWFS`)
        .then(response => {
            return response.json();
        })
        .then(datos => {
            console.log(datos);       
        })
        .catch(error => {
            return error;
        })
    }
}