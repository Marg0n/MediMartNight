"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { IOrderDB } from "@/types/order"

// Props interface
interface BarChartComponentProps {
  orders: IOrderDB[];
}

export function BarChartComponent({ orders }: BarChartComponentProps) {
  // Group and compute revenue and total sold per month
  const monthlyData: Record<string, { revenue: number; totalSold: number }> = {}

  orders.forEach((order) => {
    const date = new Date(order.createdAt as string)
    const month = date.toLocaleString("default", { month: "long" })

    if (!monthlyData[month]) {
      monthlyData[month] = { revenue: 0, totalSold: 0 }
    }

    if (order.paymentStatus === "PAID") {
      monthlyData[month].revenue += order.totalPrice
    }

    monthlyData[month].totalSold += order.totalPrice
  })

  const chartData = Object.entries(monthlyData).map(([month, stats]) => ({
    month,
    revenue: stats.revenue,
    totalSold: stats.totalSold,
  }))

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "var(--chart-1)", // Blue color from global.css
    },
    totalSold: {
      label: "Total Sold",
      color: "var(--chart-2)", // Green color from global.css
    },
  } satisfies ChartConfig

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Total Sold</CardTitle>
        <CardDescription>Grouped by Month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="revenue" fill="var(--chart-1)" radius={4} />
            <Bar dataKey="totalSold" fill="var(--chart-2)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Based on current order data
        </div>
      </CardFooter>
    </Card>
  )
}