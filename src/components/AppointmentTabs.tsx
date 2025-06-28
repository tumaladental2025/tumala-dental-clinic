import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { StoredAppointment } from '@/utils/appointmentStorage';
import AppointmentCard from './AppointmentCard';

interface AppointmentTabsProps {
  appointments: StoredAppointment[];
  activeTab: string;
  onTabChange: (value: string) => void;
  onStatusChange: (id: string, status: 'Done' | 'Pending' | 'Didn\'t show up') => void;
  onDelete?: (id: string) => void;
}

const AppointmentTabs = ({ appointments, activeTab, onTabChange, onStatusChange, onDelete }: AppointmentTabsProps) => {
  const filteredAppointments = appointments.filter(apt => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return apt.status === 'Pending';
    if (activeTab === 'completed') return apt.status === 'Done';
    if (activeTab === 'no-show') return apt.status === 'Didn\'t show up';
    return true;
  });

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
        <TabsTrigger value="pending">
          Pending ({appointments.filter(apt => apt.status === 'Pending').length})
        </TabsTrigger>
        <TabsTrigger value="completed">
          Done ({appointments.filter(apt => apt.status === 'Done').length})
        </TabsTrigger>
        <TabsTrigger value="no-show">
          No Show ({appointments.filter(apt => apt.status === 'Didn\'t show up').length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-4">
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <CalendarIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No appointments found</p>
            </Card>
          ) : (
            filteredAppointments.map(appointment => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment} 
                showActions={false}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="pending" className="mt-4">
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <ClockIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No pending appointments</p>
            </Card>
          ) : (
            filteredAppointments.map(appointment => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="completed" className="mt-4">
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <UserIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No completed appointments</p>
            </Card>
          ) : (
            filteredAppointments.map(appointment => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </TabsContent>

      <TabsContent value="no-show" className="mt-4">
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="p-8 text-center">
              <UserIcon className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No no-show appointments</p>
            </Card>
          ) : (
            filteredAppointments.map(appointment => (
              <AppointmentCard 
                key={appointment.id} 
                appointment={appointment}
                onStatusChange={onStatusChange}
                onDelete={onDelete}
              />
            ))
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default AppointmentTabs;
