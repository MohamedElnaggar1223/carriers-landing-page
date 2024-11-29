'use server'

import User from "@/models/User";
import { connectDB } from "../mongoose";

export async function getUserByUsername(username: string) 
{
    connectDB()
    
    const duplicateUser = await User.findOne({ name: username }, 'name').exec()
    return duplicateUser?._id?.toString()
}

export async function getUserByEmail(email: string) 
{
    connectDB()
    
    const duplicateUser = await User.findOne({ email }, 'email').exec()
    return duplicateUser?._id?.toString()
}