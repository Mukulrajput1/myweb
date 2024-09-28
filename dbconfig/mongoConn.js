
const mongoose = require("mongoose");
require('dotenv').config()
async function mainConnect() {

  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("mongo connection is done");
    
  } catch (error) {
    console.log("failed to connect with mongodb")
  }
    
}
module.exports = mainConnect