const apiKey = '25c6a9f8';
const urlBusqueda = `https://www.omdbapi.com/?apikey=${apiKey}&s=`;

const buscaPeliPorTitulo = async (busqueda) => {
    let peliculas = [];
    try {
        const resultado = await fetch(urlBusqueda+busqueda);
        const respuesta = await resultado.json();
        if(respuesta.Response){
            //console.log('ESTA ES RESPUESTA: ---->>>  ', respuesta);
            peliculas = respuesta.Search;
            //console.log('ESTE ES PELICULAS: ', peliculas);
            //console.log('NUMERO DE RESULTADOS: ', respuesta.totalResults);
        } 
    } catch(err) {
        throw err;
    }
    return peliculas;
}

export {
    buscaPeliPorTitulo
}