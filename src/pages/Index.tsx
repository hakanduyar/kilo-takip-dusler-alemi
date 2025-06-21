
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { DashboardContainer } from '@/components/dashboard/DashboardContainer';
import { useAuth } from '@/hooks/useAuth';
import { PageLoading } from '@/components/states/LoadingStates';

const Index = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user, loading, signOut } = useAuth();

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuth(true);
  };

  const handleRegister = () => {
    setAuthMode('register');
    setShowAuth(true);
  };

  const handleAuthSuccess = () => {
    console.log('Auth success, closing modal');
    setShowAuth(false);
  };

  const handleLogout = async () => {
    console.log('Logging out...');
    await signOut();
  };

  if (loading) {
    return <PageLoading />;
  }

  if (user) {
    return <DashboardContainer onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-purple-700 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-purple-700/20"></div>
      
      <div className="relative z-10 text-center w-full max-w-md mx-auto">
        <div className="backdrop-blur-sm bg-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight">
            Kilo<span className="text-yellow-300">Takip</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 px-2 leading-relaxed">
            Sağlıklı yaşam yolculuğunuza başlayın. Kilonuzu takip edin, hedeflerinize ulaşın.
          </p>
          
          <div className="space-y-3 sm:space-y-4 w-full">
            <Button
              onClick={handleLogin}
              className="w-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 hover:border-white/40 transition-all duration-300 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl"
            >
              Giriş Yap
            </Button>
            
            <Button
              onClick={handleRegister}
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 h-12 sm:h-14 text-base sm:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl"
            >
              Kayıt Ol
            </Button>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        mode={authMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
