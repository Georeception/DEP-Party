import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#228B22', // Forest Green
      dark: '#006400',
      light: '#90EE90',
    },
    secondary: {
      main: '#FFD700', // Yellow
      dark: '#DAA520',
      light: '#FFEB3B',
    },
    success: {
      main: '#228B22',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
  typography: {
    fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
    },
    h2: {
      fontWeight: 600,
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
    },
    body1: {
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontFamily: '"Isra Regular", "Roboto", "Arial", sans-serif',
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
}); 