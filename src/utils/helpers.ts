import { sign } from 'jsonwebtoken';
import { sendMail } from './mailer';

import mongoose, { ObjectId } from 'mongoose';

import { config } from '../config/config';

/**
 * @description generate ObjectId
 * @param id {string}
 * @returns ObjectId
 */
export const generateObjectId: any = (id: string | any) => mongoose.Types.ObjectId(id);

/**
 * @description send activation message with link to user mail
 */
export const sendMailActivationToken = (token: string, userEmail: string) => {
  sendMail(
    `please active your mail from <a href="${config?.siteUrl}/active-mail/${token}">this link</a>`,
    'Mail Activation',
    userEmail
  );
};

/**
 * @description generate token for mail activation
 * @param _id user id
 * @returns JWT token
 */
export const generateMailToken = (_id: ObjectId) => {
  const token = sign(
    {
      _id,
      type: 'activeMail',
    },
    config?.jwtMailActivationKey!,
    {
      expiresIn: '2 days',
    }
  );
  return token;
};
