'use client'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
}

export default function MobileMenu() {
    const [open, setOpen] = useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {open ? <X /> : <Menu />}
            </PopoverTrigger>
            <PopoverContent className='w-screen p-0 flex flex-col rounded-none divide-y divide-gray-200 bg-white'>
                <Link className='py-4 px-2' href='/'>الرئيسية</Link>
                <Link className='py-4 px-2' href='/?tab=services'>الخدمات</Link>
                {/* <Link className='py-4 px-2' href='/coach-sign-up'>Become a coach</Link>
                <Link className='py-4 px-2' href='/player-sign-up'>Become a player</Link> */}
            </PopoverContent>
        </Popover>
    )
}