import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
} from '@mui/material';
import {
  Person as PersonIcon,
  Assignment as AssignmentIcon,
  Inventory as InventoryIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'created a new project',
      target: 'E-commerce Website',
      time: '2 hours ago',
      type: 'project',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'updated inventory',
      target: 'Product XYZ',
      time: '4 hours ago',
      type: 'inventory',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'completed task',
      target: 'User Authentication',
      time: '6 hours ago',
      type: 'task',
    },
    {
      id: 4,
      user: 'Sarah Wilson',
      action: 'added new user',
      target: 'Marketing Team',
      time: '1 day ago',
      type: 'user',
    },
    {
      id: 5,
      user: 'Admin',
      action: 'updated system settings',
      target: 'Email Configuration',
      time: '2 days ago',
      type: 'settings',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project':
        return <AssignmentIcon />;
      case 'inventory':
        return <InventoryIcon />;
      case 'user':
        return <PersonIcon />;
      case 'settings':
        return <SettingsIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'project':
        return 'primary';
      case 'inventory':
        return 'success';
      case 'user':
        return 'info';
      case 'settings':
        return 'warning';
      default:
        return 'primary';
    }
  };

  return (
    <Card>
      <CardHeader
        title="Recent Activity"
        titleTypographyProps={{ variant: 'h6' }}
      />
      <CardContent sx={{ p: 0 }}>
        <List sx={{ p: 0 }}>
          {activities.map((activity, index) => (
            <React.Fragment key={activity.id}>
              <ListItem sx={{ py: 1.5 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: `${getActivityColor(activity.type)}.light`,
                      color: `${getActivityColor(activity.type)}.main`,
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body2">
                      <strong>{activity.user}</strong> {activity.action}{' '}
                      <strong>{activity.target}</strong>
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  }
                />
              </ListItem>
              {index < activities.length - 1 && (
                <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', mx: 2 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
