const router = require("express").Router();
const movies = require("../JSONdatabase/movies.json").movies;
const User = require('../models/user');
const config = require('../config');
const jsonMovies = require("../JSONDatabase/movies.json").movies

const getRatingFromText = (rating) => {
    if (rating === "Good") {
      return 2;
    } else if (rating === "Okay") {
      return 1;
    } else if (rating === "Bad") {
      return 0;
    }
  }

router.get("/movies/:user", async (req, res) => {
    const userID = req.params.user;

    let user = await User.findById(userID);

    if (user) {
        let json = {
            movies: user.reviews
        }
        res.status(200);
        res.json(json);
    } else {
        res.status(404);
    }


});

router.get("/recommended/:user", async (req, res) => {
    const userID = req.params.user;

    let user = await User.findById(userID);

    if (user) {

        let points = {};
        let allGenres = [];

        let movies = user.reviews;
        movies.forEach((movie) => {
            let parsedGenres = movie.movieGenres.split(", ");
            parsedGenres.forEach((genre) => {
                allGenres.push(genre);
                if (points[genre] === undefined) {
                    points[genre] = {
                        total: 1,
                        score: getRatingFromText(movie.ratingOption)
                    }
                } else {
                    let obj = points[genre];
                    obj.total = obj.total + 1;
                    obj.score = obj.score + getRatingFromText(movie.ratingOption);
                    points[genre] = obj;
                }
            })
        });

        let uniqueGenres = allGenres.filter((v, i, s) => {
            return s.indexOf(v) === i;
        });

        let recRequirement = uniqueGenres.map((genre) => {
            return {genre: genre, score: (points[genre].score / points[genre].total) / 2};
        });

        recRequirement.sort((a, b) => {
            return b.score - a.score;
        });

        let top3 = [];
        recRequirement.forEach((rec) => {
            if (top3.length < 3) {
                top3.push(rec)
            }
        });

        let foundMovies = [];
        jsonMovies.forEach((movie) => {
            let hasAll3 = true;
            if (movie.Genre != undefined) {
                if (movie.Genre.split(", ").indexOf(top3[0]) !== -1 && movie.Genre.split(", ").indexOf(top3[1]) !== -1 && movie.Genre.split(", ").indexOf(top3[2]) !== -1) {
                    foundMovies.push(movie);
                    console.log(movie)
                }
            }
        });

        res.status(200);
        res.json({
            recommendedMovies: foundMovies
        });

    } else {
        res.status(404);
    }

});

module.exports = router;
// mega mind