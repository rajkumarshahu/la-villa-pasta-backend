const Order = require('../models/Order');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc        Get all order
//@route       GET /order
//@access      Public
exports.getOrders = asyncHandler(async (req, res, next) => {
	const orders = await Order.find();
	//.populate('records')
	res
		.status(200)
		.json({ success: true, orderCount: orders.length, data: orders });
});

//@desc        Get single order
//@route       GET /items/:id
//@access      Public
exports.getOrder = asyncHandler(async (req, res, next) => {
	const order = await Order.findById(req.params.id)
	//.populate('pastas');
	if (!order) {
		return next(
			new ErrorResponse(`Order not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: item });
});

//@desc        Add new order
//@route       POST /orders
//@access      Private
exports.createOrder = asyncHandler(async (req, res, next) => {

	// Add user to req.body
	req.body.user = req.user.id;


	const order = await Order.create(req.body);
	res.status(201).json({
		success: true,
		data: order,
	});
});
