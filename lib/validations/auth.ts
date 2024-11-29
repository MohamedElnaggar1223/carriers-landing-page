import { z } from "zod"
 
export const coachSignUpSchema = z.object({
    username: z.string({ message: 'Username is required' }).min(3).max(20).regex(/^[a-zA-Z0-9]+$/, {
        message: 'Username must be at least 3 characters',
    }),
    email: z.string().email({
        message: 'Invalid email address',
    }),
    playName: z.enum(['Valorant', 'League of Legends', 'Overwatch', '']),
})

export const playerSignUpSchema = z.object({
    username: z.string({ message: 'Username is required' }).min(3).max(20).regex(/^[a-zA-Z0-9]+$/, {
        message: 'Username must be at least 3 characters',
    }),
    email: z.string().email({
        message: 'Invalid email address',
    }),
    playName: z.enum(['Valorant', 'League of Legends', 'Overwatch', '']),
})

export const signInSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
})