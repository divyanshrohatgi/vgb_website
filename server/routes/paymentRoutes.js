const express = require('express');
const router = express.Router();
const { processPayment, createSubscription } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Process a one-time payment
router.post('/process-payment', processPayment);

// Create a subscription for recurring donations
router.post('/create-subscription', createSubscription);

module.exports = router;