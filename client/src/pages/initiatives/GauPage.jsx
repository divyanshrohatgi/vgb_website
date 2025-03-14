// client/src/pages/initiatives/GauPage.jsx
import React from 'react';
import styled from 'styled-components';

const GauPage = () => {
  return (
    <PageContainer>
      <HeroBanner>
        <HeroOverlay>
          <HeroContent>
            <HeroTitle>Gau Initiative</HeroTitle>
            <HeroSubtitle>Protecting and honoring animals in the Vedic tradition</HeroSubtitle>
          </HeroContent>
        </HeroOverlay>
      </HeroBanner>

      <div className="container">
        <ContentSection>
          <SectionTitle>Our Gau Initiative</SectionTitle>
          <ContentText>
            <p>
              In Vedic tradition, the cow (Gau) is considered sacred and symbolizes life's sustaining force. Our Gau initiative is dedicated to the protection and care of cows and all animals, promoting compassionate treatment, sustainable practices, and raising awareness about the importance of animal welfare.
            </p>
            <p>
              Through education, advocacy, and direct action, we work to create a world where all living beings are treated with respect and dignity, in accordance with ancient Vedic principles.
            </p>
          </ContentText>
          
          <KeyAreas>
            <AreaTitle>Key Focus Areas</AreaTitle>
            <AreaGrid>
              <AreaItem>
                <AreaIcon>🐄</AreaIcon>
                <AreaName>Cow Protection</AreaName>
                <AreaDescription>Supporting gaushalas (cow shelters) and promoting the ethical treatment of cows throughout India.</AreaDescription>
              </AreaItem>
              <AreaItem>
                <AreaIcon>🌱</AreaIcon>
                <AreaName>Sustainable Farming</AreaName>
                <AreaDescription>Promoting traditional farming methods that honor the sacred relationship between humans, animals, and the land.</AreaDescription>
              </AreaItem>
              <AreaItem>
                <AreaIcon>📚</AreaIcon>
                <AreaName>Education</AreaName>
                <AreaDescription>Raising awareness about the importance of animal welfare and the cultural significance of cows in Indian tradition.</AreaDescription>
              </AreaItem>
              <AreaItem>
                <AreaIcon>🧪</AreaIcon>
                <AreaName>Cow-Based Products</AreaName>
                <AreaDescription>Promoting sustainable, cruelty-free products derived from cows, including organic fertilizers and traditional remedies.</AreaDescription>
              </AreaItem>
            </AreaGrid>
          </KeyAreas>
          
          <GetInvolved>
            <InvolvedTitle>How You Can Help</InvolvedTitle>
            <p>Join us in our mission to protect and honor animals, particularly cows, which hold a special place in India's cultural and spiritual heritage.</p>
            <ActionButtons>
              <ActionButton to="/donate">Make a Donation</ActionButton>
              <ActionButton to="/volunteer">Volunteer</ActionButton>
              <ActionButton to="/contact">Partner With Us</ActionButton>
            </ActionButtons>
          </GetInvolved>
        </ContentSection>
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
  background-image: url('https://web-assets.same.dev/1675577225/3977124565.png');
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

const ContentSection = styled.section`
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
  margin-bottom: 25px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: #cd232e;
  }
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ContentText = styled.div`
  color: #444;
  line-height: 1.8;
  
  p {
    margin-bottom: 20px;
    font-size: 1.1rem;
  }
`;

const KeyAreas = styled.div`
  margin: 40px 0;
`;

const AreaTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 25px;
`;

const AreaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AreaItem = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const AreaIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
`;

const AreaName = styled.h4`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const AreaDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const GetInvolved = styled.div`
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  
  p {
    color: #444;
    max-width: 700px;
    margin: 0 auto 25px;
    font-size: 1.1rem;
    line-height: 1.8;
  }
`;

const InvolvedTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
`;

const ActionButton = styled.a`
  display: inline-block;
  background-color: #cd232e;
  color: white;
  padding: 12px 25px;
  border-radius: 5px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  
  &:hover {
    background-color: #b01c26;
    transform: translateY(-3px);
  }
`;

export default GauPage;