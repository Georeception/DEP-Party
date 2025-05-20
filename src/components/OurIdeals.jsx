import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const OurIdeals = () => {
  const ideals = [
    {
      title: 'Who we are',
      content: 'We are a progressive democratic party committed to fostering inclusive growth and sustainable development. Our foundation rests on the principles of transparency, accountability, and participatory democracy, ensuring every citizen\'s voice contributes to our nation\'s prosperity.',
      icon: <PeopleIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Our vision',
      content: 'To create a prosperous, equitable, and sustainable society where every citizen has the opportunity to thrive. We envision a nation built on innovation, environmental stewardship, and social justice, leading Africa\'s transformation into a global powerhouse.',
      icon: <VisibilityIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
    {
      title: 'Our Mission',
      content: 'To champion transformative policies that drive economic growth, protect our environment, and enhance social welfare. Through collaborative leadership and grassroots engagement, we work to build strong institutions and empower communities for lasting positive change.',
      icon: <TrackChangesIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
    },
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 5,
            color: 'primary.main',
            fontWeight: 'bold',
          }}
        >
          Our Manifesto
        </Typography>
        <Grid container spacing={4}>
          {ideals.map((ideal, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  transition: 'all 0.3s ease-in-out',
                  border: '1px solid',
                  borderColor: 'primary.light',
                  borderRadius: 2,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    borderColor: 'primary.main',
                    '& .icon-wrapper': {
                      backgroundColor: 'primary.main',
                      '& svg': {
                        color: 'white',
                      },
                    },
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    className="icon-wrapper"
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      backgroundColor: 'primary.light',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    {ideal.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      mb: 2,
                      fontWeight: 'bold',
                      color: 'primary.main',
                    }}
                  >
                    {ideal.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textAlign: 'justify',
                      color: 'text.secondary',
                      lineHeight: 1.7,
                    }}
                  >
                    {ideal.content}
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

export default OurIdeals; 