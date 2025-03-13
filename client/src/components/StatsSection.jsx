import styled from 'styled-components';
import CountUp from 'react-countup';

const StatsSection = () => {
  return (
    <StatsContainer>
      <div className="container">
        <StatsGrid>
          <StatCard>
            <StatNumber>
              <CountUp end={335} duration={2.5} suffix="K+" />
            </StatNumber>
            <StatLabel>Global Members</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>
              <CountUp end={11.2} duration={2.5} decimals={1} suffix="K+" />
            </StatNumber>
            <StatLabel>Global Chapters</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>
              <StatPrefix>$</StatPrefix>
              <CountUp end={25.3} duration={2.5} decimals={1} suffix="B" />
            </StatNumber>
            <StatLabel>Revenue Generated for Members</StatLabel>
            <StatSubtext>Last 12 Months*</StatSubtext>
          </StatCard>

          <StatCard>
            <StatNumber>
              <CountUp end={76} duration={2} />
            </StatNumber>
            <StatLabel>Countries</StatLabel>
          </StatCard>

          <StatCard>
            <StatNumber>
              <CountUp end={16.6} duration={2.5} decimals={1} suffix="M" />
            </StatNumber>
            <StatLabel>Member Referrals</StatLabel>
            <StatSubtext>Last 12 Months*</StatSubtext>
          </StatCard>
        </StatsGrid>

        <CtaSection>
          <CtaText>
            See why 335K+ entrepreneurs like you chose BNI to grow their business
          </CtaText>
          <CtaButton href="/find-a-chapter">GET INVITED</CtaButton>
        </CtaSection>
      </div>
    </StatsContainer>
  );
};

const StatsContainer = styled.section`
  padding: 60px 0;
  background-color: #f8f8f8;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 30px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled.div`
  text-align: center;
  padding: 20px;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

const StatPrefix = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--secondary-color);
`;

const StatSubtext = styled.div`
  font-size: 0.8rem;
  color: #777;
  margin-top: 5px;
  font-style: italic;
`;

const CtaSection = styled.div`
  background-color: #f1f1f1;
  border-radius: 8px;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const CtaText = styled.div`
  font-size: 1.3rem;
  font-weight: 600;

  span {
    color: var(--primary-color);
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const CtaButton = styled.a`
  display: inline-block;
  background-color: var(--primary-color);
  color: #fff;
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 30px;
  text-transform: uppercase;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b01c26;
  }
`;

export default StatsSection;
