const config = require("./config.json");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./routes");

const omdbURL = "https://www.omdbapi.com/?apikey=" + config.omdbKey + "&t=" + " ";

