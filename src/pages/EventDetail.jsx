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
import { eventsApi } from '../services/api';

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
      // If it's a relative URL, prepend the base URL
      if (image.startsWith('/')) {
        return `${process.env.REACT_APP_API_URL || ''}${image}`;
      }
      return image;
    }
    
    // If image is an object with url property, return the url
    if (image.url) {
      const url = image.url;
      return url.startsWith('/') ? `${process.env.REACT_APP_API_URL || ''}${url}` : url;
    }
    
    // If image is an object with image property, return the image
    if (image.image) {
      const url = image.image;
      return url.startsWith('/') ? `${process.env.REACT_APP_API_URL || ''}${url}` : url;
    }
    
    // Default fallback
    return '/assets/images/placeholder.jpg';
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await eventsApi.getById(id);
        //console.log('Event Detail API Response:', response);
        
        if (response?.data) {
          // Handle both array and single object responses
          const eventData = Array.isArray(response.data) ? response.data[0] : response.data;
          //console.log('Processed event data:', eventData);
          
          // Ensure we have the required fields
          if (eventData && eventData.title) {
            setEvent({
              id: eventData.id,
              title: eventData.title,
              description: eventData.description || '',
              image: getImageUrl(eventData.image || eventData.preview_image),
              date: eventData.date || new Date().toISOString(),
              time: eventData.time || '',
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
      //console.log('Fetching event with ID:', id);
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
              border: '1px solid #90EE90',  // Light green border
              '& > *': { maxWidth: '850px', mx: 'auto' }  // Center all direct children with max-width
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
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                </Box>
              </Grid>
              {event.time && (
                <Grid item xs={12} sm={4}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: 'text.secondary',
                    justifyContent: { xs: 'center', sm: 'flex-start' }
                  }}>
                    <AccessTimeIcon sx={{ mr: 1 }} />
                    <Typography variant="body1">{event.time}</Typography>
                  </Box>
                </Grid>
              )}
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

            {event.image && (
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
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
              </Box>
            )}

            <Divider sx={{ mb: 6 }} />

            <Box
              sx={{
                px: { xs: 0, sm: 2, md: 4 },  // Add horizontal padding to content
                '& p': {
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: 'text.primary',
                  mb: 3,  // Increased margin bottom
                  maxWidth: '100%',  // Ensure text doesn't overflow
                },
                '& img': {
                  maxWidth: '100%',
                  height: 'auto',
                  borderRadius: 1,
                  my: 4,  // Increased vertical margin
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
                  mt: 4,  // Increased top margin
                  mb: 3,  // Increased bottom margin
                  lineHeight: 1.3,
                },
                '& ul, & ol': {
                  pl: 4,  // Increased padding left
                  mb: 3,  // Increased margin bottom
                },
                '& li': {
                  mb: 2,  // Increased margin bottom
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
              dangerouslySetInnerHTML={{ __html: event.description }}
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