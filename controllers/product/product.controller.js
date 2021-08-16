const mongoose = require('mongoose');

const { catchAsync } = require('../../utils/catchAsync');

const ProductModel = require('../../models/product/product.model');
const { itemsToDeleteFromProduct } = require('../../utils/global');

const AppError = require('../../utils/appError');

/**
 * @description add new product
 */
exports.addProduct = catchAsync(async (req, res, next) => {
  const ownerId = req.user._id;

  const bodyData = req.body;

  itemsToDeleteFromProduct.forEach((item) => {
    delete bodyData[item];
  });

  const newProduct = new ProductModel({ ...bodyData, ownerId });

  const product = await newProduct.save();

  console.log(product);

  res.json({ status: 'success', message: 'productAdded', data: product });
});

/**
 * @description add images to product
 */
exports.addProductImages = catchAsync(async (req, res, next) => {
  // get product && owner id
  const ownerId = req.user._id;
  const _id = req.body.productId;

  if (!mongoose.isValidObjectId(_id)) return next(new AppError('idError'));

  // set images object
  const images = req.files.map((image) => ({
    path: image.path,
    size: image.size,
  }));

  // update images in product data
  const product = await ProductModel.findOneAndUpdate(
    {
      _id,
      ownerId,
    },
    {
      images,
    },
    {
      new: true,
    }
  );

  if (!product) return next(new AppError('notAdded'));

  res.json({ status: 'success', data: product });
});
