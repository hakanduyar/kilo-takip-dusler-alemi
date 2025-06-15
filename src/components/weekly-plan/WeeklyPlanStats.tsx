
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingDown, Calendar, TrendingUp } from 'lucide-react';

interface WeeklyPlanStatsProps {
  totalTarget: number;
  weeklyAverage: number;
  remainingWeeks: number;
  progress: number;
  targetWeight: number;
  currentWeight: number;
}

export const WeeklyPlanStats = ({
  totalTarget,
  weeklyAverage,
  remainingWeeks,
  progress,
  targetWeight,
  currentWeight
}: WeeklyPlanStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Toplam Hedef</p>
              <p className="text-lg font-bold text-blue-900">
                {totalTarget.toFixed(1)} kg {targetWeight < currentWeight ? 'kayıp' : 'artış'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Haftalık Ortalama</p>
              <p className="text-lg font-bold text-purple-900">{weeklyAverage.toFixed(1)} kg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">Kalan Süre</p>
              <p className="text-lg font-bold text-green-900">{remainingWeeks} hafta</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600 font-medium">İlerleme</p>
              <p className="text-lg font-bold text-orange-900">%{Math.round(progress)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
