
export interface WeekData {
  week: number;
  targetWeight: number;
  targetChange: number;
  actualWeight: number | null;
  actualChange: number | null;
  status: 'ahead' | 'on-track' | 'behind' | 'pending';
}
