
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';
import { WeekData } from '@/types/weekly-plan';

interface WeeklyPlanChartProps {
  weeklyData: WeekData[];
  currentWeight: number;
  chartType?: 'line' | 'bar' | 'area';
}

export const WeeklyPlanChart = ({ weeklyData, currentWeight, chartType = 'line' }: WeeklyPlanChartProps) => {
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

  const renderChart = () => {
    const commonProps = {
      data: dataWithStart,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };

    const commonElements = (
      <>
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
      </>
    );

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {commonElements}
            <Bar 
              dataKey="hedef" 
              fill="#3B82F6" 
              name="Hedef Kilo"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="gercek" 
              fill="#10B981" 
              name="Gerçek Kilo"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        );
      
      case 'area':
        return (
          <AreaChart {...commonProps}>
            {commonElements}
            <defs>
              <linearGradient id="colorHedef" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorGercek" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="hedef" 
              stroke="#3B82F6" 
              fillOpacity={1} 
              fill="url(#colorHedef)"
              name="Hedef Kilo"
            />
            <Area 
              type="monotone" 
              dataKey="gercek" 
              stroke="#10B981" 
              fillOpacity={1} 
              fill="url(#colorGercek)"
              name="Gerçek Kilo"
              connectNulls={false}
            />
          </AreaChart>
        );
      
      default:
        return (
          <LineChart {...commonProps}>
            {commonElements}
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
        );
    }
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
            {renderChart()}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
