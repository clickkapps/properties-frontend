import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Sample Data
const data = [
  { name: "8", views: 8, percentage: "3.7%" },
  { name: "51", views: 51, percentage: "23.3%" },
  { name: "26", views: 26, percentage: "11.9%" },
  { name: "92", views: 92, percentage: "42.0%" },
  { name: "42", views: 42, percentage: "19.2%" },
];

// Custom X-Axis Tick Formatter
const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  const item = data.find((d) => d.name === payload.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={10} textAnchor="middle" fontSize={14} fontWeight="bold">
        {payload.value}
      </text>
      <text x={0} y={15} dy={10} textAnchor="middle" fontSize={12} fill="gray">
        {item?.percentage}
      </text>
    </g>
  );
};

const PropertyViewChart = () => {
  return (
    <Card className="container mx-auto w-full p-6">
      <CardHeader>
        <CardTitle>Property View</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            {/* Horizontal Grid Lines */}
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            {/* Custom X-Axis with Numbers and Percentages */}
            <XAxis dataKey="name" tick={<CustomXAxisTick />} />

            {/* Y-Axis */}
            <YAxis />

            {/* Tooltip */}
            <Tooltip />

            {/* Bar Chart */}
            <Bar dataKey="views" fill="#4F46E5" radius={[50, 50, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PropertyViewChart;
