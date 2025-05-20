import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

const NewsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-5px)',
    cursor: 'pointer',
  }
}));

const NewsGrid = () => {
  const newsItems = [
    {
      title: "Latest Policy Announcements",
      image: "/path-to-image1.jpg",
      date: "April 10, 2024"
    },
    {
      title: "Community Outreach Programs",
      image: "/path-to-image2.jpg",
      date: "April 9, 2024"
    },
    {
      title: "Economic Development Plans",
      image: "/path-to-image3.jpg",
      date: "April 8, 2024"
    }
  ];

  return (
    <Box sx={{ py: 8, backgroundColor: '#f5f5f5' }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
          LATEST NEWS
        </Typography>
        <Grid container spacing={4}>
          {newsItems.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <NewsCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                />
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {item.date}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </NewsCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default NewsGrid; 