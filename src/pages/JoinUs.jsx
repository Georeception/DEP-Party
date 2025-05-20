import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormHelperText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaymentIcon from '@mui/icons-material/Payment';
import { useAuth } from '../contexts/AuthContext';
import { locationApi, membershipApi } from '../services/api';

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

const MembershipCard = styled(Card)(({ theme, selected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid',
  borderColor: selected ? theme.palette.primary.main : theme.palette.primary.light,
  cursor: 'pointer',
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

const PaymentMethodCard = styled(Card)(({ theme, selected, brandColor }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  border: '2px solid',
  borderColor: selected ? '#FFD700' : brandColor,
  backgroundColor: selected ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    backgroundColor: selected ? 'rgba(255, 215, 0, 0.1)' : `${brandColor}15`,
  },
  position: 'relative',
  '&::after': selected ? {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'inherit',
    border: '2px solid #FFD700',
    pointerEvents: 'none'
  } : {}
}));

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Kiambu', 'Machakos', 'Meru', 'Embu', 'Nyeri', 'Uasin Gishu',
  // ...add more counties as needed
];

const constituenciesByCounty = {
  Nairobi: ['Westlands', 'Langata', 'Starehe'],
  Mombasa: ['Kisauni', 'Likoni'],
  // ...add more
};

const wardsByConstituency = {
  Westlands: ['Kangemi', 'Mountain View'],
  Langata: ['Karen', 'Nairobi West'],
  Starehe: ['Ngara', 'Pangani'],
  // ...add more
};

