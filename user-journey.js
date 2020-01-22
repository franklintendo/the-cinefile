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
    // $('.year-button').removeClass("year-button-selected");
    $('.year-button').removeClass("year-button-selected");
    $('.posters').empty();
    decadeChosen = $(this).data("decade");
    $(this).addClass("year-button-selected");
    generateMovies(genreChosen, decadeChosen, movieRatingChosen);
    
    console.log("Decade clicked: " + decadeChosen);
    console.log("Genre ID selected: " + genreChosen);
    console.log("Rating clicked: " + movieRatingChosen);

    console.log("_______________");
});

// adding functionality to the movie rating buttons
$('.movie-rating-button').on('click', function() {
    // The global variable for the user's preferred
    // movie rating is filled with the data attribute
    // of the button they clicked on (G, PG, PG-13, or R)
    
    var genreChosen = userGenreId;
    
    $('.movie-rating-button').removeClass("rating-button-selected");
    $('.posters').empty();
    $(this).addClass("rating-button-selected");
    movieRatingChosen = $(this).data("rating");
    generateMovies(genreChosen, decadeChosen, movieRatingChosen);

    console.log("Decade clicked: " + decadeChosen);
    console.log("Genre ID selected: " + genreChosen);
    console.log("Rating clicked: " + movieRatingChosen);

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
    // set this variable to the chosen ID to feed into 
    // the API later
    userGenreId = "";

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

