const Routes = require("express").Router();
const { hendelOtp, varifyOtp } = require("../controllers/otp");
const { transporter, mailOptions } = require("../controllers/email");

// Routes.get("/pass", async (req, res, next) => {
//     try {
//         transporter.sendMail(mailOptions, function (error, info) {
//             if (error) {
//                 console.log(error);
//                 res.sendStatus(500);
//             } else {
//                 console.log("Email sent: " + info.response);
//                 res.sendStatus(200);
//             }
//         }
//         );
//     } catch (e) {
//         console.error(e);
//         res.sendStatus(500);

//     }
// });

Routes.post("/pass", async (req, res, next) => {
  const { email } = req.body;
  try {
    const otp = await hendelOtp(email);
    res.status(200).json({ otp });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

Routes.post("/verify", async (req, res, next) => {
  const { userId, otp } = req.body;
  try {
    const result = await varifyOtp(userId, otp);
    res.status(200).json({ result });
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = Routes;
