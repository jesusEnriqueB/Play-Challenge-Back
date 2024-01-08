const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

async function sendEmail(email, subject, content) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: email,
    subject: subject,
    html: content,
  };

  await transporter.sendMail(mailOptions);
}

async function sendResetPasswordEmail(email, token) {
  const templateFile = path.join(__dirname, "templates", "reset-password.hbs");
  const templateSource = fs.readFileSync(templateFile, "utf-8");
  const template = handlebars.compile(templateSource);

  const context = {
    reset_link: `${process.env.URL_RESET_PASSWORD}?token=${token}`,
  };
  const htmlContent = template(context);
  sendEmail(email, "Reset Password", htmlContent);
}

module.exports = {
  sendResetPasswordEmail,
};
