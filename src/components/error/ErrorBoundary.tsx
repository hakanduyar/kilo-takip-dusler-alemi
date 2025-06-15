
import React, { Component, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // In production, you might want to send this to a logging service
    this.logErrorToService(error, errorInfo);
  }

  logErrorToService = (error: Error, errorInfo: React.ErrorInfo) => {
    // This would typically send to a service like Sentry, LogRocket, etc.
    const errorData = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Store locally for now
    const errors = JSON.parse(localStorage.getItem('kiloTakipErrors') || '[]');
    errors.push(errorData);
    localStorage.setItem('kiloTakipErrors', JSON.stringify(errors.slice(-10))); // Keep last 10 errors
  };

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Bir Hata Oluştu
              </CardTitle>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600">
                Üzgünüz, beklenmedik bir hata oluştu. Lütfen sayfayı yenilemeyi deneyin.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-red-50 p-3 rounded-md text-sm">
                  <summary className="cursor-pointer font-medium text-red-800">
                    Hata Detayları (Geliştirici Modu)
                  </summary>
                  <pre className="mt-2 text-red-700 whitespace-pre-wrap">
                    {this.state.error.message}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
              
              <div className="flex flex-col space-y-2">
                <Button onClick={this.handleRetry} className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Tekrar Dene</span>
                </Button>
                
                <Button variant="outline" onClick={this.handleGoHome} className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Ana Sayfaya Dön</span>
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                Sorun devam ederse, uygulamayı yeniden başlatmayı deneyin.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for error handling in functional components
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: string) => {
    console.error('Error caught by handler:', error);
    
    // Show user-friendly error message
    const event = new CustomEvent('showErrorToast', {
      detail: {
        title: 'Bir hata oluştu',
        description: 'İşlem tamamlanamadı. Lütfen tekrar deneyin.',
        variant: 'destructive'
      }
    });
    window.dispatchEvent(event);
  };

  return { handleError };
};
