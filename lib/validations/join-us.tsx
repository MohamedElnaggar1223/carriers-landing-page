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
    .regex(/^[0-9]+$/, { message: "رقم الهاتف يجب أن يحتوي على أرقام فقط" })
    .refine((val) => {
      if (val.startsWith("0")) {
        return val.length === 10;
      }
      return val.length === 9;
    }, {
      message: "رقم الهاتف يجب أن يكون 10 أرقام إذا بدأ ب 0، أو 9 أرقام بدون الصفر",
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