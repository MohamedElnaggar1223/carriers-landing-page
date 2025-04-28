'use client'

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createJoinUsEntry } from "@/lib/actions/join-us.actions"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Check, ChevronDown, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { countryCodes } from '@/constants'
import { joinUsSchema } from "@/lib/validations/join-us"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"

const games = [
    { id: "Valorant", label: "فالورانت" },
    { id: "League of Legends", label: "ليج أوف ليجيندز" },
    { id: "Overwatch", label: "أوفرواتش" },
    { id: "Apex Legends", label: "أبيكس ليجندز" },
    { id: 'Call of Duty', label: 'كول أوف دوتي' },
    { id: 'Fortnite', label: 'فورتنايت' },
    // Add more games as needed
]

export default function JoinUsForm() {
    const [loading, setLoading] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [openGameSelect, setOpenGameSelect] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof joinUsSchema>>({
        resolver: zodResolver(joinUsSchema),
        defaultValues: {
            fullName: '',
            email: '',
            countryCode: '+966',
            phoneNumber: '',
            role: 'player',
            isPartOfTeam: false,
            teamName: '',
            gameName: [],
        },
    })

    async function onSubmit(values: z.infer<typeof joinUsSchema>) {
        setLoading(true)

        const gameNamesString = values.gameName.join(", ");
        const submissionData = {
            ...values,
            gameName: gameNamesString,
        };

        try {
            if (values.isPartOfTeam && values.teamName === '') {
                form.setError('teamName', { message: 'Team name is required when part of a team' })
                setLoading(false)
                return
            }

            const result = await createJoinUsEntry(submissionData)
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
            <div dir="rtl" className='flex flex-col items-center justify-center gap-8 flex-1 h-screen'>
                {/* <Image
                    src="/images/logo.svg"
                    alt="Carriers Logo"
                    width={500}
                    height={100}
                /> */}
                <Check className="text-green-500" size={100} />
                <div className='flex flex-col items-center justify-center gap-4 text-center'>
                    <h2 className='text-white text-7xl font-bold max-md:text-3xl'>تم التسجيل بنجاح!<br /> نحن سعداء بانضمامك إلى Carriers.</h2>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className='text-white bg-[#FF3B30] w-48 h-14 rounded-full'
                >
                    الذهاب إلى الصفحة الرئيسية
                </button>
            </div>
        )
    }

    return (
        <section className='flex max-w-screen relative bg-[#191919] gap-4 lg:pl-24 max-lg:pl-4 pr-4 coachGradient overflow-x-hidden pb-6'>
            <div className='flex flex-col gap-12 top-0 sticky h-screen items-start justify-center flex-1 max-lg:hidden'>
                <Image
                    src="/images/logo.svg"
                    alt="Carriers Logo"
                    width={129}
                    height={36}
                />
                <h1 className='text-white text-left text-7xl font-bold'>
                    كاريرز علي وشك الانطلاق!
                </h1>
                <h2 className='text-[#8D8D99] text-left text-6xl font-normal'>
                    كن أول من يجرب كاريرز. املأ النموذج الآن للحصول على وصول مبكر!
                </h2>
            </div>
            <div className='flex flex-col items-center justify-center gap-8 flex-1 w-full mx-auto py-16'>
                <div className='lg:hidden flex flex-col gap-6 items-center justify-center w-full'>
                    {/* <Image
                        src="/images/logo.svg"
                        alt="Carriers Logo"
                        width={129}
                        height={36}
                    /> */}
                    <h1 dir="rtl" className='text-white text-center text-4xl font-bold'>
                        كاريرز علي وشك الانطلاق!
                    </h1>
                    <h2 dir="rtl" className='text-[#8D8D99] text-center text-xl font-normal'>
                        كن أول من يجرب كاريرز. املأ النموذج الآن للحصول على وصول مبكر!
                    </h2>
                </div>

                <Form {...form}>
                    <form dir="rtl" onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-6 w-full max-w-xl bg-[#2C2B2B] p-8 rounded-lg'>
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-white">الاسم الكامل</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            className="w-full rounded-lg border border-white bg-white outline-none p-3 text-black"
                                            placeholder="أدخل اسمك الكامل"
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
                                    <FormLabel className="text-white">البريد الإلكتروني</FormLabel>
                                    <FormControl>
                                        <input
                                            {...field}
                                            type="email"
                                            className="w-full rounded-lg border border-white bg-white outline-none p-3 text-black"
                                            placeholder="أدخل بريدك الإلكتروني"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-4 max-lg:flex-col">
                            <FormField
                                control={form.control}
                                name="countryCode"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel className="text-white">رمز الدولة</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <select
                                                    {...field}
                                                    className="w-full rounded-lg border border-white bg-white p-3 text-black appearance-none"
                                                    dir="ltr"
                                                >
                                                    <option value="" className="bg-[#191919] text-white" disabled>رمز الدولة</option>
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
                                        <FormLabel className="text-white">رقم الهاتف</FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                className="w-full rounded-lg border border-white bg-white outline-none p-3 text-black"
                                                placeholder="أدخل رقم هاتفك"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="gameName"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel className="text-white">الألعاب التي تلعبها</FormLabel>
                                    <Popover open={openGameSelect} onOpenChange={setOpenGameSelect}>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={openGameSelect}
                                                    className={cn(
                                                        "w-full justify-between bg-white text-black hover:bg-gray-100 hover:text-black",
                                                        !field.value?.length && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.length
                                                        ? field.value
                                                            .map(gameId => games.find(g => g.id === gameId)?.label)
                                                            .filter(Boolean)
                                                            .join(", ")
                                                        : "اختر الألعاب"}
                                                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
                                            <Command>
                                                <CommandInput placeholder="ابحث عن لعبة..." />
                                                <CommandList>
                                                    <CommandEmpty>لم يتم العثور على لعبة.</CommandEmpty>
                                                    <CommandGroup>
                                                        {games.map((game) => (
                                                            <CommandItem
                                                                key={game.id}
                                                                value={game.id}
                                                                onSelect={(currentValue) => {
                                                                    const selectedGames = field.value || [];
                                                                    const index = selectedGames.indexOf(game.id);
                                                                    let newSelectedGames = [];
                                                                    if (index > -1) {
                                                                        newSelectedGames = selectedGames.filter((_, i) => i !== index);
                                                                    } else {
                                                                        newSelectedGames = [...selectedGames, game.id];
                                                                    }
                                                                    field.onChange(newSelectedGames);
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        field.value?.includes(game.id) ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {game.label}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel className="text-white">هل أنت لاعب أم مدرب؟</FormLabel>
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
                                                <span className="text-white">لاعب</span>
                                            </label>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    {...field}
                                                    value="coach"
                                                    checked={field.value === 'coach'}
                                                    className="custom-radio"
                                                />
                                                <span className="text-white">مدرب</span>
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
                                    <FormLabel className="text-white">هل أنت حاليًا جزء من فريق أو منظمة؟</FormLabel>
                                    <FormControl>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="radio"
                                                    checked={field.value === true}
                                                    onChange={() => form.setValue('isPartOfTeam', true)}
                                                    className="custom-radio"
                                                />
                                                <span className="text-white">نعم</span>
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
                                                <span className="text-white">لا</span>
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
                                        <FormLabel className="text-white">اسم الفريق/المنظمة</FormLabel>
                                        <FormControl>
                                            <input
                                                {...field}
                                                className="w-full border-t-0 border-x-0 bg-transparent border-b border-white outline-none p-3 text-white"
                                                placeholder="أدخل اسم الفريق"
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
                            إرسال الطلب
                        </button>
                    </form>
                </Form>
            </div>
        </section>
    )
}