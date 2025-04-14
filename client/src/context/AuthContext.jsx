// client/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5012',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verificationData, setVerificationData] = useState(null);

  // Register a new user
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      // Format the address as a string and clean up the data
      const formattedData = {
        ...userData,
        // Convert address object to string
        address: userData.address ? 
          `${userData.address.street.trim()}, ${userData.address.city.trim()}, ${userData.address.state.trim()}, ${userData.address.country.trim()}, ${userData.address.pincode.trim()}` 
          : '',
        // Ensure other required fields are present
        gender: userData.gender || '',
        dateOfBirth: userData.dateOfBirth || '',
        qualification: userData.qualification || '',
        // Remove any extra whitespace
        city: userData.address?.city.trim() || '',
        state: userData.address?.state.trim() || '',
      };

      console.log('Sending formatted data:', formattedData);

      const res = await api.post('/api/users/register', formattedData);

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data.user);
        setLoading(false);
        return { success: true };
      }

      if (res.data && res.data.requiresVerification) {
        setVerificationData({
          email: userData.email,
          message: res.data.message || 'Please verify your email'
        });
        setLoading(false);
        return { 
          success: true, 
          requiresVerification: true,
          message: res.data.message 
        };
      }

      throw new Error('Invalid response from server');
    } catch (err) {
      console.error('Registration failed:', err);
      const errorMessage = err.response?.data?.message || 
        'Registration failed. Please try again.';
      setError(errorMessage);
      setLoading(false);
      return { 
        success: false, 
        message: errorMessage 
      };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting login for:', email);
      
      // Make API request
      const res = await api.post('/api/users/login', { email, password });
      
      console.log('Login API response:', res.data);
      
      // Check if email verification is required
      if (res.data && res.data.requiresVerification) {
        setLoading(false);
        
        // Store verification data for the verification step
        setVerificationData({
          email: email,
          message: res.data.message || 'Please verify your email with the OTP sent to your email address.'
        });
        
        return { 
          success: false, 
          requiresVerification: true,
          message: res.data.message || 'Please verify your email'
        };
      }
      // Check for valid response with token
      else if (res.data && res.data.token) {
        // Save token to localStorage
        localStorage.setItem('userToken', res.data.token);
        
        // Set Authorization header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        // Update user state
        setUser(res.data);
        setLoading(false);
        
        return { success: true };
      } else {
        console.error('No token in login response:', res.data);
        throw new Error('Invalid response from server: No token received');
      }
    } catch (err) {
      // Log detailed error information
      console.error('Login failed:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      // Set loading and error states
      setLoading(false);
      
      // Extract specific error message from response
      const errorMessage = err.response?.data?.message || 'Invalid credentials';
      setError(errorMessage);
      
      return { success: false, message: errorMessage };
    }
  };

  // Logout user
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('userToken');
    
    // Remove Authorization header
    delete api.defaults.headers.common['Authorization'];
    
    // Reset user and error states
    setUser(null);
    setError(null);
    setVerificationData(null);
    
    console.log('User logged out');
    
    return { success: true };
  };

  // Verify email with OTP
  const verifyEmail = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Verifying email with OTP:', { email, otp });
      
      // Make API request
      const res = await api.post('/api/users/verify-email', { 
        email: email,
        otp: otp 
      });
      
      console.log('Verification API response:', res.data);
      
      if (res.data && res.data.token) {
        // Save token to localStorage
        localStorage.setItem('userToken', res.data.token);
        
        // Set Authorization header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        // Update user state
        setUser(res.data);
        
        // Clear verification data
        setVerificationData(null);
        
        setLoading(false);
        
        return { success: true };
      } else {
        throw new Error('Invalid response from server: No token received');
      }
    } catch (err) {
      console.error('Email verification failed:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      setLoading(false);
      
      const errorMessage = err.response?.data?.message || 'Verification failed. Please try again.';
      setError(errorMessage);
      
      return { success: false, message: errorMessage };
    }
  };

  // Resend verification OTP
  const resendOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Resending OTP to:', email);
      
      // Make API request
      const res = await api.post('/api/users/resend-otp', { email });
      
      console.log('Resend OTP response:', res.data);
      
      setLoading(false);
      
      return { 
        success: true, 
        message: res.data.message || 'Verification code sent successfully'
      };
    } catch (err) {
      console.error('Failed to resend OTP:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      setLoading(false);
      
      const errorMessage = err.response?.data?.message || 'Failed to send verification code';
      setError(errorMessage);
      
      return { success: false, message: errorMessage };
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Updating profile for user');
      
      // Make API request
      const res = await api.put('/api/users/profile', userData);
      
      console.log('Profile update response:', res.data);
      
      // Check if email verification is required (for email change)
      if (res.data && res.data.requiresVerification) {
        setLoading(false);
        
        // Store verification data for the verification step
        setVerificationData({
          email: res.data.email,
          message: res.data.message || 'Please verify your new email address with the OTP sent to it.'
        });
        
        return { 
          success: true,
          requiresVerification: true,
          message: res.data.message || 'Please verify your new email'
        };
      } else {
        // Update user state with new data
        setUser(res.data);
        setLoading(false);
        
        return { success: true, user: res.data };
      }
    } catch (err) {
      // Log detailed error information
      console.error('Profile update failed:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      // Set loading and error states
      setLoading(false);
      
      // Extract specific error message from response
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      
      return { success: false, message: errorMessage };
    }
  };

  // Update user membership status
  const updateMembership = async (membershipData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Updating membership status');
      
      // Make API request
      const res = await api.put('/api/users/membership', membershipData);
      
      console.log('Membership update successful');
      
      // Update only membership fields in user state
      setUser(prevUser => ({
        ...prevUser,
        membershipStatus: res.data.membershipStatus,
        membershipType: res.data.membershipType,
        membershipStartDate: res.data.membershipStartDate,
        membershipEndDate: res.data.membershipEndDate,
      }));
      
      setLoading(false);
      
      return { success: true, membership: res.data };
    } catch (err) {
      // Log detailed error information
      console.error('Membership update failed:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      // Set loading and error states
      setLoading(false);
      
      // Extract specific error message from response
      const errorMessage = err.response?.data?.message || 'Membership update failed';
      setError(errorMessage);
      
      return { success: false, message: errorMessage };
    }
  };

  // Clear any error
  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await api.get('/api/users/me');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  const value = {
    user,
    loading,
    error,
    verificationData,
    register,
    login,
    logout,
    verifyEmail,
    resendOTP,
    updateProfile,
    updateMembership,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;