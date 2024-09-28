const express = require('express')
const { getAllProjects } = require('../controllers/project')
const router = express.Router()

router.get('/',getAllProjects)

module.exports = router
