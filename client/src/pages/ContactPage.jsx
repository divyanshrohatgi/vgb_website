// client/src/pages/ContactPage.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaCheck } from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus({
      submitted: true,
      error: false,
      message: 'Thank you for your message! We will get back to you soon.'
    });
    // Reset form after successful submission
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };
  
  return (
    <PageContainer>
      <HeroBanner>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>Contact Us</HeroTitle>
            <HeroSubtitle>Get in touch with the Vishwa Guru Bharat team</HeroSubtitle>
          </HeroContent>
        </HeroOverlay>
      </HeroBanner>

      <div className="container">
        <ContactSection>
          <ContactInfo>
            <ContactHeader>
              <ContactTitle>Get In Touch</ContactTitle>
              <ContactSubtitle>
                We'd love to hear from you. Whether you have a question about our initiatives, volunteering, or anything else, our team is ready to answer all your questions.
              </ContactSubtitle>
            </ContactHeader>
            
            <InfoItems>
              <InfoItem>
                <InfoIcon><FaMapMarkerAlt /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Visit Us</InfoLabel>
                  <InfoText>Sanyukt Shakti Bhawan, Jammu, J&K, India</InfoText>
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon><FaPhone /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Call Us</InfoLabel>
                  <InfoText>+91-9103544414</InfoText>
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon><FaEnvelope /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Email Us</InfoLabel>
                  <InfoText>info@vishwagurubharat.org</InfoText>
                </InfoContent>
              </InfoItem>
              <InfoItem>
                <InfoIcon><FaClock /></InfoIcon>
                <InfoContent>
                  <InfoLabel>Working Hours</InfoLabel>
                  <InfoText>Monday - Saturday: 9am - 6pm</InfoText>
                </InfoContent>
              </InfoItem>
            </InfoItems>
            
            <SocialLinks>
              <SocialTitle>Connect With Us</SocialTitle>
              <SocialButtons>
                <SocialButton href="#" bg="#3b5998">Facebook</SocialButton>
                <SocialButton href="#" bg="#1da1f2">Twitter</SocialButton>
                <SocialButton href="#" bg="#c32aa3">Instagram</SocialButton>
                <SocialButton href="#" bg="#ff0000">YouTube</SocialButton>
              </SocialButtons>
            </SocialLinks>
          </ContactInfo>
          
          <ContactForm onSubmit={handleSubmit}>
            <FormTitle>Send Us A Message</FormTitle>
            
            {formStatus.submitted && (
              <SuccessMessage>
                <SuccessIcon><FaCheck /></SuccessIcon>
                {formStatus.message}
              </SuccessMessage>
            )}
            
            <FormRow>
              <FormGroup>
                <FormLabel>Your Name*</FormLabel>
                <FormInput 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Your Email*</FormLabel>
                <FormInput 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="Enter your email address"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormRow>
              <FormGroup>
                <FormLabel>Phone Number</FormLabel>
                <FormInput 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  placeholder="Enter your phone number"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Subject*</FormLabel>
                <FormInput 
                  type="text" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  placeholder="What is this regarding?"
                  required
                />
              </FormGroup>
            </FormRow>
            
            <FormGroup>
              <FormLabel>Message*</FormLabel>
              <FormTextarea 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder="Write your message here..."
                rows="6"
                required
              />
            </FormGroup>
            
            <SubmitButton type="submit" disabled={formStatus.submitted}>
              {formStatus.submitted ? 'Message Sent' : 'Send Message'}
            </SubmitButton>
          </ContactForm>
        </ContactSection>
        
        <MapSection>
          <MapTitle>Our Location</MapTitle>
          <MapFrame>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26967.07831069883!2d74.83855355!3d32.73228885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e84ea3f8cef6f%3A0x5f25bddf0f4c8a89!2sJammu%2C%20Jammu%20and%20Kashmir!5e0!3m2!1sen!2sin!4v1710340912345!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Vishwa Guru Bharat Location"
            ></iframe>
          </MapFrame>
        </MapSection>
        
        <FAQSection>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <FAQGrid>
            <FAQItem>
              <FAQQuestion>How can I join Vishwa Guru Bharat?</FAQQuestion>
              <FAQAnswer>
                You can join as a volunteer, supporter, or member by filling out the contact form above or visiting any of our local chapters. We welcome everyone who shares our vision of promoting India's ancient wisdom.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Do you accept donations?</FAQQuestion>
              <FAQAnswer>
                Yes, we welcome donations to support our various initiatives. You can donate through our website or contact us directly for more information on how to contribute.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>How can I volunteer with your organization?</FAQQuestion>
              <FAQAnswer>
                We offer various volunteering opportunities across our initiatives. Fill out our contact form specifying your interest in volunteering, and our team will get in touch with available opportunities.
              </FAQAnswer>
            </FAQItem>
            <FAQItem>
              <FAQQuestion>Do you have chapters outside of India?</FAQQuestion>
              <FAQAnswer>
                Yes, we have chapters in several countries around the world. Contact us to find the nearest chapter to you or to explore the possibility of starting a new chapter in your area.
              </FAQAnswer>
            </FAQItem>
          </FAQGrid>
        </FAQSection>
      </div>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  padding-bottom: 60px;
`;

const HeroBanner = styled.div`
  height: 350px;
  background-image: url('https://web-assets.same.dev/2691685965/1462887440.png');
  background-size: cover;
  background-position: center;
  position: relative;
  margin-bottom: 50px;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroContent = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 15px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2.3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.3rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ContactSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 50px;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const ContactHeader = styled.div`
  margin-bottom: 30px;
`;

const ContactTitle = styled.h2`
  color: #cd232e;
  font-size: 2rem;
  margin-bottom: 15px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ContactSubtitle = styled.p`
  color: #444;
  line-height: 1.8;
  font-size: 1.1rem;
`;

const InfoItems = styled.div`
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: rgba(205, 35, 46, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #cd232e;
  font-size: 1.2rem;
  margin-right: 15px;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.h4`
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 5px;
`;

const InfoText = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
`;

const SocialLinks = styled.div``;

const SocialTitle = styled.h3`
  color: #333;
  font-size: 1.3rem;
  margin-bottom: 15px;
`;

const SocialButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SocialButton = styled.a`
  display: inline-block;
  background-color: ${props => props.bg || '#333'};
  color: white;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-3px);
  }
`;

const ContactForm = styled.form`
  background-color: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const FormTitle = styled.h2`
  color: #cd232e;
  font-size: 2rem;
  margin-bottom: 25px;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const SuccessMessage = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SuccessIcon = styled.span`
  color: #28a745;
  font-size: 1.2rem;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  color: #333;
  font-weight: 500;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #cd232e;
    outline: none;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #cd232e;
    outline: none;
  }
`;

const SubmitButton = styled.button`
  background-color: #cd232e;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #b01c26;
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const MapSection = styled.section`
  margin-bottom: 50px;
`;

const MapTitle = styled.h2`
  color: #cd232e;
  font-size: 2rem;
  margin-bottom: 25px;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const MapFrame = styled.div`
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FAQSection = styled.section`
  background-color: white;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const SectionTitle = styled.h2`
  color: #cd232e;
  font-size: 2rem;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #cd232e;
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const FAQGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FAQItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const FAQQuestion = styled.h3`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const FAQAnswer = styled.p`
  color: #666;
  line-height: 1.7;
  font-size: 1rem;
`;

export default ContactPage;