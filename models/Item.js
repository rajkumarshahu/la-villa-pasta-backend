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
        enum: ['pasta', 'sauce', 'topping', 'salad', 'drink', 'dessert'],
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
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

module.exports = mongoose.model('Item', ItemSchema, 'item');