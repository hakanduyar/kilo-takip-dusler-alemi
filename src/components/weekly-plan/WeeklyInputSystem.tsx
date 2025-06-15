
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeekData } from '@/types/weekly-plan';
import { WeekInputCard } from './WeekInputCard';
import { Calendar, Star } from 'lucide-react';

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
    <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">Haftalık Kilo Takibi</span>
          </div>
          <Badge className="bg-white text-blue-600 border-0 font-semibold px-3 py-1">
            <Star className="h-4 w-4 mr-1" />
            Hafta {currentWeek}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {weeklyData.map((week) => {
            const status = getWeekStatus(week.week, week.actualWeight);
            const isEditable = week.week <= currentWeek;
            
            return (
              <WeekInputCard
                key={week.week}
                week={week}
                status={status}
                actualWeight={actualWeights[week.week] || ''}
                onWeightUpdate={onWeightUpdate}
                onWeightSave={onWeightSave}
                startDate={startDate}
                isEditable={isEditable}
                isExpanded={true}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
