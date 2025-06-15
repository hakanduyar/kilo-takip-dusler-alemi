
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, Scale } from 'lucide-react';

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
      <Card className="bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 border-2 border-blue-200/60 hover:border-blue-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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

      <Card className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200/60 hover:border-indigo-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-indigo-800">
            Mevcut Kilo
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-indigo-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
            {latestWeight ? `${latestWeight} kg` : `${currentWeight} kg`}
          </div>
          <p className="text-xs text-indigo-600 mt-1 font-medium">
            {latestWeight ? 'Son girilen kilo' : 'Henüz girilen kilo yok'}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 border-2 border-purple-200/60 hover:border-purple-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">
            Hedef Kilo
          </CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">{targetWeight} kg</div>
          <p className="text-xs text-purple-600 mt-1 font-medium">
            {programWeeks} haftalık program
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 via-emerald-50 to-yellow-100 border-2 border-green-200/60 hover:border-green-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            İlerleme
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">{Math.round(progress)}%</div>
          <p className="text-xs text-green-600 mt-1 font-medium">
            Haftalık hedef: {weeklyTarget.toFixed(1)} kg
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
