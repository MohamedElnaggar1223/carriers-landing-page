import GamesCarousel from "@/components/LandingPage/GamesCarousel";
import Hero from "@/components/LandingPage/Hero";
import OurServices from "@/components/LandingPage/OurServices";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) 
{
	const session = await getSession()

	if(session && session.user) return redirect('/dashboard')

	const tab = typeof searchParams.tab === 'string' ? searchParams.tab : undefined

	return (
		<>
			<Hero />
			<GamesCarousel />
			<OurServices tab={tab} />
		</>
	);
}
