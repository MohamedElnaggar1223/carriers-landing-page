'use client'

import { Skeleton } from "@/components/ui/skeleton"

export default function StatisticsLoading() {
    return (
        <section className='max-h-screen w-full overflow-auto p-2 max-lg:pt-12'>
            <section className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                <div className='col-span-2 lg:col-span-3 grid grid-cols-1 xl:grid-cols-3 gap-4'>
                    <div className='flex col-span-2 flex-col gap-8 justify-between bg-[#1F1F1F] rounded-[10px] p-4'>
                        <div className='flex items-center gap-4 justify-between'>
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-6 w-40" />
                        </div>
                        <div className='flex items-center gap-4 justify-between max-lg:flex-wrap'>
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="w-28 h-28 rounded-[10px]" />
                            ))}
                        </div>
                    </div>
                    <Skeleton className="h-[300px] bg-[#1F1F1F] rounded-[10px]" />
                    <div className='flex col-span-2 flex-col gap-8 justify-between bg-[#1F1F1F] rounded-[10px] p-4'>
                        <Skeleton className="h-6 w-32" />
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-16 w-full" />
                            ))}
                        </div>
                    </div>
                    <Skeleton className="h-[300px] bg-[#1F1F1F] rounded-[10px]" />
                    <Skeleton className="h-[300px] bg-[#1F1F1F] rounded-[10px]" />
                    <div className='flex col-span-2 flex-col gap-8 justify-between bg-[#1F1F1F] rounded-[10px] p-4'>
                        <Skeleton className="h-6 w-32" />
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <Skeleton className="h-12 w-32" />
                                    <Skeleton className="h-12 w-12 rounded-full" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='col-span-2 grid grid-cols-1 gap-4'>
                    <div className='grid grid-cols-3 bg-[#1F1F1F] rounded-[10px] p-4 gap-4'>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className='max-h-24 my-auto border-l-[10px] pl-2 border-t-0 border-r-0 border-b-0 border-[#FA3737] flex flex-col gap-4 min-h-24 items-start justify-start'>
                                <Skeleton className="h-6 w-20" />
                                <Skeleton className="h-8 w-16" />
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col gap-2 bg bg-[#1F1F1F] rounded-[10px] p-4 col-span-1 items-center lg:row-span-4 max-h-[720px]'>
                        <div className="flex w-full items-center justify-between gap-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                        <div className='flex flex-col w-full gap-4 items-center justify-evenly h-full'>
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className='flex w-full items-center justify-between gap-4'>
                                    <div className='flex flex-col items-start justify-center gap-1'>
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-[75px] w-[133px]" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <Skeleton className="h-8 w-16" />
                                        <Skeleton className="h-6 w-24" />
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

