
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { AppointmentData } from './BookingModal';
import PersonalInfoSection from './PatientForm/PersonalInfoSection';
import AppointmentDetailsSection from './PatientForm/AppointmentDetailsSection';
import ImportantNotesCard from './PatientForm/ImportantNotesCard';
import { validatePatientForm } from './PatientForm/patientFormValidation';

interface PatientFormProps {
  onSubmit: (data: AppointmentData['patientInfo']) => void;
  initialData: AppointmentData['patientInfo'];
}

const PatientForm = ({ onSubmit, initialData }: PatientFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validatePatientForm(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: keyof AppointmentData['patientInfo'], value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalInfoSection 
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

      <AppointmentDetailsSection 
        formData={formData}
        errors={errors}
        onInputChange={handleInputChange}
      />

      <ImportantNotesCard />

      <div className="flex justify-center">
        <Button type="submit" size="lg" className="px-8">
          Continue to Confirmation
        </Button>
      </div>
    </form>
  );
};

export default PatientForm;
