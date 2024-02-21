const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const techSkillSchema = new Schema({
    title: String,
    description: String,
    url:String,
  });
  const techSkillModel = mongoose.model("technical_skill", techSkillSchema);

  module.exports = techSkillModel