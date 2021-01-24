const express = require('express');
const {
	getPastas,
	getPasta,
	createPasta,
	updatePasta,
    deletePasta,
    pastaPhotoUpload
} = require('../controllers/pastas');



const router = express.Router();

// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');

// Re-route into other resource routers
//router.use('/:patientId/records', recordRouter);

router.route('/:id/photo').put(protect, authorize('admin'), pastaPhotoUpload);

router
    .route('/')
    .get(getPastas)
    .post(
       protect, authorize('admin'),
        createPasta)

router
    .route('/:id')
    .get(getPasta)
    .put(protect, authorize('admin'), updatePasta)
    .delete(protect, authorize('admin'), deletePasta);

module.exports = router;