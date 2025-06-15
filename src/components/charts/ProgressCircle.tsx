
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

interface ProgressCircleProps {
  progress: number;
  currentWeight: number;
  targetWeight: number;
}

export const ProgressCircle = ({ progress, currentWeight, targetWeight }: ProgressCircleProps) => {
  const data = [
    { name: 'Tamamlanan', value: progress },
    { name: 'Kalan', value: 100 - progress }
  ];

  const COLORS = ['#10B981', '#E5E7EB'];

  const totalTarget = Math.abs(targetWeight - currentWeight);
  const completedAmount = (progress / 100) * totalTarget;
  const remainingAmount = totalTarget - completedAmount;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-6 w-6 text-green-600" />
          <span>Genel İlerleme</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(progress)}%
                </div>
                <div className="text-xs text-gray-500">Tamamlandı</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Tamamlanan:</span>
            <span className="text-sm font-medium text-green-600">
              {completedAmount.toFixed(1)} kg
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Kalan:</span>
            <span className="text-sm font-medium text-gray-900">
              {remainingAmount.toFixed(1)} kg
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t">
            <span className="text-sm font-medium text-gray-900">Toplam Hedef:</span>
            <span className="text-sm font-bold text-blue-600">
              {totalTarget.toFixed(1)} kg {targetWeight < currentWeight ? 'kayıp' : 'artış'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
