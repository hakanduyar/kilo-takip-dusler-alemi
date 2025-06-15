
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, User, Target, TrendingUp } from 'lucide-react';
import { WeightEntry } from '@/components/WeightEntry';
import { useToast } from '@/hooks/use-toast';

interface DashboardPageProps {
  onLogout: () => void;
}

interface WeightProgram {
  currentWeight: number;
  targetWeight: number;
  programWeeks: number;
  startDate: string;
}

export const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  const user = JSON.parse(localStorage.getItem('kiloTakipUser') || '{}');
  const [weightProgram, setWeightProgram] = useState<WeightProgram | null>(() => {
    const saved = localStorage.getItem('kiloTakipProgram');
    return saved ? JSON.parse(saved) : null;
  });
  const { toast } = useToast();

  const handleWeightEntryComplete = (data: { currentWeight: number; targetWeight: number; programWeeks: number }) => {
    const program: WeightProgram = {
      ...data,
      startDate: new Date().toISOString()
    };
    
    setWeightProgram(program);
    localStorage.setItem('kiloTakipProgram', JSON.stringify(program));
    
    toast({
      title: "Program Başlatıldı! 🎉",
      description: "Kilo takip programınız başarıyla oluşturuldu.",
    });
  };

  const calculateProgress = () => {
    if (!weightProgram) return 0;
    
    const startDate = new Date(weightProgram.startDate);
    const currentDate = new Date();
    const elapsedWeeks = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
    
    return Math.min((elapsedWeeks / weightProgram.programWeeks) * 100, 100);
  };

  const getWeeklyTarget = () => {
    if (!weightProgram) return 0;
    return Math.abs(weightProgram.targetWeight - weightProgram.currentWeight) / weightProgram.programWeeks;
  };

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
            {weightProgram 
              ? "Kilo takip programınız devam ediyor. İlerlemenizi takip edin!"
              : "Kilo takip yolculuğun burada başlıyor. İlk olarak hedeflerini belirle."}
          </p>
        </div>

        {!weightProgram ? (
          <WeightEntry onComplete={handleWeightEntryComplete} />
        ) : (
          <>
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
                  <div className="text-2xl font-bold text-blue-900">{weightProgram.currentWeight} kg</div>
                  <p className="text-xs text-blue-600 mt-1">
                    Başlangıç kilosu
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
                  <div className="text-2xl font-bold text-purple-900">{weightProgram.targetWeight} kg</div>
                  <p className="text-xs text-purple-600 mt-1">
                    {weightProgram.programWeeks} haftalık program
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
                  <div className="text-2xl font-bold text-green-900">{Math.round(calculateProgress())}%</div>
                  <p className="text-xs text-green-600 mt-1">
                    Haftalık hedef: {getWeeklyTarget().toFixed(1)} kg
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    Bugünkü Kilonuzu Kaydedin 📊
                  </h3>
                  <p className="text-blue-100 mb-4">
                    Düzenli kilo takibi hedefinize ulaşmanın anahtarıdır.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                  >
                    Kilo Kaydet
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    İlerleme Raporunuz 📈
                  </h3>
                  <p className="text-green-100 mb-4">
                    Haftalık ve aylık ilerlemenizi grafiklerle görün.
                  </p>
                  <Button 
                    variant="secondary" 
                    className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                  >
                    Raporu Görüntüle
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Program Info */}
            <Card className="mt-6 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Program Bilgileriniz</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Başlangıç:</span>
                    <div className="font-medium">{new Date(weightProgram.startDate).toLocaleDateString('tr-TR')}</div>
                  </div>
                  <div>
                    <span className="text-gray-600">Hedef Değişim:</span>
                    <div className="font-medium">
                      {Math.abs(weightProgram.targetWeight - weightProgram.currentWeight).toFixed(1)} kg
                      {weightProgram.targetWeight > weightProgram.currentWeight ? ' artış' : ' azalış'}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Kalan Süre:</span>
                    <div className="font-medium">
                      {Math.max(0, weightProgram.programWeeks - Math.floor((new Date().getTime() - new Date(weightProgram.startDate).getTime()) / (1000 * 60 * 60 * 24 * 7)))} hafta
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Haftalık Hedef:</span>
                    <div className="font-medium">{getWeeklyTarget().toFixed(2)} kg</div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setWeightProgram(null);
                      localStorage.removeItem('kiloTakipProgram');
                      toast({
                        title: "Program Sıfırlandı",
                        description: "Yeni bir program oluşturabilirsiniz.",
                      });
                    }}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Programı Yeniden Başlat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
};
