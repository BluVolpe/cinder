const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  imbdId: String,
  ratingOption: String,
  movieGenres: String
});

const UserSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  reviews:{
    type: [ReviewSchema],
    require: true,
  }
});

module.exports = User = mongoose.model("user", UserSchema);
