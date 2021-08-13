const { sign } = require('jsonwebtoken');
const { sendMail } = require('./mailer');

const mongoose = require('mongoose');

const { siteUrl, jwtMailActivation } = require('../config/config');

/**
 * @description generate ObjectId
 * @param id {string}
 * @returns ObjectId
 */
exports.generateObjectId = (id) => mongoose.Types.ObjectId(id);

/**
 * @description send activation message with link to user mail
 */
exports.sendMailActivationToken = (token, userEmail) => {
  sendMail(
    `please active your mail from <a href="${siteUrl}/active-mail/${token}">this link</a>`,
    'Mail Activation',
    userEmail
  );
};

/**
 * @description generate token for mail activation
 * @param _id user id
 * @returns JWT token
 */
exports.generateMailToken = (_id) => {
  const token = sign(
    {
      _id,
      type: 'activeMail',
    },
    jwtMailActivation,
    {
      expiresIn: '2 days',
    }
  );
  return token;
};
