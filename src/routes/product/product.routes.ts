import { Router } from 'express';
const router = Router();

import * as product from '../../controllers/product/product.controller';
import { verifyToken } from '../../middlewares/verifyToken';

import { multerOptions } from '../../utils/multer-options';

// product routes
router
  .route('/')
  .get(product.searchInProducts)
  .post(verifyToken, product.addProduct)
  .put(verifyToken, product.updateProduct);

// upload user image route
router.post(
  '/add-images',
  verifyToken,
  multerOptions().array('image', 5),
  product.addProductImages
);

export default router;
