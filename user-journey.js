var userGenreName = "";
var userGenreId = "";



        for (var i=0;i < genres.length;i++) {
            var column = $('<div class="column is-narrow">');
            var button = $('<button class="button is-large genre-choice-button">');
            
            column.append(button);
            button.text(genres[i].name);
            button.attr("data-genre", genres[i].name);
            button.attr("data-id", genres[i].id);
            $('#genre-buttons').append(column);
        }

        $('.genre-choice-button').on("click", function(){
            userGenreName = $(this).data("genre");
            userGenreId = $(this).data("id");
            $('.genre-choice-button').removeClass('genre-chosen');
            $(this).addClass('genre-chosen');
            
        });
        $('#submit-genre-button').on("click", function(){
            // alert(userGenre);
            var genreID = userGenreId;
            $('.genre-choice-button').attr("style", "display: none;");
            $('.genre-chosen').attr('style','display: block;');
            $('.genre-chosen').addClass('is-large');
            generateMovies(genreID);
        });