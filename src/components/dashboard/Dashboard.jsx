import React, { useState, useEffect } from 'react';
import { 
    Box, 
    Container, 
    Grid, 
    Paper, 
    Typography, 
    Card, 
    CardContent,
    CardHeader,
    IconButton,
    Avatar,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Divider,
    Button,
    useTheme,
    useMediaQuery
} from '@mui/material';
import {
    Event as EventIcon,
    Notifications as NotificationsIcon,
    Person as PersonIcon,
    Group as GroupIcon,
    Payment as PaymentIcon,
    ChevronRight as ChevronRightIcon,
    Menu as MenuIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled components
const DashboardCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: theme.shadows[4],
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const StatCard = styled(Card)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
        '& .MuiCardContent-root': {
            padding: theme.spacing(2),
        },
    },
}));

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [userData, setUserData] = useState({
        name: 'Lenny Kivuti',
        membershipStatus: 'Active',
        membershipType: 'Premium',
        profilePicture: null
    });

    // Mock data for upcoming events
    const upcomingEvents = [
        { id: 1, title: 'Party Convention', date: '2024-03-15', location: 'Nairobi' },
        { id: 2, title: 'Youth Forum', date: '2024-03-20', location: 'Mombasa' },
        { id: 3, title: 'Policy Discussion', date: '2024-03-25', location: 'Kisumu' },
    ];

    // Mock data for notifications
    const notifications = [
        { id: 1, title: 'Membership Renewal', message: 'Your membership will expire in 30 days' },
        { id: 2, title: 'Event Update', message: 'New event added to your calendar' },
        { id: 3, title: 'Payment Confirmation', message: 'Your recent payment has been processed' },
    ];

    return (
        <Box sx={{ flexGrow: 1, py: { xs: 2, sm: 4 }, backgroundColor: theme.palette.background.default }}>
            <Container maxWidth="lg">
                {/* Welcome Section */}
                <Box sx={{ mb: { xs: 2, sm: 4 } }}>
                    <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                        Welcome back, {userData.name}!
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Here's what's happening with your account
                    </Typography>
                </Box>

                {/* Stats Grid */}
                <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 2, sm: 4 } }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <PersonIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
                                    <Typography variant="h6" sx={{ ml: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                        Profile
                                    </Typography>
                                </Box>
                                <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                                    {userData.membershipStatus}
                                </Typography>
                                <Typography variant="body2">
                                    Membership Status
                                </Typography>
                            </CardContent>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <EventIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
                                    <Typography variant="h6" sx={{ ml: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                        Events
                                    </Typography>
                                </Box>
                                <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                                    {upcomingEvents.length}
                                </Typography>
                                <Typography variant="body2">
                                    Upcoming Events
                                </Typography>
                            </CardContent>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <GroupIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
                                    <Typography variant="h6" sx={{ ml: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                        Network
                                    </Typography>
                                </Box>
                                <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                                    150+
                                </Typography>
                                <Typography variant="body2">
                                    Party Members
                                </Typography>
                            </CardContent>
                        </StatCard>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                    <PaymentIcon sx={{ fontSize: { xs: 30, sm: 40 } }} />
                                    <Typography variant="h6" sx={{ ml: 1, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
                                        Payments
                                    </Typography>
                                </Box>
                                <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
                                    Active
                                </Typography>
                                <Typography variant="body2">
                                    Payment Status
                                </Typography>
                            </CardContent>
                        </StatCard>
                    </Grid>
                </Grid>

                {/* Main Content Grid */}
                <Grid container spacing={{ xs: 2, sm: 3 }}>
                    {/* Upcoming Events */}
                    <Grid item xs={12} md={6}>
                        <DashboardCard>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                    Upcoming Events
                                </Typography>
                                <Button 
                                    endIcon={<ChevronRightIcon />}
                                    size={isMobile ? "small" : "medium"}
                                >
                                    View All
                                </Button>
                            </Box>
                            <List sx={{ py: 0 }}>
                                {upcomingEvents.map((event, index) => (
                                    <React.Fragment key={event.id}>
                                        <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <EventIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={event.title}
                                                secondary={`${event.date} • ${event.location}`}
                                                primaryTypographyProps={{
                                                    sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                                                }}
                                                secondaryTypographyProps={{
                                                    sx: { fontSize: { xs: '0.8rem', sm: '0.875rem' } }
                                                }}
                                            />
                                        </ListItem>
                                        {index < upcomingEvents.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </DashboardCard>
                    </Grid>

                    {/* Notifications */}
                    <Grid item xs={12} md={6}>
                        <DashboardCard>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                    Notifications
                                </Typography>
                                <Button 
                                    endIcon={<ChevronRightIcon />}
                                    size={isMobile ? "small" : "medium"}
                                >
                                    View All
                                </Button>
                            </Box>
                            <List sx={{ py: 0 }}>
                                {notifications.map((notification, index) => (
                                    <React.Fragment key={notification.id}>
                                        <ListItem sx={{ px: { xs: 0, sm: 2 } }}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <NotificationsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={notification.title}
                                                secondary={notification.message}
                                                primaryTypographyProps={{
                                                    sx: { fontSize: { xs: '0.9rem', sm: '1rem' } }
                                                }}
                                                secondaryTypographyProps={{
                                                    sx: { fontSize: { xs: '0.8rem', sm: '0.875rem' } }
                                                }}
                                            />
                                        </ListItem>
                                        {index < notifications.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </DashboardCard>
                    </Grid>

                    {/* Quick Actions */}
                    <Grid item xs={12}>
                        <DashboardCard>
                            <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                Quick Actions
                            </Typography>
                            <Grid container spacing={{ xs: 1, sm: 2 }}>
                                <Grid item xs={6} sm={3}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<PersonIcon />}
                                        sx={{ 
                                            py: { xs: 1, sm: 1.5 },
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}
                                    >
                                        Update Profile
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<EventIcon />}
                                        sx={{ 
                                            py: { xs: 1, sm: 1.5 },
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}
                                    >
                                        View Events
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<PaymentIcon />}
                                        sx={{ 
                                            py: { xs: 1, sm: 1.5 },
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}
                                    >
                                        Make Payment
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={3}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<GroupIcon />}
                                        sx={{ 
                                            py: { xs: 1, sm: 1.5 },
                                            fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                        }}
                                    >
                                        View Members
                                    </Button>
                                </Grid>
                            </Grid>
                        </DashboardCard>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard; 