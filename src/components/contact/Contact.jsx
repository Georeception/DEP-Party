import React from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Card, CardContent, Divider, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PageHero from '../PageHero';

const officeLocations = [
  {
    name: 'Geomaps Centre',
    address: 'Upper Hill, Nairobi, Kenya',
    query: 'Geomaps+Centre,+Upper+Hill,+Nairobi,+Kenya',
    zoom: 17,
  },
  {
    name: 'Embu',
    address: 'Embu, Kenya',
    query: 'Embu,+Kenya',
    zoom: 16,
  },
  {
    name: 'Lenny Kivuti International Centre (LKIC)',
    address: 'Embu, Kenya',
    query: 'Lenny+Kivuti+International+Centre+(LKIC),+Embu,+Kenya',
    zoom: 17,
  },
];

const Contact = () => {
  return (
    <Box sx={{
      minHeight: '100vh',
      backgroundColor: '#edf2ec',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'center',
      py: 0,
    }}>
      <PageHero
        tag="Contact"
        title="Get in touch"
        subtitle="We’d love to hear from you and respond to your questions, ideas, and support."
        image="/images/contact.png"
      />
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
                    <Stack spacing={0.5}>
                      <Typography
                        component="a"
                        href="mailto:executive.director@dep-party.com"
                        variant="body2"
                        sx={{ fontSize: '0.95rem', color: 'inherit', textDecoration: 'none' }}
                      >
                        executive.director@dep-party.com
                      </Typography>
                      <Typography
                        component="a"
                        href="mailto:info@dep-party.com"
                        variant="body2"
                        sx={{ fontSize: '0.95rem', color: 'inherit', textDecoration: 'none' }}
                      >
                        info@dep-party.com
                      </Typography>
                    </Stack>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon color="primary" fontSize="small" />
                    <Typography
                      component="a"
                      href="tel:0724253622"
                      variant="body2"
                      sx={{ fontSize: '0.95rem', color: 'inherit', textDecoration: 'none' }}
                    >
                      0724253622
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ fontSize: '0.95rem' }}>
                      <strong>Physical Location:</strong> Geomaps Centre, Upper Hill, Nairobi, Kenya
                      <br />
                      <strong>Postal Address:</strong> P.O. Box 61071 - 00200, City Square, Nairobi
                    </Typography>
                  </Box>
                </Stack>
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
            <Divider sx={{ my: 5 }} />
            <Typography
              variant="h5"
              component="h2"
              sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold', textAlign: 'center' }}
            >
              Find Us
            </Typography>
            <Grid container spacing={3}>
              {officeLocations.map((location) => (
                <Grid item xs={12} md={4} key={location.name}>
                  <Box
                    sx={{
                      height: '100%',
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 2,
                      overflow: 'hidden',
                      backgroundColor: 'background.paper',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                        {location.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {location.address}
                      </Typography>
                    </Box>
                    <Box sx={{ height: { xs: 250, md: 280 } }}>
                      <iframe
                        title={`Map showing ${location.name}`}
                        src={`https://www.google.com/maps?q=${location.query}&z=${location.zoom}&output=embed`}
                        width="100%"
                        height="100%"
                        style={{ border: 0, display: 'block' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Contact; 