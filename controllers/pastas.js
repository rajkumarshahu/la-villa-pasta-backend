const Pasta = require('../models/Pasta');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

//@desc        Get all pastas
//@route       GET /pastas
//@access      Public
exports.getPastas = asyncHandler(async (req, res, next) => {
	const pastas = await Pasta.find().populate('records');
	res
		.status(200)
		.json({ success: true, pastaCount: pastas.length, data: pastas });
});

//@desc        Get single pasta
//@route       GET /pastas/:id
//@access      Public
exports.getPasta = asyncHandler(async (req, res, next) => {
	const pasta = await Pasta.findById(req.params.id).populate('pastas');
	if (!pasta) {
		return next(
			new ErrorResponse(`Pasta not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: pasta });
});

//@desc        Add new pasta
//@route       POST /pastas
//@access      Private
exports.createPasta = asyncHandler(async (req, res, next) => {
	const pasta = await Pasta.create(req.body);
	res.status(201).json({
		success: true,
		data: pasta,
	});
});

//@desc        Update pasta
//@route       PUT /pastas/:id
//@access      Private
exports.updatePasta = asyncHandler(async (req, res, next) => {
	const pasta = await Pasta.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});
	if (!pasta) {
		return next(
			new ErrorResponse(`Pasta not found with id of ${req.params.id}`, 404)
		);
	}
	res.status(200).json({ success: true, data: pasta });
});

//@desc        Delete pasta
//@route       DELETE /pastas/:id
//@access      Private
exports.deletePasta = asyncHandler(async (req, res, next) => {
	const pasta = await Pasta.findById(req.params.id);
	if (!pasta) {
		return next(
			new ErrorResponse(`Pasta not found with id of ${req.params.id}`, 404)
		);
	}
	pasta.remove();
	res.status(200).json({ success: true, data: {} });
});

// @desc    Upload photo of a pasta
// @route   PUT /pastas/:id/photo
// @access  Private
exports.pastaPhotoUpload = asyncHandler(async (req, res, next) => {
	const pasta = await Pasta.findById(req.params.id);

	if (!pasta) {
		return next(
			new ErrorResponse(`Pasta not found with id of ${req.params.id}`, 404)
		);
	}

	if (!req.files) {
		return next(new ErrorResponse(`Please upload a file`, 400));
	}

	const file = req.files.file;

	// Make sure the image is a photo
	if (!file.mimetype.startsWith('image')) {
		return next(new ErrorResponse(`Please upload an image file`, 400));
	}

	// Check file size
	if (file.size > process.env.MAX_FILE_UPLOAD) {
		return next(
			new ErrorResponse(
				`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
				400
			)
		);
	}

	// Create custom filename
	file.name = `photo_${pasta._id}${path.parse(file.name).ext}`;

	// Move the file to upload path
	file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
		if (err) {
			console.error(err);
			return next(new ErrorResponse(`Problem with file upload`, 500));
		}

		const pasta = await Pasta.findByIdAndUpdate(req.params.id, {
			photo: file.name,
		});

		res.status(200).json({
			success: true,
			data: file.name,
		});
	});

	// console.log(req.files.file);
});
