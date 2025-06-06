import AgentTest from "@/components/LandingPage/AgentTest";
import Analytics from "@/components/LandingPage/Analytics";
import GamesCarousel from "@/components/LandingPage/GamesCarousel";
import Hero from "@/components/LandingPage/Hero";
import OurServices from "@/components/LandingPage/OurServices";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const tab = typeof searchParams.tab === 'string' ? searchParams.tab : undefined

	return (
		<>
			<Hero />
			{/* <GamesCarousel /> */}
			<AgentTest />
			{/* <OurServices tab={tab} /> */}
			<Analytics />
		</>
	);
}
