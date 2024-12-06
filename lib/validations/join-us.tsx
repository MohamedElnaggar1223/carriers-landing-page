import { z } from "zod"

export const joinUsSchema = z.object({
    fullName: z.string().min(1, {
        message: "Full name is required",
    }),
    email: z.string().email({
        message: "Invalid email address",
    }),
    countryCode: z.string().min(1, {
        message: "Country code is required",
    }),
    phoneNumber: z.string().min(1, {
        message: "Phone number is required",
    }),
    role: z.enum(["player", "coach"], {
        required_error: "Please select a role",
    }),
    gameName: z.string().min(1, {
        message: "Game name is required",
    }),
    isPartOfTeam: z.boolean(),
    teamName: z.string().optional(),
})