
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, Scale, Activity } from 'lucide-react';

interface StatsCardsProps {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  progress: number;
  weeklyTarget: number;
  latestWeight?: number;
}

export const StatsCards = ({ 
  currentWeight, 
  targetWeight, 
  programWeeks, 
  progress, 
  weeklyTarget,
  latestWeight
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
      <Card className="bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-teal-800">
            Başlangıç
          </CardTitle>
          <Scale className="h-3 w-3 sm:h-4 sm:w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-900 bg-clip-text text-transparent">
            {currentWeight} kg
          </div>
          <p className="text-xs text-teal-600 mt-1 font-medium hidden sm:block">
            Program başlangıcı
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-indigo-800">
            Mevcut
          </CardTitle>
          <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
            {latestWeight ? `${latestWeight} kg` : `${currentWeight} kg`}
          </div>
          <p className="text-xs text-indigo-600 mt-1 font-medium hidden sm:block">
            {latestWeight ? 'Son girilen' : 'Henüz yok'}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-purple-800">
            Hedef
          </CardTitle>
          <Target className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
            {targetWeight} kg
          </div>
          <p className="text-xs text-purple-600 mt-1 font-medium hidden sm:block">
            {programWeeks} hafta
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xs sm:text-sm font-medium text-green-800">
            İlerleme
          </CardTitle>
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
            {Math.round(progress)}%
          </div>
          <p className="text-xs text-green-600 mt-1 font-medium hidden sm:block">
            Haftalık: {weeklyTarget.toFixed(1)} kg
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
