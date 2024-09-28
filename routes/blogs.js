const express = require('express')
const router = express.Router()
const { getAllBlogs, getBlogById } = require('../controllers/blogs')

router.get('/',getAllBlogs)
router.post('/',getBlogById)
module.exports = router