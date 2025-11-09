"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { fetchSummary } from "@/service/summary"

export const description = "A donut chart with text"



export function ChartPieDonutText() {

  
    const { data: summary} = useQuery({
    queryKey: ['summary'],
    queryFn: fetchSummary,
    });

   const {abank, vbank, sbank } = summary.balance_by_bank
  const totalVisitors = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  }, [])

  const chartData = [
  { browser: "А банк", visitors: abank, fill: "#EC4899" },
  { browser: "В банк", visitors: vbank, fill: "#3B82F6" },
  { browser: "С банк", visitors: sbank, fill: "#10B981" },

]

const chartConfig = {
  chrome: {
    label: "aBank",
    color: "#EC4899",
  },
  safari: {
    label: "bBank",
    color: "#3B82F6",
  },
  firefox: {
    label: "cBank",
    color: "#10B981",
  }
}

  return (
    <Card className="relative bg-linear-to-br from-balck-500/10 to-black-500/10">
      <CardHeader className="items-center pb-0">
        <CardTitle>Счёт по всем банкам</CardTitle>
        <CardDescription>Период</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
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
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Рублей
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Какая-то доп. инфа заголовок
        </div>
        <div className="text-muted-foreground leading-none">
          Какая-то доп. инфа текст
        </div>
      </CardFooter>
    </Card>
  )
}
