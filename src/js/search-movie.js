import { Modal } from 'bootstrap';

import { buscaPeliPorTitulo, detalleDePelicula } from "./movie-api";


const body = document.body;
let tablaBody;


export const crearHTML = () => {
    const html = `
    <div class="container mt-5">
        <div class="row">
            <div class="col-12">
                <h1 class="mb-3">Buscar películas, series y +</h1>
                <div class="mb-4">
                    <input id="inputBusqueda" type="text" class="form-control" placeholder="Buscar título">
                </div>
                <span class="small text-muted mx-3">Pulsa sobre la fila de la que quieras ver el detalle.</span>
                <hr class="mt-0">
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
    //Para luego poder seleccionarlo para el detalle
    tr.setAttribute('id',pelicula.imdbID); 
    tr.style.cursor = 'pointer';
    tr.addEventListener('click', (event) => {
        crearPaginaDetallePelicula(event.currentTarget.id);
    });
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


const crearPaginaDetallePelicula = async (imdbID) => {
    const objPelicula = await detalleDePelicula(imdbID);
    if(objPelicula.Poster === 'N/A' || objPelicula.Poster === ''){
        objPelicula.Poster = 'https://cdn.pixabay.com/photo/2015/10/30/12/14/search-1013910_1280.jpg'
    };

    const modalContent = `
    <style>
        .modal-title-custom {
            font-size: 2rem;
        }
        .card-img-right {
            max-width: 90%;
            height: auto;
            display: block;
            margin: 0 auto;
        }
    </style>
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title modal-title-custom">${objPelicula.Title} (${objPelicula.Year})</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
            </div>
            <div class="modal-body">
                <div class="row no-gutters">
                    <div class="col-lg-6">
                        <p><strong>Calificado:</strong> ${objPelicula.Rated}</p>
                        <p><strong>Publicado:</strong> ${objPelicula.Released}</p>
                        <p><strong>Duración:</strong> ${objPelicula.Runtime}</p>
                        <p><strong>Género:</strong> ${objPelicula.Genre}</p>
                        <p><strong>Director:</strong> ${objPelicula.Director}</p>
                        <p><strong>Actores:</strong> ${objPelicula.Actors}</p>
                        <p><strong>Idioma:</strong> ${objPelicula.Language}</p>
                        <p><strong>Pais:</strong> ${objPelicula.Country}</p>
                        <p><strong>Premios:</strong> ${objPelicula.Awards}</p>
                        <p><strong>IMDB Rating:</strong> ${objPelicula.imdbRating}</p>
                        <p><strong>IMDB Votes:</strong> ${objPelicula.imdbVotes}</p>
                        <p><strong>Recaudación:</strong> ${objPelicula.BoxOffice}</p>
                        <p><strong>Trama:</strong> ${objPelicula.Plot}</p>
                    </div>
                    <div class="col-lg-6 d-flex justify-content-center align-items-center">
                        <img class="img-fluid" src="${objPelicula.Poster}" alt="Poster">
                    </div>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
                <button type="button" class="btn btn-secondary w-25" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>

            `;
        
            // Seleccionamos el modal, si no exite lo creamos
            let modal = document.getElementById('detallePeliculaModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'detallePeliculaModal';
                modal.classList.add('modal');
                modal.tabIndex = -1;
                modal.setAttribute('aria-hidden', 'true');
                document.body.appendChild(modal);
            }
        
            //Actualiza modal y lo pinta
            modal.innerHTML = modalContent;
            let myModal = new Modal(modal);
            myModal.show();
        }


export const init = async(pelicula, pagina=1) => {
    const data = await buscaPeliPorTitulo(pelicula, pagina);
    tablaBody.innerHTML = '';
    const sinResultadosParrafo = document.getElementById('sinResultados');
    if (sinResultadosParrafo) {
        sinResultadosParrafo.remove();
    };
    if (data.peliculas !== undefined && data.peliculas !== null) {
        data.peliculas.forEach(llenarFilaTabla);
        crearBotonesPaginacion(data.totalPaginas, pelicula, pagina);
    } else {
        darMensajeSinResultados();
    };
} 
