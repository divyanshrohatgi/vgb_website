// client/src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set axios defaults
  // Use your actual API base URL
  axios.defaults.baseURL = 'http://localhost:5012';

  // Initialize auth state from localStorage on app load
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (localStorage.getItem('userToken')) {
        try {
          // Set Authorization header for all requests
          const token = localStorage.getItem('userToken');
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch the user profile
          const res = await axios.get('/api/users/profile');
          
          // Update the user state
          setUser(res.data);
          console.log('User authenticated from token');
        } catch (err) {
          console.error('Error restoring auth state:', err.response?.data?.message || err.message);
          // Invalid token or expired, remove it
          localStorage.removeItem('userToken');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      
      // Done checking auth state
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      // Set loading state
      setLoading(true);
      setError(null);
      
      console.log('Registering new user:', { ...userData, password: '[REDACTED]' });
      
      // Make the API request
      const res = await axios.post('/api/users', userData);
      
      console.log('Registration API response:', {
        status: res.status,
        hasToken: !!res.data.token,
        userId: res.data._id
      });
      
      // Check for valid response with token
      if (res.data && res.data.token) {
        // Save token to localStorage
        localStorage.setItem('userToken', res.data.token);
        
        // Set Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
        // Update user state
        setUser(res.data);
        setLoading(false);
        
        return { success: true };
      } else {
        console.error('No token in registration response:', res.data);
        throw new Error('Invalid response from server: No token received');
      }
    } catch (err) {
      // Log detailed error information
      console.error('Registration failed:', err);
      console.error('Error details:', err.response?.data || err.message);
      
      // Set loading and error states
      setLoading(false);
      
      // Extract specific error message from response
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      
      return { success: false, message: errorMessage };
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting login for:', email);
      
      // Make API request
      const res = await axios.post('/api/users/login', { email, password });
      
      console.log('Login API response:', {
        status: res.status,
        hasToken: !!res.data.token,
        userId: res.data._id
      });
      
      // Check for valid response with token
      if (res.data && res.data.token) {
        // Save token to localStorage
        localStorage.setItem('userToken', res.data.token);
        
        // Set Authorization header for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        
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
    delete axios.defaults.headers.common['Authorization'];
    
    // Reset user and error states
    setUser(null);
    setError(null);
    
    console.log('User logged out');
    
    return { success: true };
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Updating profile for user');
      
      // Make API request
      const res = await axios.put('/api/users/profile', userData);
      
      console.log('Profile update successful');
      
      // Update user state with new data
      setUser(res.data);
      setLoading(false);
      
      return { success: true, user: res.data };
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
      const res = await axios.put('/api/users/membership', membershipData);
      
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        updateMembership,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;