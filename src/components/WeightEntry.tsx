
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PROGRAM_WEEKS = [
  { value: 1, label: '1 hafta' },
  { value: 2, label: '2 hafta' },
  { value: 4, label: '4 hafta' },
  { value: 6, label: '6 hafta' },
  { value: 8, label: '8 hafta' },
  { value: 10, label: '10 hafta' },
  { value: 12, label: '12 hafta' },
  { value: 16, label: '16 hafta' },
  { value: 20, label: '20 hafta' },
  { value: 24, label: '24 hafta' },
  { value: 26, label: '26 hafta' },
  { value: 30, label: '30 hafta' },
  { value: 36, label: '36 hafta' },
  { value: 40, label: '40 hafta' },
  { value: 44, label: '44 hafta' },
  { value: 48, label: '48 hafta' },
  { value: 52, label: '52 hafta' }
];

interface WeightEntryProps {
  onComplete: (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => void;
}

export const WeightEntry = ({ onComplete }: WeightEntryProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [programWeeks, setProgramWeeks] = useState('');
  const { toast } = useToast();

  const validateCurrentWeight = () => {
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

  const validateTargetWeight = () => {
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

  const validateProgram = () => {
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

  const handleNext = () => {
    if (currentStep === 1 && !validateCurrentWeight()) return;
    if (currentStep === 2 && !validateTargetWeight()) return;
    if (currentStep === 3 && !validateProgram()) return;
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the entry
      onComplete({
        currentWeight: parseFloat(currentWeight),
        targetWeight: parseFloat(targetWeight),
        programWeeks: parseInt(programWeeks)
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getProgressValue = () => {
    return (currentStep / 3) * 100;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Mevcut Kilonuz
              </h3>
              <p className="text-gray-600">
                Şu anki kilonuzu girin (kg)
              </p>
            </div>
            <div className="max-w-xs mx-auto">
              <Input
                type="number"
                placeholder="Örn: 75"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="text-center text-lg"
                min="30"
                max="300"
                step="0.1"
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Hedef Kilonuz
              </h3>
              <p className="text-gray-600">
                Ulaşmak istediğiniz kiloyu girin (kg)
              </p>
            </div>
            <div className="max-w-xs mx-auto">
              <Input
                type="number"
                placeholder="Örn: 70"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                className="text-center text-lg"
                min="30"
                max="300"
                step="0.1"
              />
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Program Süresi
              </h3>
              <p className="text-gray-600">
                Hedefinize ulaşmak için ne kadar süre ayırmak istiyorsunuz?
              </p>
            </div>
            <div className="max-w-xs mx-auto">
              <Select value={programWeeks} onValueChange={setProgramWeeks}>
                <SelectTrigger className="text-center">
                  <SelectValue placeholder="Süre seçin" />
                </SelectTrigger>
                <SelectContent>
                  {PROGRAM_WEEKS.map((week) => (
                    <SelectItem key={week.value} value={week.value.toString()}>
                      {week.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {currentWeight && targetWeight && programWeeks && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2 text-center">Program Özeti</h4>
                <div className="space-y-1 text-sm text-blue-800">
                  <div className="flex justify-between">
                    <span>Mevcut Kilo:</span>
                    <span className="font-medium">{currentWeight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hedef Kilo:</span>
                    <span className="font-medium">{targetWeight} kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hedef Değişim:</span>
                    <span className="font-medium">
                      {Math.abs(parseFloat(targetWeight) - parseFloat(currentWeight)).toFixed(1)} kg
                      {parseFloat(targetWeight) > parseFloat(currentWeight) ? ' artış' : ' azalış'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Program Süresi:</span>
                    <span className="font-medium">{programWeeks} hafta</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Haftalık Hedef:</span>
                    <span className="font-medium">
                      {(Math.abs(parseFloat(targetWeight) - parseFloat(currentWeight)) / parseInt(programWeeks)).toFixed(2)} kg/hafta
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return currentWeight.trim() !== '';
      case 2:
        return targetWeight.trim() !== '';
      case 3:
        return programWeeks !== '';
      default:
        return false;
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center space-x-2">
          <Target className="h-6 w-6 text-blue-600" />
          <span>Kilo Hedefi Belirleme</span>
        </CardTitle>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Adım {currentStep}/3</span>
            <span>%{Math.round(getProgressValue())}</span>
          </div>
          <Progress value={getProgressValue()} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {renderStep()}
        
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Geri</span>
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <span>{currentStep === 3 ? 'Programı Başlat' : 'İleri'}</span>
            {currentStep < 3 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
