
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
      <Card className="bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-100 border-2 border-amber-200/60 hover:border-amber-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-amber-800">
            Başlangıç Kilosu
          </CardTitle>
          <Scale className="h-4 w-4 text-amber-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">{currentWeight} kg</div>
          <p className="text-xs text-amber-600 mt-1 font-medium">
            Program başlangıcı
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-100 border-2 border-teal-200/60 hover:border-teal-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-teal-800">
            Mevcut Kilo
          </CardTitle>
          <Activity className="h-4 w-4 text-teal-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-teal-700 to-cyan-700 bg-clip-text text-transparent">
            {latestWeight ? `${latestWeight} kg` : `${currentWeight} kg`}
          </div>
          <p className="text-xs text-teal-600 mt-1 font-medium">
            {latestWeight ? 'Son girilen kilo' : 'Henüz girilen kilo yok'}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 border-2 border-blue-200/60 hover:border-blue-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            Hedef Kilo
          </CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-sky-700 bg-clip-text text-transparent">{targetWeight} kg</div>
          <p className="text-xs text-blue-600 mt-1 font-medium">
            {programWeeks} haftalık program
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 border-2 border-emerald-200/60 hover:border-emerald-300/80 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-800">
            İlerleme
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-green-700 bg-clip-text text-transparent">{Math.round(progress)}%</div>
          <p className="text-xs text-emerald-600 mt-1 font-medium">
            Haftalık hedef: {weeklyTarget.toFixed(1)} kg
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
