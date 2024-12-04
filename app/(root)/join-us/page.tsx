'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createJoinUsEntry } from "@/lib/actions/join-us.actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ChevronDown, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { countryCodes } from '@/constants'
import { joinUsSchema } from "@/lib/validations/join-us"

export default function JoinUsForm() {
    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof joinUsSchema>>({
        resolver: zodResolver(joinUsSchema),
        defaultValues: {
            fullName: '',
            email: '',
            countryCode: '',
            phoneNumber: '',
            role: 'player',
            isPartOfTeam: false,
            teamName: '',
        },
    })

    async function onSubmit(values: z.infer<typeof joinUsSchema>) {
        setLoading(true)

        try {
            if (values.isPartOfTeam && values.teamName === '') {
                form.setError('teamName', { message: 'Team name is required when part of a team' })
                setLoading(false)
                return
            }

            const result = await createJoinUsEntry(values)
            if (result.error) {
                form.setError('email', { message: result.error })
            } else {
                setShowSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    if (showSuccess) {
        return (
            <div className='flex flex-col items-center justify-center gap-8 flex-1 h-screen'>
                <Image
                    src="/images/logoCarriers.png"
                    alt="Carriers Logo"
                    width={500}
                    height={100}
                />
                <div className='flex flex-col items-center justify-center gap-4 text-center'>
                    <h2 className='text-white text-7xl font-bold'>You're in!<br /> Stay tuned for Carriers updates.</h2>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className='text-white bg-[#FF3B30] w-48 h-14 rounded-full'
                >
                    Go to Home
                </button>
            </div>
        )
    }

    return (
        <section className='flex max-w-screen relative bg-[#191919] gap-4 lg:pl-24 max-lg:pl-4 pr-4 coachGradient overflow-x-hidden'>
            <div className='flex flex-col gap-12 top-0 sticky h-screen items-start justify-center flex-1 max-lg:hidden'>
                <Image
                    src="/images/logoCarriers.png"
                    alt="Carriers Logo"
                    width={129}
                    height={36}
                />
                <h1 className='text-white text-left text-7xl font-bold'>
                    Carriers is almost here!
                </h1>
                <h2 className='text-[#8D8D99] text-left text-6xl font-normal'>
                    Be the first to try Carriers. Fill out the form now for early access!
                </h2>
            </div>
            <div className='flex flex-col items-center justify-center gap-8 flex-1 w-full mx-auto py-8'>
                <div className='lg:hidden flex flex-col gap-6 items-center justify-center w-full'>
                    <Image
                        src="/images/logoCarriers.png"
                        alt="Carriers Logo"
                        width={129}
                        height={36}
                    />
                    <h1 className='text-white text-center text-7xl font-bold'>
                        Attach your team information and we will co6ntact you soon!
                    </h1>
                    <h2 className='text-[#8D8D99] text-center text-xl font-normal'>
                        It takes only 2 minutes
                    </h2>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full max-w-xl bg-[#2C2B2B] p-8 rounded-lg'>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Full Name</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            className="w-full rounded-lg border border-white bg-white outline-none p-3 text-black"
                                            placeholder="Enter your full name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">Email</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="email"
                                            className="w-full rounded-lg border border-white bg-white outline-none p-3 text-black"
                                            placeholder="Enter your email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4">
                            <FormField
                                control={form.control}
                                name="countryCode"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-white">Country Code</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <select
                                                    {...field}
                                                    className="w-full rounded-lg border border-white bg-white p-3 text-black appearance-none"
                                                >
                                                    <option value="" className="bg-[#191919] text-white" disabled>Country Code</option>
                                                    {countryCodes.map((country, index) => (
                                                        <option
                                                            key={index}
                                                            value={country.code}
                                                            className="bg-[#191919] text-white"
                                                        >
                                                            {country.country} ({country.code})
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none" size={20} />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem className="flex-[2]">
                                        <FormLabel className="text-white">Phone Number</FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                className="w-full rounded-lg border border-white bg-white outline-none p-3 text-black"
                                                placeholder="Enter your phone number"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-white">Are you a player or coach?</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    {...field}
                                                    value="player"
                                                    checked={field.value === 'player'}
                                                    className="custom-radio"
                                                />
                                                <span className="text-white">Player</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    {...field}
                                                    value="coach"
                                                    checked={field.value === 'coach'}
                                                    className="custom-radio"
                                                />
                                                <span className="text-white">Coach</span>
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isPartOfTeam"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-white">Are you currently part of team or organization?</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    checked={field.value === true}
                                                    onChange={() => form.setValue('isPartOfTeam', true)}
                                                    className="custom-radio"
                                                />
                                                <span className="text-white">Yes</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    checked={field.value === false}
                                                    onChange={() => {
                                                        form.setValue('isPartOfTeam', false)
                                                        form.setValue('teamName', '')
                                                    }}
                                                    className="custom-radio"
                                                />
                                                <span className="text-white">No</span>
                                            </label>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {form.watch('isPartOfTeam') && (
                            <FormField
                                control={form.control}
                                name="teamName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-white">Team/Organization's Name</FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                className="w-full border-t-0 border-x-0 bg-transparent border-b border-white outline-none p-3 text-white"
                                                placeholder="Enter team name"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        <button
                            disabled={loading}
                            className='text-white mx-auto bg-[#FF3B30] disabled:opacity-60 w-full h-14 rounded-full mt-6 flex items-center justify-center gap-2'
                            type='submit'
                        >
                            {loading && <Loader2 className='animate-spin' size={24} color="#fff" />}
                            Submit Application
                        </button>
                    </form>
                </Form>
            </div>
        </section>
    )
}