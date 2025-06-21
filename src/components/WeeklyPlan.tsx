
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
    <div className="space-y-6 sm:space-y-8">
      <WeeklyPlanStats
        totalTarget={stats.totalTarget}
        weeklyAverage={stats.weeklyAverage}
        remainingWeeks={stats.remainingWeeks}
        progress={stats.progress}
        targetWeight={targetWeight}
        currentWeight={currentWeight}
      />

      <Tabs defaultValue="input" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-blue-100 p-1 rounded-xl h-auto">
          <TabsTrigger 
            value="input" 
            className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg transition-all duration-200 py-2 sm:py-3 text-xs sm:text-sm"
          >
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Haftalık Takip</span>
            <span className="sm:hidden">Takip</span>
          </TabsTrigger>
          <TabsTrigger 
            value="charts" 
            className="flex items-center gap-1 sm:gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-lg transition-all duration-200 py-2 sm:py-3 text-xs sm:text-sm"
          >
            <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Grafikler</span>
            <span className="sm:hidden">Grafik</span>
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
          
          <div className="mt-4 sm:mt-6 flex justify-end">
            <Button 
              onClick={saveProgress}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-4 sm:px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
            >
              <span className="hidden sm:inline">İlerlemeyi Kaydet</span>
              <span className="sm:hidden">Kaydet</span>
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
