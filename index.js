const express = require("express");
const app = express();
require('dotenv').config();
const mainConnect = require('./mongoConn')
const bodyParser = require("body-parser");
const axios = require("axios");
const subscriberModel = require('./subscribers')
const clientModel = require('./client')
const blogsModel = require('./blogs')
const commentsModel = require("./comments")
const resumeModel = require("./resume")
const path = require("path")
const techSkillModel = require("./techSkillSchema")
const ratingModel = require("./ratingSchema")
const certificateModel = require("./certificateSchema")
const projectModel= require("./projectSchema")
const profileModel= require("./profileSchema")
const token = 'EAAUXn7ZAmXu0BO8FyOE9VV2pXPnpk8co6j9DdEviLEPfOZCf9eEhfOL8DBkxL8cYu5pZAcfLzTKZCSgi9jsblDybwXJ8qrLw3nWHxEJ3e4EBm7uGul9IgHI2CpTdXPaDDfKISZBroE6RiLfiYyGZBd5si4GiFXixvrueWQgGGiZCebAe8fVMsS6dUZBWlptP7nDgSIpvFf9trrTZAr8fpILhUiZCZC7fYoCv0tikUwZD';       // Access token for WhatsApp API
const myToken = 'my_custom_token';   // Verification token for webhook
const phoneNumberId = '460908993776402';

var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, "frontend", "build")));
mainConnect()

app.get("/resume", async function (req, res) {
  const resume = await resumeModel.findOne({ name: "resume.pdf" });
  const pdfBuffer = Buffer.from(resume.content, "base64");
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="resume.pdf"'
    );
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdfBuffer);
  });
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

app.get("/technicalskill",async function(req,res){
  const d = await techSkillModel.find()
  res.send(d)
  console.log(d)
})

app.get("/showtab",async function(req,res){
  const a = await ratingModel.find()
  res.send(a)
  console.log(a)
});
app.get("/blogs",async function(req,res){
  const a = await blogsModel.find()
  
  res.send(a)
  // console.log(a)
});
app.post("/blogs",async function(req,res){
  const id = req.body.id
  const a = await blogsModel.find({_id:id})
  const b =  await commentsModel.count({blogId:id})
  const c = {
    blog:a,
    comment:b
  }
  res.send(c)
  console.log(a)
});
app.post("/comments",async function(req,res){
  const a = await commentsModel.insertMany(req.body)
  res.send("ok")
  console.log(req.body)

});
app.post("/searchComment",async function(req,res){
  console.log(req.body.id)
  const a = await commentsModel.find({blogId:req.body.id})
  res.send(a)
  console.log(req.body)

});

app.get("/project",async function(req,res){
  let a = await projectModel.find()
  res.send(a)
  console.log(a)
});

app.get("/profile",async function(req,res){
  const a = await profileModel.findOne()
  res.send(a)
  console.log(a)

});

app.get("/certificates",async(req,res)=>{
  let a = await certificateModel.find()
  res.send(a)
})

app.post("/subscribe",async (req,res)=>{
  const data = {"email":req.body.email}
  
  const b = await subscriberModel.count({email:data.email})
  
  console.log(b)
  // console.log(req.body)
  if(b){
    res.status(400).send("Already subscribe")
  }else{
  const a = await subscriberModel.insertMany({email:data.email})
  res.status(200).send("successfully subscribed")
  }
})

app.post("/datasend",async (req,res)=> {
  const leadData = {
    Last_Name: req.body.first_name,
    First_Name: req.body.last_name,
    Email: req.body.email,
    Phone: req.body.phone
  };
  
  insertData(leadData);
  console.log(req.body)

  err = {
    data:200
  }
  res.send(err)
})

