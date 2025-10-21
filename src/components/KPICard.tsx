import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  target?: number;
  subtitle?: string;
  status?: 'positive' | 'negative' | 'neutral';
  onClick?: () => void;
}

export const KPICard = ({ 
  title, 
  value, 
  unit = '', 
  trend, 
  target, 
  subtitle,
  status = 'neutral',
  onClick 
}: KPICardProps) => {
  const getStatusColor = () => {
    if (status === 'positive') return 'border-success/50 hover:border-success';
    if (status === 'negative') return 'border-error/50 hover:border-error';
    return 'border-warning/50 hover:border-warning';
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    return trend > 0 ? (
      <TrendingUp className="h-4 w-4 text-success" />
    ) : (
      <TrendingDown className="h-4 w-4 text-error" />
    );
  };

  return (
    <div 
      className={cn(
        "dashboard-card cursor-pointer",
        getStatusColor()
      )}
      onClick={onClick}
    >
      <div className="dashboard-card-header">{title}</div>
      
      <div className="flex items-baseline gap-2 mb-2">
        <span className="kpi-value">{value}</span>
        <span className="text-lg text-muted-foreground">{unit}</span>
      </div>

      {subtitle && (
        <div className="text-sm text-muted-foreground mb-2">{subtitle}</div>
      )}

      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
        {trend !== undefined && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={cn(
              "text-sm font-medium",
              trend > 0 ? "text-success" : "text-error"
            )}>
              {Math.abs(trend)}%
            </span>
          </div>
        )}
        
        {target && (
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <AlertCircle className="h-3 w-3" />
            <span>Target: {target}{unit}</span>
          </div>
        )}
      </div>
    </div>
  );
};
