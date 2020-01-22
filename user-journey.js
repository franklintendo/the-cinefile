// Empty variables for user selections
var userGenreName = "";
var userGenreId = "";
var decadeChosen = "";
var movieRatingChosen = "";


// Dynamically generate buttons based
// on the genres a user can choose
for (var i=0;i < genres.length;i++) {
    var column = $('<div class="column is-narrow">');
    var button = $('<button class="button genre-choice-button">');

    column.append(button);
    button.text(genres[i].name);
    button.attr("data-genre", genres[i].name);
    button.attr("data-id", genres[i].id);
    $('#genre-buttons').append(column);
}

// If you click on any of the genre buttons
$('.genre-choice-button').on("click", function(){
    if ($(this).hasClass('genre-chosen')) {
        // If the genre is already selected, then deselect it and 
        //display all of your options again
        removeGenreChoice(this);
    } else {
        // If the genre isn't selected, then select it
        // save the user's choice, and hide all the other genres
        // and the submit buttons
        selectGenreChoice(this);
    }
});

// When the user clicks on the submit button after selecting
// their genre
$('#submit-genre-button').on("click", function(){
    // If the user has a genre selected
    if (userGenreId) {

        var genreChosen = userGenreId;
        // Hide all of the other genre choices
        $('.genre-choice-button').parent().removeClass("is-inline-flex");
        $('.genre-choice-button').parent().addClass("is-hidden");

        // Hide the submit button since the user already submitted their genre selection
        // $(this).attr("style", "display: none");
        $(this).addClass("is-hidden");

        // Only display the button with the genre the user chose
        $('.genre-chosen').parent().removeClass("is-hidden");
        $('.genre-chosen').parent().addClass("is-inline-flex");

        // Feed the user's selected genre into the movie API
        generateMovies(genreChosen);

        // Show the year and movie rating buttons
        $('#extra-buttons').removeClass('is-hidden');
        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        
    }
});

 // adding functionality to the year buttons
 $('.year-button').on('click', function() {
    
    var genreChosen = userGenreId;

    // Strip all of the buttons of the selected class
    // and only apply according to the conditions in the if statement below
    $('.year-button').removeClass("year-button-selected");
    
    
    if (movieRatingChosen && decadeChosen === "") {
        // If there is a movie rating already selected
        // and there isn't a decade selected yet, then run the generateMovies function with
        // all three parameters applied (genre, decade, and movie rating)
        decadeChosen = $(this).data("decade");
        $(this).addClass("year-button-selected");

        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChosen, decadeChosen, movieRatingChosen);
    } else if(movieRatingChosen && decadeChosen === $(this).data("decade")) {
        // If there is a movie rating already selected
        // and the user clicks on the same decade button, then 
        // deselect the decade and run the generateMovies function with
        // only two parameters applied (genre and movie rating)
        decadeChosen = "";
        $(this).removeClass("year-button-selected");
        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChosen, movieRatingChosen);
    } else if(movieRatingChosen === "" && decadeChosen === $(this).data("decade")) {
        // If there isn't a movie rating selected
        // and the user clicks on the same decade button, then 
        // deselect the decade and run the generateMovies function with
        // only one parameter applied (genre)
        decadeChosen = "";
        $(this).removeClass("year-button-selected");
        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChosen);
    } else {
        // If there isn't a movie rating selected and
        // the user clicks on another decade button
        // then run the generateMovies function with
        // only two parameters applied (genre and decade)
        decadeChosen = $(this).data("decade");
        $(this).addClass("year-button-selected");
        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChosen, decadeChosen);
    }
    console.log("_______________");
});

// adding functionality to the movie rating buttons
$('.movie-rating-button').on('click', function() {
    // The global variable for the user's preferred
    // movie rating is filled with the data attribute
    // of the button they clicked on (G, PG, PG-13, or R)
    
    var genreChosen = userGenreId;
    
    $('.movie-rating-button').removeClass("rating-button-selected");
    

    // If there is a decade selected
    // then run the generateMovies function with
    // all three parameters applied (genre, decade, and movie rating)
    if (decadeChosen && movieRatingChosen === "") {
        $(this).addClass("rating-button-selected");
        movieRatingChosen = $(this).data("rating");

        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChose, decadeChosen, movieRatingChosen);
    } else if(decadeChosen && movieRatingChosen === $(this).data("rating")) {
        // If there is a decade already selected
        // and the user clicks on the same movie rating button, then 
        // deselect the movie rating and run the generateMovies function with
        // only two parameters applied (genre and decade)
        movieRatingChosen = "";
        $(this).removeClass("rating-button-selected");

        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChosen, movieRatingChosen);
    }  else if(decadeChosen === "" && movieRatingChosen === $(this).data("rating")) {
        // If there isn't a decade selected
        // and the user clicks on an already selected movie rating button, then 
        // deselect the movie rating and run the generateMovies function with
        // only one parameter applied (genre)
        movieRatingChosen = "";
        $(this).removeClass("rating-button-selected");

        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChosen);
    } else {
        $(this).addClass("rating-button-selected");
        movieRatingChosen = $(this).data("rating");
        console.log("Decade clicked: " + decadeChosen);
        console.log("Genre ID selected: " + genreChosen);
        console.log("Rating clicked: " + movieRatingChosen);
        // generateMovies(genreChosen, movieRatingChosen);
    }
    console.log("_______________");
});



// Helper function for when a user selects a genre from
// the initial list of genre buttons
function selectGenreChoice(genreChoice) {
    // set this variable to the chosen ID to feed into 
    // the API later
    userGenreId = $(genreChoice).data("id");

    // Add the genre chosen class to the button that the user pressed
    // and remove it from all the other buttons
    $('.genre-choice-button').removeClass('genre-chosen');
    $(genreChoice).addClass('genre-chosen');
    // console.log(userGenreId);
}

// Helper function for when a user deselects a genre
function removeGenreChoice() {
    // reset this Genre ID variable to feed into 
    // the API later
    userGenreId = "";

    // Reset the movie rating and decade chosen variables
    // if they deselect the genre
    movieRatingChosen = "";
    decadeChosen = "";
    $('.movie-rating-button').removeClass("rating-button-selected");
    $('.year-button').removeClass("year-button-selected");


    // Remove all posters 
    $('.posters').html("");
    // Remove the genre chosen class from all the genre buttons
    // since the user is deselecting their choice
    $('.genre-choice-button').removeClass('genre-chosen');

    // Show all options again
    $('.genre-choice-button').parent().removeClass("is-hidden");
    $('.genre-choice-button').parent().addClass("is-inline-flex");

    // Show submit button again
    $('#submit-genre-button').removeClass('is-hidden');
    $('#submit-genre-button').addClass('is-inline-flex');

    // Remove the decade and movie rating buttons
    $('#extra-buttons').addClass('is-hidden');
}

