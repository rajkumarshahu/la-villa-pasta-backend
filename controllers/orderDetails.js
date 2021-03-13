const OrderDetail = require('../models/OrderDetail');
const Order = require('../models/Order');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc        Get all order details
//@route	   GET /orderDetails
//@route       GET /orders/:orderId/billings
//@access      Public
exports.getOrderDetails = asyncHandler(async (req, res, next) => {
	if (req.params.orderDetailId) {
		const orderDetails = await OrderDetail.find({ billing: req.params.orderDetailId });

		return res.status(200).json({
		  success: true,
		  count: orderDetails.length,
		  data: orderDetails
		});
	  } else {
		res.status(200).json(res.advancedResults);
	  }
});


//@desc        Add new order
//@route       POST /orders/:orderId/orderDetails
//@access      Private
exports.createOrderDetails = asyncHandler(async (req, res, next) => {

	//req.body.item = req.params.itemId;

    req.body.order = req.params.orderId;
	// Add user to req,body
	req.body.user = req.user.id;

//   const item = await Item.findById(req.params.itemId);

//   if (!item) {
//     return next(
//       new ErrorResponse(`No item with the id of ${req.params.itemId}`),
//       404
//     );
//   }

  const order = await Order.findById(req.params.orderId);

  if (!order) {
    return next(
      new ErrorResponse(`No order with the id of ${req.params.orderId}`),
      404
    );
  }

  const orderDetail = await OrderDetail.create(req.body);

  res.status(200).json({
    success: true,
    data: orderDetail
  });
});