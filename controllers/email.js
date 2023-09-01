const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailInfo = (email, otp) => {
  return {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "One Time Password",
    html: `<html>
    <head>
    <title>OTP Email</title>
    <style>
    body {
      font-family: sans-serif;
      font-size: 16px;
      background-color: #f5f5f5;
    }
    
    h1 {
      font-size: 24px;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    p {
      margin-bottom: 10px;
    }
    
    .otp-code {
      background-color: #00466a;
      color: #fff;
      padding: 10px;
      border-radius: 4px;
      font-size: 20px;
      font-weight: bold;
    }
    
    .email-container {
      width: 600px;
      margin: 50px auto;
    }
    </style>
    </head>
    <body>
    <div class="email-container">
    <h1>One-Time Password</h1>
    <p>Your one-time password is:</p>
    <p class="otp-code">${otp}</p>
    <p>This code will expire in 5 minutes.</p>
    <p>If you did not request this email, please ignore it.</p>
    </div>
    </body>
    </html>
    `
  };
};



module.exports = {
    transporter,
    emailInfo
}
