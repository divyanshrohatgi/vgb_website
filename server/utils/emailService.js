const nodemailer = require('nodemailer');

// Configure nodemailer with Gmail settings
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com', 
  port: 465,
  secure: true, // Use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
});

/**
 * Send an OTP to verify a user's email address
 * @param {string} email - The recipient's email address
 * @param {string} otp - The OTP code to send
 * @returns {Promise} - Resolves when email is sent
 */
const sendOTPEmail = async (email, otp) => {
  try {
    console.log('Sending OTP email to:', email);
    console.log('Using email credentials:', {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS ? '[HIDDEN]' : 'Not set'
    });
    
    const mailOptions = {
      from: `"Verification Service" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #cd232e;">Email Verification</h2>
          </div>
          <p>Dear User,</p>
          <p>Thank you for registering with us. To complete your registration, please use the verification code below:</p>
          <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h2 style="margin: 0; color: #333; letter-spacing: 5px;">${otp}</h2>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this verification, please ignore this email.</p>
          <p>Regards,<br>Support Team</p>
        </div>
      `
    };

    console.log('Attempting to send email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Send a membership confirmation email with a digital card
 * @param {string} email - User's email address
 * @param {object} userData - User data including name and membership details
 * @returns {Promise} - Resolves when email is sent
 */
const sendMembershipConfirmationEmail = async (email, userData) => {
  try {
    console.log('Sending membership confirmation to:', email);
    
    // Map membership type to display name if needed
    const membershipType = getMembershipDisplayName(userData.membershipType || 'BASIC MEMBERSHIP');
    const membershipColor = getMembershipColor(userData.membershipType || 'BASIC MEMBERSHIP');
    
    const mailOptions = {
      from: `"Vishwa Guru Bharat" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Welcome to Vishwa Guru Bharat Membership!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="vgb-logo.png" alt="Vishwa Guru Bharat Logo" style="max-width: 150px; height: auto;">
            <h1 style="color: #cd232e; margin-top: 10px;">Membership Confirmation</h1>
          </div>
          
          <p>Dear ${userData.name},</p>
          
          <p>Congratulations and welcome to the Vishwa Guru Bharat community! We are thrilled to confirm your membership and thank you for joining us on this journey.</p>
          
          <!-- Membership Card -->
          <div style="background: linear-gradient(135deg, ${membershipColor} 0%, #ffffff 100%); border-radius: 12px; padding: 25px; margin: 30px 0; box-shadow: 0 10px 20px rgba(0,0,0,0.1); position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; right: 0; width: 100px; height: 100px; background: radial-gradient(circle at top right, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);"></div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
              <img src="https://vishwagurubharat.org/vgb-logo.png" alt="VGB Logo" style="width: 60px; height: auto;">
              <div style="text-align: right;">
                <div style="font-size: 18px; font-weight: bold; color: #2b2928;">MEMBERSHIP</div>
                <div style="font-size: 22px; font-weight: bold; color: #cd232e;">${membershipType}</div>
              </div>
            </div>
            
            <div style="margin: 20px 0;">
              <div style="font-size: 16px; color: #666;">MEMBER NAME</div>
              <div style="font-size: 20px; font-weight: bold; color: #2b2928;">${userData.name}</div>
            </div>
            
            <div style="display: flex; justify-content: space-between; margin-top: 20px;">
              <div>
                <div style="font-size: 12px; color: #666;">MEMBER SINCE</div>
                <div style="font-size: 14px; font-weight: bold; color: #2b2928;">${formatDate(userData.membershipStartDate || new Date())}</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 12px; color: #666;">MEMBER ID</div>
                <div style="font-size: 14px; font-weight: bold; color: #2b2928;">${generateMemberID(userData._id)}</div>
              </div>
            </div>
            
            <div style="margin-top: 30px; border-top: 1px dashed #ccc; padding-top: 15px;">
              <div style="text-align: center; font-size: 14px; color: #666;">This digital card confirms your membership status with Vishwa Guru Bharat.</div>
            </div>
          </div>
          
          <p>As a ${membershipType} member, you now have access to:</p>
          
          <ul style="padding-left: 20px; line-height: 1.6;">
            ${getMembershipBenefits(userData.membershipType)}
          </ul>
          
          <p>Your membership is active and will ${userData.membershipEndDate ? `expire on <strong>${formatDate(userData.membershipEndDate)}</strong>` : 'remain active until canceled'}.</p>
          
          <p>You can access your membership benefits by logging into your account on our website. If you have any questions or need assistance, please don't hesitate to contact our support team at <a href="mailto:info@vishwagurubharat.org" style="color: #cd232e;">info@vishwagurubharat.org</a>.</p>
          
          <div style="margin-top: 30px; padding: 20px; background-color: #f8f8f8; border-radius: 5px; text-align: center;">
            <p style="margin: 0; color: #666;">Thank you for supporting Vishwa Guru Bharat!</p>
          </div>
          
          <div style="margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
            <div style="margin-bottom: 10px;">
              <a href="https://vishwagurubharat.org" style="color: #cd232e; text-decoration: none;">vishwagurubharat.org</a>
            </div>
            <div style="display: flex; justify-content: center; gap: 15px; margin-top: 10px;">
              <a href="https://facebook.com/vishwagurubharat" style="color: #3b5998;"><img src="https://img.icons8.com/color/48/000000/facebook-new.png" width="24" height="24" alt="Facebook"></a>
              <a href="https://twitter.com/vishwagurubharat" style="color: #1da1f2;"><img src="https://img.icons8.com/color/48/000000/twitter.png" width="24" height="24" alt="Twitter"></a>
              <a href="https://instagram.com/vishwagurubharat" style="color: #e1306c;"><img src="https://img.icons8.com/color/48/000000/instagram-new.png" width="24" height="24" alt="Instagram"></a>
            </div>
          </div>
        </div>
      `
    };

    console.log('Attempting to send membership confirmation email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Membership confirmation email sent successfully:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending membership confirmation email:', error);
    throw error;
  }
};

/**
 * Map membership types to display names for the email
 * @param {string} membershipType - Type of membership from database
 * @returns {string} - Display name for email
 */
const getMembershipDisplayName = (membershipType) => {
  // Add a check to prevent errors with undefined/null values
  if (!membershipType) return 'BASIC MEMBERSHIP';
  
  switch (membershipType) {
    case 'BASIC MEMBERSHIP':
      return 'BASIC MEMBERSHIP';
    case 'SILVER MEMBERSHIP':
      return 'SILVER MEMBERSHIP';
    case 'GOLD MEMBERSHIP':
      return 'GOLD MEMBERSHIP';
    default:
      // Be careful with toUpperCase() - check that membershipType is a string
      return typeof membershipType === 'string' ? membershipType.toUpperCase() : 'BASIC MEMBERSHIP';
  }
};

/**
 * Get color gradient for different membership types
 * @param {string} membershipType - Type of membership
 * @returns {string} - Color hex code
 */
const getMembershipColor = (membershipType) => {
  // Add a check to prevent errors with undefined/null values
  if (!membershipType) return '#CD7F32'; // Default bronze color
  
  const type = membershipType.toLowerCase();
  
  if (type.includes('gold')) {
    return '#FFD700'; // Gold
  } else if (type.includes('silver')) {
    return '#C0C0C0'; // Silver
  } else if (type.includes('basic') || type.includes('bronze')) {
    return '#CD7F32'; // Bronze
  } else {
    return '#cd232e'; // Brand color for other types
  }
};

/**
 * Format date to readable string
 * @param {Date} date - Date to format
 * @returns {string} - Formatted date
 */
const formatDate = (date) => {
  // Handle potential null/undefined dates
  if (!date) return 'N/A';
  
  try {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid date';
  }
};

/**
 * Generate a member ID from user ID
 * @param {string} userId - MongoDB user ID
 * @returns {string} - Formatted member ID
 */
const generateMemberID = (userId) => {
  // Handle null/undefined userId
  if (!userId) return 'VGB-MEMBER';
  
  // Take last 6 characters of user ID and add prefix
  const id = String(userId).slice(-6).toUpperCase();
  return `VGB-${id}`;
};

/**
 * Get list of benefits based on membership type
 * @param {string} membershipType - Type of membership
 * @returns {string} - HTML list of benefits
 */
const getMembershipBenefits = (membershipType) => {
  // Add a check to prevent errors with undefined/null values
  if (!membershipType) return getBenefitsForBasic();
  
  const type = membershipType.toLowerCase();
  
  if (type.includes('gold')) {
    return getBenefitsForGold();
  } else if (type.includes('silver')) {
    return getBenefitsForSilver();
  } else {
    return getBenefitsForBasic();
  }
};

// Helper functions to keep the code clean
const getBenefitsForGold = () => `
  <li>Exclusive access to all premium events and workshops</li>
  <li>Priority registration for community experiences</li>
  <li>Special discounts on merchandise and publications</li>
  <li>Direct communication with VGB leadership</li>
  <li>Recognition on our website and publications</li>
  <li>All Silver membership benefits</li>
`;

const getBenefitsForSilver = () => `
  <li>Access to member-only events and content</li>
  <li>Monthly newsletter with exclusive insights</li>
  <li>Discounted tickets to VGB events</li>
  <li>Participation in community forums</li>
  <li>Voting rights in community decisions</li>
`;

const getBenefitsForBasic = () => `
  <li>Basic access to public events</li>
  <li>Quarterly newsletter</li>
  <li>Access to public resources</li>
`;
// server/utils/emailService.js - Add these functions

/**
 * Send a password reset email with a reset link
 * @param {string} email - User's email address
 * @param {string} name - User's name
 * @param {string} resetUrl - The URL for password reset
 * @returns {Promise} - Resolves when email is sent
 */
const sendPasswordResetEmail = async (email, name, resetUrl) => {
    try {
      console.log('Sending password reset email to:', email);
      
      const mailOptions = {
        from: `"Vishwa Guru Bharat" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://vishwagurubharat.org/vgb-logo.png" alt="Vishwa Guru Bharat Logo" style="max-width: 150px;">
              <h2 style="color: #cd232e;">Password Reset</h2>
            </div>
            
            <p>Dear ${name || 'User'},</p>
            
            <p>We received a request to reset your password. Please click the button below to create a new password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #cd232e; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Reset Password</a>
            </div>
            
            <p>This link will expire in 30 minutes for security reasons.</p>
            
            <p>If you did not request a password reset, please ignore this email or contact our support team if you have concerns.</p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f8f8; border-radius: 5px; text-align: center;">
              <p style="margin: 0; color: #666;">If the button doesn't work, you can also copy and paste this link into your browser:</p>
              <p style="margin: 10px 0; word-break: break-all; color: #2b2928;">${resetUrl}</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
              <p style="color: #666; margin-bottom: 10px;">Vishwa Guru Bharat</p>
              <a href="https://vishwagurubharat.org" style="color: #cd232e; text-decoration: none;">vishwagurubharat.org</a>
            </div>
          </div>
        `
      };
  
      console.log('Attempting to send password reset email...');
      const info = await transporter.sendMail(mailOptions);
      console.log('Password reset email sent successfully:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };
  
  /**
   * Send a confirmation email when password has been changed
   * @param {string} email - User's email address
   * @param {string} name - User's name
   * @returns {Promise} - Resolves when email is sent
   */
  const sendPasswordChangedEmail = async (email, name) => {
    try {
      console.log('Sending password changed confirmation to:', email);
      
      const mailOptions = {
        from: `"Vishwa Guru Bharat" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Password Changed Successfully',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <img src="https://vishwagurubharat.org/vgb-logo.png" alt="Vishwa Guru Bharat Logo" style="max-width: 150px;">
              <h2 style="color: #cd232e;">Password Changed</h2>
            </div>
            
            <p>Dear ${name || 'User'},</p>
            
            <p>This is to confirm that your password has been successfully changed.</p>
            
            <p>If you did not make this change, please contact our support team immediately at <a href="mailto:info@vishwagurubharat.org" style="color: #cd232e;">info@vishwagurubharat.org</a>.</p>
            
            <div style="margin-top: 30px; padding: 20px; background-color: #f8f8f8; border-radius: 5px; text-align: center;">
              <p style="margin: 0; color: #666;">You can now login to your account with your new password.</p>
            </div>
            
            <div style="margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
              <p style="color: #666; margin-bottom: 10px;">Vishwa Guru Bharat</p>
              <a href="https://vishwagurubharat.org" style="color: #cd232e; text-decoration: none;">vishwagurubharat.org</a>
            </div>
          </div>
        `
      };
  
      console.log('Attempting to send password changed confirmation...');
      const info = await transporter.sendMail(mailOptions);
      console.log('Password changed confirmation sent successfully:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending password changed confirmation:', error);
      throw error;
    }
  };
  
module.exports = {
    sendOTPEmail,
    sendMembershipConfirmationEmail,
    sendPasswordResetEmail,
    sendPasswordChangedEmail
};