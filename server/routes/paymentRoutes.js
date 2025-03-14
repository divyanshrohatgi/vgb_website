// routes/paymentRoutes.js
const express = require('express');
const { createOrder, createSubscription, verifyPayment } = require('../controllers/paymentController');
const router = express.Router();

// Debug middleware for payment routes
router.use((req, res, next) => {
  console.log(`Payment route hit: [${req.method}] ${req.originalUrl}`);
  if (req.method === 'POST') {
    console.log('Request body:', JSON.stringify(req.body));
  }
  next();
});

// Test route to verify API is working
router.get('/test', (req, res) => {
  res.json({ 
    message: 'Payment API is working',
    timestamp: new Date().toISOString(),
    razorpayKeysConfigured: {
      keyId: !!process.env.RAZORPAY_KEY_ID,
      keySecret: !!process.env.RAZORPAY_KEY_SECRET
    }
  });
});

// Direct test endpoint that doesn't use the controller
router.post('/test-create-order', (req, res) => {
  console.log('Test create order route accessed with body:', req.body);
  res.json({
    success: true,
    orderId: 'test_order_' + Date.now(),
    amount: req.body.amount || 0,
    currency: 'INR'
  });
});

// Wrapped route handlers with try/catch for better error handling
router.post('/create-order', async (req, res, next) => {
  try {
    console.log('Create order route accessed with body:', req.body);
    await createOrder(req, res, next);
  } catch (error) {
    console.error('Error in create-order route:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in create-order route',
      error: error.message
    });
  }
});

router.post('/create-subscription', async (req, res, next) => {
  try {
    await createSubscription(req, res, next);
  } catch (error) {
    console.error('Error in create-subscription route:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in create-subscription route',
      error: error.message
    });
  }
});

router.post('/verify-payment', async (req, res, next) => {
  try {
    await verifyPayment(req, res, next);
  } catch (error) {
    console.error('Error in verify-payment route:', error);
    res.status(500).json({
      success: false,
      message: 'Server error in verify-payment route',
      error: error.message
    });
  }
});

module.exports = router;