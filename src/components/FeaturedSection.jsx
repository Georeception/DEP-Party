import React from 'react';
import { Box, Container, Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  transition: 'transform 0.3s ease-in-out',
  border: '1px solid',
  borderColor: '#AFE1AF',
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: '#90EE90',
  },
}));

const FeaturedSection = () => {
  const navigate = useNavigate();

  const featuredItems = [
    {
      image: '/images/elections.jpg',
      title: 'EMPOWER THE VOTE',
      description: 'Secure your democratic right and make your voice heard. Learn about our initiatives to ensure fair and transparent elections across Kenya.',
      buttonText: 'Get Involved',
      color: 'primary.main',
      section: 'empower'
    },
    {
      image: '/images/protect.jpg',
      title: 'PROTECT THE FUTURE',
      description: 'Join our movement to build a prosperous Kenya. Discover our comprehensive plans for economic growth and social development.',
      buttonText: 'Learn More',
      color: 'secondary.main',
      section: 'protect'
    }
  ];

  const handleButtonClick = (section) => {
    navigate('/election-integrity', { state: { section } });
  };

  return (
    <Box sx={{ py: 8, backgroundColor: 'green' }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ 
          mb: 6, 
          textAlign: 'center', 
          fontWeight: 'bold',
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 60,
            height: 4,
            backgroundColor: 'primary.main'
          }
        }}>
          FEATURED
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {featuredItems.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="250"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold',
                    color: item.color
                  }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 2, flexGrow: 1 }}>
                    {item.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button 
                      variant="contained"
                      size="large"
                      onClick={() => handleButtonClick(item.section)}
                      sx={{ 
                        backgroundColor: item.color,
                        '&:hover': {
                          backgroundColor: item.color,
                          opacity: 0.9
                        },
                        px: 4
                      }}
                    >
                      {item.buttonText}
                    </Button>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedSection; 