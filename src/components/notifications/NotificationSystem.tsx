
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, X, CheckCircle, AlertCircle, Info, Target, Trophy, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface NotificationSystemProps {
  weightProgram?: any;
  weeklyData?: any[];
}

export const NotificationSystem = ({ weightProgram, weeklyData }: NotificationSystemProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load existing notifications
    const saved = localStorage.getItem('kiloTakipNotifications');
    if (saved) {
      setNotifications(JSON.parse(saved));
    }

    // Generate notifications based on program status
    if (weightProgram) {
      generateNotifications();
    }

    // Set up weekly reminders
    setupWeeklyReminders();
  }, [weightProgram, weeklyData]);

  const generateNotifications = () => {
    const newNotifications: Notification[] = [];
    const now = new Date();
    const startDate = new Date(weightProgram.startDate);
    const elapsedWeeks = Math.floor((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));

    // Welcome notification
    if (elapsedWeeks === 0) {
      newNotifications.push({
        id: `welcome-${Date.now()}`,
        type: 'success',
        title: 'Programa Hoş Geldiniz! 🎉',
        message: 'Kilo takip programınız başarıyla oluşturuldu. İlk hafta ölçümünüzü yapmayı unutmayın!',
        timestamp: now.toISOString(),
        read: false
      });
    }

    // Weekly reminder
    const dayOfWeek = now.getDay();
    if (dayOfWeek === 1) { // Monday
      newNotifications.push({
        id: `weekly-reminder-${Date.now()}`,
        type: 'reminder',
        title: 'Haftalık Ölçüm Zamanı! ⏰',
        message: `Hafta ${elapsedWeeks + 1} için kilonuzu ölçmeyi unutmayın.`,
        timestamp: now.toISOString(),
        read: false,
        action: {
          label: 'Şimdi Ölç',
          onClick: () => {
            // Navigate to weight entry
            toast({
              title: "Kilo Girişi",
              description: "Haftalık kilo girişi sayfasına yönlendiriliyorsunuz..."
            });
          }
        }
      });
    }

    // Progress notifications
    if (weeklyData && weeklyData.length > 0) {
      const lastEntry = weeklyData[weeklyData.length - 1];
      if (lastEntry.status === 'success') {
        newNotifications.push({
          id: `success-${Date.now()}`,
          type: 'success',
          title: 'Harika İlerleme! 🎯',
          message: 'Haftalık hedefinizi başarıyla tamamladınız. Böyle devam edin!',
          timestamp: now.toISOString(),
          read: false
        });
      } else if (lastEntry.status === 'warning') {
        newNotifications.push({
          id: `warning-${Date.now()}`,
          type: 'warning',
          title: 'Motivasyon Zamanı! 💪',
          message: 'Bu hafta hedefin biraz gerisinde kaldınız. Bir sonraki hafta için daha güçlü dönelim!',
          timestamp: now.toISOString(),
          read: false
        });
      }
    }

    // Goal approaching notification
    const progress = (elapsedWeeks / weightProgram.programWeeks) * 100;
    if (progress >= 75 && progress < 100) {
      newNotifications.push({
        id: `goal-approaching-${Date.now()}`,
        type: 'info',
        title: 'Hedefe Yaklaşıyorsunuz! 🏁',
        message: 'Program hedefinizin %75\'ini tamamladınız. Son spurt zamanı!',
        timestamp: now.toISOString(),
        read: false
      });
    }

    // Add new notifications to existing ones
    setNotifications(prev => {
      const existingIds = new Set(prev.map(n => n.id));
      const filtered = newNotifications.filter(n => !existingIds.has(n.id));
      const updated = [...prev, ...filtered];
      localStorage.setItem('kiloTakipNotifications', JSON.stringify(updated));
      return updated;
    });
  };

  const setupWeeklyReminders = () => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          toast({
            title: "Bildirimler Etkinleştirildi! 🔔",
            description: "Haftalık hatırlatmalar için bildirimler açıldı."
          });
        }
      });
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => {
      const updated = prev.map(n => n.id === id ? { ...n, read: true } : n);
      localStorage.setItem('kiloTakipNotifications', JSON.stringify(updated));
      return updated;
    });
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      localStorage.setItem('kiloTakipNotifications', JSON.stringify(updated));
      return updated;
    });
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'info': return Info;
      case 'reminder': return Calendar;
      default: return Bell;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'warning': return 'text-orange-600 bg-orange-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'reminder': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setShowPanel(!showPanel)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {showPanel && (
        <Card className="absolute right-0 top-12 w-96 max-h-96 overflow-y-auto z-50 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Bildirimler</span>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPanel(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">Henüz bildirim yok</p>
            ) : (
              notifications.map((notification) => {
                const Icon = getIcon(notification.type);
                return (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${notification.read ? 'opacity-60' : ''} ${getColor(notification.type)}`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-sm mt-1">{notification.message}</p>
                        <p className="text-xs mt-2 opacity-70">
                          {new Date(notification.timestamp).toLocaleDateString('tr-TR')}
                        </p>
                        {notification.action && !notification.read && (
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              notification.action!.onClick();
                              markAsRead(notification.id);
                            }}
                          >
                            {notification.action.label}
                          </Button>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNotification(notification.id)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
