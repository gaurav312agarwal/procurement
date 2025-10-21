import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";

interface BarChartProps {
  title: string;
  data: any[];
  dataKeys: { key: string; color: string; name?: string }[];
  xAxisKey: string;
  stacked?: boolean;
}

export const BarChart = ({ title, data, dataKeys, xAxisKey, stacked = false }: BarChartProps) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">{title}</div>
      
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--popover))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {dataKeys.map((dk) => (
            <Bar 
              key={dk.key}
              dataKey={dk.key} 
              fill={dk.color}
              name={dk.name || dk.key}
              stackId={stacked ? 'stack' : undefined}
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};
