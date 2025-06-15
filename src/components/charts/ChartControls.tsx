
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, BarChart3, TrendingUp, Activity } from 'lucide-react';

interface ChartControlsProps {
  chartType: 'line' | 'bar' | 'area';
  onChartTypeChange: (type: 'line' | 'bar' | 'area') => void;
  timeRange: 'all' | 'last4' | 'last8';
  onTimeRangeChange: (range: 'all' | 'last4' | 'last8') => void;
  onExport: () => void;
}

export const ChartControls = ({
  chartType,
  onChartTypeChange,
  timeRange,
  onTimeRangeChange,
  onExport
}: ChartControlsProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex gap-2">
        <Button
          variant={chartType === 'line' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChartTypeChange('line')}
          className="flex items-center gap-2"
        >
          <TrendingUp className="h-4 w-4" />
          Çizgi
        </Button>
        <Button
          variant={chartType === 'bar' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChartTypeChange('bar')}
          className="flex items-center gap-2"
        >
          <BarChart3 className="h-4 w-4" />
          Bar
        </Button>
        <Button
          variant={chartType === 'area' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onChartTypeChange('area')}
          className="flex items-center gap-2"
        >
          <Activity className="h-4 w-4" />
          Alan
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <Select value={timeRange} onValueChange={(value: any) => onTimeRangeChange(value)}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Zaman aralığı" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Program</SelectItem>
            <SelectItem value="last4">Son 4 Hafta</SelectItem>
            <SelectItem value="last8">Son 8 Hafta</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export PNG
        </Button>
      </div>
    </div>
  );
};
