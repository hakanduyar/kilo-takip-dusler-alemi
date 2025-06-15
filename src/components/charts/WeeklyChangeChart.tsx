
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';
import { WeekData } from '@/types/weekly-plan';

interface WeeklyChangeChartProps {
  weeklyData: WeekData[];
}

export const WeeklyChangeChart = ({ weeklyData }: WeeklyChangeChartProps) => {
  const chartData = weeklyData
    .filter(week => week.actualWeight !== null)
    .map(week => ({
      week: `Hafta ${week.week}`,
      hedefDegisim: week.targetChange,
      gercekDegisim: week.actualChange,
      weekNumber: week.week
    }));

  const getBarColor = (actualChange: number, targetChange: number) => {
    if (actualChange === null) return '#6B7280';
    
    const tolerance = 0.3;
    if (Math.abs(actualChange - targetChange) <= tolerance) return '#10B981'; // Yeşil - hedefte
    if (targetChange < 0) {
      // Kilo verme hedefi
      return actualChange < targetChange ? '#3B82F6' : '#EF4444'; // Mavi - başarılı, Kırmızı - başarısız
    } else {
      // Kilo alma hedefi
      return actualChange > targetChange ? '#3B82F6' : '#EF4444';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Hedef: {data.hedefDegisim > 0 ? '+' : ''}{data.hedefDegisim} kg
          </p>
          <p className="text-sm text-green-600">
            Gerçek: {data.gercekDegisim > 0 ? '+' : ''}{data.gercekDegisim} kg
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Fark: {(data.gercekDegisim - data.hedefDegisim).toFixed(1)} kg
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="h-6 w-6 text-purple-600" />
          <span>Haftalık Değişim</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="week" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                label={{ value: 'Değişim (kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="gercekDegisim" radius={[4, 4, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.gercekDegisim, entry.hedefDegisim)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
