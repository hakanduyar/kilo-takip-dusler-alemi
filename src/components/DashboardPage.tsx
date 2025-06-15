
import { useState } from 'react';
import { WeightEntry } from '@/components/WeightEntry';
import { WeeklyPlan } from '@/components/WeeklyPlan';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { DetailedStats } from '@/components/dashboard/DetailedStats';
import { AchievementSystem } from '@/components/dashboard/AchievementSystem';
import { TrendAnalysis } from '@/components/dashboard/TrendAnalysis';
import { ProgramInfo } from '@/components/dashboard/ProgramInfo';
import { useToast } from '@/hooks/use-toast';

interface DashboardPageProps {
  onLogout: () => void;
}

interface WeightProgram {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

export const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const user = JSON.parse(localStorage.getItem('kiloTakipUser') || '{}');
  const [weightProgram, setWeightProgram] = useState<WeightProgram | null>(() => {
    const saved = localStorage.getItem('kiloTakipProgram');
    return saved ? JSON.parse(saved) : null;
  });
  const { toast } = useToast();

  const handleWeightEntryComplete = (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => {
    const program: WeightProgram = {
      ...data,
      startDate: new Date().toISOString()
    };
    
    setWeightProgram(program);
    localStorage.setItem('kiloTakipProgram', JSON.stringify(program));
    
    toast({
      title: "Program Başlatıldı! 🎉",
      description: "Kilo takip programınız başarıyla oluşturuldu.",
    });
  };

  const calculateProgress = () => {
    if (!weightProgram) return 0;
    
    const startDate = new Date(weightProgram.startDate);
    const currentDate = new Date();
    const elapsedWeeks = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
    
    return Math.min((elapsedWeeks / weightProgram.programWeeks) * 100, 100);
  };

  const getWeeklyTarget = () => {
    if (!weightProgram) return 0;
    return Math.abs(weightProgram.targetWeight - weightProgram.currentWeight) / weightProgram.programWeeks;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <DashboardHeader userEmail={user.email} onLogout={onLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hoş geldin! 👋
          </h2>
          <p className="text-gray-600">
            {weightProgram 
              ? "Kilo takip programınız devam ediyor. Haftalık ilerlemenizi takip edin!"
              : "Kilo takip yolculuğun burada başlıyor. İlk olarak hedeflerini belirle."}
          </p>
        </div>

        {!weightProgram ? (
          <WeightEntry onComplete={handleWeightEntryComplete} />
        ) : (
          <>
            <StatsCards
              currentWeight={weightProgram.currentWeight}
              targetWeight={weightProgram.targetWeight}
              programWeeks={weightProgram.programWeeks}
              progress={calculateProgress()}
              weeklyTarget={getWeeklyTarget()}
            />

            <WeeklyPlan
              currentWeight={weightProgram.currentWeight}
              targetWeight={weightProgram.targetWeight}
              programWeeks={weightProgram.programWeeks}
              startDate={weightProgram.startDate}
            />

            <ProgramInfo
              weightProgram={weightProgram}
              onProgramReset={() => setWeightProgram(null)}
            />
          </>
        )}
      </main>
    </div>
  );
};
