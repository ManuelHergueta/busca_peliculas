const apiKey = '25c6a9f8';
const urlApi = `https://www.omdbapi.com/?apikey=${apiKey}`;

const buscaPeliPorTitulo = async (busqueda, pagina = 1) => {
    let peliculas = [];
    let totalPaginas;
    try {
        const resultado = await fetch(urlApi+`&s=${busqueda}&page=${pagina}`);
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

const detalleDePelicula = async(imdbID) => {
    let peliculaDetallada = {};
    try {
        const resultado = await fetch(urlApi+`&i=${imdbID}`);
        peliculaDetallada = await resultado.json();
        if (!peliculaDetallada.Response) {
            throw err;
        }
    } catch (err) {
        throw err;
    }
    return peliculaDetallada;
}

export {
    buscaPeliPorTitulo,
    detalleDePelicula
}