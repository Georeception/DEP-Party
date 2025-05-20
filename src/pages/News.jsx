import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from 'react-router-dom';
import { newsData } from '../data/staticData';

const News = () => {
  const navigate = useNavigate();

  const handleReadMore = (articleId) => {
    if (!articleId) {
      console.error('Invalid article ID:', articleId);
      return;
    }
    navigate(`/news/${articleId}`);
  };

  return (
    <Box sx={{ mt: 10, py: 10, backgroundColor: '#fff' }}>
      <Container maxWidth="lg">
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center', color: 'green' }}>
          News
        </Typography>
        <Typography variant="body1" sx={{ mb: 6, textAlign: 'center', color: 'text.secondary' }}>
          Stay up to date with the latest news and updates from our party.
        </Typography>
        {!Array.isArray(newsData) || newsData.length === 0 ? (
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
            {newsData.map((article) => (
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
                      {article.title}
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
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default News; 