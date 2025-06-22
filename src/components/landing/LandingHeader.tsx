
import { Button } from '@/components/ui/button';

interface LandingHeaderProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export const LandingHeader = ({ onAuthClick }: LandingHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-blue-600">Kilo</span>
              <span className="text-yellow-500">Takip</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Özellikler
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
              Yorumlar
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors">
              Fiyatlandırma
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={() => onAuthClick('login')}
              className="text-gray-600 hover:text-blue-600"
            >
              Giriş Yap
            </Button>
            <Button 
              onClick={() => onAuthClick('register')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Ücretsiz Başla
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
