// server/utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  // Check if JWT_SECRET is defined
  if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables!');
    return null;
  }

  try {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    
    // Log successful token generation (with length but not the actual token for security)
    console.log(`Token generated successfully for user ${id}, length: ${token.length}`);
    
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    return null;
  }
};

module.exports = generateToken;