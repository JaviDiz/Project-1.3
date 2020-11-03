class PosterAPI {

    static sumary(sinopsis){

    }

    static printStars(listStars){

    }

    static getJSONPoster() {
        fetch('./data/poster.json')
            .then(result => result.json())
            .then(data => {
                let posterJSON = data.poster;
                console.log(data);
                console.log(data.poster[0].films);
                console.log(data.poster[1]);
                PosterAPI.populateFilms(posterJSON[0].films);
                PosterAPI.populateSeries(posterJSON[1].series);
            });
    }

    static populateFilms(listFilms) {
        
        document.querySelector('#list-films').innerHTML = "";
        console.log();
        listFilms.forEach(oFilm => {
            console.log("info:" + oFilm.id + " " + oFilm.name);
            let card = `
            <!--Card-->
            <div class="card mb-4 shadow-sm" style="width: 14rem;">
                <img src="img/terminator.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Terminator</h5>
                    <p class="card-text">Sinopsis</p>
                </div>
                <div class="card-header">Stars</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Cras justo odio</li>
                    <li class="list-group-item">Dapibus ac facilisis in</li>
                    <li class="list-group-item">Vestibulum at eros</li>
                </ul>
                <!--ús del tooltip i modal-->
                <div class="text-center container" data-toggle="modal" data-target="#pedido">
                    <button type="button" class="btn btn-primary" data-toggle="tooltip" data-placement="top" title="Pago sólo con paypal">
                        Comprar
                    </button>
                </div>
            </div>
            `;

            document.querySelector('#list-films').innerHTML += card;

        });

        // PosterAPI.handleButtonOrder();
    }

    static populateSeries(listSeries) {

    }

    static searchFilm() {
        fetch('/data/poster.json')
            .then(result => result.json())
            .then(data => {
                let txtSearch = document.querySelector('#txt-search').value;
                txtSearch = txtSearch.toLowerCase();
                let listFilms = data.poster.films;
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