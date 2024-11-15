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
app.use(bodyParser.json());

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

let name;
let email;
let number;

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

        // if(msgBody === 'hi' || msgBody === 'hii' || msgBody === 'hey' || msgBody === 'helo' || msgBody === 'hello' || msgBody === 'hlo'){
        //   sendMessage(from, "Hi there! 👋 How can I assist you today?\n1. Sales\n2. Jobs");
        // }else if(msgBody === "1" || msgBody === "sales"){
        //   sendMessage(from, "Great! To get started, could you please share your name?");
        // }else if(msgBody){
        //   name = msgBody;
        //   sendMessage(from, `Thank you, ${name}! 😊 Could you also provide your email address?`);
        // }else if(msgBody){
        //   email = msgBody;
        //   sendMessage(from, "Got it! And your phone number, please?");
        // }else if(msgBody){
        //   number = msgBody;
        //   sendMessage(from,  "Lastly, could you briefly describe the job requirements or details you’re looking to discuss?");
        // }else if(msgBody === "2" || msgBody === "jobs"){
        //   sendMessage(from, "Great! Could you tell me which position you’d like to apply for?\n1. Frontend Developer\n2. Backend Developer\n3. Full Stack Developer\n4. Software Tester.");
        // }else if(msgBody){
        //   sendMessage(from, "Fantastic! Could you share how many years of experience you have in this field?");
        // }else if(msgBody){
        //   sendMessage(from, "Thank you! What is your current CTC?");
        // }else if(msgBody){
        //   sendMessage(from,  "And your expected CTC?");
        // }else if(msgBody){
        //   sendMessage(from,  "Please upload your resume here.");
        // }else if(msgBody){
        //   sendMessage(from,  "Thanks for all the details! One of our team members will reach out shortly.");
        // }else{
        //   sendMessage(from,  "Something went wrong");
        // }
        switch (true) {
          case (msgBody === 'hi' || msgBody === 'hii' || msgBody === 'hey' || msgBody === 'helo' || msgBody === 'hello' || msgBody === 'hlo'):
            sendMessage(from, "Hi there! 👋 How can I assist you today?\n1. Sales\n2. Jobs");
            break;
        
          case (msgBody === "1" || msgBody.toLowerCase() === "sales"):
            sendMessage(from, "Great! To get started, could you please share your name?");
            break;
        
          case (msgBody === "2" || msgBody.toLowerCase() === "jobs"):
            sendMessage(from, "Great! Could you tell me which position you’d like to apply for?\n1. Frontend Developer\n2. Backend Developer\n3. Full Stack Developer\n4. Software Tester.");
            break;
        
          case !!name === false:  // assuming 'name' is undefined initially, check if it's empty
            name = msgBody;
            sendMessage(from, `Thank you, ${name}! 😊 Could you also provide your email address?`);
            break;
        
          case !!email === false:  // assuming 'email' is undefined initially
            email = msgBody;
            sendMessage(from, "Got it! And your phone number, please?");
            break;
        
          case !!number === false:  // assuming 'number' is undefined initially
            number = msgBody;
            sendMessage(from, "Lastly, could you briefly describe the job requirements or details you’re looking to discuss?");
            break;
        
          case !!experience === false:  // assuming 'experience' is undefined initially for job application
            sendMessage(from, "Fantastic! Could you share how many years of experience you have in this field?");
            experience = msgBody;
            break;
        
          case !!ctc === false:  // assuming 'ctc' is undefined initially
            sendMessage(from, "Thank you! What is your current CTC?");
            ctc = msgBody;
            break;
        
          case !!expectedCtc === false:  // assuming 'expectedCtc' is undefined initially
            sendMessage(from, "And your expected CTC?");
            expectedCtc = msgBody;
            break;
        
          case !!resumeUploaded === false:  // assuming 'resumeUploaded' is undefined initially
            sendMessage(from, "Please upload your resume here.");
            resumeUploaded = true;
            break;
        
          case resumeUploaded:
            sendMessage(from, "Thanks for all the details! One of our team members will reach out shortly.");
            break;
        
          default:
            sendMessage(from, "Something went wrong");
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
        
        
        // sendMessage(from, getResponse(msgBody));
        
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
 