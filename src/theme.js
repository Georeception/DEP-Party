import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E8B57',
      dark: '#1E6E43',
      light: '#B9E2C7',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F3C93F',
      dark: '#D8A820',
      light: '#F8E39A',
      contrastText: '#1d2922',
    },
    success: {
      main: '#28734c',
    },
    background: {
      default: '#f5f6f2',
      paper: '#ffffff',
    },
    text: {
      primary: '#1d2922',
      secondary: '#626d66',
    },
    divider: '#dce3dc',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
    h1: {
      fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
      fontWeight: 800,
      lineHeight: 1.04,
      letterSpacing: '-0.045em',
    },
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3.25rem)',
      fontWeight: 750,
      lineHeight: 1.12,
      letterSpacing: '-0.035em',
    },
    h3: {
      fontSize: 'clamp(1.65rem, 3vw, 2.5rem)',
      fontWeight: 730,
      lineHeight: 1.18,
      letterSpacing: '-0.025em',
    },
    h4: {
      fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
      fontWeight: 720,
      lineHeight: 1.25,
      letterSpacing: '-0.018em',
    },
    h5: {
      fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    h6: {
      fontSize: '1.05rem',
      fontWeight: 700,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.75,
    },
    body2: {
      fontSize: '0.925rem',
      lineHeight: 1.65,
    },
    subtitle1: {
      fontSize: '1.05rem',
      lineHeight: 1.6,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 650,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.8rem',
      lineHeight: 1.5,
      letterSpacing: '0.015em',
    },
    button: {
      fontWeight: 700,
      textTransform: 'none',
      letterSpacing: '0.025em',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f6f2',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 18px rgba(16, 59, 41, 0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #dce3dc',
          borderRadius: 8,
          boxShadow: '0 5px 20px rgba(16, 59, 41, 0.06)',
          transition: 'border-color 180ms ease, box-shadow 180ms ease, transform 180ms ease',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        elevation1: {
          boxShadow: '0 5px 20px rgba(16, 59, 41, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: 44,
          borderRadius: 4,
          paddingInline: 20,
          fontWeight: 700,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 5px 14px rgba(16, 59, 41, 0.18)',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: '#ffffff',
        },
        notchedOutline: {
          borderColor: '#cbd5cc',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48,
          fontWeight: 650,
          textTransform: 'none',
        },
      },
    },
  },
});
