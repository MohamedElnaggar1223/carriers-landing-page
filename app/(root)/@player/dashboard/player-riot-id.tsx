'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
} from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { addRiotId } from "@/lib/actions/player.actions"
import { Loader2 } from "lucide-react"

const playerRiotIdSchema = z.object({
    username: z.string().min(3).max(20),
    tag: z.string().min(3).max(8),
    region: z.string().min(2).max(3),
})

export default function PlayerRiotId() {

    const router = useRouter()

    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof playerRiotIdSchema>>({
        resolver: zodResolver(playerRiotIdSchema),
        defaultValues: {
            username: '',
            tag: '',
            region: '',
        },
    })

    async function onSubmit(values: z.infer<typeof playerRiotIdSchema>) {
        setLoading(true)
        try {
            await addRiotId(values.username, values.tag, values.region)
            router.refresh()
        }
        catch (error) {
            console.log(error)
        }

        setLoading(false)
    }

    return (
        <Form {...form}>
            <h1 className='text-white text-3xl font-bold'>
                Enter your Riot ID
            </h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-64 gap-12'>
                <div className={cn('flex items-center justify-center bg-white overflow-hidden rounded-lg h-16 px-4 gap-2', loading && 'opacity-60')}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className={cn('relative w-2/3')}>
                                <FormControl>
                                    <input {...field} disabled={loading} type='text' className='bg-transparent w-full border-none text-black text-xl outline-none' placeholder='Username' />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <span className='text-2xl'>#</span>
                    <FormField
                        control={form.control}
                        name="tag"
                        render={({ field }) => (
                            <FormItem className={cn('relative w-1/3')}>
                                <FormControl>
                                    <input {...field} disabled={loading} type='text' className='bg-transparent w-full border-none text-black text-xl outline-none' placeholder='Tag' />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="region"
                    render={({ field }) => (
                        <FormItem className={cn('relative w-full')}>
                            <FormControl>
                                <select {...field} disabled={loading} className='bg-white w-full rounded-lg p-4 border-none text-black text-xl outline-none'>
                                    <option value="">Select Region</option>
                                    <option value="na">NA</option>
                                    <option value="eu">EU</option>
                                    <option value="ap">AP</option>
                                    <option value="kr">KR</option>
                                    <option value="latam">LATAM</option>
                                    <option value="br">BR</option>
                                </select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <button disabled={loading || !form.getValues('username') || !form.getValues('tag')} type='submit' className='text-white mx-auto bg-[#FF3B30] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12 flex items-center justify-center gap-1'>
                    {loading && <Loader2 className='w-6 h-6 animate-spin' />}
                    SUBMIT
                </button>
            </form>
        </Form>
    )
}