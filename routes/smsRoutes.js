const Routes = require("express").Router();
const Controllers = require("../controllers/queryControllers");
const { MessagingResponse } = require("twilio").twiml;

Routes.post("/", async (req, res) => {
  let msgFrom = req.body.From;
  let msgBody = req.body.Body;
  const user = 1;
  const date = new Date();
  const rate = 10;
  const Source = "sms";
  if (msgBody === "In") {
    const res = await Controllers.newTimeIn(user, date, date, rate, Source);
    console.log(res);
  } else if (msgBody === "Out") {
    const letstRecord = await Controllers.getLastRecord(user, "Id");
    const id = await letstRecord.Id;
    const res = await Controllers.TimeOut(id, new Date(), Source);

    console.log(res);
  }

  res.send(
    `<Response>
        <Message>
            Hello ${msgFrom}, you said: ${msgBody}
        </Message>
    </Response>`
  );
});
module.exports = Routes;
