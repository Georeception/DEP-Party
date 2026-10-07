import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { leadershipApi } from '../services/api';


const NationalChairman = () => {
  const [chairman, setChairman] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const values = [
    'Peace, Love,',
    'Unity, and Prosperity'
  ];

  useEffect(() => {
    const fetchChairman = async () => {
      try {
        const response = await leadershipApi.getAll();
        // The response data might be nested in a results array
        const leaders = response.data?.results || response.data || [];
        const chairmanData = Array.isArray(leaders) 
          ? leaders.find(leader => 
              leader.position?.name?.toLowerCase().includes('chairman') ||
              leader.position?.title?.toLowerCase().includes('chairman')
            )
          : null;
        setChairman(chairmanData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chairman data:', err);
        setError('Failed to load chairman data');
        setLoading(false);
      }
    };

    fetchChairman();
  }, []);

  return (
    <Box sx={{ py: 10, backgroundColor: '#1E6E43' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            {chairman && chairman.image && (
              <Box
                component="img"
                src={chairman.image}
                alt={`${chairman.name} - National Chairman`}
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
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                color: 'secondary.main',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              {chairman?.name || ''}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'secondary.main',
                mb: 2,
              }}
            >
              {chairman?.position?.title || ''}
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
              {chairman?.bio || chairman?.position?.description || "As Chairman of the Devolution Party of Kenya, I am honored to lead a movement committed to fairness, equity, and true grassroots empowerment. We believe that real change begins at the local level and grows through unity, integrity, and service. Join us as we build a stronger, more inclusive Kenya for all."}
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