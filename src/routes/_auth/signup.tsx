import { SignupForm } from '@/components/forms/signup-form'
import { createFileRoute } from '@tanstack/react-router'
import { GalleryVerticalEnd } from 'lucide-react'

export const Route = createFileRoute('/_auth/signup')({
  component: Signup,
})

function Signup() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* Left Section */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Logo Section */}
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Blinky
          </a>
        </div>

        {/* Signup Form Section */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>

      {/* Right Section with Image */}
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/cover-login.jpg"
          alt="Signup Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
