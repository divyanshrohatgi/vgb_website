import React from 'react';
import styled from 'styled-components';
import { FaLinkedinIn, FaTwitter, FaEnvelope, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const TeamPage = () => {
  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader>
        <HeaderOverlay>
          <Container>
            <HeaderContent>
              <PageTitle>Our Team</PageTitle>
              <PageSubtitle>Meet the dedicated individuals behind Vishwa Guru Bharat</PageSubtitle>
            </HeaderContent>
          </Container>
        </HeaderOverlay>
      </PageHeader>

      {/* Leadership Section */}
      <SectionContainer>
        <Container>
          <SectionTitle>Leadership</SectionTitle>
          <SectionDescription>
            Our organization is guided by visionaries who are committed to reestablishing
            India's position as Vishwa Guru through dedication to Vedic principles and practices.
          </SectionDescription>

          <LeadershipGrid>
            {/* Founder & President */}
            <LeaderCard>
              <LeaderImageWrapper>
                <LeaderImage src="https://web-assets.same.dev/2691685965/1462887440.png" alt="Dr. Rajendra Prasad" />
              </LeaderImageWrapper>
              <LeaderInfo>
                <LeaderName>Dr. Rajendra Prasad</LeaderName>
                <LeaderPosition>Founder & President</LeaderPosition>
                <LeaderBio>
                  With over 30 years of experience in Vedic studies and spiritual practice, Dr. Prasad has dedicated his life
                  to preserving and promoting India's ancient wisdom. He holds a Ph.D. in Sanskrit and has authored numerous
                  books on Vedic philosophy.
                </LeaderBio>
                <SocialLinks>
                  <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </SocialLink>
                  <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
                    <FaTwitter />
                  </SocialLink>
                  <SocialLink href="mailto:rajendra@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </SocialLink>
                </SocialLinks>
                <LeaderQuote>
                  <QuoteIconLeft><FaQuoteLeft /></QuoteIconLeft>
                  Our work is not just about preserving tradition, but about making ancient wisdom relevant
                  to solve today's most pressing challenges.
                  <QuoteIconRight><FaQuoteRight /></QuoteIconRight>
                </LeaderQuote>
              </LeaderInfo>
            </LeaderCard>

            {/* Vice President */}
            <LeaderCard>
              <LeaderImageWrapper>
                <LeaderImage src="https://web-assets.same.dev/1306262657/3509351711.png" alt="Dr. Ananya Sharma" />
              </LeaderImageWrapper>
              <LeaderInfo>
                <LeaderName>Dr. Ananya Sharma</LeaderName>
                <LeaderPosition>Vice President</LeaderPosition>
                <LeaderBio>
                  Dr. Sharma combines her background in environmental science with deep knowledge of Vedic environmental
                  principles. She leads our sustainability initiatives and has been instrumental in developing our
                  5 Elements conservation program.
                </LeaderBio>
                <SocialLinks>
                  <SocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </SocialLink>
                  <SocialLink href="https://twitter.com" target="_blank" aria-label="Twitter">
                    <FaTwitter />
                  </SocialLink>
                  <SocialLink href="mailto:ananya@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </SocialLink>
                </SocialLinks>
                <LeaderQuote>
                  <QuoteIconLeft><FaQuoteLeft /></QuoteIconLeft>
                  Ancient India understood the delicate balance of nature millennia before modern environmentalism.
                  We must revive this wisdom for our planet's future.
                  <QuoteIconRight><FaQuoteRight /></QuoteIconRight>
                </LeaderQuote>
              </LeaderInfo>
            </LeaderCard>
          </LeadershipGrid>
        </Container>
      </SectionContainer>

      {/* Core Team Section */}
      <SectionContainer lightBg>
        <Container>
          <SectionTitle>Core Team</SectionTitle>
          <SectionDescription>
            Our diverse and talented team brings expertise from various fields to advance
            our mission of promoting Vedic wisdom and practices.
          </SectionDescription>

          <TeamGrid>
            <TeamMember>
              <TeamMemberImage src="https://web-assets.same.dev/1675577225/3977124565.png" alt="Arjun Mehta" />
              <TeamMemberInfo>
                <TeamMemberName>Arjun Mehta</TeamMemberName>
                <TeamMemberPosition>Director of Gau Initiative</TeamMemberPosition>
                <TeamMemberSocial>
                  <TeamSocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </TeamSocialLink>
                  <TeamSocialLink href="mailto:arjun@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </TeamSocialLink>
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamMember>

            <TeamMember>
              <TeamMemberImage src="https://web-assets.same.dev/1645611323/2017019684.png" alt="Priya Patel" />
              <TeamMemberInfo>
                <TeamMemberName>Priya Patel</TeamMemberName>
                <TeamMemberPosition>Director of Ganga Initiative</TeamMemberPosition>
                <TeamMemberSocial>
                  <TeamSocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </TeamSocialLink>
                  <TeamSocialLink href="mailto:priya@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </TeamSocialLink>
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamMember>

            <TeamMember>
              <TeamMemberImage src="https://web-assets.same.dev/1591743426/2260428846.png" alt="Dr. Vikram Singh" />
              <TeamMemberInfo>
                <TeamMemberName>Dr. Vikram Singh</TeamMemberName>
                <TeamMemberPosition>Director of Gita Initiative</TeamMemberPosition>
                <TeamMemberSocial>
                  <TeamSocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </TeamSocialLink>
                  <TeamSocialLink href="mailto:vikram@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </TeamSocialLink>
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamMember>

            <TeamMember>
              <TeamMemberImage src="https://web-assets.same.dev/335287695/52350043.png" alt="Meera Agarwal" />
              <TeamMemberInfo>
                <TeamMemberName>Meera Agarwal</TeamMemberName>
                <TeamMemberPosition>Director of Gayatri Initiative</TeamMemberPosition>
                <TeamMemberSocial>
                  <TeamSocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </TeamSocialLink>
                  <TeamSocialLink href="mailto:meera@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </TeamSocialLink>
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamMember>

            <TeamMember>
              <TeamMemberImage src="https://web-assets.same.dev/2691685965/1462887440.png" alt="Ramesh Iyer" />
              <TeamMemberInfo>
                <TeamMemberName>Ramesh Iyer</TeamMemberName>
                <TeamMemberPosition>Director of Guru Initiative</TeamMemberPosition>
                <TeamMemberSocial>
                  <TeamSocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </TeamSocialLink>
                  <TeamSocialLink href="mailto:ramesh@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </TeamSocialLink>
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamMember>

            <TeamMember>
              <TeamMemberImage src="https://web-assets.same.dev/1306262657/3509351711.png" alt="Lakshmi Krishnan" />
              <TeamMemberInfo>
                <TeamMemberName>Lakshmi Krishnan</TeamMemberName>
                <TeamMemberPosition>Community Outreach Coordinator</TeamMemberPosition>
                <TeamMemberSocial>
                  <TeamSocialLink href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                    <FaLinkedinIn />
                  </TeamSocialLink>
                  <TeamSocialLink href="mailto:lakshmi@vishwagurubharat.org" aria-label="Email">
                    <FaEnvelope />
                  </TeamSocialLink>
                </TeamMemberSocial>
              </TeamMemberInfo>
            </TeamMember>
          </TeamGrid>
        </Container>
      </SectionContainer>

      {/* Advisors Section */}
      <SectionContainer>
        <Container>
          <SectionTitle>Advisory Board</SectionTitle>
          <SectionDescription>
            Our advisory board consists of distinguished experts who provide strategic guidance
            and support for our initiatives and programs.
          </SectionDescription>

          <AdvisorsGrid>
            <AdvisorCard>
              <AdvisorImage src="https://web-assets.same.dev/1675577225/3977124565.png" alt="Dr. Sanjay Mishra" />
              <AdvisorInfo>
                <AdvisorName>Dr. Sanjay Mishra</AdvisorName>
                <AdvisorSpecialty>Vedic Scholar & Environmental Scientist</AdvisorSpecialty>
                <AdvisorBio>
                  Dr. Mishra advises on integrating traditional Vedic environmental practices with
                  modern scientific approaches to conservation.
                </AdvisorBio>
              </AdvisorInfo>
            </AdvisorCard>

            <AdvisorCard>
              <AdvisorImage src="https://web-assets.same.dev/1645611323/2017019684.png" alt="Prof. Radha Krishnan" />
              <AdvisorInfo>
                <AdvisorName>Prof. Radha Krishnan</AdvisorName>
                <AdvisorSpecialty>Sanskrit & Ancient Texts Expert</AdvisorSpecialty>
                <AdvisorBio>
                  Professor Krishnan is a renowned authority on Sanskrit literature and provides guidance
                  on our educational initiatives.
                </AdvisorBio>
              </AdvisorInfo>
            </AdvisorCard>

            <AdvisorCard>
              <AdvisorImage src="https://web-assets.same.dev/1591743426/2260428846.png" alt="Dr. Anil Gupta" />
              <AdvisorInfo>
                <AdvisorName>Dr. Anil Gupta</AdvisorName>
                <AdvisorSpecialty>Social Innovation & Rural Development</AdvisorSpecialty>
                <AdvisorBio>
                  Dr. Gupta helps design and implement our community-based projects that combine
                  traditional practices with social innovation.
                </AdvisorBio>
              </AdvisorInfo>
            </AdvisorCard>
          </AdvisorsGrid>
        </Container>
      </SectionContainer>

      {/* Join Us Section */}
      <JoinSection>
        <Container>
          <JoinContent>
            <JoinTitle>Join Our Team</JoinTitle>
            <JoinDescription>
              We're always looking for passionate individuals who share our vision of reviving India's ancient
              wisdom and practices. If you're dedicated to making a difference, we'd love to hear from you.
            </JoinDescription>
            <JoinButton href="mailto:careers@vishwagurubharat.org">
              Contact Us About Opportunities
            </JoinButton>
          </JoinContent>
        </Container>
      </JoinSection>
    </PageContainer>
  );
};

