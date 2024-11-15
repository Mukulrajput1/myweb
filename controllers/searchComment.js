
const commentsModel = require("../models/comments")

exports.getAllBlogComments = async function (req, res) {
    console.log(req.body.id)
    const a = await commentsModel.find({ blogId: req.body.id })
    res.send(a)
    console.log(req.body)
  }