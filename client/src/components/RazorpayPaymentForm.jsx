import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

// Create configured axios instance with baseURL from environment variables
const api = axios.create({
  // Use absolute URL instead of relying on environment variables
  baseURL: 'http://localhost:5012',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const RazorpayPaymentForm = ({
  amount,
  currency = 'INR',
  donorInfo,
  onSuccess,
  onError
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  // Check if Razorpay script is loaded
  useEffect(() => {
    if (window.Razorpay) {
      setScriptLoaded(true);
      console.log('Razorpay script already loaded');
    } else {
      console.log('Checking for Razorpay script...');
      // Script should already be in index.html, but let's check anyway
      const checkScript = setInterval(() => {
        if (window.Razorpay) {
          console.log('Razorpay script found');
          setScriptLoaded(true);
          clearInterval(checkScript);
        }
      }, 500);

      // Clear interval after 10 seconds to prevent memory leaks
      setTimeout(() => {
        clearInterval(checkScript);
        if (!window.Razorpay) {
          console.error('Razorpay script not found after timeout');
          setPaymentError("Razorpay SDK not loaded. Please refresh the page and try again.");
        }
      }, 10000);
    }

    // Test backend connection
    api.get('/api/payments/test')
      .then(response => {
        console.log('Backend connection successful:', response.data);
      })
      .catch(error => {
        console.error('Backend connection failed:', error);
        setPaymentError("Unable to connect to payment server. Please try again later.");
      });
  }, []);

  const handlePayment = async (event) => {
    event.preventDefault();
    setIsProcessing(true);
    setPaymentError(null);

    try {
      // Ensure the Razorpay script is loaded
      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded. Please refresh the page and try again.");
      }

      // Create a description based on donation type
      const description = donorInfo?.isRecurring 
        ? 'Monthly Donation to Vishwa Guru Bharat'
        : 'One-time Donation to Vishwa Guru Bharat';

      // Step 1: Create an order on your backend
      console.log(`Creating order for amount: ${amount} ${currency}`);
      
      // Use the correct endpoint with /api/payments prefix
      const endpoint = donorInfo?.isRecurring 
        ? '/api/payments/create-subscription' 
        : '/api/payments/create-order';
      
      console.log('Calling API endpoint:', endpoint);
      
      // For testing: try the test endpoint first
      let response;
      try {
        response = await api.post('/api/payments/test-create-order', { 
          amount: amount,
          description,
        });
        console.log('Test endpoint response:', response.data);
      } catch (testError) {
        console.warn('Test endpoint failed, trying real endpoint:', testError);
      }
      
      // Now try the real endpoint
      response = await api.post(endpoint, { 
        amount: amount,
        description,
        email: donorInfo?.email,
        firstName: donorInfo?.firstName,
        lastName: donorInfo?.lastName,
        isRecurring: donorInfo?.isRecurring
      });

      const { data } = response;
      console.log('API response:', data);

      if (!data.success || !data.orderId) {
        throw new Error(data.message || 'Failed to create order');
      }

      console.log('Order created successfully:', data.orderId);

      // Step 2: Configure Razorpay options
      const options = {
        key: 'rzp_test_bToxqx9jfCqd57', // Hardcoded for reliability
        amount: data.amount * 100, // in paise
        currency: data.currency,
        name: 'Vishwa Guru Bharat Foundation',
        description: description,
        image: '/vgb-logo.png', // Your logo
        order_id: data.orderId,
        handler: function(response) {
          console.log('Payment successful:', response);
          // Payment successful - verify on the backend
          api.post('/api/payments/verify-payment', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature
          })
          .then(() => {
            // Payment verification successful
            if (onSuccess) {
              onSuccess({
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
                amount: amount,
                isRecurring: donorInfo?.isRecurring
              });
            }
          })
          .catch((error) => {
            console.error('Payment verification failed:', error);
            setPaymentError('Payment verification failed. Please contact support.');
            if (onError) onError('Payment verification failed');
          })
          .finally(() => {
            setIsProcessing(false);
          });
        },
        prefill: {
          name: donorInfo ? `${donorInfo.firstName} ${donorInfo.lastName}` : '',
          email: donorInfo?.email || '',
          contact: ''  // Add a phone field to your form if needed
        },
        notes: {
          donationType: donorInfo?.isRecurring ? 'Monthly' : 'One-time',
          donorName: donorInfo ? `${donorInfo.firstName} ${donorInfo.lastName}` : '',
          donorEmail: donorInfo?.email || ''
        },
        theme: {
          color: '#cd232e'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setIsProcessing(false);
          }
        }
      };

      // Step 3: Open Razorpay Checkout
      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', function(response) {
        console.error('Payment failed:', response);
        const error = response.error || {};
        setPaymentError(error.description || 'Payment failed');
        if (onError) onError(error.description || 'Payment failed');
        setIsProcessing(false);
      });

      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError(error.message || 'An unexpected error occurred');
      if (onError) onError(error.message || 'An unexpected error occurred');
      setIsProcessing(false);
    }
  };

  // Show loading state if script is not yet loaded
  if (!scriptLoaded && !paymentError) {
    return (
      <PaymentFormContainer>
        <LoadingIndicator>
          <div className="spinner"></div>
          <p>Loading payment gateway...</p>
        </LoadingIndicator>
      </PaymentFormContainer>
    );
  }

  return (
    <PaymentFormContainer>
      {paymentError && <ErrorMessage>{paymentError}</ErrorMessage>}
      
      <PayButton onClick={handlePayment} disabled={isProcessing || !scriptLoaded}>
        {isProcessing ? 'Processing...' : `Pay ₹${amount}`}
      </PayButton>
      
      <SecurityNote>
        <span>🔒</span> Your payment information is secure and encrypted
      </SecurityNote>
      
      <PaymentOptions>
        <p>Accepted payment methods:</p>
        <PaymentMethodsGrid>
          <PaymentMethod>Credit Card</PaymentMethod>
          <PaymentMethod>Debit Card</PaymentMethod>
          <PaymentMethod>UPI</PaymentMethod>
          <PaymentMethod>Net Banking</PaymentMethod>
          <PaymentMethod>Wallets</PaymentMethod>
        </PaymentMethodsGrid>
      </PaymentOptions>
    </PaymentFormContainer>
  );
};

// Styled components remain the same
const PaymentFormContainer = styled.div`
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: #e4274d;
  margin-bottom: 15px;
  padding: 10px;
  background-color: #fff0f3;
  border-radius: 4px;
  border-left: 3px solid #e4274d;
`;

const PayButton = styled.button`
  width: 100%;
  background-color: var(--primary-color, #cd232e);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #b01c26;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(205, 35, 46, 0.2);
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const SecurityNote = styled.div`
  font-size: 12px;
  color: #6b7c93;
  text-align: center;
  margin-top: 15px;
  
  span {
    margin-right: 5px;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #cd232e;
    animation: spin 1s ease infinite;
    margin-bottom: 15px;
  }
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  p {
    color: #555;
    font-size: 14px;
  }
`;

const PaymentOptions = styled.div`
  margin-top: 25px;
  text-align: center;
  
  p {
    margin-bottom: 10px;
    font-weight: 500;
    color: #555;
    font-size: 14px;
  }
`;

const PaymentMethodsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

const PaymentMethod = styled.div`
  background-color: #f1f1f1;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #333;
`;

export default RazorpayPaymentForm;