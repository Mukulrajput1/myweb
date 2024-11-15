const express = require("express");
const app = express();
const subscriberModel = require('./models/subscribers')
const clientModel = require('./models/client')
const blogsModel = require('./models/blogs')


const certificateModel = require("./models/certificateSchema")

const profileModel = require("./models/profileSchema")

const mainConnect = require('./dbconfig/mongoConn')
const path = require("path")
const resume = require('./routes/resume')
const technicalSkill = require('./routes/technicalSkill')
const blogs = require('./routes/blogs')
const searchComment = require('./routes/searchComment')
const project = require('./routes/project')
const comments = require('./routes/comments')
var cors = require("cors");
mainConnect()

app.use(cors());
app.use(express.json());

// app.get("/resume", );
app.use(express.static(path.resolve(__dirname, "frontend", "build")));
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.get("/hire", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.get("/blog", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
app.get("/blog/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.use('/resume', resume)
app.use("/technicalskill", technicalSkill)
app.use("/blogs",blogs );
app.use("/comments",comments);
app.use("/searchComment",searchComment );
app.use("/project",project );


// app.get("/showtab", async function (req, res) {
//   const a = await ratingModel.find()
//   res.send(a)
//   console.log(a)
// });


app.get("/profile", async function (req, res) {
  const a = await profileModel.findOne()
  res.send(a)
  console.log(a)

});

app.get("/certificates", async (req, res) => {
  let a = await certificateModel.find()
  res.send(a)
})

app.post("/subscribe", async (req, res) => {
  const data = { "email": req.body.email }

  const b = await subscriberModel.count({ email: data.email })

  console.log(b)
  // console.log(req.body)
  if (b) {
    res.status(400).send("Already subscribe")
  } else {
    const a = await subscriberModel.insertMany({ email: data.email })
    res.status(200).send("successfully subscribed")
  }
})

app.post("/datasend", async (req, res) => {
  const leadData = {
    Last_Name: req.body.first_name,
    First_Name: req.body.last_name,
    Email: req.body.email,
    Phone: req.body.phone
  };

  insertData(leadData);
  console.log(req.body)

  err = {
    data: 200
  }
  res.send(err)
})

app.post("/hire", async (req, res) => {
  console.log(req.body)
  const a = clientModel.insertMany(req.body)
  res.send("Thank You! We will contact You shortly")
})
app.post("/blogpost", async (req, res) => {
  console.log(req.body)
  const a = blogsModel.insertMany(req.body)
  res.send("ok")
})


app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const verifyToken = req.query["hub.verify_token"];

  if (mode && verifyToken) {
    if (mode === "subscribe" && verifyToken === myToken) {
      console.log("Webhook verified");
      res.status(200).send(challenge);
    } else {
      res.status(403).send("Forbidden");
    }
  }
  const data = {
    mode: mode,
    challenge: challenge,
    verifyToken: verifyToken,
    token : token,
    phoneNumberId: phoneNumberId,
    myToken: myToken
  }
  res.status(200).send(data);
});

app.listen(8000, () => {
  console.log("server started successfully for webhook");
});
 