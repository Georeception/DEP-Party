import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CampaignIcon from '@mui/icons-material/Campaign';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import FlagIcon from '@mui/icons-material/Flag';
import PageHero from '../PageHero';

const RoadmapItem = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  border: '1px solid',
  borderColor: '#AFE1AF',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
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

const Campaign = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const campaignPhases = [
    {
      title: "Foundation Phase",
      icon: <CampaignIcon />,
      description: "Building our campaign infrastructure and establishing key campaign offices across the country.",
      activities: [
        "Setting up campaign headquarters",
        "Recruiting campaign staff",
        "Developing campaign strategy",
        "Establishing digital presence"
      ]
    },
    {
      title: "Grassroots Mobilization",
      icon: <PeopleIcon />,
      description: "Engaging with communities at the grassroots level to understand their needs and concerns.",
      activities: [
        "Community meetings and town halls",
        "Youth engagement programs",
        "Women empowerment initiatives",
        "Local leadership training"
      ]
    },
    {
      title: "Regional Campaigns",
      icon: <LocationOnIcon />,
      description: "Intensive campaigning across all regions, focusing on key constituencies and swing areas.",
      activities: [
        "Regional rallies and events",
        "Policy presentations",
        "Media engagements",
        "Stakeholder meetings"
      ]
    },
    {
      title: "Final Push",
      icon: <EmojiEventsIcon />,
      description: "Final phase of campaigning with nationwide mobilization and voter engagement.",
      activities: [
        "Mass rallies",
        "Door-to-door campaigns",
        "Get-out-the-vote initiatives",
        "Final media blitz"
      ]
    },
    {
      title: "Victory & Implementation",
      icon: <FlagIcon />,
      description: "Transition planning and implementation of our vision for Kenya.",
      activities: [
        "Transition team formation",
        "Policy implementation planning",
        "Government structure preparation",
        "First 100 days agenda"
      ]
    }
  ];

  return (
    <Box>
      <PageHero
        tag="Agenda"
        title="Campaign Roadmap"
        subtitle="Our journey to transform Kenya"
        image="/images/commit.jpg"
      />

      {/* Roadmap Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {campaignPhases.map((phase, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <RoadmapItem>
                <IconWrapper>
                  {phase.icon}
                </IconWrapper>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main' }}>
                  {phase.title}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, color: 'text.secondary' }}>
                  {phase.description}
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 'auto' }}>
                  {phase.activities.map((activity, idx) => (
                    <Typography
                      component="li"
                      key={idx}
                      variant="body2"
                      sx={{ mb: 1, color: 'text.secondary' }}
                    >
                      {activity}
                    </Typography>
                  ))}
                </Box>
              </RoadmapItem>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Campaign; 