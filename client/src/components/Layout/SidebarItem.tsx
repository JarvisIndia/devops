import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface SidebarItemProps {
  text: string;
  icon: React.ReactNode;
  path: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  text,
  icon,
  path,
  onClick,
}) => {
  const theme = useTheme();
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <ListItem disablePadding>
      <ListItemButton
        component={Link}
        to={path}
        onClick={onClick}
        sx={{
          backgroundColor: isActive ? theme.palette.primary.main + '20' : 'transparent',
          color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
          '&:hover': {
            backgroundColor: isActive 
              ? theme.palette.primary.main + '30' 
              : theme.palette.action.hover,
          },
          '& .MuiListItemIcon-root': {
            color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default SidebarItem;
