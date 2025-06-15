
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WeekData } from '@/types/weekly-plan';
import { Trophy, Star, Target, Zap, Medal, Award } from 'lucide-react';

interface AchievementSystemProps {
  weeklyData: WeekData[];
  programWeeks: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

export const AchievementSystem = ({ weeklyData, programWeeks }: AchievementSystemProps) => {
  const completedWeeks = weeklyData.filter(w => w.actualWeight !== null);
  const successfulWeeks = completedWeeks.filter(w => w.status === 'ahead' || w.status === 'on-track');
  const consecutiveSuccessWeeks = getConsecutiveSuccessWeeks(weeklyData);
  const completionPercentage = (completedWeeks.length / programWeeks) * 100;

  function getConsecutiveSuccessWeeks(weeks: WeekData[]): number {
    let maxConsecutive = 0;
    let currentConsecutive = 0;
    
    for (const week of weeks) {
      if (week.actualWeight !== null && (week.status === 'ahead' || week.status === 'on-track')) {
        currentConsecutive++;
        maxConsecutive = Math.max(maxConsecutive, currentConsecutive);
      } else if (week.actualWeight !== null) {
        currentConsecutive = 0;
      }
    }
    
    return maxConsecutive;
  }

  const achievements: Achievement[] = [
    {
      id: 'first-week',
      title: 'İlk Adım',
      description: 'İlk hafta kaydını tamamla',
      icon: Star,
      unlocked: completedWeeks.length >= 1,
    },
    {
      id: 'five-streak',
      title: 'Süreklilik',
      description: '5 hafta üst üste başarılı ol',
      icon: Zap,
      unlocked: consecutiveSuccessWeeks >= 5,
      progress: consecutiveSuccessWeeks,
      maxProgress: 5
    },
    {
      id: 'quarter',
      title: 'Çeyrek Başarısı',
      description: 'Programın %25\'ini tamamla',
      icon: Medal,
      unlocked: completionPercentage >= 25,
      progress: Math.min(completionPercentage, 25),
      maxProgress: 25
    },
    {
      id: 'half',
      title: 'Yarı Yol',
      description: 'Programın %50\'sini tamamla',
      icon: Trophy,
      unlocked: completionPercentage >= 50,
      progress: Math.min(completionPercentage, 50),
      maxProgress: 50
    },
    {
      id: 'three-quarter',
      title: 'Son Çeyrek',
      description: 'Programın %75\'ini tamamla',
      icon: Award,
      unlocked: completionPercentage >= 75,
      progress: Math.min(completionPercentage, 75),
      maxProgress: 75
    },
    {
      id: 'perfect',
      title: 'Mükemmellik',
      description: 'Tüm haftalarda hedefe ulaş',
      icon: Target,
      unlocked: completedWeeks.length > 0 && successfulWeeks.length === completedWeeks.length && completedWeeks.length >= programWeeks,
      progress: successfulWeeks.length,
      maxProgress: programWeeks
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Trophy className="h-6 w-6 text-yellow-600" />
          <span>Başarılar</span>
          <Badge variant="secondary" className="ml-auto">
            {unlockedCount}/{achievements.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-yellow-300 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-yellow-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-5 w-5 ${
                      achievement.unlocked ? 'text-yellow-600' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${
                        achievement.unlocked ? 'text-yellow-900' : 'text-gray-500'
                      }`}>
                        {achievement.title}
                      </h4>
                      {achievement.unlocked && (
                        <Badge variant="default" className="bg-yellow-500 text-white text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                    
                    <p className={`text-sm mt-1 ${
                      achievement.unlocked ? 'text-yellow-700' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    
                    {achievement.maxProgress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>{Math.round(achievement.progress || 0)}</span>
                          <span>{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all ${
                              achievement.unlocked ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}
                            style={{
                              width: `${Math.min(100, ((achievement.progress || 0) / achievement.maxProgress) * 100)}%`
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
