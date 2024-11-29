import Sidebar from "@/components/player/Sidebar";
import StatisticsLoading from "@/components/player/StatisticsLoading";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LayoutDashboard({ children }: { children: React.ReactNode }) {
    const session = await getSession()

    if (!session) return redirect('/')

    return (
        <section className='flex w-full min-h-screen' key={Math.random()}>
            <Sidebar />
            <main className='flex-1'>
                <Suspense fallback={<StatisticsLoading />}>
                    {children}
                </Suspense>
            </main>
        </section>
    )
}