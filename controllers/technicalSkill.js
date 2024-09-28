const techSkillModel = require('../models/techSkillSchema')

exports.getTechnicalSkills = async function (req, res) {
    const d = await techSkillModel.find()
    res.send(d)
    console.log(d)
  }