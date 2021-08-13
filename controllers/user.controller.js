const { catchAsync } = require('../utils/catchAsync');
const UserModel = require('../models/user.model');

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
    data: userSavedData,
  });
});
