"use client"
import { RadialBar, RadialBarChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A radial chart"

interface IRadialData {
    name: string,
    value: number,
}

const generateGradient = (index: number, total: number) => {
    const hue = (index * 360) / total
    return `hsl(${hue}, 70%, 60%)`
}

const generateChartConfig = (data: IRadialData[]) => {
    const config: any = {}
    
    data.forEach((item, index) => {
        const hue = (index * 360) / data.length
        config[item.name] = {
            label: item.name, // Здесь указываем name как метку
            color: `hsl(${hue}, 70%, 60%)`
        }
    })
    
    return config
}

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background border rounded-lg p-3 shadow-lg">
                <p className="font-medium">{payload[0].payload.name}</p>
                <p className="text-muted-foreground">
                    {payload[0].value} руб.
                </p>
            </div>
        )
    }
    return null
}


export function ChartRadialSimple({ data }: { data: IRadialData[] }) {
  const sortedData = [...data].sort((a, b) => a.value - b.value)

    const chartConfig = generateChartConfig(sortedData)

    const dataFormatted = sortedData.map((e, i) => {
        return {
            ...e,
            fill: generateGradient(i, sortedData.length)
        }
    })

    return (
        <Card className="flex flex-col" style={{ height: '100%' }}>
            <CardHeader className="items-center pb-0">
                <CardTitle>Категории трат</CardTitle>
                <CardDescription>Какой-то период</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart data={dataFormatted} innerRadius={30} outerRadius={110}>
                        <ChartTooltip
                            cursor={false}
                            content={<CustomTooltip />}
                        />
                        <RadialBar dataKey="value" background />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                    Дополнительная информация
                </div>
                <div className="text-muted-foreground leading-none">
                    Актуально на текущий период
                </div>
            </CardFooter>
        </Card>
    )
}