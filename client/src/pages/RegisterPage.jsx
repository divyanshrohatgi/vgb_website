// client/src/pages/RegisterPage.jsx
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AuthContext from '../context/AuthContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: ''
    },
    profession: '',
    organization: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    }
  });

  const [formError, setFormError] = useState('');
  const { register, error, user, clearError } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
    
    // Clear any previous auth errors when component mounts
    clearError();
    
    // eslint-disable-next-line
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else if (name.startsWith('socialMedia.')) {
      const socialField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted, validating...');

    // Validate form
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return;
    }

    // Clear form error
    setFormError('');

    try {
      const result = await register(formData);
      console.log('Registration result:', result);
      
      if (result.success) {
        if (result.requiresVerification) {
          console.log('Email verification required, redirecting to verification page');
          navigate('/verify-email', { state: { email: formData.email } });
        } else {
          console.log('Registration successful, redirecting to profile');
          navigate('/profile');
        }
      } else {
        console.log('Registration failed:', result.message);
        setFormError(result.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration submission:', error);
      setFormError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <RegisterContainer>
      <div className="container">
        <RegisterWrapper>
          <RegisterHeader>
            <RegisterLogo src="/vgb-logo.png" alt="Vishwa Guru Bharat Logo" />
            <RegisterTitle>Create Account</RegisterTitle>
          </RegisterHeader>

          {(formError || error) && <ErrorMessage>{formError || error}</ErrorMessage>}

          <RegisterForm onSubmit={handleSubmit}>
            <SectionTitle>Personal Information</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="name">Full Name*</FormLabel>
                <FormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="email">Email*</FormLabel>
                <FormInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="phone">Phone Number*</FormLabel>
                <FormInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                <FormInput
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>

            <SectionTitle>Address Information</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="street">Street Address</FormLabel>
                <FormInput
                  type="text"
                  id="street"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  placeholder="Enter street address"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="city">City</FormLabel>
                <FormInput
                  type="text"
                  id="city"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="state">State</FormLabel>
                <FormInput
                  type="text"
                  id="state"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="country">Country</FormLabel>
                <FormInput
                  type="text"
                  id="country"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="pincode">Pincode</FormLabel>
                <FormInput
                  type="text"
                  id="pincode"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                />
              </FormGroup>
            </FormRow>

            <SectionTitle>Professional Information</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="profession">Profession</FormLabel>
                <FormInput
                  type="text"
                  id="profession"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Enter your profession"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="organization">Organization</FormLabel>
                <FormInput
                  type="text"
                  id="organization"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  placeholder="Enter your organization"
                />
              </FormGroup>
            </FormRow>

            <SectionTitle>Social Media (Optional)</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="facebook">Facebook</FormLabel>
                <FormInput
                  type="url"
                  id="facebook"
                  name="socialMedia.facebook"
                  value={formData.socialMedia.facebook}
                  onChange={handleChange}
                  placeholder="Facebook profile URL"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="twitter">Twitter</FormLabel>
                <FormInput
                  type="url"
                  id="twitter"
                  name="socialMedia.twitter"
                  value={formData.socialMedia.twitter}
                  onChange={handleChange}
                  placeholder="Twitter profile URL"
                />
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
                <FormInput
                  type="url"
                  id="linkedin"
                  name="socialMedia.linkedin"
                  value={formData.socialMedia.linkedin}
                  onChange={handleChange}
                  placeholder="LinkedIn profile URL"
                />
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="instagram">Instagram</FormLabel>
                <FormInput
                  type="url"
                  id="instagram"
                  name="socialMedia.instagram"
                  value={formData.socialMedia.instagram}
                  onChange={handleChange}
                  placeholder="Instagram profile URL"
                />
              </FormGroup>
            </FormRow>

            <SectionTitle>Security</SectionTitle>
            <FormRow>
              <FormGroup>
                <FormLabel htmlFor="password">Password*</FormLabel>
                <FormInput
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                  minLength="6"
                />
                <FormHint>Minimum 6 characters</FormHint>
              </FormGroup>

              <FormGroup>
                <FormLabel htmlFor="confirmPassword">Confirm Password*</FormLabel>
                <FormInput
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                  minLength="6"
                />
              </FormGroup>
            </FormRow>

            <TermsText>
              By creating an account, you agree to our
              <TermsLink to="/terms"> Terms of Service</TermsLink> and
              <TermsLink to="/privacy"> Privacy Policy</TermsLink>.
            </TermsText>

            <SubmitButton type="submit">Create Account</SubmitButton>
          </RegisterForm>

          <LoginSection>
            <LoginText>Already have an account?</LoginText>
            <LoginLink to="/login">Sign In</LoginLink>
          </LoginSection>
        </RegisterWrapper>
      </div>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  padding: 80px 0;
  background-color: #f8f8f8;
`;

const RegisterWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const RegisterLogo = styled.img`
  max-width: 150px;
  margin-bottom: 20px;
`;

const RegisterTitle = styled.h1`
  font-size: 1.8rem;
  color: var(--secondary-color, #2b2928);
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--secondary-color, #2b2928);
  margin: 30px 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const RegisterForm = styled.form`
  margin-bottom: 30px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormGroup = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--secondary-color, #2b2928);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: var(--primary-color, #cd232e);
    outline: none;
  }
`;

const FormHint = styled.div`
  font-size: 0.8rem;
  color: #666;
  margin-top: 5px;
`;

const TermsText = styled.p`
  margin: 20px 0;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;

const TermsLink = styled(Link)`
  color: var(--primary-color, #cd232e);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: var(--primary-color, #cd232e);
  color: #fff;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b01c26;
  }
`;

const LoginSection = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const LoginText = styled.span`
  margin-right: 10px;
  color: #666;
`;

const LoginLink = styled(Link)`
  color: var(--primary-color, #cd232e);
  font-weight: 600;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default RegisterPage;