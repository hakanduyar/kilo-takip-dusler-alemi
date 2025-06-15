
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { WeekData } from '@/types/weekly-plan';
import { Trophy, Calendar, Target, TrendingUp, Award } from 'lucide-react';

interface DetailedStatsProps {
  weeklyData: WeekData[];
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

export const DetailedStats = ({
  weeklyData,
  currentWeight,
  targetWeight,
  programWeeks,
  startDate
}: DetailedStatsProps) => {
  const completedWeeks = weeklyData.filter(w => w.actualWeight !== null);
  const successfulWeeks = completedWeeks.filter(w => w.status === 'ahead' || w.status === 'on-track').length;
  
  const averageWeeklyChange = completedWeeks.length > 0 
    ? completedWeeks.reduce((sum, week) => sum + Math.abs(week.actualChange || 0), 0) / completedWeeks.length
    : 0;

  const bestWeek = completedWeeks.reduce((best, week) => {
    if (!best) return week;
    const currentTarget = Math.abs(week.actualChange || 0);
    const bestTarget = Math.abs(best.actualChange || 0);
    return currentTarget > bestTarget ? week : best;
  }, null as WeekData | null);

  const motivationScore = Math.min(100, Math.round((successfulWeeks / Math.max(1, completedWeeks.length)) * 100));
  
  const getMotivationMessage = (score: number) => {
    if (score >= 80) return "Mükemmel performans! 🔥";
    if (score >= 60) return "İyi gidiyorsun! 💪";
    if (score >= 40) return "Daha iyisini yapabilirsin! 📈";
    return "Yeniden odaklan! 🎯";
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    if (progress >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const progress = (completedWeeks.length / programWeeks) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-green-800">
            Genel İlerleme
          </CardTitle>
          <Trophy className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-green-900">
              {Math.round(progress)}%
            </div>
            <Progress 
              value={progress} 
              className={`h-2 ${getProgressColor(progress)}`}
            />
            <p className="text-xs text-green-600">
              {completedWeeks.length} / {programWeeks} hafta tamamlandı
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-blue-800">
            Bu Hafta
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-900">
              Hafta {Math.min(completedWeeks.length + 1, programWeeks)}
            </div>
            {weeklyData[completedWeeks.length] && (
              <>
                <p className="text-sm text-blue-700">
                  Hedef: {weeklyData[completedWeeks.length].targetWeight} kg
                </p>
                <Badge variant={weeklyData[completedWeeks.length].actualWeight ? "default" : "secondary"}>
                  {weeklyData[completedWeeks.length].actualWeight ? "Tamamlandı" : "Bekliyor"}
                </Badge>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-purple-800">
            İstatistikler
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-lg font-bold text-purple-900">
              {averageWeeklyChange.toFixed(1)} kg
            </div>
            <p className="text-xs text-purple-600">Ortalama haftalık değişim</p>
            <p className="text-xs text-purple-600">
              Başarılı haftalar: {successfulWeeks}/{completedWeeks.length}
            </p>
            {bestWeek && (
              <p className="text-xs text-purple-600">
                En iyi: Hafta {bestWeek.week} ({Math.abs(bestWeek.actualChange || 0).toFixed(1)} kg)
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-orange-800">
            Motivasyon Skoru
          </CardTitle>
          <Award className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-orange-900">
              {motivationScore}/100
            </div>
            <Progress value={motivationScore} className="h-2" />
            <p className="text-xs text-orange-600">
              {getMotivationMessage(motivationScore)}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
