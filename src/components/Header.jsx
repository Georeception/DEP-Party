import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box,
  Button,
  Stack,
  Menu,
  MenuItem,
  Fade,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LoginIcon from '@mui/icons-material/Login';

const TopHeader = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: '#168b1b',
  padding: '0',
  transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
  transition: 'transform 220ms ease-in-out',
  borderBottom: '2px solid #f3c93f',
  borderRadius: 0,
  zIndex: theme.zIndex.drawer + 2,
}));

const BottomHeader = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: '#ffffff',
  top: scrolled ? 0 : '64px',
  height: '80px',
  transition: 'top 220ms ease-in-out, box-shadow 220ms ease-in-out',
  boxShadow: scrolled ? '0 6px 20px rgba(16, 59, 41, 0.12)' : 'none',
  borderBottom: '1px solid #dce3dc',
  borderRadius: 0,
  zIndex: theme.zIndex.drawer + 1,
  [theme.breakpoints.up('md')]: {
    top: scrolled ? 0 : '82px',
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: 700,
  fontSize: '0.82rem',
  padding: '6px 10px',
  minWidth: 0,
  '&:hover': {
    backgroundColor: '#f5f6f2',
    color: theme.palette.primary.dark,
  },
  transition: 'all 180ms ease',
  borderRadius: 4,
}));

const Logo = styled('img')({
  height: '76px',
  width: 'auto',
  marginRight: '20px',
  cursor: 'pointer',
  borderRadius: '50%',
  transition: 'transform 180ms ease',
  '@media (max-width: 899.95px)': {
    height: '56px',
    marginRight: '12px',
  },
  '&:hover': {
    transform: 'scale(1.03)',
  }
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#f5f6f2',
    color: theme.palette.primary.dark,
  },
  minWidth: '200px',
  color: '#1d2922',
  transition: 'all 0.2s ease',
}));

const LoginButton = styled(Button)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '0.78rem',
  padding: '4px 14px',
  minWidth: 0,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
  },
  transition: 'all 180ms ease',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  textDecoration: 'none',
}));

