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
const itemRouter = require('./items');

var router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
router.use('/:orderId/billings', billingRouter);
//router.use('/:orderId/items', itemRouter);


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