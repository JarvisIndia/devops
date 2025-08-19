import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';

// Context providers
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from '@/context/ThemeContext';
import { NotificationProvider, useNotifications } from '@/context/NotificationContext';
import { SocketProvider } from '@/context/SocketContext';

// Components
import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import NotificationSnackbar from '@/components/Common/NotificationSnackbar';

// Pages
import Login from '@/pages/Auth/Login';
import Register from '@/pages/Auth/Register';
import ForgotPassword from '@/pages/Auth/ForgotPassword';
import ResetPassword from '@/pages/Auth/ResetPassword';
import VerifyEmail from '@/pages/Auth/VerifyEmail';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Users from '@/pages/Users/Users';
import UserDetail from '@/pages/Users/UserDetail';
import Projects from '@/pages/Projects/Projects';
import ProjectDetail from '@/pages/Projects/ProjectDetail';
import Inventory from '@/pages/Inventory/Inventory';
import ProductDetail from '@/pages/Inventory/ProductDetail';
import Settings from '@/pages/Settings/Settings';
import Profile from '@/pages/Profile/Profile';
import NotFound from '@/pages/NotFound/NotFound';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const { theme: customTheme } = useTheme();
  const { currentSnackbar, hideSnackbar } = useNotifications();

  const theme = createTheme({
    palette: {
      mode: customTheme.mode,
      primary: {
        main: customTheme.primaryColor,
      },
      secondary: {
        main: customTheme.secondaryColor,
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:id" element={<ProjectDetail />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="inventory/:id" element={<ProductDetail />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      
      {/* Custom notification snackbar */}
      <NotificationSnackbar
        notification={currentSnackbar}
        onClose={hideSnackbar}
      />
    </ThemeProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <CustomThemeProvider>
            <AuthProvider>
              <NotificationProvider>
                <SocketProvider>
                  <AppContent />
                </SocketProvider>
              </NotificationProvider>
            </AuthProvider>
          </CustomThemeProvider>
        </Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
