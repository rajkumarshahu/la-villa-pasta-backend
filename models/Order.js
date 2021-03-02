const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    total: {
        type: Number,
    },
    quantity:  {
      type: Number,
      trim: true,
      default: 1
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
    default: 'pickup'
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    item: {
      type: mongoose.Schema.ObjectId,
      ref: 'Item',
      required: true
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);


// Static method to get cashback
OrderSchema.statics.getCashback = async function(userId) {
  console.log('Calculating cashback ....'.blue)
    const obj = await this.aggregate([
      {
        $match: { user: userId }
      },
      {
        $group: {
          _id: '$user',
          cashBackAmount: {$sum: { $divide: [ '$total', 50] }}
        }
      }
    ]);

    console.log(obj)

    try {
      await this.model('User').findByIdAndUpdate(userId, {
        cashBackAmount: (obj[0].cashBackAmount).toFixed(2)
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