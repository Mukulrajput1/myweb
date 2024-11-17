const express = require("express");
const {getAllData} = require('../controllers/getAllData')


const router = express.Router();

const {login}= require('../controllers/login')
const {verifyToken} = require('../controllers/verifytoken')



// Login route
router.post("/login", login);

// Protected route example
router.get("/protected", verifyToken, getAllData);

module.exports = router;
