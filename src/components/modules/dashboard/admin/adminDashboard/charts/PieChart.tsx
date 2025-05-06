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

interface PendingVsTotalPieChartProps {
  orders: IOrderDB[];
}

// Chart config
const chartConfig = {
  PENDING: {
    label: "Pending Orders",
    color: "#facc15", // yellow
  },
  PROCESSING: {
    label: "Processing Orders",
    color: "#22c55e", // green
  },
  SHIPPED: {
    label: "Shipped Orders",
    color: "#3b82f6", // blue
  },
  DELIVERED: {
    label: "Delivered Orders",
    color: "#10b981", // emerald
  },
  CANCELLED: {
    label: "Cancelled Orders",
    color: "#ef4444", // red
  },
} satisfies ChartConfig;

export function PendingVsTotalPieChart({
  orders,
}: PendingVsTotalPieChartProps) {
  const id = "pie-pending-total";

  const [activeMonth, setActiveMonth] = React.useState("");
  const [activeSlice, setActiveSlice] = React.useState<string | null>(null);

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

  orders.forEach((order) => {
    const date = new Date(order.createdAt as string);
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

  const chartData = Object.entries(monthlyStats)
    .map(([month, stats]) => ({
      month,
      ...stats,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateA.getTime() - dateB.getTime();
    });

  // Set current month as default
  React.useEffect(() => {
    const currentMonth = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
    setActiveMonth(currentMonth);
  }, []);

  // Pie chart values for current month
  const pieData = React.useMemo(() => {
    const selected = chartData.find((item) => item.month === activeMonth);
    if (!selected) {
      return [];
    }
    return [
      {
        name: "Pending Orders",
        value: selected.PENDING,
        fill: chartConfig.PENDING.color,
      },
      {
        name: "Processing Orders",
        value: selected.PROCESSING,
        fill: chartConfig.PROCESSING.color,
      },
      {
        name: "Shipped Orders",
        value: selected.SHIPPED,
        fill: chartConfig.SHIPPED.color,
      },
      {
        name: "Delivered Orders",
        value: selected.DELIVERED,
        fill: chartConfig.DELIVERED.color,
      },
      {
        name: "Cancelled Orders",
        value: selected.CANCELLED,
        fill: chartConfig.CANCELLED.color,
      },
    ];
  }, [activeMonth, chartData]);

  const activeIndex = React.useMemo(
    () => pieData.findIndex((item) => item.name === activeSlice),
    [activeSlice, pieData],
  );

  const hasData = pieData.length > 0 && pieData.some((item) => item.value > 0);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Pending vs Total Orders</CardTitle>
          <CardDescription>Monthly breakdown</CardDescription>
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
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                onMouseEnter={(_, index) =>
                  setActiveSlice(pieData[index]?.name ?? null)
                }
                onMouseLeave={() => setActiveSlice(null)}
                activeShape={(props: PieSectorDataItem) => (
                  <g>
                    <Sector
                      {...props}
                      outerRadius={(props.outerRadius || 0) + 10}
                    />
                    <Sector
                      {...props}
                      outerRadius={(props.outerRadius || 0) + 25}
                      innerRadius={(props.outerRadius || 0) + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      const total = pieData.reduce(
                        (sum, item) => sum + item.value,
                        0,
                      );
                      const label = activeSlice || "Total Orders";
                      const value = activeSlice
                        ? pieData.find((item) => item.name === activeSlice)
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
