require("dotenv").config();
const accountSid = process.env.SMS_SID;
const authToken = process.env.SMS_TOKEN;
const client = require("twilio")(accountSid, authToken);

async function sendsms() {
  client.messages
    .create({
      body: "Helllo from twilio",
      from: "+18886123645",
      to: "+18452138960",
    })
    .then((message) => console.log(message.sid));
}

module.exports = sendsms;
