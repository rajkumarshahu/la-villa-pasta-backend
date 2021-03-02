const express = require('express');
const {
	getOrders,
	getOrder,
	createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orders');


const Order = require('../models/Order');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');


router
    .route('/')
    .get(
        advancedResults(Order, 'item'),
        getOrders
        )
    .post(
       protect, authorize('admin', 'customer'),
        createOrder)

router
    .route('/:id')
    .get(getOrder)
    .put(protect, authorize('admin'), updateOrder)
    .delete(protect, authorize('admin'), deleteOrder);

module.exports = router;