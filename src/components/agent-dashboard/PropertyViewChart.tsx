import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// Sample Data
const data = [
  { name: "8", views: 8, percentage: "3.7%" },
  { name: "51", views: 51, percentage: "23.3%" },
  { name: "26", views: 26, percentage: "11.9%" },
  { name: "92", views: 92, percentage: "42.0%" },
  { name: "42", views: 42, percentage: "19.2%" },
];

const PropertyViewChart = () => {
  return (
    <Card className="container mx-auto w-full p-6">
      <CardHeader>
        <CardTitle>Property View</CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PropertyViewChart;
