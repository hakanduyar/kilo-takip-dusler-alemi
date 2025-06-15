
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Target, BarChart3, Calendar, Trophy, Plus, FileX, Database } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const EmptyState = ({ 
  icon: Icon = FileX, 
  title, 
  description, 
  action, 
  className = "" 
}: EmptyStateProps) => (
  <Card className={`text-center py-12 ${className}`}>
    <CardContent>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="h-8 w-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Button onClick={action.onClick} className="flex items-center space-x-2 mx-auto">
          <Plus className="h-4 w-4" />
          <span>{action.label}</span>
        </Button>
      )}
    </CardContent>
  </Card>
);

export const NoProgramState = ({ onCreateProgram }: { onCreateProgram: () => void }) => (
  <EmptyState
    icon={Target}
    title="Henüz Program Yok"
    description="Kilo takip yolculuğunuza başlamak için önce bir program oluşturun. Mevcut kilonuzu, hedef kilonuzu ve program sürenizi belirleyin."
    action={{
      label: "Program Oluştur",
      onClick: onCreateProgram
    }}
  />
);

export const NoWeightEntryState = ({ onAddEntry }: { onAddEntry: () => void }) => (
  <EmptyState
    icon={Calendar}
    title="Henüz Kilo Girişi Yok"
    description="Haftalık ilerlemenizi takip etmek için kilo girişi yapın. İlk ölçümünüzü yapmaya hazır mısınız?"
    action={{
      label: "Kilo Gir",
      onClick: onAddEntry
    }}
  />
);

export const NoDataForChartsState = () => (
  <EmptyState
    icon={BarChart3}
    title="Grafik İçin Yeterli Veri Yok"
    description="Grafikler ve trend analizi için en az 3 haftalık veri gerekiyor. Kilo girişlerinizi yapmaya devam edin."
  />
);

export const NoAchievementsState = () => (
  <EmptyState
    icon={Trophy}
    title="Henüz Başarı Yok"
    description="İlk başarınızı kazanmak için haftalık hedeflerinizi tamamlamaya başlayın. Her başarı sizi hedefinize bir adım daha yaklaştırır."
  />
);

export const NoNotificationsState = () => (
  <EmptyState
    icon={Database}
    title="Bildirim Yok"
    description="Henüz hiç bildiriminiz bulunmuyor. Program ilerledikçe burada hatırlatmalar ve başarı bildirimleri göreceksiniz."
  />
);

export const OfflineState = ({ onRetry }: { onRetry: () => void }) => (
  <Card className="text-center py-12 bg-yellow-50 border-yellow-200">
    <CardContent>
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Database className="h-8 w-8 text-yellow-600" />
      </div>
      <h3 className="text-lg font-semibold text-yellow-900 mb-2">Bağlantı Yok</h3>
      <p className="text-yellow-700 mb-6 max-w-md mx-auto">
        İnternet bağlantınızı kontrol edin. Uygulama çevrimdışı modda çalışmaya devam ediyor.
      </p>
      <Button 
        onClick={onRetry} 
        variant="outline" 
        className="border-yellow-300 text-yellow-700 hover:bg-yellow-100"
      >
        Yeniden Dene
      </Button>
    </CardContent>
  </Card>
);

export const ErrorState = ({ 
  title = "Bir Hata Oluştu", 
  description = "Beklenmedik bir hata oluştu. Lütfen tekrar deneyin.", 
  onRetry 
}: { 
  title?: string; 
  description?: string; 
  onRetry: () => void;
}) => (
  <Card className="text-center py-12 bg-red-50 border-red-200">
    <CardContent>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileX className="h-8 w-8 text-red-600" />
      </div>
      <h3 className="text-lg font-semibold text-red-900 mb-2">{title}</h3>
      <p className="text-red-700 mb-6 max-w-md mx-auto">{description}</p>
      <Button 
        onClick={onRetry} 
        variant="outline" 
        className="border-red-300 text-red-700 hover:bg-red-100"
      >
        Tekrar Dene
      </Button>
    </CardContent>
  </Card>
);
