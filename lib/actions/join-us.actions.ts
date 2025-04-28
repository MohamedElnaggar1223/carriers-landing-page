'use server'
import { connectDB } from "../mongoose"
import JoinUs from "@/models/JoinUs"
import User from "@/models/User"
import { joinUsSchema } from "../validations/join-us"
import { z } from "zod"

export const createJoinUsEntry = async (data: { fullName: string, email: string, countryCode: string, phoneNumber: string, role: string, isPartOfTeam: boolean, teamName?: string, gameName: string }) => {
    if (!data.fullName || !data.email || !data.countryCode || !data.phoneNumber || !data.role) {
        return { error: 'الرجاء تعبئة جميع الحقول المطلوبة' }
    }

    if (data.isPartOfTeam && !data.teamName) {
        return { error: 'اسم الفريق مطلوب عند الانضمام إلى فريق' }
    }

    try {
        await connectDB()

        const existingUser = await User.findOne({ email: data.email })
        if (existingUser) {
            return { error: 'البريد الإلكتروني مسجل بالفعل' }
        }

        const existingJoinUs = await JoinUs.findOne({ email: data.email })
        if (existingJoinUs) {
            return { error: 'تم تقديم طلب بالفعل باستخدام هذا البريد الإلكتروني' }
        }

        const newJoinUs = new JoinUs(data)
        await newJoinUs.save()

        return { success: true }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}