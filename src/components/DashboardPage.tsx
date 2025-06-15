import { useState, useEffect } from 'react';
import { WeightEntry } from '@/components/WeightEntry';
import { WeeklyPlan } from '@/components/WeeklyPlan';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { UserProfile } from '@/components/profile/UserProfile';
import { NotificationSystem } from '@/components/notifications/NotificationSystem';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { PageLoading, DashboardLoading } from '@/components/states/LoadingStates';
import { NoProgramState } from '@/components/states/EmptyStates';
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
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const user = JSON.parse(localStorage.getItem('kiloTakipUser') || '{}');
  const [weightProgram, setWeightProgram] = useState<WeightProgram | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading time for smooth UX
    const loadData = async () => {
      setIsLoading(true);
      
      // Check if onboarding is completed
      const onboardingCompleted = localStorage.getItem('kiloTakipOnboardingCompleted');
      if (!onboardingCompleted) {
        setShowOnboarding(true);
        setIsLoading(false);
        return;
      }

      // Load weight program
      const saved = localStorage.getItem('kiloTakipProgram');
      if (saved) {
        const program = JSON.parse(saved);
        setWeightProgram(program);
        console.log('Program verisi yüklendi:', program);
      }

      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    // Setup error toast listener
    const handleErrorToast = (event: CustomEvent) => {
      toast({
        title: event.detail.title,
        description: event.detail.description,
        variant: event.detail.variant || 'destructive'
      });
    };

    window.addEventListener('showErrorToast' as any, handleErrorToast);
    return () => window.removeEventListener('showErrorToast' as any, handleErrorToast);
  }, [toast]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    toast({
      title: "Hoş Geldiniz! 🎉",
      description: "KiloTakip uygulamasına başarıyla katıldınız. Şimdi programınızı oluşturabilirsiniz.",
    });
  };

  const handleWeightEntryComplete = (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => {
    const program: WeightProgram = {
      ...data,
      startDate: new Date().toISOString()
    };
    
    setWeightProgram(program);
    localStorage.setItem('kiloTakipProgram', JSON.stringify(program));
    
    console.log('Yeni program oluşturuldu ve kaydedildi:', program);
    
    toast({
      title: "Program Başlatıldı! 🎉",
      description: "Kilo takip programınız başarıyla oluşturuldu.",
    });
  };

  const handleProfileSave = (profileData: any) => {
    setShowProfile(false);
    toast({
      title: "Profil Güncellendi! ✅",
      description: "Profil bilgileriniz başarıyla kaydedildi.",
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

  if (isLoading) {
    return <PageLoading />;
  }

  if (showOnboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  return (
    <AccessibilityProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{animationDelay: '4s'}}></div>
          </div>

          <div className="relative z-10">
            <DashboardHeader 
              userEmail={user.email} 
              onLogout={onLogout}
              onProfileClick={() => setShowProfile(true)}
              notificationComponent={
                <NotificationSystem 
                  weightProgram={weightProgram} 
                />
              }
            />

            <main className="container-max container-padding py-8">
              <div className="mb-8 animate-fade-in">
                <h2 className="text-4xl font-bold text-gradient mb-4">
                  Hoş geldin! 👋
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl">
                  {weightProgram 
                    ? "Kilo takip programınız devam ediyor. Haftalık ilerlemenizi takip edin ve hedefinize ulaşın!"
                    : "Kilo takip yolculuğun burada başlıyor. İlk olarak hedeflerini belirle ve bu muhteşem dönüşümü başlat."}
                </p>
              </div>

              {!weightProgram ? (
                <div className="animate-scale-in">
                  <WeightEntry onComplete={handleWeightEntryComplete} />
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="animate-slide-in-right">
                    <StatsCards
                      currentWeight={weightProgram.currentWeight}
                      targetWeight={weightProgram.targetWeight}
                      programWeeks={weightProgram.programWeeks}
                      progress={calculateProgress()}
                      weeklyTarget={getWeeklyTarget()}
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
            </main>
          </div>

          {/* Profile Modal */}
          {showProfile && (
            <UserProfile
              onSave={handleProfileSave}
              onClose={() => setShowProfile(false)}
            />
          )}
        </div>
      </ErrorBoundary>
    </AccessibilityProvider>
  );
};
