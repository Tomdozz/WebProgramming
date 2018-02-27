var pos = {};
function getWeather() {
    navigator.geolocation.getCurrentPosition(onSuccess, function () {
        alert("Vi kunde tyvärr inte hämta din plats just nu.");
    }, {});
}
function onSuccess(position) {
    var payload = {};
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    payload["lat"] = lat;
    payload["lon"] = long;
    payload["APPID"] = "bd9943c0c352500d632d4a4457df7292"
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather",
        type: "GET",
        datatype: "JSON",
        data: payload
    }).done(function (data) {
        console.log(data);
    }).fail(function (data) {
        console.log("fail");
    });
    console.log(position);
}
window.onload = getWeather();