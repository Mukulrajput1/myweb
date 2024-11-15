const express = require('express')
const router = express.Router()
const { getTechnicalSkills } = require('../controllers/technicalSkill')

router.get('/',getTechnicalSkills)

module.exports = router