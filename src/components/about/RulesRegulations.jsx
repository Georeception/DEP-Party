import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Grid, List, ListItem, ListItemText, ListItemIcon, Divider, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArticleIcon from '@mui/icons-material/Article';
import DownloadIcon from '@mui/icons-material/Download';
import GavelIcon from '@mui/icons-material/Gavel';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#fff',
  marginTop: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  marginBottom: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const PreambleContent = styled(Box)(({ theme }) => ({
  '& .section': {
    marginBottom: theme.spacing(4),
  },
  '& .bullet-list': {
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  '& .bullet-item': {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: theme.spacing(1.5),
    '&::before': {
      content: '"•"',
      marginRight: theme.spacing(2),
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
  },
  '& .highlight': {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

const RulesRegulations = () => {
  const [selectedSection, setSelectedSection] = useState('preamble');

  const sections = {
    preamble: {
      title: 'Preamble',
      icon: <ArticleIcon />,
      content: [
        {
          title: 'Introduction',
          items: [
            'We, the members of the Devolution Empowerment Party (DEP), recognizing the need for a progressive political movement dedicated to championing devolved governance and economic empowerment across Kenya, do hereby establish this Constitution to guide our operations and governance.',
            'Inspired by the vision of a united, prosperous, and equitable Kenya, we acknowledge that true development begins at the grassroots level. We believe in the power of devolved governance as a catalyst for sustainable development, social justice, and economic growth.'
          ]
        },
        {
          title: 'Our Commitments',
          items: [
            'Upholding the supremacy of the Constitution of Kenya',
            'Promoting and protecting the rights and freedoms of all Kenyans',
            'Ensuring equitable distribution of resources and opportunities',
            'Fostering unity in diversity and national cohesion',
            'Building strong institutions at all levels of governance',
            'Empowering communities through participatory decision-making'
          ]
        },
        {
          title: 'Our Framework',
          items: [
            'Democratic party leadership and decision-making',
            'Transparent and accountable party operations',
            'Active citizen participation in governance',
            'Sustainable development initiatives',
            'Protection of fundamental rights and freedoms',
            'Promotion of social justice and equality'
          ]
        },
        {
          title: 'Our Pledge',
          items: [
            'As we embark on this journey of transformation, we pledge to work tirelessly towards building a Kenya where every citizen has the opportunity to thrive, where resources are shared equitably, and where the principles of devolved governance serve as the foundation for our nation\'s progress.'
          ]
        }
      ]
    },
    objectives: {
      title: 'Party Objectives',
      icon: <GavelIcon />,
      content: [
        {
          title: 'Governance and Democracy',
          items: [
            'To promote and defend the principles of devolved governance as enshrined in the Constitution of Kenya',
            'To strengthen democratic institutions at all levels of government',
            'To ensure transparent and accountable governance systems',
            'To promote participatory democracy and citizen engagement',
            'To uphold the rule of law and constitutional order'
          ]
        },
        {
          title: 'Economic Development',
          items: [
            'To champion economic empowerment at all levels of society',
            'To promote sustainable economic growth and development',
            'To ensure equitable distribution of resources and opportunities',
            'To support small and medium enterprises development',
            'To create employment opportunities for all Kenyans'
          ]
        },
        {
          title: 'Social Welfare',
          items: [
            'To promote unity, peace, and national cohesion',
            'To protect and promote the rights and welfare of all Kenyans',
            'To ensure access to quality education and healthcare',
            'To promote gender equality and women empowerment',
            'To support youth development and empowerment'
          ]
        },
        {
          title: 'Environmental Protection',
          items: [
            'To promote sustainable environmental management',
            'To combat climate change and its effects',
            'To protect natural resources and biodiversity',
            'To promote renewable energy initiatives',
            'To ensure clean and safe water for all'
          ]
        }
      ]
    },
    membership: {
      title: 'Membership',
      icon: <PeopleIcon />,
      content: [
        {
          title: 'Eligibility Requirements',
          items: [
            'Must be a Kenyan citizen of sound mind',
            'Must not be a member of another political party',
            'Must uphold the party\'s values and principles',
            'Must pay the prescribed membership fee',
            'Must be at least 18 years of age',
            'Must not have been convicted of a criminal offense'
          ]
        },
        {
          title: 'Membership Categories',
          items: [
            'Ordinary Members: Registered party members',
            'Life Members: Members who have made significant contributions',
            'Honorary Members: Distinguished individuals recognized by the party',
            'Youth Members: Members between 18-35 years',
            'Special Interest Groups: Women, PWDs, and other marginalized groups'
          ]
        },
        {
          title: 'Membership Rights',
          items: [
            'Right to participate in party activities and decision-making',
            'Right to vote in party elections and meetings',
            'Right to stand for party positions',
            'Right to access party information and resources',
            'Right to receive party communications and updates'
          ]
        },
        {
          title: 'Membership Obligations',
          items: [
            'Uphold the party constitution and code of conduct',
            'Pay membership fees and dues on time',
            'Participate in party activities and programs',
            'Promote the party\'s values and objectives',
            'Maintain good standing and reputation'
          ]
        }
      ]
    },
    structure: {
      title: 'Party Structure',
      icon: <AccountBalanceIcon />,
      content: [
        {
          title: 'National Level',
          items: [
            'National Executive Committee (NEC): Supreme decision-making body',
            'National Governing Council: Policy formulation and oversight',
            'National Disciplinary Committee: Handles disciplinary matters',
            'National Elections Board: Manages party elections',
            'National Secretariat: Implements party decisions'
          ]
        },
        {
          title: 'County Level',
          items: [
            'County Executive Committees: County-level leadership',
            'County Coordinating Committees: Coordinates county activities',
            'County Disciplinary Committees: Handles county-level discipline',
            'County Elections Committees: Manages county elections',
            'County Secretariats: Implements county decisions'
          ]
        },
        {
          title: 'Constituency Level',
          items: [
            'Constituency Committees: Local leadership',
            'Constituency Coordinating Committees: Local coordination',
            'Constituency Disciplinary Committees: Local discipline',
            'Constituency Elections Committees: Local elections',
            'Constituency Secretariats: Local implementation'
          ]
        },
        {
          title: 'Ward and Branch Level',
          items: [
            'Ward Committees: Ward-level leadership',
            'Branch Committees: Branch-level leadership',
            'Special Interest Groups: Represents specific interests',
            'Youth Leagues: Youth representation',
            'Women Leagues: Women representation'
          ]
        }
      ]
    },
    codeOfConduct: {
      title: 'Code of Conduct',
      icon: <SecurityIcon />,
      content: [
        {
          title: 'Ethical Standards',
          items: [
            'Maintain high ethical standards in all party activities',
            'Avoid conflicts of interest in party matters',
            'Practice transparency in all dealings',
            'Uphold integrity and honesty in all actions',
            'Respect party resources and use them responsibly'
          ]
        },
        {
          title: 'Member Relations',
          items: [
            'Respect party leadership and fellow members',
            'Promote unity and harmony within the party',
            'Avoid discrimination and harassment',
            'Maintain professional relationships',
            'Resolve conflicts amicably'
          ]
        },
        {
          title: 'Public Conduct',
          items: [
            'Avoid actions that may tarnish the party\'s image',
            'Uphold the rule of law and constitutional order',
            'Practice transparency and accountability',
            'Respect public institutions and officials',
            'Maintain decorum in public engagements'
          ]
        },
        {
          title: 'Disciplinary Measures',
          items: [
            'Warning letters for minor violations',
            'Suspension for serious violations',
            'Expulsion for gross misconduct',
            'Right to appeal disciplinary decisions',
            'Rehabilitation and reinstatement procedures'
          ]
        }
      ]
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '60vh', md: '80vh' },
          backgroundImage: 'url("/images/hero-background.png")',
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              mb: 1,
              mt: 13
            }}
          >
            Party Constitution
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'white',
              maxWidth: '800px',
              mx: 'auto',
              fontSize: { xs: '1.1rem', sm: '1.5rem' },
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
            }}
          >
            The fundamental principles and guidelines that govern our party
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<DownloadIcon />}
              sx={{
                backgroundColor: 'white',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                },
              }}
            >
              Download Full Constitution
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {/* Navigation Sidebar */}
          <Grid item xs={12} md={3}>
            <StyledPaper>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Constitution Sections
              </Typography>
              <List>
                {Object.entries(sections).map(([key, section]) => (
                  <ListItem
                    key={key}
                    button
                    selected={selectedSection === key}
                    onClick={() => setSelectedSection(key)}
                    sx={{
                      borderRadius: '8px',
                      mb: 1,
                      backgroundColor: selectedSection === key ? 'primary.light' : 'transparent',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: selectedSection === key ? 'primary.main' : 'inherit' }}>
                      {section.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={section.title}
                      primaryTypographyProps={{
                        fontWeight: selectedSection === key ? 'bold' : 'normal',
                        color: selectedSection === key ? 'primary.main' : 'inherit',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </StyledPaper>
          </Grid>

          {/* Content Area */}
          <Grid item xs={12} md={9}>
            <StyledPaper>
              <SectionTitle variant="h4">
                {sections[selectedSection].icon}
                {sections[selectedSection].title}
              </SectionTitle>
              <Divider sx={{ mb: 3 }} />
              {Array.isArray(sections[selectedSection].content) ? (
                <Box>
                  {sections[selectedSection].content.map((section, index) => (
                    <Box key={index} sx={{ mb: 4 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 'bold',
                          mb: 2,
                          fontSize: '1.2rem',
                        }}
                      >
                        {section.title}
                      </Typography>
                      <List>
                        {section.items.map((item, idx) => (
                          <ListItem key={idx} sx={{ py: 1 }}>
                            <ListItemIcon>
                              <CheckCircleIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                              primary={item}
                              primaryTypographyProps={{
                                fontSize: '1.1rem',
                                lineHeight: 1.6,
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    textAlign: 'justify',
                  }}
                >
                  {sections[selectedSection].content}
                </Typography>
              )}
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default RulesRegulations; 