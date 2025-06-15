
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WeekData } from '@/types/weekly-plan';
import { WeightValidator } from './WeightValidator';
import { MotivationMessage } from './MotivationMessage';
import { Calendar, Target, Save, AlertCircle } from 'lucide-react';

interface WeekInputCardProps {
  week: WeekData;
  status: 'completed' | 'current' | 'overdue' | 'pending';
  actualWeight: string;
  onWeightUpdate: (week: number, weight: string) => void;
  onWeightSave: (week: number) => void;
  startDate: string;
  isEditable: boolean;
  isExpanded: boolean;
}

export const WeekInputCard = ({
  week,
  status,
  actualWeight,
  onWeightUpdate,
  onWeightSave,
  startDate,
  isEditable,
  isExpanded
}: WeekInputCardProps) => {
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [validationType, setValidationType] = useState<'success' | 'warning' | 'error'>('success');

  const getWeekDateRange = () => {
    const start = new Date(startDate);
    const weekStart = new Date(start.getTime() + (week.week - 1) * 7 * 24 * 60 * 60 * 1000);
    const weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
    
    return {
      start: weekStart.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }),
      end: weekEnd.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })
    };
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500 text-white">Tamamlandı</Badge>;
      case 'current':
        return <Badge className="bg-blue-500 text-white">Aktif Hafta</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Gecikmiş</Badge>;
      case 'pending':
        return <Badge variant="outline">Bekliyor</Badge>;
    }
  };

  const handleWeightChange = (value: string) => {
    onWeightUpdate(week.week, value);
    
    // Validate weight input
    if (value) {
      const weight = parseFloat(value);
      const validation = WeightValidator.validateWeightInput(weight, week.targetWeight, week.week);
      setValidationMessage(validation.message);
      setValidationType(validation.type);
    } else {
      setValidationMessage('');
    }
  };

  const handleSave = () => {
    onWeightSave(week.week);
    setValidationMessage('');
  };

  const dateRange = getWeekDateRange();
  const hasUnsavedChanges = actualWeight && !week.actualWeight;

  if (!isExpanded) {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <div className="text-lg font-bold text-gray-900">Hafta {week.week}</div>
          <div className="text-sm text-gray-500">{dateRange.start} - {dateRange.end}</div>
          {getStatusBadge()}
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-gray-600">Hedef: {week.targetWeight} kg</div>
            {week.actualWeight && (
              <div className="text-sm font-medium text-green-600">
                Gerçek: {week.actualWeight} kg
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-sm text-gray-600">Hedef Kilo</div>
                <div className="text-2xl font-bold text-blue-900">{week.targetWeight} kg</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${week.targetChange < 0 ? 'bg-green-500' : 'bg-blue-500'}`} />
              <div>
                <div className="text-sm text-gray-600">Hedef Değişim</div>
                <div className={`text-lg font-semibold ${week.targetChange < 0 ? 'text-green-600' : 'text-blue-600'}`}>
                  {week.targetChange > 0 ? '+' : ''}{week.targetChange} kg
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Bu hafta kilonuz?
              </label>
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="Kilonuzu girin"
                  value={actualWeight}
                  onChange={(e) => handleWeightChange(e.target.value)}
                  disabled={!isEditable}
                  className="flex-1"
                  step="0.1"
                  min="30"
                  max="300"
                />
                {isEditable && hasUnsavedChanges && (
                  <Button onClick={handleSave} size="sm" className="flex items-center space-x-1">
                    <Save className="h-4 w-4" />
                    <span>Kaydet</span>
                  </Button>
                )}
              </div>
            </div>

            {validationMessage && (
              <div className={`flex items-center space-x-2 text-sm ${
                validationType === 'error' ? 'text-red-600' : 
                validationType === 'warning' ? 'text-yellow-600' : 
                'text-green-600'
              }`}>
                <AlertCircle className="h-4 w-4" />
                <span>{validationMessage}</span>
              </div>
            )}

            {week.actualWeight && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Gerçek Değişim</div>
                <div className={`text-lg font-semibold ${
                  week.actualChange && week.actualChange < 0 ? 'text-green-600' : 'text-blue-600'
                }`}>
                  {week.actualChange !== null ? 
                    `${week.actualChange > 0 ? '+' : ''}${week.actualChange} kg` : 
                    'Hesaplanıyor...'}
                </div>
              </div>
            )}
          </div>
        </div>

        {week.actualWeight && (
          <MotivationMessage week={week} />
        )}

        {!isEditable && status === 'pending' && (
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm text-blue-800">
              Bu hafta henüz başlamadı. Girişlerinizi hafta başladığında yapabilirsiniz.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
