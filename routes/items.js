const express = require('express');
const {
	getItems,
	getItem,
	createItem,
	updateItem,
    deleteItem,
    itemPhotoUpload
} = require('../controllers/items');


const Item = require('../models/Item')

const router = express.Router();

const advancedResults = require('../middleware/advancedResults');

// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
//router.use('/:patientId/records', recordRouter);

router.route('/:id/photo').put(protect, authorize('admin'), itemPhotoUpload);

router
    .route('/')
    .get(advancedResults(Item, ''), getItems)
    .post(
       protect, authorize('admin'),
        createItem)

router
    .route('/:id')
    .get(getItem)
    .put(protect, authorize('admin'), updateItem)
    .delete(protect, authorize('admin'), deleteItem);

module.exports = router;