var userGenreName = "";
var userGenreId = "";



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

                var genreID = userGenreId;
                // Hide all of the other genre choices
                $('.genre-choice-button').attr("style", "display: none;");
                // Hide the submit button since the user already submitted their genre selection
                $(this).attr("style", "display: none");
                // Only display the button with the genre the user chose
                $('.genre-chosen').attr('style','display: inline-flex;');
                // Feed the user's selected genre into the movie API
                generateMovies(genreID);
            }
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
            console.log(genreChoice);
        }

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
            $('.genre-choice-button').attr("style", "display: inline-flex;");
            // Show submit button again
            $('#submit-genre-button').attr("style", "display: inline-flex;");
        }