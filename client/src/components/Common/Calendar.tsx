import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  useTheme,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

interface CalendarProps {
  selectedDate?: Date;
  onDateSelect?: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate = new Date(),
  onDateSelect,
  minDate,
  maxDate,
}) => {
  const theme = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleDateClick = (date: Date) => {
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const renderCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <Box>
        {/* Day headers */}
        <Grid container sx={{ mb: 1 }}>
          {dayNames.map((day) => (
            <Grid item xs={12/7} key={day}>
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  color: theme.palette.text.secondary,
                }}
              >
                {day}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* Calendar days */}
        <Grid container spacing={0.5}>
          {days.map((day) => {
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isCurrentDay = isToday(day);
            const isDisabled = isDateDisabled(day);

            return (
              <Grid item xs={12/7} key={day.toString()}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    borderRadius: 1,
                    backgroundColor: isSelected
                      ? theme.palette.primary.main
                      : isCurrentDay
                      ? theme.palette.primary.light + '20'
                      : 'transparent',
                    color: isSelected
                      ? theme.palette.primary.contrastText
                      : isCurrentDay
                      ? theme.palette.primary.main
                      : theme.palette.text.primary,
                    opacity: isDisabled ? 0.5 : 1,
                    '&:hover': {
                      backgroundColor: !isDisabled && !isSelected
                        ? theme.palette.action.hover
                        : undefined,
                    },
                  }}
                  onClick={() => !isDisabled && handleDateClick(day)}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: isCurrentDay ? 'bold' : 'normal',
                    }}
                  >
                    {format(day, 'd')}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 2, maxWidth: 350 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <IconButton onClick={prevMonth} size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {format(currentMonth, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={nextMonth} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Calendar */}
      {renderCalendarDays()}
    </Paper>
  );
};

export default Calendar;
