const express = require('express');
const {
	getOrders,
	getOrder,
	createOrder,
} = require('../controllers/orders');



const router = express.Router();

// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
//router.use('/:patientId/records', recordRouter);


router
    .route('/')
    .get(getOrders)
    .post(
       protect, authorize('admin', 'customer'),
        createOrder)

router
    .route('/:id')
    .get(getOrder)
    // .put(protect, authorize('admin'), updateItem)
    // .delete(protect, authorize('admin'), deleteItem);

module.exports = router;