// Styled Components
const PageContainer = styled.div`
  font-family: 'Poppins', sans-serif;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const PageHeader = styled.div`
  background-image: url('https://web-assets.same.dev/1306262657/3509351711.png');
  background-size: cover;
  background-position: center;
  position: relative;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6));
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
`;

const PageTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 10px;
  color: white;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SectionContainer = styled.section`
  padding: 80px 0;
  background-color: ${props => props.lightBg ? '#f8f8f8' : 'white'};

  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 15px;
  color: #2b2928;
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
    font-size: 2rem;
  }
`;

const SectionDescription = styled.p`
  text-align: center;
  max-width: 800px;
  margin: 30px auto 50px;
  color: #555;
  line-height: 1.8;
  font-size: 1.1rem;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin: 25px auto 40px;
  }
`;

// Leadership Section Styles
const LeadershipGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const LeaderCard = styled.div`
  display: flex;
  gap: 40px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  @media (max-width: 992px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const LeaderImageWrapper = styled.div`
  flex: 0 0 350px;

  @media (max-width: 992px) {
    flex: 0 0 auto;
  }
`;

const LeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 992px) {
    height: 350px;
  }

  @media (max-width: 576px) {
    height: 250px;
  }
`;

const LeaderInfo = styled.div`
  padding: 30px;
  flex: 1;

  @media (max-width: 576px) {
    padding: 20px;
  }
