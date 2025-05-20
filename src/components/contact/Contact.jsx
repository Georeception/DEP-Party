import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Card, CardContent, Divider, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
  return (
    <Box sx={{
      mt: { xs: 8, sm: 10 },
      minHeight: '100vh',
      background: 'linear-gradient(90deg, #4CAF50 0%, #FFD700 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      py: 6,
    }}>
      <Container maxWidth="md">
        <Card sx={{ borderRadius: 4, boxShadow: 6, overflow: 'hidden', p: { xs: 2, sm: 4 } }}>
          <CardContent>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                mb: 1,
                color: 'primary.main',
                letterSpacing: 1,
                fontSize: { xs: '1.5rem', sm: '2rem' },
              }}
            >
              Contact Us
            </Typography>
            <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 3, color: 'text.secondary', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              We'd love to hear from you. Fill out the form and our team will get back to you soon.
            </Typography>
            <Grid container spacing={4} alignItems="flex-start">
              <Grid item xs={12} md={6}>
                <Stack spacing={2}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <EmailIcon color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>info@party.com</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>+1 234 567 890</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>123 Party Street, City, Country</Typography>
                  </Box>
                </Stack>
                <Divider sx={{ my: 3, display: { xs: 'block', md: 'none' } }} />
                {/* Google Map */}
                <Box sx={{ mt: 3, borderRadius: 2, overflow: 'hidden', boxShadow: 2 }}>
                  <iframe
                    title="Party Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3975.857964073964!2d37.00000000000001!3d-1.0000000000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a0000000001%3A0x0000000000000001!2sNairobi!5e0!3m2!1sen!2ske!4v1680000000000!5m2!1sen!2ske"
                    width="100%"
                    height="180"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    label="Name"
                    margin="dense"
                    required
                    variant="outlined"
                    size="small"
                    InputProps={{ style: { fontSize: '0.95rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    margin="dense"
                    required
                    type="email"
                    variant="outlined"
                    size="small"
                    InputProps={{ style: { fontSize: '0.95rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Subject"
                    margin="dense"
                    required
                    variant="outlined"
                    size="small"
                    InputProps={{ style: { fontSize: '0.95rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    margin="dense"
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    size="small"
                    InputProps={{ style: { fontSize: '0.95rem' } }}
                    InputLabelProps={{ style: { fontSize: '0.95rem' } }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    sx={{ mt: 2, borderRadius: 2, fontWeight: 'bold', fontSize: '1rem', py: 1 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Contact; 