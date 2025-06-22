
import { Card, CardContent } from '@/components/ui/card';
import { Target, TrendingUp, Calendar, Bell, BarChart3, Users } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Target,
      title: 'Hedef Belirleme',
      description: 'Kişiselleştirilmiş kilo verme hedeflerinizi belirleyin ve takip edin.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: TrendingUp,
      title: 'İlerleme Takibi',
      description: 'Günlük, haftalık ve aylık ilerlemenizi görsel grafiklerle takip edin.',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Calendar,
      title: 'Haftalık Planlama',
      description: 'Her hafta için özel kilo verme planları oluşturun ve uygulayın.',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Bell,
      title: 'Akıllı Hatırlatıcılar',
      description: 'Kilo ölçümü ve hedef takibi için kişiselleştirilmiş bildirimler.',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      icon: BarChart3,
      title: 'Detaylı Analiz',
      description: 'Kilo verme sürecinizi analiz eden detaylı raporlar ve öneriler.',
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      icon: Users,
      title: 'Topluluk Desteği',
      description: 'Motivasyonunuzu artıran topluluk desteği ve başarı hikayeleri.',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Neden <span className="text-blue-600">KiloTakip</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Kilo verme yolculuğunuzda size yardımcı olacak güçlü özellikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 animate-fade-in border-0 shadow-soft"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
