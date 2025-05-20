import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { galleryData } from '../data/staticData';

const VideoSection = () => {
  const featuredVideo = galleryData.videos[0] || {
    video: '/videos/featured-video.mp4',
    thumbnail: '/images/video-thumbnail.jpg',
    title: 'Party Vision'
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center', color: 'green' }}>
          A Message To Our Members
        </Typography>
        <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%', maxWidth: '900px', mx: 'auto' }}>
          <video
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            src={featuredVideo.video}
            controls
            poster={featuredVideo.thumbnail}
            title={featuredVideo.title}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default VideoSection; 