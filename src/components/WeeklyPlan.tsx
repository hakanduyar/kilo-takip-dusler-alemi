import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { WeeklyPlanStats } from '@/components/weekly-plan/WeeklyPlanStats';

interface WeeklyPlanProps {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

interface WeekData {
  week: number;
  targetWeight: number;
  targetChange: number;
  actualWeight: number | null;
  actualChange: number | null;
  status: 'ahead' | 'on-track' | 'behind' | 'pending';
}

export const WeeklyPlan = ({ currentWeight, targetWeight, programWeeks, startDate }: WeeklyPlanProps) => {
  const [weeklyData, setWeeklyData] = useState<WeekData[]>([]);
  const [actualWeights, setActualWeights] = useState<{ [week: number]: string }>({});
  const { toast } = useToast();

  useEffect(() => {
    calculateWeeklyPlan();
  }, [currentWeight, targetWeight, programWeeks]);

  const calculateWeeklyPlan = () => {
    const totalChange = targetWeight - currentWeight;
    const weeklyTarget = totalChange / programWeeks;
    
    const weeks: WeekData[] = [];
    
    for (let week = 1; week <= programWeeks; week++) {
      const targetWeightForWeek = currentWeight + (weeklyTarget * week);
      const targetChangeForWeek = weeklyTarget;
      
      weeks.push({
        week,
        targetWeight: parseFloat(targetWeightForWeek.toFixed(1)),
        targetChange: parseFloat(targetChangeForWeek.toFixed(1)),
        actualWeight: null,
        actualChange: null,
        status: 'pending'
      });
    }
    
    setWeeklyData(weeks);
  };

  const updateActualWeight = (week: number, weight: string) => {
    setActualWeights(prev => ({ ...prev, [week]: weight }));
    
    const weightValue = parseFloat(weight);
    if (!isNaN(weightValue)) {
      setWeeklyData(prev => prev.map(data => {
        if (data.week === week) {
          const actualChange = week === 1 
            ? weightValue - currentWeight 
            : weightValue - (prev.find(w => w.week === week - 1)?.actualWeight || currentWeight);
          
          let status: 'ahead' | 'on-track' | 'behind' = 'on-track';
          const tolerance = 0.5;
          
          if (targetWeight < currentWeight) {
            if (weightValue < data.targetWeight - tolerance) status = 'ahead';
            else if (weightValue > data.targetWeight + tolerance) status = 'behind';
          } else {
            if (weightValue > data.targetWeight + tolerance) status = 'ahead';
            else if (weightValue < data.targetWeight - tolerance) status = 'behind';
          }
          
          return {
            ...data,
            actualWeight: weightValue,
            actualChange: parseFloat(actualChange.toFixed(1)),
            status
          };
        }
        return data;
      }));
    }
  };

  const saveProgress = () => {
    const progressData = weeklyData.filter(week => week.actualWeight !== null);
    localStorage.setItem('kiloTakipProgress', JSON.stringify({
      programData: { currentWeight, targetWeight, programWeeks, startDate },
      weeklyProgress: progressData,
      lastUpdated: new Date().toISOString()
    }));
    
    toast({
      title: "İlerleme Kaydedildi! 💾",
      description: "Haftalık ilerlemeniz başarıyla kaydedildi.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ahead':
        return <Badge variant="default" className="bg-green-500 text-white">Hedefin Önünde</Badge>;
      case 'on-track':
        return <Badge variant="secondary" className="bg-blue-500 text-white">Hedefte</Badge>;
      case 'behind':
        return <Badge variant="destructive">Hedefin Gerisinde</Badge>;
      default:
        return <Badge variant="outline">Bekliyor</Badge>;
    }
  };

  const getWeekDate = (weekNumber: number) => {
    const start = new Date(startDate);
    const weekDate = new Date(start.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);
    return weekDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  };

  const calculateStats = () => {
    const totalTarget = Math.abs(targetWeight - currentWeight);
    const weeklyAverage = totalTarget / programWeeks;
    const completedWeeks = weeklyData.filter(w => w.actualWeight !== null).length;
    const remainingWeeks = programWeeks - completedWeeks;
    const progress = (completedWeeks / programWeeks) * 100;
    
    return { totalTarget, weeklyAverage, remainingWeeks, progress };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <WeeklyPlanStats
        totalTarget={stats.totalTarget}
        weeklyAverage={stats.weeklyAverage}
        remainingWeeks={stats.remainingWeeks}
        progress={stats.progress}
        targetWeight={targetWeight}
        currentWeight={currentWeight}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-blue-600" />
            <span>Haftalık Plan ve Takip</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Hafta</TableHead>
                  <TableHead className="font-semibold">Tarih</TableHead>
                  <TableHead className="font-semibold">Hedef Kilo</TableHead>
                  <TableHead className="font-semibold">Hedef Değişim</TableHead>
                  <TableHead className="font-semibold">Gerçek Kilo</TableHead>
                  <TableHead className="font-semibold">Gerçek Değişim</TableHead>
                  <TableHead className="font-semibold">Durum</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyData.map((week, index) => (
                  <TableRow key={week.week} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <TableCell className="font-medium">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {week.week}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {getWeekDate(week.week)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {week.targetWeight} kg
                    </TableCell>
                    <TableCell className={week.targetChange < 0 ? 'text-green-600' : 'text-blue-600'}>
                      {week.targetChange > 0 ? '+' : ''}{week.targetChange} kg
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        placeholder="Kilo girin"
                        value={actualWeights[week.week] || ''}
                        onChange={(e) => updateActualWeight(week.week, e.target.value)}
                        className="w-24 h-8 text-sm"
                        step="0.1"
                        min="30"
                        max="300"
                      />
                    </TableCell>
                    <TableCell>
                      {week.actualChange !== null && (
                        <span className={week.actualChange < 0 ? 'text-green-600 font-medium' : 'text-blue-600 font-medium'}>
                          {week.actualChange > 0 ? '+' : ''}{week.actualChange} kg
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(week.status)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={saveProgress}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              İlerlemeyi Kaydet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
