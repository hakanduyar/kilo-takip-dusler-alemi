
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Target } from 'lucide-react';
import { WeekData } from '@/types/weekly-plan';

interface WeeklyChangeChartProps {
  weeklyData: WeekData[];
}

export const WeeklyChangeChart = ({ weeklyData }: WeeklyChangeChartProps) => {
  const chartData = weeklyData
    .filter(week => week.actualWeight !== null)
    .map(week => ({
      week: `H${week.week}`,
      hedefDegisim: week.targetChange,
      gercekDegisim: week.actualChange,
      fark: week.actualChange - week.targetChange,
      weekNumber: week.week
    }));

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <span>Haftalık Değişim Analizi</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-gray-500">
            <div className="text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>Henüz kilo girişi yapılmamış</p>
              <p className="text-sm mt-2">Haftalık değişimleri görmek için kilo girişi yapın</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

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
      const performanceText = Math.abs(data.fark) <= 0.3 ? 'Mükemmel!' : 
                            data.fark > 0 ? 'Hedefin üzerinde' : 'Hedefin altında';
      const performanceColor = Math.abs(data.fark) <= 0.3 ? 'text-green-600' : 
                             data.fark > 0 ? 'text-blue-600' : 'text-red-600';
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-xl">
          <p className="font-semibold text-gray-900 mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-sm flex items-center justify-between">
              <span className="text-blue-600">Hedef:</span>
              <span className="font-medium">{data.hedefDegisim > 0 ? '+' : ''}{data.hedefDegisim} kg</span>
            </p>
            <p className="text-sm flex items-center justify-between">
              <span className="text-green-600">Gerçek:</span>
              <span className="font-medium">{data.gercekDegisim > 0 ? '+' : ''}{data.gercekDegisim} kg</span>
            </p>
            <hr className="my-2" />
            <p className="text-sm flex items-center justify-between">
              <span className="text-gray-600">Fark:</span>
              <span className={`font-medium ${performanceColor}`}>
                {data.fark > 0 ? '+' : ''}{data.fark.toFixed(1)} kg
              </span>
            </p>
            <p className={`text-xs font-medium ${performanceColor}`}>
              {performanceText}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-purple-600" />
          <span>Haftalık Değişim Analizi</span>
        </CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Hedef ve gerçek kilo değişimlerinizin karşılaştırması
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="week" 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#6B7280"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                label={{ value: 'Değişim (kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Hedef çizgisi */}
              <Line 
                type="monotone" 
                dataKey="hedefDegisim" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Hedef Değişim"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                strokeDasharray="5 5"
              />
              
              {/* Gerçek değişim barları */}
              <Bar 
                dataKey="gercekDegisim" 
                name="Gerçek Değişim"
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={getBarColor(entry.gercekDegisim, entry.hedefDegisim)} 
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        
        {/* Renk açıklaması */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>Hedefte (±0.3kg)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span>Başarılı</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>Hedeften uzak</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
