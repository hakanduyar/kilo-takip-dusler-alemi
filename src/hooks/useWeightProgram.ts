
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface WeightProgram {
  id: string;
  user_id: string;
  current_weight: number;
  target_weight: number;
  program_weeks: number;
  start_date: string;
  created_at: string;
  updated_at: string;
}

export const useWeightProgram = () => {
  const [weightProgram, setWeightProgram] = useState<WeightProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchWeightProgram = async () => {
    if (!user) {
      setWeightProgram(null);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('weight_programs')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Weight program fetch error:', error);
        return;
      }

      setWeightProgram(data);
    } catch (error) {
      console.error('Weight program fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const createWeightProgram = async (programData: {
    current_weight: number;
    target_weight: number;
    program_weeks: number;
  }) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('weight_programs')
        .insert({
          user_id: user.id,
          current_weight: programData.current_weight,
          target_weight: programData.target_weight,
          program_weeks: programData.program_weeks,
        })
        .select()
        .single();

      if (error) {
        console.error('Weight program creation error:', error);
        return null;
      }

      setWeightProgram(data);
      return data;
    } catch (error) {
      console.error('Weight program creation error:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchWeightProgram();
  }, [user]);

  return {
    weightProgram,
    loading,
    createWeightProgram,
    refetchWeightProgram: fetchWeightProgram
  };
};
