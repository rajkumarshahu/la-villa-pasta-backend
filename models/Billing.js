const mongoose = require('mongoose');

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
		streetNumber: { type: Number },
		streetName: { type: String },
		apartmentNumber: { type: Number },
		city: { type: String },
		province: { type: String },
		postalCode: { type: String }
	},
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Billing', BillingSchema);