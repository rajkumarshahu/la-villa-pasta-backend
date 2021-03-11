const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const BillingSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
        required: true
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
    // GeoJSON Point
    type: {
        type: String,
        enum: ['Point']
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);


// Geocode & create location field
BillingSchema.pre('save', async function(next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
      type: 'Point',
      coordinates: [loc[0].longitude, loc[0].latitude],
      formattedAddress: loc[0].formattedAddress,
      streetName: loc[0].streetName,
      city: loc[0].city,
      province: loc[0].stateCode,
      postalCode: loc[0].zipcode,
      country: loc[0].countryCode
    };

    // Do not save address in DB
    this.address = undefined;
    next();
  });

  module.exports = mongoose.model('Billing', BillingSchema);