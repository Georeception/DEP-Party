import React from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { leadershipData } from '../../data/staticData';

const LeadershipCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
  border: '1px solid',
  borderColor: '#AFE1AF',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: '#90EE90',
  },
}));

const NationalLeadership = () => {
  return (
    <Box sx={{ mt: { xs: 8, sm: 10 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          py: 8,
          mb: 6,
          position: 'relative',
          height: '60vh',
          backgroundImage: 'url("/images/leadership.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            opacity: 0.3,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            National Leadership
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'white',
              mt: 2,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Meet our dedicated team of leaders
          </Typography>
        </Container>
      </Box>

      {/* Leadership Cards Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {leadershipData.map((leader) => (
            <Grid item xs={12} md={4} key={leader.id}>
              <LeadershipCard>
                <CardMedia
                  component="img"
                  height="300"
                  image={leader.image}
                  alt={leader.name}
                  sx={{
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5',
                    padding: '10px'
                  }}
                />
                <CardContent>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {leader.name}
                  </Typography>
                  <Typography variant="h6" color="primary.main" sx={{ mb: 2 }}>
                    {leader.position?.title || 'Position'}
                  </Typography>
                  <Typography variant="body1">
                    {leader.bio}
                  </Typography>
                </CardContent>
              </LeadershipCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NationalLeadership;
