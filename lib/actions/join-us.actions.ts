'use server'
import { connectDB } from "../mongoose"
import JoinUs from "@/models/JoinUs"
import User from "@/models/User"
import axios from 'axios';
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

        await axios.post(process.env.SLACK_WEBHOOK_URL!, {
            text: ` New Join Us Submission📝`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*New submission received!*`,
                },
              },
              {
                type: "section",
                fields: [
                  {
                    type: "mrkdwn",
                    text: `*Full Name:*\n${data.fullName}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Email:*\n${data.email}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Phone:*\n${data.countryCode} ${data.phoneNumber}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Game:*\n${data.gameName}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*Role:*\n${data.role === 'player' ? 'Player' : 'Coach'}`,
                  },
                  {
                    type: "mrkdwn",
                    text: `*In Team:*\n${data.isPartOfTeam ? 'Yes' : 'No'}`,
                  },
                  ...(data.isPartOfTeam && data.teamName
                    ? [{
                        type: "mrkdwn",
                        text: `*Team Name:*\n${data.teamName}`,
                      }]
                    : []),
                ],
              },
            ],
          });

        return { success: true }
    } catch (error) {
        console.log(error)
        return { error: 'Something went wrong' }
    }
}