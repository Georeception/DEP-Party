import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import PageHero from '../components/PageHero';

const Contribute = () => {
  return (
    <Box>
      <PageHero
        tag="Support"
        title="Contribute"
        subtitle="Help strengthen the movement through practical support, community action, and active participation."
      />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h2">Contribute</Typography>
        {/* Add your content here */}
      </Container>
    </Box>
  );
};

export default Contribute; 