import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
  userId: string;
}

interface NotificationSnackbarData {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number;
}

interface NotificationContextType {
  notifications: NotificationItem[];
  currentSnackbar: NotificationSnackbarData | null;
  unreadCount: number;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => void;
  showSnackbar: (snackbar: Omit<NotificationSnackbarData, 'id'>) => void;
  hideSnackbar: () => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  fetchNotifications: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [currentSnackbar, setCurrentSnackbar] = useState<NotificationSnackbarData | null>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Initialize WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const newSocket = io(import.meta.env.VITE_WS_URL || 'ws://localhost:5000', {
        auth: {
          token,
        },
      });

      newSocket.on('connect', () => {
        console.log('Connected to notification service');
      });

      newSocket.on('notification', (notification: NotificationItem) => {
        addNotification(notification);
        // Show as snackbar too
        showSnackbar({
          type: notification.type,
          title: notification.title,
          message: notification.message,
        });
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from notification service');
      });

      return () => {
        newSocket.close();
      };
    }
  }, []);

  const addNotification = (notification: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: NotificationItem = {
      ...notification,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const showSnackbar = (snackbar: Omit<NotificationSnackbarData, 'id'>) => {
    const newSnackbar: NotificationSnackbarData = {
      ...snackbar,
      id: uuidv4(),
    };
    setCurrentSnackbar(newSnackbar);
  };

  const hideSnackbar = () => {
    setCurrentSnackbar(null);
  };

  const markAsRead = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
          )
        );
      }
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications/mark-all-read', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setNotifications(prev =>
          prev.map(notification => ({ ...notification, isRead: true }))
        );
      }
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const removeNotification = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
      }
    } catch (error) {
      console.error('Failed to remove notification:', error);
    }
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.data.notifications || []);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  const value: NotificationContextType = {
    notifications,
    currentSnackbar,
    unreadCount,
    addNotification,
    showSnackbar,
    hideSnackbar,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    fetchNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
