import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className='flex max-md:flex-col w-full px-8 lg:px-36 relative overflow-hidden'>
            <div className='flex flex-col flex-1 gap-8 items-start justify-between py-8'>
                <div className='flex flex-col gap-8 items-start'>
                    <div className="flex flex-col gap-0.5">
                        <p className='font-baloo text-3xl text-white font-bold'>Carriers</p>
                        <p className='max-w-[496px] font-light text-white'>اختبر شخصيتك مجانًا لاكتشاف عميلك المثالي، واحصل على تحليل مجاني لمهاراتك.ابدأ رحلتك نحو الاحتراف الآن!</p>
                    </div>
                    <div className='flex gap-4 flex-col'>
                        <p className='font-medium text-lg text-white'>Language</p>
                        <select defaultValue='en' className='bg-transparent border-x-0 border-t-0 border-b border-white text-[#F5FFE6] text-base py-2 min-w-[184px]'>
                            <option value='en'>English</option>
                        </select>
                    </div>
                </div>
                <p className='font-light text-white text-sm'>© 2025. All rights reserved.</p>
            </div>
            <div className='flex justify-between items-center p-6 gap-4 flex-1 divide-x divide-[#FA373730] bg-[#484D431A] relative z-10 bg-opacity-20 backdrop-blur-lg'>
                <div className='flex flex-col items-start gap-4 flex-1 justify-start h-full'>
                    <Link href='#' className='text-white'>About</Link>
                    <Link href='#' className='text-white'>Help Center</Link>
                </div>
                <div className='flex flex-col items-start gap-12 flex-1 pl-4 md:pl-12 justify-start'>
                    <div className='flex flex-col items-start gap-4'>
                        {/* <Link href='#' className='text-white flex gap-4 items-center justify-center text-center'>
                            <Image
                                src='/images/twitch.svg'
                                width={24}
                                height={24}
                                alt='twitch' 
                            />
                            Twitch
                        </Link> */}
                        <Link href='https://www.instagram.com/carriers.sa?igsh=OWpxb21ieWtzY3Vt&utm_source=qr' target='_blank' className='text-white flex gap-4 items-center justify-center text-center'>
                            <Image
                                src='/images/ig.svg'
                                width={24}
                                height={24}
                                alt='ig'
                            />
                            Instagram
                        </Link>
                        <Link href='https://x.com/Carriers_sa' target='_blank' className='text-white flex gap-4 items-center justify-center text-center'>
                            <Image
                                src='/images/twitter.svg'
                                width={24}
                                height={24}
                                alt='twitter'
                            />
                            Twitter
                        </Link>
                        {/* <Link href='#' className='text-white flex gap-4 items-center justify-center text-center'>
                            <Image
                                src='/images/yt.svg'
                                width={24}
                                height={24}
                                alt='yt' 
                            />
                            YouTube
                        </Link> */}
                    </div>
                    <div className='flex flex-col items-start gap-4'>
                        <Link href='#' className='text-white'>Contact Us</Link>
                        <Link href='/privacy-policy' className='text-white'>Privacy Policy</Link>
                        <Link href='/terms-and-conditions' className='text-white'>Terms & Conditions</Link>
                    </div>
                </div>
                <Image
                    src='/images/triangle.svg'
                    width={72}
                    height={72}
                    alt='Triangle'
                    className='absolute right-0 top-0 z-10 border-none'
                />
            </div>
            <Image
                src='/images/redshape.svg'
                width={160}
                height={160}
                alt='Red Shape'
                className='absolute -right-5 lg:right-16 bottom-0 z-[1] border-none'
            />
        </footer>
    )
}