import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { leadershipApi } from '../services/api';


const NationalChairman = () => {
  const [partyLeader, setPartyLeader] = useState(null);

  const values = [
    'Peace, Love,',
    'Unity, and Prosperity'
  ];

  useEffect(() => {
    const fetchPartyLeader = async () => {
      try {
        const response = await leadershipApi.getAll();
        const leaders = response.data?.results || response.data || [];
        const leaderData = Array.isArray(leaders)
          ? leaders.find(leader => {
              const title = leader.position?.title?.toLowerCase() || '';
              return title.includes('party leader') || title.includes('leader of the party');
            })
          : null;
        setPartyLeader(leaderData || null);
      } catch (err) {
        console.error('Error fetching party leader data:', err);
      }
    };

    fetchPartyLeader();
  }, []);

  return (
    <Box sx={{ py: 10, backgroundColor: '#1E6E43' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            {partyLeader?.image && (
              <Box
                component="img"
                src={partyLeader.image}
                alt={`${partyLeader.name} - Party Leader`}
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                  },
                }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              sx={{
                color: 'secondary.main',
                fontWeight: 'bold',
                mb: 3,
              }}
            >
              {partyLeader?.name || ''}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'secondary.main',
                mb: 2,
              }}
            >
              {partyLeader?.position?.title || 'Party Leader'}
            </Typography>
            {partyLeader?.bio && (
              <Box
                component="div"
                sx={{
                  mb: 4,
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.96)',
                  color: 'text.primary',
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  '& > :first-of-type': { mt: 0 },
                  '& > :last-child': { mb: 0 },
                  '& p': { my: 1.5 },
                  '& h2, & h3, & h4': {
                    mt: 2.5,
                    mb: 1,
                    color: 'primary.dark',
                    lineHeight: 1.3,
                  },
                  '& ul, & ol': { pl: 3, my: 1.5 },
                  '& li': { mb: 0.5, pl: 0.5 },
                  '& blockquote': {
                    my: 2,
                    pl: 2,
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                    color: 'text.secondary',
                  },
                  '& a': { color: 'primary.dark', textDecoration: 'underline' },
                  '& img': { maxWidth: '100%', height: 'auto' },
                }}
                dangerouslySetInnerHTML={{ __html: partyLeader.bio }}
              />
            )}
            <Box sx={{ mt: 4 }}>
              {values.map((value, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                    backgroundColor: 'white',
                    p: 2,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <CheckCircleIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 'medium',
                    }}
                  >
                    {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default NationalChairman; 