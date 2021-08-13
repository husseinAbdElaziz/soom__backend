const { catchAsync } = require('../utils/catchAsync');
const UserModel = require('../models/user.model');

const AppError = require('../utils/appError');
const { itemsToDeleteFromUserData } = require('../utils/global');

/**
 * @description create user account
 */
exports.userRegister = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const newUser = new UserModel(userData);

  // generate hashed password
  newUser.password = await newUser.generatePassword(req.body.password);

  // save user data to database
  const userSavedData = await newUser.save();
  //
  // send Email to user to activate mail
  //   sendMailActivationToken(userUpdatedData.verifyToken, userUpdatedData.email);

  // send success message if success
  res.json({
    status: 'success',
    message: 'registeredSuccess',
  });
});

/**
 * @description user login
 */
exports.userLogin = catchAsync(async (req, res, next) => {
  // get nedded data from req body
  const { email: userBodyEmail, password, remeberMe } = req.body;

  // search in database to find if user exists and get user data
  const userData = await UserModel.findOne({ email: userBodyEmail });

  // check if user is exists
  if (!userData) return next(new AppError('errorMailOrPassword', 401));

  // compare database password with user provided password
  const isPasswordValid = await userData.validatePassword(password);

  // return error if password invalid
  if (!isPasswordValid) return next(new AppError('errorMailOrPassword', 401));

  // delete password
  delete userData?._doc?.password;

  // return token if user and password is valid
  res.status(200).send({
    status: 'success',
    data: {
      ...userData?._doc,
      token: userData.generateToken(remeberMe),
    },
  });
});

/**
 * @description
 */
exports.userUpdate = catchAsync(async (req, res, next) => {
  const userData = req.body;

  const userId = req.user._id;

  // delete un wanted data from user sent data
  itemsToDeleteFromUserData.forEach((item) => {
    delete userData[item];
  });

  const updatedUserData = await UserModel.findOneAndUpdate(
    {
      _id: userId,
    },
    userData
  ).select('-password');

  res.json({
    status: 'success',
    data: updatedUserData,
  });
});
