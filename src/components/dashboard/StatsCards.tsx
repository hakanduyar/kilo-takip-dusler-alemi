
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  progress: number;
  weeklyTarget: number;
}

export const StatsCards = ({ 
  currentWeight, 
  targetWeight, 
  programWeeks, 
  progress, 
  weeklyTarget 
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            Mevcut Kilo
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-900">{currentWeight} kg</div>
          <p className="text-xs text-blue-600 mt-1">
            Başlangıç kilosu
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">
            Hedef Kilo
          </CardTitle>
          <Target className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-900">{targetWeight} kg</div>
          <p className="text-xs text-purple-600 mt-1">
            {programWeeks} haftalık program
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            İlerleme
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-900">{Math.round(progress)}%</div>
          <p className="text-xs text-green-600 mt-1">
            Haftalık hedef: {weeklyTarget.toFixed(1)} kg
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
