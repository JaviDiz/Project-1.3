import PosterAPI from "./PosterAPI.js"
// import Order from "./Order.js";

function init() {
    //Carga inicial de datos
    PosterAPI.getJSONPoster();

    //Acción del botón buscar
    const btnSearch = document.querySelector('#btn-search');
    btnSearch.addEventListener('click', function (e){
        e.preventDefault();
        //PosterAPI.SearchPosterFilms();
        PosterAPI.searchFilm();
    });

    // Acción del botón order
    const btnOrder = document.querySelector('#btn-order');
    btnOrder.addEventListener('click', function (e) {
        saveOrderInStorage();
    });
}

init();

