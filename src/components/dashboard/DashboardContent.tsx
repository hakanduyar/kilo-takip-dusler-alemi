
import { WeightEntry } from '@/components/WeightEntry';
import { WeeklyPlan } from '@/components/WeeklyPlan';
import { StatsCards } from '@/components/dashboard/StatsCards';

interface WeightProgram {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

interface DashboardContentProps {
  weightProgram: WeightProgram | null;
  onWeightEntryComplete: (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => void;
  calculateProgress: () => number;
  getWeeklyTarget: () => number;
  getLatestWeight: () => number | undefined;
}

export const DashboardContent = ({
  weightProgram,
  onWeightEntryComplete,
  calculateProgress,
  getWeeklyTarget,
  getLatestWeight
}: DashboardContentProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="mb-6 sm:mb-8 animate-fade-in">
        <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4 text-center sm:text-left">
          Hoş geldin! <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl">👋</span>
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-700 max-w-2xl leading-relaxed text-center sm:text-left">
          {weightProgram 
            ? "Kilo takip programınız devam ediyor. Haftalık ilerlemenizi takip edin ve hedefinize ulaşın!"
            : "Kilo takip yolculuğun burada başlıyor. İlk olarak hedeflerini belirle ve bu muhteşem dönüşümü başlat."}
        </p>
      </div>

      {!weightProgram ? (
        <div className="animate-scale-in">
          <WeightEntry onComplete={onWeightEntryComplete} />
        </div>
      ) : (
        <div className="space-y-6 sm:space-y-8">
          <div className="animate-slide-in-right">
            <StatsCards
              currentWeight={weightProgram.currentWeight}
              targetWeight={weightProgram.targetWeight}
              programWeeks={weightProgram.programWeeks}
              progress={calculateProgress()}
              weeklyTarget={getWeeklyTarget()}
              latestWeight={getLatestWeight()}
            />
          </div>

          <div className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            <WeeklyPlan
              currentWeight={weightProgram.currentWeight}
              targetWeight={weightProgram.targetWeight}
              programWeeks={weightProgram.programWeeks}
              startDate={weightProgram.startDate}
            />
          </div>
        </div>
      )}
    </div>
  );
};
