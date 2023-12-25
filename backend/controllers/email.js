var nodemailer = require('nodemailer');
require('dotenv').config()

var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });


module.exports.sendEmail = (to, subject, text, html) => {
    var mailOptions  = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
      };
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions).then((response) => {
            resolve()
        }).catch((error) => {
            console.log("Error:", error.response);
            reject("Error while sending email");
        })
    })
}