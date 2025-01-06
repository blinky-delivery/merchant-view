import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useRouter } from "@tanstack/react-router";
import { useSignIn } from "@clerk/clerk-react";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SpinnerIcon from "./ui/spinner";


interface SigninFormData {
    email: string;
    password: string;
}

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {

    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { signIn } = useSignIn()
    const router = useRouter()


    const form = useForm<SigninFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        onSubmit: async ({ value }) => {
            setIsLoading(true)
            setError("");
            try {
                const user = await signIn?.create({ identifier: value.email, password: value.password })
                if (user) {
                    router.navigate({
                        to: '/dashboard/apply',
                        reloadDocument: true,
                    })
                }
            } catch (e) {

            }
            setIsLoading(false)
        },
    });


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void form.handleSubmit();
            }}
            className={cn("flex flex-col gap-6", className)}
            {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-balance text-sm text-muted-foreground">
                    Enter your email below to login to your account
                </p>
            </div>
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
            <form.Field
                name="email"
                validators={{
                    onBlur: ({ value }) => {
                        if (!value.trim()) return "Email is required";
                        if (!value.includes('@')) return "Invalid email address";
                        return undefined;
                    }
                }}
            >
                {(field) => (
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                            <p className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                )}
            </form.Field>

            <form.Field
                name="password"
                validators={{
                    onBlur: ({ value }) => {
                        if (!value) return "Password is required";
                        if (value.length < 8) return "Password must be at least 8 characters";
                        return undefined;
                    }
                }}
            >
                {(field) => (
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                        {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                            <p className="text-sm text-red-500">{error}</p>
                        ))}
                    </div>
                )}
            </form.Field>

            <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2"
            >
                {isLoading && <SpinnerIcon />}
                Login
            </Button>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                </Link>
            </div>
        </form>
    )
}
