class PosterAPI {

    static sumary(sinopsis) {
		if (sinopsis.length > 100) {
			return sinopsis.substr(0, 100) + "...";
		} else if (sinopsis == "undefined" || sinopsis.length == 0) {
			return "No hay nada de información";
		} else {
			return sinopsis + "...";
		}
	}

    static printStars(listStars) {
		let txtListStars = "";
		$.each(listStars, function (key, val) {
			let oStar = val;
			txtListStars += `<li class="list-group-item">${oStar.name} (${oStar.character})</li>`;
		});
		return txtListStars;
	}

    static getJSONPoster() {
        fetch('./data/poster.json')
            .then(result => result.json())
            .then(data => {
                let posterJSON = data.poster;
                PosterAPI.populateFilms(posterJSON[0].films);
                PosterAPI.populateSeries(posterJSON[1].series);
            });
    }

    static populateFilms(listFilms) {
        
        document.querySelector('#list-films').innerHTML = "";
        listFilms.forEach(oFilm => {
            let card = `
            <!--Card-->
            <div id="film-${oFilm.id}" class="card mb-4 shadow-sm" style="width: 14rem;">
				<img src="./img/${oFilm.cover}" class="card-img-top" alt="...">
				<div class="card-body">
					<h5 class="card-title">${oFilm.name}</h5>
					<p class="card-text">${PosterAPI.sumary(oFilm.sinopsis)}</p>
					<p class="card-text"><span class="text-info">Duración:</span> ${oFilm.duration}</p>
					<p class="card-text"><span class="text-info">Director:</span> ${oFilm.director}</p>
					<p class="card-text"><span class="text-info bold">Género:</span> ${oFilm.genre}</p>
					<p class="card-text price">${oFilm.price}</p>
				</div>
				<div class="card-header">Stars</div>
				<ul class="list-group list-group-flush">
				${PosterAPI.printStars(oFilm.stars)}
				</ul>
        	
				<div class="text-center" data-toggle="modal" data-target="#pedido">
					<button data-idOrder="${oFilm.id}" type="button" class="btn btn-primary btn-buy" 
							data-toggle="tooltip" data-placement="top" title="Pago sólo con paypal">
						Comprar
					</button>
				</div>
			</div>`;

            document.querySelector('#list-films').innerHTML += card;

        });

         PosterAPI.handleButtonOrder();
    }


    static handleButtonOrder() {
		// Configurar la acción de cada botón de compra
		let aBtn = document.querySelectorAll(".btn-buy");
		if (aBtn) {
			aBtn.forEach(item => {
				item.addEventListener("click", function () {
					// Init Cantidad
					document.querySelector("#order_quantity").value = "1";
					

					// Campos en el Modal
					let tagPostId = document.querySelector("#order_id");
					let tagPostName = document.querySelector("#order_name");
					let tagPostPrice = document.querySelector("#order_price");

					// Colocar valores de póster en cada campo modal
					let idFilm = item.getAttribute("data-idOrder");
					tagPostId.value = idFilm; 

					let title = document.querySelector("#film-" + idFilm + " .card-title").innerHTML;
					tagPostName.innerHTML = title;

					let price = document.querySelector("#film-" + idFilm + " .price").innerHTML;
					tagPostPrice.value = price;

				});
			});
		}
	}

    static populateSeries(listSeries) {
		let container = document.querySelector('#list-series');
		container.innerHTML = "";
		// Recorrer cada serie i afegeix la seva maquetació html al contenidor
		listSeries.forEach(oSerie => {
			// HTML
			let card = `
			<div id="film-${oSerie.id}" class="card mb-4 shadow-sm" style="width: 14rem;">
		        <img src="./img/${oSerie.cover}" class="card-img-top" alt="...">
		         <div class="card-body">
		           <h5 class="card-title">${oSerie.name}</h5>
		           <p class="card-text">${PosterAPI.sumary(oSerie.sinopsis)}</p>
		           <p class="card-text"><span class="text-info">Temporadas:</span> ${oSerie.season}</p>
		           <p class="card-text"><span class="text-info">Director:</span> ${oSerie.director}</p>
		           <p class="card-text"><span class="text-info bold">Género:</span> ${oSerie.genre}</p>
		         </div>
		        <div class="card-header">Stars</div>
		        <ul class="list-group list-group-flush">
		          ${PosterAPI.printStars(oSerie.stars)}
		        </ul>
		        <!--ús del tooltip i modal -->
						<!--Gracies a l'atribut data-target es vincula el botó "Comprar" amb el modal -->
		        <div class="text-center" data-toggle="modal" data-target="#pedido">
		            <button type="button" class="btn btn-primary" data-toggle="tooltip"
								   data-placement="top" title="Pago sólo con paypal" onclick="newOrderPoster(${oSerie.id}, '${oSerie.name}', '${oSerie.price}')">
		                Comprar
		            </button>
		        </div>
		      </div>
				</div>`;
			container.innerHTML += card;
        });
	}

    static searchFilm() {
        fetch('./data/poster.json')
            .then(result => result.json())
            .then(data => {
                let txtSearch = document.querySelector('#txt-search').value;
                txtSearch = txtSearch.toLowerCase();
                let listFilms = data.poster[0].films;
                let films = listFilms.filter(
                    (item) => (item.name.toLowerCase().indexOf(txtSearch) >-1 )
                );
                if (films.length > 0) {
                    PosterAPI.populateFilms(films);
                } else {
                    document.querySelector("#list-films").innerHTML = `
                        <p>Ninguna película coincide con los datos de búsqueda</p>
                    `;
                }
            });
    }




}

export default PosterAPI