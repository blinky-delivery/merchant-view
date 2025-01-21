import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useMutation } from "@tanstack/react-query";
import { useForm } from '@tanstack/react-form'
import { useState } from "react";
import { SignupPayload, User, userApi } from "@/api/userApi";
import { Link, useRouter } from "@tanstack/react-router";
import { useSignIn } from "@clerk/clerk-react";
import { ApiResponse } from "@/api/axiosInstance";
import SpinnerIcon from "../ui/spinner";

interface SignupFormData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
}

export function SignupForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const { isLoaded, signIn } = useSignIn()
    const router = useRouter()

    if (!isLoaded) {
        // Handle loading state
        return null
    }
    const [error, setError] = useState<string>("");

    const mutation = useMutation({
        mutationFn: userApi.signup,
        onError: (error: any) => {
            if (error.response?.status === 409) {
                setError("Email already exists");
            } else {
                setError("An error occurred. Please try again.");
            }
        },
        onSuccess: async (data: ApiResponse<User>, variables: SignupPayload, context: unknown) => {
            const user = await signIn.create({ identifier: variables.email, password: variables.password })
            if (user) {
                router.navigate({
                    to: '/dashboard/apply',
                    reloadDocument: true,
                })
            }
        }
    });

    const form = useForm<SignupFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneNumber: ''
        },
        onSubmit: async ({ value }) => {
            setError("");
            mutation.mutate({
                email: value.email,
                password: value.password,
                fullName: value.fullName,
                phoneNumber: value.phoneNumber
            });
        },
    });

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void form.handleSubmit();
                }}
                className={cn("flex flex-col gap-6", className)}
                {...props}
            >
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your details below to sign up for an account
                    </p>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="grid gap-6">
                    <form.Field
                        name="fullName"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value.trim()) return "Full name is required";
                                if (value.length < 2) return "Name must be at least 2 characters";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="full-name">Full Name</Label>
                                <Input
                                    id="full-name"
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
                        name="phoneNumber"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value.trim()) return "Phone number is required";
                                // Basic phone number validation - requires at least 10 digits
                                if (!/^\d{10,}$/.test(value.replace(/\D/g, ''))) {
                                    return "Please enter a valid phone number with at least 10 digits";
                                }
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="phone-number">Phone Number</Label>
                                <Input
                                    id="phone-number"
                                    type="tel"
                                    className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    placeholder="Enter your phone number"
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                                    <p className="text-sm text-red-500">{error}</p>
                                ))}
                            </div>
                        )}
                    </form.Field>

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

                    <form.Field
                        name="confirmPassword"
                        validators={{
                            onChangeListenTo: ['password'],
                            onBlur: ({ value, fieldApi }) => {
                                if (!value) return "Please confirm your password";
                                if (value !== fieldApi.form.getFieldValue('password')) {
                                    return "Passwords don't match";
                                }
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="confirm-password">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
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
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending && <SpinnerIcon />}
                        Sign Up
                    </Button>


                </div>

                <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="underline underline-offset-4">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}