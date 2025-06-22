
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface CTASectionProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}

export const CTASection = ({ onAuthClick }: CTASectionProps) => {
  const benefits = [
    "Ücretsiz hesap oluşturma",
    "Sınırsız kilo takibi",
    "Haftalık plan oluşturma",
    "Detaylı analiz raporları",
    "Mobil uygulama desteği"
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Kilo Verme Yolculuğunuzu
            <span className="block text-yellow-300">Bugün Başlatın!</span>
          </h2>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Binlerce kişi hedeflerine ulaştı. Sıra sizde! 
            Ücretsiz hesabınızı oluşturun ve farkı hissedin.
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start space-x-2 text-white">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              size="lg"
              onClick={() => onAuthClick('register')}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold group shadow-xl"
            >
              Şimdi Ücretsiz Başlayın
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => onAuthClick('login')}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              Zaten Hesabım Var
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-blue-200 text-sm animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p>✓ Kredi kartı gerekmez • ✓ Anında kurulum • ✓ 7/24 destek</p>
          </div>
        </div>
      </div>
    </section>
  );
};
