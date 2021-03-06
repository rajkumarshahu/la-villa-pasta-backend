const express = require('express');
const {
	getBillings,
	getBilling,
	createBilling,
    updateBilling,
    deleteBilling
} = require('../controllers/billings');


const Billing = require('../models/Billing');

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');

// Protect and authorize middlewares
const { protect, authorize } = require('../middleware/auth');
const { getUsers } = require('../controllers/users');


router
    .route('/')
    .get(
        advancedResults(Billing, 'order'),
        getBillings
        )
    .post(
       protect, authorize('admin'), createBilling)

router
    .route('/:id')
    .get(getBilling)
    .put(protect, authorize('admin'), updateBilling)
    .delete(protect, authorize('admin'), deleteBilling);

module.exports = router;