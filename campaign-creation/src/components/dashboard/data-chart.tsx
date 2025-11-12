import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { chartData } from "@/constants/event-data";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  customers: {
    label: "Customers",
    color: "#96a3be",
  },
} satisfies ChartConfig;

const DataChart = () => {
  return (
    <ChartContainer config={chartConfig} className="max-h-[200px] w-[50%]">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <Area
          accentHeight={20}
          dataKey="customers"
          type="linear"
          fillOpacity={0.4}
          className="max-w-20 max-h-20"
        />
        <defs>
          <linearGradient id="splitColor">
            <stop offset="0" stopColor="#6383c7" />
            <stop offset={7572} stopColor="#96a3be" stopOpacity={0.1} />
            <stop offset={2158} stopColor="red" stopOpacity={0.1} />
            <stop offset={1590} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>
      </AreaChart>
    </ChartContainer>
  );
};

export default DataChart;
