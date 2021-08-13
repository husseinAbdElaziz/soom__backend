import { compare, genSalt, hash } from 'bcryptjs';
import { model, Schema } from 'mongoose';
import { jwtAuthKey } from '../config/config.js';

import { sign } from 'jsonwebtoken';

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
    username: String,
    country: String,
    city: String,
    phone: String,
    language: String,
    gander: { type: String, enum: ['male', 'female'] },
    photo: String,
    avatarNo: Number,
    facebook: String,
    twitter: String,
    instagram: String,
    bio: String,
    role: Number,
    isMailVerified: Boolean,
    currentBalance: Number,
    salesBalance: Number,
    packageName: String,
    passwordAttemptsLeft: Number,
    lastLogin: Date,
    lastfailureLogin: Date,
  },
  { timestamps: true }
);

/**
 * add temp user name
 */
userSchema.pre('save', function (next) {
  if (!this.username) {
    this.username = this.email?.replace('@', '_')?.replace('.', '_');
  }
  next();
});

/**
 * remove user name spaces
 */
userSchema.pre('findOneAndUpdate', function (next) {
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
userSchema.methods.generateToken = function (doc, remaberUser) {
  const token = sign(
    {
      _id: doc._id,
      username: doc.username,
      email: doc.email,
    },
    jwtAuthKey,
    {
      expiresIn: remaberUser ? '30d' : '15d',
    }
  );
  return token;
};

/**
 * validate password when user try to login
 */
userSchema.methods.validatePassword = async function (doc, password) {
  return await compare(password.toString(), doc.password);
};

/**
 * generate hashed password using bcrypt library
 **/
userSchema.methods.generatePassword = async function (password) {
  const salt = await genSalt(10);
  return await hash(password.toString(), salt);
};

export default model('user', userSchema);