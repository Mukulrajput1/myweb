const express = require('express')
const { profileData } = require('../controllers/profile')
const router = express.Router()

router.get('/',profileData)

module.exports = router