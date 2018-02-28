function loadMovies() {

    var payload = {};
    var localData = {};
    payload["apikey"] = "445b5624";
    // payload["t"];
    var retriveMovies = localStorage.getItem("movies");
    var movies = JSON.parse(retriveMovies);
    if (movies != null) {
        for (var i = 0; i < movies.length; i++) {
            var title = movies[i]["title"];
            payload["t"] = title.substring(7,title.length);
            $.ajax({
                url: "http://www.omdbapi.com/",
                dataType: "JSON",
                data: payload
            }).done(function (data){
                localData = data;
                $("#movieTable").append("<tr>"+ "<td>"+ "cover"+"</td>"+
                "<td>"+ data.Title+"</td>"+
                "<td>"+ data.Year+"</td>"+ 
                "<td>"+ data.Runtime+"</td>"+
                "<td>"+ "cover"+"</td>"+
                "</tr>")
                var posterPayload = {};
                posterPayload["apikey"] = "445b5624";
                payload["t"] = title.substring(7,title.length);
                $.ajax({
                    url:"http://img.omdbapi.com/",
                    dataType: "JSON",
                    data: posterPayload
                }).done(function(data){

                }).fail(function(data){

                });
                console.log(data);
            }).fail(function (data){
                console.log(data);
            });
            $("#movieTable").append("<tr>"+ "<td>"+ "cover"+"</td>"+
                "<td>"+ localData.Title+"</td>"+
                "<td>"+ localData.Year+"</td>"+ 
                "<td>"+ localData.Runtime+"</td>"+
                "<td>"+ "cover"+"</td>"+
                "</tr>")
            console.log(localData);
            // $("#results-list").append("<li>" + "<h6 id='titel'>" + "Titel: " + movies[i]["title"] + "</h6>"
            //     + "<h6 id='year'>" + "År: " + movies[i]["year"] + "</h6>" +
            //     "<button class='movie-item-delete btn btn-default'>"+
            //     "Ta bort</button></li>");
        }
    }
    else{
        $("#error").css('display','block');
    }
}
window.onload = loadMovies();