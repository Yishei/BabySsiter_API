const accountSid = "AC91a67611a548dfad34396ff05fa25f33";
  const authToken = "bb854bf64dcd4a7ab141b4f531146cf3";
  const client = require("twilio")(accountSid, authToken);

async function sendsms() {
  client.messages
    .create({
      body: "Helllo from twilio", from: "+18886123645", to: "+18452138960"
    })
    .then((message) => console.log(message.sid));
}


module.exports = sendsms;




