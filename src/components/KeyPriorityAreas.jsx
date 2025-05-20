import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
  },
}));

const KeyPriorityAreas = () => {
  const [expandedPriority, setExpandedPriority] = useState(null);

  const priorities = [
    {
      title: 'Priority 1: ECONOMY (Uchumi na Kazi)',
      details: [
        'Sustainable economy - Implementation of comprehensive Back to Business Economic Plan',
        'Agriculture and Food Security - Introduction of Guaranteed Minimum Return program',
        'Anti-corruption measures - Strengthening oversight institutions and whistleblower protection',
        'Job creation through SME support and skills development',
        'Digital economy transformation and innovation hubs'
      ]
    },
    {
      title: 'Priority 2: DEVOLUTION',
      details: [
        'Strengthening county governments through increased resource allocation',
        'Capacity building for county officials and staff',
        'Enhanced public participation in county decision-making',
        'Inter-county collaboration and resource sharing',
        'Monitoring and evaluation of devolved functions'
      ]
    },
    {
      title: 'Priority 3: SOCIAL INFRASTRUCTURE',
      details: [
        'Universal healthcare coverage and improved medical facilities',
        'Quality education and vocational training programs',
        'Affordable housing initiatives and urban planning',
        'Social protection for vulnerable populations',
        'Youth and women empowerment programs'
      ]
    },
    {
      title: 'Priority 4: GREENING KENYA',
      details: [
        'Environmental conservation and reforestation programs',
        'Renewable energy adoption and clean technology',
        'Sustainable waste management and recycling',
        'Climate change adaptation and mitigation',
        'Water resource management and conservation'
      ]
    },
    {
      title: 'Priority 5: CITIZEN RESPONSIBILITY',
      details: [
        'Civic education and democratic participation',
        'Community service and volunteerism',
        'Tax compliance and fiscal responsibility',
        'Environmental stewardship at individual level',
        'Active participation in local governance'
      ]
    }
  ];

  const handlePriorityClick = (index) => {
    setExpandedPriority(expandedPriority === index ? null : index);
  };

  return (
    <Box sx={{ py: 8, backgroundColor: '#FFD700' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <StyledCard sx={{ height: '100%' }}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    color: 'primary.main',
                    fontWeight: 'bold',
                    mb: 3,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -16,
                      left: 0,
                      width: 60,
                      height: 4,
                      backgroundColor: 'secondary.main'
                    }
                  }}
                >
                  Focus Point
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    textAlign: 'justify',
                    color: 'text.secondary',
                    lineHeight: 1.8,
                    mb: { xs: 4, md: 0 },
                  }}
                >
                  Our comprehensive agenda focuses on five key areas that form the foundation of our nation's
                  development. Each priority area represents our commitment to creating lasting positive change
                  through concrete actions and measurable goals.
                </Typography>
                <Box
                  component="img"
                  src="/images/focus.jpg"
                  alt="Focus Point"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    mt: 1,
                    borderRadius: 1,
                  }}
                />
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              {priorities.map((priority, index) => (
                <StyledCard 
                  key={index} 
                  sx={{ 
                    mb: 2,
                    backgroundColor: 'white',
                  }}
                >
                  <Box
                    onClick={() => handlePriorityClick(index)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      p: 3,
                      borderBottom: expandedPriority === index ? '1px solid' : 'none',
                      borderColor: 'primary.light',
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        color: 'primary.main',
                        fontWeight: 'bold',
                      }}
                    >
                      {priority.title}
                    </Typography>
                    {expandedPriority === index ? (
                      <RemoveIcon sx={{ color: 'primary.main' }} />
                    ) : (
                      <AddIcon sx={{ color: 'primary.main' }} />
                    )}
                  </Box>
                  {expandedPriority === index && (
                    <CardContent sx={{ pt: 3, pb: 3 }}>
                      <Grid container spacing={2}>
                        {priority.details.map((detail, detailIndex) => (
                          <Grid item xs={12} key={detailIndex}>
                            <Typography 
                              variant="body1" 
                              sx={{ 
                                display: 'flex',
                                alignItems: 'flex-start',
                                textAlign: 'justify',
                                color: 'text.secondary',
                                lineHeight: 1.8,
                                '&:before': {
                                  content: '""',
                                  width: 6,
                                  height: 6,
                                  backgroundColor: 'primary.main',
                                  borderRadius: '50%',
                                  mr: 2,
                                  mt: 1.5,
                                  flexShrink: 0,
                                },
                              }}
                            >
                              {detail}
                            </Typography>
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  )}
                </StyledCard>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default KeyPriorityAreas; 