import { LoginForm } from '@/components/login-form'
import { useSignIn } from '@clerk/clerk-react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { GalleryVerticalEnd } from 'lucide-react'

export const Route = createLazyFileRoute('/auth/login')({
  component: Login,
})

export function Login() {
  const { isLoaded, signIn } = useSignIn()

  const handleSubmit = async () => {
    if (signIn && isLoaded) {
      try {
        const result = await signIn.create({
          strategy: 'password',
          password: '1234567890',
          identifier: 'test',
        })
        console.log('signin successful:', result)
      } catch (error) {
        console.log('signin failed:', error)
      }
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Blinky
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/cover-login.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
