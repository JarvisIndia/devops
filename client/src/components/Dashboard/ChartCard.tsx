import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Box,
} from '@mui/material';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: number;
}

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle,
  children,
  height = 300,
}) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader
        title={title}
        subheader={subtitle}
        titleTypographyProps={{ variant: 'h6' }}
        subheaderTypographyProps={{ variant: 'body2' }}
      />
      <CardContent sx={{ p: 0, height: height - 80 }}>
        <Box sx={{ height: '100%', p: 2 }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
