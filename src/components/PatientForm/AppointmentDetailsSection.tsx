
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dentalConcerns } from './patientFormData';
import type { AppointmentData } from '../BookingModal';

interface AppointmentDetailsSectionProps {
  formData: AppointmentData['patientInfo'];
  errors: Record<string, string>;
  onInputChange: (field: keyof AppointmentData['patientInfo'], value: string) => void;
}

const AppointmentDetailsSection = ({ formData, errors, onInputChange }: AppointmentDetailsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Patient Type *</Label>
          <RadioGroup
            value={formData.patientType}
            onValueChange={(value) => onInputChange('patientType', value as 'new' | 'returning')}
            className="flex space-x-6 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="new" id="new" />
              <Label htmlFor="new">New Patient</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="returning" id="returning" />
              <Label htmlFor="returning">Returning Patient</Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="dentalConcern">Reason for Visit *</Label>
          <Select
            value={formData.dentalConcern}
            onValueChange={(value) => onInputChange('dentalConcern', value)}
          >
            <SelectTrigger className={errors.dentalConcern ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select your dental concern" />
            </SelectTrigger>
            <SelectContent className="z-50">
              {dentalConcerns.map((concern) => (
                <SelectItem key={concern} value={concern}>
                  {concern}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.dentalConcern && (
            <p className="text-red-500 text-sm mt-1">{errors.dentalConcern}</p>
          )}
        </div>

        <div>
          <Label htmlFor="specialNotes">Special Notes or Requirements</Label>
          <Textarea
            id="specialNotes"
            value={formData.specialNotes}
            onChange={(e) => onInputChange('specialNotes', e.target.value)}
            placeholder="Any special accommodations, medications, or notes for the dentist..."
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentDetailsSection;
