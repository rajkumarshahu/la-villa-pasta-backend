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
    // itemType: {
    //     type: mongoose.Schema.Type.ObjectId,
    //     ref: 'item'
    // },
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