
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserProfile {
  id: string;
  user_id: string;
  email: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Profile fetch error:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOnboardingStatus = async (completed: boolean) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ onboarding_completed: completed })
        .eq('user_id', user.id);

      if (error) {
        console.error('Onboarding update error:', error);
        return;
      }

      setProfile(prev => prev ? { ...prev, onboarding_completed: completed } : null);
    } catch (error) {
      console.error('Onboarding update error:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    updateOnboardingStatus,
    refetchProfile: fetchProfile
  };
};
