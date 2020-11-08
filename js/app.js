import PosterAPI from "./PosterAPI.js"
import {saveOrderInStorage} from "./order.js";

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

    // Action when user changes the quantity of a poster order (modal window)
    const fieldQuatity = document.querySelector('#order_quantity');
    fieldQuatity.addEventListener('change', function (e) {
        let postPrice = document.querySelector("#order_price");
        let priceTotal = parseInt(this.value,10) * parseFloat(postPrice.getAttribute("data-price"),10);
        postPrice.value=priceTotal;
    });

}

init();

