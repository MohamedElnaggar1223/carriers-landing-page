'use client'
import { playerSignUpSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { createPlayer } from "@/lib/actions/player.actions"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Check, ChevronRight, Loader2, User2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createOTP } from '@/lib/actions/otp.actions';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { getUserByEmail, getUserByUsername } from "@/lib/actions/user.actions"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function PlayerSignUpForm() {
    const [loading, setLoading] = useState(false)
    const [stage, setStage] = useState<'username' | 'email' | 'otp' | 'game' | 'riot'>('username')
    const [otp, setOtp] = useState('')
    const [message, setMessage] = useState('')
    const [btnLoading, setBtnLoading] = useState(false)
    const [resendTimer, setResendTimer] = useState(0)

    const router = useRouter()

    const form = useForm<z.infer<typeof playerSignUpSchema>>({
        resolver: zodResolver(playerSignUpSchema),
        defaultValues: {
            username: '',
            playName: '',
            email: '',
        },
    })

    form.watch('email')

    async function handleSendOTP() {
        setResendTimer(30)
        const result = await createOTP(form.getValues('email'))
        setMessage(result?.message);
    }

    console.log(form.getValues('email'))
    console.log(form.getValues('username'))

    async function onSubmit(values: z.infer<typeof playerSignUpSchema>) {
        setLoading(true)
        try {
            const signInResult = await signIn('credentials', { username: values.username, playName: values.playName, email: values.email, role: 'player', otp: otp, redirect: false })

            if (signInResult?.error) setMessage(signInResult.error)
            else router.push('/dashboard')
        }
        catch (error) {
            console.log(error)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (stage === 'otp') setResendTimer(30)
    }, [stage])

    useEffect(() => {
        let intervalId: any;

        if (resendTimer > 0) {
            intervalId = setInterval(() => {
                setResendTimer((prevTime) => prevTime - 1);
            }, 1000);
        }

        return () => clearInterval(intervalId);
    }, [resendTimer]);

    return (
        <div className='flex flex-col items-center justify-start gap-16 flex-1 w-full max-md:h-screen max-md:w-screen'>
            <div className='flex items-center justify-center md:justify-between gap-4 w-full max-md:flex-wrap'>
                <div className={cn('flex items-center justify-center min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full text-black max-md:text-base', stage !== 'username' ? 'bg-[#1D8841]' : 'bg-white', stage !== 'username' && 'max-md:hidden')}>
                    {stage !== 'username' ? <Check stroke='#fff' size={24} /> : '1'}
                </div>
                <p className={cn('text-base md:text-lg font-bold', stage !== 'username' ? 'text-[#8D8D99]' : 'text-white', stage !== 'username' && 'max-md:hidden')}>Username</p>
                <ChevronRight size={24} stroke='#C66060' className={'max-md:hidden'} />
                <div className={cn('flex items-center justify-center min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full text-black max-md:text-base', ['otp', 'game', 'riot'].includes(stage) ? 'bg-[#1D8841]' : 'bg-white', stage !== 'email' && 'max-md:hidden')}>
                    {['otp', 'game', 'riot'].includes(stage) ? <Check stroke='#fff' size={24} /> : '2'}
                </div>
                <p className={cn('text-base md:text-lg font-bold', ['otp', 'game', 'riot'].includes(stage) ? 'text-[#8D8D99]' : 'text-white', stage !== 'email' && 'max-md:hidden')}>Email</p>
                <ChevronRight size={24} stroke='#C66060' className={'max-md:hidden'} />
                <div className={cn('flex items-center justify-center min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full text-black max-md:text-base', ['otp', 'riot'].includes(stage) ? 'bg-[#1D8841]' : 'bg-white', stage !== 'game' && 'max-md:hidden')}>
                    {['otp', 'riot'].includes(stage) ? <Check stroke='#fff' size={24} /> : '3'}
                </div>
                <p className={cn('text-base md:text-lg font-bold', ['otp', 'riot'].includes(stage) ? 'text-[#8D8D99]' : 'text-white', stage !== 'game' && 'max-md:hidden')}>Game</p>
                <ChevronRight size={24} stroke='#C66060' className={'max-md:hidden'} />
                <div className={cn('flex items-center justify-center min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full text-black max-md:text-base', ['otp'].includes(stage) ? 'bg-[#1D8841]' : 'bg-white', stage !== 'riot' && 'max-md:hidden')}>
                    {['otp'].includes(stage) ? <Check stroke='#fff' size={24} /> : '4'}
                </div>
                <p className={cn('text-base md:text-lg font-bold', ['otp'].includes(stage) ? 'text-[#8D8D99]' : 'text-white', stage !== 'riot' && 'max-md:hidden')}>Riot</p>
                <ChevronRight size={24} stroke='#C66060' className={'max-md:hidden'} />
                <div className={cn('flex items-center justify-center min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full text-black max-md:text-base bg-white', stage !== 'otp' && 'max-md:hidden')}>
                    {'5'}
                </div>
                <p className={cn('text-base md:text-lg font-bold text-white', stage !== 'otp' && 'max-md:hidden')}>OTP</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full'>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem className={cn('relative md:w-screen md:max-w-[454px] mx-auto')}>
                                <FormControl>
                                    <div className={cn('flex flex-col items-center justify-center gap-8', stage !== 'username' ? 'absolute opacity-0 z-[-1]' : 'z-50')}>
                                        <div className='flex items-center justify-center flex-col gap-4 text-center'>
                                            <p className='text-white text-3xl'>Enter a username</p>
                                            <p className='text-[#8D8D99] text-lg font-bold'>please enter  username</p>
                                        </div>
                                        <div className='flex gap-3 rounded-3xl border border-white items-center justify-start md:w-screen md:max-w-[454px] px-4 py-2.5'>
                                            <User2 size={24} fill='#BBBEC7' />
                                            <input {...field} type='text' className='bg-transparent border-none text-white text-xl outline-none' placeholder='Username' />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className={cn('absolute -bottom-7 left-0 text-main-red', stage !== 'username' ? 'z-[-1] opacity-0' : 'z-50')} />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className={cn('relative md:w-screen md:max-w-[454px] mx-auto')}>
                                <FormControl>
                                    <div className={cn('flex flex-col items-center justify-center gap-8', stage !== 'email' ? 'absolute opacity-0 z-[-1]' : 'z-50')}>
                                        <div className='flex items-center justify-center flex-col gap-4 text-center'>
                                            <p className='text-white text-3xl'>What is your email?</p>
                                            <p className='text-[#8D8D99] text-lg font-bold'>please enter your email</p>
                                        </div>
                                        <div className='flex gap-3 rounded-3xl border border-white items-center justify-start md:w-screen md:max-w-[454px] px-4 py-2.5'>
                                            <User2 size={24} fill='#BBBEC7' />
                                            <input {...field} type='email' className='bg-transparent border-none text-white text-xl outline-none' placeholder='Email' />
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage className={cn('absolute -bottom-7 left-0 text-main-red', stage !== 'email' ? 'z-[-1] opacity-0' : 'z-50')} />
                            </FormItem>
                        )}
                    />
                    <div className={cn('flex flex-col items-center justify-center gap-8', stage !== 'otp' ? 'absolute opacity-0 z-[-1]' : 'z-50')}>
                        <div className='flex items-center justify-center flex-col gap-4 text-center'>
                            <p className='text-white text-3xl'>Verify your email</p>
                            <div className='flex items-center justify-center flex-col gap-2 text-center'>
                                <p className='text-[#8D8D99] text-lg font-bold'>To register, Please enter the code we sent to</p>
                                <p className='text-white text-lg font-bold'>{form.getValues('email')}</p>
                            </div>
                        </div>
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup className="gap-2.5 lg:gap-4 text-black !caret-black">
                                <InputOTPSlot index={0} className='border-black bg-white !caret-black text-black p-2 w-12 h-12 lg:w-20 lg:h-24 rounded-[5px]' />
                                <InputOTPSlot index={1} className='border-black bg-white !caret-black text-black p-2 w-12 h-12 lg:w-20 lg:h-24 rounded-[5px]' />
                                <InputOTPSlot index={2} className='border-black bg-white !caret-black text-black p-2 w-12 h-12 lg:w-20 lg:h-24 rounded-[5px]' />
                                <InputOTPSlot index={3} className='border-black bg-white !caret-black text-black p-2 w-12 h-12 lg:w-20 lg:h-24 rounded-[5px]' />
                                <InputOTPSlot index={4} className='border-black bg-white !caret-black text-black p-2 w-12 h-12 lg:w-20 lg:h-24 rounded-[5px]' />
                                <InputOTPSlot index={5} className='border-black bg-white !caret-black text-black p-2 w-12 h-12 lg:w-20 lg:h-24 rounded-[5px]' />
                            </InputOTPGroup>
                        </InputOTP>
                        {message && <p className='text-main-red text-lg font-bold'>{message}</p>}
                        {/* <div className='flex items-center justify-center gap-4'>
                            <button className='rounded-full mt-8 w-screen max-w-[173px] flex items-center justify-center gap-1 bg-[#B8B1B1] text-white h-14'>Back</button>
                            <button onMouseDown={() => setStage('riot')} className='rounded-full mt-8 w-screen max-w-[173px] flex items-center justify-center gap-1 bg-[#FA3737] text-white h-14'>Continue <ArrowRight size={24} stroke='#fff' /></button>
                        </div> */}
                    </div>
                    <div className={cn('flex flex-col items-center justify-center gap-4', stage !== 'riot' && 'hidden')}>
                        <div className='flex items-center justify-center flex-col gap-4 text-center'>
                            <p className='text-white text-3xl'>Now link your account with Riot !</p>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="playName"
                        render={({ field }) => (
                            <FormItem className={cn('relative md:w-screen md:max-w-[454px] mx-auto')}>
                                <FormControl>
                                    <div className={cn('flex flex-col items-center justify-center gap-8', stage !== 'game' ? 'absolute opacity-0 z-[-1]' : 'z-50')}>
                                        <div className='flex items-center justify-center flex-col gap-4 text-center'>
                                            <p className='text-white text-3xl'>Select a game</p>
                                        </div>
                                        <select className='bg-[#313131] indent-6 rounded-[2px] w-full text-white border border-[#E1E1E6] h-16' {...field}>
                                            <option disabled value=''>Choose the game</option>
                                            <option value='Valorant'>Valorant</option>
                                            <option value='League of Legends'>League of Legends</option>
                                            <option value='Overwatch'>Overwatch</option>
                                        </select>
                                    </div>
                                </FormControl>
                                <FormMessage className={cn('absolute -bottom-7 left-0 text-main-red', stage !== 'game' ? 'z-[-1] opacity-0' : 'z-50')} />
                            </FormItem>
                        )}
                    />
                    {stage === 'otp' ? (
                        <div className='flex items-center justify-center gap-6 w-fit mx-auto'>
                            <button type='button' onMouseDown={() => setStage(prev => ['username', 'email', 'game', 'riot', 'otp'][['username', 'email', 'game', 'riot', 'otp'].indexOf(prev) - 1] as 'username' | 'email' | 'otp' | 'game' | 'riot')} className={cn('text-white mx-auto bg-[#B8B1B1] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12', stage !== 'otp' && 'hidden')}>Back</button>
                            <button disabled={otp.length !== 6 && resendTimer > 0} onMouseDown={() => otp.length !== 6 && handleSendOTP()} type={otp.length !== 6 ? 'button' : 'submit'} className='text-white mx-auto bg-[#FF3B30] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12'>{stage === 'otp' && otp.length !== 6 ? `Resend ${resendTimer > 0 ? `(${resendTimer})` : ''}` : "SUBMIT"}</button>
                        </div>
                    ) : stage === 'riot' ? (
                        <button
                            onMouseDown={() => {
                                handleSendOTP()
                                setStage('otp')
                            }}
                            className='rounded-full mx-auto mt-8 w-screen max-w-[346px] flex items-center justify-center gap-2 bg-[#B8B1B1] text-white h-14'
                        >
                            <Image
                                src='/images/riot.svg'
                                width={31}
                                height={29}
                                alt='riot'
                            />
                            Sign In with riot Account
                        </button>
                    ) : (
                        <div className='flex items-center justify-center gap-6 w-fit mx-auto'>
                            <button type='button' disabled={stage === 'username'} onMouseDown={() => setStage(prev => ['username', 'email', 'game', 'riot', 'otp'][['username', 'email', 'game', 'riot', 'otp'].indexOf(prev) - 1] as 'username' | 'email' | 'otp' | 'game')} className={cn('text-white mx-auto bg-[#B8B1B1] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12', stage === 'username' && 'hidden')}>Back</button>
                            <button
                                disabled={(stage === 'game' && form.getValues('playName') === '') || btnLoading}
                                onMouseDown={async () => {
                                    if (stage === 'username') {
                                        setBtnLoading(true)
                                        if (form.getValues('username') === '') {
                                            form.setError('username', { message: 'Username is required' })
                                            setBtnLoading(false)
                                            return
                                        }
                                        const duplicateUser = await getUserByUsername(form.getValues('username'))
                                        if (duplicateUser) form.setError('username', { message: 'Username already exists' })
                                        else setStage('email')
                                        setBtnLoading(false)
                                    }
                                    else if (stage === 'email') {
                                        setBtnLoading(true)
                                        if (form.getValues('email') === '') {
                                            form.setError('email', { message: 'Email is required' })
                                            setBtnLoading(false)
                                            return
                                        }
                                        const duplicateUser = await getUserByEmail(form.getValues('email'))
                                        if (duplicateUser) form.setError('email', { message: 'Email already exists' })
                                        else setStage('game')
                                        setBtnLoading(false)
                                    }
                                    else if (stage === 'game') {
                                        setStage('riot')
                                    }
                                    else if (stage === 'riot') {
                                        handleSendOTP()
                                        setStage('otp')
                                    }
                                }}
                                className='text-white mx-auto bg-[#FF3B30] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12 flex items-center justify-center gap-2'
                                type='button'
                            >
                                {btnLoading && <Loader2 className='animate-spin' size={24} color="#5E1F3C" />}
                                Continue
                            </button>
                        </div>
                    )}
                </form>
            </Form>
            <Dialog open={loading}>
                <DialogContent className='flex items-center justify-center bg-transparent border-none outline-none'>
                    <Loader2 className='animate-spin' size={42} color="#5E1F3C" />
                </DialogContent>
            </Dialog>
        </div>
    )
}