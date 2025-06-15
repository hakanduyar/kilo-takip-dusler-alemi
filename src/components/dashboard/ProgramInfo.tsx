
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface WeightProgram {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

interface ProgramInfoProps {
  weightProgram: WeightProgram;
  onProgramReset: () => void;
}

export const ProgramInfo = ({ weightProgram, onProgramReset }: ProgramInfoProps) => {
  const { toast } = useToast();

  const handleProgramReset = () => {
    onProgramReset();
    localStorage.removeItem('kiloTakipProgram');
    localStorage.removeItem('kiloTakipProgress');
    toast({
      title: "Program Sıfırlandı",
      description: "Yeni bir program oluşturabilirsiniz.",
    });
  };

  const getWeeklyTarget = () => {
    return Math.abs(weightProgram.targetWeight - weightProgram.currentWeight) / weightProgram.programWeeks;
  };

  const getRemainingWeeks = () => {
    return Math.max(0, weightProgram.programWeeks - Math.floor((new Date().getTime() - new Date(weightProgram.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7)));
  };

  return (
    <Card className="mt-6 border-l-4 border-l-blue-500">
      <CardContent className="p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Program Bilgileriniz</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Başlangıç:</span>
            <div className="font-medium">{new Date(weightProgram.startDate).toLocaleDateString('tr-TR')}</div>
          </div>
          <div>
            <span className="text-gray-600">Hedef Değişim:</span>
            <div className="font-medium">
              {Math.abs(weightProgram.targetWeight - weightProgram.currentWeight).toFixed(1)} kg
              {weightProgram.targetWeight > weightProgram.currentWeight ? ' artış' : ' azalış'}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Kalan Süre:</span>
            <div className="font-medium">
              {getRemainingWeeks()} hafta
            </div>
          </div>
          <div>
            <span className="text-gray-600">Haftalık Hedef:</span>
            <div className="font-medium">{getWeeklyTarget().toFixed(2)} kg</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={handleProgramReset}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Programı Yeniden Başlat
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
