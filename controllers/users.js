const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

// @desc      Get all users
// @route     GET /users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {

  res.status(200).json(res.advancedResults);
});


// @desc      Get single user
// @route     GET /users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {

  const user = await User.findById(req.params.id)
	if (!user) {
		return next(
			new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: user });

});

// @desc      Create user
// @route     POST /users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(201).json({
    success: true,
    data: user
  });
});

// @desc      Update user
// @route     PUT /users/:id
// @access    Private/Admin
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
		return next(
			new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
		);
	}

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc      Delete user
// @route     DELETE /users/:id
// @access    Private/Admin
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
		return next(
			new ErrorResponse(`User not found with id of ${req.params.id}`, 404)
		);
	}

  res.status(200).json({
    success: true,
    data: {}
  });
});
