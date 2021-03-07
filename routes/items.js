const express = require('express');
const {
	getItems,
	getItem,
	createItem,
	updateItem,
    deleteItem,
    itemPhotoUpload
} = require('../controllers/items');


const Item = require('../models/Item');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');


router.route('/:id/photo').put(protect, authorize('admin'), itemPhotoUpload);

router
    .route('/')
    .get(advancedResults(Item, 'orders'), getItems)
    .post(
       protect, authorize('admin'), createItem)

router
    .route('/:id')
    .get(getItem)
    .put(protect, authorize('admin'), updateItem)
    .delete(protect, authorize('admin'), deleteItem);

module.exports = router;