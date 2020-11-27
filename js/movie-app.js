"use strict";
// filter by title, genre etc.
// Enter a movie title and search
//Title
//Review Rating
//Delete option for movies

const url = "https://nine-shared-text.glitch.me/movies"
console.log(url);

function logMatchingMovies(){
    let allMovies = [];
    if(filteredMovies.length < 1){
        filteredMovies = allOfOurMovies;
    }
    if(coffeeName.value.length > 0) {
        filteredCoffees.forEach((movie) => {
            if (movie.name.toLowerCase().includes(movieName.value.toLowerCase())) {
                allMovies.push(movie);
            }
        });
        allMoviesSpot.innerHTML = renderMovies(allMovies);
    } else {
        allMoviesSpot.innerHTML = renderMovies(filteredMovies);
    }
}
movieName.addEventListener("input", logMatchingMovies);
//=========COFFEE SEARCH=========//


//--------ADD CUSTOM COFFEE----------//
var customRoast = document.getElementById("customMovieGenre");
var customName = document.getElementById("customMovieName");
var addCustom = document.getElementById("customMovieButton");


addCustom.addEventListener("click", function (){
    addCustom.disabled = true;
    var movieChoice = customMovie.value;
    var nameChoice = customName.value;

    var newCoffee = {};
    newCoffee.id = (allOfOurCoffees[(allOfOurCoffees.length-1)].id) + 1;
    newCoffee.name = nameChoice;
    newCoffee.roast = roastChoice;

    allOfOurCoffees.push(newCoffee);
    setTimeout(reEnableCoffeeAdding, 1000);
});
// function reEnableCoffeeAdding(){
//     addCustom.disabled = false;