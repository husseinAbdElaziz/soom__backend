const router = require('express').Router();
const {
  userRegister,
  userLogin,
  userUpdate,
} = require('../../controllers/user.controller');

const { verifyToken } = require('../../middlewares/verifyToken');

// user create && update
router.route('/').post(userRegister).put(verifyToken, userUpdate);

// user login
router.post('/login', userLogin);

module.exports = router;
