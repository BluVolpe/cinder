const config = require("./config.json");

var omdbURL = "https://www.omdbapi.com/?apikey=" + config.omdbKey + "&t=" + "Cars";

    fetch(omdbURL)
        .then(function (response) {
            return response.json()
        }).then(function (data) {
            console.log("THIS IS THE DATA");
            console.log(data);
        });