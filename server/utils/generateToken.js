// server/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id, membershipStatus = null, membershipType = null) => {
  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables!');
    return null;
  }

  try {
    // Create payload with membership info
    const payload = { id };
    
    // Only add membership info if provided
    if (membershipStatus) payload.membershipStatus = membershipStatus;
    if (membershipType) payload.membershipType = membershipType;
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    
    console.log(`Token generated successfully for user ${id}, length: ${token.length}`);
    
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  }
};

module.exports = generateToken;