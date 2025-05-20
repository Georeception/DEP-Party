import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Link,
  Stack,
  Divider,
  IconButton,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSubscribe = async () => {
    try {
      const response = await axios.post('/api/newsletter/subscribe/', { email });
      setSnackbar({
        open: true,
        message: response.data.message,
        severity: 'success',
      });
      setEmail('');
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.error || 'An error occurred',
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'yellow',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              About The Party
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Devolution Empowerment Party - Working for a better future through devolved governance and community empowerment.
            </Typography>
            <Stack direction="row" spacing={2}>
              <IconButton color="inherit" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="YouTube">
                <YouTubeIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="hover">Home</Link>
              <Link href="/manifesto" color="inherit" underline="hover">Our Manifesto</Link>
              <Link href="/news" color="inherit" underline="hover">News & Updates</Link>
              <Link href="/events" color="inherit" underline="hover">Events</Link>
              <Link href="/shop" color="inherit" underline="hover">Party Shop</Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Get Involved
            </Typography>
            <Stack spacing={1}>
              <Link href="/join" color="inherit" underline="hover">Join The Party</Link>
              <Link href="/volunteer" color="inherit" underline="hover">Volunteer</Link>
              <Link href="/donate" color="inherit" underline="hover">Donate</Link>
              <Link href="/contact" color="inherit" underline="hover">Contact Us</Link>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Party Headquarters
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: lenny.kivuti@geoafrica.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: +254 123 456 789
            </Typography>
            <Typography variant="body2">
              Address: Makutano, 45519 - 00100, Nairobi, Kenya
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              © {new Date().getFullYear()} Devolution Empowerment Party. All rights reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Subscribe to our newsletter"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  flexGrow: 1,
                  '& .MuiOutlinedInput-root': {
                    color: 'yellow',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'yellow',
                    },
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSubscribe}
                sx={{
                  bgcolor: 'yellow',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 0, 0.8)',
                  },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Footer; 