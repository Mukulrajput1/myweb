
const commentsModel = require("../models/comments")

exports.pushComment = async function (req, res) {
    const a = await commentsModel.insertMany(req.body)
    res.send("ok")
    console.log(req.body)
  }