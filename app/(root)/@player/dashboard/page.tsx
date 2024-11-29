import { getSession } from "@/lib/session"
import Player from "@/models/Player"
import { redirect } from "next/navigation"
import PlayerRiotId from "./player-riot-id"
import { connectDB } from "@/lib/mongoose"
import { getPlayerStats } from "@/lib/actions/player.actions"
import Statistics from "@/components/player/Statistics"

export default async function Dashboard() {
    const session = await getSession()

    if (!session?.user) return redirect('/')

    await connectDB()

    const playerData = await Player.findOne({ userId: session.user?.id }).lean().exec()
    const riotId = playerData?.riotId


    if (!riotId) return (
        <div className='flex flex-col items-center justify-center gap-16 h-screen'>
            <PlayerRiotId />
        </div>
    )

    const gameName = riotId.split('#')[0]
    const tagLine = riotId.split('#')[1]
    const region = playerData?.region

    const stats = await getPlayerStats(gameName, tagLine, region)

    console.log(stats)

    if (stats?.error) return (
        <div className='flex flex-col items-center justify-center gap-16 h-screen'>
            <p className='text-white text-2xl'>This player is not registered</p>
        </div>
    )

    return (
        <div className='flex flex-col items-center justify-center gap-16 h-screen'>
            <Statistics stats={stats} />
        </div>
    )
}