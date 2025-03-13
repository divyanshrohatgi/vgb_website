import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StepsSection = () => {
  return (
    <StepsContainer>
      <div className="container">
        <StepsHeader>3 Steps to Success</StepsHeader>
        <StepsSubheader>
          Get invited to a BNI networking meeting and witness the power of referrals in action.
        </StepsSubheader>

        <StepsList>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepTitle>Visit a BNI chapter</StepTitle>
            <StepDescription>
              and experience the power of the BNI network
            </StepDescription>
          </StepItem>

          <StepItem>
            <StepNumber>2</StepNumber>
            <StepTitle>Meet the Members</StepTitle>
            <StepDescription>
              and learn how they can help you grow your business
            </StepDescription>
          </StepItem>

          <StepItem>
            <StepNumber>3</StepNumber>
            <StepTitle>Apply</StepTitle>
            <StepDescription>
              to become a Member of a BNI Chapter
            </StepDescription>
          </StepItem>
        </StepsList>

        <GetInvitedButton to="/find-a-chapter">Get Invited</GetInvitedButton>
      </div>
    </StepsContainer>
  );
};

const StepsContainer = styled.section`
  padding: 80px 0;
  background-color: var(--primary-color);
  color: #fff;
  text-align: center;
`;

const StepsHeader = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 15px;
`;

const StepsSubheader = styled.p`
  font-size: 1.2rem;
  margin-bottom: 60px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const StepsList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 60px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50px;
    left: 20%;
    right: 20%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.3);
    z-index: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    &::before {
      display: none;
    }
  }
`;

const StepItem = styled.div`
  width: 30%;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff;
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const GetInvitedButton = styled(Link)`
  display: inline-block;
  background-color: #fff;
  color: var(--primary-color);
  font-weight: 600;
  padding: 12px 30px;
  border-radius: 30px;
  text-transform: uppercase;
  transition: all 0.3s;

  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-3px);
  }
`;

export default StepsSection;
