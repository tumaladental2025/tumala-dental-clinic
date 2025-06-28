
import React, { useState } from 'react';
import AppointmentsDashboard from '@/components/AppointmentsDashboard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import DentistLogin from '@/components/DentistLogin';

const Appointments = () => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isDentistLoginOpen, setIsDentistLoginOpen] = useState(false);

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleDentistAccess = () => {
    setIsDentistLoginOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onBookNow={handleBookNow} onDentistAccess={handleDentistAccess} />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <AppointmentsDashboard />
        </div>
      </main>
      <Footer />
      
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <DentistLogin isOpen={isDentistLoginOpen} onClose={() => setIsDentistLoginOpen(false)} />
    </div>
  );
};

export default Appointments;
