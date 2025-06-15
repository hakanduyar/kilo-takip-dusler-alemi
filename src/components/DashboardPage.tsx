
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Target, TrendingUp } from 'lucide-react';

interface DashboardPageProps {
  onLogout: () => void;
}

export const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const user = JSON.parse(localStorage.getItem('kiloTakipUser') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                KiloTakip
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{user.email}</span>
              </div>
              
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-700 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Hoş geldin! 👋
          </h2>
          <p className="text-gray-600">
            Kilo takip yolculuğun burada başlıyor. İlerlemenizi takip edin ve hedeflerinize ulaşın.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">
                Mevcut Kilo
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">-- kg</div>
              <p className="text-xs text-blue-600 mt-1">
                Henüz kilo kaydı yok
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">
                Hedef Kilo
              </CardTitle>
              <Target className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">-- kg</div>
              <p className="text-xs text-purple-600 mt-1">
                Hedef belirle
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">
                İlerleme
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">0%</div>
              <p className="text-xs text-green-600 mt-1">
                Hedefe olan mesafe
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Welcome Message */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">
              Kilo takip yolculuğuna hoş geldin! 🎯
            </h3>
            <p className="text-blue-100 mb-6">
              Sağlıklı yaşam hedeflerine ulaşmak için ilk adımı attın. 
              Artık kilonu düzenli olarak kaydedebilir, ilerlemeni takip edebilir 
              ve hedeflerine daha kolay ulaşabilirsin.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                variant="secondary" 
                className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
              >
                Kilo Kaydet
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
              >
                Hedef Belirle
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
