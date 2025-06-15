
import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WeekData } from '@/types/weekly-plan';
import { WeekInputCard } from './WeekInputCard';
import { Calendar, Target } from 'lucide-react';

interface WeeklyInputSystemProps {
  weeklyData: WeekData[];
  actualWeights: { [week: number]: string };
  onWeightUpdate: (week: number, weight: string) => void;
  onWeightSave: (week: number) => void;
  startDate: string;
}

export const WeeklyInputSystem = ({
  weeklyData,
  actualWeights,
  onWeightUpdate,
  onWeightSave,
  startDate
}: WeeklyInputSystemProps) => {
  const getCurrentWeek = () => {
    const start = new Date(startDate);
    const now = new Date();
    const diffTime = now.getTime() - start.getTime();
    const diffWeeks = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 7)) + 1;
    return Math.max(1, Math.min(diffWeeks, weeklyData.length));
  };

  const currentWeek = getCurrentWeek();

  const getWeekStatus = (weekNumber: number, actualWeight: number | null) => {
    if (actualWeight !== null) return 'completed';
    if (weekNumber < currentWeek) return 'overdue';
    if (weekNumber === currentWeek) return 'current';
    return 'pending';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Haftalık Kilo Girişi</h3>
        <Badge variant="outline" className="bg-blue-50 text-blue-700">
          Aktif Hafta: {currentWeek}
        </Badge>
      </div>

      <Accordion type="single" collapsible defaultValue={`week-${currentWeek}`} className="space-y-3">
        {weeklyData.map((week) => {
          const status = getWeekStatus(week.week, week.actualWeight);
          const isEditable = week.week <= currentWeek;
          
          return (
            <AccordionItem 
              key={week.week} 
              value={`week-${week.week}`}
              className="border rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline">
                <WeekInputCard
                  week={week}
                  status={status}
                  actualWeight={actualWeights[week.week] || ''}
                  onWeightUpdate={onWeightUpdate}
                  onWeightSave={onWeightSave}
                  startDate={startDate}
                  isEditable={isEditable}
                  isExpanded={false}
                />
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <WeekInputCard
                  week={week}
                  status={status}
                  actualWeight={actualWeights[week.week] || ''}
                  onWeightUpdate={onWeightUpdate}
                  onWeightSave={onWeightSave}
                  startDate={startDate}
                  isEditable={isEditable}
                  isExpanded={true}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
