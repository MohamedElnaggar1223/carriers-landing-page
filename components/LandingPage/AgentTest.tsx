import Image from "next/image";

export default function AgentTest() {
    return (
        <section className='h-max overflow-y-hidden w-full relative grid max-md:grid-rows-2 md:grid-cols-2 items-center max-w-[100vw] overflow-x-hidden'>
            <div className='blur-lg z-[-1] radial w-[720px] h-[720px] rounded-full overflow-hidden absolute -left-[11%] -top-[5%]' />
            <div className='blur-lg z-[-1] radial w-[1240px] h-[1240px] rounded-full overflow-hidden absolute -right-[25%] -top-[5%]' />
            <div className='rounded-3xl bg-[#53545E]/25 flex mx-6 flex-col px-8 py-12 gap-20 max-h-[480px] h-screen w-screen col-span-1'>
                <div className='flex flex-col gap-4'>
                    <p className='text-white text-5xl xl:text-7xl font-bold'>Free Agent Test!</p>
                    <p className='text-white text-2xl xl:text-[40px] xl:leading-[48px] font-normal'>Discover your Personality</p>
                </div>
                <button className='bg-[#F13C3C] drop-shadow-[0px_4px_4px_rgba(251,63,63,0.5)] text-white text-[24px] font-bold px-6 py-2 w-fit rounded-full'>
                    Let's Get Started!
                </button>
            </div>
            <div className='grid grid-cols-4 gap-y-2 max-md:-mt-32'>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/omen.png'
                        alt='Omen'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/phonix.png'
                        alt='Phonix'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/jett.png'
                        alt='Jett'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/chamber.png'
                        alt='Chamber'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/raze.png'
                        alt='Raze'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/viper.png'
                        alt='Viper'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/brimstone.png'
                        alt='Brimstone'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/breach.png'
                        alt='Breach'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/astra.png'
                        alt='Astra'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/cypher.png'
                        alt='Cypher'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/kayo.png'
                        alt='Kayo'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/clove.png'
                        alt='Clove'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/tejo.png'
                        alt='Tejo'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/neon.png'
                        alt='Neon'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/reyna.png'
                        alt='Reyna'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[211px]">
                    <Image
                        src='/images/yoru.png'
                        alt='Yoru'
                        fill
                        className='object-contain'
                    />
                </div>
            </div>
        </section>
    )
}