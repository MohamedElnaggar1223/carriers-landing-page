import { z } from "zod"

export const joinUsSchema = z.object({
    fullName: z.string().min(1, {
        message: "الاسم الكامل مطلوب",
    }),
    email: z.string().email({
        message: "عنوان البريد الإلكتروني غير صالح",
    }),
    countryCode: z.string().min(1, {
        message: "رمز الدولة مطلوب",
    }),
    phoneNumber: z.string().min(1, {
        message: "رقم الهاتف مطلوب",
    }),
    role: z.enum(["player", "coach"], {
        required_error: "يرجى تحديد دور",
    }),
    gameName: z.string().min(1, {
        message: "اسم اللعبة مطلوب",
    }),
    isPartOfTeam: z.boolean(),
    teamName: z.string().optional(),
})