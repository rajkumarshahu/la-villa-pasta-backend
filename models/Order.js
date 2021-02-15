const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    total: {
        type: Number
    },
    isPaidUsingCashBack: {
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
    },
    orderType: {
        type: String,
		enum: ['pickup', 'delivery'],
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
}
);


// Static method to get cashback
OrderSchema.statics.getCashback = async function(userId) {
    const obj = await this.aggregate([
      {
        $match: { user: userId }
      },
      {
        $group: {
          _id: '$user',
          cashBackAmount: { $sum: '$total' }
        }
      }
    ]);

    try {
      await this.model('User').findByIdAndUpdate(userId, {
        cashBackAmount: cashBackAmount + totalOrder * 0.02
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Call getCashback after save
  OrderSchema.post('save', function() {
    this.constructor.getCashback(this.user);
  });

  // Call getCashback before remove
  OrderSchema.pre('remove', function() {
    this.constructor.getCashback(this.user);
  });

module.exports = mongoose.model('Order', OrderSchema);