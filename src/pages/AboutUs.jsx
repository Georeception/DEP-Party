import React from 'react';
import { Box, Container, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
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
      <Container maxWidth="lg" sx={{ mt: 20 }}>
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