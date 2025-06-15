
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

  // Local storage key for weekly progress
  const getStorageKey = () => `kiloTakipWeeklyData_${currentWeight}_${targetWeight}_${programWeeks}`;

  useEffect(() => {
    // Load saved weekly data from localStorage
    const savedData = localStorage.getItem(getStorageKey());
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setWeeklyData(parsed.weeklyData || []);
        console.log('Haftalık veriler yüklendi:', parsed.weeklyData);
      } catch (error) {
        console.error('Haftalık veri yükleme hatası:', error);
      }
    }
    
    // If no saved data or data is empty, calculate fresh weekly plan
    if (!savedData) {
      const weeks = calculateWeeklyPlan(currentWeight, targetWeight, programWeeks);
      setWeeklyData(weeks);
      console.log('Yeni haftalık plan hesaplandı:', weeks);
    }
  }, [currentWeight, targetWeight, programWeeks]);

  // Save weekly data to localStorage whenever it changes
  useEffect(() => {
    if (weeklyData.length > 0) {
      const dataToSave = {
        weeklyData,
        lastUpdated: new Date().toISOString(),
        programInfo: { currentWeight, targetWeight, programWeeks, startDate }
      };
      localStorage.setItem(getStorageKey(), JSON.stringify(dataToSave));
      console.log('Haftalık veriler kaydedildi:', dataToSave);
    }
  }, [weeklyData]);

  const updateActualWeight = (week: number, weight: string) => {
    setActualWeights(prev => ({ ...prev, [week]: weight }));
    console.log(`Hafta ${week} için kilo güncellendi:`, weight);
  };

  const saveWeightEntry = (week: number) => {
    const weight = actualWeights[week];
    if (!weight) {
      console.log('Kilo değeri boş, kaydetme işlemi iptal edildi');
      return;
    }

    const weightValue = parseFloat(weight);
    if (!isNaN(weightValue)) {
      console.log(`Hafta ${week} için kilo kaydediliyor:`, weightValue);
      
      setWeeklyData(prev => {
        const newData = prev.map(data => {
          if (data.week === week) {
            const actualChange = week === 1 
              ? weightValue - currentWeight 
              : weightValue - (prev.find(w => w.week === week - 1)?.actualWeight || currentWeight);
            
            const status = calculateWeekStatus(weightValue, data.targetWeight, currentWeight, targetWeight);
            
            const updatedData = {
              ...data,
              actualWeight: weightValue,
              actualChange: parseFloat(actualChange.toFixed(1)),
              status
            };
            
            console.log(`Hafta ${week} verisi güncellendi:`, updatedData);
            return updatedData;
          }
          return data;
        });
        
        return newData;
      });

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
      
      console.log(`Hafta ${week} kilo girişi tamamlandı ve localStorage'a kaydedildi`);
    } else {
      console.error('Geçersiz kilo değeri:', weight);
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
    
    console.log('Genel ilerleme kaydedildi');
  };

  return {
    weeklyData,
    actualWeights,
    updateActualWeight,
    saveWeightEntry,
    saveProgress
  };
};
