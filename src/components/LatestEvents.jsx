import React, { useEffect, useState } from 'react';
import {
  Box,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { eventsApi, newsApi } from '../services/api';

const getItemDate = item => {
  const value = item.type === 'event'
    ? item.start_date || item.created_at
    : item.published_at || item.created_at;
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : null;
};

const getDescription = item => {
  const description = item.description || item.summary || '';
  return description.replace(/<[^>]*>/g, '').trim();
};

const LatestEvents = () => {
  const [items, setItems] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;

    const loadLatestItems = async () => {
      const [newsResult, eventsResult] = await Promise.allSettled([
        newsApi.getAll({ fallbackOnError: false }),
        eventsApi.getAll({ fallbackOnError: false }),
      ]);

      if (!active) return;

      const news = newsResult.status === 'fulfilled'
        ? newsResult.value.data.results.map(item => ({ ...item, type: 'news' }))
        : [];
      const events = eventsResult.status === 'fulfilled'
        ? eventsResult.value.data.results.map(item => ({ ...item, type: 'event' }))
        : [];
      const latest = [...news, ...events]
        .sort((a, b) => (getItemDate(b)?.getTime() || 0) - (getItemDate(a)?.getTime() || 0))
        .slice(0, 3);

      setItems(latest);
      setLoadError(newsResult.status === 'rejected' && eventsResult.status === 'rejected');
    };

    loadLatestItems();
    return () => {
      active = false;
    };
  }, []);

  return (
    <Box sx={{ py: { xs: 7, md: 10 }, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            color: 'primary.main',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Latest News &amp; Events
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 6,
            textAlign: 'center',
            maxWidth: '700px',
            mx: 'auto',
            color: 'text.secondary',
          }}
        >
          Stay updated with our recent activities and initiatives that are shaping the future of our nation.
        </Typography>
        {loadError ? (
          <Typography role="status" color="text.secondary" textAlign="center">
            Latest news and events could not be loaded.
          </Typography>
        ) : items.length === 0 ? (
          <Typography role="status" color="text.secondary" textAlign="center">
            No news or events are currently available.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {items.map(item => {
              const date = getItemDate(item);
              return (
                <Grid item xs={12} md={4} key={`${item.type}-${item.id}`}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      overflow: 'hidden',
                      transition: 'transform 180ms ease, box-shadow 180ms ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4,
                      },
                      '&:focus-within': {
                        outline: '2px solid',
                        outlineColor: 'primary.main',
                        outlineOffset: 2,
                      },
                    }}
                  >
                    <ButtonBase
                      onClick={() => navigate(`/${item.type === 'news' ? 'news' : 'events'}/${item.id}`)}
                      aria-label={`Open ${item.type}: ${item.title}`}
                      sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'stretch',
                        textAlign: 'left',
                      }}
                    >
                      {item.image && (
                        <CardMedia
                          component="img"
                          height="220"
                          image={item.image}
                          alt=""
                          sx={{ objectFit: 'cover' }}
                        />
                      )}
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                          <Chip
                            size="small"
                            label={item.type === 'news' ? 'News' : 'Event'}
                            color="primary"
                            variant="outlined"
                          />
                          {date && (
                            <Typography variant="caption" color="text.secondary">
                              {date.toLocaleDateString()}
                            </Typography>
                          )}
                        </Box>
                        <Typography
                          variant="h5"
                          component="h3"
                          sx={{ mb: 1.5, fontWeight: 'bold', color: 'primary.main', lineHeight: 1.4 }}
                        >
                          {item.title}
                        </Typography>
                        {getDescription(item) && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: 'text.secondary',
                              lineHeight: 1.7,
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {getDescription(item)}
                          </Typography>
                        )}
                      </CardContent>
                    </ButtonBase>
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

export default LatestEvents;
