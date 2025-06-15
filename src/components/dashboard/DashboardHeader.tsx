
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
    <header className="backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50" style={{ backgroundColor: '#F0F7FF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-yellow-500 bg-clip-text text-transparent">
              KiloTakip
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {notificationComponent}
            
            <div className="hidden sm:flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">{userEmail}</span>
            </div>
            
            {onProfileClick && (
              <Button
                onClick={onProfileClick}
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border border-blue-200/50 transition-all duration-200"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Profil</span>
              </Button>
            )}
            
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border-red-200/50 hover:border-red-300/50 text-red-700 hover:text-red-800 transition-all duration-200"
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
