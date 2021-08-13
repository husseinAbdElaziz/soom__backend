const { verify } = require('jsonwebtoken');

const { jwtAuthKey } = require('../config/config');

const { AppError } = require('../utils/appError');

/**
 * @description middleware to verify JWT token from authorization header.
 * 1- check if token sent from client
 * 2- validate token
 * 3- add user data to req object
 */
module.exports.verifyToken = (req, res, next) => {
  // unAuthorized res error
  const unAuthError = new AppError('unAuthorized', 401);

  // check if authorization header is sent from client
  if (!req.headers.authorization) return next(unAuthError);

  // get token from header
  let token = req.headers.authorization.split(' ')[1];

  // if no token send error message
  if (token === 'null') return next(unAuthError);

  try {
    // vlidate token
    let payload = verify(token, jwtAuthKey);

    // send error message if token invalid
    if (!payload) return next(unAuthError);

    // add user token data to request object
    req.user = payload;

    next();
  } catch (e) {
    next(new AppError('invalidToken', 401));
  }
};
