const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    email: { type: String, required: true },
   name: { type: String, required: true },
    mobile: { type: String, required: true }
  });
  const clientModel = mongoose.model("clients", clientSchema);

  module.exports = clientModel

