import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  onDrilldown: () => void;
  drilldownLevels: number;
  glowColor?: 'green' | 'cyan' | 'orange' | 'purple' | 'yellow';
}

export const ChartCard = ({ 
  title, 
  children, 
  onDrilldown, 
  drilldownLevels,
  glowColor 
}: ChartCardProps) => {
  const glowClass = glowColor ? `neon-border-${glowColor}` : '';
  
  return (
    <div className={`dashboard-card relative group ${glowClass}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="dashboard-card-header m-0">{title}</div>
        <Button
          variant="outline"
          size="sm"
          onClick={onDrilldown}
          className="border-primary/50 hover:bg-primary/10 hover:border-primary text-xs"
        >
          <Info className="h-3 w-3 mr-1" />
          Details ({drilldownLevels} levels)
        </Button>
      </div>
      
      {children}
    </div>
  );
};
