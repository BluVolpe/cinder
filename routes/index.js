const router = require("express").Router();
const authRoutes = require("./auth");
const movieRoutes = require("./movies");
const userMovies = require("./userMovies");
const path = require("path");

// Routes for authentication
router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);
router.use("/user", userMovies)


// If no API routes are hit, send the React app
router.use("*", (req, res) => res.redirect("/login"));

module.exports = router;