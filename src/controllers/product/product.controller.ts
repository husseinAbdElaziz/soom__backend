import mongoose from 'mongoose';

import { catchAsync } from '../../utils/catchAsync';

import ProductModel from '../../models/product/product.model';
import { itemsToDeleteFromProduct } from '../../utils/global';

import { AppError } from '../../utils/appError';
import { NextFunction, Request, Response } from 'express';

/**
 * @description add new product
 */
export const addProduct = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const ownerId = req.user._id;

  const bodyData = req.body;

  itemsToDeleteFromProduct.forEach((item) => {
    delete bodyData[item];
  });

  const newProduct = new ProductModel({ ...bodyData, ownerId });

  const product = await newProduct.save();

  res.json({ status: 'success', message: 'productAdded', data: product });
});

/**
 * @description update product
 */
export const updateProduct = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const ownerId = req.user._id;

  const bodyData = req.body;

  itemsToDeleteFromProduct.forEach((item) => {
    delete bodyData[item];
  });

  const productdata = await ProductModel.findOneAndUpdate(
    {
      _id: bodyData._id,
      ownerId,
    },
    bodyData,
    { new: true }
  );

  res.json({ status: 'success', message: 'productAdded', data: productdata });
});

/**
 * @description get products
 */
export const getProducts = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const { productStatus } = req.query;

  let filterData = { ...req.query };
  delete filterData.productStatus;

  const currentTime = new Date().toISOString();

  if (productStatus === 'active') {
    filterData = {
      ...filterData,
      dealStartDate: { $lte: currentTime },
      dealEndDate: { $gte: currentTime },
    };
  }

  if (productStatus === 'upcoming') {
    filterData = {
      ...filterData,
      dealStartDate: { $gt: currentTime },
    };
  }

  if (productStatus === 'ended') {
    filterData = {
      ...filterData,
      dealEndDate: { $lt: currentTime },
    };
  }

  const products = await ProductModel.find(filterData).populate({
    path: 'owner',
    select: 'username displayName photo',
  });

  console.log(currentTime);

  res.json({ status: 'success', data: products });
});

/**
 * @description get single product
 */
export const getSingleProduct = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const { productId } = req.params;

  const products = await ProductModel.findOne({ _id: productId }).populate({
    path: 'owner',
    select: 'username displayName photo city country',
  });

  res.json({ status: 'success', data: products });
});

/**
 * @description add images to product
 */
export const addProductImages = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  // get product && owner id
  const ownerId = req.user._id;
  const _id = req.body.productId;

  if (!mongoose.isValidObjectId(_id)) return next(new AppError('idError'));

  // set images object
  const images = req.files.map((image: any) => ({
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
