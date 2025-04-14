require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', process.env.CLIENT_URL].filter(Boolean),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'public', 'uploads');
require('fs').mkdirSync(uploadsDir, { recursive: true });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Debug middleware for all routes
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Connect to MongoDB
try {
  // Check JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.warn('WARNING: JWT_SECRET is not defined in environment variables');
  }
  
  // Check email configuration
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.warn('WARNING: Email configuration (EMAIL_USER, EMAIL_PASS) is not set or incomplete');
  } else {
    console.log('Email configuration found');
  }

  // Connect to MongoDB
  if (process.env.MONGO_URI) {
    connectDB();
  } else {
    console.warn('WARNING: MONGO_URI not set, skipping database connection');
  }
} catch (error) {
  console.error('Error during startup:', error);
}

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5012;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API base URL: http://localhost:${PORT}/api`);
});

// Handle uncaught exceptions to prevent server crashes
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});