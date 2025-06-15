
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import { WeeklyPlanStats } from '@/components/weekly-plan/WeeklyPlanStats';
import { WeeklyPlanTable } from '@/components/weekly-plan/WeeklyPlanTable';
import { useWeeklyPlan } from '@/hooks/useWeeklyPlan';
import { calculateStats } from '@/utils/weeklyPlanUtils';

interface WeeklyPlanProps {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

export const WeeklyPlan = ({ currentWeight, targetWeight, programWeeks, startDate }: WeeklyPlanProps) => {
  const {
    weeklyData,
    actualWeights,
    updateActualWeight,
    saveProgress
  } = useWeeklyPlan({ currentWeight, targetWeight, programWeeks, startDate });

  const stats = calculateStats(weeklyData, currentWeight, targetWeight, programWeeks);

  return (
    <div className="space-y-6">
      <WeeklyPlanStats
        totalTarget={stats.totalTarget}
        weeklyAverage={stats.weeklyAverage}
        remainingWeeks={stats.remainingWeeks}
        progress={stats.progress}
        targetWeight={targetWeight}
        currentWeight={currentWeight}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-blue-600" />
            <span>Haftalık Plan ve Takip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <WeeklyPlanTable
            weeklyData={weeklyData}
            actualWeights={actualWeights}
            onWeightUpdate={updateActualWeight}
            startDate={startDate}
          />
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={saveProgress}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              İlerlemeyi Kaydet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
