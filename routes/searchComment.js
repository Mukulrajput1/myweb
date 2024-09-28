const express = require('express')
const { getAllBlogComments } = require('../controllers/searchComment')
const router = express.Router() 

router.post('/',getAllBlogComments)

module.exports = router