import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './theme';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import WhoWeAre from './components/about/WhoWeAre';
import NationalLeadership from './components/about/NationalLeadership';
import Gallery from './components/about/Gallery';
import WhatWeDo from './components/about/WhatWeDo';
import RulesRegulations from './components/about/RulesRegulations';
import ElectionIntegrity from './pages/ElectionIntegrity';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import TakeAction from './pages/TakeAction';
import Contribute from './pages/Contribute';
import JoinUs from './pages/JoinUs';
import Donate from './pages/Donate';
import Shop from './pages/Shop';
import Contact from './components/contact/Contact';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import VerifyNewsletter from './pages/VerifyNewsletter';

// Create a wrapper component to use useAuth hook
const AppContent = () => {
    const { isAuthenticated } = useAuth();

    return (
        <Router>
            <ScrollToTop />
            {!isAuthenticated && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about/who-we-are" element={<WhoWeAre />} />
                <Route path="/about/leadership" element={<NationalLeadership />} />
                <Route path="/about/gallery" element={<Gallery />} />
                <Route path="/about/what-we-do" element={<WhatWeDo />} />
                <Route path="/about/rules" element={<RulesRegulations />} />
                <Route path="/election-integrity" element={<ElectionIntegrity />} />
                
                {/* News Routes */}
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} />
                
                {/* Events Routes */}
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                
                <Route path="/take-action" element={<TakeAction />} />
                <Route path="/contribute" element={<Contribute />} />
                <Route path="/volunteer" element={<JoinUs />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rules-regulations" element={<RulesRegulations />} />
                <Route path="/verify-newsletter/:token" element={<VerifyNewsletter />} />

                {/* Protected Dashboard Route */}
                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {!isAuthenticated && <Footer />}
        </Router>
    );
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
