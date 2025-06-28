
import type { AppointmentData } from '../BookingModal';

export const validatePatientForm = (formData: AppointmentData['patientInfo']) => {
  const newErrors: Record<string, string> = {};

  if (!formData.fullName.trim()) {
    newErrors.fullName = 'Full name is required';
  }

  if (formData.email && formData.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
  }

  if (!formData.phone.trim()) {
    newErrors.phone = 'Phone number is required';
  } else if (!/^\(?[\d\s\-\(\)]{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
    newErrors.phone = 'Please enter a valid phone number';
  }

  if (!formData.dateOfBirth.trim()) {
    newErrors.dateOfBirth = 'Age is required';
  } else {
    const age = parseInt(formData.dateOfBirth);
    if (isNaN(age) || age < 1 || age > 120) {
      newErrors.dateOfBirth = 'Please enter a valid age (1-120)';
    }
  }

  if (!formData.dentalConcern) {
    newErrors.dentalConcern = 'Please select your dental concern';
  }

  return newErrors;
};
