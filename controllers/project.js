const projectModel = require("../models/projectSchema")

exports.getAllProjects = async function (req, res) {
    let a = await projectModel.find()
    res.send(a)
    console.log(a)
  }