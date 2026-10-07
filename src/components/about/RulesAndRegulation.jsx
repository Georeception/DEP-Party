import React from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageHero from '../PageHero';

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
      <PageHero
        tag="Governance"
        title="Rules & Regulations"
        subtitle="Guidelines that govern our party operations and member conduct"
        image="/images/leadership.jpg"
      />

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