
import { Button } from '@/components/ui/button';
import { LogOut, User, Settings } from 'lucide-react';

interface DashboardHeaderProps {
  userEmail: string;
  onLogout: () => void;
  onProfileClick?: () => void;
  notificationComponent?: React.ReactElement;
}

export const DashboardHeader = ({ 
  userEmail, 
  onLogout, 
  onProfileClick,
  notificationComponent 
}: DashboardHeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold text-gray-900 drop-shadow-lg">
              Kilo<span className="text-yellow-300">Takip</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {notificationComponent}
            
            <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
              <User className="h-4 w-4 text-gray-600" />
              <span className="text-gray-600 font-medium text-sm">{userEmail}</span>
            </div>
            
            {onProfileClick && (
              <Button
                onClick={onProfileClick}
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-gray-600 border-gray-300 transition-all duration-200"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Profil</span>
              </Button>
            )}
            
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-gray-600 border-gray-300 hover:border-gray-400 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span>Çıkış</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
