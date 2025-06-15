
import { useState } from 'react';
import { WeeklyPlanChart } from './WeeklyPlanChart';
import { WeeklyChangeChart } from './WeeklyChangeChart';
import { ProgressCircle } from './ProgressCircle';
import { ChartControls } from './ChartControls';
import { WeekData } from '@/types/weekly-plan';
import { calculateStats } from '@/utils/weeklyPlanUtils';
import { useToast } from '@/hooks/use-toast';

interface ChartsSectionProps {
  weeklyData: WeekData[];
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
}

export const ChartsSection = ({
  weeklyData,
  currentWeight,
  targetWeight,
  programWeeks
}: ChartsSectionProps) => {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');
  const [timeRange, setTimeRange] = useState<'all' | 'last4' | 'last8'>('all');
  const { toast } = useToast();

  const stats = calculateStats(weeklyData, currentWeight, targetWeight, programWeeks);

  const getFilteredData = () => {
    if (timeRange === 'all') return weeklyData;
    const limit = timeRange === 'last4' ? 4 : 8;
    return weeklyData.slice(-limit);
  };

  const handleExport = () => {
    toast({
      title: "Export Fonksiyonu",
      description: "PNG export özelliği yakında eklenecek!",
    });
  };

  const filteredData = getFilteredData();

  return (
    <div className="space-y-6">
      <ChartControls
        chartType={chartType}
        onChartTypeChange={setChartType}
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
        onExport={handleExport}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <WeeklyPlanChart
          weeklyData={filteredData}
          currentWeight={currentWeight}
          chartType={chartType}
        />
        <ProgressCircle
          progress={stats.progress}
          currentWeight={currentWeight}
          targetWeight={targetWeight}
        />
      </div>

      <WeeklyChangeChart weeklyData={filteredData} />
    </div>
  );
};
