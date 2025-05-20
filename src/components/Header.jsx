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
  backgroundColor: theme.palette.primary.main,
  padding: '0',
  transform: scrolled ? 'translateY(-100%)' : 'translateY(0)',
  transition: 'transform 0.3s ease-in-out',
  borderRadius: 0,
  zIndex: theme.zIndex.drawer + 2,
}));

const BottomHeader = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: theme.palette.secondary.main,
  top: scrolled ? 0 : '64px',
  height: '80px',
  transition: 'all 0.3s ease-in-out',
  boxShadow: scrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
  borderRadius: 0,
  zIndex: theme.zIndex.drawer + 1,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#000',
  fontWeight: 750,
  fontSize: '0.9rem',
  padding: '6px 12px',
  minWidth: 0,
  '&:hover': {
    backgroundColor: theme.palette.secondary.dark,
    color: '#000',
  },
  transition: 'all 0.3s ease',
  borderRadius: 0,
}));

const Logo = styled('img')({
  height: '80px',
  width: 'auto',
  marginRight: '20px',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  }
});

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.secondary.light,
    color: '#000',
  },
  minWidth: '200px',
  color: '#000',
  transition: 'all 0.2s ease',
}));

const LoginButton = styled(Button)(({ theme }) => ({
  color: '#000',
  fontWeight: 600,
  fontSize: '0.7rem',
  padding: '3px 12px',
  minWidth: 0,
  backgroundColor: theme.palette.primary.main,
  color: '#fff',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: '#fff',
  },
  transition: 'all 0.3s ease',
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
    <Box sx={{ textAlign: 'center' }}>
      <List>
        {navItems.map((item) => {
          if (item.isMenu) {
            return (
              <ListItem
                key={item.label}
                onClick={() => setAboutOpen((prev) => !prev)}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '&:hover': {
                    backgroundColor: 'secondary.light',
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
                '&:hover': {
                  backgroundColor: 'secondary.light',
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
              '&:hover': {
                backgroundColor: 'secondary.light',
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
            '&:hover': {
              backgroundColor: 'secondary.light',
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
              justifyContent: { xs: 'center', md: 'flex-start' },
              px: { xs: 1, sm: 2 },
              height: '80px',
            }}
          >
            <Logo
              src="/images/logo.png"
              alt="Devolution Empowerment Party Logo"
              onClick={handleLogoClick}
              style={{ marginRight: 16 }}
            />
            <Typography
              variant="h4"
              component="div"
              sx={{
                color: '#000',
                fontWeight: 'bold',
                textAlign: { xs: 'center', md: 'left' },
                transition: 'all 0.3s ease',
                fontSize: { xs: '1.2rem', sm: '1.5rem', md: '2rem' },
                ml: { xs: 0, md: 2 },
              }}
            >
              DEVOLUTION EMPOWERMENT PARTY: THE BUS PARTY
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
              '& > *': {
                mt: 2,
              },
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
                  sx={{ mr: 2 }}
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
              backgroundColor: 'secondary.main',
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
            backgroundColor: 'secondary.main',
            borderRadius: 0,
          }
        }}
      >
        {aboutMenuItems.map((item) => (
          <StyledMenuItem 
            key={item.path}
            onClick={() => handleMenuItemClick(item.path)}
            sx={{
              '&:hover': {
                backgroundColor: 'secondary.dark',
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