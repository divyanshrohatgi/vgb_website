// client/src/components/CounterSection.jsx
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CounterSection = () => {
  const [counters, setCounters] = useState({
    years: 0,
    departments: 0,
    volunteers: 0,
    projects: 0
  });
  
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  const targets = {
    years: 31,
    departments: 108,
    volunteers: 1000,
    projects: 500
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.2 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000; // 2 seconds
    const steps = 50;
    const interval = duration / steps;
    
    const countersIncrement = {
      years: targets.years / steps,
      departments: targets.departments / steps,
      volunteers: targets.volunteers / steps,
      projects: targets.projects / steps
    };
    
    let currentStep = 0;
    
    const timer = setInterval(() => {
      currentStep++;
      
      if (currentStep <= steps) {
        setCounters({
          years: Math.min(Math.round(countersIncrement.years * currentStep), targets.years),
          departments: Math.min(Math.round(countersIncrement.departments * currentStep), targets.departments),
          volunteers: Math.min(Math.round(countersIncrement.volunteers * currentStep), targets.volunteers),
          projects: Math.min(Math.round(countersIncrement.projects * currentStep), targets.projects)
        });
      } else {
        clearInterval(timer);
      }
    }, interval);
    
    return () => clearInterval(timer);
  }, [isVisible]);
  
  return (
    <CounterContainer ref={sectionRef}>
      <CounterOverlay>
        <div className="container">
          <CounterTitle>Our Impact Since 1992</CounterTitle>
          
          <CounterGrid>
            <CounterItem>
              <CounterValue>{counters.years}+</CounterValue>
              <CounterLabel>Years of Service</CounterLabel>
            </CounterItem>
            
            <CounterItem>
              <CounterValue>{counters.departments}</CounterValue>
              <CounterLabel>Active Departments</CounterLabel>
            </CounterItem>
            
            <CounterItem>
              <CounterValue>{counters.volunteers}+</CounterValue>
              <CounterLabel>Dedicated Volunteers</CounterLabel>
            </CounterItem>
            
            <CounterItem>
              <CounterValue>{counters.projects}+</CounterValue>
              <CounterLabel>Successful Projects</CounterLabel>
            </CounterItem>
          </CounterGrid>
        </div>
      </CounterOverlay>
    </CounterContainer>
  );
};

// Styled Components
const CounterContainer = styled.section`
  height: 300px;
  background-image: url('https://web-assets.same.dev/1591743426/2260428846.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  position: relative;
  display: flex;
  align-items: center;
  margin: 80px 0;
`;

const CounterOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
`;

const CounterTitle = styled.h2`
  color: white;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 40px;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

const CounterGrid = styled.div`
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

const CounterItem = styled.div`
  text-align: center;
  color: white;
`;

const CounterValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #cd232e;
`;

const CounterLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
`;

export default CounterSection;