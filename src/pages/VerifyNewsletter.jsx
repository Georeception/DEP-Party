import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const VerifyNewsletter = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('verifying');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        const response = await axios.get(`/api/newsletter/verify/${token}/`);
        setStatus('success');
        setMessage(response.data.message);
        // Redirect to home page after 3 seconds
        setTimeout(() => navigate('/'), 3000);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.error || 'Verification failed. Please try again.');
      }
    };

    verifySubscription();
  }, [token, navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
        textAlign: 'center'
      }}
    >
      {status === 'verifying' && (
        <>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h5" gutterBottom>
            Verifying your subscription...
          </Typography>
        </>
      )}

      {status === 'success' && (
        <Alert severity="success" sx={{ maxWidth: 600, width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
          <Typography>
            You will be redirected to the home page shortly.
          </Typography>
        </Alert>
      )}

      {status === 'error' && (
        <Alert severity="error" sx={{ maxWidth: 600, width: '100%' }}>
          <Typography variant="h6" gutterBottom>
            {message}
          </Typography>
          <Typography>
            Please try subscribing again or contact support if the problem persists.
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default VerifyNewsletter; 