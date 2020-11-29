"use strict";
// filter by title, genre etc.
// Enter a movie title and search
//Title
//Review Rating
//Delete option for movies


    const url = "https://nine-shared-text.glitch.me/movies"
    console.log(url);
    const movieTitles = document.getElementById('movieTitles')
    const moreInfoTab = document.getElementById('more')
    const deleteBtn = document.getElementById('deleteMovie')
    const editBtn = document.getElementById('editButton')
    const editTitle = document.getElementById('editTitle')
    const editMinutes = document.getElementById('editMinutes')
    const editReview = document.getElementById('editReview')
    const editRating = document.getElementById('editRating')
    const editYear = document.getElementById('editYear')
    const editGenre = document.getElementById('editGenre')
    const editDirector = document.getElementById('editDirector')
    const editPlot = document.getElementById('editPlot')
    const editActors = document.getElementById('editActors')


function renderPoster({Poster, id}) {
    return `
        <div>
            <a class="poster" type="button" href="#modal-1">
                <img data-id=${id} src=${Poster}>
            </a>
        </div>`
}

function renderPosters(movies) {
    let html = ''
    for (let movie of movies) {
        html += renderPoster(movie)
    }
    document.getElementById('all').innerHTML = html
    document.querySelectorAll('.poster').forEach((poster, key) => {
        poster.addEventListener('click', () => {
            populateMovieModal(movies[key])
        })
    })
}
function populateMovieModal({Title, Minutes, Review, Rating, Year, Genre, Director, Plot, Actors, id}) {
    let movieInfo = `
            <h4 class="m-0">${Title}</h4><span id="year" class="ml-1">${Year}</span>
            <p>${Minutes} minutes</p>
            <p>${Genre}</p>
            <p>Rating: ${Rating} out of 10</p>
            <p>${Review}</p>
            <p>Director: ${Director}</p>
            <p>${Plot}</p>
            <p>Actors: ${Actors}</p> 
        `
    let newMovieInfo = `
            <h4 class="m-0">${Title}</h4><span id="year" class="ml-1">${Year}</span>
            <p>${Minutes} minutes</p>
            <p>${Genre}</p>
            <p>Rating: ${Rating} out of 10</p>
            <p>${Review}</p>
            <p>Director: ${Director}</p>
            <p>${Plot}</p>
            <p>Actors: ${Actors}</p> 
        `
    if (`${id}` <= 67) {
        document.querySelector("#more").innerHTML = movieInfo
    } else if (`${id}` > 67) {
        document.querySelector("#more").innerHTML = newMovieInfo
    }
    editTitle.setAttribute("value", Title)
    editMinutes.setAttribute("value", Minutes)
    editReview.setAttribute("value", Review)
    editRating.setAttribute("value", Rating)
    editYear.setAttribute("value", Year)
    editGenre.setAttribute("value", Genre)
    editDirector.setAttribute("value", Director)
    editPlot.setAttribute("value", Plot)
    deleteBtn.setAttribute("data-id", id)
    editBtn.setAttribute("data-id", id)
}
function openTab(evt, userForm) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(userForm).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

$("#addButton").click(function () {
    const newTitle = $("#addTitle").val()
    const addMinutes = $("#addMinutes").val()
    const addReview = $("#addReview").val()
    const addRating = $('#addRating').val()
    // const addPoster = $('img/images.jpg')
    const addYear = $("#addYear").val()
    const addGenre = $("#addGenre").val()

    addMovie({Title: newTitle, Minutes: addMinutes, Review: addReview, Rating: addRating, Poster: 'img/image.png', Year: addYear, Genre: addGenre})
})
$("#deleteMovie").click(function () {
    let btnID = this.getAttribute("data-id")
    let posterData = $(`img[data-id=${btnID}]`)
    posterData.hide()
    deleteMovie(btnID)
})
$("#editButton").click(function () {
    const btnID = this.getAttribute("data-id")
    const posterData = $(`img[data-id=${btnID}]`)
    const posterSrc = posterData[0].currentSrc
    const newTitle = $("#editTitle").val()
    const newMinutes = $("#editMinutes").val()
    const newReview = $("#editReview").val()
    const newRating = $('#editRating').val()
    const newYear = $("#editYear").val()
    const newGenre = $("#editGenre").val()
    const newPlot =$("#editPlot").val()
    const newActors =$("#editActors").val()

    editMovies({id: btnID, Title: newTitle, Minutes: newMinutes, Review: newReview, Rating: newRating, Year: newYear, Genre: newGenre, imdbRating: imdbRating, Poster: posterSrc})
    populateMovieModal({id: btnID, Title: newTitle, imdbRating : newRating, Poster : posterSrc, Genre: newGenre, Year: newYear, Plot: newPlot, Actors: newActors})
})

$(".closeBtn").click(() => {
    const newTitle = $("#editTitle").val("")
    const newMinutes = $("#editMinutes").val("")
    const newReview = $("#editReview").val("")
    const newRating = $("#editRating").val("")
    const addGenre = $("#editGenre").val("")
    const addYear = $("#editYear").val("")
    const addPlot = $("#editPlot").val("")

    newTitle.attr("placeholder", "Enter your film's title")
    newMinutes.attr("placeholder", "How long is the movie?")
    newReview.attr("placeholder", "Rate Movie 1-10")
    newRating.attr("placeholder", "G, PG, PG-13, R, MA, or None")
    addYear.attr("placeholder", "What year was it released?")
    addGenre.attr("placeholder", "Enter your movie's genre")
    addPlot.attr("placeholder","Which actors were in the movie?")
})

const glitchUrl = 'https://feather-satisfying-sprite.glitch.me/movies'
// const oMDb = `http://www.omdbapi.com/?apikey=${OMDb}&t=${title}`



// const addMovieFromAPI = (i) => {
//     return i.forEach(movie => {
//         fetch(`http://www.omdbapi.com/?apikey=${OMDb}&i=${movie}`)
//             .then(res => res.json())
//             .then(console.log)
//     })
// }
const spinner = document.getElementById('loading')


fetch(glitchUrl)
    .then(res => res.json())
    .then(data => {
        renderPosters(data)
        populateMovieModal(data)
        console.log(data)
        spinner.classList.add("invisible");
    })



// edit
const editMovies = movies => fetch(`${url}/${movies.id}`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(movies)
})
    .then(res => res.json())
    .then(data => {
        console.log(`Success: edited ${JSON.stringify(data)}`);
    })
    .catch(console.error);
// editMovies({id : 97, Title : "Scarier", Rating : 2})



// delete
const deleteMovie = id => fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json'
    }
})
    .then(res => res.json())
    .then(() => {
        console.log(`Success: deleted video with id of ${id}`);
    })
    .catch(console.error);

//create
const addMovie = (movie) => fetch(`${url}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(movie)
})
    .then(res => res.json())
    .then()
    .then(data => {
        console.log(`Success: created ${JSON.stringify(data)}`);
        return data.id; // to access the primary key of the newly created entity

    })
    .catch(console.error);

