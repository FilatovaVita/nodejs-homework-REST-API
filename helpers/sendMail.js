const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const sendMail = async (data) => {
  const email = { ...data, from: SENDGRID_EMAIL };
  await sgMail.send(email);
  return true;
};
module.exports = sendMail;
