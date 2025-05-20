import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import GavelIcon from '@mui/icons-material/Gavel';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import CampaignIcon from '@mui/icons-material/Campaign';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  border: '1px solid',
  borderColor: '#AFE1AF',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    borderColor: '#90EE90',
    boxShadow: theme.shadows[4],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: '50%',
  backgroundColor: '#AFE1AF',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: 30,
    color: '#2E7D32',
  },
}));

const ElectionIntegrity = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeSection, setActiveSection] = useState('empower');

  useEffect(() => {
    if (location.state?.section) {
      setActiveSection(location.state.section);
    }
  }, [location]);

  const handleTabChange = (event, newValue) => {
    setActiveSection(newValue === 0 ? 'empower' : 'protect');
  };

  const empowerInitiatives = [
    {
      icon: <SecurityIcon />,
      title: "Voter Education",
      description: "Comprehensive voter education programs to ensure every citizen understands their rights and responsibilities."
    },
    {
      icon: <GavelIcon />,
      title: "Election Monitoring",
      description: "Independent monitoring of the electoral process to ensure transparency and fairness."
    },
    {
      icon: <PeopleIcon />,
      title: "Community Engagement",
      description: "Active engagement with communities to address concerns and build trust in the electoral process."
    }
  ];

  const protectInitiatives = [
    {
      icon: <SchoolIcon />,
      title: "Youth Empowerment",
      description: "Programs focused on engaging and empowering young people in the democratic process."
    },
    {
      icon: <CampaignIcon />,
      title: "Policy Development",
      description: "Development of comprehensive policies for economic growth and social development."
    },
    {
      icon: <CheckCircleIcon />,
      title: "Accountability",
      description: "Ensuring transparency and accountability in all aspects of governance and development."
    }
  ];

  return (
    <Box sx={{ mt: { xs: 8, sm: 10 } }}>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          py: 8,
          mb: 6,
          position: 'relative',
          height: '60vh',
          backgroundImage: `url("/images/${activeSection === 'empower' ? 'elections.jpg' : 'protect.jpg'}")`,
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
            Election Integrity
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
            Ensuring fair elections and building a prosperous future for Kenya
          </Typography>
        </Container>
      </Box>

      {/* Navigation Tabs */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Tabs
          value={activeSection === 'empower' ? 0 : 1}
          onChange={handleTabChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              minWidth: 200,
            },
          }}
        >
          <Tab label="Empower The Vote" />
          <Tab label="Protect The Future" />
        </Tabs>
      </Container>

      {/* Content Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {activeSection === 'empower' ? (
            empowerInitiatives.map((initiative, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledPaper>
                  <IconWrapper>
                    {initiative.icon}
                  </IconWrapper>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    {initiative.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {initiative.description}
                  </Typography>
                </StyledPaper>
              </Grid>
            ))
          ) : (
            protectInitiatives.map((initiative, index) => (
              <Grid item xs={12} md={4} key={index}>
                <StyledPaper>
                  <IconWrapper>
                    {initiative.icon}
                  </IconWrapper>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                    {initiative.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {initiative.description}
                  </Typography>
                </StyledPaper>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ElectionIntegrity; 