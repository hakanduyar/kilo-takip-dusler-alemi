
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
      <Card className="bg-white/90 backdrop-blur-sm border border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700 font-bold">Toplam Hedef</p>
              <p className="text-xl font-black text-blue-800">
                {totalTarget.toFixed(1)} kg {targetWeight < currentWeight ? 'kayıp' : 'artış'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border border-indigo-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-md">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-indigo-700 font-bold">Haftalık Ortalama</p>
              <p className="text-xl font-black text-indigo-800">{weeklyAverage.toFixed(1)} kg</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-md">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-700 font-bold">Kalan Süre</p>
              <p className="text-xl font-black text-purple-800">{remainingWeeks} hafta</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border border-teal-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-md">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-teal-700 font-bold">İlerleme</p>
              <p className="text-xl font-black text-teal-800">%{Math.round(progress)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
