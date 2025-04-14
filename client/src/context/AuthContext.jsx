// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create configured axios instance with baseURL from environment variables
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5012',
  timeout: 15000,
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

  // Add request interceptor for token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Add response interceptor for error handling
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          setUser(null);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);

  // Check authentication status
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        setUser(null);
        return;
      }

      // Set the token in the headers before making the request
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      const res = await api.get('/api/users/me');
      if (res.data) {
        setUser(res.data);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      // Only clear token and user if it's an authentication error
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
        setUser(null);
      } else {
        // For other errors (like network issues), keep the user logged in
        const existingUser = localStorage.getItem('user');
        if (existingUser) {
          try {
            setUser(JSON.parse(existingUser));
          } catch (e) {
            console.error('Error parsing stored user data:', e);
          }
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.post('/api/users/register', formData);
      setVerificationData({ email: formData.email });
      
      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.post('/api/users/login', { email, password });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data));
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data);
        return { success: true, data: res.data };
      }
      
      throw new Error('No token received');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.put('/api/users/profile', userData);
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data)); // Store updated user data
      
      return { success: true, data: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Verify email with OTP
  const verifyEmail = async (email, otp) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.post('/api/users/verify-email', { email, otp });
      
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
        setUser(res.data);
        setVerificationData(null);
        return { success: true };
      }
      
      throw new Error('No token received');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Verification failed';
      setError(errorMessage);
      
      if (err.response?.status === 401) {
        setVerificationData(null);
      }
      
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Resend verification OTP
  const resendOTP = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.post('/api/users/resend-otp', { email });
      
      return { 
        success: true, 
        message: res.data.message || 'Verification code sent successfully'
      };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to send verification code';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update membership status
  const updateMembership = async (membershipData) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.put('/api/users/membership', membershipData);
      
      setUser(prevUser => ({
        ...prevUser,
        membershipStatus: res.data.membershipStatus,
        membershipType: res.data.membershipType,
        membershipStartDate: res.data.membershipStartDate,
        membershipEndDate: res.data.membershipEndDate,
      }));
      
      return { success: true, membership: res.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Membership update failed';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;