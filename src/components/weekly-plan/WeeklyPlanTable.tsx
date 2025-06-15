
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { WeekData } from '@/types/weekly-plan';

interface WeeklyPlanTableProps {
  weeklyData: WeekData[];
  actualWeights: { [week: number]: string };
  onWeightUpdate: (week: number, weight: string) => void;
  startDate: string;
}

export const WeeklyPlanTable = ({ 
  weeklyData, 
  actualWeights, 
  onWeightUpdate, 
  startDate 
}: WeeklyPlanTableProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ahead':
        return <Badge variant="default" className="bg-green-500 text-white">Hedefin Önünde</Badge>;
      case 'on-track':
        return <Badge variant="secondary" className="bg-blue-500 text-white">Hedefte</Badge>;
      case 'behind':
        return <Badge variant="destructive">Hedefin Gerisinde</Badge>;
      default:
        return <Badge variant="outline">Bekliyor</Badge>;
    }
  };

  const getWeekDate = (weekNumber: number) => {
    const start = new Date(startDate);
    const weekDate = new Date(start.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);
    return weekDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold">Hafta</TableHead>
            <TableHead className="font-semibold">Tarih</TableHead>
            <TableHead className="font-semibold">Hedef Kilo</TableHead>
            <TableHead className="font-semibold">Hedef Değişim</TableHead>
            <TableHead className="font-semibold">Gerçek Kilo</TableHead>
            <TableHead className="font-semibold">Gerçek Değişim</TableHead>
            <TableHead className="font-semibold">Durum</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {weeklyData.map((week, index) => (
            <TableRow key={week.week} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
              <TableCell className="font-medium">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {week.week}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {getWeekDate(week.week)}
              </TableCell>
              <TableCell className="font-medium">
                {week.targetWeight} kg
              </TableCell>
              <TableCell className={week.targetChange < 0 ? 'text-green-600' : 'text-blue-600'}>
                {week.targetChange > 0 ? '+' : ''}{week.targetChange} kg
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  placeholder="Kilo girin"
                  value={actualWeights[week.week] || ''}
                  onChange={(e) => onWeightUpdate(week.week, e.target.value)}
                  className="w-24 h-8 text-sm"
                  step="0.1"
                  min="30"
                  max="300"
                />
              </TableCell>
              <TableCell>
                {week.actualChange !== null && (
                  <span className={week.actualChange < 0 ? 'text-green-600 font-medium' : 'text-blue-600 font-medium'}>
                    {week.actualChange > 0 ? '+' : ''}{week.actualChange} kg
                  </span>
                )}
              </TableCell>
              <TableCell>
                {getStatusBadge(week.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
