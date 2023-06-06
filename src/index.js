import 'bootstrap/dist/css/bootstrap.min.css';

import { init, crearHTML } from './js/search-movie';

crearHTML();
document.body.addEventListener('keyup', (event) => {
    if (event.target.id === 'inputBusqueda' && event.key === 'Enter') {
        init(event.target.value);
        event.target.value = '';
    }
})