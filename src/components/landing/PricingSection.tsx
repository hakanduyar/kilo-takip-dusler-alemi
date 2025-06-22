
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';

interface PricingSectionProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export const PricingSection = ({ onAuthClick }: PricingSectionProps) => {
  const plans = [
    {
      name: "Ücretsiz",
      price: "0",
      period: "/ay",
      description: "Başlamak için mükemmel",
      features: [
        "Temel kilo takibi",
        "Haftalık plan oluşturma",
        "Temel raporlar",
        "Mobil uygulama",
        "E-posta desteği"
      ],
      popular: false,
      cta: "Ücretsiz Başla"
    },
    {
      name: "Pro",
      price: "29",
      period: "/ay",
      description: "Ciddi kilo verme için",
      features: [
        "Gelişmiş analiz ve raporlar",
        "Kişiselleştirilmiş öneriler",
        "Beslenme takibi",
        "Egzersiz planları",
        "Öncelikli destek",
        "Veri dışa aktarma",
        "Sınırsız hedef belirleme"
      ],
      popular: true,
      cta: "Pro'ya Geç"
    },
    {
      name: "Takım",
      price: "99",
      period: "/ay",
      description: "Aileler ve takımlar için",
      features: [
        "10 kişiye kadar",
        "Takım dashboard'u",
        "İlerleme karşılaştırması",
        "Grup motivasyonu",
        "Yönetici paneli",
        "API erişimi",
        "7/24 telefon desteği",
        "Özel eğitim"
      ],
      popular: false,
      cta: "Takım Planı"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Size Uygun Planı Seçin
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Her ihtiyaca uygun esnek fiyatlandırma seçenekleri
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-lg scale-105' 
                  : 'border border-gray-200 hover:border-blue-300'
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    En Popüler
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-5xl font-bold text-gray-900">₺{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-3 ${
                    plan.popular 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  onClick={() => onAuthClick('register')}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-gray-600 mb-4">Güvenilir ödeme yöntemleri</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">VISA</div>
            <div className="text-2xl font-bold text-gray-400">MasterCard</div>
            <div className="text-2xl font-bold text-gray-400">PayPal</div>
            <div className="text-2xl font-bold text-gray-400">ApplePay</div>
          </div>
        </div>
      </div>
    </section>
  );
};
