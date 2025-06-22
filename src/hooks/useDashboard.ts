
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useWeightProgram } from '@/hooks/useWeightProgram';

export const useDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const { profile, loading: profileLoading, updateOnboardingStatus } = useUserProfile();
  const { weightProgram, loading: programLoading, createWeightProgram } = useWeightProgram();

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      // Her iki loading tamamlanana kadar bekle
      if (profileLoading || programLoading) {
        setIsLoading(true);
        return;
      }

      // Onboarding mantığını düzenle - sadece yeni kayıt olan kullanıcılar için
      const isNewUser = profile && !profile.onboarding_completed;
      
      if (isNewUser) {
        setShowOnboarding(true);
        setIsLoading(false);
        return;
      }

      // Her şey hazır
      setShowOnboarding(false);
      setIsLoading(false);
    };

    loadData();
  }, [user, profile, profileLoading, programLoading]);

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
      // Onboarding'i tamamlandı olarak işaretle
      await updateOnboardingStatus(true);
      
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

  const handleWeightEntryComplete = async (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => {
    if (!user) return;
    
    try {
      const program = await createWeightProgram({
        current_weight: data.currentWeight,
        target_weight: data.targetWeight,
        program_weeks: data.programWeeks
      });

      if (program) {
        console.log('Yeni program oluşturuldu:', program);
        
        toast({
          title: "Program Başlatıldı! 🎉",
          description: "Kilo takip programınız başarıyla oluşturuldu.",
        });
      }
    } catch (error) {
      console.error('Program creation error:', error);
      toast({
        title: "Hata",
        description: "Program oluşturulurken bir hata oluştu.",
        variant: "destructive"
      });
    }
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
    
    const startDate = new Date(weightProgram.start_date);
    const currentDate = new Date();
    const elapsedWeeks = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
    
    return Math.min((elapsedWeeks / weightProgram.program_weeks) * 100, 100);
  };

  const getWeeklyTarget = () => {
    if (!weightProgram) return 0;
    return Math.abs(weightProgram.target_weight - weightProgram.current_weight) / weightProgram.program_weeks;
  };

  const getLatestWeight = () => {
    if (!weightProgram) return undefined;
    
    const storageKey = `kiloTakipWeeklyData_${weightProgram.current_weight}_${weightProgram.target_weight}_${weightProgram.program_weeks}`;
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

  // WeightProgram interface'ini dashboard için uygun formata dönüştür
  const dashboardWeightProgram = weightProgram ? {
    currentWeight: weightProgram.current_weight,
    targetWeight: weightProgram.target_weight,
    programWeeks: weightProgram.program_weeks,
    startDate: weightProgram.start_date
  } : null;

  return {
    isLoading,
    showOnboarding,
    showProfile,
    setShowProfile,
    weightProgram: dashboardWeightProgram,
    user: user ? { email: user.email } : null,
    handleOnboardingComplete,
    handleWeightEntryComplete,
    handleProfileSave,
    calculateProgress,
    getWeeklyTarget,
    getLatestWeight
  };
};
