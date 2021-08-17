const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
  path: String,
  size: Number,
});

const productSchema = new Schema(
  {
    ownerId: String,
    name: String,
    country: String,
    city: String,
    district: String,
    category: String,
    video: String,
    images: [imageSchema],
    description: String,
    isDeal: { type: Boolean, default: false },
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
    haveMaidroom: Boolean,
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

module.exports = model('product', productSchema);
