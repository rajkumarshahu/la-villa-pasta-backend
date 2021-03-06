const express = require('express');
const {
	getOrders,
	getOrder,
	createOrder,
    updateOrder,
    deleteOrder
} = require('../controllers/orders');


const Order = require('../models/Order');

// Include other resource routers
const billingRouter = require('./billings');

const router = express.Router({ mergeParams: true });

// Re-route into other resource routers
router.use('/:orderId/billings', billingRouter)

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
    .put(protect, authorize('admin', 'customer'), updateOrder)
    .delete(protect, authorize('admin', 'customer'), deleteOrder);

module.exports = router;