// server/controllers/userController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    console.log('Registration request received with data:', {
      ...req.body,
      password: '[REDACTED]'
    });
    
    const { name, email, password, company, profession, location, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('User already exists with email:', email);
      res.status(400);
      throw new Error('User already exists');
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      password, // This will be hashed by the pre-save middleware
      company,
      profession,
      location: location || '',
      phone: phone || '',
      membershipStatus: 'pending'
    });

    if (user) {
      console.log('User created successfully with ID:', user._id);
      
      // Generate token - IMPORTANT!
      const token = generateToken(user._id);
      console.log('Token generated for new user:', token ? 'Success' : 'Failed');
      
      if (!token) {
        throw new Error('Failed to generate authentication token');
      }
      
      // Send response with token
      console.log('Sending successful registration response with token');
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        company: user.company,
        profession: user.profession,
        location: user.location,
        phone: user.phone,
        membershipStatus: user.membershipStatus,
        isAdmin: user.isAdmin,
        token: token // Make sure token is included here
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
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
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
        membershipStartDate: user.membershipStartDate,
        isAdmin: user.isAdmin,
      });
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
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.company = req.body.company || user.company;
      user.profession = req.body.profession || user.profession;
      user.location = req.body.location || user.location;
      user.phone = req.body.phone || user.phone;
      
      // Only update password if it's provided
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();
      
      // Generate token for the updated user
      const token = generateToken(updatedUser._id);

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
        isAdmin: updatedUser.isAdmin,
        token: token,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: error.message || 'Failed to update user profile',
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
      // Update membership status and details
      user.membershipStatus = 'active';
      user.membershipType = req.body.membershipType || 'Standard';
      user.membershipStartDate = Date.now();
      user.membershipEndDate = req.body.membershipEndDate || null;
      user.paymentId = req.body.paymentId || null;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        membershipStatus: updatedUser.membershipStatus,
        membershipType: updatedUser.membershipType,
        membershipStartDate: updatedUser.membershipStartDate,
        membershipEndDate: updatedUser.membershipEndDate,
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

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  updateMembershipStatus,
};