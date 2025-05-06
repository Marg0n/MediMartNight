/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IOrderDB } from "@/types/order";

type CustomerStats = {
  ordersPlaced: number;
  pendingDeliveries: number;
  delivered: number;
};

const chartDataFromStats = (stats: CustomerStats) => [
  {
    label: "Orders Placed",
    value: stats.ordersPlaced,
    fill: "hsl(220, 70%, 50%)", // blue
  },
  {
    label: "Pending Deliveries",
    value: stats.pendingDeliveries,
    fill: "hsl(45, 90%, 51%)", // yellow/orange
  },
  {
    label: "Delivered",
    value: stats.delivered,
    fill: "hsl(145, 58%, 45%)", // green
  },
];

//* Color config using chart CSS tokens
const chartConfig: ChartConfig = {
  PENDING: {
    label: "Pending Orders",
    color: "#facc15", // yellow
  },
  PROCESSING: {
    label: "Processing Orders",
    color: "#3b82f6", // blue
  },
  SHIPPED: {
    label: "Shipped Orders",
    color: "#8b5cf6", // purple
  },
  DELIVERED: {
    label: "Delivered Orders",
    color: "#22c55e", // green
  },
  CANCELLED: {
    label: "Cancelled Orders",
    color: "#ef4444", // red
  },
};

export function PieChartComponent({ orders = [] }: { orders?: IOrderDB[] }) {
  const id = "pie-chart";
  const [activeLabel, setActiveLabel] = React.useState<string | null>(null);
  const [activeMonth, setActiveMonth] = React.useState("");

  // Get all months for the current year
  const getAllMonths = () => {
    const months = [];
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i, 1);
      months.push(
        date.toLocaleDateString("en-US", { year: "numeric", month: "long" }),
      );
    }
    return months;
  };

  // Group orders by month and tally counts
  const monthlyStats: Record<
    string,
    {
      PENDING: number;
      PROCESSING: number;
      SHIPPED: number;
      DELIVERED: number;
      CANCELLED: number;
    }
  > = {};

  // Initialize all months with zero counts
  getAllMonths().forEach((month) => {
    monthlyStats[month] = {
      PENDING: 0,
      PROCESSING: 0,
      SHIPPED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };
  });

  // Only process orders if they exist
  if (Array.isArray(orders)) {
    orders.forEach((order) => {
      if (!order?.createdAt || !order?.shippingStatus) return;

      const date = new Date(order.createdAt);
      const monthKey = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      switch (order.shippingStatus) {
        case "PENDING":
          monthlyStats[monthKey].PENDING += 1;
          break;
        case "PROCESSING":
          monthlyStats[monthKey].PROCESSING += 1;
          break;
        case "SHIPPED":
          monthlyStats[monthKey].SHIPPED += 1;
          break;
        case "DELIVERED":
          monthlyStats[monthKey].DELIVERED += 1;
          break;
        case "CANCELLED":
          monthlyStats[monthKey].CANCELLED += 1;
          break;
      }
    });
  }

  const chartData = React.useMemo(() => {
    const selected = Object.entries(monthlyStats).find(
      ([month]) => month === activeMonth,
    );
    if (!selected) return [];

    const [_, stats] = selected;
    return [
      {
        label: "Pending Orders",
        value: stats.PENDING,
        fill: chartConfig.PENDING.color,
      },
      {
        label: "Processing Orders",
        value: stats.PROCESSING,
        fill: chartConfig.PROCESSING.color,
      },
      {
        label: "Shipped Orders",
        value: stats.SHIPPED,
        fill: chartConfig.SHIPPED.color,
      },
      {
        label: "Delivered Orders",
        value: stats.DELIVERED,
        fill: chartConfig.DELIVERED.color,
      },
      {
        label: "Cancelled Orders",
        value: stats.CANCELLED,
        fill: chartConfig.CANCELLED.color,
      },
    ];
  }, [activeMonth, monthlyStats]);

  // Set current month as default
  React.useEffect(() => {
    const currentMonth = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    setActiveMonth(currentMonth);
  }, []);

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.label === activeLabel),
    [activeLabel, chartData],
  );

  const hasData =
    chartData.length > 0 && chartData.some((item) => item.value > 0);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Order Overview</CardTitle>
          <CardDescription>Summary of your order activity</CardDescription>
        </div>
        <Select value={activeMonth} onValueChange={setActiveMonth}>
          <SelectTrigger className="ml-auto h-7 w-[160px] rounded-lg pl-2.5">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {getAllMonths().map((month) => (
              <SelectItem key={month} value={month}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          {hasData ? (
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                onMouseEnter={(entry, index) => {
                  setActiveLabel(entry.label);
                }}
                onMouseLeave={() => setActiveLabel(null)}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const total = chartData.reduce(
                        (sum, item) => sum + item.value,
                        0,
                      );
                      const label = activeLabel || "Total Orders";
                      const value = activeLabel
                        ? chartData.find((item) => item.label === activeLabel)
                            ?.value || 0
                        : total;

                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {value}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-sm"
                          >
                            {label}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-lg font-medium text-muted-foreground">
                No data to show!
              </p>
            </div>
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
