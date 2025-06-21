
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface WeightProgram {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [weightProgram, setWeightProgram] = useState<WeightProgram | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        // Check if user has completed onboarding by looking for existing program data
        const onboardingKey = `kiloTakipOnboarding_${user.id}`;
        const onboardingCompleted = localStorage.getItem(onboardingKey);

        console.log('Onboarding completed:', onboardingCompleted);

        // If no onboarding record exists, show onboarding
        if (!onboardingCompleted) {
          setShowOnboarding(true);
          setIsLoading(false);
          return;
        }

        // Check for existing weight program
        const savedProgram = localStorage.getItem(`kiloTakipProgram_${user.id}`);
        if (savedProgram) {
          const program = JSON.parse(savedProgram);
          setWeightProgram(program);
          console.log('Program verisi yüklendi:', program);
        }

      } catch (error) {
        console.error('Data loading error:', error);
        setShowOnboarding(true);
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
    };

    if (user) {
      loadData();
    }
  }, [user]);

  useEffect(() => {
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

  const handleOnboardingComplete = async () => {
    if (!user) return;
    
    try {
      // Mark onboarding as complete in localStorage
      const onboardingKey = `kiloTakipOnboarding_${user.id}`;
      localStorage.setItem(onboardingKey, 'true');
      
      console.log('Onboarding completed for user:', user.id);
    } catch (error) {
      console.error('Onboarding completion error:', error);
    }

    setShowOnboarding(false);
    toast({
      title: "Hoş Geldiniz! 🎉",
      description: "KiloTakip uygulamasına başarıyla katıldınız. Şimdi programınızı oluşturabilirsiniz.",
    });
  };

  const handleWeightEntryComplete = (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => {
    if (!user) return;
    
    const program: WeightProgram = {
      ...data,
      startDate: new Date().toISOString()
    };
    
    setWeightProgram(program);
    localStorage.setItem(`kiloTakipProgram_${user.id}`, JSON.stringify(program));
    
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

  const getLatestWeight = () => {
    if (!weightProgram) return undefined;
    
    const storageKey = `kiloTakipWeeklyData_${weightProgram.currentWeight}_${weightProgram.targetWeight}_${weightProgram.programWeeks}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        const weeklyData = parsed.weeklyData || [];
        
        const latestEntry = weeklyData
          .filter((week: any) => week.actualWeight !== null)
          .sort((a: any, b: any) => b.week - a.week)[0];
          
        return latestEntry?.actualWeight;
      } catch (error) {
        console.error('Haftalık veri okuma hatası:', error);
      }
    }
    
    return undefined;
  };

  return {
    isLoading,
    showOnboarding,
    showProfile,
    setShowProfile,
    weightProgram,
    user: user ? { email: user.email } : null,
    handleOnboardingComplete,
    handleWeightEntryComplete,
    handleProfileSave,
    calculateProgress,
    getWeeklyTarget,
    getLatestWeight
  };
};