app.post("/hire", async (req,res)=>{
  console.log(req.body)
  const a = clientModel.insertMany(req.body)
  res.send("Thank You! We will contact You shortly")
})
app.post("/blogpost", async (req,res)=>{
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

// Receiving messages from the webhook
app.post("/webhook", (req, res) => {
  const body = req.body;

  if (body.object) {
    body.entry.forEach((entry) => {
      const changes = entry.changes[0];
      if (changes.value && changes.value.messages) {
        const message = changes.value.messages[0];
        const from = message.from; // User phone number who sent the message
        const msgBody = message.text ? message.text.body : "No text";

        console.log(`Received message: '${msgBody}' from ${from}`);

        if(msgBody === 'hi' || msgBody === 'hii' || msgBody === 'hey' || msgBody === 'helo' || msgBody === 'hello' || msgBody === 'hlo'){
          sendMessage(from, "Hi there! 👋 How can I assist you today?\n1. Sales\n2. Jobs");
          if(msgBody === "1" || msgBody === "sales"){
            sendMessage(from, "Great! To get started, could you please share your name?");
            if(msgBody){
              sendMessage(from, "Thank you, [Name]! 😊 Could you also provide your email address?");
              if(msgBody){
                sendMessage(from, "Got it! And your phone number, please?");
                if(msgBody){
                  sendMessage(from,  "Lastly, could you briefly describe the job requirements or details you’re looking to discuss?");
                  if(msgBody){
                    sendMessage(from,  "Thanks for all the details! One of our team members will reach out shortly.");
                  }
                }else{
                  sendMessage(from,  "Something went wrong");
                }
              }else{
                sendMessage(from,  "Something went wrong");
              }
            }else{
              sendMessage(from,  "Something went wrong");
            }
          }else{
            sendMessage(from,  "Something went wrong");
          }
        }else{
          sendMessage(from,  "Something went wrong");
        }

        // const responses = new Map([
        //   [['hi', 'hii', 'hey', 'helo', 'hello', 'hlo','Hi', 'Hii', 'Hey', 'Helo', 'Hello', 'Hlo'], "Hi there! How can I assist you today? 1. Sales2. Jobs"],
        //   ['1', "Hello User, You type 1"],
        //   ['2', "Hello User, You type 2"]
        // ]);
        
        // function getResponse(message) {
        //   for (const [key, response] of responses.entries()) {
        //     if (Array.isArray(key) ? key.includes(message) : key === message) {
        //       return response;
        //     }
        //   }
        //   return "Something went wrong";
        // }
        
        
        sendMessage(from, getResponse(msgBody));
        
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
});

// Function to send a WhatsApp message
// function sendMessage(to, messageText) {

//   console.log(">>>>>>>>>>.to",to,">>>>>>>>>>>message",messageText)
//   axios({
//     method: "POST",
//     url: `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json"
//     },
//     data: {
//       messaging_product: "whatsapp",
//       to: to,
//       type: "template",
//       template: {
//         name: messageText,
//         language: {
//           code: "en_US"
//         }
//       }
//     }
//   })
//   .then(response => {
//     console.log("Message sent:", response.data);
//   })
//   .catch(error => {
//     console.error("Error sending message:", error.response ? error.response.data : error.message);
//   });
// }

// function sendMessage(to, messageText) {
//   console.log("To:", to, "Message:", messageText);

//   axios({
//     method: "POST",
//     url: `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json"
//     },
//     timeout: 1000000,
//     data: {
//       messaging_product: "whatsapp",
//       to: to,
//       type: "text",
//       text: {
//         body: messageText
//       }
//     }
//   })
//   .then(response => {
//     console.log("Message sent:", response.data);
//   })
//   .catch(error => {
//     console.error("Error sending message:", error.response ? error.response.data : error.message);
//   });
// }
async function sendMessage(to, messageText) {
  console.log("Sending message to:", to, "with template:", messageText);
  
  const maxRetries = 3;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      const response = await axios({
        method: "POST",
        url: `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        timeout: 60000,
        data: {
          messaging_product: "whatsapp",
          to: to,
          type: "text",
                text: {
                  body: messageText
                }
        }
      });
      console.log("Message sent successfully:", response.data);
      return response.data;
      
    } catch (error) {
      attempt++;
      if (attempt >= maxRetries) {
        console.error("All retry attempts failed. Error:", error.response ? error.response.data : error.message);
        throw error;
      } else {
        console.warn(`Attempt ${attempt} failed. Retrying in ${2 ** attempt * 100}ms...`);
        await new Promise(resolve => setTimeout(resolve, 2 ** attempt * 100)); // Exponential backoff
      }
    }
  }
}


app.listen(8000, () => {
  console.log("server started successfully for webhook");
});
 