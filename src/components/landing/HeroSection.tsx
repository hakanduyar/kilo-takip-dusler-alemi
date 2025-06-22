import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Rocket, BarChart3, FileText } from 'lucide-react';
interface HeroSectionProps {
  onAuthClick: (mode: 'login' | 'register') => void;
}
export const HeroSection = ({
  onAuthClick
}: HeroSectionProps) => {
  return <section className="relative py-12 lg:py-20 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-50 to-yellow-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300/40 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300/40 rounded-full blur-3xl animate-float" style={{
      animationDelay: '2s'
    }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-yellow-300/30 rounded-full blur-3xl animate-float" style={{
      animationDelay: '4s'
    }} />
      
      {/* Floating Icons */}
      <div className="absolute top-20 left-20 text-6xl animate-bounce-gentle" style={{
      animationDelay: '0s'
    }}>
        <Rocket className="w-12 h-12 text-blue-500" />
      </div>
      <div className="absolute top-32 right-32 text-6xl animate-bounce-gentle" style={{
      animationDelay: '1s'
    }}>
        <BarChart3 className="w-10 h-10 text-purple-500" />
      </div>
      <div className="absolute bottom-32 left-32 text-6xl animate-bounce-gentle" style={{
      animationDelay: '2s'
    }}>
        <FileText className="w-11 h-11 text-yellow-600" />
      </div>
      <div className="absolute top-1/2 right-20 text-6xl animate-bounce-gentle" style={{
      animationDelay: '3s'
    }}>
        <Rocket className="w-9 h-9 text-green-500 rotate-45" />
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto -mt-7">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
            Kilo verme yolculuğunuzu başlatın
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
            <span className="block">Kilo Takibinizi</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Kolaylaştırın
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
            Akıllı takip sistemi ile kilo verme hedeflerinize ulaşın. 
            Haftalık planlarınızı oluşturun, ilerlemenizi görün ve motivasyonunuzu koruyun.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in" style={{
          animationDelay: '0.6s'
        }}>
            <Button size="lg" onClick={() => onAuthClick('register')} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg group">
              Ücretsiz Başlayın
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 px-8 py-4 text-lg group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Demo İzleyin
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in" style={{
          animationDelay: '0.8s'
        }}>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
              <div className="text-gray-600">Mutlu Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">500K+</div>
              <div className="text-gray-600">Takip Edilen Kilo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Başarı Oranı</div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};