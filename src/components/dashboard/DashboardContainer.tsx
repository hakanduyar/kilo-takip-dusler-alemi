
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { DashboardBackground } from '@/components/dashboard/DashboardBackground';
import { OnboardingWizard } from '@/components/onboarding/OnboardingWizard';
import { UserProfile } from '@/components/profile/UserProfile';
import { NotificationSystem } from '@/components/notifications/NotificationSystem';
import { AccessibilityProvider } from '@/components/accessibility/AccessibilityProvider';
import { ErrorBoundary } from '@/components/error/ErrorBoundary';
import { PageLoading } from '@/components/states/LoadingStates';
import { useDashboard } from '@/hooks/useDashboard';

interface DashboardContainerProps {
  onLogout: () => void;
}

export const DashboardContainer = ({ onLogout }: DashboardContainerProps) => {
  const {
    isLoading,
    showOnboarding,
    showProfile,
    setShowProfile,
    weightProgram,
    user,
    handleOnboardingComplete,
    handleWeightEntryComplete,
    handleProfileSave,
    calculateProgress,
    getWeeklyTarget,
    getLatestWeight
  } = useDashboard();

  if (isLoading) {
    return <PageLoading />;
  }

  if (showOnboarding) {
    return <OnboardingWizard onComplete={handleOnboardingComplete} />;
  }

  return (
    <AccessibilityProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-50 to-yellow-50 relative overflow-hidden">
          <DashboardBackground />

          <div className="relative z-10">
            <DashboardHeader 
              userEmail={user.email} 
              onLogout={onLogout}
              onProfileClick={() => setShowProfile(true)}
              notificationComponent={
                <NotificationSystem 
                  weightProgram={weightProgram} 
                />
              }
            />

            <main className="bg-white/60 backdrop-blur-sm min-h-screen">
              <DashboardContent
                weightProgram={weightProgram}
                onWeightEntryComplete={handleWeightEntryComplete}
                calculateProgress={calculateProgress}
                getWeeklyTarget={getWeeklyTarget}
                getLatestWeight={getLatestWeight}
              />
            </main>
          </div>

          {showProfile && (
            <UserProfile
              onSave={handleProfileSave}
              onClose={() => setShowProfile(false)}
            />
          )}
        </div>
      </ErrorBoundary>
    </AccessibilityProvider>
  );
};
