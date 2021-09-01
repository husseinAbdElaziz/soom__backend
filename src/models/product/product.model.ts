import { Schema, model } from 'mongoose';

const imageSchema = new Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
});

const productSchema: Schema = new Schema(
  {
    ownerId: { type: String, ref: 'user', required: true },
    name: String,
    country: String,
    city: String,
    district: String,
    category: String,
    video: String,
    images: [imageSchema],
    description: String,
    isDeal: { type: Boolean, default: false },
    classification: { type: String, enum: ['sale', 'rent'], default: 'sale' },
    dealStartDate: Date,
    dealEndDate: Date,
    areaInSquarMeters: Number,
    streets: Number,
    apartments: Number,
    age: Number,
    rooms: Number,
    portableHeight: Number,
    portableType: String,
    model: Number,
    poetryTent: Boolean,
    wells: String,
    trees: String,
    bedRooms: Number,
    livingRooms: Number,
    bathrooms: Number,
    halls: Number,
    boards: Number,
    maidRoom: Boolean,
    kitchens: Number,
    furnished: Boolean,
    tiers: Number,
    carEntrance: Boolean,
    aircondition: Boolean,
    elevator: Boolean,
    realEstateType: String,
    swimmingPool: Boolean,
    footballCourt: Boolean,
    volleyballCourt: Boolean,
    childrenGames: Boolean,
    familiesSection: Boolean,
    outdoor: Boolean,
    basement: Boolean,
    driverRoom: Boolean,
    stairs: Boolean,
    guestRooms: Number,
    salePriceLimit: Number,
    initialPrice: Number,
    lastBidId: { type: Schema.Types.ObjectId, ref: 'transactions' },
    isSoldOut: Boolean,

    // 0 not started , 1 active, 2 timeOut, 3 sold, 4 rejected
    dealStatus: { type: Number, enum: [0, 1, 2, 3, 4] },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// owner data virtual field
productSchema.virtual('owner', {
  ref: 'user',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true,
});

export default model('product', productSchema);
