const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
    email: { type: String, required: true }
  });
  const subscriberModel = mongoose.model("subscribers", subscriberSchema);

  module.exports = subscriberModel

