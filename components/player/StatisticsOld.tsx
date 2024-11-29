'use client'

import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import { ProcessedValorantStats } from "@/lib/types/valorant.types"
import { PieChart, Pie, Cell } from 'recharts';

interface StatsProps {
    stats: ProcessedValorantStats
}

export default function Statistics({ stats }: StatsProps) {
    const formatTime = (ms: number) => {
        const hours = Math.floor(ms / (1000 * 60 * 60))
        return `${hours}h Playtime`
    }

    const winLossData = [
        { name: 'Wins', value: stats.totalWins },
        { name: 'Losses', value: stats.totalLosses }
    ];
    const COLORS = ['#4ade80', '#ef4444'];

    return (
        <div className="bg-zinc-950 text-white p-8 min-h-screen w-full">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center gap-6 text-sm text-gray-400">
                    <h2>Competitive</h2>
                    <div>{formatTime(stats.totalPlaytime)}</div>
                    <div>{stats.totalMatches} matches</div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Main Stats */}
                        <Card className="bg-zinc-900/50 p-6">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="text-center">
                                    <div className="mb-2">
                                        <div className="w-16 h-16 bg-purple-500 rounded-full mx-auto flex items-center justify-center">
                                            {/* Replace with actual rank icon */}
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">Current Rank</div>
                                    <div className="text-sm text-white">{stats.currentRank.rank}</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl text-white font-bold">{stats.kdRatio}</div>
                                    <div className="text-xs text-gray-400">K/D ratio</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl text-white font-bold">{stats.winPercentage}%</div>
                                    <div className="text-xs text-gray-400">Win %</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl text-white font-bold">{stats.headshotPercentage}%</div>
                                    <div className="text-xs text-gray-400">Headshot %</div>
                                </div>
                            </div>
                        </Card>

                        {/* Top Agents */}
                        <Card className="bg-zinc-900/50 p-6">
                            <h3 className="text-base font-medium mb-4 text-white">Top Agents</h3>
                            <div className="space-y-4">
                                {stats.topAgents?.map((agent) => (
                                    <div key={agent.agentId} className="flex items-center gap-4 text-white">
                                        <div className="w-12 h-12 relative">
                                            <Image
                                                src={`/Characters/${agent.agentId.toUpperCase()}_small.png`}
                                                alt={agent.agentName}
                                                fill
                                                className="rounded-lg object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 text-white">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{agent.matches} Matches</span>
                                                <span className="text-gray-400">{agent.headshotAccuracy}%</span>
                                            </div>
                                            <div className="flex h-2">
                                                <div
                                                    className="bg-green-500"
                                                    style={{ width: `${(agent.wins / agent.matches) * 100}%` }}
                                                />
                                                <div
                                                    className="bg-red-500"
                                                    style={{ width: `${(agent.losses / agent.matches) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Roles */}
                        <Card className="bg-zinc-900/50 p-6 text-white">
                            <h3 className="text-base text-white font-medium mb-4">Roles</h3>
                            <div className="space-y-4">
                                {stats.roleStats?.map((role) => (
                                    <div key={role.role} className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center">
                                            <Image
                                                src={`/CharacterRoles/${role.role}.png`}
                                                alt={role.role}
                                                width={48}
                                                height={48}
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-center mb-1">
                                                <div>
                                                    <div className="text-sm text-white">{role.role}</div>
                                                    <div className="text-xs text-gray-400">
                                                        {role.wins}W/{role.losses}L - KDA {role.kdaRatio}
                                                    </div>
                                                </div>
                                                <span className="text-green-500">WR {role.winPercentage}%</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Win/Loss Chart */}
                        <Card className="bg-zinc-900/50 p-6">
                            <div className="flex items-center gap-8">
                                <div className="w-32 h-32 relative">
                                    <PieChart width={128} height={128}>
                                        <Pie
                                            data={winLossData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={40}
                                            outerRadius={60}
                                            paddingAngle={4}
                                            dataKey="value"
                                        >
                                            {winLossData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                    <div className="absolute inset-0 flex items-center justify-center text-sm">
                                        <div className="text-center text-white">
                                            <div>{stats.totalWins} W</div>
                                            <div>{stats.totalLosses} L</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-sm text-gray-400">Wins</div>
                                        <div className="text-2xl text-white">{stats.totalWins}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Kills</div>
                                        <div className="text-2xl text-white">{stats.totalKills}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400">Deaths</div>
                                        <div className="text-2xl text-white">{stats.totalDeaths}</div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Other Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <Card className="bg-zinc-900/50 p-4">
                                <div className="text-gray-400 text-sm">Assists</div>
                                <div className="text-2xl mt-1 text-white">{stats.totalAssists}</div>
                            </Card>
                            <Card className="bg-zinc-900/50 p-4">
                                <div className="text-gray-400 text-sm">Aces</div>
                                <div className="text-2xl mt-1 text-white">{stats.totalAces}</div>
                            </Card>
                            <Card className="bg-zinc-900/50 p-4">
                                <div className="text-gray-400 text-sm">Flawless</div>
                                <div className="text-2xl mt-1 text-white">{stats.totalFlawlessRounds}</div>
                            </Card>
                        </div>

                        {/* Accuracy */}
                        <Card className="bg-zinc-900/50 p-6">
                            <h3 className="text-base font-medium mb-4">Accuracy</h3>
                            <div className="flex items-center gap-8">
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Head</span>
                                        <span>{((stats.totalHeadHits / (stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits)) * 100).toFixed(1)}%</span>
                                    </div>
                                    <Progress value={stats.totalHeadHits} max={stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits} className="h-2" />

                                    <div className="flex justify-between text-sm">
                                        <span>Body</span>
                                        <span>{((stats.totalBodyHits / (stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits)) * 100).toFixed(1)}%</span>
                                    </div>
                                    <Progress value={stats.totalBodyHits} max={stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits} className="h-2" />

                                    <div className="flex justify-between text-sm">
                                        <span>Legs</span>
                                        <span>{((stats.totalLegHits / (stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits)) * 100).toFixed(1)}%</span>
                                    </div>
                                    <Progress value={stats.totalLegHits} max={stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits} className="h-2" />
                                </div>
                            </div>
                        </Card>

                        {/* Top Maps */}
                        <Card className="bg-zinc-900/50 p-6">
                            <h3 className="text-base font-medium mb-4">Top Maps</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.topMaps?.map((map) => (
                                    <div key={map.mapId} className="relative h-24 overflow-hidden rounded-lg">
                                        <Image
                                            src={`/maps/${map.mapName.toLowerCase()}.png`}
                                            alt={map.mapName}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                                        <div className="absolute bottom-2 left-2">
                                            <div className="text-sm">{map.mapName}</div>
                                            <div className="text-xl font-bold">{map.winRate.toFixed(1)}%</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}