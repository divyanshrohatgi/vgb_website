// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  verifyEmail,
  resendOTP,
  getUserProfile,
  updateUserProfile,
  updateMembershipStatus,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  processDonation // Make sure this is imported
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/', registerUser);
router.post('/login', authUser);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:token', verifyResetToken);
router.post('/reset-password/:token', resetPassword);
router.post('/donation', processDonation); // Make sure this route is added

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put('/membership', protect, updateMembershipStatus);

module.exports = router;