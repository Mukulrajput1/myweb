const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    name: String,
    enail: String,
    review: String,
    rating: Number,
  });
  const ratingModel = mongoose.model("ratings", ratingSchema);

  module.exports = ratingModel