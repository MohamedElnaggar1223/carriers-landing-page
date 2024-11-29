'use client'
import Image from "next/image";
import { useRef } from "react";

export default function OurServices({ tab }: { tab?: string }) 
{
    const ref = useRef<HTMLDivElement>(null)

    if(tab === 'services' && ref.current) ref.current.scrollIntoView({ behavior: 'smooth' })

    return (
        <section ref={ref} className="flex flex-col items-center relative min-h-screen w-full text-white gap-20 py-24">
            <p className='text-2xl lg:text-4xl font-bold text-white font-mulish text-center'>
                Our services
            </p>
            <p className='font-mulish text-lg font-light text-[#7D7987] max-w-[952px] text-center'>We provide to you a progressive esports coaching through a website. It offers performance analysis, highlight reviews with notes.</p>
            <div className='flex gap-6 items-center justify-center max-lg:flex-wrap relative w-full'>
                <div className='flex flex-col gap-4 items-center justify-start w-[316px] h-[313px] p-6 rounded-[20px] bg-[#2C2B2B]'>
                    <div className='flex flex-col gap-6 items-center justify-start'>
                        <Image
                            src='/images/analysis.svg'
                            width={99}
                            height={102}
                            alt='Analysis' 
                        />
                        <p className='font-mulish text-2xl font-bold text-white text-center'>Game Analysis</p>
                    </div>
                    <p className='font-mulish text-base font-light text-[#C6C6C6] text-left'>Displaying strengths, weaknesses, and areas for improvement through a comprehensive dashboard</p>
                </div>
                <div className='flex flex-col gap-4 items-center justify-start w-[316px] h-[313px] p-6 rounded-[20px] bg-[#2C2B2B]'>
                    <div className='flex flex-col gap-3 items-center justify-start'>
                        <Image
                            src='/images/highlights.svg'
                            width={120}
                            height={113}
                            alt='Highlights' 
                        />
                        <p className='font-mulish text-2xl font-bold text-white text-center'>Highlights</p>
                    </div>
                    <p className='font-mulish text-base font-light text-[#C6C6C6] text-left'>Allowing coaches to review game footage, write notes at specific moments, and create highlights for players to watch</p>
                </div>
                <div className='flex flex-col gap-4 items-center justify-start w-[316px] h-[313px] p-6 rounded-[20px] bg-[#2C2B2B]'>
                    <div className='flex flex-col gap-6 items-center justify-start'>
                        <Image
                            src='/images/tasks.svg'
                            width={99}
                            height={102}
                            alt='Tasks' 
                        />
                        <p className='font-mulish text-2xl font-bold text-white text-center'>Tasks</p>
                    </div>
                    <p className='font-mulish text-base font-light text-[#C6C6C6] text-left'>Coaches assign tasks to players, who can track and mark them as completed.</p>
                </div>
                <Image
                    src='/images/dots.svg'
                    width={131}
                    height={115}
                    alt='Dots' 
                    className='absolute -bottom-[115px] right-2'
                />
            </div>
        </section>
    )   
}