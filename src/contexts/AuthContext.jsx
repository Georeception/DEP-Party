import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8000';  // or whatever your Django server URL is

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('access_token');
        if (token) {
            // Set default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // Fetch user data
            fetchUserData();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('/api/auth/user/');
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error fetching user data:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post('/api/auth/login/', {
                email,
                password
            });

            const { access, refresh, user } = response.data;
            
            // Store tokens
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            
            // Set default authorization header
            axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
            
            // Update state
            setUser(user);
            setIsAuthenticated(true);
            
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.response?.data?.error || 'An error occurred during login'
            };
        }
    };

    const logout = async () => {
        try {
            // Call logout endpoint if it exists
            const accessToken = localStorage.getItem('access_token');
            const refreshToken = localStorage.getItem('refresh_token');
            if (accessToken && refreshToken) {
                await axios.post('/api/auth/logout/', { refresh_token: refreshToken }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear tokens
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            // Clear authorization header
            delete axios.defaults.headers.common['Authorization'];
            // Update state immediately
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const register = async (userData) => {
        try {
            const response = await axios.post('/api/auth/register/', userData);
            return { success: true, data: response.data };
        } catch (error) {
            console.error('Registration error:', error);
            // Format the error message
            let errorMessage = 'An error occurred during registration';
            if (error.response?.data) {
                if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (typeof error.response.data === 'object') {
                    // Handle Django validation errors which come as an object
                    const errors = [];
                    Object.entries(error.response.data).forEach(([field, messages]) => {
                        // Make field names more user-friendly
                        const fieldMap = {
                            'password2': 'Password confirmation',
                            'password': 'Password',
                            'email': 'Email',
                            'username': 'Username',
                            'first_name': 'First name',
                            'last_name': 'Last name'
                        };
                        
                        const friendlyFieldName = fieldMap[field] || field;
                        
                        if (Array.isArray(messages)) {
                            errors.push(`${friendlyFieldName}: ${messages.join(', ')}`);
                        } else if (typeof messages === 'string') {
                            errors.push(`${friendlyFieldName}: ${messages}`);
                        }
                    });
                    errorMessage = errors.join('\n');
                }
            }
            return {
                success: false,
                error: errorMessage
            };
        }
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        login,
        logout,
        register
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export default AuthContext; 