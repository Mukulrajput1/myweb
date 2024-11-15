const blogsModel = require('../models/blogs')
const commentsModel = require('../models/comments')
exports.getAllBlogs = async function (req, res) {
  const a = await blogsModel.find()
  res.send(a)
}

exports.getBlogById = async function (req, res) {
  const id = req.body.id
  const a = await blogsModel.find({ _id: id })
  const b = await commentsModel.count({ blogId: id })
  const c = {
    blog: a,
    comment: b
  }
  res.send(c)
  console.log(a)
}