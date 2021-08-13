/**
 * main APIs module
 * to handle all APIs logic
 */

import { Router } from 'express';

const router = Router();

//user APIs route
import user from './user/user.routes.js';
router.use('/user', user);

export default router;
