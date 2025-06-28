
-- Create a table for storing appointments
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  appointment_date TEXT NOT NULL,
  appointment_time TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Done', 'Pending', 'Didn''t show up')),
  date_of_birth TEXT NOT NULL,
  dental_concern TEXT NOT NULL,
  patient_type TEXT NOT NULL DEFAULT 'new' CHECK (patient_type IN ('new', 'returning')),
  special_notes TEXT,
  insurance TEXT,
  booked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create an index on appointment_date and appointment_time for faster queries
CREATE INDEX idx_appointments_date_time ON public.appointments(appointment_date, appointment_time);

-- Create an index on status for faster filtering
CREATE INDEX idx_appointments_status ON public.appointments(status);

-- Enable Row Level Security (RLS) - making it public for now since this is a dental office app
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows everyone to read, insert, update, and delete appointments
-- This is suitable for a dental office where staff need full access
CREATE POLICY "Enable all access for appointments" ON public.appointments
FOR ALL USING (true) WITH CHECK (true);
