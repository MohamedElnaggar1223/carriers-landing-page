'use server'
import { connectDB } from "../mongoose"
import JoinUs from "@/models/JoinUs"
import User from "@/models/User"
import { joinUsSchema } from "../validations/join-us"
import { z } from "zod"

export const createJoinUsEntry = async (data: z.infer<typeof joinUsSchema>) => {
    if (!data.fullName || !data.email || !data.countryCode || !data.phoneNumber || !data.role) {
        return { error: 'Please fill all required fields' }
    }

    if (data.isPartOfTeam && !data.teamName) {
        return { error: 'Team name is required when part of a team' }
    }

    try {
        await connectDB()

        const existingUser = await User.findOne({ email: data.email })
        if (existingUser) {
            return { error: 'Email already registered' }
        }

        const existingJoinUs = await JoinUs.findOne({ email: data.email })
        if (existingJoinUs) {
            return { error: 'Application already submitted with this email' }
        }

        const newJoinUs = new JoinUs(data)
        await newJoinUs.save()

        return { success: true }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}