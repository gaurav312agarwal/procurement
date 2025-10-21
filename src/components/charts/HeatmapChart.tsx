import { cn } from "@/lib/utils";

interface HeatmapChartProps {
  title: string;
  data: { region: string; compliance: number; suppliers: number }[];
}

export const HeatmapChart = ({ title, data }: HeatmapChartProps) => {
  const getHeatColor = (compliance: number) => {
    if (compliance >= 95) return 'bg-success/80';
    if (compliance >= 85) return 'bg-chart-2/60';
    if (compliance >= 75) return 'bg-warning/60';
    return 'bg-error/60';
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">{title}</div>
      
      <div className="grid grid-cols-3 gap-3 mt-4">
        {data.map((item) => (
          <div 
            key={item.region}
            className={cn(
              "p-4 rounded-lg border border-border hover:scale-105 transition-transform cursor-pointer",
              getHeatColor(item.compliance)
            )}
          >
            <div className="text-sm font-medium mb-2">{item.region}</div>
            <div className="text-2xl font-bold">{item.compliance}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              {item.suppliers} suppliers
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mt-6 text-xs">
        <span className="text-muted-foreground">Compliance Rate:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-error/60" />
          <span>&lt;75%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning/60" />
          <span>75-85%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-chart-2/60" />
          <span>85-95%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/80" />
          <span>&gt;95%</span>
        </div>
      </div>
    </div>
  );
};
