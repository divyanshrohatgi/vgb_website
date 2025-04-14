// server/controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const { createOTP, verifyOTP } = require('../utils/otpUtils');
const { 
  sendOTPEmail, 
  sendMembershipConfirmationEmail,
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
  sendDonationReceiptEmail // New import
} = require('../utils/emailService');
const crypto = require('crypto');

// @desc    Register a new user (with email verification)
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log('Registration request received with data:', {
      ...req.body,
      password: '[REDACTED]'
    });

    const {
      name,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
      address,
      city,
      state,
      qualification,
      occupation,
      designation,
      interests,
      socialMediaLinks
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('User already exists with email:', email);
      res.status(400);
      throw new Error('User already exists');
    }

    // Generate OTP for email verification
    const otpData = createOTP();
    console.log('Generated OTP for verification:', otpData.code);

    // Create new user with unverified email
    const user = await User.create({
      name,
      email,
      password,
      phone,
      gender,
      dateOfBirth,
      address,
      city,
      state,
      qualification,
      occupation,
      designation: designation || '',
      interests: interests || '',
      socialMediaLinks: socialMediaLinks || {},
      membershipStatus: 'pending',
      isEmailVerified: false,
      emailVerificationOTP: otpData.code,
      emailVerificationOTPExpires: otpData.expiresAt
    });

    if (user) {
      console.log('User created successfully with ID:', user._id);

      // Send verification email
      try {
        await sendOTPEmail(email, otpData.code);
        console.log('Verification email sent successfully');
      } catch (emailError) {
        console.error('Failed to send verification email:', emailError);
        // We continue the registration process even if email fails
      }

      // Return user data without token (require verification first)
      console.log('Sending successful registration response without token (verification required)');
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        requiresVerification: true,
        message: 'Registration successful. Please verify your email with the OTP sent to your email address.'
      });
    } else {
      console.log('Failed to create user');
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error('Error in registerUser:', error);

    // Determine status code based on the error
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    // Send error response
    res.json({
      message: error.message || 'Registration failed',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Verify email with OTP
// @route   POST /api/users/verify-email
// @access  Public
const verifyEmail = asyncHandler(async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      res.status(400);
      throw new Error('Email and OTP are required');
    }

    console.log('Email verification attempt:', email);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for verification:', email);
      res.status(404);
      throw new Error('User not found');
    }

    // Check if already verified
    if (user.isEmailVerified) {
      console.log('Email already verified for user:', email);
      res.status(400);
      throw new Error('Email already verified');
    }

    // Verify OTP
    const isValidOTP = verifyOTP(
      otp,
      user.emailVerificationOTP,
      user.emailVerificationOTPExpires
    );

    if (!isValidOTP) {
      console.log('Invalid or expired OTP for user:', email);
      res.status(400);
      throw new Error('Invalid or expired verification code');
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.emailVerificationOTP = undefined;
    user.emailVerificationOTPExpires = undefined;
    await user.save();

    console.log('Email successfully verified for user:', email);

    // Generate token now that the user is verified
    const token = generateToken(user._id);
    console.log('Token generated for verified user:', token ? 'Success' : 'Failed');

    // Return user data with token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      profession: user.profession,
      location: user.location,
      phone: user.phone,
      membershipStatus: user.membershipStatus,
      isAdmin: user.isAdmin,
      isEmailVerified: true,
      token: token
    });
  } catch (error) {
    console.error('Error in verifyEmail:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Email verification failed',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Resend OTP for email verification
// @route   POST /api/users/resend-otp
// @access  Public
const resendOTP = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }

    console.log('Resend OTP request for:', email);

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found for OTP resend:', email);
      res.status(404);
      throw new Error('User not found');
    }

    // Check if already verified
    if (user.isEmailVerified) {
      console.log('Email already verified, no need to resend OTP:', email);
      res.status(400);
      throw new Error('Email already verified');
    }

    // Generate new OTP
    const otpData = createOTP();
    user.emailVerificationOTP = otpData.code;
    user.emailVerificationOTPExpires = otpData.expiresAt;
    await user.save();

    console.log('New OTP generated for user:', email);

    // Send verification email
    try {
      await sendOTPEmail(email, otpData.code);
      console.log('Verification email resent successfully');
      res.json({ message: 'Verification code sent successfully' });
    } catch (emailError) {
      console.error('Failed to resend verification email:', emailError);
      res.status(500);
      throw new Error('Failed to send verification email');
    }
  } catch (error) {
    console.error('Error in resendOTP:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Failed to resend verification code',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt for:', email);

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
      console.log('Password match successful for:', email);

      // Check if email is verified
      if (!user.isEmailVerified) {
        console.log('User email not verified, sending new OTP:', email);

        // Generate new OTP
        const otpData = createOTP();
        user.emailVerificationOTP = otpData.code;
        user.emailVerificationOTPExpires = otpData.expiresAt;
        await user.save();

        // Send verification email
        try {
          await sendOTPEmail(email, otpData.code);
          console.log('Verification email sent during login');
        } catch (emailError) {
          console.error('Failed to send verification email during login:', emailError);
        }

        return res.status(401).json({
          message: 'Email not verified. A verification code has been sent to your email.',
          requiresVerification: true,
          email: user.email
        });
      }

      console.log('User authenticated successfully:', user._id);

      // Generate token
      const token = generateToken(user._id);
      console.log('Token generated for login:', token ? 'Success' : 'Failed');

      if (!token) {
        throw new Error('Failed to generate authentication token');
      }

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        profession: user.profession,
        location: user.location,
        phone: user.phone,
        membershipStatus: user.membershipStatus,
        membershipType: user.membershipType,
        isAdmin: user.isAdmin,
        token: token
      });
    } else {
      console.log('Authentication failed for:', email);
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    console.error('Error in authUser:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Authentication failed',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Check if the requesting user is the profile owner
      const isOwner = req.user && req.user._id.toString() === user._id.toString();

      // Return user data with respect to privacy settings
      const userResponse = {
        _id: user._id,
        name: user.name,
        middleName: user.middleName,
        familyName: user.familyName,
        email: isOwner || !user.privacySettings.email ? user.email : null,
        phone: isOwner || !user.privacySettings.phone ? user.phone : null,
        gender: user.gender,
        dateOfBirth: isOwner || !user.privacySettings.dateOfBirth ? user.dateOfBirth : null,
        address: isOwner || !user.privacySettings.address ? user.address : null,
        city: isOwner || !user.privacySettings.address ? user.city : null,
        state: isOwner || !user.privacySettings.address ? user.state : null,
        qualification: isOwner || !user.privacySettings.qualification ? user.qualification : null,
        occupation: isOwner || !user.privacySettings.occupation ? user.occupation : null,
        designation: isOwner || !user.privacySettings.designation ? user.designation : null,
        interests: user.interests,
        profilePhoto: user.profilePhoto,
        socialMediaLinks: isOwner || !user.privacySettings.socialMediaLinks ? user.socialMediaLinks : null,
        membershipStatus: user.membershipStatus,
        membershipType: user.membershipType,
        isAdmin: user.isAdmin,
        // Only include privacy settings if the user is viewing their own profile
        ...(isOwner && { privacySettings: user.privacySettings }),
      };

      res.json(userResponse);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Failed to get user profile',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);

    if (user) {
      // Update basic information
      user.name = req.body.name || user.name;
      user.middleName = req.body.middleName || user.middleName;
      user.familyName = req.body.familyName || user.familyName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.gender = req.body.gender || user.gender;
      user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
      
      // Update address information
      user.address = req.body.address || user.address;
      user.city = req.body.city || user.city;
      user.state = req.body.state || user.state;
      
      // Update professional information
      user.qualification = req.body.qualification || user.qualification;
      user.occupation = req.body.occupation || user.occupation;
      user.designation = req.body.designation || user.designation;
      
      // Update additional information
      user.interests = req.body.interests || user.interests;
      
      // Update social media links if provided
      if (req.body.socialMediaLinks) {
        user.socialMediaLinks = {
          ...user.socialMediaLinks,
          ...req.body.socialMediaLinks
        };
      }
      
      // Update privacy settings if provided
      if (req.body.privacySettings) {
        user.privacySettings = {
          ...user.privacySettings,
          ...req.body.privacySettings
        };
      }

      // Update password if provided
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      // Return user data (since this is the user's own profile, return all data)
      const userResponse = {
        _id: updatedUser._id,
        name: updatedUser.name,
        middleName: updatedUser.middleName,
        familyName: updatedUser.familyName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        dateOfBirth: updatedUser.dateOfBirth,
        address: updatedUser.address,
        city: updatedUser.city,
        state: updatedUser.state,
        qualification: updatedUser.qualification,
        occupation: updatedUser.occupation,
        designation: updatedUser.designation,
        interests: updatedUser.interests,
        profilePhoto: updatedUser.profilePhoto,
        socialMediaLinks: updatedUser.socialMediaLinks,
        membershipStatus: updatedUser.membershipStatus,
        membershipType: updatedUser.membershipType,
        isAdmin: updatedUser.isAdmin,
        privacySettings: updatedUser.privacySettings,
        token: generateToken(updatedUser._id)
      };

      res.json(userResponse);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Profile update failed',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Update user membership status
// @route   PUT /api/users/membership
// @access  Private
const updateMembershipStatus = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      // Previous membership status (to check if this is an upgrade)
      const previousStatus = user.membershipStatus;
      
      // Update membership status and details
      user.membershipStatus = 'active';
      user.membershipType = req.body.membershipType || 'BASIC MEMBERSHIP'; // Updated default value
      user.membershipStartDate = Date.now();
      user.membershipEndDate = req.body.membershipEndDate || null;

      // Add payment to history if provided
      if (req.body.paymentId && Array.isArray(user.paymentHistory)) {
        user.paymentHistory.push({
          paymentId: req.body.paymentId,
          amount: req.body.amount || 0,
          membershipType: req.body.membershipType || 'BASIC MEMBERSHIP', // Updated default value
          status: 'completed'
        });
      }

      const updatedUser = await user.save();

      // Send membership confirmation email with digital card if status changed to active
      if (previousStatus !== 'active' && updatedUser.membershipStatus === 'active') {
        try {
          // Send the membership confirmation email with the digital card
          await sendMembershipConfirmationEmail(updatedUser.email, updatedUser);
          console.log('Membership confirmation email with digital card sent to:', updatedUser.email);
        } catch (emailError) {
          console.error('Failed to send membership confirmation email:', emailError);
          // Continue even if email fails - don't affect the API response
        }
      }

      // Generate a new token that includes the updated membership status
      const token = generateToken(updatedUser._id);

      // Return the FULL user object with token
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        company: updatedUser.company,
        profession: updatedUser.profession,
        location: updatedUser.location,
        phone: updatedUser.phone,
        membershipStatus: updatedUser.membershipStatus,
        membershipType: updatedUser.membershipType,
        membershipStartDate: updatedUser.membershipStartDate,
        membershipEndDate: updatedUser.membershipEndDate,
        isAdmin: updatedUser.isAdmin,
        isEmailVerified: updatedUser.isEmailVerified,
        token: token, // Include the new token
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in updateMembershipStatus:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Failed to update membership status',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});
// @desc    Handle forgot password request
// @route   POST /api/users/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      res.status(400);
      throw new Error('Email is required');
    }
    
    console.log('Forgot password request received for email:', email);
    
    // Find user by email
    const user = await User.findOne({ email }).select('-password');
    
    if (!user) {
      // For security, don't indicate whether the email exists
      console.log('User not found for forgot password, but not revealing this to the client');
      return res.json({
        message: 'If your email is registered, you will receive password reset instructions.'
      });
    }
    
    // Generate password reset token (random string)
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('Generated reset token for user:', user._id);
    
    // Hash the token for security
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Set token and expiry in user document
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 30 * 60 * 1000; // 30 minutes
    
    // Save without validation since we're only updating reset token fields
    await user.save({ validateBeforeSave: false });
    
    // Create reset URL with the correct frontend URL
    const frontendDomain = process.env.NODE_ENV === 'production'
      ? `${req.protocol}://${req.get('host')}`
      : 'http://localhost:3000'; // Your React dev server
    
    const resetUrl = `${frontendDomain}/reset-password/${resetToken}`;
    
    console.log('Reset URL generated:', resetUrl);
    
    // Send email with reset link
    try {
      await sendPasswordResetEmail(user.email, user.name, resetUrl);
      console.log('Password reset email sent successfully to:', user.email);
      
      return res.json({
        message: 'Password reset instructions have been sent to your email.'
      });
    } catch (error) {
      // If email fails, clear the reset token
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save({ validateBeforeSave: false });
      
      console.error('Failed to send password reset email:', error);
      res.status(500);
      throw new Error('Failed to send password reset email. Please try again later.');
    }
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Failed to process forgot password request',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Verify reset password token
// @route   GET /api/users/reset-password/:token
// @access  Public
const verifyResetToken = asyncHandler(async (req, res) => {
  try {
    // Get token from params
    const resetToken = req.params.token;
    console.log('Verifying reset token:', resetToken);
    
    // Hash the token from the URL
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Find user with valid token and expiry
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      console.log('Invalid or expired token:', resetToken);
      res.status(400);
      throw new Error('Password reset token is invalid or has expired');
    }
    
    console.log('Token verified successfully for user:', user._id);
    // If token is valid, return success
    res.json({ message: 'Token is valid' });
  } catch (error) {
    console.error('Error in verifyResetToken:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Failed to verify token',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Reset password
// @route   POST /api/users/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  try {
    // Get token and new password
    const resetToken = req.params.token;
    const { password } = req.body;
    
    console.log('Reset password request received for token:', resetToken);
    
    if (!password) {
      res.status(400);
      throw new Error('Password is required');
    }
    
    // Hash the token from the URL
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Find user with valid token and expiry
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      console.log('Invalid or expired token for password reset:', resetToken);
      res.status(400);
      throw new Error('Password reset token is invalid or has expired');
    }
    
    // Update user password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    // Save without validation since we're only updating password fields
    await user.save({ validateBeforeSave: false });
    console.log('Password reset successfully for user:', user._id);
    
    // Send confirmation email
    try {
      await sendPasswordChangedEmail(user.email, user.name);
      console.log('Password change confirmation email sent to:', user.email);
    } catch (emailError) {
      console.error('Failed to send password change confirmation:', emailError);
      // Don't block the process if email fails
    }
    
    res.json({ message: 'Password has been reset successfully. You can now log in with your new password.' });
  } catch (error) {
    console.error('Error in resetPassword:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Failed to reset password',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

// @desc    Process donation and send receipt
// @route   POST /api/users/donation
// @access  Public
const processDonation = asyncHandler(async (req, res) => {
  try {
    const { 
      name, 
      email, 
      amount, 
      paymentId, 
      paymentMethod, 
      notes 
    } = req.body;
    
    if (!email || !amount || !paymentId) {
      res.status(400);
      throw new Error('Email, amount, and payment ID are required');
    }
    
    console.log('Processing donation:', {
      email,
      amount,
      paymentId
    });
    
    // Find user by email (if they exist)
    const user = await User.findOne({ email });
    
    // Generate receipt number
    const receiptNumber = `DON-${Date.now().toString().slice(-6)}`;
    
    // Store donation in database if you have a donation model
    // If you don't have a donation model yet, you can still send the receipt
    
    // Create donation data for receipt
    const donationData = {
      name: name || (user ? user.name : 'Supporter'),
      amount: parseFloat(amount),
      paymentId,
      paymentMethod: paymentMethod || 'Online Payment',
      date: new Date(),
      receiptNumber,
      taxId: 'YOUR-TAX-ID' // Your organization's tax ID
    };
    
    // Send receipt email
    try {
      await sendDonationReceiptEmail(email, donationData);
      console.log('Donation receipt email sent to:', email);
    } catch (emailError) {
      console.error('Failed to send donation receipt email:', emailError);
      // Continue even if email fails - don't block the donation
    }
    
    // Return success response
    res.status(200).json({
      success: true,
      message: 'Thank you for your donation. A receipt has been sent to your email.',
      receiptNumber,
      amount
    });
  } catch (error) {
    console.error('Error in processDonation:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      success: false,
      message: error.message || 'Failed to process donation',
      stack: process.env.NODE_ENV === 'production' ? null : error.stack
    });
  }
});

module.exports = {
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
};