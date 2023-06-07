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
    <div class="container mt-5">
        <div class="d-flex justify-content-center">
            <nav aria-label="Page navigation example">
                <ul id="paginacion" class="pagination">
                </ul>
            </nav>
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
    const divPaginacion = document.getElementById('paginacion');
    if (divPaginacion) {
        divPaginacion.innerHTML = '';
    }
}

const crearBotonesPaginacion = (totalPaginas, pelicula, paginaActual) => {
    const divPaginacion = document.getElementById('paginacion');
    divPaginacion.innerHTML = '';
    const botonesAVer = 7;
    let inicio = Math.max(1, paginaActual - Math.floor(botonesAVer/2));
    let fin = Math.min(totalPaginas, inicio + botonesAVer - 1);
    inicio = Math.max(1, fin - botonesAVer + 1);
    for (let i = inicio; i <= fin; i++) {
        const li = document.createElement('li');
        li.className = 'page-item';
        if(i === paginaActual) {
            li.classList.add('active');
        }
        const a = document.createElement('a');
        a.className = 'page-link';
        a.href = '#';
        a.textContent = i;
        a.addEventListener('click', (e) => {
            e.preventDefault();
            init(pelicula, i);
        });
        li.appendChild(a);
        divPaginacion.appendChild(li);
    }
}

export const init = async(pelicula, pagina=1) => {
    const data = await buscaPeliPorTitulo(pelicula, pagina);
    tablaBody.innerHTML = '';
    const sinResultadosParrafo = document.getElementById('sinResultados');
    if (sinResultadosParrafo) {
        sinResultadosParrafo.remove();
    }
    if (data.peliculas !== undefined && data.peliculas !== null) {
        data.peliculas.forEach(llenarFilaTabla);
        crearBotonesPaginacion(data.totalPaginas, pelicula, pagina);
    } else {
        darMensajeSinResultados();
    }
} 
