
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RefreshCwIcon, Trash2Icon } from 'lucide-react';
import { StoredAppointment } from '@/utils/appointmentStorage';

interface DashboardHeaderProps {
  appointments: StoredAppointment[];
  filteredAppointments: StoredAppointment[];
  isRefreshing: boolean;
  isDeletingAll: boolean;
  isDeletingDone: boolean;
  onRefresh: () => void;
  onClearAll: () => void;
  onDeleteDone: () => void;
}

const DashboardHeader = ({
  appointments,
  filteredAppointments,
  isRefreshing,
  isDeletingAll,
  isDeletingDone,
  onRefresh,
  onClearAll,
  onDeleteDone
}: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-primary">Patient Appointments</h2>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2"
        >
          <RefreshCwIcon className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
        
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isDeletingDone || appointments.filter(apt => apt.status === 'Done').length === 0}
              className="flex items-center gap-2"
            >
              <Trash2Icon className="h-4 w-4" />
              Clear Done
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Completed Appointments</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all completed appointments. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onDeleteDone}
                disabled={isDeletingDone}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeletingDone ? 'Deleting...' : 'Delete Completed'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              size="sm"
              disabled={isDeletingAll || appointments.length === 0}
              className="flex items-center gap-2"
            >
              <Trash2Icon className="h-4 w-4" />
              Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear All Appointments</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete ALL appointments from the database. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={onClearAll}
                disabled={isDeletingAll}
                className="bg-red-600 hover:bg-red-700"
              >
                {isDeletingAll ? 'Clearing...' : 'Clear All'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Badge variant="outline" className="text-sm">
          {filteredAppointments.length} appointments
        </Badge>
      </div>
    </div>
  );
};

export default DashboardHeader;
