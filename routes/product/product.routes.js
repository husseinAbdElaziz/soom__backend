const product = require('../../controllers/product/product.controller');
const { verifyToken } = require('../../middlewares/verifyToken');

const router = require('express').Router();
const { multerOptions } = require('../../utils/multer-options');

// product routes
router.route('/').post(verifyToken, product.addProduct);

// upload user image route
router.post(
  '/add-images',
  verifyToken,
  multerOptions().array('image', 5),
  product.addProductImages
);

module.exports = router;
