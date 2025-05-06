/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type CustomerStats = {
  ordersPlaced: number
  pendingDeliveries: number
  delivered: number
}

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
]


//* Color config using chart CSS tokens
const chartConfig: ChartConfig = {
  placed: { label: "Orders Placed", color: "hsl(var(--chart-1))" },
  pending: { label: "Pending Deliveries", color: "hsl(var(--chart-2))" },
  delivered: { label: "Delivered", color: "hsl(var(--chart-3))" },
}

export function PieChartComponent({ stats }: { stats: CustomerStats }) {
  const id = "customer-orders-pie"
  const chartData = chartDataFromStats(stats)

  const [activeLabel, setActiveLabel] = React.useState(chartData[0].label)
  const activeIndex = chartData.findIndex((item) => item.label === activeLabel)

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Order Overview</CardTitle>
          <CardDescription>Summary of your order activity</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer
          id={id}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
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
                setActiveLabel(entry.label)
              }}
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
                          {chartData[activeIndex].value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-sm"
                        >
                          {chartData[activeIndex].label}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}