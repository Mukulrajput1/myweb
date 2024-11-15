const express = require('express')
const { pushComment } = require('../controllers/comments')
const router = express.Router()

router.post('/',pushComment)

module.exports = router