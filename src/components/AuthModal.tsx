
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'login' | 'register';
  onSuccess: () => void;
}

export const AuthModal = ({ isOpen, onClose, mode, onSuccess }: AuthModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signUp, signIn } = useAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      toast({
        title: "Hata",
        description: "Geçerli bir email adresi girin.",
        variant: "destructive"
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Hata",
        description: "Şifre en az 6 karakter olmalıdır.",
        variant: "destructive"
      });
      return;
    }

    if (mode === 'register' && password !== confirmPassword) {
      toast({
        title: "Hata",
        description: "Şifreler eşleşmiyor.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'register') {
        const { error, message } = await signUp(email, password);
        
        if (error) {
          toast({
            title: "Kayıt Hatası",
            description: error,
            variant: "destructive"
          });
        } else if (message) {
          toast({
            title: "Kayıt Başarılı!",
            description: message,
          });
          resetForm();
          onClose();
        } else {
          toast({
            title: "Kayıt Başarılı!",
            description: "Hesabınız başarıyla oluşturuldu.",
          });
          onSuccess();
        }
      } else {
        const { error } = await signIn(email, password);
        
        if (error) {
          toast({
            title: "Giriş Hatası",
            description: error,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Hoş geldin!",
            description: "Başarıyla giriş yaptınız.",
          });
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto bg-white border-0 shadow-2xl rounded-2xl overflow-hidden">
        {/* Gradient Header */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        
        <DialogHeader className="relative z-10 pt-8 pb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="text-2xl font-bold text-white">
              <span className="text-white">K</span>
              <span className="text-yellow-300">T</span>
            </div>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-white">
            {mode === 'login' ? 'Hoş Geldin!' : 'Aramıza Katıl!'}
          </DialogTitle>
          <p className="text-white/80 text-sm text-center mt-2">
            {mode === 'login' 
              ? 'Kilo takip yolculuğuna devam et' 
              : 'Yeni bir başlangıç için hazır mısın?'
            }
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-6 pt-2">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium text-sm flex items-center">
              <Mail className="w-4 h-4 mr-2 text-blue-600" />
              E-posta Adresi
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-base rounded-xl transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700 font-medium text-sm flex items-center">
              <Lock className="w-4 h-4 mr-2 text-blue-600" />
              Şifre
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="En az 6 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12 text-base rounded-xl transition-all duration-200"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-gray-100 rounded-lg"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
              </Button>
            </div>
          </div>

          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700 font-medium text-sm flex items-center">
                <Lock className="w-4 h-4 mr-2 text-blue-600" />
                Şifre Tekrar
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Şifrenizi tekrar girin"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500 pr-12 text-base rounded-xl transition-all duration-200"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-gray-100 rounded-lg"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
                </Button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'login' ? 'Giriş yapılıyor...' : 'Hesap oluşturuluyor...'}
              </>
            ) : (
              mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur'
            )}
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                {mode === 'login' ? 'Hesabın yok mu?' : 'Zaten hesabın var mı?'}
              </span>
            </div>
          </div>

          {/* Toggle Mode Button */}
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              const newMode = mode === 'login' ? 'register' : 'login';
              resetForm();
              // Parent component'te mode'u değiştirmek için
              onClose();
              setTimeout(() => {
                // Yeni modal'ı açmak için parent'a sinyal gönder
                const event = new CustomEvent('toggleAuthMode', { detail: newMode });
                window.dispatchEvent(event);
              }, 100);
            }}
            className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-medium transition-colors duration-200"
          >
            {mode === 'login' ? 'Yeni hesap oluştur' : 'Giriş yap'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
