import React from 'react';
import styled from 'styled-components';
import { FaLinkedinIn, FaEnvelope, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

// Data
const leadershipData = [
  {
    id: 1,
    name: "Shri C.S Thakur",
    position: "Founder",
    image: "https://scontent.fdel3-1.fna.fbcdn.net/v/t39.30808-6/357764439_591007253161119_749019385525702839_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=AGaRdtPl5PoQ7kNvgFF9Xo6&_nc_oc=AdmkpVGuCBz7b9AWA72NvsCP79Y4dHpls6iGgdjaM56n6aRyAjo4iRZVz3gOcvocuhY&_nc_zt=23&_nc_ht=scontent.fdel3-1.fna&_nc_gid=0QNTZ9khKMpw_CQ9pFxXLg&oh=00_AYHILzySxPqPd1kQ8MUtolrvtNKyb_w9fddVRO470fep2g&oe=67E2E0D0",
    bio: "With over 30 years of experience in Vedic studies and spiritual practice, Shri C.S Thakur has dedicated his life to preserving and promoting India's ancient wisdom. He holds a Ph.D. in Sanskrit and has authored numerous books on Vedic philosophy.",
    quote: "Our work is not just about preserving tradition, but about making ancient wisdom relevant to solve today's most pressing challenges.",
    social: {
      linkedin: "https://linkedin.com",
      email: "rajendra@vishwagurubharat.org"
    }
  },
  {
    id: 2,
    name: "Smt. Rupali Dutta",
    position: "Founder and President",
    image: "https://scontent.fdel3-1.fna.fbcdn.net/v/t39.30808-6/482062142_970873021844672_5897488387761409284_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_ohc=EoevHa5OsbYQ7kNvgFWxHXd&_nc_oc=Admx78YdzT8thiw1eYeFdPXxXPLkUcT-PrDyehTeynHWIGSuD47rzKCNjymD54N7rjw&_nc_zt=23&_nc_ht=scontent.fdel3-1.fna&_nc_gid=Wvad51fkEJpA1PP1nx9M3w&oh=00_AYF3dScn8NBOAz2ZhIu78Nvo3YSWwcMIAdlxeid7DQZssw&oe=67E2DB8F",
    bio: "Smt. Rupali Dutta combines her background in environmental science with deep knowledge of Vedic environmental principles. She leads our sustainability initiatives and has been instrumental in developing our 5 Elements conservation program.",
    quote: "Ancient India understood the delicate balance of nature millennia before modern environmentalism. We must revive this wisdom for our planet's future.",
    social: {
      linkedin: "https://linkedin.com",
      email: "ananya@vishwagurubharat.org"
    }
  }
];

const teamData = [
  {
    id: 1,
    name: "Shri Sarvdaman Sharma",
    position: "Trustee",
    image: "https://vishwagurubharat.org/img/ShriSarvdaman.jpg",
    social: {
      linkedin: "https://linkedin.com",
      email: "arjun@vishwagurubharat.org"
    }
  },
  {
    id: 2,
    name: "Shri Dr. Anil Kumar Padha",
    position: "Trustee",
    image: "https://vishwagurubharat.org/img/anil2.jpeg",
    social: {
      linkedin: "https://linkedin.com",
      email: "priya@vishwagurubharat.org"
    }
  },
  {
    id: 3,
    name: "Shri Rajat Vashisht",
    position: "General Secretary Org",
    image: "https://vishwagurubharat.org/img/shriRajatji.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "vikram@vishwagurubharat.org"
    }
  },
  {
    id: 4,
    name: "Padma Shri Dr. Vishwamurthy Shastri",
    position: "Patron",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "meera@vishwagurubharat.org"
    }
  },
  {
    id: 5,
    name: "Shri Acharya Agnivrat Jee",
    position: "Director General",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  },
  {
    id: 6,
    name: "Shri Hitesh Chandel",
    position: "Secretary General",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  },
  {
    id: 7,
    name: "Shri Vishal Kapahi",
    position: "Director General Jammu & Kashmir",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  },
  {
    id: 8,
    name: "Shri Dhamecha Arvind Retilal",
    position: "National Vice President",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  },
  {
    id: 9,
    name: "Shri S.K. Muraleei",
    position: "National Secretary",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  },
  {
    id: 10,
    name: "Smt Rita Kalra",
    position: "Director Women Empowerment",
    image: "https://vishwagurubharat.org/img/shriritakalra.jpg",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  },
  {
    id: 11,
    name: "Shri Parmar ketanbhai Valjibhai",
    position: "Gujarat State President",
    image: "https://vishwagurubharat.org/img/ShriParmar.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  },
  {
    id: 12,
    name: "Smt Dr. Shefali Sharma",
    position: "Director of Women Education",
    image: "https://vishwagurubharat.org/img/smtshefalisharma.jpg",
    social: {
      linkedin: "https://linkedin.com",
      email: "lakshmi@vishwagurubharat.org"
    }
  }
];

