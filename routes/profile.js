const express = require('express')
const { profileData } = require('../controllers/profile')
const {updateProfileData} = require('../controllers/profile')
const {verifyToken} = require('../controllers/verifytoken')
const router = express.Router()

router.get('/', profileData)

router.patch('/update',verifyToken, updateProfileData)
module.exports = router