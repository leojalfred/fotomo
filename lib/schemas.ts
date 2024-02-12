import { z } from 'zod'

export const logInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must contain at least 8 characters' }),
})

export const signUpSchema = logInSchema
  .extend({
    givenName: z
      .string()
      .min(1, { message: 'First name must contain at least 1 character' }),
    familyName: z
      .string()
      .min(1, { message: 'Last name must contain at least 1 character' }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Confirm password must contain at least 8 characters',
      }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password and confirm password must match',
    path: ['confirmPassword'],
  })

export const createGroupSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  accessLevel: z.literal('private').or(z.literal('public')),
  members: z.array(z.string()),
})
