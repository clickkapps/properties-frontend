import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import {chartConfig, chartData} from "@/constants/shared.constants.ts";


const PropertyViewChart = () => {
  return (
    <Card className="container mx-auto w-full pt-2">
      <CardHeader>
        <CardTitle>Property Views</CardTitle>
      </CardHeader>

      <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
          </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PropertyViewChart;
