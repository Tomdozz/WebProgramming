var pos = {};
function getWeather() {
    navigator.geolocation.getCurrentPosition(onSuccess, function () {
        alert("Vi kunde tyvärr inte hämta din plats just nu.");
    });
}
function onSuccess(position) {
    var payload = {};
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    payload["lat"] = lat;
    payload["lon"] = long;
    payload["units"] = "metric";
    payload["APPID"] = "bd9943c0c352500d632d4a4457df7292";
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather",
        type: "GET",
        datatype: "JSON",
        data: payload
    }).done(function (data) {
        console.log(data.main.temp);
        
        $("#temp").append(data.main.temp);
        $("#state").append(data.weather[0].main);
        $("#icon").attr('src',"http://openweathermap.org/img/w/" + data.weather[0].icon +".png");
        console.log(data);
    }).fail(function (data) {
        console.log("fail");
    });
    console.log(position);
}
window.onload = getWeather();