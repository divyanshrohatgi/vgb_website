import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // In a real app, you would connect to your API here
    console.log('Login submitted:', { email, password });

    // Reset form
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <LoginContainer>
      <div className="container">
        <LoginWrapper>
          <LoginHeader>
            <LoginLogo src="https://web-assets.same.dev/4078305203/3980109376.png" alt="BNI Logo" />
            <LoginTitle>Member Login</LoginTitle>
          </LoginHeader>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </FormGroup>

            <FormGroup>
              <FormLabel htmlFor="password">Password</FormLabel>
              <FormInput
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </FormGroup>

            <ForgotPassword to="/forgot-password">Forgot password?</ForgotPassword>

            <SubmitButton type="submit">Sign In</SubmitButton>
          </LoginForm>

          <RegisterSection>
            <RegisterText>Don't have an account?</RegisterText>
            <RegisterLink to="/register">Create Account</RegisterLink>
          </RegisterSection>
        </LoginWrapper>
      </div>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  padding: 80px 0;
  background-color: #f8f8f8;
`;

const LoginWrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const LoginHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const LoginLogo = styled.img`
  max-width: 120px;
  margin-bottom: 20px;
`;

const LoginTitle = styled.h1`
  font-size: 1.8rem;
  color: var(--secondary-color);
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: center;
`;

const LoginForm = styled.form`
  margin-bottom: 30px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--secondary-color);
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;

  &:focus {
    border-color: var(--primary-color);
    outline: none;
  }
`;

const ForgotPassword = styled(Link)`
  display: block;
  text-align: right;
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: var(--primary-color);
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

const RegisterSection = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

const RegisterText = styled.span`
  margin-right: 10px;
  color: #666;
`;

const RegisterLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export default LoginPage;
