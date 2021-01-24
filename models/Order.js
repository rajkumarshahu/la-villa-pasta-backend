const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    total: {
        type: Number
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    isAccepted: {
        type: Boolean,
        default: false,
    },
    orderStatus: {
        type: String,
		enum: ['submitted', 'in process', 'ready', 'on delivery', 'delivered'],
		default: 'submitted',
    }
});

module.exports = mongoose.model('Order', OrderSchema);