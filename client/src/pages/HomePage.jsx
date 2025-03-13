import styled from 'styled-components';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import AboutFeature from '../components/AboutFeature';
import TestimonialSection from '../components/TestimonialSection';
import StepsSection from '../components/StepsSection';

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <AboutFeature />
      <StepsSection />
      <TestimonialSection />
    </div>
  );
};

export default HomePage;
