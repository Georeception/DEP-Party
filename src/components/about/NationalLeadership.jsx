import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import { leadershipApi } from '../../services/api';
import PageHero from '../PageHero';

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
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await leadershipApi.getAll();
        // The response data might be nested in a results array
        const leaders = response.data?.results || response.data || [];
        setLeaders(Array.isArray(leaders) ? leaders : []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leadership data:', err);
        setError('Failed to load leadership data');
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <PageHero
        tag="Leadership"
        title="National Leadership"
        subtitle="Meet our dedicated team of leaders"
        image="/images/leadership.jpg"
      />

      {/* Leadership Cards Section */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {leaders && leaders.length > 0 ? (
            leaders.map((leader) => (
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
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center" color="textSecondary">
                No leadership data available
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default NationalLeadership;
