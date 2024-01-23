import { z } from 'zod'

export const signUpSchema = z.object({
    name: z.string().min(1, "Name is required").max(20, "User name can not be more than 20 letters"),
    email: z.string().min(1, "Email is required").email({ message: "Must be a valid email" }),
    password: z.string().min(8, "Password must be at least 8 characters")
})

export const signInSchema = z.object({
    email: z.string().min(1, "Email is required").email({ message: "Must be a valid email" }),
    password: z.string().min(1, "Password is required")
})


export type ISignUpSchema = z.infer<typeof signUpSchema>
export type ISignInSchema = z.infer<typeof signInSchema>
