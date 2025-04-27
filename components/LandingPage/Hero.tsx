import Image from "next/image";
import Link from "next/link";

export default function Hero() {
	return (
		<section dir="rtl" className="flex items-center relative min-h-screen w-full text-white">
			<div className="flex flex-col gap-4 py-12 flex-1 max-lg:w-full items-center justify-center">
				<Image
					src="/images/logo.svg"
					alt="Carriers Logo"
					width={487}
					height={125}
					className="max-lg:w-[320px]"
				/>
				<h1 className='text-2xl z-[99999] text-center py-2 lg:text-6xl font-normal max-w-[360px] md:max-w-[470px] 2xl:max-w-[680px] gradient-text'>
					نصنع أبطال الغد
				</h1>
				<h1 className='text-2xl lg:text-6xl font-normal text-center text-white max-w-[360px] md:max-w-[470px] 2xl:max-w-[680px]'>
					بتحويل الطموحات إلى واقع!
				</h1>
				<p className='font-thin text-base lg:text-lg text-center max-w-[360px] md:max-w-[470px] 2xl:max-w-[680px]'>
					انضم إلينا لبدء رحلة الإحتراف الأن!
				</p>
				<Link className='mt-12' href='/join-us'>
					<button className='border-2 border-main-red bg-transparent text-main-red w-[206px] h-[60px] text-center font-bold text-lg rounded-full'>انضم إلينا</button>
				</Link>
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
			{/* <div className="flex-1 flex max-h-[80vh] h-screen justify-end items-end max-lg:hidden overflow-hidden">
				<div className="relative w-full h-full">
					<Image
						src="/images/LaptopComplete.png"
						alt="Carriers Laptop"
						layout="fill"
						objectFit="contain"
						objectPosition="right bottom"
					/>
				</div>
			</div> */}
		</section>
	)
}