import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Button,
  Divider,
  Chip,
  Grid,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { eventsApi, getApiUrl } from '../services/api';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get image URL
  const getImageUrl = (image) => {
    if (!image) return '/assets/images/placeholder.jpg';
    
    // If image is a string URL, return it
    if (typeof image === 'string') {
      return getApiUrl(image);
    }
    
    // If image is an object with url property, return the url
    if (image.url) {
      const url = image.url;
      return getApiUrl(url);
    }
    
    // If image is an object with image property, return the image
    if (image.image) {
      const url = image.image;
      return getApiUrl(url);
    }
    
    // Default fallback
    return '/assets/images/placeholder.jpg';
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventsApi.getById(id);
        
        if (response?.data) {
          const eventData = Array.isArray(response.data) ? response.data[0] : response.data;
          
          if (eventData && eventData.title) {
            // Get the preview image URL
            const previewImage = eventData.preview_image || eventData.image;
            const imageUrl = getImageUrl(previewImage);
            
            setEvent({
              id: eventData.id,
              title: eventData.title,
              content: eventData.content || '',
              image: imageUrl,
              start_date: eventData.start_date || new Date().toISOString(),
              end_date: eventData.end_date || new Date().toISOString(),
              location: eventData.location || '',
              category: eventData.category?.name || '',
              additional_info: eventData.additional_info || ''
            });
          } else {
            console.warn('Event data is missing required fields:', eventData);
            setEvent(null);
          }
        } else {
          console.warn('Event Detail API response is not in expected format:', response);
          setEvent(null);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to fetch event. Please try again later.');
        setEvent(null);
        setLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    } else {
      console.error('No event ID provided');
      setError('Event not found');
      setLoading(false);
    }
  }, [id]);

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

  if (!event) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 4 }}>
          Event not found
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ mt: 10, py: 10, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2, sm: 4 } }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/events')}
            sx={{ mb: 0 }}
          >
            Back to Events
          </Button>

          <Paper 
            elevation={0} 
            sx={{ 
              p: { xs: 2, sm: 3, md: 4 }, 
              borderRadius: 2,
              backgroundColor: '#fff',
              border: '1px solid #90EE90',
              '& > *': { maxWidth: '850px', mx: 'auto' }
            }}
          >
            {event.category && (
              <Chip
                label={event.category}
                color="primary"
                sx={{ mb: 3 }}
              />
            )}

            <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
              {event.title}
            </Typography>

            <Grid container spacing={4} sx={{ mb: 6 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: 'text.secondary',
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}>
                  <CalendarTodayIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {new Date(event.start_date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  color: 'text.secondary',
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">
                    {new Date(event.start_date).toLocaleTimeString()} - {new Date(event.end_date).toLocaleTimeString()}
                  </Typography>
                </Box>
              </Grid>
              {event.location && (
                <Grid item xs={12} sm={4}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'text.secondary',
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                  }}>
                    <LocationOnIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">{event.location}</Typography>
                  </Box>
                </Grid>
              )}
            </Grid>

            {event.image && event.image !== '/assets/images/placeholder.jpg' && (
              <Box 
                sx={{ 
                  mb: 6, 
                  borderRadius: 2, 
                  overflow: 'hidden',
                  position: 'relative',
                  paddingTop: '40%',
                  maxHeight: '400px',
                  maxWidth: '800px',
                  mx: 'auto',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  '& img': {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }
                }}
              >
                <img
                  src={event.image}
                  alt={event.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/assets/images/placeholder.jpg';
                  }}
                />
              </Box>
            )}

            <Divider sx={{ mb: 6 }} />

            <Box
              sx={{
                px: { xs: 0, sm: 2, md: 4 },
                '& p': {
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: 'text.primary',
                  mb: 3,
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  my: 4,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                },
                '& a': {
                  color: 'primary.main',
                  textDecoration: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                },
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  color: 'text.primary',
                  fontWeight: 'bold',
                  mt: 4,
                  mb: 3,
                  lineHeight: 1.3,
                },
                '& ul, & ol': {
                  pl: 4,
                  mb: 3,
                },
                '& li': {
                  mb: 2,
                  lineHeight: 1.6,
                },
                '& blockquote': {
                  borderLeft: '4px solid',
                  borderColor: 'primary.main',
                  pl: 3,
                  py: 1,
                  my: 4,
                  fontStyle: 'italic',
                  bgcolor: 'background.paper',
                  borderRadius: 1,
                }
              }}
              dangerouslySetInnerHTML={{ __html: event.content }}
            />

            {event.additional_info && (
              <>
                <Typography variant="h5" sx={{ mt: 6, mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
                  Additional Information
                </Typography>
                <Box
                  sx={{
                    px: { xs: 0, sm: 2, md: 4 },
                    '& p': {
                      fontSize: '1.1rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                      mb: 3,
                    },
                    '& img': {
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: 1,
                      my: 4,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    },
                    '& a': {
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                  }}
                  dangerouslySetInnerHTML={{ __html: event.additional_info }}
                />
              </>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default EventDetail; 