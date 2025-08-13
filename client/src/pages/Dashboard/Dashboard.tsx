import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, IconButton, Menu, MenuItem, useTheme } from '@mui/material';
import { MoreVert as MoreVertIcon, People as PeopleIcon, Assignment as AssignmentIcon, Inventory as InventoryIcon, AttachMoney as MoneyIcon } from '@mui/icons-material';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler } from 'chart.js';

// Components
import StatCard from '@/components/Dashboard/StatCard';
import ChartCard from '@/components/Dashboard/ChartCard';
import RecentActivity from '@/components/Dashboard/RecentActivity';
import QuickActions from '@/components/Dashboard/QuickActions';
import LoadingSpinner from '@/components/Common/LoadingSpinner';

// Hooks
import { useQuery } from 'react-query';
import { useAuth } from '@/context/AuthContext';

// Services
import { dashboardService } from '@/services/dashboardService';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [timeRange, setTimeRange] = useState('7d');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data: stats, isLoading: statsLoading } = useQuery(['dashboard-stats'], () => dashboardService.getStats(), { refetchInterval: 30000 });
  const { data: chartData, isLoading: chartLoading } = useQuery(['dashboard-charts'], () => dashboardService.getChartData(), { refetchInterval: 60000 });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    handleMenuClose();
  };

  const lineChartData = {
    labels: chartData?.userGrowth?.labels || [],
    datasets: [
      {
        label: 'User Growth',
        data: chartData?.userGrowth?.data || [],
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light + '20',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const barChartData = {
    labels: chartData?.revenue?.labels || [],
    datasets: [
      {
        label: 'Revenue',
        data: chartData?.revenue?.data || [],
        backgroundColor: theme.palette.success.main,
        borderColor: theme.palette.success.dark,
        borderWidth: 1,
      },
    ],
  };

  const doughnutChartData = {
    labels: ['Completed', 'In Progress', 'Pending', 'Cancelled'],
    datasets: [
      {
        data: chartData?.projectStatus || [0, 0, 0, 0],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.primary.main,
          theme.palette.warning.main,
          theme.palette.error.main,
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (statsLoading || chartLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom>Welcome back, {user?.firstName}!</Typography>
          <Typography variant="body1" color="text.secondary">Here's what's happening with your business today.</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip label={timeRange} variant="outlined" />
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => handleTimeRangeChange('7d')}>Last 7 days</MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange('30d')}>Last 30 days</MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange('90d')}>Last 90 days</MenuItem>
            <MenuItem onClick={() => handleTimeRangeChange('1y')}>Last year</MenuItem>
          </Menu>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Users" 
            value={stats?.totalUsers || 0} 
            change={stats?.userGrowth || 0} 
            icon={<PeopleIcon />} 
            color="primary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Active Projects" 
            value={stats?.activeProjects || 0} 
            change={stats?.projectGrowth || 0} 
            icon={<AssignmentIcon />} 
            color="secondary" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Total Revenue" 
            value={`$${stats?.totalRevenue?.toLocaleString() || 0}`} 
            change={stats?.revenueGrowth || 0} 
            icon={<MoneyIcon />} 
            color="success" 
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard 
            title="Inventory Items" 
            value={stats?.totalInventory || 0} 
            change={stats?.inventoryGrowth || 0} 
            icon={<InventoryIcon />} 
            color="warning" 
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={8}>
          <ChartCard title="User Growth" subtitle="New user registrations over time" height={400}>
            <Line data={lineChartData} options={chartOptions} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <ChartCard title="Project Status" subtitle="Distribution of project statuses" height={400}>
            <Doughnut data={doughnutChartData} options={chartOptions} />
          </ChartCard>
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={6}>
          <ChartCard title="Revenue Overview" subtitle="Monthly revenue performance" height={300}>
            <Bar data={barChartData} options={chartOptions} />
          </ChartCard>
        </Grid>
        <Grid item xs={12} lg={6}>
          <QuickActions />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <RecentActivity />
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>System Status</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Database</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">API Server</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">File Storage</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body2">Email Service</Typography>
                  <Chip label="Online" color="success" size="small" />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
