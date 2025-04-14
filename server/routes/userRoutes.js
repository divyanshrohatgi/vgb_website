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
  processDonation
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/uploadConfig');
const User = require('../models/userModel');

// Public routes
router.post('/', registerUser);
router.post('/login', authUser);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOTP);
router.post('/forgot-password', forgotPassword);
router.get('/reset-password/:token', verifyResetToken);
router.post('/reset-password/:token', resetPassword);
router.post('/donation', processDonation);

// Protected routes
router.get('/me', protect, getUserProfile);

router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.put('/membership', protect, updateMembershipStatus);

// Upload profile photo
router.post('/photo', protect, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's photo URL using the correct field name
    user.profilePhoto = `/uploads/${req.file.filename}`;
    await user.save();

    res.json({ 
      message: 'Photo uploaded successfully',
      photoUrl: user.profilePhoto
    });
  } catch (error) {
    console.error('Photo upload error:', error);
    res.status(500).json({ message: 'Error uploading photo' });
  }
});

module.exports = router;