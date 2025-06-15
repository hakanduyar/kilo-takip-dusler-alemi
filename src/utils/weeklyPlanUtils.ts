
import { WeekData } from '@/types/weekly-plan';

export const calculateWeeklyPlan = (
  currentWeight: number,
  targetWeight: number,
  programWeeks: number
): WeekData[] => {
  const totalChange = targetWeight - currentWeight;
  const weeklyTarget = totalChange / programWeeks;
  
  const weeks: WeekData[] = [];
  
  for (let week = 1; week <= programWeeks; week++) {
    const targetWeightForWeek = currentWeight + (weeklyTarget * week);
    const targetChangeForWeek = weeklyTarget;
    
    weeks.push({
      week,
      targetWeight: parseFloat(targetWeightForWeek.toFixed(1)),
      targetChange: parseFloat(targetChangeForWeek.toFixed(1)),
      actualWeight: null,
      actualChange: null,
      status: 'pending'
    });
  }
  
  return weeks;
};

export const calculateWeekStatus = (
  actualWeight: number,
  targetWeight: number,
  currentWeight: number,
  targetWeightGoal: number
): 'ahead' | 'on-track' | 'behind' => {
  const tolerance = 0.5;
  
  if (targetWeightGoal < currentWeight) {
    // Weight loss goal
    if (actualWeight < targetWeight - tolerance) return 'ahead';
    else if (actualWeight > targetWeight + tolerance) return 'behind';
  } else {
    // Weight gain goal
    if (actualWeight > targetWeight + tolerance) return 'ahead';
    else if (actualWeight < targetWeight - tolerance) return 'behind';
  }
  
  return 'on-track';
};

export const calculateStats = (
  weeklyData: WeekData[],
  currentWeight: number,
  targetWeight: number,
  programWeeks: number
) => {
  const totalTarget = Math.abs(targetWeight - currentWeight);
  const weeklyAverage = totalTarget / programWeeks;
  const completedWeeks = weeklyData.filter(w => w.actualWeight !== null).length;
  const remainingWeeks = programWeeks - completedWeeks;
  const progress = (completedWeeks / programWeeks) * 100;
  
  return { totalTarget, weeklyAverage, remainingWeeks, progress };
};
