import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress, 
  Alert,
  Button,
  Chip
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { eventsApi, getApiUrl } from '../services/api';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to clean text content
  const cleanText = (html) => {
    if (!html) return '';
    return html
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

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
    const fetchEvents = async () => {
      try {
        const response = await eventsApi.getAll();
        //console.log('Events API Response:', JSON.stringify(response, null, 2));
        
        // Check if response has data property and results array
        if (response?.data?.results) {
          // Clean and format the event data
          const cleanedEvents = response.data.results.map(event => {
            //console.log('Processing event:', JSON.stringify(event, null, 2)); // Debug log
            const cleanedEvent = {
              id: event.id,
              title: cleanText(event.title || ''),
              description: cleanText(event.description || ''),
              date: event.date || new Date().toISOString(),
              time: event.time || '',
              location: event.location || '',
              image: getImageUrl(event.preview_image),
              category: event.category?.name || '',
              additional_info: cleanText(event.additional_info || '')
            };
            //console.log('Cleaned event:', cleanedEvent); // Debug log for cleaned event
            return cleanedEvent;
          });
          //console.log('All cleaned events:', JSON.stringify(cleanedEvents, null, 2)); // Debug log
          setEvents(cleanedEvents);
        } else {
          console.warn('Events API response is not in expected format:', response);
          setEvents([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events. Please try again later.');
        setEvents([]);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleReadMore = (eventId) => {
    //console.log('Navigating to event with ID:', eventId);
    if (!eventId) {
      console.error('Invalid event ID:', eventId);
      return;
    }
    navigate(`/events/${eventId}`);
  };

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
    <Box sx={{ backgroundColor: '#fff' }}>
      <PageHero
        tag="Community"
        title="Events"
        subtitle="Join us at upcoming gatherings, town halls, and community moments across the country."
      />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {!Array.isArray(events) || events.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Events Available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for upcoming events and activities.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {events.map((event) => {
              //console.log('Event data:', event);
              return (
                <Grid item xs={12} md={4} key={event.id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s ease-in-out',
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: '#AFE1AF',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        borderColor: '#90EE90',
                        '& .event-image': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={event.image}
                        alt={event.title}
                        className="event-image"
                        sx={{ 
                          transition: 'transform 0.3s ease-in-out',
                          objectFit: 'cover',
                          width: '100%'
                        }}
                        onError={(e) => {
                          //console.log('Image load error for:', event.image); // Debug log for image errors
                          e.target.onerror = null;
                          e.target.src = '/assets/images/placeholder.jpg';
                        }}
                      />
                      {event.category && (
                        <Chip
                          label={event.category}
                          color="primary"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 16,
                            right: 16,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            },
                          }}
                        />
                      )}
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main', lineHeight: 1.4 }}>
                        {event.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">
                          {new Date(event.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                        <LocationOnIcon sx={{ fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">
                          {event.location}
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'text.secondary', 
                          lineHeight: 1.6,
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {event.description}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<ReadMoreIcon />}
                        onClick={() => handleReadMore(event.id)}
                        sx={{
                          mt: 'auto',
                          width: '100%',
                          py: 1,
                          '&:hover': {
                            backgroundColor: 'primary.main',
                            color: 'white',
                          },
                        }}
                      >
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Events; 