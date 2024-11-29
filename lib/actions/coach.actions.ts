'use server'

import { z } from "zod"
import { coachSignUpSchema } from "../validations/auth"
import { connectDB } from "../mongoose"
import User from "@/models/User"
import Coach from "@/models/Coach"
import Team from "@/models/Team"

export const createCoach = async (data: z.infer<typeof coachSignUpSchema>) => {
    const { username, playName, email } = data

    if(!username || !email || !playName) {
        return { error: 'Please fill all the fields' }
    }

    try
    {
        connectDB()

        const user = await User.findOne({ email })

        if(user) {
            return { error: 'Email already exists' }
        }

        const newUser = new User({
            name: username,
            email,
            role: 'coach',
        })

        const newCoach = new Coach({
            userId: newUser._id,
        })

        // const newTeam = new Team({
        //     name: teamName,
        //     playName,
        //     numberOfPlayers: parseInt(numberOfPlayers),
        //     coachId: newCoach._id,
        //     players: []
        // })
        
        await Promise.all([newUser.save(), newCoach.save()])

        return { success: 'Coach created successfully', user: newUser }
    }
    catch(error)
    {
        return { error: 'Something went wrong' }
    }
}