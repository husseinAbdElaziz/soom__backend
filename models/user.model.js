const bcryptjs = require('bcryptjs');
const { Schema, model } = require('mongoose');

const jwt = require('jsonwebtoken');

const { jwtAuthKey } = require('../config/config');

const AppError = require('../utils/appError');

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
    gander: { type: String, enum: ['male', 'female'] },
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
    lastfailureLogin: Date,
  },
  { timestamps: true }
);

/**
 * @description handle mongoose validation Errors
 */
userSchema.post('save', function (err, doc, next) {
  // to return custom error message instead of mongo error message
  if (
    err.message.includes(
      'User validation failed: username: Path `username` is invalid'
    )
  ) {
    return next(new AppError('usernameInvalid'));
  }

  // dublicated Email && username
  if (err.name === 'MongoError' && err.code === 11000) {
    // change message based error name
    let msg;
    if (err?.message?.includes('email')) {
      msg = 'mailUsed';
    } else if (err?.message?.includes('username')) {
      msg = 'usernameUsed';
    }

    return next(new AppError(msg));
  } else {
    next(error);
  }
});

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
userSchema.methods.generateToken = function (remaberUser) {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
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
userSchema.methods.validatePassword = async function (password) {
  return await bcryptjs.compare(password.toString(), this.password);
};

/**
 * generate hashed password using bcrypt library
 **/
userSchema.methods.generatePassword = async function (password) {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password.toString(), salt);
};

module.exports = model('user', userSchema);
