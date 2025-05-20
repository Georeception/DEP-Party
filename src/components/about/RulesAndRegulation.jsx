import React from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  marginTop: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const RulesAndRegulation = () => {
  const rules = [
    {
      title: 'Membership Requirements',
      items: [
        'Must be a Kenyan citizen',
        'Must be of sound mind',
        'Must not be a member of another political party',
        'Must uphold the party\'s values and principles'
      ]
    },
    {
      title: 'Code of Conduct',
      items: [
        'Maintain high ethical standards',
        'Respect party leadership and members',
        'Promote unity and harmony',
        'Avoid actions that may tarnish the party\'s image'
      ]
    },
    {
      title: 'Disciplinary Measures',
      items: [
        'Warning letters for minor violations',
        'Suspension for serious violations',
        'Expulsion for gross misconduct',
        'Right to appeal disciplinary decisions'
      ]
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          py: 8,
          mb: 6,
          position: 'relative',
          height: '60vh',
          backgroundImage: 'url("/images/leadership.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#000',
            opacity: 0.3,
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Rules & Regulations
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              color: 'white',
              mt: 2,
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1rem', sm: '1.25rem' },
            }}
          >
            Guidelines that govern our party operations and member conduct
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <StyledPaper elevation={3}>
          {rules.map((section, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 'bold', 
                  color: 'primary.main',
                  fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                }}
              >
                {section.title}
              </Typography>
              <List>
                {section.items.map((item, idx) => (
                  <ListItem key={idx} sx={{ py: 1 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={item} 
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: { xs: '0.9rem', sm: '1rem' },
                          lineHeight: 1.6,
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default RulesAndRegulation; 