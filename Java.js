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
    page.insertAdjacentHTML("afterbegin", 'Moviename: <input type="text" id="movieNameId"> id: <input type="text" id="filmstudioId"> <button id="LånaFilmId">Låna film</button> ')

    var lendMovieButton = document.getElementById("LånaFilmId");

    lendMovieButton.addEventListener("click", function () {

        // var lentMovieName = document.getElementById("movieNameId").value;
        var lentMovieId = document.getElementById("filmstudioId").value;



        fetch("https://localhost:44361/api/film")
            .then(response => response.json())
            .catch(error => console.log(error.message))
            .then(json => lendMovie(json, lentMovieId));



    });
    var logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("userId");
        showLoginPage();
    });

}

function showErrorPage() {
    page.insertAdjacentHTML("afterbegin", "<div>glömmt lösen?</div>");

}

function lendMovie(json, lentMovieId)
{

    var foo = json.find(x => x.id == lentMovieId);


    
    console.log(foo);
    if (foo.id == lentMovieId) {
        if (foo.stock == 0) 
        {
            console.log(foo);
            foo.stock = foo.stockstock
        }
        else
        {
            foo.stock --;
            console.log("finns inga filmer kompis");
         
        }
   
    }
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
            printMovieList();
        })
        .catch((error) => {
            console.log('Error:', error);
        });
};



// function storeNewMoviestudio() {



//     localStorage.setItem('usernameForNewMoviestudio', usernameForNewMoviestudio.value);
//     localStorage.setItem('ppwForNewMoviestudiow', pwForNewMoviestudio.value);

//     var jsonPwForNewMoviestudio = json.stringify(pwForNewMoviestudio);

//     var fs = require('fs');
//     fs.writeFile('users.json', jsonPwForNewMoviestudio);


// }


function showLoginPage() {
    page.innerHTML = "";
    page.insertAdjacentHTML("afterbegin", 'användarnamn: <input type="text" id="userInput"> lösenord: <input type="password" id="userPassword"> <button id="loginButton">Login</button> ')
    page.insertAdjacentHTML("beforeend", '<button id="NyFilmstudioButtonId">Registrera ny Filmstudio</button>')


    page.insertAdjacentHTML("beforeend", "<div><button id ='visaFilmerId'>visa Filmer som finns inne</button>'</div>")

    var visaFilm = document.getElementById("visaFilmId");
    var NyFilmstudioButton = document.getElementById("NyFilmstudioButtonId");
    var loginButton = document.getElementById("loginButton");


    visaFilm.addEventListener("click", function () {
        console.log("filmer");

        showMovies();

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

function showMovies() {
    fetch("https://localhost:44361/api/Film")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log("showMovies", json);
            for (i = 0; i < json.length; i++) {
                console.log(json[i].name)
                movieList.insertAdjacentHTML("beforeend", "<div><p>(" + json[i].id + ")" + json[i].name + "</p></div></div>")
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
        })
        .catch((error) => {
            console.log('error', error);
        });
};

function deleteItem(id) {

    console.log("asd", id);

    fetch('https://localhost:44361/api/film' + id, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(response => printMovieList())



};

