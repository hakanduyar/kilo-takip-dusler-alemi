
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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 border-2 border-blue-300/60 hover:border-blue-400/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            Başlangıç Kilosu
          </CardTitle>
          <Scale className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">{currentWeight} kg</div>
          <p className="text-xs text-blue-600 mt-1 font-medium">
            Program başlangıcı
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-indigo-50 via-indigo-100 to-indigo-200 border-2 border-indigo-300/60 hover:border-indigo-400/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-indigo-800">
            Mevcut Kilo
          </CardTitle>
          <Activity className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-indigo-900 bg-clip-text text-transparent">
            {latestWeight ? `${latestWeight} kg` : `${currentWeight} kg`}
          </div>
          <p className="text-xs text-indigo-600 mt-1 font-medium">
            {latestWeight ? 'Son girilen kilo' : 'Henüz girilen kilo yok'}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 border-2 border-purple-300/60 hover:border-purple-400/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">
            Hedef Kilo
          </CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">{targetWeight} kg</div>
          <p className="text-xs text-purple-600 mt-1 font-medium">
            {programWeeks} haftalık program
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-teal-50 via-teal-100 to-teal-200 border-2 border-teal-300/60 hover:border-teal-400/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-teal-800">
            İlerleme
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-teal-900 bg-clip-text text-transparent">{Math.round(progress)}%</div>
          <p className="text-xs text-teal-600 mt-1 font-medium">
            Haftalık hedef: {weeklyTarget.toFixed(1)} kg
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
