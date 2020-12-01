// "use strict";
// // // filter by title, genre etc.
// // // Enter a movie title and search
// // //Title
// // //Review Rating
// // //Delete option for movies
// //
//
    const url = "https://nine-shared-text.glitch.me/movies";
    // const movieUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=${posterApiKey}&query=`;
    console.log(url);

//Functionality for Initial Fetch
fetch(url)
    .then(response => response.json())
    .then(response => {
        $("#postLoading").fadeIn(10000).css("display", "flex");
        $("#bannerImage").fadeIn(10000).css("visibility", "show");
        $("#loading").fadeOut(6000);
    })
    .catch(error => console.error(error));

//Slideshow Carousel within Accordion
// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": url,
//     "method": "GET"
// }
// $.ajax(settings).done(function (response) {
//     console.log(response);
//     let contentComedy1 = response[6].poster;
//     let contentComedy2 = response[42].poster;
//     let contentComedy3 = response[36].poster;
//     let contentDrama1 = response[7].poster;
//     let contentDrama2 = response[32].poster;
//     let contentDrama3 = response[21].poster;
//     let contentRomance1 = response[5].poster;
//     let contentRomance2 = response[33].poster;
//     let contentRomance3 = response[39].poster;
//     let contentAnimation1 = response[12].poster;
//     let contentAnimation2 = response[35].poster;
//     let contentAnimation3 = response[28].poster;
//     let contentSports1 = response[31].poster;
//     let contentSports2 = response[38].poster;
//     let contentSports3 = response[41].poster;
//     let contentAll1 = response[26].poster;
//     let contentAll2 = response[19].poster;
//     let contentAll3 = response[44].poster;
//
//     $("#slideComedy1").attr('src', contentComedy1);
//     $("#slideComedy2").attr('src', contentComedy2);
//     $("#slideComedy3").attr('src', contentComedy3);
//     $("#slideDrama1").attr('src', contentDrama1);
//     $("#slideDrama2").attr('src', contentDrama2);
//     $("#slideDrama3").attr('src', contentDrama3);
//     $("#slideRomance1").attr('src', contentRomance1);
//     $("#slideRomance2").attr('src', contentRomance2);
//     $("#slideRomance3").attr('src', contentRomance3);
//     $("#slideAnimation1").attr('src', contentAnimation1);
//     $("#slideAnimation2").attr('src', contentAnimation2);
//     $("#slideAnimation3").attr('src', contentAnimation3);
//     $("#slideSports1").attr('src', contentSports1);
//     $("#slideSports2").attr('src', contentSports2);
//     $("#slideSports3").attr('src', contentSports3);
//     $("#slideAll1").attr('src', contentAll1);
//     $("#slideAll2").attr('src', contentAll2);
//     $("#slideAll3").attr('src', contentAll3);
// });

//
//