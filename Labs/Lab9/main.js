$("#myForm").submit(function(e) {
    e.preventDefault();
    var formData = new FormData(this);

    $.ajax({
        url: $(this).attr("action"), // Till adressen "server.php"
        type: $(this).attr("method"), // Med metoden "post"
        data: formData, // Vår data vi skickar med
        dataType: "JSON", // Hur vi ska tolka den data vi får tillbaka (som JSON)
        cache: false, // Vi tillåter inte att webbläsaren att cacha några resultat
        contentType: false, // Vi vill inte att jQuery ska bestämma hur vårt innehåll ska tolkas
        processData: false // Vi tillåter inte att jQuery att processa vår data (som strängar)
    }).done(function (data) {
        // Om vi får ett lyckat svar
        console.log(data);
    }).fail(function (data) {
        // Om vi får ett misslyckat svar
        console.log(data);
    });
});