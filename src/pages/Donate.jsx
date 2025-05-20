import React, { useState } from 'react';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  useTheme,
  useMediaQuery,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaymentIcon from '@mui/icons-material/Payment';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(4),
  borderRadius: 12,
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const PaymentMethodCard = styled(Card)(({ theme, selected, brandColor }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
  border: '2px solid',
  borderColor: brandColor,
  backgroundColor: selected ? `${brandColor}10` : 'transparent',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
    backgroundColor: `${brandColor}15`,
  },
}));

const DonationCard = styled(Card)(({ theme, selected }) => ({
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
    '& .amount': {
      color: theme.palette.primary.main,
    },
  },
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(2),
  },
}));

const Donate = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const predefinedAmounts = [
    { value: '1000', label: 'KES 1,000' },
    { value: '5000', label: 'KES 5,000' },
    { value: '10000', label: 'KES 10,000' },
    { value: '25000', label: 'KES 25,000' },
    { value: '50000', label: 'KES 50,000' },
  ];

  const paymentMethods = [
    { 
      value: 'mpesa', 
      label: 'M-PESA', 
      icon: <PhoneAndroidIcon />,
      color: '#00A960' // M-PESA green
    },
    { 
      value: 'airtel', 
      label: 'Airtel Money', 
      icon: <PhoneAndroidIcon />,
      color: '#E40000' // Airtel red
    },
    { 
      value: 'card', 
      label: 'Credit/Debit Card', 
      icon: <CreditCardIcon />,
      color: '#1A1F71' // Visa blue
    },
    { 
      value: 'bank', 
      label: 'Bank Transfer', 
      icon: <AccountBalanceIcon />,
      color: '#006400' // Bank green
    },
    { 
      value: 'paypal', 
      label: 'PayPal', 
      icon: <PaymentsIcon />,
      color: '#003087' // PayPal blue
    },
    { 
      value: 'stripe', 
      label: 'Stripe', 
      icon: <PaymentIcon />,
      color: '#635BFF' // Stripe purple
    },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission to your backend
    setSubmitted(true);
  };

  const renderPaymentInstructions = () => {
    switch (paymentMethod) {
      case 'mpesa':
        return (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
              M-PESA Payment Instructions:
            </Typography>
            <Typography variant="body2" component="div">
              1. Go to your M-PESA menu
              <br />
              2. Select "Pay Bill"
              <br />
              3. Enter Business Number: 123456
              <br />
              4. Enter Account Number: {formData.phone}
              <br />
              5. Enter Amount: KES {amount}
              <br />
              6. Enter your M-PESA PIN
              <br />
              7. Confirm the payment
            </Typography>
          </Box>
        );
      case 'airtel':
        return (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Airtel Money Payment Instructions:
            </Typography>
            <Typography variant="body2" component="div">
              1. Go to your Airtel Money menu
              <br />
              2. Select "Pay Bill"
              <br />
              3. Enter Business Number: 123456
              <br />
              4. Enter Account Number: {formData.phone}
              <br />
              5. Enter Amount: KES {amount}
              <br />
              6. Enter your Airtel Money PIN
              <br />
              7. Confirm the payment
            </Typography>
          </Box>
        );
      case 'card':
        return (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Credit/Debit Card Payment:
            </Typography>
            <Typography variant="body2" component="div">
              You will be redirected to our secure payment gateway to complete your transaction.
              <br />
              We accept Visa, Mastercard, and American Express.
            </Typography>
          </Box>
        );
      case 'bank':
        return (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Bank Transfer Details:
            </Typography>
            <Typography variant="body2" component="div">
              Bank: Example Bank
              <br />
              Account Name: Devolution Empowerment Party
              <br />
              Account Number: 1234567890
              <br />
              Branch: Main Branch
              <br />
              Swift Code: EXBKKE
              <br />
              Amount: KES {amount}
            </Typography>
          </Box>
        );
      case 'paypal':
        return (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
              PayPal Payment:
            </Typography>
            <Typography variant="body2" component="div">
              You will be redirected to PayPal to complete your payment securely.
              <br />
              Amount: KES {amount}
            </Typography>
          </Box>
        );
      case 'stripe':
        return (
          <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
            <Typography variant="body2" gutterBottom sx={{ fontWeight: 'bold' }}>
              Stripe Payment:
            </Typography>
            <Typography variant="body2" component="div">
              You will be redirected to Stripe's secure payment platform.
              <br />
              We accept all major credit and debit cards, including:
              <br />
              - Visa
              <br />
              - Mastercard
              <br />
              - American Express
              <br />
              - Discover
              <br />
              Amount: KES {amount}
            </Typography>
          </Box>
        );
      default:
        return null;
    }
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
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: '#006400',
            fontWeight: 'bold',
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.0rem' },
          }}
        >
          Support Our Movement
        </Typography>

        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            mb: { xs: 3, sm: 4 },
            color: 'text.secondary',
            fontSize: { xs: '0.9rem', sm: '1rem' },
            maxWidth: '800px',
            mx: 'auto',
          }}
        >
          Your contribution helps us build a stronger future for our community. 
          Every donation makes a difference in our mission to create positive change.
        </Typography>

        <StyledPaper>
          {submitted ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Thank you for your generous contribution! We'll be in touch soon.
            </Alert>
          ) : (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      color: 'primary.main',
                    }}
                  >
                    Select Donation Amount
                  </Typography>
                  <Grid container spacing={{ xs: 1, sm: 2 }}>
                    {predefinedAmounts.map((item) => (
                      <Grid item xs={6} sm={2.4} key={item.value}>
                        <DonationCard
                          selected={selectedAmount === item.value}
                          onClick={() => handleAmountSelect(item.value)}
                        >
                          <CardContent sx={{ 
                            p: { xs: 1.5, sm: 2 },
                            textAlign: 'center',
                          }}>
                            <Typography
                              className="amount"
                              variant="h6"
                              sx={{
                                color: selectedAmount === item.value ? 'primary.main' : 'text.primary',
                                fontWeight: 'bold',
                                fontSize: { xs: '1rem', sm: '1.25rem' },
                                transition: 'color 0.3s ease-in-out',
                              }}
                            >
                              {item.label}
                            </Typography>
                          </CardContent>
                        </DonationCard>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Custom Amount (KES)"
                    value={amount}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      setSelectedAmount('');
                    }}
                    type="number"
                    size="small"
                    InputLabelProps={{ sx: { fontSize: '0.85rem' } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      color: 'primary.main',
                      mt: 2,
                    }}
                  >
                    Your Information
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    size="small"
                    InputLabelProps={{ sx: { fontSize: '0.85rem' } }}
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
                    size="small"
                    InputLabelProps={{ sx: { fontSize: '0.85rem' } }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    size="small"
                    InputLabelProps={{ sx: { fontSize: '0.85rem' } }}
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
                    size="small"
                    InputLabelProps={{ sx: { fontSize: '0.85rem' } }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                      fontSize: { xs: '1.1rem', sm: '1.25rem' },
                      color: 'primary.main',
                      mt: 2,
                    }}
                  >
                    Payment Method
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
                          }}>
                            <IconButton
                              sx={{
                                color: method.color,
                                fontSize: '2rem',
                                '&:hover': {
                                  backgroundColor: `${method.color}20`,
                                },
                              }}
                            >
                              {method.icon}
                            </IconButton>
                            <Typography
                              variant="body2"
                              sx={{
                                color: method.color,
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
                </Grid>

                {renderPaymentInstructions()}

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={!amount || !formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                    sx={{
                      mt: { xs: 2, sm: 3 },
                      py: { xs: 1.5, sm: 2 },
                      backgroundColor: '#006400',
                      '&:hover': {
                        backgroundColor: '#004d00',
                      },
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    Donate Now
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </StyledPaper>
      </Box>
    </Container>
  );
};

export default Donate; 