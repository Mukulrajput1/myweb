const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
    name: { type: String, required: true },
   image: { type: String, required: true }
  });
  const profileModel = mongoose.model("profiles", profileSchema);

  module.exports = profileModel

