const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    company: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    profileImage: {
      type: String,
      required: false,
      default: '',
    },
    // New membership fields
    membershipStatus: {
      type: String,
      enum: ['none', 'pending', 'active', 'expired'],
      default: 'none',
    },
    membershipType: {
      type: String,
      enum: ['', 'BASIC MEMBERSHIP', 'SILVER MEMBERSHIP', 'GOLD MEMBERSHIP'],
      default: '',
    },
    membershipStartDate: {
      type: Date,
      default: null,
    },
    membershipEndDate: {
      type: Date,
      default: null,
    },
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
        date: {
          type: Date,
          default: Date.now,
        },
        membershipType: {
          type: String,
          required: true,
        },
        status: {
          type: String,
          enum: ['completed', 'failed', 'refunded'],
          default: 'completed',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Method to match passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to encrypt password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

module.exports = User;