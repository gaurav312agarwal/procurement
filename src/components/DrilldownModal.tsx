import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BarChart } from "./charts/BarChart";
import { LineChart } from "./charts/LineChart";
import { DonutChart } from "./charts/DonutChart";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface DrilldownModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  data: any[];
  level: number;
  onNextLevel?: (item: string) => void;
  maxLevel: number;
  chartType?: 'bar' | 'line' | 'donut';
}

export const DrilldownModal = ({ 
  open, 
  onClose, 
  title, 
  data, 
  level, 
  onNextLevel,
  maxLevel,
  chartType = 'bar'
}: DrilldownModalProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const getChartConfig = () => {
    if (data.length === 0) return null;
    
    const firstItem = data[0];
    const keys = Object.keys(firstItem).filter(k => k !== 'name' && typeof firstItem[k] === 'number');
    
    if (chartType === 'donut' && 'touchless' in firstItem) {
      return {
        type: 'donut',
        data: data.map(item => [
          { name: `${item.name} - Touchless`, value: item.touchless },
          { name: `${item.name} - Manual`, value: item.manual }
        ]).flat()
      };
    }

    const colorMap: Record<string, string> = {
      value: 'hsl(var(--neon-cyan))',
      target: 'hsl(var(--neon-orange))',
      avgDays: 'hsl(var(--neon-yellow))',
      returnRate: 'hsl(var(--neon-cyan))',
      costOfCapital: 'hsl(var(--neon-orange))',
      netBenefit: 'hsl(var(--neon-green))',
      EDI: 'hsl(var(--neon-cyan))',
      OCR: 'hsl(var(--neon-purple))',
      Portal: 'hsl(var(--neon-orange))',
      Manual: 'hsl(var(--chart-5))',
      touchless: 'hsl(var(--neon-green))',
      manual: 'hsl(var(--neon-orange))',
      rate: 'hsl(var(--neon-cyan))',
      volume: 'hsl(var(--neon-purple))',
      compliance: 'hsl(var(--neon-green))',
      priceMismatch: 'hsl(var(--neon-purple))',
      missingPO: 'hsl(var(--neon-orange))',
      qtyVariance: 'hsl(var(--neon-cyan))',
      taxError: 'hsl(var(--neon-yellow))',
      other: 'hsl(var(--chart-5))',
      opportunities: 'hsl(var(--neon-yellow))',
      negotiated: 'hsl(var(--neon-orange))',
      realized: 'hsl(var(--neon-green))',
      dpoChange: 'hsl(var(--neon-cyan))',
      cashImpact: 'hsl(var(--neon-green))',
      count: 'hsl(var(--neon-cyan))',
      median: 'hsl(var(--neon-orange))'
    };

    return {
      type: chartType,
      dataKeys: keys.map(key => ({
        key,
        color: colorMap[key] || 'hsl(var(--chart-1))',
        name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')
      })),
      xAxisKey: 'name'
    };
  };

  const chartConfig = getChartConfig();

  const handleItemClick = (item: any) => {
    if (level < maxLevel && onNextLevel) {
      setSelectedItem(item.name);
      onNextLevel(item.name);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {title} 
            <span className="text-sm text-muted-foreground">
              (Level {level} of {maxLevel})
            </span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {chartConfig && chartConfig.type === 'donut' && (
            <DonutChart title="" data={chartConfig.data} />
          )}
          
          {chartConfig && chartConfig.type === 'bar' && (
            <div className="cursor-pointer" onClick={() => data[0] && handleItemClick(data[0])}>
              <BarChart
                title=""
                data={data}
                dataKeys={chartConfig.dataKeys}
                xAxisKey={chartConfig.xAxisKey}
                stacked={chartConfig.dataKeys.length > 3}
              />
            </div>
          )}

          {chartConfig && chartConfig.type === 'line' && (
            <LineChart
              title=""
              data={data}
              dataKeys={chartConfig.dataKeys}
              xAxisKey={chartConfig.xAxisKey}
            />
          )}
          
          {data.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No data available for this drilldown
            </div>
          )}

          {level < maxLevel && data.length > 0 && (
            <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Click on any item to drill down to Level {level + 1}
                </div>
                <ChevronRight className="h-5 w-5 text-primary" />
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end gap-2">
            {level > 1 && (
              <Button variant="outline" onClick={onClose} className="border-border">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
            <Button onClick={onClose} className="bg-primary hover:bg-primary/90">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
