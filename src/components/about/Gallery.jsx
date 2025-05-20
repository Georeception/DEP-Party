import React, { useState } from 'react';
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
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { galleryData } from '../../data/staticData';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: { xs: 8, sm: 10 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          py: 8,
          mb: 6,
          position: 'relative',
          height: '60vh',
          backgroundImage: 'url("/images/art.jpg")',
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
            backgroundColor: '#000',
            opacity: 0.3,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Gallery
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'white',
              mt: 2,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Explore our collection of photos and videos showcasing our journey
          </Typography>
        </Container>
      </Box>

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

        <Grid container spacing={4}>
          {activeTab === 0 ? (
            // Photos Tab
            galleryData.images.map((item) => (
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
            galleryData.videos.map((item) => (
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
      </Container>
    </Box>
  );
};

export default Gallery; 