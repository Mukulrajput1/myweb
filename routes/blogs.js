const express = require('express')
const router = express.Router()
const { getAllBlogs, getBlogById, updateBlog } = require('../controllers/blogs')
const {verifyToken} = require('../controllers/verifytoken')

router.get('/',getAllBlogs)
router.post('/',getBlogById)
router.patch('/update',verifyToken,updateBlog)

module.exports = router