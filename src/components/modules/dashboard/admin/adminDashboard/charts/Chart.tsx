/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//* correct type for chart props
interface IChartDataItem {
  PAID: number;
  UNPAID: number;
  REFUNDED: number;
  date: string;
}

interface ChartProps {
  chartData: IChartDataItem[];
}

//* chart config
const chartConfig = {
  PAID: {
    label: "Paid",
    color: "#22c55e", //? green
  },
  UNPAID: {
    label: "Unpaid",
    color: "#f97316", //? orange
  },
  REFUNDED: {
    label: "Refunded",
    color: "#ef4444", //? red
  },
};
export function Chart({ chartData }: ChartProps) {
  
  //* time state
  const [timeRange, setTimeRange] = React.useState("90d");

  // const referenceDate = new Date(chartData[chartData.length - 1]?.date); //? Last date in dataset with chronologically
  
  const referenceDate = new Date(); //? todays date

  //* Get the most recent date in the dataset
  // const referenceDate = new Date(
  //   Math.max(...chartData.map((item) => new Date(item.date).getTime()))
  // );


  let daysToSubtract = 90; //? default
  if (timeRange === "30d") {
    daysToSubtract = 30;
  } else if (timeRange === "7d") {
    daysToSubtract = 7;
  }

  // const startDate = new Date(referenceDate);
  // startDate.setDate(startDate.getDate() - daysToSubtract);

  //* Adjust date by subtracting days & Calculate the start date based on the time range
  const startDate = new Date(referenceDate); //? Create a new instance of referenceDate
  startDate.setDate(referenceDate.getDate() - daysToSubtract); //? `getDate()` to subtract days



  //* Filter data based on the selected time range
  const filteredData = chartData.filter((item) => {
    
    //* get the date from the item
    const date = new Date(item.date);  

    
    //* Ensure the item date is within the selected range
    return date >= startDate && date <= referenceDate;; //? Keep data from startDate up to referenceDate
  });


  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Orders by Payment Status</CardTitle>
          <CardDescription>
            Showing counts of PAID / UNPAID / REFUNDED orders
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value: any) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <YAxis />
            <Tooltip
              formatter={(value: any, name: any) => [`${value}`, name]}
              labelFormatter={(value: any) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            {/* Replaced old keys with PAID, UNPAID, REFUNDED */}
            <Area
              dataKey="PAID"
              stackId="1"
              stroke="#22c55e" // green
              fill="#bbf7d0"
              type="monotone"
            />
            <Area
              dataKey="UNPAID"
              stackId="1"
              stroke="#f97316" // orange
              fill="#fed7aa"
              type="monotone"
            />
            <Area
              dataKey="REFUNDED"
              stackId="1"
              stroke="#ef4444" // red
              fill="#fecaca"
              type="monotone"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
