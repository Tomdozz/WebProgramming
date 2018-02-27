$("#myForm").submit(function (e) {
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
        console.log("Successfully upload");
        // Om vi får ett lyckat svar
        console.log(data);
    }).fail(function (data) {
        console.log("fail upload");
        // Om vi får ett misslyckat svar
        console.log(data);
    });
});
var files = [];
// function showImages(){
//     $.ajax({
//         url: "http://ddwap.mah.se/AF8120/server.php?action=getMedia&type=photo",
//         type: "get",
//         data: files,
//         dataType: "JSON"
//         // cache: false,
//         // contentType: false,
//         // processData: false
//     }).done(function (data){
//         console.log("Loaded images");
//         console.log(data);
//         for(var i = 0; i<data.files.length;i++){
//             console.log("in loop");
//             console.log(data.files[i]);
//             var item = document.createElement("IMG");
//             console.log(data.files[i].path);
//             item.src = data.files[i].path;
//             document.getElementById("images").appendChild(item);
//         }
//     }).fail(function(data){
//         console.log(data);
//         console.log("failed to load image");
//     });
// }
function chooseDisplay(whatMedia) {
    console.log(whatMedia);
    var container = document.getElementById("images"); 
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    $.ajax({
        url: "http://ddwap.mah.se/AF8120/server.php?action=getMedia&type=" + whatMedia,
        type: "get",
        data: files,
        dataType: "JSON"
    }).done(function (data) {
        console.log("Loaded images");
        console.log(data);
        if (data.files != null){
            for (var i = 0; i < data.files.length; i++) {
                var item = document.createElement("IMG");
                console.log(data.files[i].path);
                item.src = data.files[i].path;
                container.appendChild(item);
            }
        }
    }).fail(function (data) {
        console.log(data);
        console.log("failed to load image");
    });
}
function mediaType(value) {
    document.getElementById("medias").accept = value;
}
window.onload = showImages();