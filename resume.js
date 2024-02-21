const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const resumeSchema = new Schema({
    name: String,
    content: String,
  });
  const resumeModel = mongoose.model("pdfs", resumeSchema);

  module.exports = resumeModel
