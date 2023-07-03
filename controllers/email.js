const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "yisheij1@gmail.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    };


module.exports = {
    transporter,
    mailOptions
}
