import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCheck, FaRegCheckCircle } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const MembershipPage = () => {
  const { user, loading, updateMembership } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [step, setStep] = useState(1); // 1: Plan selection, 2: Payment, 3: Success
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  
  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
    
    // If user already has active membership, redirect to profile
    if (user && user.membershipStatus === 'active') {
      navigate('/profile');
    }
  }, [user, loading, navigate]);
  
  const membershipPlans = [
    {
      id: 'standard',
      name: 'Standard Membership',
      price: 99,
      period: 'quarterly',
      features: [
        'Access to local BNI chapter meetings',
        'Basic networking opportunities',
        'Online member directory access',
        'BNI Connect access',
      ],
    },
    {
      id: 'premium',
      name: 'Premium Membership',
      price: 149,
      period: 'quarterly',
      features: [
        'All Standard features',
        'Priority seating at events',
        'Extended presentation time',
        'Access to premium training materials',
        'Ability to attend other chapter meetings',
      ],
      recommended: true,
    },
    {
      id: 'executive',
      name: 'Executive Membership',
      price: 249,
      period: 'quarterly',
      features: [
        'All Premium features',
        'One-on-one coaching sessions',
        'Featured in BNI directory',
        'VIP networking events',
        'Leadership opportunities',
        'Global chapter access',
      ],
    },
  ];
  
  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
  };
  
  const handleContinueToPayment = () => {
    if (selectedPlan) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePayment = async () => {
    if (!selectedPlan) return;
    
    setPaymentProcessing(true);
    setPaymentError(null);
    
    try {
      // Simulate payment processing
      // In a real implementation, you would integrate with Stripe here
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get the selected plan details
      const plan = membershipPlans.find(p => p.id === selectedPlan);
      
      // Call the API to update membership status
      const result = await updateMembership({
        membershipType: plan.name,
        paymentId: 'sim_' + Date.now(), // Simulated payment ID
        // Set end date to 3 months from now
        membershipEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      });
      
      if (result.success) {
        setStep(3);
        window.scrollTo(0, 0);
      } else {
        setPaymentError(result.message || 'Failed to update membership status');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentError('An unexpected error occurred. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };
  
  const getSelectedPlan = () => {
    return membershipPlans.find(p => p.id === selectedPlan) || {};
  };
  
  if (loading) {
    return (
      <Container>
        <div className="container">
          <LoadingMessage>Loading...</LoadingMessage>
        </div>
      </Container>
    );
  }
  
  return (
    <Container>
      <div className="container">
        <PageHeader>
          <h1>Join BNI Membership</h1>
          <p>
            Select a membership plan to unlock the full potential of BNI's global network
            and start growing your business through structured referral marketing.
          </p>
        </PageHeader>
        
        {step === 3 ? (
          <SuccessContainer>
            <SuccessIcon>
              <FaRegCheckCircle />
            </SuccessIcon>
            <h2>Welcome to BNI!</h2>
            <p>
              Your membership has been successfully activated. You now have access to all 
              the benefits of your {getSelectedPlan().name} plan.
            </p>
            <p>
              We've sent a confirmation email to your registered email address with details
              about next steps and how to make the most of your membership.
            </p>
            <ActionButton onClick={() => navigate('/profile')}>
              Go to Your Profile
            </ActionButton>
          </SuccessContainer>
        ) : (
          <Content>
            {step === 1 ? (
              <div>
                <SectionTitle>Select Your Membership Plan</SectionTitle>
                
                <PlansContainer>
                  {membershipPlans.map((plan) => (
                    <PlanCard 
                      key={plan.id} 
                      selected={selectedPlan === plan.id}
                      recommended={plan.recommended}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {plan.recommended && <RecommendedTag>Recommended</RecommendedTag>}
                      <PlanName>{plan.name}</PlanName>
                      <PlanPrice>
                        ${plan.price}
                        <PlanPeriod>/{plan.period}</PlanPeriod>
                      </PlanPrice>
                      <PlanFeatures>
                        {plan.features.map((feature, index) => (
                          <FeatureItem key={index}>
                            <FeatureIcon><FaCheck /></FeatureIcon>
                            {feature}
                          </FeatureItem>
                        ))}
                      </PlanFeatures>
                      <SelectButton 
                        selected={selectedPlan === plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                      >
                        {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                      </SelectButton>
                    </PlanCard>
                  ))}
                </PlansContainer>
                
                <ContinueButton 
                  onClick={handleContinueToPayment}
                  disabled={!selectedPlan}
                >
                  Continue to Payment
                </ContinueButton>
              </div>
            ) : (
              <div>
                <SectionTitle>Complete Your Membership Payment</SectionTitle>
                
                <OrderSummary>
                  <h3>Order Summary</h3>
                  <SummaryRow>
                    <span>Membership Plan:</span>
                    <span>{getSelectedPlan().name}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Billing Period:</span>
                    <span>{getSelectedPlan().period}</span>
                  </SummaryRow>
                  <SummaryRow total>
                    <span>Total:</span>
                    <span>${getSelectedPlan().price}</span>
                  </SummaryRow>
                </OrderSummary>
                
                {paymentError && (
                  <ErrorMessage>{paymentError}</ErrorMessage>
                )}
                
                <PaymentSection>
                  <h3>Payment Information</h3>
                  <PaymentForm>
                    <FormRow>
                      <FormGroup>
                        <Label>Card Number</Label>
                        <Input placeholder="4242 4242 4242 4242" />
                      </FormGroup>
                    </FormRow>
                    <FormRow>
                      <FormGroup>
                        <Label>Cardholder Name</Label>
                        <Input placeholder="John Smith" />
                      </FormGroup>
                    </FormRow>
                    <FormRow cols="2fr 1fr">
                      <FormGroup>
                        <Label>Expiration Date</Label>
                        <Input placeholder="MM/YY" />
                      </FormGroup>
                      <FormGroup>
                        <Label>CVV</Label>
                        <Input placeholder="123" />
                      </FormGroup>
                    </FormRow>
                    
                    <PayButton 
                      onClick={handlePayment}
                      disabled={paymentProcessing}
                    >
                      {paymentProcessing ? 'Processing...' : `Pay $${getSelectedPlan().price}`}
                    </PayButton>
                    
                    <SecurityNote>
                      🔒 All payments are secure and encrypted
                    </SecurityNote>
                  </PaymentForm>
                </PaymentSection>
                
                <BackButton onClick={() => setStep(1)}>
                  Back to Plan Selection
                </BackButton>
              </div>
            )}
          </Content>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 60px 0;
  background-color: #f8f9fa;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    color: var(--primary-color, #cd232e);
    margin-bottom: 15px;
    font-size: 2.5rem;
  }
  
  p {
    max-width: 800px;
    margin: 0 auto;
    color: #555;
    font-size: 1.1rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 1.2rem;
  padding: 40px;
`;

const Content = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  color: var(--secondary-color, #2b2928);
  font-size: 1.5rem;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const PlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const PlanCard = styled.div`
  border: 2px solid ${props => props.selected ? 'var(--primary-color, #cd232e)' : '#e0e0e0'};
  border-radius: 8px;
  padding: 25px;
  position: relative;
  transition: all 0.3s;
  background-color: ${props => props.selected ? 'rgba(205, 35, 46, 0.03)' : '#fff'};
  box-shadow: ${props => props.selected ? '0 4px 15px rgba(205, 35, 46, 0.15)' : 'none'};
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const RecommendedTag = styled.div`
  position: absolute;
  top: -12px;
  right: 20px;
  background-color: var(--primary-color, #cd232e);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const PlanName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--secondary-color, #2b2928);
`;

const PlanPrice = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--primary-color, #cd232e);
  display: flex;
  align-items: baseline;
`;

const PlanPeriod = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: #777;
  margin-left: 5px;
`;

const PlanFeatures = styled.ul`
  list-style: none;
  margin: 0 0 20px;
  padding: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  font-size: 0.95rem;
`;

const FeatureIcon = styled.span`
  color: #28a745;
  margin-right: 10px;
  font-size: 0.9rem;
`;

const SelectButton = styled.button`
  width: 100%;
  background-color: ${props => props.selected ? 'var(--primary-color, #cd232e)' : '#f1f1f1'};
  color: ${props => props.selected ? 'white' : '#333'};
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: ${props => props.selected ? '#b01c26' : '#e1e1e1'};
  }
`;

const ContinueButton = styled.button`
  width: 100%;
  background-color: var(--primary-color, #cd232e);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #b01c26;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const OrderSummary = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 30px;
  
  h3 {
    margin-top: 0;
    margin-bottom: 15px;
    font-size: 1.2rem;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 10px;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: ${props => props.total ? '10px 0 0' : '0'};
  border-top: ${props => props.total ? '1px solid #e0e0e0' : 'none'};
  font-weight: ${props => props.total ? '600' : 'normal'};
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 12px 15px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const PaymentSection = styled.div`
  margin-bottom: 30px;
  
  h3 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 1.2rem;
  }
`;

const PaymentForm = styled.div`
  background-color: #fff;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.cols || '1fr'};
  gap: 15px;
  margin-bottom: 20px;
`;

const FormGroup = styled.div``;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color, #cd232e);
  }
`;

const PayButton = styled.button`
  width: 100%;
  background-color: var(--primary-color, #cd232e);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 15px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #b01c26;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const SecurityNote = styled.div`
  text-align: center;
  margin-top: 15px;
  color: #666;
  font-size: 0.9rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #555;
  text-decoration: underline;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  
  &:hover {
    color: var(--primary-color, #cd232e);
  }
`;

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  
  h2 {
    color: var(--secondary-color, #2b2928);
    margin: 20px 0;
  }
  
  p {
    color: #555;
    margin-bottom: 15px;
    line-height: 1.6;
  }
`;

const SuccessIcon = styled.div`
  font-size: 60px;
  color: #28a745;
`;

const ActionButton = styled.button`
  background-color: var(--primary-color, #cd232e);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #b01c26;
  }
`;

export default MembershipPage;