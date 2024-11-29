'use client'

import Image from "next/image"
import { ProcessedValorantStats } from "@/lib/types/valorant.types"
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Clock } from "lucide-react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { AverageHeadshots } from "./AverageHeadshots"

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
    const COLORS = ['#32D14F', '#D60004', '#C1C1C1B2'];

    return (
        <section className='max-h-screen w-full overflow-auto p-2 max-lg:pt-12'>
            <section className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                <div className='col-span-2 lg:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-4'>
                    <div className='flex col-span-2 flex-col gap-8 justify-between bg-[#1F1F1F] rounded-[10px] p-4'>
                        <div className='flex items-center gap-4 justify-between'>
                            <div className='flex flex-col gap-1 text-left items-start justify-center'>
                                <p className='text-white font-semibold text-base'>Competitive</p>
                                <span className='text-[10px] text-[#20AEF3] font-medium'>Last 30 days</span>
                            </div>
                            <div className='flex items-center justify-center gap-6'>
                                <div className='flex items-center justify-center gap-1'>
                                    <Clock stroke='#fff' className='w-4 h-4' />
                                    <span className='text-white text-sm'>{formatTime(stats.totalPlaytime)}</span>
                                </div>
                                <div className='flex items-center justify-center gap-1'>
                                    <span className='text-white text-sm'>{stats.totalMatches} matches</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 justify-between max-lg:flex-wrap'>
                            <div className='rounded-[10px] bg-[#28282880] flex items-center justify-start gap-1 flex-col w-28 h-28'>
                                <p className='text-white text-sm font-semibold mt-3'>Current Rank</p>
                                <Image
                                    src={`/Ranks/${stats.currentRank.rank.replace(" ", "_")}_Rank.png`}
                                    width={46}
                                    height={46}
                                    alt={stats.currentRank.rank}
                                />
                                <p className='text-white text-xs font-semibold'>{stats.currentRank.rank}</p>
                            </div>
                            <div className='rounded-[10px] bg-[#28282880] flex items-center justify-start gap-3 flex-col w-28 h-28'>
                                <p className='text-white text-sm font-semibold mt-3'>K/D ratio</p>
                                <p className='text-white text-4xl font-semibold'>{stats.kdRatio}</p>
                            </div>
                            <div className='rounded-[10px] bg-[#28282880] flex items-center justify-start gap-3 flex-col w-28 h-28'>
                                <p className='text-white text-sm font-semibold mt-3'>Win %</p>
                                <p className='text-white text-4xl font-semibold'>{parseFloat(stats.winPercentage).toFixed(2)}</p>
                            </div>
                            <div className='rounded-[10px] bg-[#28282880] flex items-center justify-start gap-3 flex-col w-28 h-28'>
                                <p className='text-white text-sm font-semibold mt-3'>Headshot %</p>
                                <p className='text-white text-4xl font-semibold'>{parseFloat(stats.headshotPercentage).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg bg-[#1F1F1F] rounded-[10px] p-4 max-xl:col-span-2 xl:col-span-1 items-center'>
                        <p className='text-white font-semibold text-base w-full flex items-start'>Matches</p>
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
                        <div className='flex items-center w-full border-t border-[#282828] divide-x divide-[#282828]'>
                            <div className='flex items-center justify-center gap-4 flex-1 py-2'>
                                <div className='w-2 h-2 rounded-full bg-[#32D14F]' />
                                <p className='text-white text-xs font-semibold'>Wins</p>
                            </div>
                            <div className='flex items-center justify-center gap-4 flex-1 py-2'>
                                <div className='w-2 h-2 rounded-full bg-[#D60004]' />
                                <p className='text-white text-xs font-semibold'>Loses</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex col-span-2 flex-col gap-8 justify-between bg-[#1F1F1F] rounded-[10px] p-4'>
                        <div className='flex flex-col gap-1 text-left items-start justify-center'>
                            <p className='text-white font-semibold text-base'>Top Agents</p>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow className='hover:bg-inherit border-[#282828]'>
                                    <TableHead className='text-[#87888C] text-xs text-center'>#</TableHead>
                                    <TableHead className='text-[#87888C] text-xs text-center'>Matches</TableHead>
                                    <TableHead className='text-[#87888C] text-xs text-center px-0'>Win/Loss%</TableHead>
                                    <TableHead className='text-[#87888C] text-xs text-center pl-0'>Headshot</TableHead>
                                    <TableHead className='text-[#87888C] text-xs text-center'>Best Map</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='divide-y divide-[#282828]'>
                                {stats.topAgents?.map((agent) => (
                                    <TableRow className='hover:bg-inherit border-[#282828]' key={agent.agentId}>
                                        <TableCell>
                                            <Image
                                                src={`/Characters/${agent.agentId.toUpperCase()}_small.png`}
                                                alt={agent.agentName}
                                                width={48}
                                                height={48}
                                            />
                                        </TableCell>
                                        <TableCell className='text-white text-sm text-center'>{agent.matches}</TableCell>
                                        <TableCell className='text-white text-sm text-center'>
                                            <div className='flex flex-col items-center justify-center gap-0.5 min-w-40'>
                                                <div className="flex items-center justify-between w-full">
                                                    <p className='text-white text-sm'>{agent.wins} W</p>
                                                    <p className='text-white text-sm'>{agent.losses} L</p>
                                                </div>
                                                <div className="flex h-1 rounded-[4px] overflow-hidden w-full">
                                                    <div
                                                        className="bg-[#32D14F]"
                                                        style={{ width: `${(agent.wins / agent.matches) * 100}%` }}
                                                    />
                                                    <div
                                                        className="bg-[#D60004]"
                                                        style={{ width: `${(agent.losses / agent.matches) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-white text-sm text-center'>
                                            <div className={cn('w-14 h-8 rounded-[4px] text-sm flex items-center justify-center bg-[#FCB8591F] border', parseFloat(agent.headshotAccuracy) > 60 ? 'border-[#32D14F] text-[#32D14F]' : parseFloat(agent.headshotAccuracy) > 30 ? 'border-[#FCB859] text-[#FCB859]' : 'border-[#D60004] text-[#D60004]')}>
                                                {agent.headshotAccuracy}%
                                            </div>
                                        </TableCell>
                                        <TableCell className='text-white text-sm text-center'>{agent.bestMap.mapName}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className='flex flex-col gap-2 bg bg-[#1F1F1F] rounded-[10px] p-4 max-xl:col-span-2 col-span-1 items-center'>
                        <p className='text-white font-semibold text-base w-full flex items-start'>Accuracy</p>
                        <div className='w-full flex items-center'>
                            <Image
                                src='/images/body-new.svg'
                                width={33}
                                height={80}
                                alt='Body'
                            />
                            <div className='flex flex-col items-start h-full gap-3 w-full pl-2'>
                                <div className='items-center w-full justify-between flex gap-2'>
                                    <p className='text-[#87888C] text-sm'>Head</p>
                                    <p className='text-white text-sm'>{((stats.totalHeadHits / (stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits)) * 100).toFixed(1)}%</p>
                                    <p className='text-white text-sm'>{stats.totalHeadHits} <span className='text-[#87888C]'>Hits</span></p>
                                </div>
                                <div className='items-center w-full justify-between flex gap-2'>
                                    <p className='text-[#87888C] text-sm'>Body</p>
                                    <p className='text-white text-sm'>{((stats.totalBodyHits / (stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits)) * 100).toFixed(1)}%</p>
                                    <p className='text-white text-sm'>{stats.totalBodyHits} <span className='text-[#87888C]'>Hits</span></p>
                                </div>
                                <div className='items-center w-full justify-between flex gap-2'>
                                    <p className='text-[#87888C] text-sm'>Legs</p>
                                    <p className='text-white text-sm'>{((stats.totalLegHits / (stats.totalHeadHits + stats.totalBodyHits + stats.totalLegHits)) * 100).toFixed(1)}%</p>
                                    <p className='text-white text-sm'>{stats.totalLegHits} <span className='text-[#87888C]'>Hits</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-4 w-full'>
                            <p className='text-white font-semibold text-sm w-full flex items-start'>Average Headshot</p>
                            <AverageHeadshots averageHeadshotsPerMatch={stats.averageHeadshotsPerMatch} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg bg-[#1F1F1F] rounded-[10px] p-4 col-span-1 items-center'>
                        <p className='text-white font-semibold text-base w-full flex items-start'>Roles</p>
                        <div className='w-full flex flex-col items-center justify-between gap-8'>
                            {stats.roleStats?.sort((a, b) => parseFloat(b.winPercentage) - parseFloat(a.winPercentage)).map((role) => (
                                <div key={role.role} className='flex items-center gap-4 w-full'>
                                    <div className='w-12 h-12 rounded-lg flex items-center justify-center'>
                                        <Image
                                            src={`/CharacterRoles/${role.role}.png`}
                                            alt={role.role}
                                            width={48}
                                            height={48}
                                            className='rounded-lg'
                                        />
                                    </div>
                                    <div className='flex-1'>
                                        <div className='flex justify-between items-center mb-1'>
                                            <div className='flex items-start justify-center gap-1 flex-col'>
                                                <div className='text-sm text-gray-400'>{role.role}</div>
                                                <div className='text-xs text-white '>
                                                    {role.wins}W - {role.losses}L
                                                </div>
                                                <div className='text-xs text-white '>
                                                    {role.kills}/{role.deaths}/{role.assists}
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1 items-center justify-center'>
                                                <span className={cn('font-semibold text-center', parseFloat(role.winPercentage) > 60 ? 'text-[#32D14F]' : parseFloat(role.winPercentage) > 30 ? 'text-[#FCB859]' : 'text-[#D60004]')}>
                                                    WR {parseFloat(role.winPercentage).toFixed(2)}%
                                                </span>
                                                <div className='text-xs text-gray-400'>
                                                    KDA {role.kdaRatio}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='flex col-span-2 flex-col gap-8 justify-between bg-[#1F1F1F] rounded-[10px] p-4'>
                        <p className='text-white font-semibold text-base w-full flex items-start'>Top Weapons</p>
                        <div className="flex flex-col gap-4 w-full items-center justify-between h-full">
                            {stats.topWeapons?.map((weapon) => (
                                <div key={weapon.weaponId} className='flex w-full items-center justify-between gap-4'>
                                    <Image
                                        src={`/Weapons/${weapon.weaponId.toUpperCase()}.png`}
                                        alt={weapon.weaponName}
                                        width={140}
                                        height={48}
                                    />
                                    <div className="w-20 h-w-20 relative">
                                        <PieChart width={80} height={80}>
                                            <Tooltip active={true} wrapperClassName="list-white" contentStyle={{ background: 'transparent', color: '#ffffff', border: 'none', fill: 'white', stroke: 'white' }} />
                                            <Pie
                                                data={[{ name: 'Head Hits', value: weapon.headHits }, { name: 'Leg Hits', value: weapon.legHits }, { name: 'Body Hits', value: weapon.bodyHits }]}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={25}
                                                outerRadius={40}
                                                paddingAngle={4}
                                                dataKey="value"
                                            >
                                                {[{ name: 'Head Hits', value: weapon.headHits }, { name: 'Leg Hits', value: weapon.legHits }, { name: 'Body Hits', value: weapon.bodyHits }].map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </div>
                                    <div className="flex flex-col gap-0.5">
                                        <p className='text-[#87888C] text-2xl text-center'>Kills</p>
                                        <p className='text-white text-xl text-center'>{weapon.kills}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-span-2 grid grid-cols-1 gap-4'>
                    <div className='grid grid-cols-3 bg-[#1F1F1F] rounded-[10px] p-4 gap-4'>
                        <div className='max-h-24 my-auto border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] flex flex-col gap-4 min-h-24 items-start justify-start'>
                            <p className='text-[#87888C] text-xl'>Wins</p>
                            <p className='text-white text-2xl'>{stats.totalWins}</p>
                        </div>
                        <div className='max-h-24 my-auto border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] flex flex-col gap-4 min-h-24 items-start justify-start'>
                            <p className='text-[#87888C] text-xl'>Kills</p>
                            <p className='text-white text-2xl'>{stats.totalKills}</p>
                        </div>
                        <div className='max-h-24 my-auto border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] flex flex-col gap-4 min-h-24 items-start justify-start'>
                            <p className='text-[#87888C] text-xl'>Deaths</p>
                            <p className='text-white text-2xl'>{stats.totalDeaths}</p>
                        </div>
                        <div className='max-h-24 my-auto border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] flex flex-col gap-4 min-h-24 items-start justify-start'>
                            <p className='text-[#87888C] text-xl'>Assists</p>
                            <p className='text-white text-2xl'>{stats.totalAssists}</p>
                        </div>
                        <div className='max-h-24 my-auto border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] flex flex-col gap-4 min-h-24 items-start justify-start'>
                            <p className='text-[#87888C] text-xl'>Aces</p>
                            <p className='text-white text-2xl'>{stats.totalAces}</p>
                        </div>
                        <div className='max-h-24 my-auto border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] flex flex-col gap-4 min-h-24 items-start justify-start'>
                            <p className='text-[#87888C] text-xl'>Flawless Rounds</p>
                            <p className='text-white text-2xl'>{stats.totalFlawlessRounds}</p>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 bg bg-[#1F1F1F] rounded-[10px] p-4 col-span-1 items-center lg:row-span-4 max-h-[820px]'>
                        <div className="flex w-full items-center justify-between gap-2">
                            <p className='text-white font-semibold text-base flex items-start'>Top Maps</p>
                            <p className='text-white font-semibold text-base flex items-start'>Win%</p>
                        </div>
                        <div className='flex flex-col w-full gap-4 items-center justify-evenly h-full'>
                            {stats.topMaps?.map((map) => (
                                <div key={map.mapId} className='flex w-full items-center justify-between gap-4'>
                                    <div className='flex flex-col items-start justify-center gap-1'>
                                        <p className='border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] text-[#87888C]'>{map.mapName}</p>
                                        <Image
                                            src={`/Maps/${map.id.toUpperCase()}_splash.png`}
                                            width={133}
                                            height={75}
                                            alt={map.mapId}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <p className='text-white text-2xl'>{map.winRate.toFixed(2)}%</p>
                                        <p className='text-lg text-[#87888C]'>{map.wins}W - {map.losses}L</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
