const profileModel = require("../models/profileSchema")


exports.profileData = async function (req, res) {
    const a = await profileModel.findOne()
    res.send(a)
    console.log(a)
  
  }