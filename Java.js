var page = document.getElementById("content");
var RegistreraKnapp = document.getElementById("SaveFilmstudioId");


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
            page.insertAdjacentHTML("afterbegin", print);

        });


    page.insertAdjacentHTML("beforeend", "<div><button id='logoutButton'>Log out</button></div>");


    var logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("userId");
        showLoginPage();
    });

}

function showErrorPage() {
    page.insertAdjacentHTML("afterbegin", "<div>glömmt lösen?</div>");

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



    RegistreraKnapp.addEventListener("click", function () {

        

        var usernameForNewMoviestudio = document.getElementById("FilmstudioNamnId").value;
        var pwForNewMoviestudio = document.getElementById("FilmstudioPasswordId").value;

        // var newMovieStudio = {
        //     Name:  usernameForNewMoviestudio,
        //     Password: pwForNewMoviestudio
        // };


        addMovieStudio(usernameForNewMoviestudio,pwForNewMoviestudio);

    



    })




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


        fetch("users.json")
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {


                for (i = 0; i < json.length; i++) {

                    if (getUser == json[i].userLogin && getPassword == json[i].userPassword) {


                        localStorage.setItem("userId", i);

                    }
                    else {

                    }
                }

                if (localStorage.getItem("userId") !== null) {
                    showWelcomePage();

                }
                else {
                    showErrorPage();
                }

                fetch('https://localhost:44361/api/Filmstudio', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newMovieStudio),
                })
                    .then(response => response.json())
                    .then(newMovieStudio => {
                        console.log('Success:', newMovieStudio);
                    })
                    .catch((err) => {
                        console.error('Error:', err);


                        for (i = 0; i < json.length; i++) {
                            if (getUser == json[i].Name && getPassword == json[i].Password) {
                                localStorage.setItem("userId", i);

                            }
                            else {

                            }
                        }

                    });




            });


    });
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

addMovie("torkel", 10);

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

