const router = require("express").Router();
const movies = require("../JSONdatabase/movies.json").movies;
const User = require('../models/user');
const config = require('../config')

const jwt = require('jsonwebtoken');

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

router.get("/stats", async (req, res) => {
    console.log('headers', req.headers)
    try{
        const authorization = req.headers.authorization;

        const token = authorization.split(' ')[1];

        const decodedJWT = jwt.verify(token, config.jwtSecret);
    
        console.log('Movie stats get request', decodedJWT);
    
        // get the user object
        const user = await User.findById(decodedJWT.userId).exec();
    
        if(user == null) {
            console.warn("user not found");
            return res.sendStatus(401);
        }
    
        // summarize the user statistics
        stats = {
            fantasy: 3
        };

        // TODO loop over the reviews and calculate the statistics
        user.reviews.forEach(review => {
            // add the genre if is does not exist, and increment the existing ones
        });

        // scale the data
    
        res.status(200).json(stats);
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
});

router.post("/", async (req, res) => {
    console.log('headers', req.headers)
    try{
        const review = req.body;
        const authorization = req.headers.authorization;

        const token = authorization.split(' ')[1];

        const decodedJWT = jwt.verify(token, config.jwtSecret);
    
        console.log('Movie review posted', review, decodedJWT);
    
        // get the user object
        const user = await User.findById(decodedJWT.userId).exec();
    
        if(user == null) {
            console.warn("user not found");
            return res.sendStatus(401);
        }
    
        // append the review to the user's review list
        user.reviews.push({
            imbdId: review.id,
            ratingOption: review.ratingOption,
            movieGenres: review.movieGenres
        });

        await user.save();
        console.log('****** saved ********')
    
        res.status(200).json({ok: 'ok'});
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = router;
// http://localhost:3001/movies/filter?comedy=on&drama=on&family=on&romance=on

