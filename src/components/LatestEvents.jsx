import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, CardMedia } from '@mui/material';

const LatestEvents = () => {
  const events = [
    {
      title: 'Youth-friendly Political Party Award',
      image: '/images/art.jpg',
      description: 'Recognition for our commitment to youth empowerment and inclusion in politics.'
    },
    {
      title: 'Women Congress Against Gender-Based Violence',
      image: '/images/woman.png',
      description: 'Standing united against all forms of gender-based violence and promoting equality.'
    },
    {
      title: 'Peoples\' Dialogue Forum',
      image: '/images/protect.jpg',
      description: 'Engaging with communities for sustainable economic development and social progress.'
    }
  ];

  return (
    <Box sx={{ py: 10, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: 'primary.main',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Latest Events
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 8,
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
            color: 'text.secondary',
          }}
        >
          Stay updated with our recent activities and initiatives that are shaping the future of our nation.
        </Typography>
        <Grid container spacing={4}>
          {events.map((event, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'transparent',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'primary.light',
                    '& .event-image': {
                      transform: 'scale(1.05)',
                    },
                  },
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={event.image}
                    alt={event.title}
                    className="event-image"
                    sx={{
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                      height: '50%',
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                      color: 'primary.main',
                      lineHeight: 1.4,
                    }}
                  >
                    {event.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LatestEvents; 