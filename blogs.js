const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogsSchema = new Schema({
    name: { type: String, required: true },
    blogtitle: { type: String, required: true },
    blogdesc: { type: String, required: true }
  },{timestamps:true});
  const blogsModel = mongoose.model("blogs", blogsSchema);

  module.exports = blogsModel