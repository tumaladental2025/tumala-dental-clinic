import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, RefreshCwIcon } from 'lucide-react';
import { getAppointments, updateAppointmentStatus, clearAllAppointments, deleteDoneAppointments, deleteAppointment, type StoredAppointment } from '@/utils/appointmentStorage';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from './DashboardHeader';
import AppointmentTabs from './AppointmentTabs';

const AppointmentsDashboard = () => {
  const [appointments, setAppointments] = useState<StoredAppointment[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDeletingAll, setIsDeletingAll] = useState(false);
  const [isDeletingDone, setIsDeletingDone] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  const loadAppointments = async () => {
    try {
      setIsRefreshing(true);
      const stored = await getAppointments();
      setAppointments(stored);
    } catch (error) {
      console.error('Error loading appointments:', error);
      toast({
        title: "Error",
        description: "Failed to load appointments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadAppointments();
    // Refresh appointments every 30 seconds
    const interval = setInterval(loadAppointments, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleStatusChange = async (id: string, status: 'Done' | 'Pending' | 'Didn\'t show up') => {
    try {
      await updateAppointmentStatus(id, status);
      setAppointments(prev => prev.map(apt => 
        apt.id === id ? { ...apt, status } : apt
      ));
      toast({
        title: "Success",
        description: `Appointment status updated to "${status}".`,
      });
    } catch (error) {
      console.error('Error updating appointment status:', error);
      toast({
        title: "Error",
        description: "Failed to update appointment status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearAllAppointments = async () => {
    try {
      setIsDeletingAll(true);
      await clearAllAppointments();
      setAppointments([]);
      toast({
        title: "Success",
        description: "All appointments have been cleared.",
      });
    } catch (error) {
      console.error('Error clearing appointments:', error);
      toast({
        title: "Error",
        description: "Failed to clear appointments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingAll(false);
    }
  };

  const handleDeleteDoneAppointments = async () => {
    try {
      setIsDeletingDone(true);
      await deleteDoneAppointments();
      setAppointments(prev => prev.filter(apt => apt.status !== 'Done'));
      toast({
        title: "Success",
        description: "All completed appointments have been deleted.",
      });
    } catch (error) {
      console.error('Error deleting done appointments:', error);
      toast({
        title: "Error",
        description: "Failed to delete completed appointments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeletingDone(false);
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(apt => apt.id !== id));
      toast({
        title: "Success",
        description: "Appointment has been deleted.",
      });
    } catch (error) {
      console.error('Error deleting appointment:', error);
      toast({
        title: "Error",
        description: "Failed to delete appointment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return apt.status === 'Pending';
    if (activeTab === 'completed') return apt.status === 'Done';
    if (activeTab === 'no-show') return apt.status === 'Didn\'t show up';
    return true;
  });

  const DashboardContent = () => (
    <div className="space-y-4">
      <DashboardHeader
        appointments={appointments}
        filteredAppointments={filteredAppointments}
        isRefreshing={isRefreshing}
        isDeletingAll={isDeletingAll}
        isDeletingDone={isDeletingDone}
        onRefresh={loadAppointments}
        onClearAll={handleClearAllAppointments}
        onDeleteDone={handleDeleteDoneAppointments}
      />

      {isLoading ? (
        <Card className="p-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <RefreshCwIcon className="h-6 w-6 animate-spin text-primary" />
            <p className="text-gray-500">Loading appointments...</p>
          </div>
        </Card>
      ) : (
        <AppointmentTabs
          appointments={appointments}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteAppointment}
        />
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <MenuIcon className="h-4 w-4" />
            Appointments
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Appointments Dashboard</SheetTitle>
            <SheetDescription>
              Manage and view all patient appointments
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <DashboardContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <DashboardContent />
    </div>
  );
};

export default AppointmentsDashboard;
