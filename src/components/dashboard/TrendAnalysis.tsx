
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { WeekData } from '@/types/weekly-plan';
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from 'lucide-react';

interface TrendAnalysisProps {
  weeklyData: WeekData[];
  currentWeight: number;
  targetWeight: number;
}

export const TrendAnalysis = ({ weeklyData, currentWeight, targetWeight }: TrendAnalysisProps) => {
  const recentWeeks = weeklyData
    .filter(w => w.actualWeight !== null)
    .slice(-4)
    .map(week => ({
      week: week.week,
      weight: week.actualWeight,
      change: week.actualChange
    }));

  const getTrend = () => {
    if (recentWeeks.length < 2) return 'insufficient';
    
    const firstWeight = recentWeeks[0].weight;
    const lastWeight = recentWeeks[recentWeeks.length - 1].weight;
    const totalChange = lastWeight! - firstWeight!;
    const expectedDirection = targetWeight < currentWeight ? -1 : 1;
    
    if (Math.abs(totalChange) < 0.5) return 'stable';
    
    const actualDirection = totalChange > 0 ? 1 : -1;
    return actualDirection === expectedDirection ? 'improving' : 'declining';
  };

  const trend = getTrend();
  
  const getTrendIcon = () => {
    switch (trend) {
      case 'improving': return TrendingUp;
      case 'declining': return TrendingDown;
      case 'stable': return Minus;
      default: return AlertTriangle;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'improving': return 'text-green-600';
      case 'declining': return 'text-red-600';
      case 'stable': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getTrendMessage = () => {
    switch (trend) {
      case 'improving': return 'Harika! Trend pozitif yönde 📈';
      case 'declining': return 'Dikkat! Trend olumsuz yönde 📉';
      case 'stable': return 'Kilo değişimi durgun ➡️';
      default: return 'Trend analizi için daha fazla veri gerekli 📊';
    }
  };

  const getTrendBadgeVariant = () => {
    switch (trend) {
      case 'improving': return 'default';
      case 'declining': return 'destructive';
      default: return 'secondary';
    }
  };

  const averageWeeklyChange = recentWeeks.length > 0 
    ? recentWeeks.reduce((sum, week) => sum + Math.abs(week.change || 0), 0) / recentWeeks.length
    : 0;

  const expectedWeeklyChange = Math.abs(targetWeight - currentWeight) / weeklyData.length;
  const changeRatio = averageWeeklyChange / expectedWeeklyChange;

  const getRecommendation = () => {
    if (trend === 'insufficient') return 'Daha fazla veri girişi yapın';
    if (changeRatio > 1.5) return 'Değişim hızı çok yüksek, daha yavaş ilerleyin';
    if (changeRatio < 0.5) return 'Değişim hızını artırmanız gerekebilir';
    if (trend === 'declining') return 'Hedeften sapmaya başladınız, stratejinizi gözden geçirin';
    return 'İyi gidiyorsunuz, mevcut tempoyu koruyun';
  };

  const TrendIcon = getTrendIcon();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendIcon className={`h-6 w-6 ${getTrendColor()}`} />
            <span>Son 4 Hafta Trend Analizi</span>
          </div>
          <Badge variant={getTrendBadgeVariant()}>
            {trend === 'improving' && 'Pozitif'}
            {trend === 'declining' && 'Negatif'}
            {trend === 'stable' && 'Stabil'}
            {trend === 'insufficient' && 'Yetersiz Veri'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentWeeks.length >= 2 && (
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={recentWeeks}>
                  <XAxis 
                    dataKey="week" 
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis 
                    domain={['dataMin - 1', 'dataMax + 1']}
                    axisLine={false}
                    tickLine={false}
                    fontSize={12}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke={trend === 'improving' ? '#10B981' : trend === 'declining' ? '#EF4444' : '#F59E0B'}
                    strokeWidth={3}
                    dot={{ fill: trend === 'improving' ? '#10B981' : trend === 'declining' ? '#EF4444' : '#F59E0B', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Trend Durumu</h4>
              <p className="text-sm text-gray-600">{getTrendMessage()}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Haftalık Ortalama</h4>
              <p className="text-2xl font-bold text-blue-900">{averageWeeklyChange.toFixed(1)} kg</p>
              <p className="text-xs text-blue-600">Son 4 hafta ortalaması</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-900 mb-2 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Öneri</span>
            </h4>
            <p className="text-sm text-purple-700">{getRecommendation()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
