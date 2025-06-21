
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
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-lg">
              Kilo<span className="text-yellow-300">Takip</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {notificationComponent}
            
            <div className="hidden md:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-2 sm:px-3 py-1">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
              <span className="text-gray-600 font-medium text-xs sm:text-sm truncate max-w-32 lg:max-w-none">{userEmail}</span>
            </div>
            
            {onProfileClick && (
              <Button
                onClick={onProfileClick}
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-gray-600 border-gray-300 transition-all duration-200 h-8 w-8 sm:h-9 sm:w-9 lg:h-auto lg:w-auto p-1 sm:p-1 lg:px-3 lg:py-2"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden lg:inline ml-2">Profil</span>
              </Button>
            )}
            
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-gray-600 border-gray-300 hover:border-gray-400 transition-all duration-200 h-8 sm:h-9 px-2 sm:px-3"
            >
              <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline ml-1 sm:ml-2 text-xs sm:text-sm">Çıkış</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
