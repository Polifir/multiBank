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
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart with a legend"

const chartData = [
  { month: "January", desktop: 186, mobile: 80, aBank: 900, },
  { month: "February", desktop: 305, mobile: 200, aBank: 700, },
  { month: "March", desktop: 237, mobile: 120, aBank: 800, },
  { month: "April", desktop: 73, mobile: 190, aBank: 200, },
  { month: "May", desktop: 209, mobile: 130, aBank: 300, },
  { month: "June", desktop: 214, mobile: 140, aBank: 500, },
]

const chartConfig = {
  desktop: {
    label: "Vbank",
    color: "blue",
  },
  mobile: {
    label: "BBank",
    color: "green",
  },
  aBank: {
    label: "ABank",
    color: "yellow",
  },
}
export function ChartBarStacked() {
  return (
    <Card style={{height: '100%', display: 'flex', justifyContent: 'center'}}>
      <CardHeader>
        <CardTitle>График стобец</CardTitle>
        <CardDescription>Период</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="aBank"
              stackId="a"
              fill="yellow"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          тайтл<TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
         описание
        </div>
      </CardFooter>
    </Card>
  )
}
