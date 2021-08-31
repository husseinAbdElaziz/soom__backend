import { Router } from 'express';

const router = Router();
//user APIs route
import user from './user/user.routes';

router.use('/user', user);

// product routes
import product from './product/product.routes';

router.use('/product', product);

const timezoneDeff = -180 * 60000;
router.get('/time', (req, res) =>
  res.json({ time: new Date(Date.now() - timezoneDeff) })
);

export default router;
