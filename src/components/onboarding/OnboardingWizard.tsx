
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Target, BarChart3, Calendar, Trophy, CheckCircle } from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    title: "KiloTakip'e Hoş Geldiniz! 🎉",
    description: "Sağlıklı yaşam yolculuğunuza başlamaya hazır mısınız?",
    content: "Bu uygulama ile kilo hedeflerinizi belirleyebilir, haftalık ilerlemenizi takip edebilir ve başarılarınızı analiz edebilirsiniz.",
    icon: Target,
    color: "from-blue-500 to-purple-500"
  },
  {
    title: "Hedef Belirleme",
    description: "Mevcut kilonuzu, hedef kilonuzu ve program sürenizi belirleyin",
    content: "Uygulama sizin için haftalık hedefler oluşturacak ve ilerlemenizi takip edecek.",
    icon: Target,
    color: "from-green-500 to-blue-500"
  },
  {
    title: "Haftalık Takip",
    description: "Her hafta kilonuzu girin ve ilerlemenizi görün",
    content: "Renkli durumlar ile hedefinizde olup olmadığınızı anında görebilirsiniz.",
    icon: Calendar,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "İstatistikler ve Grafikler",
    description: "Detaylı analiz ve görsel raporlar",
    content: "İlerlemenizi grafikler, trendler ve detaylı istatistikler ile analiz edin.",
    icon: BarChart3,
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Başarı Sistemi",
    description: "Motivasyonunuzu yüksek tutun",
    content: "Başarılarınızı rozetler ile ödüllendirin ve ilerleme skorunuzu takip edin.",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500"
  }
];

export const OnboardingWizard = ({ onComplete }: OnboardingWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleting(true);
      setTimeout(() => {
        localStorage.setItem('kiloTakipOnboardingCompleted', 'true');
        onComplete();
      }, 1500);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = onboardingSteps[currentStep];
  const Icon = currentStepData.icon;
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  if (isCompleting) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 flex items-center justify-center z-50">
        <div className="text-center animate-scale-in">
          <div className="mb-6">
            <CheckCircle className="h-20 w-20 text-white mx-auto animate-bounce" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Hazırsınız! 🚀</h2>
          <p className="text-xl text-white/90">Kilo takip yolculuğunuz başlıyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full mx-auto glass-card">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="bg-white/10 text-white border-white/20">
              Adım {currentStep + 1} / {onboardingSteps.length}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onComplete}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              Atla
            </Button>
          </div>
          <Progress value={progress} className="h-2 mb-6" />
          
          <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${currentStepData.color} mx-auto mb-4 flex items-center justify-center animate-scale-in`}>
            <Icon className="h-10 w-10 text-white" />
          </div>
          
          <CardTitle className="text-3xl font-bold text-white mb-2 animate-fade-in">
            {currentStepData.title}
          </CardTitle>
          <p className="text-xl text-white/90 animate-fade-in" style={{animationDelay: '0.1s'}}>
            {currentStepData.description}
          </p>
        </CardHeader>
        
        <CardContent className="px-8 pb-8">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white/10 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <p className="text-white/90 text-lg leading-relaxed text-center">
              {currentStepData.content}
            </p>
          </div>
          
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Geri</span>
            </Button>
            
            <Button
              onClick={handleNext}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border border-white/30"
            >
              <span>{currentStep === onboardingSteps.length - 1 ? 'Başlayalım!' : 'İleri'}</span>
              {currentStep < onboardingSteps.length - 1 && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