const Header = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const open = Boolean(anchorEl);
  const [aboutOpen, setAboutOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleClose();
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const aboutMenuItems = [
    { label: 'Who We Are', path: '/about/who-we-are' },
    { label: 'National Leadership', path: '/about/leadership' },
    { label: 'Campaigns', path: '/about/what-we-do' },
    { label: 'Our Constitution', path: '/about/rules' },
    { label: 'Election Integrity', path: '/election-integrity' },
  ];

  const navItems = [
    { label: 'HOME', path: '/' },
    { label: 'ABOUT', path: null, isMenu: true },
    { label: 'NEWS', path: '/news' },
    { label: 'EVENTS', path: '/events' },
    { label: 'GALLERY', path: '/about/gallery' },
    { label: 'DONATE', path: '/donate' },
    { label: 'SHOP', path: '/shop' },
    { label: 'CONTACT', path: '/contact' },
  ];

  const drawer = (
    <Box sx={{ textAlign: 'left', px: 1 }}>
      <List>
        {navItems.map((item) => {
          if (item.isMenu) {
            return (
              <ListItem
                key={item.label}
                onClick={() => setAboutOpen((prev) => !prev)}
                sx={{
                  cursor: 'pointer',
                  minHeight: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:hover': {
                    backgroundColor: '#f5f6f2',
                  },
                }}
              >
                <ListItemText primary={item.label} />
                <ArrowDropDownIcon sx={{ transform: aboutOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.2s' }} />
              </ListItem>
            );
          }
          return (
            <ListItem
              key={item.label}
              onClick={() => item.path && handleMenuItemClick(item.path)}
              sx={{
                cursor: 'pointer',
                minHeight: 48,
                '&:hover': {
                  backgroundColor: '#f5f6f2',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItem>
          );
        })}
        {/* About Submenu */}
        {aboutOpen && aboutMenuItems.map((item) => (
          <ListItem
            key={item.path}
            onClick={() => handleMenuItemClick(item.path)}
            sx={{
              pl: 4,
              cursor: 'pointer',
              minHeight: 48,
              '&:hover': {
                backgroundColor: '#f5f6f2',
              },
            }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
        {/* Add Login to mobile menu */}
        <ListItem
          component={Link}
          to="/login"
          sx={{
            cursor: 'pointer',
            minHeight: 44,
            '&:hover': {
              backgroundColor: '#f5f6f2',
            },
          }}
        >
          <ListItemText primary="LOGIN" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ mb: 0 }}>
      <TopHeader position="fixed" scrolled={scrolled ? 1 : 0}>
        <Container maxWidth="lg" sx={{ p: 0 }}>
          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: { xs: 'flex-start', md: 'flex-start' },
              px: { xs: 1, sm: 4 },
              height: { xs: '64px', md: '82px' },
              minHeight: { xs: '64px', md: '82px' },
            }}
          >
            <Logo
              src="/images/logo.png"
              alt="Devolution Empowerment Party Logo"
              onClick={handleLogoClick}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: '#000',
                fontWeight: 700,
                textAlign: 'left',
                transition: 'all 180ms ease',
                fontSize: { xs: '0.78rem', sm: '1rem', md: '2rem' },
                lineHeight: 1.1,
                letterSpacing: 0,
                ml: { xs: 0, md: 0 },
              }}
            >
              DEVOLUTION EMPOWERMENT PARTY: THE MBUS PARTY
            </Typography>
          </Toolbar>
        </Container>
      </TopHeader>
      
      <BottomHeader position="fixed" scrolled={scrolled ? 1 : 0}>
        <Container maxWidth="lg" sx={{ p: 0 }}>
          <Toolbar 
            sx={{ 
              height: '80px', 
              justifyContent: 'space-between',
              alignItems: 'center',
              px: { xs: 1, md: 2 },
              minWidth: 0,
              overflow: 'hidden',
            }}
          >
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2, color: 'primary.main', minWidth: 44, minHeight: 44 }}
                >
                  <MenuIcon />
                </IconButton>
                <LoginButton
                  component={Link}
                  to="/login"
                  startIcon={<LoginIcon />}
                >
                  LOGIN
                </LoginButton>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'flex-start',
                    gap: 2,
                    flexWrap: 'nowrap',
                    minWidth: 0,
                  }}
                >
                  {navItems.slice(0, 4).map((item) => (
                    item.isMenu ? (
                      <NavButton
                        key={item.label}
                        aria-controls={open ? 'about-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onMouseEnter={handleMouseEnter}
                      >
                        {item.label}
                      </NavButton>
                    ) : (
                      <NavButton
                        key={item.label}
                        component={Link}
                        to={item.path}
                      >
                        {item.label}
                      </NavButton>
                    )
                  ))}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'center',
                    minWidth: 0,
                  }}
                >
                  {/* Placeholder for the logo */}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'flex-end',
                    gap: 2,
                    flexWrap: 'nowrap',
                    minWidth: 0,
                  }}
                >
                  {navItems.slice(4).map((item) => (
                    item.isMenu ? (
                      <NavButton
                        key={item.label}
                        aria-controls={open ? 'about-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onMouseEnter={handleMouseEnter}
                      >
                        {item.label}
                      </NavButton>
                    ) : (
                      <NavButton
                        key={item.label}
                        component={Link}
                        to={item.path}
                      >
                        {item.label}
                      </NavButton>
                    )
                  ))}
                  <LoginButton
                    component={Link}
                    to="/login"
                    startIcon={<LoginIcon />}
                  >
                    LOGIN
                  </LoginButton>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </BottomHeader>

      <Box
        component="nav"
        sx={{
          width: { sm: 240 },
          flexShrink: { sm: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: 240,
              backgroundColor: '#ffffff',
              width: 'min(320px, 88vw)',
              paddingTop: '144px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      <Menu
        id="about-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
          'aria-labelledby': 'about-button',
        }}
        TransitionComponent={Fade}
        sx={{
          mt: scrolled ? '0' : '1px',
          '& .MuiPaper-root': {
            backgroundColor: '#ffffff',
            borderRadius: 4,
            borderTop: '3px solid #f1cf32',
            boxShadow: '0 12px 28px rgba(16, 59, 41, 0.16)',
          }
        }}
      >
        {aboutMenuItems.map((item) => (
          <StyledMenuItem 
            key={item.path}
            onClick={() => handleMenuItemClick(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: '#f5f6f2',
              }
            }}
          >
            {item.label}
          </StyledMenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Header; 