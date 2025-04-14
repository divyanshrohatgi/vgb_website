// server/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    // Personal Information
    name: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      default: '',
    },
    familyName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    
    // Address Information
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    
    // Professional Information
    qualification: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      default: '',
    },
    
    // Additional Information
    interests: {
      type: String,
      default: '',
    },
    profilePhoto: {
      type: String, // URL to the stored image
      default: '',
    },
    
    // Social Media Links
    socialMediaLinks: {
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    
    // Privacy Settings
    privacySettings: {
      email: { type: Boolean, default: false },
      phone: { type: Boolean, default: false },
      dateOfBirth: { type: Boolean, default: false },
      address: { type: Boolean, default: false },
      qualification: { type: Boolean, default: false },
      occupation: { type: Boolean, default: false },
      designation: { type: Boolean, default: false },
      socialMediaLinks: { type: Boolean, default: false },
    },
    
    // Membership Information
    membershipStatus: {
      type: String,
      enum: ['pending', 'active', 'expired'],
      default: 'pending',
    },
    membershipType: {
      type: String,
      enum: ['BASIC MEMBERSHIP', 'SILVER MEMBERSHIP', 'GOLD MEMBERSHIP'],
      default: 'BASIC MEMBERSHIP',
    },
    membershipStartDate: {
      type: Date,
    },
    membershipEndDate: {
      type: Date,
    },
    
    // Security and Verification
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationOTP: {
      type: String,
    },
    emailVerificationOTPExpires: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    
    // Payment History
    paymentHistory: [
      {
        paymentId: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        membershipType: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          required: true,
          default: 'pending',
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;