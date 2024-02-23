const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    project_name: { type: String, required: true },
   project_desc: { type: String, required: true },
   project_technology: { type: String, required: true },
   project_startdate: { type: String, required: true },
   images: { type: Array, required: true }
  });
  const projectModel = mongoose.model("projects", projectSchema);

  module.exports = projectModel

