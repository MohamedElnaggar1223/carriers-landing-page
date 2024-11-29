import Image from "next/image";
import CoachSignUpForm from "./coach-sign-up-form";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import Link from "next/link";

export default async function CoachSignUp() 
{
    const session = await getSession()

    if(session) return redirect('/')
    
    return (
        <section className="flex items-center justify-start md:justify-center h-screen max-md:flex-col max-md:overflow-hidden">
            <div className='flex items-center justify-start max-md:hidden flex-1 relative h-screen'>
                <div className="relative w-full h-full">
                    <Image
                        src='/images/Cover.png'
                        alt='Carriers Cover'
                        layout="fill"
                        objectFit="cover"
                        objectPosition="left top"
                        priority
                    />
                </div>
            </div>
            <div className='flex flex-col items-center justify-start md:h-full md:flex-1 md:py-6 px-4 md:px-8 gap-16 max-w-full max-md:py-4'>
                <div className='flex items-center justify-between gap-4 text-base font-normal w-full'>
                    <Link href='/' className='text-white flex items-center justify-center gap-1'>
                        <Image
                            src='/images/left-arrow.svg'
                            width={24}
                            height={24}
                            alt='Left Arrow'
                            className='cursor-pointer'
                        />
                        Back
                    </Link>
                    <p className='text-white'>I have an account! <Link href='/sign-in' className='text-[#C66060]'>Sign In</Link></p>
                </div>
                <CoachSignUpForm />
            </div>
        </section>
    )
}