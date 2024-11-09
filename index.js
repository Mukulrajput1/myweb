const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require('dotenv').config();

// const token = process.env.TOKEN;       // Access token for WhatsApp API
// const myToken = process.env.MYTOKEN;   // Verification token for webhook
// const phoneNumberId = process.env.PHONE_NUMBER_ID; // WhatsApp phone number ID
const token = 'EAAUXn7ZAmXu0BO3qOGyWLQ5UX8rILmJXYS5mzqHWFuRaqXBJDZB4yZBmJtER6KdBtf0hOdkOYNZBqHhPz4xnWNXcXAEotd42OviHokeUIiEaJG9cUIdh8oqiilwfkoIs3zHnPk2CUqnjdD9tR9ceLntF1nQ4vVrIsJmOmcyITGPU9sepAv63PlI00Bz8ZC5xiX8ZCMTrL04o3ziOpGgZCrZBn0HA9FXVmPgZC8Rn0';       // Access token for WhatsApp API
const myToken = 'my_custom_token';   // Verification token for webhook
const phoneNumberId = '460908993776402'; // WhatsApp phone number ID

const app = express().use(bodyParser.json());

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const challenge = req.query["hub.challenge"];
  const verifyToken = req.query["hub.verify_token"];

  if (mode && verifyToken) {
    if (mode === "subscribe" && verifyToken === myToken) {
      console.log("Webhook verified");
      return res.status(200).send(challenge); // Ensure return to stop further execution
    } else {
      return res.status(403).send("Forbidden"); // Ensure return to stop further execution
    }
  }

  return res.sendStatus(404); // If none of the conditions matched
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

        // Automatically respond to the incoming message
        sendMessage(from, "Hello! This is an automated response from our WhatsApp bot.");
      }
    });

    return res.status(200).send("EVENT_RECEIVED"); // Ensure return to stop further execution
  } else {
    return res.sendStatus(404); // If the body does not contain the expected object
  }
});

// Function to send a WhatsApp message
function sendMessage(to, messageText) {
  axios({
    method: "POST",
    url: `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    data: {
      messaging_product: "whatsapp",
      to: to,
      text: { body: messageText }
    }
  }).then(response => {
    console.log("Message sent:", response.data);
  }).catch(error => {
    console.error("Error sending message:", error.response ? error.response.data : error.message);
  });
}

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Webhook server is listening on port ${PORT}`);
});