const JoinUs = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
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

  // Debug log for form data changes
  useEffect(() => {
    //console.log('Form Data Updated:', formData);
  }, [formData]);

  // Debug log for locations changes
  useEffect(() => {
    //console.log('Locations Updated:', locations);
  }, [locations]);

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
      label: 'Foundation of our Party',
      requiresPayment: false,
      amount: 0
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
      label: 'Branch Officials',
      requiresPayment: true,
      amount: 5000
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
      label: 'Aspirants',
      requiresPayment: true,
      amount: 10000
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
      label: 'Aspirants',
      requiresPayment: true,
      amount: 25000
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
      label: 'Aspirants',
      requiresPayment: true,
      amount: 50000
    }
  ];

  const steps = ['Select Membership Plan', 'Personal Information', 'Payment'];

  const paymentMethods = [
    { 
      value: 'mpesa', 
      label: 'M-PESA', 
      icon: <PhoneAndroidIcon />,
      color: '#00A960'
    },
    { 
      value: 'airtel', 
      label: 'Airtel Money', 
      icon: <PhoneAndroidIcon />,
      color: '#E40000'
    },
    { 
      value: 'card', 
      label: 'Credit/Debit Card', 
      icon: <CreditCardIcon />,
      color: '#1A1F71'
    },
    { 
      value: 'bank', 
      label: 'Bank Transfer', 
      icon: <AccountBalanceIcon />,
      color: '#006400'
    },
    { 
      value: 'paypal', 
      label: 'PayPal', 
      icon: <PaymentsIcon />,
      color: '#003087'
    },
    { 
      value: 'stripe', 
      label: 'Stripe', 
      icon: <PaymentIcon />,
      color: '#635BFF'
    }
  ];

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

  const handlePlanSelect = (planTitle) => {
    setSelectedPlan(planTitle);
    setActiveStep(1); // Always go to personal info step first
  };

  const handleNext = () => {
    // Validate required fields before proceeding
    if (activeStep === 1) {
      const requiredFields = ['firstName', 'lastName', 'phone', 'age', 'occupation', 'county', 'constituency', 'ward', 'gender'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError('Please fill in all required fields marked with *');
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
    try {
      // Validate all required fields
      const requiredFields = ['firstName', 'lastName', 'phone', 'age', 'occupation', 'county', 'constituency', 'ward', 'gender'];
      const missingFields = requiredFields.filter(field => !formData[field]);
      
      if (missingFields.length > 0) {
        setError('Please fill in all required fields marked with *');
        return;
      }

      // Prepare membership data
      const membershipData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone_number: formData.phone,
        age: formData.age,
        gender: formData.gender,
        occupation: formData.occupation,
        county: formData.county,
        constituency: formData.constituency,
        ward: formData.ward,
        membership_type: selectedPlan.toLowerCase(),
        payment_method: paymentMethod
      };

      if (selectedPlan === 'Mwananchi') {
        // For Mwananchi, submit without authentication
        const data = await membershipApi.create(membershipData, false);
        setSubmitted(true);
        navigate('/', { 
          state: { 
            message: 'Membership application successful! Thank you for joining us.' 
          } 
        });
      } else {
        // For paid memberships, check authentication
        if (!isAuthenticated) {
          // Store membership data in session storage before redirecting
          sessionStorage.setItem('pendingMembership', JSON.stringify({
            plan: selectedPlan,
            paymentMethod,
            formData: membershipData
          }));
          navigate('/login', { 
            state: { 
              message: 'Please log in to complete your membership payment.',
              redirectTo: '/joinus'
            } 
          });
        } else {
          // If authenticated, proceed with membership creation
          const data = await membershipApi.create(membershipData, true);
          navigate('/dashboard/payments', { 
            state: { 
              membershipId: data.id,
              message: 'Please complete your payment to activate your membership.' 
            } 
          });
        }
      }
    } catch (error) {
      console.error('Error submitting membership:', error);
      setError(error.response?.data?.detail || 'An error occurred while submitting your application. Please try again.');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            {plans.map((plan, index) => (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <MembershipCard
                  selected={selectedPlan === plan.title}
                  onClick={() => handlePlanSelect(plan.title)}
                >
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
                    {plan.requiresPayment && (
                      <Typography
                        variant="h6"
                        sx={{
                          textAlign: 'center',
                          color: 'primary.main',
                          fontWeight: 'bold',
                          mb: 1,
                          fontSize: { xs: '1rem', sm: '1.25rem' },
                        }}
                      >
                        KES {plan.amount.toLocaleString()}
                      </Typography>
                    )}
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: 'text.secondary',
                        mt: 'auto',
                        fontSize: { xs: '0.7rem', sm: '0.75rem' },
                      }}
                    >
                      {plan.label}
                    </Typography>
                  </CardContent>
                </MembershipCard>
              </Grid>
            ))}
          </Grid>
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
    if (selectedPlan === 'Mwananchi') {
      return (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography variant="h6" gutterBottom>
            No Payment Required
          </Typography>
          <Typography variant="body1">
            Mwananchi membership is free. Click submit to complete your application.
          </Typography>
        </Box>
      );
    }

    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Select Payment Method
        </Typography>
        <Grid container spacing={2}>
          {paymentMethods.map((method) => (
            <Grid item xs={6} sm={4} md={2} key={method.value}>
              <PaymentMethodCard
                selected={paymentMethod === method.value}
                onClick={() => setPaymentMethod(method.value)}
                brandColor={method.color}
              >
                <CardContent sx={{ 
                  p: 2,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: paymentMethod === method.value ? 'rgba(255, 215, 0, 0.1)' : 'transparent',
                }}>
                  <IconButton
                    sx={{
                      color: paymentMethod === method.value ? '#FFD700' : method.color,
                      fontSize: '2rem',
                      '&:hover': {
                        backgroundColor: paymentMethod === method.value ? 'rgba(255, 215, 0, 0.2)' : `${method.color}20`,
                      },
                    }}
                  >
                    {method.icon}
                  </IconButton>
                  <Typography
                    variant="body2"
                    sx={{
                      color: paymentMethod === method.value ? '#B8860B' : method.color,
                      fontWeight: paymentMethod === method.value ? 'bold' : 'normal',
                    }}
                  >
                    {method.label}
                  </Typography>
                </CardContent>
              </PaymentMethodCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        py: { xs: 2, sm: 4, md: 8 },
        mt: { xs: '144px', md: '144px' },
        minHeight: 'calc(100vh - 144px)',
        px: { xs: 1, sm: 2 },
      }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: '#006400',
            fontWeight: 'bold',
            mb: { xs: 2, sm: 4 },
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' },
          }}
        >
          Join Our Movement
        </Typography>

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
              Thank you for your interest! We'll be in touch soon.
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
                  disabled={activeStep === 0}
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
                  disabled={activeStep === 0 && !selectedPlan}
                  sx={{
                    backgroundColor: '#006400',
                    '&:hover': {
                      backgroundColor: '#004d00',
                    },
                    width: { xs: '100%', sm: 'auto' },
                  }}
                >
                  {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </StyledPaper>
      </Box>
      <Dialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)}>
        <DialogTitle>Login Required</DialogTitle>
        <DialogContent>
          <Typography>
            Please log in or create an account to complete your membership payment.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/register')}>Register</Button>
          <Button onClick={() => navigate('/login')} variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JoinUs; 