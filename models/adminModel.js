const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
  },{timestamps:true});
  const adminModel = mongoose.model("admins", adminSchema);

  module.exports = adminModel