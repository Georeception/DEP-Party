import React from 'react';
import { Box, Container, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ActionButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: 'white',
  padding: '15px 30px',
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
  }
}));

const CallToAction = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: 'primary.main', 
              p: 4, 
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                TAKE ACTION
              </Typography>
              <Typography sx={{ mb: 3 }}>
                Get involved and make a difference in your community
              </Typography>
              <ActionButton variant="contained">
                GET INVOLVED
              </ActionButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              backgroundColor: 'secondary.main', 
              p: 4, 
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: 'white'
            }}>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>
                CONTRIBUTE
              </Typography>
              <Typography sx={{ mb: 3 }}>
                Support our mission with your contribution
              </Typography>
              <ActionButton variant="contained" sx={{ backgroundColor: 'primary.main', color: 'black' }}>
                DONATE NOW
              </ActionButton>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CallToAction; 