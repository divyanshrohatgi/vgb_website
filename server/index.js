require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies with increased limit
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Enhanced debug middleware to also log request bodies
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  if (req.method === 'POST' && req.path.includes('/api/payments')) {
    console.log('Request body:', JSON.stringify(req.body));
  }
  next();
});

// Connect to MongoDB - Wrap in try/catch to prevent crashes
try {
  // Check JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET is not defined in environment variables');
    // Don't exit - just warn
  }
  
  // Check email configuration
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: Email configuration (EMAIL_USER, EMAIL_PASS) is not set or incomplete');
    console.warn('Email verification will not work without proper email configuration');
  } else {
    console.log('Email configuration found');
  }

  // Connect to MongoDB - only if needed and not for payments testing
  if (process.env.MONGO_URI) {
    connectDB();
  } else {
    console.warn('WARNING: MONGO_URI not set, skipping database connection');
  }
} catch (error) {
  console.error('Error during startup:', error);
  // Don't exit - continue to serve payments API even if DB fails
}

// Home route for testing
app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    time: new Date().toISOString()
  });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Direct test endpoint for payments
app.post('/test-payment', (req, res) => {
  console.log('Test payment endpoint hit with body:', req.body);
  res.json({
    success: true,
    orderId: 'test_order_' + Date.now(),
    amount: req.body.amount || 0,
    currency: 'INR'
  });
});

// Test email sending endpoint
app.get('/test-email', async (req, res) => {
  try {
    const { sendOTPEmail } = require('./utils/emailService');
    const testEmail = req.query.email || 'test@example.com';
    const testOTP = '123456';
    
    console.log('Attempting to send test email to:', testEmail);
    
    const result = await sendOTPEmail(testEmail, testOTP);
    
    console.log('Email sent result:', result);
    
    res.json({
      success: true,
      message: 'Test email sent successfully! Check your inbox (and spam folder)',
      emailDetails: {
        to: testEmail,
        otp: testOTP
      }
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

// Test donation email endpoint
app.get('/test-donation-email', async (req, res) => {
  try {
    const { sendDonationReceiptEmail } = require('./utils/emailService');
    const testEmail = req.query.email || 'test@example.com';
    
    console.log('Attempting to send test donation receipt email to:', testEmail);
    
    const donationData = {
      name: 'Test Donor',
      amount: 1000,
      paymentId: 'test-payment-' + Date.now(),
      paymentMethod: 'Credit Card',
      date: new Date(),
      receiptNumber: 'DON-' + Date.now().toString().slice(-6),
      taxId: 'ABCDE1234F'
    };
    
    const result = await sendDonationReceiptEmail(testEmail, donationData);
    
    console.log('Donation test email sent result:', result);
    
    res.json({
      success: true,
      message: 'Test donation receipt email sent successfully! Check your inbox (and spam folder)',
      emailDetails: {
        to: testEmail,
        donationData
      }
    });
  } catch (error) {
    console.error('Error sending test donation email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test donation email',
      error: error.message
    });
  }
});

// Email configuration check endpoint
app.get('/email-config', (req, res) => {
  res.json({
    emailUser: process.env.EMAIL_USER ? 'Configured' : 'Missing',
    emailPass: process.env.EMAIL_PASS ? 'Configured' : 'Missing',
    nodemailerInstalled: typeof require('nodemailer') === 'function' ? 'Yes' : 'No'
  });
});

// Debug route to test verify-email directly
app.post('/debug-verify-email', async (req, res) => {
  console.log('Debug verify-email endpoint hit with body:', req.body);
  try {
    const { verifyEmail } = require('./controllers/userController');
    // Create a mock request and response
    const mockReq = {
      body: req.body
    };
    const mockRes = {
      status: function(code) {
        console.log('Status code:', code);
        this.statusCode = code;
        return this;
      },
      json: function(data) {
        console.log('Response data:', data);
        res.status(this.statusCode || 200).json({
          debug: true,
          originalResponse: data,
          receivedBody: req.body
        });
      }
    };
    
    // Call the verification function
    await verifyEmail(mockReq, mockRes);
  } catch (error) {
    console.error('Error in debug verify endpoint:', error);
    res.status(500).json({
      debug: true,
      error: error.message,
      stack: error.stack,
      receivedBody: req.body
    });
  }
});

// Test HTTP method compatibility
app.all('/test-method', (req, res) => {
  res.json({
    message: 'Method test successful',
    method: req.method,
    headers: req.headers,
    body: req.body,
    query: req.query
  });
});

// Error middleware must come after all routes
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5012;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/`);
  console.log(`Payment routes available at: http://localhost:${PORT}/api/payments/test`);
  console.log(`Email verification routes available at: http://localhost:${PORT}/api/users/verify-email`);
  console.log(`Test email sending at: http://localhost:${PORT}/test-email?email=your-email@example.com`);
  console.log(`Test donation email at: http://localhost:${PORT}/test-donation-email?email=your-email@example.com`);
  console.log('Razorpay config:', {
    keyExists: !!process.env.RAZORPAY_KEY_ID,
    secretExists: !!process.env.RAZORPAY_KEY_SECRET
  });
  console.log('Email config:', {
    userExists: !!process.env.EMAIL_USER,
    passExists: !!process.env.EMAIL_PASS
  });
});

// Handle uncaught exceptions to prevent server crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});