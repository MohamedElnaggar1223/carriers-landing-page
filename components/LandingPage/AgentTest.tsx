import Image from "next/image";

export default function AgentTest() {
    return (
        <section dir="rtl" className='h-max overflow-y-hidden w-full relative grid grid-cols-2 items-center max-w-[100vw] overflow-x-hidden max-md:px-4'>
            <div className='blur-lg z-[-1] radial w-[720px] h-[720px] rounded-full overflow-hidden absolute -left-[11%] -top-[5%]' />
            <div className='blur-lg z-[-1] radial w-[1240px] h-[1240px] rounded-full overflow-hidden absolute -right-[25%] -top-[5%]' />
            <div className='rounded-3xl bg-[#53545E]/25 flex md:mx-6 flex-col px-4 py-4 md:px-8 md:py-12 gap-4 md:gap-20 max-h-[140px] md:max-h-[480px] h-screen w-screen col-span-1'>
                <div className='flex flex-col gap-4'>
                    <p className='text-white text-base xl:text-5xl font-bold'>اختبار مجاني لتحديد عميلك!</p>
                    <p className='text-white text-sm xl:text-[40px] xl:leading-[48px] font-normal'>اكتشف شخصيتك </p>
                </div>
                <button className='bg-[#F13C3C] drop-shadow-[0px_4px_4px_rgba(251,63,63,0.5)] min-w-[100px] lg:min-w-[200px] text-white text-xs md:text-[24px] font-bold px-4 md:px-6 py-2 md:py-2 w-fit rounded-full'>
                    ابدأ الآن!
                </button>
            </div>
            <div className='grid grid-cols-4 gap-y-2'>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/omen-arabic.png'
                        alt='Omen'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/phonix-arabic.png'
                        alt='Phonix'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/jett-arabic.png'
                        alt='Jett'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/chamber-arabic.png'
                        alt='Chamber'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/raze-arabic.png'
                        alt='Raze'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/viper-arabic.png'
                        alt='Viper'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/brimstone-arabic.png'
                        alt='Brimstone'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/breach-arabic.png'
                        alt='Breach'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/astra-arabic.png'
                        alt='Astra'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/cypher-arabic.png'
                        alt='Cypher'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/kayo-arabic.png'
                        alt='Kayo'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/clove-arabic.png'
                        alt='Clove'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/tejo-arabic.png'
                        alt='Tejo'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/neon-arabic.png'
                        alt='Neon'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/reyna-arabic.png'
                        alt='Reyna'
                        fill
                        className='object-contain'
                    />
                </div>
                <div className="relative col-span-1 min-h-[60px] md:min-h-[211px]">
                    <Image
                        src='/images/yoru-arabic.png'
                        alt='Yoru'
                        fill
                        className='object-contain'
                    />
                </div>
            </div>
        </section>
    )
}