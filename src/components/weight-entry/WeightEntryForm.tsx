
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface WeightEntryFormProps {
  currentStep: number;
  currentWeight: string;
  targetWeight: string;
  programWeeks: string;
  onCurrentWeightChange: (value: string) => void;
  onTargetWeightChange: (value: string) => void;
  onProgramWeeksChange: (value: string) => void;
}

export const WeightEntryForm = ({
  currentStep,
  currentWeight,
  targetWeight,
  programWeeks,
  onCurrentWeightChange,
  onTargetWeightChange,
  onProgramWeeksChange
}: WeightEntryFormProps) => {
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
                onChange={(e) => onCurrentWeightChange(e.target.value)}
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
                onChange={(e) => onTargetWeightChange(e.target.value)}
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
              <Select value={programWeeks} onValueChange={onProgramWeeksChange}>
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

  return <>{renderStep()}</>;
};
