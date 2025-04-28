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

    phoneNumber: z
    .string()
    .regex(/^[0-9]+$/, {
      message: "رقم الهاتف يجب أن يحتوي على أرقام فقط",
    }),
    
    role: z.enum(["player", "coach"], {
        required_error: "يرجى تحديد دور",
    }),
    gameName: z.array(z.string()).min(1, {
        message: "يجب اختيار لعبة واحدة على الأقل",
    }),
    isPartOfTeam: z.boolean(),
    teamName: z.string().optional(),
})