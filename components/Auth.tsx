'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { logIn, signUp } from '@/lib/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const initialState = { message: '' }

export const logInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function LogInForm() {
  const [state, action] = useFormState(logIn, initialState)
  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(action)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@domain.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Log In
        </Button>
      </form>
      {state.message && (
        <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
          {state.message}
        </p>
      )}
    </Form>
  )
}

export const signUpSchema = logInSchema
  .extend({
    confirmPassword: z.string().min(8),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password and Confirm Password must match',
    path: ['confirmPassword'],
  })

export function SignUpForm() {
  const [state, action] = useFormState(signUp, initialState)
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(action)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@domain.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
      {state.message && (
        <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
          {state.message}
        </p>
      )}
    </Form>
  )
}
