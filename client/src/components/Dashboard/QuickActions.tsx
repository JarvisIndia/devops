import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Button,
  Typography,
  Box,
} from '@mui/material';
import {
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Inventory as InventoryIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Add User',
      icon: <PersonIcon />,
      color: 'primary',
      path: '/users',
    },
    {
      title: 'Create Project',
      icon: <AssignmentIcon />,
      color: 'secondary',
      path: '/projects',
    },
    {
      title: 'Add Product',
      icon: <InventoryIcon />,
      color: 'success',
      path: '/inventory',
    },
    {
      title: 'View Reports',
      icon: <AssessmentIcon />,
      color: 'info',
      path: '/dashboard',
    },
  ];

  const getColorValue = (color: string) => {
    switch (color) {
      case 'primary':
        return '#1976d2';
      case 'secondary':
        return '#dc004e';
      case 'success':
        return '#2e7d32';
      case 'info':
        return '#0288d1';
      default:
        return '#1976d2';
    }
  };

  return (
    <Card>
      <CardHeader
        title="Quick Actions"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent>
        <Grid container spacing={2}>
          {actions.map((action, index) => (
            <Grid item xs={6} key={index}>
              <Button
                variant="outlined"
                fullWidth
                startIcon={action.icon}
                onClick={() => navigate(action.path)}
                sx={{
                  py: 2,
                  borderColor: getColorValue(action.color),
                  color: getColorValue(action.color),
                  '&:hover': {
                    borderColor: getColorValue(action.color),
                    backgroundColor: getColorValue(action.color) + '10',
                  },
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {action.title}
                  </Typography>
                </Box>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
