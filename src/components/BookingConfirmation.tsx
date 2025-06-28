
import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircleIcon, CalendarIcon, ClockIcon, UserIcon, PhoneIcon } from 'lucide-react';
import { AppointmentData } from '@/components/BookingModal';
import { saveAppointment } from '@/utils/appointmentStorage';
import { useToast } from '@/hooks/use-toast';

interface BookingConfirmationProps {
  appointmentData: AppointmentData;
  onClose: () => void;
}

const BookingConfirmation = ({
  appointmentData,
  onClose
}: BookingConfirmationProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  const saveAttempted = useRef(false);

  useEffect(() => {
    const handleSaveAppointment = async () => {
      // Prevent multiple saves
      if (saveAttempted.current || isSaving || isSaved) {
        return;
      }

      // Check if we have the required data
      if (!appointmentData.date || !appointmentData.time || !appointmentData.patientInfo.fullName) {
        return;
      }

      saveAttempted.current = true;
      setIsSaving(true);

      try {
        await saveAppointment(appointmentData);
        console.log('Appointment saved successfully');
        setIsSaved(true);
        toast({
          title: "Success!",
          description: "Your appointment has been saved successfully.",
        });
      } catch (error) {
        console.error('Failed to save appointment:', error);
        saveAttempted.current = false; // Allow retry on error
        toast({
          title: "Error",
          description: "Failed to save appointment. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    };

    handleSaveAppointment();
  }, []); // Empty dependency array since we only want this to run once

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">
          {isSaved ? 'Appointment Confirmed!' : 'Confirming Appointment...'}
        </h2>
        <p className="text-gray-600">
          {isSaved 
            ? 'Your appointment has been successfully booked. Please arrive 15 minutes early.'
            : 'Please wait while we save your appointment details.'
          }
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <CalendarIcon className="mr-2 h-5 w-5" />
            Appointment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Date:</span>
                <span>{appointmentData.date?.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <ClockIcon className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Time:</span>
                <span>{appointmentData.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <UserIcon className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Patient:</span>
                <span>{appointmentData.patientInfo.fullName}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <PhoneIcon className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Phone:</span>
                <span>{appointmentData.patientInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Concern:</span>
                <span>{appointmentData.patientInfo.dentalConcern}</span>
              </div>
            </div>
          </div>
          
          {appointmentData.patientInfo.specialNotes && (
            <div className="border-t pt-4">
              <span className="font-medium">Special Notes:</span>
              <p className="text-gray-600 mt-1">{appointmentData.patientInfo.specialNotes}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {isSaved && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">What's Next?</h3>
          <ul className="text-blue-700 space-y-1 text-sm">
            <li>• Please arrive 15 minutes early for your appointment</li>
            <li>• If you need to reschedule, please call us at least 24 hours in advance</li>
            <li>• Bring a valid ID and insurance information if applicable</li>
          </ul>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button 
          onClick={onClose} 
          className="bg-primary hover:bg-primary/90"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Close'}
        </Button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
