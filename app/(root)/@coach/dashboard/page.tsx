import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"
import PlayerRiotId from "./player-riot-id"
import { getPlayerStats } from "@/lib/actions/player.actions"
import Statistics from "@/components/player/Statistics"

type Props = {
    searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Dashboard({ searchParams }: Props) {
    const session = await getSession()

    if (!session?.user) return redirect('/')

    const gameName = typeof searchParams.riotId === 'string' ? searchParams.riotId : undefined
    const tagLine = typeof searchParams.tag === 'string' ? searchParams.tag : undefined
    const region = typeof searchParams.region === 'string' ? searchParams.region : undefined


    if (!gameName || !tagLine || !region) return (
        <div className='flex flex-col items-center justify-center gap-16 h-screen'>
            <PlayerRiotId />
        </div>
    )

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