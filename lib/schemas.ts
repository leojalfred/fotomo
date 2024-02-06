import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export const signUpSchema = logInSchema
  .extend({
    confirmPassword: z.string().min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password and Confirm Password must match',
    path: ['confirmPassword'],
  })
