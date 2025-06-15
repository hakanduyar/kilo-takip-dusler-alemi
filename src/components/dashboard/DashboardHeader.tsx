
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
    <header className="backdrop-blur-sm border-b border-white/20 sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
              Kilo<span className="text-blue-200">Takip</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {notificationComponent}
            
            <div className="hidden sm:flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1">
              <User className="h-4 w-4 text-white" />
              <span className="text-white font-medium text-sm">{userEmail}</span>
            </div>
            
            {onProfileClick && (
              <Button
                onClick={onProfileClick}
                variant="ghost"
                size="sm"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 transition-all duration-200"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Profil</span>
              </Button>
            )}
            
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 transition-all duration-200"
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
