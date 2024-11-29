'use client'
import { signInSchema } from "@/lib/validations/auth"
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
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Check, ChevronRight, Loader2, User2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { createOTP } from '@/lib/actions/otp.actions';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { getUserByEmail, getUserByUsername } from "@/lib/actions/user.actions"
import { useRouter } from "next/navigation"

export default function SignIn()
{
    const router = useRouter()

    const [loading, setLoading] = useState(false)
    const [stage, setStage] = useState<'email' | 'otp'>('email')
    const [otp, setOtp] = useState('')
    const [message, setMessage] = useState('')
    const [resendTimer, setResendTimer] = useState(0)
    const [btnLoading, setBtnLoading] = useState(false)
    
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
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

    async function onSubmit(values: z.infer<typeof signInSchema>) {
        setLoading(true)

        try
        {
            const signInResult = await signIn('credentials', { email: values.email, role: 'player', otp: otp, redirect: false })
            
            if(signInResult?.error) setMessage(signInResult.error)
            else router.push('/dashboard')
        }
        catch(error)
        {
            console.log(error)
        }

        setLoading(false)
    }

    useEffect(() => {
        if(stage === 'otp') setResendTimer(30)
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
            <div className='flex items-center justify-center md:justify-center gap-4 w-full max-md:flex-wrap'>
                <div className={cn('flex items-center justify-center min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full text-black max-md:text-base', stage !== 'email' ? 'bg-[#1D8841]' : 'bg-white', stage !== 'email' && 'max-md:hidden')}>
                    {stage !== 'email' ? <Check stroke='#fff' size={24} /> : '1'}
                </div>
                <p className={cn('text-base md:text-lg font-bold', stage !== 'email' ? 'text-[#8D8D99]' : 'text-white', stage !== 'email' && 'max-md:hidden')}>Email</p>
                <ChevronRight size={24} stroke='#C66060' className={cn('max-md:hidden')} />
                <div className={cn('flex items-center justify-center min-w-6 min-h-6 md:min-w-8 md:min-h-8 rounded-full text-black max-md:text-base bg-white', stage !== 'otp' && 'max-md:hidden')}>
                    {'2'}
                </div>
                <p className={cn('text-base md:text-lg font-bold text-white', stage !== 'otp' && 'max-md:hidden')}>OTP</p>
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col w-full'>
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
                    {stage === 'otp' ? (
                        <div className='flex items-center justify-center gap-4'>
                            <button type='button' onMouseDown={() => setStage(prev => ['email', 'otp'][['email', 'otp'].indexOf(prev) - 1] as 'email' | 'otp')} className={cn('text-white mx-auto bg-[#B8B1B1] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12', stage !== 'otp' && 'hidden')}>Back</button>
                            <button disabled={otp.length !== 6 && resendTimer > 0} onMouseDown={() => otp.length !== 6 && handleSendOTP()} type={otp.length !== 6 ? 'button' : 'submit'} className='text-white mx-auto bg-[#FF3B30] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12'>{stage === 'otp' && otp.length !== 6 ? `Resend ${resendTimer > 0 ? `(${resendTimer})` : ''}` : "SUBMIT"}</button>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center gap-6 w-fit mx-auto'>
                            <button 
                                onMouseDown={async () => {
                                    setBtnLoading(true)
                                    if(form.getValues('email') === '') {
                                        form.setError('email', { message: 'Email is required' })
                                        setBtnLoading(false)
                                        return
                                    }
                                    const duplicateUser = await getUserByEmail(form.getValues('email'))
                                    if(!duplicateUser) form.setError('email', { message: 'Email Does not exist' })
                                    else 
                                    {
                                        await handleSendOTP()
                                        setStage('otp')
                                    }
                                    setBtnLoading(false)
                                }}
                                className='text-white mx-auto bg-[#FF3B30] disabled:opacity-60 w-40 md:w-44 h-14 rounded-full mt-12 flex items-center justify-center gap-2'
                                type='button'
                                disabled={btnLoading}
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