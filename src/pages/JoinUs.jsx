import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Card,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import PageHero from '../components/PageHero';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { loadPaystack } from '../services/paystack';
import { locationApi, membershipApi } from '../services/api';
import {
  getMembershipAmount,
  isFreeRegistrationPeriod,
  membershipCategories,
  membershipPlans,
} from '../data/membershipPlans';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  borderRadius: 8,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const MembershipCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'selected',
})(({ theme, selected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: selected ? theme.palette.primary.main : theme.palette.primary.light,
  cursor: 'pointer',
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.secondary.main}`,
    outlineOffset: 2,
  },
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

const JoinUs = () => {
  const [searchParams] = useSearchParams();
  const requestedPlan = searchParams.get('plan');
  const requestedCategory = searchParams.get('category');
  const requestedCategoryIsValid = membershipCategories.some(({ id }) => id === requestedCategory);
  const initialCategory = requestedCategoryIsValid ? requestedCategory : 'general';
  const initialPlan = membershipPlans.find((plan) => (
    plan.id === requestedPlan || plan.title === requestedPlan
  ));
  const [activeStep, setActiveStep] = useState(initialPlan ? 1 : 0);
  const [selectedPlan, setSelectedPlan] = useState(initialPlan?.id || null);
  const [selectedCategory, setSelectedCategory] = useState(
    initialPlan?.id === 'mwananchi' && initialCategory === 'youth_pwd' ? 'general' : initialCategory
  );
  const [registrationIsFree, setRegistrationIsFree] = useState(isFreeRegistrationPeriod);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(null);
  const [locations, setLocations] = useState({
    counties: [],
    constituencies: [],
    wards: []
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    occupation: '',
    interests: '',
    county: '',
    constituency: '',
    ward: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const selectedPlanDetails = membershipPlans.find((plan) => plan.id === selectedPlan);
  const selectedAmount = getMembershipAmount(selectedPlanDetails, selectedCategory);
  const requiresPayment = selectedAmount > 0 && !registrationIsFree;

  useEffect(() => {
    const refreshRegistrationPeriod = () => setRegistrationIsFree(isFreeRegistrationPeriod());
    const timer = window.setInterval(refreshRegistrationPeriod, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  const steps = ['Select Membership Plan', 'Personal Information', 'Payment'];

  // Fetch counties on component mount
  useEffect(() => {
    const fetchCounties = async () => {
      try {
        const data = await locationApi.getCounties();
        const countiesList = Array.isArray(data) ? data : data.results || [];
        //console.log('Counties loaded:', countiesList); // Debug log
        setLocations(prev => ({ 
          ...prev, 
          counties: countiesList
        }));
      } catch (error) {
        console.error('Error fetching counties:', error);
        setLocations(prev => ({ ...prev, counties: [] }));
      }
    };
    fetchCounties();
  }, []);

  // Fetch constituencies when county changes
  const handleCountyChange = async (e) => {
    const { name, value } = e.target;
    //console.log('County selected:', value); // Debug log
    setFormData(prev => ({ ...prev, [name]: value, constituency: '', ward: '' }));
    
    try {
      const data = await locationApi.getConstituencies(value);
      const constituenciesList = Array.isArray(data) ? data : data.results || [];
      //console.log('Constituencies loaded:', constituenciesList); // Debug log
      setLocations(prev => ({ 
        ...prev, 
        constituencies: constituenciesList,
        wards: [] 
      }));
    } catch (error) {
      console.error('Error fetching constituencies:', error);
      setLocations(prev => ({ ...prev, constituencies: [], wards: [] }));
    }
  };

  // Fetch wards when constituency changes
  const handleConstituencyChange = async (e) => {
    const { name, value } = e.target;
    //console.log('Constituency selected:', value); // Debug log
    setFormData(prev => ({ ...prev, [name]: value, ward: '' }));
    
    if (!value) {
      setLocations(prev => ({ ...prev, wards: [] }));
      return;
    }
    
    try {
      const data = await locationApi.getWards(value);
      const wardsList = Array.isArray(data) ? data : data.results || [];
      //console.log('Wards loaded:', wardsList); // Debug log
      setLocations(prev => ({ 
        ...prev, 
        wards: wardsList
      }));
    } catch (error) {
      console.error('Error fetching wards:', error);
      setLocations(prev => ({ ...prev, wards: [] }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(`Form field ${name} changed to:`, value); // Debug log
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setActiveStep(1);
  };

  const handleNext = () => {
    if (activeStep === 1) {
      const requiredFields = ['firstName', 'lastName', 'phone', 'age', 'occupation', 'county', 'constituency', 'ward', 'gender'];
      if (requiresPayment) requiredFields.push('email');
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError('Please fill in all required fields marked with *');
        return;
      }
      if (requiresPayment && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        setError('Enter a valid email address for Paystack checkout.');
        return;
      }
    }
    
    setActiveStep((prevStep) => prevStep + 1);
    setError(''); // Clear any previous errors
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setError('');

    const freeRegistration = isFreeRegistrationPeriod();
    setRegistrationIsFree(freeRegistration);
    const paymentRequired = selectedAmount > 0 && !freeRegistration;
    const requiredFields = ['firstName', 'lastName', 'phone', 'age', 'occupation', 'county', 'constituency', 'ward', 'gender'];
    if (paymentRequired) requiredFields.push('email');
    const missingFields = requiredFields.filter(field => !formData[field]);
    if (missingFields.length > 0) {
      setError('Please fill in all required fields marked with *');
      return;
    }

    if (paymentRequired && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      setError('Enter a valid email address for Paystack checkout.');
      return;
    }

    const membershipData = {
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      age: formData.age,
      gender: formData.gender,
      occupation: formData.occupation.trim(),
      county: formData.county,
      constituency: formData.constituency,
      ward: formData.ward,
      membership_type: selectedPlan,
      membership_category: selectedCategory,
    };

    if (!paymentRequired) {
      setIsSubmitting(true);
      try {
        await membershipApi.create(membershipData, false);
        setSubmitted(true);
      } catch (error) {
        console.error('Error submitting membership:', error);
        setError(error.response?.data?.detail || 'An error occurred while submitting your application. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
    if (!publicKey && !pendingPayment) {
      setError('Paystack is not configured yet. Please add the public key to the frontend environment and the secret key to the backend environment.');
      return;
    }

    const verifyPayment = async (reference) => {
      const paymentDetails = { reference, membershipData };
      setPendingPayment(paymentDetails);
      await membershipApi.verifyPaystackPayment(reference, membershipData);
      setPendingPayment(null);
      setSubmitted(true);
      setActiveStep(3);
      setIsSubmitting(false);
    };

    setIsSubmitting(true);
    try {
      if (pendingPayment) {
        await membershipApi.verifyPaystackPayment(
          pendingPayment.reference,
          pendingPayment.membershipData
        );
        setPendingPayment(null);
        setSubmitted(true);
        setActiveStep(3);
        setIsSubmitting(false);
      } else {
        const PaystackPop = await loadPaystack();
        const payment = PaystackPop.setup({
          key: publicKey,
          email: membershipData.email,
          amount: selectedAmount * 100,
          currency: 'KES',
          callback: async (response) => {
            try {
              await verifyPayment(response.reference);
            } catch (error) {
              console.error('Error verifying Paystack membership payment:', error);
              setError(error.response?.data?.detail || 'Payment was received, but could not be verified yet. Retry verification to complete your application.');
            } finally {
              setIsSubmitting(false);
            }
          },
          onClose: () => {
            setIsSubmitting(false);
          },
        });

        payment.openIframe();
      }
    } catch (error) {
      console.error('Error submitting membership payment:', error);
      setError(error.response?.data?.detail || 'Unable to start Paystack checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Box sx={{
              mb: 3,
              p: { xs: 2, sm: 2.5 },
              borderRadius: 2,
              bgcolor: 'success.light',
              color: 'success.dark',
            }}>
              <Typography variant="h6" sx={{ mb: 0.5 }}>
                {registrationIsFree ? 'Register for free until 30 November 2026' : 'Registration is open'}
              </Typography>
              <Typography variant="body2">
                {registrationIsFree
                  ? 'Every plan is free during the registration period. From 1 December, paid plans will continue through Paystack checkout.'
                  : 'Choose a plan to see the fee and complete your application securely.'}
              </Typography>
            </Box>
            <Tabs
              value={selectedCategory}
              onChange={(_, value) => {
                setSelectedCategory(value);
                if (value === 'youth_pwd' && selectedPlan === 'mwananchi') {
                  setSelectedPlan(null);
                  setActiveStep(0);
                }
              }}
              aria-label="Membership pricing categories"
              sx={{ mb: 3, borderBottom: 1, borderColor: 'divider' }}
            >
              {membershipCategories.map((category) => (
                <Tab key={category.id} value={category.id} label={category.label} />
              ))}
            </Tabs>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {membershipPlans
                .filter((plan) => selectedCategory === 'general' || plan.youthAmount !== null)
                .map((plan) => {
                  const amount = getMembershipAmount(plan, selectedCategory);
                  return (
                    <Grid item xs={12} sm={6} md={4} key={plan.id}>
                      <MembershipCard
                        component="div"
                        role="button"
                        tabIndex={0}
                        aria-pressed={selectedPlan === plan.id}
                        selected={selectedPlan === plan.id}
                        onClick={() => handlePlanSelect(plan.id)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            handlePlanSelect(plan.id);
                          }
                        }}
                        aria-label={`Choose ${plan.title} membership`}
                        sx={{
                          width: '100%',
                          textAlign: 'left',
                          bgcolor: selectedPlan === plan.id ? 'rgba(46, 139, 87, 0.06)' : 'background.paper',
                        }}
                      >
                        <CardContent sx={{
                          p: { xs: 2.5, sm: 3 },
                          display: 'flex',
                          flexDirection: 'column',
                          minHeight: 285,
                          height: '100%',
                        }}>
                          <Typography variant="h5" component="h2" sx={{ color: 'primary.dark', fontWeight: 800 }}>
                            {plan.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, minHeight: 48 }}>
                            {plan.description}
                          </Typography>
                          <Box sx={{ my: 2 }}>
                            {registrationIsFree ? (
                              <>
                                <Chip size="small" color="success" label="FREE REGISTRATION" sx={{ mb: 0.75, fontWeight: 800 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {amount === 0 ? 'Mwananchi membership remains free' : `KES ${amount.toLocaleString('en-KE')} from 1 December`}
                                </Typography>
                              </>
                            ) : (
                              <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 800 }}>
                                {amount === 0 ? 'Always free' : `KES ${amount.toLocaleString('en-KE')}`}
                              </Typography>
                            )}
                          </Box>
                          <Box sx={{ mt: 'auto' }}>
                            {plan.features.map((feature) => (
                              <Box key={feature} sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                                <CheckCircleOutlineIcon sx={{ mr: 1, mt: '2px', color: 'primary.main', fontSize: 19 }} />
                                <Typography variant="body2" color="text.secondary">{feature}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </CardContent>
                      </MembershipCard>
                    </Grid>
                  );
                })}
            </Grid>
          </>
        );
      case 1:
        return renderPersonalInfoStep();
      case 2:
        return renderPaymentStep();
      default:
        return null;
    }
  };

  const renderPersonalInfoStep = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          error={!formData.firstName && error}
          helperText={!formData.firstName && error ? 'First name is required' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          error={!formData.lastName && error}
          helperText={!formData.lastName && error ? 'Last name is required' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Email Address"
          name="email"
          type="email"
          required={requiresPayment}
          value={formData.email}
          onChange={handleChange}
          error={Boolean(error) && requiresPayment
            && (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))}
          helperText={Boolean(error) && !formData.email && requiresPayment
            ? 'Email address is required for Paystack'
            : Boolean(formData.email) && requiresPayment
              && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
              ? 'Enter a valid email address'
              : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={!formData.phone && error}
          helperText={!formData.phone && error ? 'Phone number is required' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          error={!formData.age && error}
          helperText={!formData.age && error ? 'Age is required' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!formData.gender && error}>
          <InputLabel>Gender</InputLabel>
          <Select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            label="Gender"
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
          {!formData.gender && error && (
            <FormHelperText>Gender is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          label="Occupation"
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          error={!formData.occupation && error}
          helperText={!formData.occupation && error ? 'Occupation is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth required error={!formData.county && error}>
          <InputLabel>County</InputLabel>
          <Select
            name="county"
            value={formData.county}
            onChange={handleCountyChange}
            label="County"
          >
            <MenuItem value="">Select a County</MenuItem>
            {locations.counties && locations.counties.map((county) => (
              <MenuItem key={county.id} value={county.id}>
                {county.name}
              </MenuItem>
            ))}
          </Select>
          {!formData.county && error && (
            <FormHelperText>County is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!formData.constituency && error} disabled={!formData.county}>
          <InputLabel>Constituency</InputLabel>
          <Select
            name="constituency"
            value={formData.constituency}
            onChange={handleConstituencyChange}
            label="Constituency"
          >
            <MenuItem value="">Select a Constituency</MenuItem>
            {locations.constituencies && locations.constituencies.map((constituency) => (
              <MenuItem key={constituency.id} value={constituency.id}>
                {constituency.name}
              </MenuItem>
            ))}
          </Select>
          {!formData.constituency && error && (
            <FormHelperText>Constituency is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth required error={!formData.ward && error} disabled={!formData.constituency}>
          <InputLabel>Ward</InputLabel>
          <Select
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            label="Ward"
          >
            <MenuItem value="">Select a Ward</MenuItem>
            {locations.wards && locations.wards.map((ward) => (
              <MenuItem key={ward.id} value={ward.id}>
                {ward.name}
              </MenuItem>
            ))}
          </Select>
          {!formData.ward && error && (
            <FormHelperText>Ward is required</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" color="error" sx={{ display: 'block', mt: 2 }}>
          * Fields marked with an asterisk are required
        </Typography>
      </Grid>
    </Grid>
  );

  const renderPaymentStep = () => {
    if (!requiresPayment) {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 800 }}>
            No Payment Required
          </Typography>
          <Typography variant="body1">
            {selectedAmount === 0
              ? 'Mwananchi membership is free. Submit your application to join.'
              : 'Your registration is free through 30 November 2026. Submit your application to join now.'}
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ maxWidth: 560, mx: 'auto', py: { xs: 1, sm: 2 } }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'primary.dark', fontWeight: 700 }}>
          Complete your membership payment
        </Typography>
        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: 'background.default' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1 }}>
            <Typography color="text.secondary">Membership plan</Typography>
            <Typography fontWeight={600}>{selectedPlanDetails?.title}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mb: 1 }}>
            <Typography color="text.secondary">Membership category</Typography>
            <Typography fontWeight={600}>
              {membershipCategories.find(({ id }) => id === selectedCategory)?.label}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <Typography color="text.secondary">Amount due</Typography>
            <Typography fontWeight={700} color="primary.main">
              KES {selectedAmount.toLocaleString('en-KE')}
            </Typography>
          </Box>
        </Paper>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Continue to Paystack to complete your payment securely. Your membership application will be submitted after the payment is verified.
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      <PageHero
        tag="Join us"
        title="Become a member"
        subtitle="Join a growing movement focused on service, unity, and meaningful national progress."
        image="/images/handss.jpg"
      />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Stepper 
          activeStep={activeStep} 
          sx={{ 
            mb: { xs: 2, sm: 4 },
            '& .MuiStepLabel-label': {
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
            },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <StyledPaper>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {submitted ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your membership application is complete. Thank you for joining us.
            </Alert>
          ) : (
            <>
              {renderStepContent(activeStep)}
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mt: { xs: 2, sm: 4 },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: { xs: 2, sm: 0 },
              }}>
                <Button
                  disabled={activeStep === 0 || isSubmitting || Boolean(pendingPayment)}
                  onClick={handleBack}
                  sx={{ 
                    mr: { xs: 0, sm: 1 },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  disabled={(activeStep === 0 && !selectedPlan) || isSubmitting || submitted}
                  sx={{
                    backgroundColor: '#006400',
                    '&:hover': {
                      backgroundColor: '#004d00',
                    },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  {isSubmitting
                    ? 'Processing…'
                    : activeStep !== steps.length - 1
                      ? 'Next'
                      : !requiresPayment
                        ? 'Submit Application'
                        : pendingPayment
                          ? 'Verify Payment'
                          : `Pay KES ${selectedAmount.toLocaleString('en-KE')} with Paystack`}
                </Button>
              </Box>
            </>
          )}
        </StyledPaper>
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Need help choosing a plan?
          </Typography>
          <Button
            component="a"
            href="https://wa.me/254724253622"
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            color="success"
          >
            WhatsApp us on 0724253622
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default JoinUs; 