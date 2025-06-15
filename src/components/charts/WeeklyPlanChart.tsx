
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { WeekData } from '@/types/weekly-plan';

interface WeeklyPlanChartProps {
  weeklyData: WeekData[];
  currentWeight: number;
}

export const WeeklyPlanChart = ({ weeklyData, currentWeight }: WeeklyPlanChartProps) => {
  const chartData = weeklyData.map((week, index) => ({
    week: `Hafta ${week.week}`,
    hedef: week.targetWeight,
    gercek: week.actualWeight,
    weekNumber: week.week
  }));

  // Add starting point
  const dataWithStart = [
    { week: 'Başlangıç', hedef: currentWeight, gercek: currentWeight, weekNumber: 0 },
    ...chartData
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === 'hedef' ? 'Hedef: ' : 'Gerçek: '}
              {entry.value ? `${entry.value} kg` : 'Henüz girilmedi'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-blue-600" />
          <span>Haftalık İlerleme Grafiği</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataWithStart} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                domain={['dataMin - 2', 'dataMax + 2']}
                label={{ value: 'Kilo (kg)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="hedef" 
                stroke="#3B82F6" 
                strokeWidth={3}
                name="Hedef Kilo"
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="gercek" 
                stroke="#10B981" 
                strokeWidth={3}
                name="Gerçek Kilo"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
