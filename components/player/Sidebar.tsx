'use client'

import { cn } from "@/lib/utils"
import { CalendarCheck, Home, LayoutDashboard, Loader2, LogOut, MenuIcon, Settings, Tickets, Upload, Users } from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Dialog, DialogContent } from "../ui/dialog"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"

export default function Sidebar() {
    const pathname = usePathname()
    const session = useSession()

    const [loading, setLoading] = useState(false)
    const [sheetOpen, setSheetOpen] = useState(false)

    const handleLogout = async () => {
        setLoading(true)
        await signOut({ redirect: true, callbackUrl: '/' })
        setLoading(false)
    }

    return (
        <>
            <div className='h-screen w-80 bg-[#1F1F1F] text-white flex flex-col items-center justify-between pt-12 pb-6 max-lg:hidden'>
                <div className="flex flex-col items-center justify-center gap-4 w-full">
                    <Image
                        src='/images/logo.svg'
                        alt='Carriers Logo'
                        width={122}
                        height={30}
                        className='ml-2'
                    />
                    <div className="flex flex-col gap-2 items-center justify-center">
                        <div className="flex w-[99px] h-[99px] rounded-full overflow-hidden">
                            <Image
                                src='/images/placeholder.jpg'
                                width={99}
                                height={99}
                                alt='Profile Picture'
                            />
                        </div>
                        {session.data?.user?.name}
                    </div>
                    <div className="flex gap-3 flex-col w-full px-2">
                        <Link href='/dashboard/home' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/home' && 'sidebar-selected')}>
                            <div className="flex-[0.25]">
                                <Home size={20} />
                            </div>
                            <div className="flex-1 flex items-start text-left">
                                HomePage
                            </div>
                        </Link>
                        <Link href='/dashboard/upload' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/upload' && 'sidebar-selected')}>
                            <div className="flex-[0.25]">
                                <Upload size={20} />
                            </div>
                            <div className="flex-1 flex items-start text-left">
                                Upload
                            </div>
                        </Link>
                        <Link href='/dashboard' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard' && 'sidebar-selected')}>
                            <div className="flex-[0.25]">
                                <LayoutDashboard size={20} />
                            </div>
                            <div className="flex-1 flex items-start text-left">
                                Statistics
                            </div>
                        </Link>
                        <Link href='/dashboard/clips' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/clips' && 'sidebar-selected')}>
                            <div className="flex-[0.25]">
                                <Tickets size={20} />
                            </div>
                            <div className="flex-1 flex items-start text-left">
                                Clips
                            </div>
                        </Link>
                        <Link href='/dashboard/tasks' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/tasks' && 'sidebar-selected')}>
                            <div className="flex-[0.25]">
                                <CalendarCheck size={20} />
                            </div>
                            <div className="flex-1 flex items-start text-left">
                                Tasks
                            </div>
                        </Link>
                        <Link href='/dashboard/settings' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/settings' && 'sidebar-selected')}>
                            <div className="flex-[0.25]">
                                <Settings size={20} />
                            </div>
                            <div className="flex-1 flex items-start text-left">
                                Settings
                            </div>
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col text-sm p-4 mr-auto ml-6 gap-1 items-start justify-end w-[180px] h-[180px] rounded-[31px] bg-gradient-to-tr from-[#2E2E48] from-20% to-[#FA3737]'>
                    <Image
                        src='/images/manageTeam.svg'
                        width={42}
                        height={42}
                        alt='team'
                    />
                    <p>Manage the team</p>
                    <p className='text-white/40'>Increase your speed with more members</p>
                </div>
                <div onClick={handleLogout} className="flex items-center justify-start px-12 w-full text-lg font-semibold gap-5 text-[#C66060] cursor-pointer">
                    <LogOut size={24} stroke='#C66060' />
                    Logout
                </div>
            </div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="lg:hidden ml-4 mt-4 absolute z-[10]" asChild>
                    <MenuIcon stroke='#fff' />
                </SheetTrigger>
                <SheetContent side='left' className='block lg:hidden w-80 h-dvh bg-[#000] shadow-lg min-h-screen p-0'>
                    <div className='bg-[#1F1F1F] text-white flex flex-col items-center justify-between w-full h-full pt-6 pb-6'>
                        <div className="flex flex-col items-center justify-start gap-4 w-full max-h-[65%]">
                            <Image
                                src='/images/logo.svg'
                                alt='Carriers Logo'
                                width={100}
                                height={30}
                                className='ml-2'
                            />
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <div className="flex w-[60px] h-[60px] rounded-full overflow-hidden">
                                    <Image
                                        src='/images/placeholder.jpg'
                                        width={60}
                                        height={60}
                                        alt='Profile Picture'
                                    />
                                </div>
                                {session.data?.user?.name}
                            </div>
                            <div className="flex gap-3 flex-col w-full px-2 max-h-[60%] overflow-auto">
                                <Link href='/dashboard/home' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/home' && 'sidebar-selected')}>
                                    <div className="flex-[0.25]">
                                        <Home size={20} />
                                    </div>
                                    <div className="flex-1 flex items-start text-left">
                                        HomePage
                                    </div>
                                </Link>
                                <Link href='/dashboard/upload' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/upload' && 'sidebar-selected')}>
                                    <div className="flex-[0.25]">
                                        <Upload size={20} />
                                    </div>
                                    <div className="flex-1 flex items-start text-left">
                                        Upload
                                    </div>
                                </Link>
                                <Link href='/dashboard' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard' && 'sidebar-selected')}>
                                    <div className="flex-[0.25]">
                                        <LayoutDashboard size={20} />
                                    </div>
                                    <div className="flex-1 flex items-start text-left">
                                        Statistics
                                    </div>
                                </Link>
                                <Link href='/dashboard/clips' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/clips' && 'sidebar-selected')}>
                                    <div className="flex-[0.25]">
                                        <Tickets size={20} />
                                    </div>
                                    <div className="flex-1 flex items-start text-left">
                                        Clips
                                    </div>
                                </Link>
                                <Link href='/dashboard/tasks' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/tasks' && 'sidebar-selected')}>
                                    <div className="flex-[0.25]">
                                        <CalendarCheck size={20} />
                                    </div>
                                    <div className="flex-1 flex items-start text-left">
                                        Tasks
                                    </div>
                                </Link>
                                <Link href='/dashboard/settings' className={cn('flex items-center justify-center gap-8 w-full py-3 px-10 text-sm', pathname === '/dashboard/settings' && 'sidebar-selected')}>
                                    <div className="flex-[0.25]">
                                        <Settings size={20} />
                                    </div>
                                    <div className="flex-1 flex items-start text-left">
                                        Settings
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className='flex flex-col text-xs p-4 mr-auto ml-6 mb-2 gap-1 items-start justify-end w-[140px] h-[140px] rounded-[31px] bg-gradient-to-tr from-[#2E2E48] from-20% to-[#FA3737]'>
                            <Image
                                src='/images/manageTeam.svg'
                                width={35}
                                height={35}
                                alt='team'
                            />
                            <p>Manage the team</p>
                            <p className='text-white/40'>Increase your speed with more members</p>
                        </div>
                        <div onClick={handleLogout} className="flex items-center justify-start pl-12 w-full mb-12 text-lg font-semibold gap-5 text-[#C66060] cursor-pointer">
                            <LogOut size={24} stroke='#C66060' />
                            Logout
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
            <Dialog open={loading}>
                <DialogContent className='flex items-center justify-center bg-transparent border-none outline-none'>
                    <Loader2 className='animate-spin' size={42} color="#5E1F3C" />
                </DialogContent>
            </Dialog>
        </>
    )
}