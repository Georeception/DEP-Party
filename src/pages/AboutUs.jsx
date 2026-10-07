import React from 'react';
import { Box, Container, Tabs, Tab } from '@mui/material';
import { useNavigate, Routes, Route } from 'react-router-dom';
import PageHero from '../components/PageHero';
import WhoWeAre from '../components/about/WhoWeAre';
import NationalLeadership from '../components/about/NationalLeadership';
import Gallery from '../components/about/Gallery';
import WhatWeDo from '../components/about/WhatWeDo';
import RulesRegulations from '../components/about/RulesRegulations';

const AboutUs = () => {
  const navigate = useNavigate();
  //const location = useLocation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const paths = ['who-we-are', 'leadership', 'gallery', 'what-we-do', 'rules'];
    navigate(`/about/${paths[newValue]}`);
  };

  return (
    <Box>
      <PageHero
        tag="About"
        title="About the Party"
        subtitle="A people-first movement rooted in leadership, service, and national renewal."
      />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          <Tab label="Who We Are" />
          <Tab label="National Leadership" />
          <Tab label="Gallery" />
          <Tab label="What We Do" />
          <Tab label="Rules & Regulations" />
        </Tabs>
      </Container>

      <Routes>
        <Route path="who-we-are" element={<WhoWeAre />} />
        <Route path="leadership" element={<NationalLeadership />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="what-we-do" element={<WhatWeDo />} />
        <Route path="rules" element={<RulesRegulations />} />
      </Routes>
        </Box>
  );
};

export default AboutUs; 