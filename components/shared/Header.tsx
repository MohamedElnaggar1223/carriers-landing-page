import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

export default async function Header() {

    return (
        <header className='grid grid-cols-3 w-full absolute top-0 px-2 lg:px-12 gap-4 py-4 text-white z-20'>
            <Image
                src='/images/logo.svg'
                alt='Carriers Logo'
                width={122}
                height={30}
                className='ml-2 col-span-1'
            />
            <div className='flex items-center gap-12 justify-center max-md:hidden col-span-1'>
                <Link href='/?tab=services'>الخدمات</Link>
                <Link href='/'>الرئيسية</Link>
                {/* <Link href='/coach-sign-up'>Become a coach</Link>}
                <Link href='/player-sign-up'>Become a player</Link>} */}
            </div>
            <div className='flex col-span-1 w-1'></div>
            {/* <div className="flex gap-4">
                {!session ? <Link className='text-main-red max-md:hidden' href='/sign-in'>Log in</Link> : `Welcome, ${session.user?.name}`}
                {session && <LogoutBtn />}
            </div> */}
            <div className='md:hidden'>
                <MobileMenu />
            </div>
        </header>
    )
}