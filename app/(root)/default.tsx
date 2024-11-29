import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function DefaultPage()
{
    const session = await getSession()

    if(!session) return redirect('/')
    
    return null
}