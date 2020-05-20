var page = document.getElementById("content");

addMovieStudio("cd", "cd");

addMovie("asd", 4);



if (localStorage.getItem("userId") !== "null") {
    showWelcomePage();
}
else {
    showLoginPage();

}

function showWelcomePage() {
    page.innerHTML = "";
    var print = "Välkommen kompis ";

    fetch("users.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {

            print = print + json[localStorage.getItem("userId")].userName;
            page.insertAdjacentHTML("afterbegin", print, userName);
        });


    page.insertAdjacentHTML("beforeend", "<div><button id='logoutButton'>Log out</button></div>");
    page.insertAdjacentHTML("afterbegin", 'Moviename: <input type="text" id="movieNameId"> id: <input type="text" id="filmstudioId"> <button id="lånaFilmId">Låna film</button> ')

    var lendMovieButton = document.getElementById("lånaFilmId");

    lendMovieButton.addEventListener("click", function () {

        // var lentMovieName = document.getElementById("movieNameId").value;
        var lentMovieId = document.getElementById("filmstudioId").value;



        fetch("https://localhost:44361/api/film")
            .then(response => response.json())
            .catch(error => console.log(error.message))
            .then(json => lendMovie(json, lentMovieId));

        showRentedMovies();



    });

    page.insertAdjacentHTML("afterbegin", 'Moviename: <input type="text" id="returnedMovieNameId"> id: <input type="text" id="returnedFilmstudioId"> <button id="returnMovieId">Lämna tillbaks film</button> ')

    var returnMovieButton = document.getElementById("returnMovieId");

    returnMovieButton.addEventListener("click", function () {

        // var lentMovieName = document.getElementById("movieNameId").value;
        var returnlentMovieId = document.getElementById("returnedFilmstudioId").value;



        fetch("https://localhost:44361/api/rentedfilm")

            .then(response => response.json())
            .catch(error => console.log(error.message))
            .then(json => deleteReturnedMovie(returnlentMovieId));
    });

    page.insertAdjacentHTML("afterbegin", 'Comment: <input type="text" id="triviaCommentId"> film id: <input type="text" id="movieTriviaId"> <button id="triviaButtonId">skicka in trivia</button> ')

    var triviaButton = document.getElementById("triviaButtonId");

    triviaButton.addEventListener("click", function () {

        var triviaMovieId = document.getElementById("movieTriviaId").value;
        var triviaCommentId = document.getElementById("triviaCommentId").value;

        addTriviaToMovie(triviaMovieId, triviaCommentId);

    });




    var logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("userId");
        showLoginPage();
    });

}

function addTriviaToMovie(triviaid, triviaComment)
{

    var data = {filmId: triviaid , trivia : triviaComment}
    
    fetch('https://localhost:44361/api/filmtrivia/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.log('Error:', error);
        });
    
}

function showErrorPage() {
    page.insertAdjacentHTML("afterbegin", "<div>glömmt lösen?</div>");

}


function lendMovie(json, lentMovieId) {

    var lentMovie = json.find(x => x.id == lentMovieId);

    console.log(lentMovie);
    if (lentMovie.id == lentMovieId) {
        if (lentMovie.stock == 0) {

            console.log(foo);
            lentMovie.stock = foo.stock

            console.log("finns inga filmer kompis");
        }
        else {
            lentMovie.stock--;

            addLendtMovie(lentMovie.id);

        }

    }
}

function addLendtMovie(movieId, filmStudioId) {
    var data = { filmId: movieId, studioId: filmStudioId };

    localStorage.userId = filmStudioId;

    fetch('https://localhost:44361/api/rentedfilm', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);

        })
        .catch((error) => {
            console.log('Error:', error);
        });
}


