$("input[name='test']").on("click", function () {
    console.log("ckliced");
});
$("#search #searchBtn").on("click", function () {
    if ($("input[name = 'movieSearch']").val() != "") {
        var payload = {};
        payload["apikey"] = "445b5624";
        payload["s"] = $("input[name = 'movieSearch']").val();
        $.ajax({
            url: "http://www.omdbapi.com/",
            dataType: "JSON",
            data: payload
        }).done(function (data) {
            $("#results-list").empty();
            for (var i = 0; i <= data.Search.length - 1; i++) {
                $("#results-list").append("<li>" + "<h6 id='titel'>" + "Titel: " + data.Search[i].Title + "</h6>"
                    + "<h6 id='year'>" + "År: " + data.Search[i].Year + "</h6>"
                    + " <button class='movie-item-favorit btn btn-default'>" +
                    "Favorit</button>" +
                    "<button class='movie-item-archive btn btn-default'>" +
                    "Arkiv</button></li>");
            }
            console.log(data);
        }).fail(function (data) {
            console.log("failed to fetch movie");
        });
    }
    else {
        alert("Var vänlig skriv en söktext i rutan för att söka på film");
    }
});

var movies = [];
$("#results-list").on('click', '.movie-item-archive', function (e) {
    var item = this;
    archiveMovie(e, item)
})
function archiveMovie(e, item) {
    e.preventDefault();
    var retrivemovies = localStorage.getItem("movies");
    movies = JSON.parse(retrivemovies);
    if (movies == null) {
        movies = [];
        // movies = [
        //     {
        //         titel: "dummmy",
        //         year: "dummy"
        //     }
        // ];
        // var JSONMovies = JSON.stringify(movies);
        // localStorage.setItem("movies", JSONMovies);
    }
    var temp = {};
    temp["title"] = $(item).parent().find("#titel").text();
    temp["year"] = $(item).parent().find("#year").text()
    console.log("test find" + findObj(movies, "title", temp.title));
    if (findObj(movies, "title", temp.title) === null) {
        console.log("non excisting");
        movies.push(temp);
        localStorage.removeItem("movies");
        var JSONMovies = JSON.stringify(movies);
        localStorage.setItem("movies", JSONMovies);
    }
}
function findObj(array, key, value) {
    console.log(array);
    console.log(key);
    console.log(value);
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}




function deleteMovie(e, item) {
    e.preventDefault();
    $(item).parent().fadeOut('slow', function () {
        $(item).parent().remove();
    });
}
$("#results-list").on('click', '.movie-item-delete', function (e) {
    var item = this;
    deleteMovie(e, item)
})