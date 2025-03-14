// client/src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterSection>
            <FooterLogo>
              <img src="https://web-assets.same.dev/335287695/52350043.png" alt="Vishwa Guru Bharat Logo" />
            </FooterLogo>
            <FooterText>
              Vishwa Guru Bharat is dedicated to reestablishing India as a global leader in spiritual wisdom,
              sustainable practices, and holistic development through Vedic principles.
            </FooterText>
            <SocialLinks>
              <SocialLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </SocialLink>
              <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialLink>
              <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialLink>
              <SocialLink href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube />
              </SocialLink>
            </SocialLinks>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Explore</FooterHeading>
            <FooterLinksList>
              <FooterLinkItem>
                <FooterLink to="/">Home</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/about">About Us</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/donate">Donate</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/experience">VGB Experience</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/community">Community</FooterLink>
              </FooterLinkItem>
            </FooterLinksList>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Our Initiatives</FooterHeading>
            <FooterLinksList>
              <FooterLinkItem>
                <FooterLink to="/5elements">5 Elements</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/gau">Gau (Animals)</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/ganga">Ganga (Water)</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/gayatri">Gayatri (Mantras)</FooterLink>
              </FooterLinkItem>
              <FooterLinkItem>
                <FooterLink to="/gita">Gita (Ancient Wisdom)</FooterLink>
              </FooterLinkItem>
            </FooterLinksList>
          </FooterSection>
          
          <FooterSection>
            <FooterHeading>Contact Us</FooterHeading>
            <ContactList>
              <ContactItem>
                <ContactIcon>
                  <FaMapMarkerAlt />
                </ContactIcon>
                <ContactText>Jammu, Distt. Kishtwar, J&K, India</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FaPhone />
                </ContactIcon>
                <ContactText>+91-9103544414</ContactText>
              </ContactItem>
              <ContactItem>
                <ContactIcon>
                  <FaEnvelope />
                </ContactIcon>
                <ContactText>info@vishwagurubharat.org</ContactText>
              </ContactItem>
            </ContactList>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <Copyright>
            &copy; {new Date().getFullYear()} Vishwa Guru Bharat. All Rights Reserved.
          </Copyright>
          <FooterBottomLinks>
            <FooterBottomLink to="/terms">Terms of Service</FooterBottomLink>
            <FooterBottomLink to="/privacy">Privacy Policy</FooterBottomLink>
            <FooterBottomLink to="/sitemap">Sitemap</FooterBottomLink>
          </FooterBottomLinks>
        </FooterBottom>
      </div>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  background-color: #2b2928;
  color: #f1f1f1;
  padding: 60px 0 0;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  padding-bottom: 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const FooterSection = styled.div``;

const FooterLogo = styled.div`
  margin-bottom: 20px;
  
  img {
    max-width: 150px;
    filter: brightness(1.2);
  }
`;

const FooterText = styled.p`
  line-height: 1.6;
  color: #ccc;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #fff;
  font-size: 16px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #cd232e;
    transform: translateY(-3px);
  }
`;

const FooterHeading = styled.h3`
  color: #fff;
  font-size: 1.3rem;
  margin-bottom: 25px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #cd232e;
  }
`;

const FooterLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FooterLinkItem = styled.li`
  margin-bottom: 12px;
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #cd232e;
  }
`;

const ContactList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ContactItem = styled.li`
  display: flex;
  margin-bottom: 15px;
`;

const ContactIcon = styled.div`
  color: #cd232e;
  margin-right: 15px;
  font-size: 18px;
  line-height: 1.6;
`;

const ContactText = styled.div`
  color: #ccc;
  line-height: 1.6;
`;

const FooterBottom = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #aaa;
  font-size: 0.9rem;
`;

const FooterBottomLinks = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const FooterBottomLink = styled(Link)`
  color: #aaa;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.3s;
  
  &:hover {
    color: #cd232e;
  }
`;

export default Footer;