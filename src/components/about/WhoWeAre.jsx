import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HandshakeIcon from '@mui/icons-material/Handshake';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  marginTop: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const ValueCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  borderRadius: '12px',
  '&:hover': {
    transform: 'translateY(-8px)',
    '& .icon-wrapper': {
      backgroundColor: theme.palette.primary.main,
      '& svg': {
        color: 'white',
      },
    },
  },
}));

const CarouselImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  minHeight: '500px',
  borderRadius: '12px',
  overflow: 'hidden',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const CarouselButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  zIndex: 2,
}));

const WhoWeAre = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const carouselImages = [
    {
      src: '/images/bus.png',
      alt: 'Party Campaign Bus'
    },
    {
      src: '/images/hero-background.png',
      alt: 'Party Rally'
    },
    {
      src: '/images/leadership.jpg',
      alt: 'Party Leadership'
    },
    {
      src: '/images/protect.jpg',
      alt: 'Community Engagement'
    }
  ];

  const handlePrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const values = [
    {
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      title: 'Inclusive Leadership',
      description: 'We believe in leadership that represents and serves all Kenyans, regardless of background or status.'
    },
    {
      icon: <EmojiEventsIcon sx={{ fontSize: 40 }} />,
      title: 'Excellence in Service',
      description: 'Committed to delivering the highest standards of public service and governance.'
    },
    {
      icon: <HandshakeIcon sx={{ fontSize: 40 }} />,
      title: 'Unity in Diversity',
      description: 'Embracing Kenya\'s rich cultural diversity while fostering national unity.'
    },
    {
      icon: <LightbulbIcon sx={{ fontSize: 40 }} />,
      title: 'Innovation & Progress',
      description: 'Driving forward-thinking solutions for Kenya\'s development challenges.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '80vh' },
          backgroundImage: 'url("/images/hero-background.png")',
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 1,
              mt: 10
            }}
          >
            Who We Are
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'white',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.1rem', sm: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            A progressive movement dedicated to Kenya's future
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Party History Section */}
        <Box sx={{ mt: 8, mb: 6 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CarouselImage>
                  <img
                    src={carouselImages[currentImage].src}
                    alt={carouselImages[currentImage].alt}
                  />
                  <CarouselButton
                    onClick={handlePrevious}
                    sx={{ left: 8 }}
                  >
                    <ArrowBackIosNewIcon />
                  </CarouselButton>
                  <CarouselButton
                    onClick={handleNext}
                    sx={{ right: 8 }}
                  >
                    <ArrowForwardIosIcon />
                  </CarouselButton>
                </CarouselImage>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mt: 2,
                  }}
                >
                  {carouselImages.map((_, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: currentImage === index ? 'primary.main' : 'grey.300',
                        cursor: 'pointer',
                      }}
                      onClick={() => setCurrentImage(index)}
                    />
                  ))}
                </Box>
              </Box>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold', 
                  color: 'primary.main',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                Our History
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                Founded in 2020, the Devolution Empowerment Party (DEP) emerged from a vision to transform Kenya's governance landscape. Our party was established during a pivotal moment in Kenya's democratic journey, recognizing the crucial role of devolved governance in national development.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 2,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                From our inception, we have been committed to championing the rights and aspirations of all Kenyans, with a particular focus on strengthening county governments and ensuring equitable resource distribution. Our journey has been marked by significant milestones in advocating for grassroots empowerment and inclusive development.
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                }}
              >
                Today, we stand as a testament to the power of progressive politics, continuing to build on our foundation of transparency, accountability, and people-centered governance.
              </Typography>
            </Grid>
          </Grid>
        </Box>

        {/* Our Identity Section */}
        <StyledPaper elevation={3}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 4, 
                  fontWeight: 'bold', 
                  color: 'primary.main',
                  fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
                }}
              >
                Our Identity
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  lineHeight: 1.8,
                  textAlign: 'justify',
                }}
              >
                The Devolution Empowerment Party (DEP) is a progressive political movement dedicated to 
                championing devolved governance and economic empowerment across Kenya. Founded on the 
                principles of inclusivity, transparency, and grassroots leadership, we represent the 
                aspirations of all Kenyans who believe in the power of devolved governance.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  position: 'relative',
                  height: '100%',
                  minHeight: '300px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                }}
              >
                <img
                  src="/images/leadership.jpg"
                  alt="Party Leadership"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 3,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                    color: 'white',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    Building a Stronger Kenya Together
                  </Typography>
                  <Typography variant="body2">
                    Our leadership team working with communities to create lasting change
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>

        {/* Core Values Section */}
        <StyledPaper elevation={3} sx={{ mt: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              mb: 4, 
              fontWeight: 'bold', 
              color: 'primary.main',
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
            }}
          >
            Our Core Values
          </Typography>
          <Grid container spacing={4}>
            {values.map((value, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ValueCard>
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box
                      className="icon-wrapper"
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        backgroundColor: 'primary.light',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                        transition: 'all 0.3s ease-in-out',
                        '& svg': {
                          color: 'primary.main',
                          transition: 'color 0.3s ease-in-out',
                        },
                      }}
                    >
                      {value.icon}
                    </Box>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 'bold',
                        fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      }}
                    >
                      {value.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary',
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                      }}
                    >
                      {value.description}
                    </Typography>
                  </CardContent>
                </ValueCard>
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default WhoWeAre; 