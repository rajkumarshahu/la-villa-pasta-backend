const express = require('express');
const {
	getOrderDetails,
	//getOrder,
	createOrderDetails,
    // updateOrder,
    // deleteOrder
} = require('../controllers/orderDetails');


const OrderDetail = require('../models/OrderDetail');

// Include other resource routers
const itemRouter = require('./items');
const orderRouter = require('./orders');

var router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');
// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
// router.use('/:orderId/orderDetails', orderRouter);
//router.use('/:orderId/items', itemRouter);


router
    .route('/')
    .get(
        advancedResults(OrderDetail,
            'order'
            ),
       getOrderDetails
        )
    .post(
       protect, authorize('admin', 'customer'),
        createOrderDetails)

// router
//     .route('/:id')
//     .get(getOrder)
//     .put(protect, authorize('admin', 'customer'), updateOrder)
//     .delete(protect, authorize('admin', 'customer'), deleteOrder);

module.exports = router;