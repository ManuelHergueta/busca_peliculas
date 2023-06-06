import { buscaPeliPorTitulo } from "./movie-api";

const body = document.body;
let tablaBody;

export const crearHTML = () => {
    const html = `
    
    <div class="container mt-5">
    <div class="row">
        <div class="col-12">
            <h1 class="mb-3">Buscar Pelis</h1>
            <div class="mb-4">
                <input id="inputBusqueda" type="text" class="form-control" placeholder="Buscar Películas">
            </div>
            <hr>

            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Titulo</th>
                        <th scope="col">Año</th>
                        <th scope="col">imdbID</th>
                        <th scope="col">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
</div>
    `;

    const div= document.createElement('div');
    div.innerHTML = html;
    body.appendChild(div);

    tablaBody = document.querySelector('tbody');
}

const llenarFilaTabla = (pelicula) => {

    const html = `
    <td scope="col">${pelicula.Title}</td>
    <td scope="col">${pelicula.Year}</td>
    <td scope="col">${pelicula.imdbID}</td>
    <td scope="col">${pelicula.Type}</td>
    `;
    const tr = document.createElement('tr');
    tr.innerHTML = html;
    tablaBody.appendChild(tr);
}

const darMensajeSinResultados = () => {
    const html = 'No se encontraron resultados';
    const p = document.createElement('p');
    p.id = 'sinResultados';
    p.innerHTML = html;
    p.className = 'fs-3 text-danger mx-5';
    body.appendChild(p);
}

export const init = async(pelicula) => {
    const peliculas = await buscaPeliPorTitulo(pelicula);
    tablaBody.innerHTML = '';
    const sinResultadosParrafo = document.getElementById('sinResultados');
    if (sinResultadosParrafo) {
        sinResultadosParrafo.remove();
    }
    if (peliculas !== undefined && peliculas !== null) {
        peliculas.forEach(llenarFilaTabla)
    } else {
        darMensajeSinResultados();
    }
    
} 