function showRegisterNewFilmstudio() {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterbegin", 'Användarnamn: <input type="text" id="FilmstudioNamnId"> Lösenord: <input type="password" id="FilmstudioPasswordId"> <button id="SaveFilmstudioId">spara ny användare</button> ')
    page.insertAdjacentHTML("beforeend", '<button id="WelcomepageId">Gå till Welcome Page</button>')

    var welcomePageButton = document.getElementById("WelcomepageId");

    welcomePageButton.addEventListener("click", function () {

        showWelcomePage();

    }
    )

    var RegistreraKnapp = document.getElementById("SaveFilmstudioId");

    RegistreraKnapp.addEventListener("click", function () {

        var usernameForNewMoviestudio = document.getElementById("FilmstudioNamnId").value;
        var pwForNewMoviestudio = document.getElementById("FilmstudioPasswordId").value;

        addMovieStudio(usernameForNewMoviestudio, pwForNewMoviestudio);

    }
    )




}



function addMovieStudio(name, password) {

    var data = { name: name, password: password };

    fetch('https://localhost:44361/api/FilmStudio', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            showMovies();
            showRentedMovies();
        })
        .catch((error) => {
            console.log('Error:', error);
        });
};

function showLoginPage() {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterbegin", 'användarnamn: <input type="text" id="userInput"> lösenord: <input type="password" id="userPassword"> <button id="loginButton">Login</button> ')
    page.insertAdjacentHTML("beforeend", '<button id="NyFilmstudioButtonId">Registrera ny Filmstudio</button>')
    showRentedMovies();


    page.insertAdjacentHTML("beforeend", "<div><button id ='visaFilmerId'>visa Filmer som finns inne</button>'</div>")


    var visaFilm = document.getElementById("visaFilmId");
    var NyFilmstudioButton = document.getElementById("NyFilmstudioButtonId");
    var loginButton = document.getElementById("loginButton");


    visaFilm.addEventListener("click", function () {
        console.log("filmer");

        showMovies();
        showRentedMovies();

    }
    )



    NyFilmstudioButton.addEventListener("click", function () {

        showRegisterNewFilmstudio();

    }
    )



    loginButton.addEventListener("click", function () {

        var getUser = document.getElementById("userInput").value;
        var getPassword = document.getElementById("userPassword").value;

        fetch("https://localhost:44361/api/filmstudio")
            .then(response => response.json())
            .catch(error => console.log(error.message))
            .then(json => checkForexistingUser(json, getUser, getPassword));

    });
}

function checkForexistingUser(json, getUser, getPassword) {
    try {
        var user = json.find(x => x.name === getUser && x.password === getPassword);

        if (user != null) {
            localStorage.userId = user.id;
            localStorage.userName = user.name;

            showWelcomePage();
        } else {
            showErrorPage();
        }
    } catch (error) {
        console.log(error.message);
    }
}


var printMovieList = document.getElementById("movieList");
var saveMovieButton = document.getElementById("sparaMovie");

saveMovieButton.addEventListener("click", function () {

    MovieName = document.getElementById("movieName").value
    addMovie(MovieName, 10);


});

function showRentedMovies() {
    fetch("https://localhost:44361/api/rentedfilm")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("showRentedMovies", json);
            for (i = 0; i < json.length; i++) {
                console.log(json[i].filmId)

                movieList.insertAdjacentHTML("beforeend", "<div class = rentedMovies ><p>(" + json[i].id + ")" + json[i].filmId + "</p></div></div>")
            }
        });
};


function showMovies() {
    var a = " antal | ";
    var s = " film namn = ";
    fetch("https://localhost:44361/api/Film")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("showMovies", json);
            for (i = 0; i < json.length; i++) {
                console.log(json[i].name)
                movieList.insertAdjacentHTML("afterend", "<div class = showAllMovies><p>(" + json[i].id + ")" + a + json[i].stock + s + json[i].name + "</p></div></div>")
            }
        });
};

addMovie("torkel i knipa", 10);

function addMovie(Name, Stock) {
    console.log("lägg till")

    var data = { Name: Name, Stock: Stock };


    fetch('https://localhost:44361/api/film', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            console.log("gick bra", data);
            showMovies();
            showRentedMovies();
        })
        .catch((error) => {
            console.log('error', error);
        });
};

function deleteItem(id) {

    console.log("asd", id);

    fetch('https://localhost:44361/api/rentedfilm' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(response => showMovies())



};

function deleteReturnedMovie(id) {
    fetch('https://localhost:44361/api/rentedfilm/' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(response => showRentedMovies())
};

