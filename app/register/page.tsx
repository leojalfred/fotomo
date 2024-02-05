import { SignUpForm } from '@/components/Auth'

export default function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <main className="duration-200 animate-in fade-in">
        <h1 className="mb-8 text-center text-2xl font-semibold tracking-tight lg:text-3xl">
          Sign Up
        </h1>
        <SignUpForm />
      </main>
    </div>
  )
}
