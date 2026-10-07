import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const ActionButton = styled(Button)({
  padding: '13px 28px',
  fontSize: '0.95rem',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 180ms ease',
  borderRadius: 4,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 22px rgba(0,0,0,0.22)',
  },
});

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [   
    '/images/meet.png',
    '/images/people.png',
    '/images/lenny.png',
    '/images/croc.png',
    '/images/speech.png',
    '/images/dance.png',
    '/images/campaign.png',
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '420px', md: '520px' },
        py: { xs: 7, md: 10 },
        marginTop: '144px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: '8%',
          right: '8%',
          bottom: '32px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(243, 201, 63, 0.9), transparent)',
        },
      }}
    >
      {/* Background Image */}
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: currentImageIndex === index ? 1 : 0,
            transition: 'opacity 800ms ease-in-out',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(120deg, rgba(17, 64, 42, 0.9), rgba(17, 64, 42, 0.66))',
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src={image}
            alt={`Hero ${index + 1}`}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      ))}

      {/* Content */}
      <Container
        maxWidth="lg"
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 2,
          textAlign: 'left',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: '#FFF',
            fontWeight: 800,
            mb: 2,
            animation: `${slideIn} 700ms ease-out`,
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
            maxWidth: '760px',
            display: 'inline-block',
          }}
        >
          Power to the People
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 1.25,
            animation: `${fadeIn} 700ms ease-out 250ms both`,
            justifyContent: 'center',
            mt: 1,
          }}
        >
          <ActionButton
            variant="contained"
            component={Link}
            to="/volunteer"
            sx={{
              backgroundColor: '#f1cf32',
              color: '#1d2922',
              '&:hover': {
                backgroundColor: '#f8e68a',
              },
            }}
          >
            JOIN US
          </ActionButton>
          <ActionButton
            variant="contained"
            component={Link}
            to="/donate"
            sx={{
              backgroundColor: '#174f36',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#103b29',
              },
            }}
          >
            DONATE
          </ActionButton>
        </Box>
      </Container>

      {/* Navigation Arrows */}
      <IconButton
        onClick={prevImage}
        sx={{
          position: 'absolute',
          left: { xs: 8, md: 20 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          zIndex: 2,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <IconButton
        onClick={nextImage}
        sx={{
          position: 'absolute',
          right: { xs: 8, md: 20 },
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.3)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
          zIndex: 2,
        }}
      >
        <ArrowForwardIcon />
      </IconButton>

      {/* Image Indicators */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          zIndex: 2,
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: currentImageIndex === index ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Hero; 