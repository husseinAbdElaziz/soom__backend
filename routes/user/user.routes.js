const router = require('express').Router();
const user = require('../../controllers/user/user.controller');

const { verifyToken } = require('../../middlewares/verifyToken');
const { multerOptions } = require('../../utils/multer-options');

// user create && update
router.route('/').post(user.userRegister).put(verifyToken, user.userUpdate);

// user login
router.post('/login', user.userLogin);

// upload user image route
router.post(
  '/update-image',
  verifyToken,
  multerOptions({ isUserImage: true }).single('avatar'),
  user.updateUserImage
);

module.exports = router;
