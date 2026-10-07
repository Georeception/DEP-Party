import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { galleryApi } from '../services/api';

const VideoSection = () => {
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const { data } = await galleryApi.getAll();
        const items = data.results || [];
        const videos = items.filter(item => item.media_type === 'video');
        if (videos.length > 0) {
          const sorted = videos.sort((a, b) => new Date(b.created_at || b.uploaded_at) - new Date(a.created_at || a.uploaded_at));
          setVideo(sorted[0]);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch video');
        setLoading(false);
      }
    };
    fetchLatestVideo();
  }, []);

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography variant="h5" sx={{ mb: 1, fontWeight: 'bold', textAlign: 'center', color: 'green' }}>
          A Message To Our Members
        </Typography>
        <Box sx={{ position: 'relative', paddingTop: '56.25%', width: '100%', maxWidth: '900px', mx: 'auto' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">{error}</Typography>
          ) : video ? (
            <video
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              src={video.video}
              controls
              poster={video.thumbnail || ''}
              title={video.title || 'Party Vision'}
            />
          ) : (
            <Typography align="center">No video available.</Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default VideoSection; 