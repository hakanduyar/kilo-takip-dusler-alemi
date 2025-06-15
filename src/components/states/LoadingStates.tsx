
import { EnhancedSkeleton } from '@/components/ui/enhanced-skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const PageLoading = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
    <div className="text-center space-y-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto" />
      <h2 className="text-xl font-semibold text-gray-900">Yükleniyor...</h2>
      <p className="text-gray-600">Lütfen bekleyin</p>
    </div>
  </div>
);

export const DashboardLoading = () => (
  <div className="container-max container-padding py-8 space-y-8">
    <div className="animate-fade-in">
      <EnhancedSkeleton variant="text" lines={2} height="60px" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
          <CardHeader>
            <EnhancedSkeleton variant="text" width="60%" />
          </CardHeader>
          <CardContent>
            <EnhancedSkeleton variant="default" height="80px" />
            <EnhancedSkeleton variant="text" lines={2} className="mt-4" />
          </CardContent>
        </Card>
      ))}
    </div>
    
    <Card className="animate-fade-in" style={{animationDelay: '0.5s'}}>
      <CardHeader>
        <EnhancedSkeleton variant="text" width="40%" />
      </CardHeader>
      <CardContent>
        <EnhancedSkeleton variant="card" height="300px" />
      </CardContent>
    </Card>
  </div>
);

export const WeeklyPlanLoading = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="animate-fade-in" style={{animationDelay: `${i * 0.1}s`}}>
          <CardContent className="p-6">
            <EnhancedSkeleton variant="circle" className="mx-auto mb-4" />
            <EnhancedSkeleton variant="text" lines={2} />
          </CardContent>
        </Card>
      ))}
    </div>
    
    <Card className="animate-fade-in" style={{animationDelay: '0.4s'}}>
      <CardHeader>
        <EnhancedSkeleton variant="text" width="30%" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <EnhancedSkeleton variant="circle" width="40px" height="40px" />
              <div className="flex-1 space-y-2">
                <EnhancedSkeleton variant="text" width="70%" />
                <EnhancedSkeleton variant="text" width="50%" />
              </div>
              <EnhancedSkeleton variant="button" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export const ChartLoading = () => (
  <Card className="animate-fade-in">
    <CardHeader>
      <EnhancedSkeleton variant="text" width="40%" />
    </CardHeader>
    <CardContent>
      <EnhancedSkeleton variant="card" height="400px" />
    </CardContent>
  </Card>
);

export const ButtonLoading = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center space-x-2">
    <Loader2 className="h-4 w-4 animate-spin" />
    <span>{children}</span>
  </div>
);

export const TableLoading = ({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, j) => (
          <EnhancedSkeleton key={j} variant="text" />
        ))}
      </div>
    ))}
  </div>
);
