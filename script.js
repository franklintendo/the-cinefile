// lets construct some queryURLs
// this query works (use to debug)
// https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=acb4c32a00f4cc5e0b30b2fb2f5a1adb

function generateRandomMovie() {
    var movieLength = movies.length;
    // console.log(movieLength);

    var movie = movies[Math.floor(Math.random() * movieLength)].entity;
    // console.log(movie);
    
    var queryURLomdb = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

        // Creates AJAX call for the specific movie button being clicked
    $.ajax({
    url: queryURLomdb,
    method: "GET"
    }).then(function(response3) {
            // console.log(response3)
        // && response3.Rated === "R" if we want to filter by rating
            if (response3.Poster) {
            // console.log(response3.Rated);
            var poster = response3.Poster;
            var imgEl = $("<img>");
            imgEl.attr("src", poster).attr("alt",response3.Title);
            $(imgEl).addClass("posters");
            console.log(imgEl)

            $(".randomMovie").append(imgEl);
            } else {
                var imgEl2 = $("<img>");
                imgEl2.attr("src", "http://www.impawards.com/2014/posters/dumb_and_dumber_to_ver8.jpg").attr("alt","Dumb and Dumber").attr("width","100%").attr("height","auto");
            
                $(".randomMovie").append(imgEl2);
            }
    
    });
var images = document.querySelectorAll('img');
var errorHandler = function() {
  this.style.display='none';
}
for (var i = 0; i < images.length; i++) {
  images[i].onerror = errorHandler
}
}

function generateMovies(genreID, year, rating) {

// api key
var apiKey = "&api_key=acb4c32a00f4cc5e0b30b2fb2f5a1adb";

// default query
var defaultURL = "https://api.themoviedb.org/3/discover/movie?";

// year filter
function getRange(year) {
    var start = "primary_release_date.gte=" + year + "-01-01";
    var end = "&primary_release_date.lte=" + (year + 9) + "-12-31";

    return { start, end };
}

// make sure we have year
    if (year) {
        year = year;
    } else {
        year = 2010;
    }

var chosenStart = getRange(year).start;
var chosenEnd = getRange(year).end;
// console.log(chosenStart);
var yearFilter = chosenStart + chosenEnd;

// genre filter
// var genresList = genres;    
// var chosenGenreName = genresList[1].name;
var chosenGenreID = genreID;

var genreFilter = "&with_genres=" + chosenGenreID;

// movie rating
var movieRating =  rating;
if (movieRating) {
    movieRating = movieRating;
} else {
    movieRating = "R";
}

// rotten tomatoes ratings filter 
var ratingFloor = 7.0;
var ratingFloorRotten = ratingFloor / 100;
var ratingFilter = "&vote_average.gte=" + ratingFloor;

// query constructor
var queryURL = defaultURL + yearFilter + genreFilter + ratingFilter;
// console.log(queryURL);

// filter by english language movies
var cleanQuery = queryURL + "&sort_by=vote_average.desc" + "&language=en" + apiKey;
// console.log(cleanQuery);

// get a list of movies;
var masterList = [];
var numberOfMovies = 10;
var movieCount = 0;

$.ajax({
    url: cleanQuery,
    method: "GET"
  }).then(function(response) {
    // console.log(response);

    var pages = response.total_pages
    var randomPage = Math.floor(Math.random() * pages);
    // console.log(randomPage);
    var movieList = [];
    // var movieListClean = [];

    for (let j = 0; j < pages; j++) {
        queryToRun = queryURL + "&sort_by=vote_average.desc" + "&page=" + (j + 1) + apiKey;
        // console.log(queryToRun);
        $.ajax({
            url: queryToRun,
            method: "GET"
          }).then(function(response2) {

            for (let i = 0; i < 20; i++) {
                // console.log(response2.results[i].title);
                if (response2.results[i].original_language === "en") {
                    var movie = response2.results[i].title;

                    var movieChosen = movie.trim();
                    movieChosen = movieChosen.replace(" ","+")
                    var queryURLomdb = "https://www.omdbapi.com/?t=" + movieChosen + "&apikey=trilogy";


                     // Creates AJAX call for the specific movie button being clicked
                    $.ajax({
                    url: queryURLomdb,
                    method: "GET"
                    }).then(function(response3) {

                        if ((parseInt(response3.Ratings[1].Value) > ratingFloorRotten) && response3.Rated === movieRating && movieCount < numberOfMovies) {
                                console.log(response3);
                                movieCount++;
                                var movieToAdd = response3.Title;
                                masterList.push(movieToAdd);
                                // console.log(masterList);
                                // console.log(response3.Rated);
                                var columnsContainer = $('<div class="columns poster-col">');

                                var columnImg = $('<div class="column is-narrow">');

                                var columnContent = $('<div class="column">');

                                columnContent.html("<h1>" + response3.Title + "</h1>" + "<p><span style='font-weight: bold'>Director:</span> " + response3.Director + "</p>" +
                                "<p><span style='font-weight: bold'>Year:</span> " + response3.Year + "</p><br/>" +
                                "<p><span style='font-weight: bold'>Plot:</span> " + response3.Plot + "</p>"
                                );

                                $(".posters").append(columnsContainer);

                                var poster = response3.Poster;
                                var imgEl = $("<img>");
                                imgEl.attr("src", poster).attr("alt",response3.Title).attr("width","200").attr("height","auto").attr("style", "width: 200px!important;");

                                columnsContainer.append(columnImg);
                                columnsContainer.append(columnContent);

                                columnImg.append(imgEl);
                                

                                // $(".posters").append(imgEl);
                                // $(".posters").append("<br>");

                        };
                    });

                };
            };
            // console.log(movieList);
            // console.log(movieList.length);
            // masterList = movieList;
        });
        
    };
    // console.log(masterList);
    // console.log(masterList.length);

    // generate 10 random movies from the master list
    // console.log(masterList);
    // var numberOfMovies = 10;
    // var randomFloor = 0;
    // var randomCeiling = 0;
    // if (masterList.length < 10) {
    //     randomFloor = 0;
    //     randomCeiling = masterList.length;
    // } else {
    //     randomFloor = Math.floor(Math.random() * (masterList.length - numberOfMovies));
    //     randomCeiling = randomFloor + 9;
    // }

    // console.log(randomFloor);
    // console.log(randomCeiling);

});


};

$(document).ready(function() {

    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
    
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        $(".navbar-burger").toggleClass("is-active collapsed");
        $(".navbar-menu").toggleClass("is-active collapsed");
    
    });
    });

  