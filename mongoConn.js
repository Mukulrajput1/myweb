
const mongoose = require("mongoose");
async function mainConnect() {
  mongoose
    // .connect("mongodb://127.0.0.1:27017/myweb")
    .connect("mongodb+srv://mukul:5632@cluster0.dqrtgxm.mongodb.net/myweb")
    .then((res) => {
      console.log("mongo connection is done");
    })
    .catch(() => {
      console.log("failed to connect with mongo");
      res.send(200)
    });
}
module.exports = mainConnect