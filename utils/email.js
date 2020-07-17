const nodemailer = require("nodemailer");
const path = require("path");
global.appRoot = path.resolve(__dirname);

const config = require(path.join(global.appRoot, "../config.js"));

var transporter = nodemailer.createTransport({
  service: config.App.nodeMailer.host, // hostname
  secureConnection: config.App.nodeMailer.secureConnection, // TLS requires secureConnection to be false
  port: config.App.nodeMailer.port, // port for secure SMTP
  tls: {
    // ciphers: config.App.nodeMailer.ciphers,
    rejectUnauthorized: config.App.nodeMailer.rejectUnauthorized,
  },
  auth: {
    user: config.App.nodeMailer.user,
    pass: config.App.nodeMailer.pass,
  },
});

module.exports = async (options) => {
  var mailOptions = {
    from: config.App.nodeMailer.from,
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:
  };
  // send mail
  let sendEmail = await transporter.sendMail(mailOptions);
};
