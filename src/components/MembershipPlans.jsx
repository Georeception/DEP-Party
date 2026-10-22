import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Link, useNavigate } from 'react-router-dom';
import {
  getMembershipAmount,
  isFreeRegistrationPeriod,
  membershipCategories,
  membershipPlans,
} from '../data/membershipPlans';

const formatAmount = (amount) => `KES ${amount.toLocaleString('en-KE')}`;

const MembershipPlans = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('general');
  const [registrationIsFree, setRegistrationIsFree] = useState(isFreeRegistrationPeriod);
  const visiblePlans = membershipPlans.filter((plan) => (
    category === 'general' || plan.youthAmount !== null
  ));

  React.useEffect(() => {
    const timer = window.setInterval(() => setRegistrationIsFree(isFreeRegistrationPeriod()), 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <Box sx={{
      py: { xs: 7, md: 10 },
      background: 'linear-gradient(145deg, #103d2b 0%, #1e6e43 62%, #174c35 100%)',
      color: 'common.white',
    }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 760, mx: 'auto', textAlign: 'center', mb: 5 }}>
          <Chip
            label="YOUR PLACE IN THE MOVEMENT"
            sx={{
              mb: 2,
              color: '#f5d66b',
              bgcolor: 'rgba(255,255,255,0.1)',
              fontWeight: 800,
              letterSpacing: 1,
            }}
          />
          <Typography variant="h2" component="h2" sx={{ mb: 2, color: 'white' }}>
            Membership plans
          </Typography>
          <Typography sx={{ color: 'rgba(255,255,255,0.82)', fontSize: { xs: '1rem', md: '1.1rem' } }}>
            Choose the membership that reflects how you want to serve. Registration is free for every plan
            through 30 November 2026.
          </Typography>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}>
          <Tabs
            value={category}
            onChange={(_, value) => setCategory(value)}
            aria-label="Membership pricing categories"
            textColor="inherit"
            sx={{
              '& .MuiTabs-indicator': { bgcolor: '#f5d66b' },
              '& .MuiTab-root': {
                color: 'rgba(255,255,255,0.7)',
                px: { xs: 2, sm: 4 },
                '&.Mui-selected': { color: 'white' },
              },
            }}
          >
            {membershipCategories.map((option) => (
              <Tab key={option.id} value={option.id} label={option.label} />
            ))}
          </Tabs>
        </Box>

        <Grid container spacing={2.5}>
          {visiblePlans.map((plan) => {
            const amount = getMembershipAmount(plan, category);
            return (
              <Grid item xs={12} sm={6} lg={4} key={plan.id}>
                <Card
                  component={Link}
                  to={`/volunteer?plan=${encodeURIComponent(plan.title)}&category=${category}`}
                  aria-label={`Choose ${plan.title} membership`}
                  sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: 350,
                    display: 'block',
                    textAlign: 'left',
                    textDecoration: 'none',
                    color: 'text.primary',
                    bgcolor: 'background.paper',
                    border: '1px solid rgba(255,255,255,0.35)',
                    '&:focus-visible': { outline: '3px solid #f5d66b', outlineOffset: 2 },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      borderColor: '#f5d66b',
                      boxShadow: '0 18px 40px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <CardContent sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 2.5, md: 3 },
                  }}>
                    <Typography variant="h4" component="h3" sx={{ color: 'primary.dark', mb: 1 }}>
                      {plan.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 54 }}>
                      {plan.description}
                    </Typography>
                    <Box sx={{ my: 2 }}>
                      {registrationIsFree ? (
                        <>
                          <Typography variant="h4" sx={{ color: 'success.main', fontWeight: 800 }}>
                            FREE
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {amount === 0 ? 'This plan remains free' : `KES ${amount.toLocaleString('en-KE')} from 1 December 2026`}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="h4" sx={{ color: 'primary.dark', fontWeight: 800 }}>
                          {amount === 0 ? 'Always free' : formatAmount(amount)}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ flexGrow: 1 }}>
                      {plan.features.map((feature) => (
                        <Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                          <CheckCircleOutlineIcon sx={{ mr: 1, mt: '2px', fontSize: 19, color: 'primary.main' }} />
                          <Typography variant="body2" color="text.secondary">{feature}</Typography>
                        </Box>
                      ))}
                    </Box>
                    <Typography
                      component="span"
                      variant="button"
                      sx={{ alignSelf: 'flex-start', mt: 2, color: 'primary.dark' }}
                    >
                      Select this plan
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{
          mt: 4,
          p: { xs: 2, sm: 2.5 },
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: 2,
          textAlign: 'center',
          bgcolor: 'rgba(255,255,255,0.08)',
        }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.9)' }}>
            {registrationIsFree
              ? 'No payment is needed before the deadline. From 1 December 2026, Paystack checkout will be used for plans with a fee.'
              : 'Secure Paystack checkout is available for plans with a fee.'}
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate(`/volunteer?category=${category}`)}
            sx={{
              mt: 2,
              px: 3,
              bgcolor: '#f5d66b',
              color: '#173b2b',
              '&:hover': { bgcolor: '#ffe58a' },
            }}
          >
            Join the party
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default MembershipPlans;
