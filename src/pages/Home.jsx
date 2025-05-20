import React from 'react';
import HeroSection from '../components/HeroSection';
import OurIdeals from '../components/OurIdeals';
import NationalChairman from '../components/NationalChairman';
import KeyPriorityAreas from '../components/KeyPriorityAreas';
import MembershipPlans from '../components/MembershipPlans';
import LatestEvents from '../components/LatestEvents';
import FeaturedSection from '../components/FeaturedSection';
import VideoSection from '../components/VideoSection';


const Home = () => {
  return (
    <>
      <HeroSection />
      <OurIdeals />
      <FeaturedSection />
      <NationalChairman />      
      <VideoSection />
      <KeyPriorityAreas />
      <MembershipPlans />
      <LatestEvents />
    </>
  );
};

export default Home; 