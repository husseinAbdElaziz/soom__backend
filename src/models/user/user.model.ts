import bcryptjs from 'bcryptjs';
import { Schema, model } from 'mongoose';

import jwt from 'jsonwebtoken';

import { config } from '../../config/config';

import { AppError } from '../../utils/appError';

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: { type: String, required: true },
    username: { type: String, unique: true, lowercase: true },
    displayName: String,
    country: String,
    city: String,
    phone: String,
    language: String,
    gender: { type: String, enum: ['male', 'female'] },
    photo: String,
    facebook: String,
    twitter: String,
    instagram: String,
    bio: String,
    avatarNo: Number,
    role: Number,
    isMailVerified: Boolean,
    currentBalance: Number,
    salesBalance: Number,
    packageName: String,
    passwordAttemptsLeft: Number,
    lastLogin: Date,
    lastFailureLogin: Date,
  },
  { timestamps: true }
);

/**
 * @description handle mongoose validation Errors
 */
// userSchema.post(/save/, function (err: ErrorEvent , doc, next) {
//   // to return custom error message instead of mongo error message
//   if (
//     err.message.includes(
//       'User validation failed: username: Path `username` is invalid'
//     )
//   ) {
//     return next(new AppError('usernameInvalid'));
//   }

//   // dublicated Email && username
//   if (err.name === 'MongoError' && err.code === 11000) {
//     // change message based error name
//     let msg;
//     if (err?.message?.includes('email')) {
//       msg = 'mailUsed';
//     } else if (err?.message?.includes('username')) {
//       msg = 'usernameUsed';
//     }

//     return next(new AppError(msg));
//   } else {
//     next(err);
//   }
// });

/**
 * add temp user name
 */
userSchema.pre('save', function (this: any, next) {
  if (!this.username) {
    this.username = this.email?.toLowerCase()?.replace(/[\W+\.~]/g, '_');
  }
  next();
});

/**
 * remove user name spaces
 */
userSchema.pre('findOneAndUpdate', function (this: any, next) {
  console.log(this._update.username);
  if (this._update.username) {
    this._update.username = this._update.username
      .toLowerCase()
      .replace(/\s/g, '');
  }
  next();
});

/**
 * @description generate jwt token
 */
userSchema.methods.generateToken = function (this: any, remaberUser) {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    config.jwtAuthKey!,
    {
      expiresIn: remaberUser ? '30d' : '15d',
    }
  );
  return token;
};

/**
 * validate password when user try to login
 */
userSchema.methods.validatePassword = async function (this: any, password) {
  return await bcryptjs.compare(password.toString(), this.password);
};

/**
 * generate hashed password using bcrypt library
 **/
userSchema.methods.generatePassword = async function (password) {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password.toString(), salt);
};

export default model('user', userSchema);
