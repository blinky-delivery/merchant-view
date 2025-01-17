import { Menu, menuApi } from "@/api/menuApi";
import { queryClient } from "@/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useRouteContext } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import SpinnerIcon from "./ui/spinner";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Settings } from "lucide-react";
import { Textarea } from "./ui/textarea";

export default function EditMenuForm({ menu }: { menu: Menu }) {
    const context = useRouteContext({ from: '/dashboard' })
    const storeId = context.storeId as string
    const navigate = useNavigate()
    const [error, setError] = useState<string>("");

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
        description: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })

    const updateMenuMutation = useMutation(
        {
            mutationFn: menuApi.createMenu,
            onError: (error: any) => setError(error.message)
        }
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: menu.name,
            description: menu.description,
        },

    })


    const onSubmit = (values: z.infer<typeof formSchema>) => {
        updateMenuMutation.mutate({
            description: values.description,
            name: values.name,
            storeId: storeId,
        },
            {
                onSuccess: ({ data }) => {
                    queryClient.invalidateQueries({ queryKey: ['menus', storeId] })
                    navigate({ to: '/dashboard/store/menu/$menuId', params: { menuId: data.id } })
                }
            }
        )
    }

    return (
        <Sheet >
            <SheetTrigger asChild>
                <Button variant="outline"><Settings /></Button>
            </SheetTrigger>
            <SheetContent >
                <SheetHeader>
                    <SheetTitle>Edit Menu</SheetTitle>
                    <SheetDescription>
                        Make changes to your meu here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className='felx flex-col mt-8'>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Menu name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter a descriptive menu name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the menu name that will be displayed to your customers
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Menu Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Enter a menu description" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Provide a brief description of the menu
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <Button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2"
                                disabled={updateMenuMutation.isPending}
                            >
                                {updateMenuMutation.isPending && <SpinnerIcon />}
                                Save changes
                            </Button>
                        </form>

                    </Form>
                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        {/* <Button type="submit">Save changes</Button> */}
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    )

}
