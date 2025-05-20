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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { newsApi } from '../services/api';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await newsApi.getById(id);
        //console.log('News Detail API Response:', response);
        
        if (response?.data) {
          // Handle both array and single object responses
          const articleData = Array.isArray(response.data) ? response.data[0] : response.data;
          //console.log('Processed article data:', articleData);
          
          // Ensure we have the required fields
          if (articleData && articleData.title) {
            setArticle({
              id: articleData.id,
              title: articleData.title,
              content: articleData.content || '',
              image: articleData.image || '/images/placeholder.jpg',
              created_at: articleData.created_at || new Date().toISOString(),
              category: articleData.category?.name || '',
              author: articleData.author?.name || ''
            });
          } else {
            console.warn('Article data is missing required fields:', articleData);
            setArticle(null);
          }
        } else {
          console.warn('News Detail API response is not in expected format:', response);
          setArticle(null);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching news article:', err);
        setError('Failed to fetch news article. Please try again later.');
        setArticle(null);
        setLoading(false);
      }
    };

    if (id) {
      //console.log('Fetching article with ID:', id);
      fetchArticle();
    } else {
      console.error('No article ID provided');
      setError('Article not found');
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

  if (!article) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mt: 4 }}>
          Article not found
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
            onClick={() => navigate('/news')}
            sx={{ mb: 0 }}
          >
            Back to News
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
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
              {article.title}
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mb: 4, 
              color: 'text.secondary',
              flexWrap: 'wrap',
              gap: 2
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarTodayIcon sx={{ mr: 1 }} />
                <Typography variant="body1">
                  {new Date(article.created_at).toLocaleDateString()}
                </Typography>
              </Box>
              {article.category && (
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  • {article.category}
                </Typography>
              )}
              {article.author && (
                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                  • By {article.author}
                </Typography>
              )}
            </Box>

            {article.image && (
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
                  src={article.image}
                  alt={article.title}
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
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default NewsDetail; 