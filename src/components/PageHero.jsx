import React, { useMemo } from 'react';
import { Box, Container, Typography } from '@mui/material';

const defaultImages = [
  'art.jpg',
  'bus.png',
  'campaign.png',
  'elections.jpg',
  'bg.png',
  'leadership.jpg',
  'protect.jpg',
  'rules.jpg',
  'we.png',
  'woman.png',
  'speech.png',
  'people.png',
];

const PageHero = ({ title, subtitle, tag = 'Party', image, children }) => {
  const selectedImage = useMemo(() => {
    const fallback = defaultImages[Math.floor(Math.random() * defaultImages.length)];
    return image || `/images/${fallback}`;
  }, [image]);

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '420px', md: '520px' },
        mt: { xs: 8, sm: 10 },
        py: { xs: 7, md: 10 },
        mb: 6,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundImage: `linear-gradient(120deg, rgba(17, 64, 42, 0.9), rgba(17, 64, 42, 0.66)), url("${selectedImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="overline"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            backgroundColor: 'rgba(255,255,255,0.16)',
            border: '1px solid rgba(255,255,255,0.22)',
            color: '#eaf6ee',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            fontWeight: 700,
            mb: 2,
          }}
        >
          {tag}
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.04em',
            lineHeight: 1.04,
            maxWidth: '760px',
            mb: 2,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              maxWidth: '760px',
              lineHeight: 1.6,
              fontWeight: 500,
            }}
          >
            {subtitle}
          </Typography>
        )}
        {children}
      </Container>
    </Box>
  );
};

export default PageHero;
