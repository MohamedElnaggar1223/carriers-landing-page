import Image from "next/image";

export default function Analytics() {
    return (
        <section className='h-max overflow-y-hidden my-32 w-full relative grid grid-cols-2 items-center max-w-[100vw] overflow-x-hidden max-md:px-4'>            <div className='blur-lg z-[-1] radial w-[720px] h-[720px] rounded-full overflow-hidden absolute -left-[11%] -top-[5%]' />
            <div className='blur-lg z-[-1] radial w-[1240px] h-[1240px] rounded-full overflow-hidden absolute -right-[25%] -top-[5%]' />
            <div className='rounded-3xl bg-[#53545E]/25 flex md:mx-6 flex-col px-4 py-4 md:px-8 md:py-12 gap-4 md:gap-20 max-h-[140px] md:max-h-[480px] h-screen w-screen col-span-1'>                <div className='flex flex-col gap-4'>
                <p className='text-white text-base xl:text-7xl font-bold'>Free Analytics!</p>
                <p className='text-white text-sm xl:text-[40px] xl:leading-[48px] font-normal'>Discover your Stats</p>
            </div>
                <button className='bg-[#F13C3C] drop-shadow-[0px_4px_4px_rgba(251,63,63,0.5)] text-white text-xs md:text-[24px] font-bold px-4 md:px-6 py-2 md:py-2 w-fit rounded-full'>
                    Let's Get Started!
                </button>
            </div>
            <div className="flex-1 flex max-h-[80vh] h-screen justify-end items-end overflow-hidden">
                <div className="relative w-full h-full max-md:hidden">
                    <Image
                        src="/images/laptop-complete.png"
                        alt="Carriers Laptop"
                        fill
                        objectFit="contain"
                        objectPosition="right"
                    />
                </div>
                <div className="relative w-full h-full md:hidden">
                    <Image
                        src="/images/laptop-complete.png"
                        alt="Carriers Laptop"
                        fill
                        objectFit="contain"
                        objectPosition="right"
                    />
                </div>
            </div>
        </section>
    )
}