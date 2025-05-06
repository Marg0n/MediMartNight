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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { IOrderDB } from "@/types/order"

// Props interface
interface PendingVsTotalPieChartProps {
  orders: IOrderDB[];
}

const chartConfig = {
  PENDING: {
    label: "Pending Deliveries",
    color: "#facc15",
  },
  OTHER: {
    label: "Other Orders",
    color: "#3b82f6",
  },
} satisfies ChartConfig

export function PendingVsTotalPieChart({ orders }: PendingVsTotalPieChartProps) {
  const id = "pie-pending-total"
  const [activeMonth, setActiveMonth] = React.useState("")

  const monthlyStats: Record<string, { PENDING: number; TOTAL: number }> = {}

  orders.forEach((order) => {
    const date = new Date(order.createdAt as string)
    const monthKey = date.toLocaleString("default", { month: "long", year: "numeric" })

    if (!monthlyStats[monthKey]) {
      monthlyStats[monthKey] = { PENDING: 0, TOTAL: 0 }
    }

    monthlyStats[monthKey].TOTAL += 1
    if (order.shippingStatus === "PENDING") {
      monthlyStats[monthKey].PENDING += 1
    }
  })

  const chartData = Object.entries(monthlyStats).map(([month, stats]) => ({
    month,
    ...stats,
  }))

  const pieData = React.useMemo(() => {
    const selected = chartData.find((item) => item.month === activeMonth)
    if (!selected) return []
    return [
      {
        name: "Pending Deliveries",
        value: selected.PENDING,
        fill: chartConfig.PENDING.color,
      },
      {
        name: "Other Orders",
        value: selected.TOTAL - selected.PENDING,
        fill: chartConfig.OTHER.color,
      },
    ]
  }, [activeMonth, chartData])

  React.useEffect(() => {
    if (chartData.length > 0) {
      setActiveMonth(chartData[0].month)
    }
  }, [chartData])

  const activeIndex = React.useMemo(
    () => chartData.findIndex((item) => item.month === activeMonth),
    [activeMonth, chartData]
  )

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
            {chartData.map((item) => (
              <SelectItem key={item.month} value={item.month}>
                {item.month}
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
              activeShape={(props: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={(props.outerRadius || 0) + 10} />
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
                          {pieData[0]?.value}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Pending
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
