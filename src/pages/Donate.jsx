import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PageHero from '../components/PageHero';
import { loadPaystack } from '../services/paystack';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  border: '1px solid',
  borderColor: theme.palette.divider,
  borderRadius: 8,
  boxShadow: '0 8px 28px rgba(16, 59, 41, 0.08)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const DonationCard = styled(Card)(({ theme, selected }) => ({
  height: '100%',
  width: '100%',
  border: '1px solid',
  borderColor: selected ? theme.palette.primary.main : theme.palette.divider,
  backgroundColor: selected ? theme.palette.action.selected : theme.palette.background.paper,
  cursor: 'pointer',
  textAlign: 'center',
  transition: 'border-color 180ms ease, background-color 180ms ease, transform 180ms ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-2px)',
  },
  '&:focus-visible': {
    outline: `3px solid ${theme.palette.primary.light}`,
    outlineOffset: 2,
  },
}));

const predefinedAmounts = [
  { value: '1000', label: 'KES 1,000' },
  { value: '5000', label: 'KES 5,000' },
  { value: '10000', label: 'KES 10,000' },
  { value: '25000', label: 'KES 25,000' },
  { value: '50000', label: 'KES 50,000' },
];

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(value);
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const amountInShillings = Number(amount);
    if (!Number.isFinite(amountInShillings) || amountInShillings <= 0 || !Number.isInteger(amountInShillings)) {
      setError('Choose a donation amount or enter a whole amount in KES.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email to continue to Paystack checkout.');
      return;
    }

    const publicKey = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY;
    if (!publicKey) {
      setError('Paystack is not configured yet. Please try again later.');
      return;
    }

    setIsSubmitting(true);
    try {
      const PaystackPop = await loadPaystack();
      const payment = PaystackPop.setup({
        key: publicKey,
        email: email.trim(),
        amount: amountInShillings * 100,
        currency: 'KES',
        callback: () => {
          setSubmitted(true);
          setIsSubmitting(false);
        },
        onClose: () => {
          setIsSubmitting(false);
        },
      });

      payment.openIframe();
    } catch (paymentError) {
      setError(paymentError.message || 'Unable to start Paystack checkout. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <PageHero
        tag="Donate"
        title="Support Our Movement"
        subtitle="Every donation makes a difference in our mission to create positive change."
        image="/images/donate.png"
      />
      <Container maxWidth="md" sx={{ pb: { xs: 5, md: 8 } }}>
        <StyledPaper>
          {submitted ? (
            <Alert severity="success">
              Thank you for your generous contribution!
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <Typography variant="h5" component="h2" sx={{ mb: 2, color: 'primary.dark', fontWeight: 700 }}>
                Select a donation amount
              </Typography>
              <Grid container spacing={{ xs: 1, sm: 2 }}>
                {predefinedAmounts.map((item) => (
                  <Grid item xs={6} sm={4} key={item.value}>
                    <DonationCard
                      component="button"
                      type="button"
                      selected={selectedAmount === item.value}
                      aria-pressed={selectedAmount === item.value}
                      onClick={() => handleAmountSelect(item.value)}
                    >
                      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                        <Typography
                          sx={{
                            color: selectedAmount === item.value ? 'primary.main' : 'text.primary',
                            fontWeight: 700,
                          }}
                        >
                          {item.label}
                        </Typography>
                      </CardContent>
                    </DonationCard>
                  </Grid>
                ))}
              </Grid>

              <TextField
                fullWidth
                label="Custom Amount (KES)"
                value={amount}
                onChange={(event) => {
                  setAmount(event.target.value);
                  setSelectedAmount('');
                  setError('');
                }}
                type="number"
                inputProps={{ min: 1, step: 1 }}
                sx={{ mt: 3 }}
              />

              <TextField
                fullWidth
                label="Email for Paystack checkout"
                type="email"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError('');
                }}
                helperText="Paystack requires an email address to process your payment."
                sx={{ mt: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isSubmitting}
                sx={{ mt: 3, py: 1.5 }}
              >
                {isSubmitting ? 'Connecting to Paystack…' : 'Donate'}
              </Button>
            </Box>
          )}
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Donate;
