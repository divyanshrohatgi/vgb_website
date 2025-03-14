// server/index.js
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

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5012;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Test the API at: http://localhost:${PORT}/`);
  console.log(`Payment routes available at: http://localhost:${PORT}/api/payments/test`);
  console.log('Razorpay config:', {
    keyExists: !!process.env.RAZORPAY_KEY_ID,
    secretExists: !!process.env.RAZORPAY_KEY_SECRET
  });
});

// Handle uncaught exceptions to prevent server crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Don't exit - let the server continue
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit - let the server continue
});