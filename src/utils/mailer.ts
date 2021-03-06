import nodemailer from 'nodemailer';

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

/**
 * @description send Email message to user
 * @param html mail template
 * @param subject message subject
 * @param to user Email
 */
export const sendMail = (html: string, subject: string, to: string) => {

  var mail = {
    from: process.env.NODEMAILER_MAIL,
    to: to,
    subject: subject,
    html: html
  };

  transporter.sendMail(mail, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      //console.log(info);
    }
  });
};
