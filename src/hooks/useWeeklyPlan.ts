
import { useState, useEffect } from 'react';
import { WeekData } from '@/types/weekly-plan';
import { calculateWeeklyPlan, calculateWeekStatus } from '@/utils/weeklyPlanUtils';
import { useToast } from '@/hooks/use-toast';

interface UseWeeklyPlanProps {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

export const useWeeklyPlan = ({
  currentWeight,
  targetWeight,
  programWeeks,
  startDate
}: UseWeeklyPlanProps) => {
  const [weeklyData, setWeeklyData] = useState<WeekData[]>([]);
  const [actualWeights, setActualWeights] = useState<{ [week: number]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    const weeks = calculateWeeklyPlan(currentWeight, targetWeight, programWeeks);
    setWeeklyData(weeks);
  }, [currentWeight, targetWeight, programWeeks]);

  const updateActualWeight = (week: number, weight: string) => {
    setActualWeights(prev => ({ ...prev, [week]: weight }));
  };

  const saveWeightEntry = (week: number) => {
    const weight = actualWeights[week];
    if (!weight) return;

    const weightValue = parseFloat(weight);
    if (!isNaN(weightValue)) {
      setWeeklyData(prev => prev.map(data => {
        if (data.week === week) {
          const actualChange = week === 1 
            ? weightValue - currentWeight 
            : weightValue - (prev.find(w => w.week === week - 1)?.actualWeight || currentWeight);
          
          const status = calculateWeekStatus(weightValue, data.targetWeight, currentWeight, targetWeight);
          
          return {
            ...data,
            actualWeight: weightValue,
            actualChange: parseFloat(actualChange.toFixed(1)),
            status
          };
        }
        return data;
      }));

      // Clear the input after saving
      setActualWeights(prev => {
        const newWeights = { ...prev };
        delete newWeights[week];
        return newWeights;
      });

      toast({
        title: "Kilo Kaydedildi! 📊",
        description: `Hafta ${week} kilo girişiniz başarıyla kaydedildi.`,
      });
    }
  };

  const saveProgress = () => {
    const progressData = weeklyData.filter(week => week.actualWeight !== null);
    localStorage.setItem('kiloTakipProgress', JSON.stringify({
      programData: { currentWeight, targetWeight, programWeeks, startDate },
      weeklyProgress: progressData,
      lastUpdated: new Date().toISOString()
    }));
    
    toast({
      title: "İlerleme Kaydedildi! 💾",
      description: "Haftalık ilerlemeniz başarıyla kaydedildi.",
    });
  };

  return {
    weeklyData,
    actualWeights,
    updateActualWeight,
    saveWeightEntry,
    saveProgress
  };
};
