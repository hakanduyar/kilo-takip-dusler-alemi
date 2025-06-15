
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { WeekData } from '@/types/weekly-plan';
import { WeekInputCard } from './WeekInputCard';
import { Calendar } from 'lucide-react';

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
    <Card className="bg-gradient-to-br from-white/90 to-blue-50/50 border-2 border-blue-200/60 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Haftalık Kilo Takibi</span>
          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border-blue-300/50">
            Aktif Hafta: {currentWeek}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
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
