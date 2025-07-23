import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { he } from "date-fns/locale";

export default function DatePicker({ onDateSelect }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingEnd, setIsSelectingEnd] = useState(false);

  const handleDateClick = (date) => {
    if (!startDate || isSelectingEnd) {
      if (!startDate) {
        setStartDate(date);
        setIsSelectingEnd(true);
      } else {
        if (date > startDate) {
          setEndDate(date);
          setIsSelectingEnd(false);
        } else {
          setStartDate(date);
          setEndDate(null);
        }
      }
    }
  };

  const handleConfirm = () => {
    if (startDate && endDate) {
      onDateSelect(
        format(startDate, 'dd/MM/yyyy'),
        format(endDate, 'dd/MM/yyyy')
      );
    }
  };

  return (
    <div className="space-y-4 text-center">
      <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
        <Calendar
          mode="single"
          selected={startDate}
          onSelect={handleDateClick}
          disabled={(date) => date < new Date()}
          locale={he}
          className="mx-auto"
        />
      </div>
      
      <div className="space-y-2">
        {startDate && (
          <div className="text-sm text-gray-600">
            תאריך התחלה: <span className="font-semibold">{format(startDate, 'dd/MM/yyyy')}</span>
          </div>
        )}
        {endDate && (
          <div className="text-sm text-gray-600">
            תאריך סיום: <span className="font-semibold">{format(endDate, 'dd/MM/yyyy')}</span>
          </div>
        )}
        
        {isSelectingEnd && !endDate && (
          <div className="text-sm text-orange-600">
            עכשיו בחרו את תאריך הסיום
          </div>
        )}
      </div>

      {startDate && endDate && (
        <Button
          onClick={handleConfirm}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-xl"
        >
          אישור התאריכים
        </Button>
      )}
    </div>
  );
}