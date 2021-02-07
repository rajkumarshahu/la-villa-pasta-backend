const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    total: {
        type: Number
    },
    // isPaidUsingCashBack: {
    //     type: Boolean,
    //     default: false
    // },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    orderStatus: {
        type: String,
		enum: ['submitted', 'in process', 'ready', 'on delivery', 'delivered'],
		default: 'submitted',
    },
    orderType: {
        type: String,
		enum: ['pickup', 'delivery'],
    },
});

module.exports = mongoose.model('Order', OrderSchema);