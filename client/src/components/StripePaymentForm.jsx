import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styled from 'styled-components';

const StripePaymentForm = ({ amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setIsProcessing(true);
    setPaymentError(null);
    
    try {
      // Get card element
      const cardElement = elements.getElement(CardElement);
      
      // Create payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
      
      if (error) {
        setPaymentError(error.message);
        if (onError) onError(error.message);
        setIsProcessing(false);
        return;
      }
      
      // In a real application, you would send this to your server
      // For this example, we'll simulate a successful payment
      console.log('Payment method created:', paymentMethod);
      
      // Simulate calling your backend to process the payment
      setTimeout(() => {
        if (onSuccess) {
          onSuccess({
            id: paymentMethod.id,
            last4: paymentMethod.card.last4
          });
        }
        setIsProcessing(false);
      }, 1000);
      
      // In a real app, you would do something like this:
      /*
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: amount * 100, // convert to cents
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        if (onSuccess) onSuccess(data);
      } else {
        setPaymentError(data.message || 'Payment failed');
        if (onError) onError(data.message);
      }
      */
    } catch (err) {
      console.error('Payment error:', err);
      setPaymentError('An unexpected error occurred. Please try again.');
      if (onError) onError('An unexpected error occurred');
      setIsProcessing(false);
    }
  };
  
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
  
  return (
    <PaymentFormContainer>
      <CardContainer>
        <CardElement options={cardElementOptions} />
      </CardContainer>
      
      {paymentError && <ErrorMessage>{paymentError}</ErrorMessage>}
      
      <PayButton 
        onClick={handleSubmit} 
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? 'Processing...' : `Pay $${amount}`}
      </PayButton>
      
      <SecurityNote>
        <span>🔒</span> Your payment information is secure and encrypted
      </SecurityNote>
    </PaymentFormContainer>
  );
};

const PaymentFormContainer = styled.div`
  margin-top: 20px;
`;

const CardContainer = styled.div`
  border: 1px solid #e6e6e6;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 20px;
  background-color: #fff;
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
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #b01c26;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
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

export default StripePaymentForm;