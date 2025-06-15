import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AnimatedCounter } from '@/components/ui/animated-counter';
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

  const progress = (completedWeeks.length / programWeeks) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-container">
      <GlassCard variant="strong" hover glow className="bg-gradient-to-br from-green-50/80 to-emerald-100/80 border-green-200/50">
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-green-800">
            Genel İlerleme
          </GlassCardTitle>
          <Trophy className="h-5 w-5 text-green-600 animate-bounce-gentle" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-4">
            <div className="text-3xl font-bold text-green-900">
              <AnimatedCounter value={Math.round(progress)} suffix="%" />
            </div>
            <div className="progress-enhanced">
              <div 
                className="progress-fill bg-gradient-to-r from-green-400 to-emerald-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-green-600 font-medium">
              <AnimatedCounter value={completedWeeks.length} /> / <AnimatedCounter value={programWeeks} /> hafta tamamlandı
            </p>
          </div>
        </GlassCardContent>
      </GlassCard>

      <GlassCard variant="strong" hover glow className="bg-gradient-to-br from-blue-50/80 to-blue-100/80 border-blue-200/50">
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-blue-800">
            Bu Hafta
          </GlassCardTitle>
          <Calendar className="h-5 w-5 text-blue-600 animate-pulse" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            <div className="text-2xl font-bold text-blue-900">
              Hafta <AnimatedCounter value={Math.min(completedWeeks.length + 1, programWeeks)} />
            </div>
            {weeklyData[completedWeeks.length] && (
              <>
                <p className="text-sm text-blue-700 font-medium">
                  Hedef: <AnimatedCounter value={weeklyData[completedWeeks.length].targetWeight} decimals={1} suffix=" kg" />
                </p>
                <Badge 
                  variant={weeklyData[completedWeeks.length].actualWeight ? "default" : "secondary"}
                  className="animate-pulse-glow"
                >
                  {weeklyData[completedWeeks.length].actualWeight ? "Tamamlandı ✅" : "Bekliyor ⏳"}
                </Badge>
              </>
            )}
          </div>
        </GlassCardContent>
      </GlassCard>

      <GlassCard variant="strong" hover glow className="bg-gradient-to-br from-purple-50/80 to-purple-100/80 border-purple-200/50">
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-purple-800">
            İstatistikler
          </GlassCardTitle>
          <TrendingUp className="h-5 w-5 text-purple-600 animate-rotate-slow" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-3">
            <div className="text-lg font-bold text-purple-900">
              <AnimatedCounter value={averageWeeklyChange} decimals={1} suffix=" kg" />
            </div>
            <p className="text-xs text-purple-600 font-medium">Ortalama haftalık değişim</p>
            <div className="space-y-1">
              <p className="text-xs text-purple-600">
                Başarılı haftalar: <span className="font-semibold"><AnimatedCounter value={successfulWeeks} />/<AnimatedCounter value={completedWeeks.length} /></span>
              </p>
              {bestWeek && (
                <p className="text-xs text-purple-600">
                  En iyi: Hafta <AnimatedCounter value={bestWeek.week} /> (<AnimatedCounter value={Math.abs(bestWeek.actualChange || 0)} decimals={1} suffix=" kg" />)
                </p>
              )}
            </div>
          </div>
        </GlassCardContent>
      </GlassCard>

      <GlassCard variant="strong" hover glow className="bg-gradient-to-br from-orange-50/80 to-orange-100/80 border-orange-200/50">
        <GlassCardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <GlassCardTitle className="text-sm font-medium text-orange-800">
            Motivasyon Skoru
          </GlassCardTitle>
          <Award className="h-5 w-5 text-orange-600 animate-bounce-gentle" />
        </GlassCardHeader>
        <GlassCardContent>
          <div className="space-y-4">
            <div className="text-2xl font-bold text-orange-900">
              <AnimatedCounter value={motivationScore} suffix="/100" />
            </div>
            <div className="progress-enhanced">
              <div 
                className="progress-fill bg-gradient-to-r from-orange-400 to-amber-500" 
                style={{ width: `${motivationScore}%` }}
              />
            </div>
            <p className="text-xs text-orange-600 font-medium animate-pulse">
              {getMotivationMessage(motivationScore)}
            </p>
          </div>
        </GlassCardContent>
      </GlassCard>
    </div>
  );
};
