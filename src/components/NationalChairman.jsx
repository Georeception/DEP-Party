import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { leadershipData } from '../data/staticData';

//const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const NationalChairman = () => {
  const chairmanData = leadershipData.find(leader => 
    leader.position?.title?.toLowerCase() === 'national chairman'
  ) || {
    name: 'Lenny Kivuti',
    position: {
      title: 'National Chairman',
      description: ''
    },
    image: '/images/kivuti.png',
    bio: "As Chairman of the Devolution Party of Kenya, I am honored to lead a movement committed to fairness, equity, and true grassroots empowerment. We believe that real change begins at the local level and grows through unity, integrity, and service. Join us as we build a stronger, more inclusive Kenya for all."
  };

  const values = [
    'Peace, Love,',
    'Unity, and Prosperity'
  ];

  return (
    <Box sx={{ py: 10, backgroundColor: '#000' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={chairmanData.image}
              alt={`${chairmanData.name} - National Chairman`}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 4,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                color: 'primary.main',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              {chairmanData.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'primary.main',
                mb: 2,
              }}
            >
              {chairmanData.position?.title || ''}
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                mb: 4,
                color: 'white',
                fontSize: '1.1rem',
                lineHeight: 1.8,
                textAlign: 'justify',
              }}
            >
              {chairmanData.bio || chairmanData.position?.description}
            </Typography>
            <Box sx={{ mt: 4 }}>
              {values.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    backgroundColor: 'white',
                    p: 2,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <CheckCircleIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 'medium',
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NationalChairman; 