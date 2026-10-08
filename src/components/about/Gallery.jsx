import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Alert,
  Pagination
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { galleryApi } from '../../services/api';
import PageHero from '../PageHero';

const ITEMS_PER_PAGE = 9;

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 12,
  overflow: 'hidden',
  border: '1px solid',
  borderColor: '#AFE1AF',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
    borderColor: '#90EE90',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 280,
  transition: 'transform 0.3s ease-in-out',
}));

const StyledVideo = styled('video')(({ theme }) => ({
  width: '100%',
  height: 280,
  objectFit: 'cover',
  backgroundColor: '#000',
}));

const Gallery = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await galleryApi.getAll({ fetchAll: true });
        //console.log('Gallery API Response:', response);
        
        // Handle paginated response
        if (response && response.data && response.data.results) {
          const mediaItems = Array.isArray(response.data.results) ? response.data.results : [];
          setImages(mediaItems.filter(item => item.media_type === 'image'));
          setVideos(mediaItems.filter(item => item.media_type === 'video'));
        } else {
          console.warn('Gallery API response is not in expected format:', response);
          setImages([]);
          setVideos([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gallery items:', err);
        setError('Failed to fetch gallery items. Please try again later.');
        setImages([]);
        setVideos([]);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setPage(1);
  };

  const activeItems = activeTab === 0 ? images : videos;
  const visibleItems = activeItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Box>
      <PageHero
        tag="Media"
        title="Gallery"
        subtitle="Explore our collection of photos and videos showcasing our journey"
        image="/images/art.jpg"
      />

      <Container maxWidth="lg">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            centered
            sx={{
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 'bold',
                textTransform: 'none',
                minWidth: 120,
              },
            }}
          >
            <Tab label="Photos" />
            <Tab label="Videos" />
          </Tabs>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {activeTab === 0 && (!Array.isArray(images) || images.length === 0) ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Photos Available
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  There are no photos in the gallery at the moment. Check back later for updates.
                </Typography>
              </Box>
            ) : activeTab === 1 && (!Array.isArray(videos) || videos.length === 0) ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No Videos Available
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  There are no videos in the gallery at the moment. Check back later for updates.
                </Typography>
              </Box>
            ) : (
              <Grid container spacing={4}>
                {activeTab === 0 ? (
                  // Photos Tab
                  visibleItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <StyledCard>
                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                          <StyledCardMedia
                            component="img"
                            image={item.image || '/images/placeholder.jpg'}
                            alt={item.title}
                            className="media"
                          />
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {new Date(item.created_at).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {item.description}
                          </Typography>
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  ))
                ) : (
                  // Videos Tab
                  visibleItems.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                      <StyledCard>
                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                          <StyledVideo
                            controls
                            preload="metadata"
                            poster={item.thumbnail || '/images/placeholder.jpg'}
                          >
                            <source src={item.video} type="video/mp4" />
                            Your browser does not support the video tag.
                          </StyledVideo>
                        </Box>
                        <CardContent sx={{ flexGrow: 1, p: 3 }}>
                          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: 'primary.main' }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                            {new Date(item.created_at).toLocaleDateString()}
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                            {item.description}
                          </Typography>
                        </CardContent>
                      </StyledCard>
                    </Grid>
                  ))
                )}
              </Grid>
            )}
          </>
        )}
        {activeItems.length > ITEMS_PER_PAGE && (
          <Pagination
            count={Math.ceil(activeItems.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
            siblingCount={isMobile ? 0 : 1}
            aria-label={activeTab === 0 ? 'Photo pages' : 'Video pages'}
            sx={{ display: 'flex', justifyContent: 'center', my: 5 }}
          />
        )}
      </Container>
    </Box>
  );
};

export default Gallery; 