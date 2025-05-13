import { app } from "@/server";
import express from 'express';;

const nodemailer = require('nodemailer');

export const sendMailRouter = express.Router();


// Create a transporter using Mailtrap credentials
var transport = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: "api",
      pass: "0f30456137376169a161f27ef270d7e3"
    }
  });

// Create a function to send emails
const sendEmail = async (options: { to: any; subject: any; text: any; html: any; }) => {
  try {
    // Define email options
    const mailOptions = {
      from: 'wayay85860@neuraxo.com',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html // Optional: for HTML emails
    };

    // Send the email
    const info = await transport.sendMail(mailOptions);
    console.log('Email sent: ', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

// Example API endpoint using Express
sendMailRouter.post('/api/send-email', async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;
    
    await sendEmail({
      to,
      subject,
      text,
      html
    });

    return res.status(200).json({ message: 'Email sent successfully' });
    
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
});
