const mongoose = require('mongoose');

const UserBillingSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    address: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserBilling', UserBillingSchema);