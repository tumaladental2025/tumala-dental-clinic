import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, RefreshCwIcon } from 'lucide-react';
import { addDays, format, isSameDay, isToday, isFuture, isAfter, startOfDay, getDay } from 'date-fns';
import { getAppointments } from '@/utils/appointmentStorage';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppointmentCalendarProps {
  onSelect: (date: Date, time: string) => void;
}

// Utility function to format date consistently (DD/MM/YYYY)
const formatDateConsistent = (date: Date): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AppointmentCalendar = ({
  onSelect
}: AppointmentCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: string[] }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const isMobile = useIsMobile();
  const timeSlotsRef = useRef<HTMLDivElement>(null);

  // Generate time slots based on the day of the week
  const timeSlots = useMemo(() => {
    if (!selectedDate) return [];
    const dayOfWeek = getDay(selectedDate); // 0 = Sunday, 1 = Monday, etc.
    const slots = [];
    if (dayOfWeek === 0) {
      // Sunday: 1:00 PM to 7:00 PM
      for (let hour = 13; hour < 19; hour++) {
        slots.push(`${hour}:00`);
        slots.push(`${hour}:30`);
      }
    } else {
      // Monday-Saturday: 9:00 AM to 7:00 PM
      for (let hour = 9; hour < 19; hour++) {
        slots.push(`${hour}:00`);
        slots.push(`${hour}:30`);
      }
    }
    return slots;
  }, [selectedDate]);

  // Load booked appointments from Supabase
  const loadBookedSlots = async () => {
    try {
      setIsLoading(true);
      console.log('Loading booked slots...');
      const appointments = await getAppointments();
      const bookedByDate: { [key: string]: string[] } = {};
      
      appointments.forEach(appointment => {
        const dateKey = appointment.date; // Use the date directly as it's already formatted
        console.log('Processing appointment for booking check:', {
          dateKey,
          time: appointment.time,
          status: appointment.status
        });
        
        // Only block time slots for pending appointments
        if (appointment.status === 'Pending') {
          if (!bookedByDate[dateKey]) {
            bookedByDate[dateKey] = [];
          }
          bookedByDate[dateKey].push(appointment.time);
        }
      });
      
      console.log('Final booked slots by date:', bookedByDate);
      setBookedSlots(bookedByDate);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Error loading appointments:', error);
      setBookedSlots({});
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBookedSlots();
    
    // Refresh every 10 seconds to keep data synchronized
    const interval = setInterval(loadBookedSlots, 10000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll to time slots on mobile when date is selected
  useEffect(() => {
    if (selectedDate && isMobile && timeSlotsRef.current) {
      // Small delay to ensure the component has rendered
      setTimeout(() => {
        timeSlotsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [selectedDate, isMobile]);

  const isSlotBooked = (date: Date, time: string) => {
    const dateKey = formatDateConsistent(date);
    const isBooked = bookedSlots[dateKey]?.includes(time) || false;
    console.log('Checking if slot is booked:', { 
      dateKey, 
      time, 
      isBooked, 
      availableSlots: bookedSlots[dateKey] || [] 
    });
    return isBooked;
  };

  const isSlotAvailable = (date: Date, time: string) => {
    const now = new Date();
    const [hour, minute] = time.split(':').map(Number);
    const slotDateTime = new Date(date);
    slotDateTime.setHours(hour, minute, 0, 0);

    // Check if slot is in the future and not booked
    const isFutureSlot = isAfter(slotDateTime, now);
    const isNotBooked = !isSlotBooked(date, time);
    
    console.log('Checking slot availability:', {
      date: formatDateConsistent(date),
      time,
      isFutureSlot,
      isNotBooked,
      finalAvailable: isFutureSlot && isNotBooked
    });
    
    return isFutureSlot && isNotBooked;
  };

  const handleTimeSelect = (time: string) => {
    if (selectedDate && isSlotAvailable(selectedDate, time)) {
      console.log('Time slot selected:', {
        date: formatDateConsistent(selectedDate),
        time
      });
      onSelect(selectedDate, time);
    } else {
      console.log('Time slot not available for selection:', {
        date: selectedDate ? formatDateConsistent(selectedDate) : 'No date',
        time,
        available: selectedDate ? isSlotAvailable(selectedDate, time) : false
      });
    }
  };

  const formatTimeSlot = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  // Disable dates that are in the past or more than 30 days in the future
  const disableDate = (date: Date) => {
    const today = startOfDay(new Date());
    const maxDate = addDays(today, 30);
    return date < today || date > maxDate;
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5 text-primary" />
              <span>Select Date</span>
            </div>
            <Button
              onClick={loadBookedSlots}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCwIcon className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar 
            mode="single" 
            selected={selectedDate} 
            onSelect={setSelectedDate} 
            disabled={disableDate} 
            className="w-full" 
          />
          <div className="mt-4 text-sm text-gray-600">
            <p>• Available appointments up to 30 days in advance</p>
            <p>• Select a date to view available time slots</p>
            {lastRefresh && (
              <p className="text-xs text-gray-400 mt-2">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots */}
      <Card ref={timeSlotsRef}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Available Time</span>
            {selectedDate && (
              <Badge variant="outline">
                {format(selectedDate, 'EEEE, MMMM d')}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedDate ? (
            <div className="text-center py-8 text-gray-500">
              <ClockIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Please select a date to view available times</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
              {timeSlots.map(time => {
                const isAvailable = isSlotAvailable(selectedDate, time);
                const isBooked = isSlotBooked(selectedDate, time);
                
                return (
                  <Button
                    key={time}
                    variant={isAvailable ? "outline" : "secondary"}
                    size="sm"
                    className={`justify-center ${
                      isAvailable 
                        ? 'hover:bg-primary hover:text-white border-primary/20' 
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    disabled={!isAvailable}
                    onClick={() => handleTimeSelect(time)}
                  >
                    <span className="text-xs">
                      {formatTimeSlot(time)}
                      {isBooked && ' (Booked)'}
                    </span>
                  </Button>
                );
              })}
            </div>
          )}
          
          {selectedDate && (
            <div className="mt-4 text-xs text-gray-500 space-y-1">
              <p>• Each appointment will be done not less than 30 minutes (so consider the time)</p>
              {getDay(selectedDate) === 0 ? (
                <p>• Sunday hours: 1:00 PM - 7:00 PM</p>
              ) : (
                <p>• Office hours: 9:00 AM - 7:00 PM (Mon-Sat)</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentCalendar;
