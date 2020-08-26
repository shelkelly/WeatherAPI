var citySearch = document.getElementById("citysearch");
var cname = document.getElementById("cname");
var cityInfo = document.getElementById("cityInfo");
var forecast = document.getElementById("forecast");
var cities = [];
var cityname;



$(document).ready(function () {

    // This function displays the city information
    function displayCity() {
        $("#location").empty();
        $("#humidity").empty();
        $("#windspeed").empty();
        $("#temperature").empty();

        var city = $(this).attr("data-name");
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=4ac35a4795065ed1d0f8c9d2fdec58cd";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var today = new Date()
            var dd = String(today.getDate()).padStart(2, '0')
            var mm = String(today.getMonth() + 1).padStart(2, '0')
            var yyyy = today.getFullYear()
            today = mm + '/' + dd + '/' + yyyy
            console.log(today);

            $("#location").html("<h1>" + response.name + "Weather Details for " + today + "</h1>");
            $("#humidity").text("Humdity: " + response.main.humidity);
            $("#windspeed").text("Wind Speed: " + response.wind.speed);

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            console.log(tempF)
            $("#temperature").text("Temperature (F): " + tempF.toFixed(2));
        });
    };

    function displayForecast() {
        $("#forecast").empty();
        var city = $(this).attr("data-name")
        var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=4ac35a4795065ed1d0f8c9d2fdec58cd";
        $.ajax({
            url: forecastURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var forecastHeader = $("<h5 class='card-header border-secondary'>").text("5 Day Forecast");
            $("#forecast").append(forecastHeader);
            var cardDeck = $("<div  class='card-deck'>");
            $("#forecast").append(cardDeck);

            for (i = 0; i < 5; i++) {
                var forecastCard = $("<div class='card mb-3 mt-3'>");
                var cardBody = $("<div class='card-body'>");
                var date = new Date();
                var val = (date.getMonth() + 1) + "/" + (date.getDate() + i + 1) + "/" + date.getFullYear();
                var forecastDate = $("<h5 class='card-title'>").text(val);

                cardBody.append(forecastDate);
                var getCurrentWeatherIcon = response.list[i].weather[0].icon;
                console.log(getCurrentWeatherIcon);
                var displayWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + getCurrentWeatherIcon + ".png />");
                cardBody.append(displayWeatherIcon);
                var getTemp = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                var tempEl = $("<p class='card-text'>").text("Temp: " + getTemp.toFixed(2) + "° F");
                cardBody.append(tempEl);
                var getHumidity = response.list[i].main.humidity;
                var humidityEl = $("<p class='card-text'>").text("Humidity: " + getHumidity + "%");
                cardBody.append(humidityEl);
                forecastCard.append(cardBody);
                cardDeck.append(forecastCard);
            }
        })
    }
    
    //function uvIndex() {
      //  var latitude = 
        //var longitude = 
        //var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=4ac35a4795065ed1d0f8c9d2fdec58cd" + "&lat=" + {lat} + "&lon=" + {lon};
    //}

// This function renders the buttons to be displayed after search
function renderbuttons() {
    $("#recentsearch").empty();
    for (var i = 0; i < cities.length; i++) {
        var a = $("<button>");
        a.addClass("city-btn");
        a.attr("data-name", cities[i]);
        a.text(cities[i]);
        $("#recentsearch").append(a);
    }
}

$("#add-city").on("click", function (event) {
    event.preventDefault();
    var cname = $(".cname").val().trim();
    cities.push(cname);
    renderbuttons();
});

$(document).on("click", ".city-btn", displayCity, displayForecast);


});