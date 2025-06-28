import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, ClockIcon, UserIcon, CheckIcon, ArrowLeftIcon } from 'lucide-react';
import AppointmentCalendar from '@/components/AppointmentCalendar';
import PatientForm from '@/components/PatientForm';
import BookingConfirmation from '@/components/BookingConfirmation';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface AppointmentData {
  date: Date | null;
  time: string;
  patientInfo: {
    fullName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    dentalConcern: string;
    patientType: 'new' | 'returning';
    specialNotes: string;
    insurance: string;
  };
}

const BookingModal = ({
  isOpen,
  onClose
}: BookingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const dialogContentRef = useRef<HTMLDivElement>(null);
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    date: null,
    time: '',
    patientInfo: {
      fullName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      dentalConcern: '',
      patientType: 'new',
      specialNotes: '',
      insurance: ''
    }
  });

  // Scroll to top when step changes to confirmation
  useEffect(() => {
    if (currentStep === 3 && dialogContentRef.current) {
      dialogContentRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  const handleDateTimeSelect = (date: Date, time: string) => {
    setAppointmentData(prev => ({
      ...prev,
      date,
      time
    }));
    setCurrentStep(1.5); // Go to confirmation step
  };

  const handleTimeConfirm = () => {
    setCurrentStep(2); // Go to patient information
  };

  const handlePatientInfoSubmit = (patientInfo: AppointmentData['patientInfo']) => {
    setAppointmentData(prev => ({
      ...prev,
      patientInfo
    }));
    setCurrentStep(3);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setAppointmentData({
      date: null,
      time: '',
      patientInfo: {
        fullName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        dentalConcern: '',
        patientType: 'new',
        specialNotes: '',
        insurance: ''
      }
    });
    onClose();
  };

  const formatTimeSlot = (time: string) => {
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const displayHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
    return `${displayHour}:${minute} ${ampm}`;
  };

  const steps = [{
    number: 1,
    title: 'Select Date & Time',
    icon: CalendarIcon
  }, {
    number: 2,
    title: 'Patient Information',
    icon: UserIcon
  }, {
    number: 3,
    title: 'Confirmation',
    icon: CheckIcon
  }];

  return <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent ref={dialogContentRef} className="max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary text-center">
            Book Your Dental Appointment
          </DialogTitle>
          
          {/* Progress Steps */}
          <div className="flex justify-center space-x-2 sm:space-x-8 mt-4 sm:mt-6 overflow-x-auto pb-2">
            {steps.map(step => <div key={step.number} className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-shrink-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${currentStep >= step.number ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'}`}>
                  {currentStep > step.number ? <CheckIcon className="h-3 w-3 sm:h-5 sm:w-5" /> : <step.icon className="h-3 w-3 sm:h-5 sm:w-5" />}
                </div>
                <span className={`text-xs sm:text-sm font-medium ${currentStep >= step.number ? 'text-primary' : 'text-gray-500'} hidden sm:block`}>
                  {step.title}
                </span>
              </div>)}
          </div>
        </DialogHeader>

        <div className="mt-4 sm:mt-6">
          {/* Step 1: Calendar Selection */}
          {currentStep === 1 && <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold mb-2">Choose Your Preferred Date and Time</h3>
              </div>
              <AppointmentCalendar onSelect={handleDateTimeSelect} />
            </div>}

          {/* Step 1.5: Time Confirmation */}
          {currentStep === 1.5 && <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4">
                  <ArrowLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Back to Calendar</span>
                  <span className="sm:hidden">Back</span>
                </Button>
                
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold">Confirm Your Appointment Time</h3>
                </div>
                <div></div>
              </div>
              
              <div className="flex justify-center">
                <Card className="w-full max-w-md">
                  <CardHeader className="text-center">
                    <CardTitle className="flex items-center justify-center space-x-2 text-primary">
                      <CalendarIcon className="h-5 w-5" />
                      <span>Selected Appointment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-center">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <CalendarIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Date:</span>
                        <Badge variant="outline" className="text-primary">
                          {appointmentData.date?.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <ClockIcon className="h-4 w-4 text-gray-500" />
                        <span className="font-medium">Time:</span>
                        <Badge variant="outline" className="text-primary">
                          {formatTimeSlot(appointmentData.time)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="pt-4 space-y-3">
                      <p className="text-gray-600 text-sm">
                        Please confirm your appointment time to proceed with patient information.
                      </p>
                      <Button onClick={handleTimeConfirm} className="w-full bg-primary hover:bg-primary/90" size="lg">
                        <CheckIcon className="mr-2 h-4 w-4" />
                        Confirm Appointment Time
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>}

          {/* Step 2: Patient Information */}
          {currentStep === 2 && <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1.5)} className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4">
                  <ArrowLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Back to Confirmation</span>
                  <span className="sm:hidden">Back</span>
                </Button>
                
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold">Patient Information</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Selected: {appointmentData.date?.toLocaleDateString()} at {formatTimeSlot(appointmentData.time)}
                  </p>
                </div>
                <div></div>
              </div>
              
              <PatientForm onSubmit={handlePatientInfoSubmit} initialData={appointmentData.patientInfo} />
            </div>}

          {/* Step 3: Confirmation */}
          {currentStep === 3 && <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm px-2 sm:px-4">
                  <ArrowLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Back to Form</span>
                  <span className="sm:hidden">Back</span>
                </Button>
                <div className="text-center">
                  
                </div>
                <div></div>
              </div>
              
              <BookingConfirmation appointmentData={appointmentData} onClose={handleClose} />
            </div>}
        </div>
      </DialogContent>
    </Dialog>;
};

export default BookingModal;
