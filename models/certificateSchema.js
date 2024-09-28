const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
    title: String,
    description: String,
    url:String,
  });
  const certificateModel = mongoose.model("certificates", certificateSchema);

  module.exports = certificateModel