// client/src/pages/about/SankalpPage.jsx
import React from 'react';
import styled from 'styled-components';

const SankalpPage = () => {
  return (
    <PageContainer>
      {/* Custom Header Section with a subtle gradient background */}
      <HeaderSection>
        <Logo src="/vgblogo.png" alt="Vishwa Guru Bharat Logo" />
        <HeaderContent>
          <HeaderTitle>Sankalp</HeaderTitle>
          <HeaderTagline>
            A resolute commitment to reawakening India's ancient wisdom and illuminating the path to a flourishing world.
          </HeaderTagline>
        </HeaderContent>
      </HeaderSection>

      {/* Main Content */}
      <ContentWrapper>
        <MainHeading>
          Vishwa Guru Bharat: Rekindling the Light Within, Leading the World Forward
        </MainHeading>
        <SubHeading>
          Sankalp: A resolute commitment to reawakening India's ancient wisdom and illuminating the path to a flourishing world.
        </SubHeading>
        <Paragraph>
          Driven by the timeless teachings of India, Vishwa Guru Bharat embarks on a global mission to rekindle the art of thinking for inner peace and societal unity. We believe that true transformation begins with a Sankalp—an unwavering promise to ourselves and future generations to create a brighter future.
        </Paragraph>
        <SectionTitle>Empowering Individuals, Igniting Communities</SectionTitle>
        <Paragraph>
          We empower individuals and communities through a tapestry of transformative initiatives:
        </Paragraph>
        <List>
          <ListItem>
            <strong>Sustainable Sankalp:</strong> Championing environmentally conscious practices and supporting communities in building a thriving, green future.
          </ListItem>
          <ListItem>
            <strong>Holistic Education:</strong> Nurturing responsible citizens and compassionate leaders through transformative education programs, equipping them with the knowledge and skills to navigate the complexities of the modern world.
          </ListItem>
          <ListItem>
            <strong>Inner Sankalp:</strong> Guiding individuals on a path of self-discovery through meditation, yoga, and other practices that cultivate inner peace and well-being.
          </ListItem>
          <ListItem>
            <strong>Ayurvedic Wisdom:</strong> Harnessing the power of ancient Ayurveda to promote holistic health and unlock the true wealth that lies within.
          </ListItem>
        </List>
        <SectionTitle>Bridging the Ancient and the Modern</SectionTitle>
        <Paragraph>
          Vishwa Guru Bharat bridges the gap between ancient wisdom and modern solutions. We believe that India's timeless teachings hold immense relevance for the challenges we face today. By blending these time-tested principles with cutting-edge approaches, we pave the way for a more sustainable, equitable, and harmonious world.
        </Paragraph>
        <SectionTitle>Join the Sankalp Movement</SectionTitle>
        <Paragraph>
          We invite you to join us in our Sankalp movement. Together, we can create a world where:
        </Paragraph>
        <List>
          <ListItem>Individuals flourish, empowered by the wisdom within.</ListItem>
          <ListItem>Communities thrive, united in sustainable prosperity.</ListItem>
          <ListItem>India, a radiant Vishwa Guru, illuminates the path towards a brighter future for all.</ListItem>
        </List>
        <SectionTitle>Take a Step Towards Your Own Sankalp</SectionTitle>
        <Paragraph>
          Ignite your inner spark through our Art of Thinking workshops. Discover the transformative power of holistic healing at our renowned Ayurvedic centers. Support our mission by volunteering your skills or donating to empower communities.
        </Paragraph>
        <FinalNote>
          Every Sankalp, however small, adds light to the collective flame. Together, let us rise to the call of our Sankalp and create a world that is truly Vishwa Guru Bharat—a guiding light for humanity.
        </FinalNote>
        <FinalNote>
          Remember, the power of Sankalp lies within you. Start yours today!
        </FinalNote>
      </ContentWrapper>
    </PageContainer>
  );
};

export default SankalpPage;

/* ---------- Styled Components ---------- */

const PageContainer = styled.div`
  background-color: #f8f9fa;
  padding-bottom: 60px;
`;

/* Custom Header Section */
const HeaderSection = styled.header`
  /* Using a subtle gradient that’s neither white nor red */
  background: linear-gradient(to right, #e0e0e0, #f5f5f5);
  padding: 20px 10px;
  text-align: center;
  border-bottom: 1px solid #ccc;
`;

const Logo = styled.img`
  max-width: 100px;
  margin-bottom: 10px;
`;

const HeaderContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  color: #333;
`;

const HeaderTitle = styled.h1`
  font-size: 2rem;
  margin: 0;
`;

const HeaderTagline = styled.h3`
  font-size: 1.2rem;
  margin-top: 5px;
  font-weight: 400;
`;

/* Main Content Wrapper */
const ContentWrapper = styled.div`
  max-width: 900px;
  margin: 40px auto;
  padding: 40px 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
`;

/* Content Headings and Text */
const MainHeading = styled.h1`
  color:rgb(233, 15, 15);
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 25px;
`;

const SubHeading = styled.h2`
  color: #555;
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 30px;
  font-weight: 400;
`;

const SectionTitle = styled.h3`
  color:rgb(233, 16, 16);
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 1.8rem;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
`;

const Paragraph = styled.p`
  color: #444;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1rem;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
`;

const FinalNote = styled.p`
  color: #2d2d2d;
  font-weight: bold;
  text-align: center;
  margin-top: 40px;
  font-size: 1.2rem;
`;
