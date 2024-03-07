
const mongoose = require("mongoose");
require('dotenv').config()
async function mainConnect() {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/myweb")
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("mongo connection is done");
    })
    .catch((res) => {
      console.log("failed to connect with mongo");
      res.send(200)
    });
}
module.exports = mainConnect