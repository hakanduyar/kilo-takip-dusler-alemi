
import { DashboardContainer } from '@/components/dashboard/DashboardContainer';

interface DashboardPageProps {
  onLogout: () => void;
}

export const DashboardPage = ({ onLogout }: DashboardPageProps) => {
  return <DashboardContainer onLogout={onLogout} />;
};
