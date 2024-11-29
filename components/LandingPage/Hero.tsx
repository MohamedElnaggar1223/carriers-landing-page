import Image from "next/image";

export default function Hero() 
{
    return (
        <section className="flex max-lg:pt-24 lg:pl-24 pl-8 items-center relative min-h-screen w-full text-white max-lg:flex-col gap-12">
			<div className="flex flex-col gap-4 py-12 lg:gap-12 flex-1 max-lg:w-full">
				<Image
					src="/images/logo.svg"
					alt="Carriers Logo"
					width={487}
					height={125}
					className="md:ml-6 max-lg:w-[320px]"
				/>
				<h1 className='text-2xl lg:text-5xl font-normal text-white'>
					We are making the champions of tomorrow.
				</h1>
				<p className='font-thin text-base lg:text-lg'>Join us to become the greatest carrier of all time.</p>
				<button className='border-2 border-main-red bg-transparent text-main-red w-[206px] h-[60px] text-center font-bold text-lg rounded-full max-md:mx-auto md:ml-[10vw]'>Join us</button>
			</div>
			{/* <div className="flex relative flex-1 items-center justify-end lg:h-[85vh] lg:max-h-[46rem] max-lg:w-full">
				<div className='relative lg:max-h-[85vh]'>
					<Image
						src="/images/LaptopComplete.png"
						alt="Carriers Laptop"
						height={918}
						width={720}
						className='object-contain lg:max-h-[inherit] max-lg:w-[39rem] max-lg:h-fit max-sm:h-fit max-sm:w-full'
					/>
				</div>
			</div> */}
			<div className="flex-1 flex max-h-[80vh] h-screen justify-end items-end max-lg:hidden overflow-hidden">
				<div className="relative w-full h-full">
					<Image
						src="/images/LaptopComplete.png"
						alt="Carriers Laptop"
						layout="fill"
						objectFit="contain"
						objectPosition="right bottom"
					/>
				</div>
			</div>
		</section>
    )
}