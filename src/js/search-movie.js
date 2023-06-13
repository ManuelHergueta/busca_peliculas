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
    //console.log('DETALLEDEPELICULA: ',objPelicula);
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${objPelicula.Title}</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <style>
        .card {
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 3px 20px rgba(0,0,0,0.3);
        }
        .card-img-right {
            object-fit: cover;
            width: 100%;
            height: 100%;
        }
    </style>
    </head>
    <body>
        <div class="container py-5">
            <div class="card mx-auto" style="max-width: 1200px;">
                <div class="row no-gutters">
                    <div class="col-md-7">
                        <div class="card-body">
                            <h1 class="card-title mb-4">${objPelicula.Title} (${objPelicula.Year})</h1>
                            <p class="card-text"><strong>Calificado:</strong> ${objPelicula.Rated}</p>
                            <p class="card-text"><strong>Publicado:</strong> ${objPelicula.Released}</p>
                            <p class="card-text"><strong>Duración:</strong> ${objPelicula.Runtime}</p>
                            <p class="card-text"><strong>Género:</strong> ${objPelicula.Genre}</p>
                            <p class="card-text"><strong>Director:</strong> ${objPelicula.Director}</p>
                            <p class="card-text"><strong>Actores:</strong> ${objPelicula.Actors}</p>
                            <p class="card-text"><strong>Idioma:</strong> ${objPelicula.Language}</p>
                            <p class="card-text"><strong>Pais:</strong> ${objPelicula.Country}</p>
                            <p class="card-text"><strong>Premios:</strong> ${objPelicula.Awards}</p>
                            <p class="card-text"><strong>IMDB Rating:</strong> ${objPelicula.imdbRating}</p>
                            <p class="card-text"><strong>IMDB Votes:</strong> ${objPelicula.imdbVotes}</p>
                            <p class="card-text"><strong>Recaudación:</strong> ${objPelicula.BoxOffice}</p>
                            <p class="card-text"><strong>Trama:</strong> ${objPelicula.Plot}</p>
                        </div>
                    </div>
                    <div class="col-md-5 d-flex justify-content-center align-items-center">
                        <img class="card-img-right"
                         src="${objPelicula.Poster}" alt="Poster">
                    </div>
                </div>
            </div>
            <div class="row no-gutters d-flex justify-content-center p-3">
                <button class="btn btn-secondary w-25" id="close-button">Cerrar pestaña</button>
            </div>
        </div>
        <script>
            document.getElementById('close-button').addEventListener('click', function() {
                window.close();
            });
        </script>
    </body>
    </html>
    `;
    const newTab = window.open();
    newTab.document.write(html);
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
