import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaLinkedin, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      // In a real app, you'd send this to your backend
    }
  };

  return (
    <FooterContainer>
      <MainFooter>
        <div className="container">
          <FooterGrid>
            <FooterColumn>
              <FooterTitle>The BNI Experience</FooterTitle>
              <FooterLink to="/the-bni-experience">The BNI Experience</FooterLink>
              <FooterLink to="/global-markets">Our Global Community</FooterLink>
              <FooterLink to="/my-bni-stories">My BNI Story</FooterLink>
              <FooterLink to="https://bnifranchise.com">BNI Franchising</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>About Us</FooterTitle>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/about/leadership">Leadership</FooterLink>
              <FooterLink to="/about/national-directors">National Directors</FooterLink>
              <FooterLink to="/about/our-founder">Our Founder</FooterLink>
              <FooterLink to="/about/careers">Careers</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>The Latest</FooterTitle>
              <FooterLink to="/the-latest">The Latest</FooterLink>
              <FooterLink to="/the-latest/#blog-and-news">Blog & News</FooterLink>
              <FooterLink to="/category/networking-tips">Networking Tips</FooterLink>
              <FooterLink to="/global-events">Global Events</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Quick Links</FooterTitle>
              <FooterLink to="https://bnipartner.com">Strategic Alliance</FooterLink>
              <FooterLink to="https://www.bnifoundation.org">BNI Foundation</FooterLink>
              <FooterLink to="/contact-us">Contact Us</FooterLink>
            </FooterColumn>

            <FooterColumn>
              <FooterTitle>Member Services</FooterTitle>
              <FooterLink to="https://www.bniconnectglobal.com">BNI Connect</FooterLink>
              <FooterLink to="http://bnibusinessbuilder.com">BNI Business Builder</FooterLink>
              <FooterLink to="http://bnibrandshare.com">BNI Brandshare</FooterLink>
              <FooterLink to="http://www.bnipromos.com">BNI US Store</FooterLink>
              <FooterLink to="https://bniglobalstore.com">BNI Global Store</FooterLink>
            </FooterColumn>

            <ContactColumn>
              <FooterLink to="/contact-us">Contact Us</FooterLink>
              <ContactInfo>
                <ContactItem>
                  <FaPhone /> In U.S. (800)-825-8286
                </ContactItem>
                <ContactItem>
                  <FaEnvelope /> Outside U.S. support@bni.com
                </ContactItem>
                <ContactItem>
                  <FaMapMarkerAlt /> 3430 Toringdon Way, Suite 300 Charlotte, NC 28277
                </ContactItem>
              </ContactInfo>
            </ContactColumn>
          </FooterGrid>
        </div>
      </MainFooter>

      <NewsletterSection>
        <div className="container">
          <NewsletterContainer>
            <NewsletterTitle>BNI SuccessNet<sup>TM</sup></NewsletterTitle>
            <NewsletterText>Sign up for exclusive networking tips and more.</NewsletterText>
            {isSubscribed ? (
              <ThankYouMessage>Thank you for subscribing!</ThankYouMessage>
            ) : (
              <SubscribeForm onSubmit={handleSubmit}>
                <SubscribeInput
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <SubscribeButton type="submit">
                  Submit
                </SubscribeButton>
              </SubscribeForm>
            )}
          </NewsletterContainer>
        </div>
      </NewsletterSection>

      <BottomFooter>
        <div className="container">
          <BottomFooterContent>
            <FooterLinks>
              <FooterBottomLink href="/cookie-policy">Cookie Policy</FooterBottomLink>
              <FooterBottomLink href="/privacy">Privacy Policy</FooterBottomLink>
              <FooterBottomLink href="/tos">Terms and Conditions</FooterBottomLink>
              <Copyright>© 2025 BNI Global, LLC</Copyright>
            </FooterLinks>
            <SocialLinks>
              <SocialLink href="https://www.linkedin.com/company/bni" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </SocialLink>
              <SocialLink href="https://www.youtube.com/user/BNIOfficialChannel" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </SocialLink>
            </SocialLinks>
          </BottomFooterContent>
        </div>
      </BottomFooter>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #f5f5f5;
`;

const MainFooter = styled.div`
  padding: 50px 0;
  background-color: #4c4a4c;
  color: #fff;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FooterColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContactColumn = styled(FooterColumn)`
  grid-column: span 2;

  @media (max-width: 992px) {
    grid-column: span 1;
  }
`;

const FooterTitle = styled.h4`
  font-size: 1.1rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

const FooterLink = styled(Link)`
  color: #fff;
  margin-bottom: 10px;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
`;

const ContactInfo = styled.div`
  margin-top: 15px;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  svg {
    margin-right: 10px;
  }
`;

const NewsletterSection = styled.div`
  background-color: #2b2928;
  color: #fff;
  padding: 25px 0;
`;

const NewsletterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NewsletterTitle = styled.h4`
  font-size: 1.2rem;
  margin-bottom: 5px;
  font-weight: 600;
`;

const NewsletterText = styled.p`
  margin-bottom: 15px;
`;

const SubscribeForm = styled.form`
  display: flex;
  width: 100%;
  max-width: 400px;
`;

const SubscribeInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  font-size: 1rem;
`;

const SubscribeButton = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0 20px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b01c26;
  }
`;

const ThankYouMessage = styled.div`
  color: #fff;
  font-weight: 600;
  margin-top: 10px;
`;

const BottomFooter = styled.div`
  background-color: #1a1a1a;
  color: #888;
  padding: 15px 0;
  font-size: 0.9rem;
`;

const BottomFooterContent = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterLinks = styled.div`
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }
`;

const FooterBottomLink = styled.a`
  color: #888;
  margin-right: 20px;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;

const Copyright = styled.span`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
`;

const SocialLink = styled.a`
  color: #888;
  font-size: 1.2rem;
  margin-left: 15px;
  transition: color 0.3s;

  &:hover {
    color: #fff;
  }
`;

export default Footer;
