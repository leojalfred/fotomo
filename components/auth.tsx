'use client'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
import { logInSchema, signUpSchema } from '@/lib/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, MoveRight } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export function LogInForm() {
  const [state, action] = useFormState(logIn, { message: '' })
  const form = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Access your account
      </h1>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Enter your email and password to log in
        </p>
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
                      autoComplete="email"
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
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </Form>
        {state.message && (
          <Alert variant="destructive">
            <AlertCircle size={16} />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Need an account?{' '}
          <Link
            href="/register"
            className="inline-flex items-center transition-colors hover:text-foreground"
          >
            Sign up <MoveRight className="ml-1" size={16} />
          </Link>
        </p>
      </div>
    </div>
  )
}

export function SignUpForm() {
  const [state, action] = useFormState(signUp, { type: 'info', message: '' })
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      givenName: '',
      familyName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) form.reset()
  }, [form, form.formState.isSubmitSuccessful])

  return (
    <div className="rounded-xl border bg-card p-6 text-card-foreground shadow">
      <h1 className="mb-1 text-2xl font-semibold tracking-tight">
        Create an account
      </h1>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Enter your information and sign up to get started
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(action)} className="space-y-4">
            <FormField
              control={form.control}
              name="givenName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      autoComplete="given-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="familyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      autoComplete="family-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      autoComplete="email"
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
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
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
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign up
            </Button>
          </form>
        </Form>
        {state.message && (
          <Alert variant={state.type === 'error' ? 'destructive' : 'default'}>
            <AlertCircle size={16} />
            <AlertTitle>
              {state.type === 'error' ? 'Error' : 'Heads up!'}
            </AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}
        <p className="text-center text-sm text-muted-foreground">
          Have an account?{' '}
          <Link
            href="/login"
            className="inline-flex items-center transition-colors hover:text-foreground"
          >
            Log in <MoveRight className="ml-1" size={16} />
          </Link>
        </p>
      </div>
    </div>
  )
}
