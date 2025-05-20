import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  padding: '12px 30px',
  fontSize: '0.95rem',
  fontWeight: 'bold',
  textTransform: 'none',
  transition: 'all 0.3s ease',
  borderRadius: 0,
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
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
        height: 'calc(100vh - 144px)',
        marginTop: '144px',
        overflow: 'hidden',
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
            transition: 'opacity 1s ease-in-out',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          pb: 6,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#FFF',
            fontWeight: 'bold',
            mb: 3,
            animation: `${slideIn} 1s ease-out`,
            fontSize: { xs: '1.5rem', md: '2.5rem' },
            textTransform: 'uppercase',
            //backgroundColor: 'rgba(255, 255, 255, 0.9)',
            py: 1.5,
            px: 3,
            width: 'auto',
            display: 'inline-block',
          }}
        >
          Power to the People
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 0,
            animation: `${fadeIn} 1s ease-out 1s both`,
            justifyContent: 'center',
            mt: 1,
          }}
        >
          <ActionButton
            variant="contained"
            sx={{
              backgroundColor: '#FFD700',
              color: '#000',
              '&:hover': {
                backgroundColor: '#FFD700',
              },
            }}
            href="/volunteer"
          >
            JOIN US
          </ActionButton>
          <ActionButton
            variant="contained"
            sx={{
              backgroundColor: '#006400',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#006400',
              },
            }}
            href="/donate"
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
          left: 20,
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
          right: 20,
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