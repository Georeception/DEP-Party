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
  Button
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';
import PageHero from '../components/PageHero';
import { newsApi } from '../services/api';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Function to strip HTML tags and clean text
  const cleanText = (html) => {
    if (!html) return '';
    // Remove HTML tags
    const plainText = html.replace(/<[^>]+>/g, '');
    // Remove special characters and extra whitespace
    return plainText
      .replace(/&nbsp;/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsApi.getAll();
        //console.log('News API Response:', response);
        
        if (response && response.data && response.data.results) {
          // Clean the content of each news item
          const cleanedNews = response.data.results.map(item => ({
            ...item,
            content: cleanText(item.content)
          }));
          setNews(Array.isArray(cleanedNews) ? cleanedNews : []);
        } else {
          console.warn('News API response is not in expected format:', response);
          setNews([]);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to fetch news. Please try again later.');
        setNews([]);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const handleReadMore = (articleId) => {
    //console.log('Navigating to article with ID:', articleId);
    if (!articleId) {
      console.error('Invalid article ID:', articleId);
      return;
    }
    navigate(`/news/${articleId}`);
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
        tag="News"
        title="Latest News"
        subtitle="Stay informed with updates from across our movement and the communities we serve."
      />
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {!Array.isArray(news) || news.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No News Articles Available
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Check back later for the latest updates and news from our party.
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {news.map((article) => {
              //console.log('Article data:', article);
              return (
                <Grid item xs={12} md={4} key={article.id}>
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
                        '& .news-image': {
                          transform: 'scale(1.05)',
                        },
                      },
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={article.image || '/images/placeholder.jpg'}
                        alt={article.title}
                        className="news-image"
                        sx={{ transition: 'transform 0.3s ease-in-out' }}
                      />
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: 'primary.main', lineHeight: 1.4 }}>
                        {cleanText(article.title)}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                        <CalendarTodayIcon sx={{ fontSize: 16, mr: 1 }} />
                        <Typography variant="body2">
                          {new Date(article.created_at).toLocaleDateString()}
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
                        {article.content}
                      </Typography>
                      <Button
                        variant="outlined"
                        color="primary"
                        endIcon={<ReadMoreIcon />}
                        onClick={() => handleReadMore(article.id)}
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

export default News; 