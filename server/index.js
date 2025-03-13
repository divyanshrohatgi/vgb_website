// server/index.js (or server.js)
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Check JWT_SECRET is set
if (!process.env.JWT_SECRET) {
  console.error('CRITICAL ERROR: JWT_SECRET is not defined in environment variables');
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Debug middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);

// Home route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`JWT_SECRET exists: ${!!process.env.JWT_SECRET}`);
});