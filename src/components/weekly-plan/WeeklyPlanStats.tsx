
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-orange-50 via-orange-100 to-yellow-50 border-2 border-orange-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-orange-700 font-bold">Toplam Hedef</p>
              <p className="text-xl font-black bg-gradient-to-r from-orange-700 to-yellow-600 bg-clip-text text-transparent">
                {totalTarget.toFixed(1)} kg {targetWeight < currentWeight ? 'kayıp' : 'artış'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-pink-50 border-2 border-purple-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-bold">Haftalık Ortalama</p>
              <p className="text-xl font-black bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">{weeklyAverage.toFixed(1)} kg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700 font-bold">Kalan Süre</p>
              <p className="text-xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">{remainingWeeks} hafta</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-2 border-blue-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl shadow-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-bold">İlerleme</p>
              <p className="text-xl font-black bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">%{Math.round(progress)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
