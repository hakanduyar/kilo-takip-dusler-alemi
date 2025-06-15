
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
      <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 border-2 border-blue-200/60 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-blue-700 font-semibold">Toplam Hedef</p>
              <p className="text-lg font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                {totalTarget.toFixed(1)} kg {targetWeight < currentWeight ? 'kayıp' : 'artış'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100 border-2 border-purple-200/60 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingDown className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-purple-700 font-semibold">Haftalık Ortalama</p>
              <p className="text-lg font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">{weeklyAverage.toFixed(1)} kg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 border-2 border-green-200/60 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-green-700 font-semibold">Kalan Süre</p>
              <p className="text-lg font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">{remainingWeeks} hafta</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 border-2 border-orange-200/60 hover:shadow-lg transition-all duration-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-orange-700 font-semibold">İlerleme</p>
              <p className="text-lg font-bold bg-gradient-to-r from-orange-700 to-yellow-600 bg-clip-text text-transparent">%{Math.round(progress)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
