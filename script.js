// lets construct some queryURLs
// this query works (use to debug)
// https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=acb4c32a00f4cc5e0b30b2fb2f5a1adb

function generateRandomMovie() {
    var movieLength = movies.length;
    console.log(movieLength);

    var movie = movies[Math.floor(Math.random() * movieLength)].entity;
    console.log(movie);
    
    var queryURLomdb = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

        // Creates AJAX call for the specific movie button being clicked
    $.ajax({
    url: queryURLomdb,
    method: "GET"
    }).then(function(response3) {
            console.log(response3)
        // && response3.Rated === "R" if we want to filter by rating
            if (response3.Poster) {
            console.log(response3.Rated);
            var poster = response3.Poster;
            var imgEl = $("<img>");
            imgEl.attr("src", poster).attr("alt",response3.Title).attr("width","200").attr("height","auto");
            $(".randomMovie").append(imgEl);
            } else {
                var imgEl2 = $("<img>");
                imgEl2.attr("src", "https://musicimage.xboxlive.com/catalog/video.movie.8D6KGWZXF09S/image?locale=en-us&mode=crop&purposes=BoxArt&q=90&h=300&w=200&format=jpg").attr("alt","Dumb and Dumber").attr("width","200").attr("height","auto");
                $(".randomMovie").append(imgEl2);
            }
    
    });
}


function generateRandomMovie() {
    var queryURLomdb = "https://www.omdbapi.com/?t=" + movieChosen + "&apikey=trilogy";

                     // Creates AJAX call for the specific movie button being clicked
                    $.ajax({
                    url: queryURLomdb,
                    method: "GET"
                    }).then(function(response3) {
                        // && response3.Rated === "R" if we want to filter by rating
                        if ((parseInt(response3.Ratings[1].Value) > ratingFloorRotten)) {
                            console.log(response3.Rated);
                            var poster = response3.Poster;
                            var imgEl = $("<img>");
                            imgEl.attr("src", poster).attr("alt",response3.Title).attr("width","200").attr("height","auto");
                            $(".posters").append(imgEl);
                        };
                    });
}



function generateMovies(genreID) {

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
var chosenStart = getRange(2010).start;
var chosenEnd = getRange(2010).end;
console.log(chosenStart);
var yearFilter = chosenStart + chosenEnd;

// genre filter
var genresList = genres;    
var chosenGenreName = genresList[1].name;
var chosenGenreID = genreID;

var genreFilter = "&with_genres=" + chosenGenreID;

// ratings filter 
var ratingFloor = 7.0;
var ratingFloorRotten = ratingFloor / 100;
var ratingFilter = "&vote_average.gte=" + ratingFloor;

// query constructor
var queryURL = defaultURL + yearFilter + genreFilter + ratingFilter;
console.log(queryURL);

// filter by english language movies
var cleanQuery = queryURL + "&sort_by=vote_average.desc" + "&language=en" + apiKey;
console.log(cleanQuery);

// get a list of movies;
var masterList = [];

$.ajax({
    url: cleanQuery,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var pages = response.total_pages
    var movieList = [];
    // var movieListClean = [];

    for (let j = 0; j < pages; j++) {
        queryToRun = queryURL + "&sort_by=vote_average.desc" + "&page=" + (j + 1) + apiKey;
        console.log(queryToRun);
        $.ajax({
            url: queryToRun,
            method: "GET"
          }).then(function(response2) {

            for (let i = 0; i < 20; i++) {
                // console.log(response2.results[i].title);
                if (response2.results[i].original_language === "en") {
                    var movie = response2.results[i].title;
                    movieList.push(movie);

                    var movieChosen = movie.trim();
                    movieChosen = movieChosen.replace(" ","+")
                    var queryURLomdb = "https://www.omdbapi.com/?t=" + movieChosen + "&apikey=trilogy";

                     // Creates AJAX call for the specific movie button being clicked
                    $.ajax({
                    url: queryURLomdb,
                    method: "GET"
                    }).then(function(response3) {
                        // && response3.Rated === "R" if we want to filter by rating
                        if ((parseInt(response3.Ratings[1].Value) > ratingFloorRotten)) {
                            console.log(response3.Rated);
                            var poster = response3.Poster;
                            var imgEl = $("<img>");
                            imgEl.attr("src", poster).attr("alt",response3.Title).attr("width","200").attr("height","auto");
                            $(".posters").append(imgEl);
                        };
                    });

                };
            };
            // console.log(movieList);
            // console.log(movieList.length);
            masterList = movieList;
        });
        
    };
    // console.log(masterList);
    // console.log(masterList.length);
  });

};

  