'use strict';
import nodemailer from 'nodemailer';
import { Environment } from './environment';

interface Options {
  to: string;
  subject: string;
  html: string;
}

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail({ to, subject, html }: Options) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'sumit27star@gmail.com', // generated ethereal user
      pass: Environment.gmailPassword // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Lireddit 👻" <sumit27star@gmail.com>', // sender address
    to,
    subject,
    html
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

// main().catch(console.error);
