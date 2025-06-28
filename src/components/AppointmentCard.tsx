import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ClockIcon, PhoneIcon, X } from 'lucide-react';
import { StoredAppointment } from '@/utils/appointmentStorage';

interface AppointmentCardProps {
  appointment: StoredAppointment;
  showActions?: boolean;
  onStatusChange: (id: string, status: 'Done' | 'Pending' | 'Didn\'t show up') => void;
  onDelete?: (id: string) => void;
}

const AppointmentCard = ({ appointment, showActions = true, onStatusChange, onDelete }: AppointmentCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    const [hour, minute] = timeString.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'Done':
        return 'default';
      case 'Didn\'t show up':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="mb-4 shadow-sm border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-primary">
              {appointment.patientName}
            </CardTitle>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={getBadgeVariant(appointment.status)}>
                {appointment.status}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {appointment.patientType}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {showActions && (
              <div className="flex gap-2 flex-wrap">
                {appointment.status === 'Pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => onStatusChange(appointment.id, 'Done')}
                      className="text-xs"
                    >
                      Mark Done
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onStatusChange(appointment.id, 'Didn\'t show up')}
                      className="text-xs bg-red-600 hover:bg-red-700"
                    >
                      Didn't show up
                    </Button>
                  </>
                )}
                {appointment.status === 'Done' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStatusChange(appointment.id, 'Pending')}
                    className="text-xs"
                  >
                    Reopen
                  </Button>
                )}
                {appointment.status === 'Didn\'t show up' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onStatusChange(appointment.id, 'Pending')}
                    className="text-xs"
                  >
                    Reopen
                  </Button>
                )}
              </div>
            )}
            {onDelete && (
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(appointment.id)}
                className="text-xs p-2 hover:bg-red-50 hover:border-red-200"
                title="Delete appointment"
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Date:</span>
              <span>{formatDate(appointment.date)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ClockIcon className="h-4 w-4 text-gray-500" />
              <span className="font-medium">Time:</span>
              <span>{formatTime(appointment.time)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <PhoneIcon className="h-4 w-4 text-gray-500" />
            <span className="font-medium">Phone:</span>
            <span>{appointment.phone}</span>
          </div>

          <div className="border-t pt-3">
            <div className="text-sm">
              <span className="font-medium">Service:</span>
              <span className="ml-2">{appointment.service}</span>
            </div>
            {appointment.specialNotes && (
              <div className="text-sm mt-2">
                <span className="font-medium">Notes:</span>
                <span className="ml-2 text-gray-600">{appointment.specialNotes}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
