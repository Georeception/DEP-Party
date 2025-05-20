import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: theme.palette.primary.light,
  '&:hover': {
    transform: 'translateY(-8px)',
    borderColor: theme.palette.primary.main,
    '& .category-box': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const MembershipPlans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      title: 'Mwananchi',
      type: 'member',
      category: 'Welcome',
      features: [
        'Ordinary Citizens',
        'Driving grassroots efforts',
        'Building the party\'s strength'
      ],
      label: 'Foundation of our Party'
    },
    {
      title: 'Bronze',
      type: 'member',
      category: 'Officials',
      features: [
        'County-level officials',
        'Representative of party in counties',
        'Effective local governance'
      ],
      label: 'Branch Officials'
    },
    {
      title: 'Silver',
      type: 'member',
      category: 'Aspirants',
      features: [
        'Officials/MCA',
        'Top 6 branch officials',
        'Core leadership at the sub-county level'
      ],
      label: 'Aspirants'
    },
    {
      title: 'Gold',
      type: 'member',
      category: 'Aspirant',
      features: [
        'NEC/MP/Senate aspirants',
        'NEC officials, and MP and Senate aspirants',
        'Fostering high-level legislative within the party'
      ],
      label: 'Aspirants'
    },
    {
      title: 'Platinum',
      type: 'member',
      category: 'Aspirant',
      features: [
        'Top leadership/Governor',
        'Top leadership aspirants',
        'Party Governance and strategic decision-making'
      ],
      label: 'Aspirants'
    }
  ];

  const handleJoinNow = () => {
    navigate('/volunteer');
  };

  return (
    <Box sx={{ py: { xs: 6, sm: 8, md: 10 }, backgroundColor: '#000' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            mb: 2,
            color: 'primary.main',
            fontWeight: 'bold',
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          Membership Plans
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: { xs: 4, sm: 6, md: 8 },
            maxWidth: '700px',
            mx: 'auto',
            color: 'white',
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          Join our movement and be part of the change. Choose the membership level that best suits your
          role in shaping our nation's future.
        </Typography>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <StyledCard>
                <CardContent sx={{ 
                  p: { xs: 2, sm: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1, 
                      fontWeight: 'bold', 
                      textAlign: 'center',
                      color: 'primary.main',
                      fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    }}
                  >
                    {plan.title}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mb: 2,
                      color: 'text.secondary',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    {plan.type}
                  </Typography>
                  <Box
                    className="category-box"
                    sx={{
                      backgroundColor: 'primary.light',
                      color: 'white',
                      py: { xs: 0.5, sm: 1 },
                      px: { xs: 1, sm: 2 },
                      borderRadius: 2,
                      mb: { xs: 2, sm: 3 },
                      textAlign: 'center',
                      transition: 'background-color 0.3s ease-in-out',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    }}
                  >
                    {plan.category}
                  </Box>
                  <Box sx={{ flexGrow: 1, mb: { xs: 2, sm: 3 } }}>
                    {plan.features.map((feature, featureIndex) => (
                      <Box
                        key={featureIndex}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          mb: { xs: 1, sm: 2 },
                        }}
                      >
                        <CheckCircleOutlineIcon 
                          sx={{ 
                            mr: 1, 
                            color: 'primary.main',
                            mt: 0.3,
                            fontSize: { xs: 16, sm: 20 },
                          }} 
                        />
                        <Typography 
                          variant="body2" 
                          sx={{
                            color: 'text.secondary',
                            lineHeight: 1.4,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          }}
                        >
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      textAlign: 'center',
                      fontStyle: 'italic',
                      color: 'text.secondary',
                      mt: 'auto',
                      mb: 2,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    }}
                  >
                    {plan.label}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ 
          textAlign: 'center', 
          mt: { xs: 4, sm: 6 },
        }}>
          <Button
            variant="contained"
            onClick={handleJoinNow}
            sx={{
              backgroundColor: '#006400',
              color: 'white',
              py: { xs: 1.5, sm: 2 },
              px: { xs: 3, sm: 4 },
              fontSize: { xs: '0.875rem', sm: '1rem' },
              '&:hover': {
                backgroundColor: '#004d00',
              },
            }}
          >
            Join Now
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipPlans; 