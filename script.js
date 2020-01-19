// lets construct some queryURLs
// this query works (use to debug)
// https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&api_key=acb4c32a00f4cc5e0b30b2fb2f5a1adb

// api key
var apiKey = "&api_key=acb4c32a00f4cc5e0b30b2fb2f5a1adb";

// default query
var defaultURL = "https://api.themoviedb.org/3/discover/movie?";

// by year range
var eighties = {
    start: "primary_release_date.gte=1980-01-01",
    end: "&primary_release_date.lte=1989-12-31"
}
var nineties = {
    start: "primary_release_date.gte=1990-01-01",
    end: "&primary_release_date.lte=1999-12-31"
}
var twoThousands = {
    start: "primary_release_date.gte=2000-01-01",
    end: "&primary_release_date.lte=2009-12-31"
}
var twentyTens = {
    start: "primary_release_date.gte=2010-01-01",
    end: "&primary_release_date.lte=2019-12-31"
}

var chosenDecade = twentyTens;
var chosenStart = chosenDecade.start;
var chosenEnd = chosenDecade.end;
console.log(chosenStart); // returns 1980-01-01
var yearFilter = chosenStart + chosenEnd;

// genre filter
var genresList = genres;    
var chosenGenreName = genresList[8].name;
var chosenGenreID = genresList[8].id;

var genreFilter = "&with_genres=" + chosenGenreID;

// add ratings 
var ratingFloor = 7.0;
var ratingFilter = "&vote_average.gte=" + ratingFloor;

// construct query
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

    for (let j = 0; j < pages; j++) {
        queryToRun = queryURL + "&sort_by=vote_average.desc" + "&page=" + (j + 1) + apiKey;
        console.log(queryToRun);
        $.ajax({
            url: queryToRun,
            method: "GET"
          }).then(function(response2) {

            for (let i = 0; i < 20; i++) {
                console.log(response2.results[i].title);
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
                        var poster = response3.Poster;
                        var imgEl = $("<img>");
                        imgEl.attr("src", poster).attr("alt",response3.Title);
                        $(".posters").append(imgEl);
                    });

                }
            }
            console.log(movieList);
            console.log(movieList.length);
            masterList = movieList;
        });
        
    };
    console.log(masterList);
    console.log(masterList.length);
  });



  