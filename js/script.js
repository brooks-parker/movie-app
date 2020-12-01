"use strict";

//Important Data
const url = "https://nine-shared-text.glitch.me/movies";
console.log(url);
let catalog = [];
let title = $("#title");
let rating = $("#ratingGrade");
let genre = $("#genre");
let year = $("#year");
let minutes = $("#minutes");



//Functionality for Initial Fetch
fetch(url)
    .then(response => response.json())
    .then(response => {
        $("#after").fadeIn(8000).css("display", "flex");
        $("#bannerImage").fadeIn(8000).css("visibility", "show");
        $("#loading").fadeOut(5000);
        catalog = response;
        displayMovies(catalog);
        canRemoveData();
        canEditData();
    })
    .catch(error => console.error(error));

// Functionality for Callback
function callback() {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            $("#after").css("display", "flex");
            $("#loading").fadeOut(300);
            catalog = response;
            console.log(catalog);
            canRemoveData();
            canEditData();
        });
}


//Establish New Movie (Fetch)
const newMovie = (movie) => fetch(`${url}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {
        $(".movieArea").innerHTML += render(data);
        return data;
    })
    .catch(console.error);


//Establish Edit Movies (Put)
const editMovie = movie => fetch(`${url}/${movie.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
    })
    .catch(console.error);


// Establish Removal of Movie (Delete)
const deleteMovie = (id) => fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
}).then(response => response.json()
).then(() => {
    callback();
    console.log(catalog);
    console.log(`Success, deleted movie ${id}`);
}).catch(error => console.log(error));


//Call to Display Movie Data
function displayMovies(arr){
    for(let i = 0; i < arr.length; i++){
        $(".movieArea")[0].insertAdjacentHTML("afterbegin", render(arr[i]));
    }
}


//Format for Creating Movie
function createMovie(i1, i2, i3, i4, i5){
    let newMovie = {
        title: i1,
        rating: i2,
        genre: i3,
        year: i4,
        minutes: i5,
    }
    return newMovie
}


//Populate Cards and Data String For Search Functionality
function render(data){
    return `<div class="movieCard" data-string="${data.genre} ${data.title} ${data.year}">
        <span id="forDelete">${data.id}</span>
        <button class="Edit">Edit</button>
        <button class="delete">Remove</button>
        <h5 class="titleOnPoster">${data.title}</h5>
        <img src="${data.poster}" class="poster" alt="posterMissing">
        <p>Rated: ${data.rating}</p>
        <p>Genre: ${data.genre}</p>
        <p>${data.minutes} minutes</p>
        <p>Year: ${data.year}</p>
        <button class="Trailer"><a href="${data.trailer}" target="_blank">Click Here for Trailer</button>
        </div>`;
}


//New Movie Submit Button
$("#submit").on("click", function (){
    newMovie(createMovie(title.val(), rating.val(), genre.val(), year.val(), minutes.val())).then(data => {
        $(".movieArea")[0].insertAdjacentHTML("afterbegin", render(data));
    });
    $(this).parent().css("display", "none");
    $("#displayForm").css("display", "flex");
});

//function for removal
function canRemoveData() {
    $("body").on("click", ".delete", function () {
        deleteMovie($(this).parent().children().first()[0].innerText).then();
        $(this).parent().remove();
    });
}

//function for editing
function canEditData() {
    $("body").on("click", ".Edit", function () {
        let newId = $(this).parent().children().first()[0].innerText;
        let card = $(this);
        let newMovieObj = {};
        $("#changeMovie").on("click",function(){
            let newTitle = $("#changeTitle").val();
            let newGenre = $("#changeGenre").val();
            let newRating = $("#changeRating").val();
            let newYear = $("#changeYear").val();
            let newMinutes = $("#changeMinutes").val();
            newMovieObj = {
                title: newTitle,
                genre: newGenre,
                rating: newRating,
                year: newYear,
                minutes: newMinutes,
                id: newId
            }
            editMovie(newMovieObj);
            card.parent().html(render(newMovieObj));
            $("#edit").css("display", "none");
        });
        $("#closeEdit").on("click", function (){
            $("#edit").css("display", "none");
        });
        $("#edit").css("display", "flex");

    });
}

// On Click Function for Forms
$("#displayForm").on("click", function (){
    $("#formSection").css("display", "flex");
    $(this).css("display", "none");
});


//Functionality for Search by Genre, Year and Title
$(".filter").on("keyup", function() {
    var input = $(this).val().toUpperCase();

    $(".movieCard").each(function() {
        if ($(this).data("string").toUpperCase().indexOf(input) < 0) {
            $(this).hide();
        } else {
            $(this).show();
        }
    })
});