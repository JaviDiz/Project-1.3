import PosterAPI from "./PosterAPI.js"
import {saveOrderInStorage} from "./order.js";

function init() {
    //Carga inicial de datos
    PosterAPI.getJSONPoster();

    //Acción del botón buscar
    const btnSearch = document.querySelector('#btn-search');
    btnSearch.addEventListener('click', function (e){
        e.preventDefault();
        PosterAPI.searchFilm();
    });

    // Acción del botón order
    const btnOrder = document.querySelector('#btn-order');
    btnOrder.addEventListener('click', function (e) {
        saveOrderInStorage();
    });

    // Acción cuando el usuario cambia la cantidad de un pedido de póster (ventana modal)
    const fieldQuatity = document.querySelector('#order_quantity');
    fieldQuatity.addEventListener('change', function (e) {
        let postPrice = document.querySelector("#order_price");
        let priceTotal = parseInt(this.value,10) * parseFloat(postPrice.getAttribute("data-price"),10);
        postPrice.value=priceTotal;
    });

}

init();