const developersData = [
  {
    id: 1,
    name: "Divyansh Rohatgi",
    position: "Full Stack Developer",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "divyansh@vishwagurubharat.org"
    }
  },
  {
    id: 2,
    name: "Parth Jain",
    position: "Full Stack Developer",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "parth@vishwagurubharat.org"
    }
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "Backend Engineer",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "michael@vishwagurubharat.org"
    },
  },
  {
    id: 3,
    name: "Michael Brown",
    position: "Backend Engineer",
    image: "https://web-assets.same.dev/335287695/52350043.png",
    social: {
      linkedin: "https://linkedin.com",
      email: "michael@vishwagurubharat.org"
    }
  }
];

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
            {leadershipData.map((leader) => (
              <LeaderCard key={leader.id}>
                <LeaderImageWrapper>
                  <LeaderImage src={leader.image} alt={leader.name} />
                </LeaderImageWrapper>
                <LeaderInfo>
                  <LeaderName>{leader.name}</LeaderName>
                  <LeaderPosition>{leader.position}</LeaderPosition>
                  <LeaderBio>{leader.bio}</LeaderBio>
                  <SocialLinks>
                    <SocialLink href={leader.social.linkedin} target="_blank" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </SocialLink>
                    <SocialLink href={`mailto:${leader.social.email}`} aria-label="Email">
                      <FaEnvelope />
                    </SocialLink>
                  </SocialLinks>
                  <LeaderQuote>
                    <QuoteIconLeft><FaQuoteLeft /></QuoteIconLeft>
                    {leader.quote}
                    <QuoteIconRight><FaQuoteRight /></QuoteIconRight>
                  </LeaderQuote>
                </LeaderInfo>
              </LeaderCard>
            ))}
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
            {teamData.map((member) => (
              <TeamMember key={member.id}>
                <TeamMemberImage src={member.image} alt={member.name} />
                <TeamMemberInfo>
                  <TeamMemberName>{member.name}</TeamMemberName>
                  <TeamMemberPosition>{member.position}</TeamMemberPosition>
                  <TeamMemberSocial>
                    <TeamSocialLink href={member.social.linkedin} target="_blank" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </TeamSocialLink>
                    <TeamSocialLink href={`mailto:${member.social.email}`} aria-label="Email">
                      <FaEnvelope />
                    </TeamSocialLink>
                  </TeamMemberSocial>
                </TeamMemberInfo>
              </TeamMember>
            ))}
          </TeamGrid>
        </Container>
      </SectionContainer>

      {/* Developers Section */}
      <SectionContainer>
        <Container>
          <SectionTitle>Developer's Section</SectionTitle>
          <SectionDescription>
            Meet our skilled developers who bring innovative ideas to life, ensuring seamless user experience
            and robust functionality in all our projects.
          </SectionDescription>

          <TeamGrid>
            {developersData.map((developer) => (
              <TeamMember key={developer.id}>
                <TeamMemberImage src={developer.image} alt={developer.name} />
                <TeamMemberInfo>
                  <TeamMemberName>{developer.name}</TeamMemberName>
                  <TeamMemberPosition>{developer.position}</TeamMemberPosition>
                  <TeamMemberSocial>
                    <TeamSocialLink href={developer.social.linkedin} target="_blank" aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </TeamSocialLink>
                    <TeamSocialLink href={`mailto:${developer.social.email}`} aria-label="Email">
                      <FaEnvelope />
                    </TeamSocialLink>
                  </TeamMemberSocial>
                </TeamMemberInfo>
              </TeamMember>
            ))}
          </TeamGrid>
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
  border: 2px solid #cd232e;

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
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TeamMember = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  border: 2px solid #cd232e;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const TeamMemberImage = styled.img`
  width: 80%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid #cd232e;
  margin: 20px auto 20px;
  display: block;

`;

const TeamMemberInfo = styled.div`
  padding: 5px;
  text-align: center;
`;

const TeamMemberName = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 5px;
  color: #2b2928;
`;

const TeamMemberPosition = styled.p`
  color: #cd232e;
  margin-bottom: 15px;
  font-size: 0.95rem;
  font-weight: 500;
`;

const TeamMemberSocial = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px;
  gap:15px;
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
