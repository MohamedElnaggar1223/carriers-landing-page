"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

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
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

type Props = {
    averageHeadshotsPerMatch: {
        [matchId: string]: {
            gameStartMillis: number;
            headshots: number;
        };
    }
}

const transformObject = (obj: {
    [matchId: string]: {
        gameStartMillis: number;
        headshots: number;
    };
}) => {
    return Object.entries(obj).map(([key, value]) => ({
        match: key,
        headshots: value.headshots
    }));
};

export function AverageHeadshots({ averageHeadshotsPerMatch }: Props) {
    const graphData = transformObject(averageHeadshotsPerMatch);

    console.log(graphData);

    return (
        <ChartContainer config={chartConfig} className="w-screen max-w-full h-full">
            <LineChart
                accessibilityLayer
                data={graphData}
                margin={{
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                {/* <XAxis
                    dataKey="match"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                /> */}
                {/* <YAxis
                    dataKey="headshots"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value}`}
                /> */}
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent className="bg-black text-white" hideLabel />}
                />
                <Line
                    dataKey="headshots"
                    type="linear"
                    stroke="#fff"
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ChartContainer>
    )
}
