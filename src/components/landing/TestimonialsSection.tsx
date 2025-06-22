
import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';

export const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Ayşe Demir",
      role: "Öğretmen",
      content: "KiloTakip sayesinde 3 ayda 12 kilo verdim! Haftalık planlama özelliği gerçekten çok yararlı. Artık hedeflerime odaklanabiliyorum.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Mehmet Yılmaz",
      role: "Mühendis",
      content: "Uygulamanın analiz özellikleri harika! İlerlemeyi görsel olarak takip etmek motivasyonumu artırıyor. Herkese tavsiye ederim.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Fatma Öz",
      role: "Doktor",
      content: "Hastalarıma da öneriyorum. Bilimsel yaklaşımı ve kullanım kolaylığı mükemmel. Kilo verme süreci hiç bu kadar kolay olmamıştı.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Can Kaya",
      role: "Sporcu",
      content: "Antrenman programımla paralel giden kilo takibi için mükemmel bir araç. Detaylı raporları çok beğeniyorum.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Zeynep Kılıç",
      role: "Diyetisyen",
      content: "Müşterilerimle birlikte kullanıyoruz. Takip kolaylığı ve raporlama sistemi profesyonel çalışmalar için ideal.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Ali Çelik",
      role: "İş Adamı",
      content: "Yoğun iş temposu içinde bile kolayca kullanabiliyorum. Basit arayüzü ve etkili takip sistemi mükemmel.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            Kullanıcılarımız Ne Diyor?
          </h2>
          <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Binlerce mutlu kullanıcının deneyimleri
          </p>
        </div>

        {/* Tilted Cards Grid - Dummyforms Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer animate-fade-in group
                ${index % 3 === 0 ? 'rotate-1 hover:rotate-0' : 
                  index % 3 === 1 ? '-rotate-1 hover:rotate-0' : 
                  'rotate-2 hover:rotate-0'} 
                hover:scale-105 hover:-translate-y-2`}
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => setCurrentTestimonial(index)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  "{testimonial.content.substring(0, 120)}..."
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Testimonial */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl max-w-4xl mx-auto animate-scale-in">
          <CardContent className="p-8 md:p-12 text-center">
            <Quote className="h-12 w-12 text-blue-600 mx-auto mb-6 opacity-50" />
            <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-medium">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img 
                src={testimonials[currentTestimonial].image} 
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="text-left">
                <div className="font-semibold text-gray-900 text-lg">
                  {testimonials[currentTestimonial].name}
                </div>
                <div className="text-gray-600">
                  {testimonials[currentTestimonial].role}
                </div>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
