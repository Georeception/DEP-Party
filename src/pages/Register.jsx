import React, { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Alert,
    Paper,
    Grid,
    InputAdornment,
    IconButton,
    Divider,
    MenuItem,
    Select,
    FormControl,
    InputLabel
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Person as PersonIcon,
    Phone as PhoneIcon,
    Visibility as VisibilityIcon,
    VisibilityOff as VisibilityOffIcon,
    LocationOn as LocationIcon,
    HowToReg as RegisterIcon
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { locationApi } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        city: '',
        county: '',
        constituency: '',
        ward: '',
        country: '',
        dateOfBirth: '',
        gender: '',
        occupation: '',
        organization: '',
        membership_type: 'regular'  // default value
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [locations, setLocations] = useState({
        counties: [],
        constituencies: [],
        wards: []
    });

    // Fetch counties on component mount
    useEffect(() => {
        const fetchCounties = async () => {
            try {
                const data = await locationApi.getCounties();
                const countiesList = Array.isArray(data) ? data : data.results || [];
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
        setFormData(prev => ({ ...prev, [name]: value, constituency: '', ward: '' }));
        
        try {
            const data = await locationApi.getConstituencies(value);
            setLocations(prev => ({ 
                ...prev, 
                constituencies: Array.isArray(data.results) ? data.results : [],
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
        setFormData(prev => ({ ...prev, [name]: value, ward: '' }));
        
        try {
            const data = await locationApi.getWards(value);
            setLocations(prev => ({ 
                ...prev, 
                wards: Array.isArray(data.results) ? data.results : [] 
            }));
        } catch (error) {
            console.error('Error fetching wards:', error);
            setLocations(prev => ({ ...prev, wards: [] }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            const result = await register({
                email: formData.email,
                password: formData.password,
                password2: formData.confirmPassword,
                first_name: formData.firstName,
                last_name: formData.lastName,
                phone: formData.phone,
                county: formData.county,
                constituency: formData.constituency,
                ward: formData.ward,
                membership_type: formData.membership_type
            });

            if (result.success) {
                navigate('/login', { 
                    state: { message: 'Registration successful! Please log in.' }
                });
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    marginTop: 10,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    py: 4
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderRadius: 2,
                        background: 'linear-gradient(to bottom right, #ffffff, #f8f9fa)'
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            textAlign: 'center',
                            mb: 3
                        }}
                    >
                        <Typography component="h4" variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                            Create Your Account
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                            Join us and be part of our community
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Date of Birth"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={handleChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
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
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Occupation"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LocationIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required>
                                    <InputLabel>County</InputLabel>
                                    <Select
                                        name="county"
                                        value={formData.county}
                                        onChange={handleCountyChange}
                                        label="County"
                                    >
                                        <MenuItem value="">Select a County</MenuItem>
                                        {/*console.log('Counties in render:', locations.counties)*/} {/* Debug log */}
                                        {locations.counties && locations.counties.length > 0 ? (
                                            locations.counties.map((county) => (
                                                <MenuItem key={county.id} value={county.id}>
                                                    {county.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>Loading counties...</MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required disabled={!formData.county}>
                                    <InputLabel>Constituency</InputLabel>
                                    <Select
                                        name="constituency"
                                        value={formData.constituency}
                                        onChange={handleConstituencyChange}
                                        label="Constituency"
                                    >
                                        <MenuItem value="">Select a Constituency</MenuItem>
                                        {locations.constituencies && locations.constituencies.length > 0 ? (
                                            locations.constituencies.map((constituency) => (
                                                <MenuItem key={constituency.id} value={constituency.id}>
                                                    {constituency.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>
                                                {formData.county ? 'Loading constituencies...' : 'Select a county first'}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required disabled={!formData.constituency}>
                                    <InputLabel>Ward</InputLabel>
                                    <Select
                                        name="ward"
                                        value={formData.ward}
                                        onChange={handleChange}
                                        label="Ward"
                                    >
                                        <MenuItem value="">Select a Ward</MenuItem>
                                        {locations.wards && locations.wards.length > 0 ? (
                                            locations.wards.map((ward) => (
                                                <MenuItem key={ward.id} value={ward.id}>
                                                    {ward.name}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem value="" disabled>
                                                {formData.constituency ? 'Loading wards...' : 'Select a constituency first'}
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Country"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Confirm Password"
                                    name="confirmPassword"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon color="primary" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            startIcon={<RegisterIcon />}
                            sx={{
                                mt: 3,
                                mb: 2,
                                py: 1.5,
                                fontSize: '1.1rem',
                                textTransform: 'none',
                                borderRadius: 2,
                                boxShadow: 2,
                                '&:hover': {
                                    boxShadow: 4,
                                },
                            }}
                            disabled={loading}
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>

                        <Divider sx={{ my: 2 }}>
                            <Typography variant="body2" color="text.secondary">
                                OR
                            </Typography>
                        </Divider>

                        <Box sx={{ textAlign: 'center' }}>
                            <Link
                                component={RouterLink}
                                to="/login"
                                variant="body1"
                                sx={{
                                    textDecoration: 'none',
                                    color: 'primary.main',
                                    fontWeight: 'medium',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                Already have an account? Sign in
                            </Link>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Register; 