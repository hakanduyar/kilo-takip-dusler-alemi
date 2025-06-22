
import { useState, useEffect } from 'react';
import { AuthModal } from '@/components/AuthModal';
import { DashboardContainer } from '@/components/dashboard/DashboardContainer';
import { LandingHeader } from '@/components/landing/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { CTASection } from '@/components/landing/CTASection';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Auth mode toggle event listener
  useEffect(() => {
    const handleToggleAuthMode = (event: CustomEvent) => {
      setAuthMode(event.detail);
      setShowAuthModal(true);
    };

    window.addEventListener('toggleAuthMode' as any, handleToggleAuthMode);
    return () => window.removeEventListener('toggleAuthMode' as any, handleToggleAuthMode);
  }, []);

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  if (user) {
    return <DashboardContainer onLogout={signOut} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <LandingHeader onAuthClick={handleAuthClick} />
      <HeroSection onAuthClick={handleAuthClick} />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection onAuthClick={handleAuthClick} />
      <CTASection onAuthClick={handleAuthClick} />
      
      {showAuthModal && (
        <AuthModal 
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
};

export default Index;
