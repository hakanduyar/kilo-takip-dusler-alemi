
-- Kullanıcı profilleri ve kilo programları için tablo oluştur
CREATE TABLE public.user_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Kilo programları için tablo oluştur
CREATE TABLE public.weight_programs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_weight DECIMAL(5,2) NOT NULL,
  target_weight DECIMAL(5,2) NOT NULL,
  program_weeks INTEGER NOT NULL,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Row Level Security politikaları ekle
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_programs ENABLE ROW LEVEL SECURITY;

-- Kullanıcılar sadece kendi verilerini görebilir
CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
  ON public.user_profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own weight program" 
  ON public.weight_programs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own weight program" 
  ON public.weight_programs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own weight program" 
  ON public.weight_programs 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Kullanıcı kayıt olduğunda otomatik profil oluştur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_profiles (user_id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Trigger oluştur
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
