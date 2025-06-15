
import { useToast } from '@/hooks/use-toast';

export const useWeightEntryValidation = () => {
  const { toast } = useToast();

  const validateCurrentWeight = (currentWeight: string) => {
    const weight = parseFloat(currentWeight);
    if (isNaN(weight) || weight < 30 || weight > 300) {
      toast({
        title: "Geçersiz Kilo",
        description: "Mevcut kilo 30-300 kg arasında olmalıdır.",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateTargetWeight = (currentWeight: string, targetWeight: string) => {
    const current = parseFloat(currentWeight);
    const target = parseFloat(targetWeight);
    
    if (isNaN(target) || target < 30 || target > 300) {
      toast({
        title: "Geçersiz Hedef Kilo",
        description: "Hedef kilo 30-300 kg arasında olmalıdır.",
        variant: "destructive"
      });
      return false;
    }
    
    if (target === current) {
      toast({
        title: "Geçersiz Hedef",
        description: "Hedef kilo mevcut kilodan farklı olmalıdır.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const validateProgram = (currentWeight: string, targetWeight: string, programWeeks: string) => {
    const current = parseFloat(currentWeight);
    const target = parseFloat(targetWeight);
    const weeks = parseInt(programWeeks);
    
    const weightDifference = Math.abs(target - current);
    const maxWeightChangePerWeek = 1.5;
    const maxTotalChange = weeks * maxWeightChangePerWeek;
    
    if (weightDifference > maxTotalChange) {
      toast({
        title: "Gerçekçi Olmayan Hedef",
        description: `${weeks} haftada maksimum ${maxTotalChange.toFixed(1)} kg değişim önerilir. Daha uzun süre seçin veya hedefi revize edin.`,
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  return {
    validateCurrentWeight,
    validateTargetWeight,
    validateProgram
  };
};
