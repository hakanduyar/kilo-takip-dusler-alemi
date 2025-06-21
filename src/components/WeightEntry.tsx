
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, Target } from 'lucide-react';
import { WeightEntryForm } from '@/components/weight-entry/WeightEntryForm';
import { useWeightEntryValidation } from '@/components/weight-entry/WeightEntryValidation';

interface WeightEntryProps {
  onComplete: (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => void;
}

export const WeightEntry = ({ onComplete }: WeightEntryProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [programWeeks, setProgramWeeks] = useState('');
  
  const { validateCurrentWeight, validateTargetWeight, validateProgram } = useWeightEntryValidation();

  const handleNext = () => {
    if (currentStep === 1 && !validateCurrentWeight(currentWeight)) return;
    if (currentStep === 2 && !validateTargetWeight(currentWeight, targetWeight)) return;
    if (currentStep === 3 && !validateProgram(currentWeight, targetWeight, programWeeks)) return;
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
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
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      <Card className="w-full">
        <CardHeader className="text-center pb-4 sm:pb-6">
          <CardTitle className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 text-lg sm:text-xl">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
            <span className="text-center">Kilo Hedefi Belirleme</span>
          </CardTitle>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
              <span>Adım {currentStep}/3</span>
              <span>%{Math.round(getProgressValue())}</span>
            </div>
            <Progress value={getProgressValue()} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <WeightEntryForm
            currentStep={currentStep}
            currentWeight={currentWeight}
            targetWeight={targetWeight}
            programWeeks={programWeeks}
            onCurrentWeightChange={setCurrentWeight}
            onTargetWeightChange={setTargetWeight}
            onProgramWeeksChange={setProgramWeeks}
          />
          
          <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center justify-center space-x-2 h-11 sm:h-12 text-sm sm:text-base order-2 sm:order-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Geri</span>
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 sm:h-12 text-sm sm:text-base order-1 sm:order-2 flex-1 sm:flex-none"
            >
              <span className="text-center">
                {currentStep === 3 ? 'Programı Başlat' : 'İleri'}
              </span>
              {currentStep < 3 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
