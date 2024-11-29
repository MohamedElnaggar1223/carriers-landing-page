'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { type CarouselApi } from "@/components/ui/carousel"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"

const games = [
    {
        src: '/images/valorant2.png',
        smallSrc: '/images/valorantInside.png',
        name: 'Valorant',
        description: "Whether you're looking to sharpen your skills or enhance team coordination in Valorant, Carriers provides the tools you need to review gameplay, set goals, and dominate in Valorant tournaments. Let’s elevate your game!"
    },
    {
        src: '/images/league.jpeg',
        smallSrc: '/images/league.jpeg',
        name: 'LOL',
        description: "Whether you're looking to sharpen your skills or enhance team coordination in LOL, Carriers provides the tools you need to review gameplay, set goals, and dominate in Valorant tournaments. Let’s elevate your game!"
    },
    {
        src: '/images/overwatch.jpeg',
        smallSrc: '/images/overwatch.jpeg',
        name: 'Overwatch',
        description: "Whether you're looking to sharpen your skills or enhance team coordination in Overwatch, Carriers provides the tools you need to review gameplay, set goals, and dominate in Valorant tournaments. Let’s elevate your game!"
    }
]
  
export default function GamesCarousel() 
{
    // const [api, setApi] = useState<CarouselApi>()
    // const [current, setCurrent] = useState(0)
    // const [count, setCount] = useState(0)

    const [currentIndex, setCurrentIndex] = useState(0);
    const [animationStarted, setAnimationStarted] = useState(false)

    useEffect(() => {
        if(!animationStarted) setAnimationStarted(true)
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const getGameIndex = (index: number) => (index + games.length) % games.length;

    console.log(currentIndex)

    // useEffect(() => {
    //     if (!api) {
    //         return
    //     }
        
    //     setCount(api.scrollSnapList().length)
    //     setCurrent(api.selectedScrollSnap() + 1)
        
    //     api.on("select", () => {
    //         setCurrent(api.selectedScrollSnap() + 1)
    //     })
    // }, [api])

	return (
        <AnimatePresence mode="sync">
            <section className="flex items-center relative min-h-screen w-full text-white overflow-hidden">
                {/* <div className={cn('h-2 shadow-lg absolute top-0 left-0 bg-main-red z-[99999]', animationStarted ? 'animate-timer' : '')} /> */}
                <div className='flex flex-col gap-4 lg:gap-8 absolute bottom-[55vh] xl:bottom-[30vh] left-10 lg:left-20 lg:max-w-[15.625rem] max-w-[18.75rem] xl:max-w-[29.125rem] z-[999]'> 
                    <p className='font-denk-one text-[2rem] lg:text-[3.5rem] xl:text-[6.25rem] text-white'>{games[currentIndex].name}</p>
                    <p className='font-dm-sans text-white lg:text-base text-sm'>{games[currentIndex].description}</p>
                </div>
                {games.map(game => games[currentIndex].name === game.name ? (
                    <motion.div key={game.name} className='h-screen w-full' layoutId={game.name + "carousel"} transition={{ duration: 0.75 }}>
                        <Image
                            src={game.src}
                            alt={game.name}
                            fill
                            className='object-cover'
                            quality={100}
                        />
                        <div className='absolute bottom-0 h-full w-full gradient' />
                    </motion.div>
                ) : null)}
                <motion.div layoutId='parentDiv' className='flex flex-col absolute bottom-5 xl:bottom-20 max-lg:left-16 lg:-right-24 gap-12'>
                    <motion.div layoutId='container' className="flex items-center justify-center space-x-4 gap-4">
                        {[...Array(3)].map((_, i) => {
                            const gameIndex = getGameIndex(currentIndex + i);
                            const game = games[gameIndex];
                            return (
                                <div 
                                    key={game.name} 
                                    className={cn('transition-all duration-300 overflow-hidden rounded-[1.875rem] relative', i === 0 ? '2xl:w-[23.313rem] 2xl:h-[27.063rem] w-[16.813rem] h-[19.563rem] border-4 border-white' : 'scale-100 2xl:w-[18.625rem] 2xl:h-[21.625rem] w-[13.438rem] h-[15.625rem]')}
                                    onClick={() => setCurrentIndex(gameIndex)}
                                >
                                    <motion.div layoutId={game.name} className={cn(i === 0 ? '2xl:w-[23.313rem] 2xl:h-[27.063rem] w-[16.813rem] h-[19.563rem]' : '2xl:w-[18.625rem] 2xl:h-[21.625rem] w-[13.438rem] h-[15.625rem]')}>
                                        <Image 
                                            src={game.smallSrc} 
                                            alt={game.name} 
                                            fill
                                            quality={100}
                                            className="object-cover"
                                        />
                                    </motion.div>
                                    <motion.div className={cn(i === 0 ? '2xl:w-[23.313rem] 2xl:h-[27.063rem] w-[16.813rem] h-[19.563rem]' : '2xl:w-[18.625rem] 2xl:h-[21.625rem] w-[13.438rem] h-[15.625rem]')} layoutId={game.name + "carousel"} transition={{ duration: 0.75 }}>
                                        <Image 
                                            src={game.src} 
                                            alt={game.name} 
                                            fill
                                            quality={100}
                                            className='hidden object-cover'
                                        />
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                    <motion.div layoutId='dotsDiv' className="flex gap-1 items-center ml-[33.33333%]">
                        <div className={cn('w-3 h-3 rounded-full', currentIndex === 0 ? 'bg-[#D9D9D9]' : 'bg-[#D9D9D980]')} />
                        <div className={cn('w-3 h-3 rounded-full', currentIndex === 1 ? 'bg-[#D9D9D9]' : 'bg-[#D9D9D980]')} />
                        <div className={cn('w-3 h-3 rounded-full', currentIndex === 2 ? 'bg-[#D9D9D9]' : 'bg-[#D9D9D980]')} />
                    </motion.div>
                </motion.div>
            </section>
        </AnimatePresence>
	)   
}