
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ImportantNotesCard = () => {
  return (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="pt-6">
        <h4 className="font-semibold text-blue-800 mb-2">Before Your Visit:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Arrive 15 minutes early for paperwork</li>
          <li>• We'll send a confirmation email with all details</li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default ImportantNotesCard;
