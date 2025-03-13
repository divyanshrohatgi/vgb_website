import styled from 'styled-components';

const AboutPage = () => {
  return (
    <AboutContainer>
      <PageBanner>
        <div className="container">
          <BannerContent>
            <h1>Changing the Way the World Does Business<sup>®</sup></h1>
            <p>
              Over the years, hundreds of thousands of Members have unlocked
              exponential business growth through BNI and the power of referral
              marketing. Giving and receiving referrals through our Core Value of
              Givers Gain helps Members build trusted relationships and scale their
              businesses.
            </p>
          </BannerContent>
        </div>
      </PageBanner>

      <AboutSection>
        <div className="container">
          <SectionHeading>
            <h2>How BNI helps businesses grow</h2>
          </SectionHeading>
          <SectionContent>
            <ContentColumn>
              <p>
                Founded by Dr. Ivan Misner in 1985, BNI is now the world's largest
                networking organization with 40 years of continuous growth.
              </p>
              <p>
                A BNI Membership provides the environment, training and support to
                build trusted relationships. Members across the globe attend weekly
                Chapter meetings that follow a structured agenda proven to maximize
                referrals.
              </p>
              <p>
                With just one person from each profession in each Chapter,
                competition between Members is eliminated. Instead, Members take the
                time to learn about each other's businesses and build trust,
                exchanging quality referrals when opportunities arise.
              </p>
            </ContentColumn>
            <ImageColumn>
              <img
                src="https://web-assets.same.dev/1294340006/274820965.jpeg"
                alt="BNI Members Networking"
              />
            </ImageColumn>
          </SectionContent>
        </div>
      </AboutSection>

      <MissionSection>
        <div className="container">
          <SectionHeading>
            <h2>Our Mission</h2>
          </SectionHeading>
          <Mission>
            The mission of BNI is to help Members increase their business through a
            structured, positive and professional referral marketing program that
            enables them to develop long-term, meaningful relationships with quality
            business professionals.
          </Mission>
        </div>
      </MissionSection>

      <ValuesSection>
        <div className="container">
          <SectionHeading>
            <h2>Core Values</h2>
          </SectionHeading>
          <ValuesIntro>
            <p>
              BNI is built on a set of guiding principles which form the foundation
              on which Members interact, conduct themselves and fulfill their goals.
            </p>
            <p>
              At BNI, we're Changing the Way the World Does Business<sup>®</sup>.
            </p>
          </ValuesIntro>

          <ValuesList>
            <ValueItem>
              <ValueTitle>Givers Gain<sup>®</sup></ValueTitle>
              <ValueDescription>
                Be willing to give first, before you expect to gain. Giving
                unconditionally creates a better world for everyone and creates
                important opportunities and lasting relationships.
              </ValueDescription>
            </ValueItem>

            <ValueItem>
              <ValueTitle>Recognition</ValueTitle>
              <ValueDescription>
                We appreciate that recognition fuels the growth of successful
                organizations. The person who masters the art of recognition attracts
                success, meaning, and happiness.
              </ValueDescription>
            </ValueItem>

            <ValueItem>
              <ValueTitle>Lifelong Learning</ValueTitle>
              <ValueDescription>
                Your value grows as you develop your knowledge and skills. Create a
                curriculum based on the person you want to become and follow that
                curriculum to get yourself there.
              </ValueDescription>
            </ValueItem>

            <ValueItem>
              <ValueTitle>Traditions + Innovation</ValueTitle>
              <ValueDescription>
                We honor our traditions and look to a brighter future fueled by
                innovation, optimism, and excitement.
              </ValueDescription>
            </ValueItem>

            <ValueItem>
              <ValueTitle>Positive Attitude</ValueTitle>
              <ValueDescription>
                We find the good in everything that happens to us, and that propels
                our lives forward. Finding the good in every person enables us to
                attract terrific people, opportunities, and wealth.
              </ValueDescription>
            </ValueItem>

            <ValueItem>
              <ValueTitle>Building Relationships</ValueTitle>
              <ValueDescription>
                Building strong relationships creates an environment of trust and
                support that yields happiness, opportunity and meaning.
              </ValueDescription>
            </ValueItem>

            <ValueItem>
              <ValueTitle>Accountability</ValueTitle>
              <ValueDescription>
                We keep the promises we make, especially when it is hard to do so.
                This creates trust and supports strong relationships.
              </ValueDescription>
            </ValueItem>
          </ValuesList>
        </div>
      </ValuesSection>

      <CtaSection>
        <div className="container">
          <CtaContent>
            <h3>Begin Your BNI Journey</h3>
            <p>Want to expand your business and make powerful connections? Get started today.</p>
            <CtaButton href="/find-a-chapter">Get Invited</CtaButton>
          </CtaContent>
        </div>
      </CtaSection>
    </AboutContainer>
  );
};

const AboutContainer = styled.div``;

const PageBanner = styled.div`
  background-color: #f5f5f5;
  padding: 80px 0;
`;

const BannerContent = styled.div`
  max-width: 800px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--secondary-color);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
  }
`;

const AboutSection = styled.section`
  padding: 80px 0;
`;

const SectionHeading = styled.div`
  margin-bottom: 40px;

  h2 {
    font-size: 2rem;
    color: var(--primary-color);
    position: relative;
    display: inline-block;

    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 60px;
      height: 3px;
      background-color: var(--primary-color);
    }
  }
`;

const SectionContent = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const ContentColumn = styled.div`
  flex: 1;

  p {
    margin-bottom: 20px;
    line-height: 1.7;
  }
`;

const ImageColumn = styled.div`
  flex: 1;

  img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const MissionSection = styled.section`
  padding: 80px 0;
  background-color: #f9f9f9;
`;

const Mission = styled.div`
  font-size: 1.5rem;
  line-height: 1.7;
  font-weight: 300;
  color: var(--secondary-color);
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const ValuesSection = styled.section`
  padding: 80px 0;
`;

const ValuesIntro = styled.div`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;

  p {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`;

const ValuesList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const ValueItem = styled.div`
  padding: 25px;
  background-color: #f5f5f5;
  border-radius: 8px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ValueTitle = styled.h3`
  font-size: 1.3rem;
  color: var(--primary-color);
  margin-bottom: 15px;
`;

const ValueDescription = styled.p`
  line-height: 1.6;
`;

const CtaSection = styled.section`
  padding: 80px 0;
  background-color: var(--primary-color);
  color: #fff;
`;

const CtaContent = styled.div`
  text-align: center;

  h3 {
    font-size: 2rem;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
`;

const CtaButton = styled.a`
  display: inline-block;
  background-color: #fff;
  color: var(--primary-color);
  font-weight: 600;
  padding: 15px 35px;
  border-radius: 30px;
  text-transform: uppercase;
  transition: all 0.3s;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px);
  }
`;

export default AboutPage;
