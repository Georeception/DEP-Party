import React from 'react';
import { Box, Container, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const VideoContainer = styled(Paper)(({ theme }) => ({
  position: 'relative',
  paddingTop: '56.25%', // 16:9 Aspect Ratio
  overflow: 'hidden',
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  '& video': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const VideoSection = () => {
  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 'bold',
            color: 'primary.main',
          }}
        >
          Featured Video
        </Typography>
        
        <Box sx={{ mb: 6 }}>
          <VideoContainer>
            <video
              controls
              poster="/images/campaign.png"
              preload="metadata"
            >
              <source src="/videos/ad.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </VideoContainer>
        </Box>

        <Typography
          variant="h5"
          sx={{
            textAlign: 'center',
            mb: 3,
            fontWeight: 'medium',
          }}
        >
          Our Vision for a Better Future
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            maxWidth: '800px',
            mx: 'auto',
            color: 'text.secondary',
            lineHeight: 1.8,
          }}
        >
          Join us as we share our vision for a better future. In this video, our leadership
          outlines the key initiatives and goals that will drive our party forward in the
          coming years. We believe in transparency, accountability, and the power of
          community-driven development.
        </Typography>
      </Container>
    </Box>
  );
};

export default VideoSection; 