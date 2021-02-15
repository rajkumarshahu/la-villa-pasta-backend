const mongoose = require('mongoose');

const ComboSchema = new mongoose.Schema({
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
    itemType:  { // Salad, drink, dessert
        type: String,
        enum: ['pasta', 'sauce', 'topping', 'salad', 'drink', 'dessert'],
    },
    image: {
        type: String,
        default: 'no-photo.jpg'
    },
    isActive: {
        type: Boolean,
        default: 'true'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Combo', ComboSchema);