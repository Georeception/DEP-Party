import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHero from '../components/PageHero';

const TakeAction = () => {
  return (
    <Box>
      <PageHero
        tag="Get involved"
        title="Take Action"
        subtitle="Your time, voice, and energy can help move the mission forward."
      />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2">Take Action</Typography>
        {/* Add your content here */}
      </Container>
    </Box>
  );
};

export default TakeAction; 