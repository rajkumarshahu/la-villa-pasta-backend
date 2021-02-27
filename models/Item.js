const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [50, 'title can not be more than 50 character'],
    },
    description: {
        type: String,
        trim: true,
    },
    unitPrice: {
        type: Number,
        trim: true,
    },
    type: { // Salad, drink, dessert
        type: String,
        enum: ['pasta', 'sauce', 'topping', 'salad', 'drink', 'dessert', 'combo'],
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    order: {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
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

// Static method to get total
// ItemSchema.statics.getTotal = async function() {
//     try {
//         await this.model('Order').findOneAndUpdate(total, {
//             $set:{total: this.quantity * this.unitPrice}
//         }, {new: true},);
//       } catch (err) {
//         console.error(err);
//       }

// }

// Call getTotal after save
// ItemSchema.post('save', function() {
//     this.constructor.getTotal()
// })

// Call getTotal before save
// ItemSchema.pre('remove', function() {
//     this.constructor.getTotal()
// })

// Reverse populate with virtuals
ItemSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'item',
    justOne: false
  });

module.exports = mongoose.model('Item', ItemSchema);