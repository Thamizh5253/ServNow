// nodemailer.js

const nodemailer = require("nodemailer");
require('dotenv').config();
const pass_key = process.env.Auth_Pass ;
// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "thamizhmass057@gmail.com",
    pass: pass_key,
  },
});

// Function to send email
async function sendEmail(recipient, subject, message) {
  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: "Rolex thamizhmass057@gmail.com",
      to: recipient,
      subject: subject,
      text: message,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendEmail;
