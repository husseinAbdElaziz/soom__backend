import { Router } from 'express';
const router = Router();

import * as user from '../../controllers/user/user.controller';

import { verifyToken } from '../../middlewares/verifyToken';
import { multerOptions } from '../../utils/multer-options';

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

export default router;
