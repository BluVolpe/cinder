const router = require("express").Router();
const movies = require("../JSONdatabase/movies.json").movies;

router.get("/filter", (req, res) => {
    let selected = [];

    let genres = ["action", "adventure", "animation", "comedy", "drama", "family","fantasy","horror","musical","mystery","romance", "thriller"];
    
    genres.forEach((genre) => {
        if (req.query[genre] == "on") {
            let firstLetter = genre[0].toUpperCase();
            let substr = genre.substring(1);
            selected.push(firstLetter+substr)
        }
    });

    let foundMovies = [];

    selected.forEach((genre) => {
        movies.forEach((movie) => {
            if (movie["Genre"] != undefined) {
                if (movie["Genre"].includes(genre) && foundMovies.indexOf(movie) == -1) {
                    foundMovies.push(movie);
                }
            }
        })
    });

    let response = {
        movies: foundMovies
    }

    res.status(200);
    res.json(response);

});

module.exports = router;
// http://localhost:3001/movies/filter?comedy=on&drama=on&family=on&romance=on

