const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentsSchema = new Schema({
    name: { type: String, required: true },
   comment: { type: String, required: true },
   blogId: { type: String, required: true },
    date: { type: Date, default:Date.now }
  },{timestamps:true});
  const commentsModel = mongoose.model("comments", commentsSchema);

  module.exports = commentsModel