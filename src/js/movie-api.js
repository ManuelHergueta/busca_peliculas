const apiKey = '25c6a9f8';
const urlBusqueda = `https://www.omdbapi.com/?apikey=${apiKey}&s=`;

const buscaPeliPorTitulo = async (busqueda, pagina = 1) => {
    let peliculas = [];
    let totalPaginas;
    try {
        const resultado = await fetch(urlBusqueda+busqueda+`&page=${pagina}`);
        const respuesta = await resultado.json();
        if(respuesta.Response){
            peliculas = respuesta.Search;
            let resultadosTotales = respuesta.totalResults;
            totalPaginas = Math.ceil(resultadosTotales/10);
        } 
    } catch(err) {
        throw err;
    }
    return {
        peliculas: peliculas,
        totalPaginas: totalPaginas
    };
}

export {
    buscaPeliPorTitulo
}