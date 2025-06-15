
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Calendar } from 'lucide-react';
import { WeeklyPlanStats } from '@/components/weekly-plan/WeeklyPlanStats';
import { WeeklyInputSystem } from '@/components/weekly-plan/WeeklyInputSystem';
import { ChartsSection } from '@/components/charts/ChartsSection';
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
    saveWeightEntry,
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

      <Tabs defaultValue="input" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="input" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Haftalık Takip
          </TabsTrigger>
          <TabsTrigger value="charts" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Grafikler
          </TabsTrigger>
        </TabsList>

        <TabsContent value="input">
          <WeeklyInputSystem
            weeklyData={weeklyData}
            actualWeights={actualWeights}
            onWeightUpdate={updateActualWeight}
            onWeightSave={saveWeightEntry}
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
        </TabsContent>

        <TabsContent value="charts">
          <ChartsSection
            weeklyData={weeklyData}
            currentWeight={currentWeight}
            targetWeight={targetWeight}
            programWeeks={programWeeks}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