`;

const LeaderName = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 5px;
  color: #2b2928;
`;

const LeaderPosition = styled.p`
  font-size: 1.1rem;
  color: #cd232e;
  margin-bottom: 20px;
  font-weight: 500;
`;

const LeaderBio = styled.p`
  color: #555;
  line-height: 1.8;
  margin-bottom: 20px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
`;

const SocialLink = styled.a`
  width: 35px;
  height: 35px;
  background-color: #f5f5f5;
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background-color: #cd232e;
    color: white;
    transform: translateY(-3px);
  }
`;

const LeaderQuote = styled.blockquote`
  font-style: italic;
  color: #666;
  border-left: 3px solid #cd232e;
  padding-left: 20px;
  margin-left: 0;
  position: relative;
  font-size: 1.1rem;
  line-height: 1.7;
`;

const QuoteIconLeft = styled.span`
  color: rgba(205, 35, 46, 0.2);
  font-size: 1.5rem;
  position: absolute;
  left: -10px;
  top: -10px;
`;

const QuoteIconRight = styled.span`
  color: rgba(205, 35, 46, 0.2);
  font-size: 1.5rem;
  margin-left: 5px;
`;

// Core Team Section Styles
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
`;

const TeamMember = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const TeamMemberImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const TeamMemberInfo = styled.div`
  padding: 20px;
  text-align: center;
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: #2b2928;
`;

const TeamMemberPosition = styled.p`
  color: #666;
  margin-bottom: 15px;
  font-size: 0.95rem;
`;

const TeamMemberSocial = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const TeamSocialLink = styled.a`
  width: 30px;
  height: 30px;
  background-color: #f5f5f5;
  color: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  &:hover {
    background-color: #cd232e;
    color: white;
  }
`;

// Advisors Section Styles
const AdvisorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const AdvisorCard = styled.div`
  display: flex;
  gap: 20px;
  background-color: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 576px) {
    flex-direction: column;
    text-align: center;
  }
`;

const AdvisorImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 576px) {
    margin: 0 auto;
  }
`;

const AdvisorInfo = styled.div`
  flex: 1;
`;

const AdvisorName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: #2b2928;
`;

const AdvisorSpecialty = styled.p`
  color: #cd232e;
  font-size: 0.9rem;
  margin-bottom: 10px;
  font-weight: 500;
`;

const AdvisorBio = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
`;

// Join Us Section Styles
const JoinSection = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://web-assets.same.dev/1675577225/3977124565.png');
  background-size: cover;
  background-position: center;
  padding: 80px 0;
  color: white;
  text-align: center;
`;

const JoinContent = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const JoinTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const JoinDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const JoinButton = styled.a`
  display: inline-block;
  background-color: #cd232e;
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background-color: #a91d28;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default TeamPage;