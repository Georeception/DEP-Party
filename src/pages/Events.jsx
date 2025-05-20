import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Chip
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';
import { eventsData } from '../data/staticData';

const Events = () => {
  const navigate = useNavigate();

  const handleReadMore = (eventId) => {
    if (!eventId) {
      console.error('Invalid event ID:', eventId);
      return;
    }
    navigate(`/events/${eventId}`);
  };

  return (
    <Box sx={{ mt: 10, py: 10, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: 'green' }}>
          Events
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
          Join us at our upcoming events and be part of our community.
        </Typography>
        {!Array.isArray(eventsData) || eventsData.length === 0 ? (
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
            {eventsData.map((event) => (
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
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
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
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Events; 