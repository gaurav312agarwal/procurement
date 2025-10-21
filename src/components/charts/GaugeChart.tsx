import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface GaugeChartProps {
  value: number;
  target: number;
  title: string;
}

export const GaugeChart = ({ value, target, title }: GaugeChartProps) => {
  const data = [
    { name: 'achieved', value: value },
    { name: 'remaining', value: Math.max(0, target - value) }
  ];

  const COLORS = ['hsl(var(--chart-2))', 'hsl(var(--secondary))'];

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">{title}</div>
      
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="text-center -mt-8">
        <div className="kpi-value text-4xl">{value}%</div>
        <div className="kpi-label mt-1">of {target}% target</div>
      </div>
    </div>
  );
};
