
import { WeekData } from '@/types/weekly-plan';
import { Trophy, Heart, Target, Zap } from 'lucide-react';

interface MotivationMessageProps {
  week: WeekData;
}

export const MotivationMessage = ({ week }: MotivationMessageProps) => {
  const getMotivationMessage = () => {
    if (!week.actualWeight || week.actualChange === null) return null;

    const tolerance = 0.5;
    const targetMet = Math.abs(week.actualWeight - week.targetWeight) <= tolerance;
    const betterThanTarget = week.targetWeight > week.actualWeight ? 
      week.actualWeight < week.targetWeight : 
      week.actualWeight > week.targetWeight;

    if (targetMet) {
      return {
        icon: Trophy,
        message: "Mükemmel! Hedefinizi tam tutturdunuz! 🎯",
        bgColor: "bg-green-50",
        textColor: "text-green-800",
        iconColor: "text-green-600"
      };
    }

    if (betterThanTarget) {
      return {
        icon: Zap,
        message: "Harika! Hedefinizden bile daha iyi sonuç aldınız! ⚡",
        bgColor: "bg-blue-50",
        textColor: "text-blue-800",
        iconColor: "text-blue-600"
      };
    }

    // Hedeften sapma durumu
    const deviation = Math.abs(week.actualWeight - week.targetWeight);
    if (deviation > 1) {
      return {
        icon: Heart,
        message: "Sorun değil! Bir sonraki hafta daha iyi olacak. Devam edin! 💪",
        bgColor: "bg-orange-50",
        textColor: "text-orange-800",
        iconColor: "text-orange-600"
      };
    }

    return {
      icon: Target,
      message: "İyi ilerleme! Hedefinize yaklaşıyorsunuz! 🌟",
      bgColor: "bg-purple-50",
      textColor: "text-purple-800",
      iconColor: "text-purple-600"
    };
  };

  const motivation = getMotivationMessage();
  
  if (!motivation) return null;

  const { icon: Icon, message, bgColor, textColor, iconColor } = motivation;

  return (
    <div className={`${bgColor} p-4 rounded-lg border border-opacity-20`}>
      <div className="flex items-center space-x-3">
        <Icon className={`h-6 w-6 ${iconColor}`} />
        <div className={`text-sm font-medium ${textColor}`}>
          {message}
        </div>
      </div>
    </div>
  );
};
