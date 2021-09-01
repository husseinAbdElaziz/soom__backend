import mongoose from 'mongoose';

import { catchAsync } from '../../utils/catchAsync';

import ProductModel from '../../models/product/product.model';
import { itemsToDeleteFromProduct } from '../../utils/global';

import { AppError } from '../../utils/appError';
import { NextFunction, Request, Response } from 'express';
import { ProductI, SearchQueryI } from '../../interfaces/product.interface';
import { generateObjectId } from '../../utils/helpers';
import { RESULT_STATUS } from '../../interfaces/data.interface';

/**
 * @description add new product
 */
export const addProduct = catchAsync(async (req: Request | any, res: Response, next: NextFunction) => {
  const ownerId = req.user._id;

  const bodyData = req.body;

  if (new Date(bodyData?.dealStartDate).getTime() > Date.now()) {
    bodyData.dealStatus = 1;
  } else {
    bodyData.dealStatus = 0;
  }

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


/**
 * @description search in products
 * @query searchQueryI 
 */
export const searchInProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  // get query as type ProductI
  let query = req.query as unknown as SearchQueryI;

  // assign ObjectId
  if (query._id) {
    query._id = generateObjectId(query._id);
  }
  if (query.ownerId) {
    query.ownerId = generateObjectId(query.ownerId);
  }

  // parse deal status as number
  if (query.dealStatus) {
    query.dealStatus = +query.dealStatus;
  }

  // update deal status
  await ProductModel.bulkWrite([
    {
      updateMany: {
        filter: {
          $and: [
            { dealStartDate: { $lte: Date.now() } },
            { dealEndDate: { $gte: Date.now() } },
          ]
        },
        update: { dealStatus: 1 },
      },
    },
    {
      updateMany: {
        filter: {
          dealEndDate: { $lt: Date.now() }
        },
        update: { dealStatus: 2 },
      },
    }
  ]);

  // create query
  const products = ProductModel.aggregate(
    [
      // search by query
      {
        $match: query
      },
      // set deal status based on time
      // {
      //   $set: {
      //     dealStatus: {
      //       $switch:
      //       {
      //         branches: [
      //           {
      //             case: { $lte: [new Date(), '$dealStartDate'] },
      //             then: 0
      //           },
      //           {
      //             case: {
      //               $and: [
      //                 { $lte: ['$dealStartDate', new Date()] },
      //                 { $lte: [new Date(), '$dealEndDate'] }
      //               ]
      //             },
      //             then: 1
      //           },
      //           {
      //             case: { $gte: [new Date(), '$dealEndDate'] },
      //             then: 2
      //           },
      //         ],
      //       }
      //     }
      //   }
      // },
      // get owner data
      {
        $lookup: {
          from: 'users',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'owner',
        },
      },
      // project data
      {
        $project: {
          'owner.username': 1,
          'owner.photo': 1,
          'owner.displayName': 1,
          'owner.country': 1,
          'owner.city': 1,
          ownerId: 1,
          name: 1,
          country: 1,
          city: 1,
          district: 1,
          category: 1,
          video: 1,
          images: 1,
          description: 1,
          isDeal: 1,
          classification: 1,
          dealStartDate: 1,
          dealEndDate: 1,
          areaInSquarMeters: 1,
          streets: 1,
          apartments: 1,
          age: 1,
          rooms: 1,
          portableHeight: 1,
          portableType: 1,
          model: 1,
          poetryTent: 1,
          wells: 1,
          trees: 1,
          bedRooms: 1,
          livingRooms: 1,
          bathrooms: 1,
          halls: 1,
          boards: 1,
          maidRoom: 1,
          kitchens: 1,
          furnished: 1,
          tiers: 1,
          carEntrance: 1,
          aircondition: 1,
          elevator: 1,
          realEstateType: 1,
          swimmingPool: 1,
          footballCourt: 1,
          volleyballCourt: 1,
          childrenGames: 1,
          familiesSection: 1,
          outdoor: 1,
          basement: 1,
          driverRoom: 1,
          stairs: 1,
          guestRooms: 1,
          salePriceLimit: 1,
          initialPrice: 1,
          lastBidId: 1,
          isSoldOut: 1,
          dealStatus: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

  // sort data
  products.sort({ createdAt: -1 });

  // pagination
  const page = query.page * 1 || 1;
  const limit = query.limit || 50;
  const skip = (page - 1) * limit;

  products.skip(skip).limit(limit);

  // get data
  const data = await products;

  // response
  res.json({ status: RESULT_STATUS.SUCCESS, data })

})