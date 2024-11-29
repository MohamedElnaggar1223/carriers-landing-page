import Image from "next/image";
import Link from "next/link";
import { getSession } from "@/lib/session";
import LogoutBtn from "./LogoutBtn";
import MobileMenu from "./MobileMenu";

export default async function Header() {
    const session = await getSession()

    return (
        <header className='flex items-center justify-between w-full absolute top-0 px-2 lg:px-12 gap-4 py-4 text-white z-20'>
            <Image
                src='/images/logo.svg'
                alt='Carriers Logo'
                width={122}
                height={30}
                className='ml-2'
            />
            <div className='flex items-center gap-12 justify-between max-md:hidden'>
                {!session && <Link href='/'>Home</Link>}
                {!session && <Link href='/?tab=services'>Services</Link>}
                {/* {!session && <Link href='/coach-sign-up'>Become a coach</Link>}
                {!session && <Link href='/player-sign-up'>Become a player</Link>} */}
            </div>
            <div className='flex w-1'></div>
            {/* <div className="flex gap-4">
                {!session ? <Link className='text-main-red max-md:hidden' href='/sign-in'>Log in</Link> : `Welcome, ${session.user?.name}`}
                {session && <LogoutBtn />}
            </div> */}
            <div className='md:hidden'>
                {!session && <MobileMenu />}
            </div>
        </header>
    )
}