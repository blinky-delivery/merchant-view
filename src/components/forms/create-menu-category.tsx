import { menuApi } from "@/api/menuApi"
import { queryClient } from "@/main"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import SpinnerIcon from "../ui/spinner"
import { Textarea } from "../ui/textarea"
import { Separator } from "../ui/separator"

interface CreateMenuCategoryFormProps {
    storeId: string
    menuId: string
    children: React.ReactNode

}

const CreateMenuCategoryForm = ({ menuId, storeId, children }: CreateMenuCategoryFormProps) => {
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')

    const [sheetOpen, setSheetOpen] = useState(false)

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Category name must be at least 2 characters.',
        }),
        description: z.string().max(255, {
            message: 'Max 255 characters'
        }),
    })

    const mutation = useMutation({
        mutationFn: menuApi.createMenuCategory,
        onError: (error: any) => setError(error.message),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(
            {
                menuId: menuId,
                name: values.name,
                description: values.description,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ['menu_categories', menuId] })
                    setSheetOpen(false)
                }
            }
        )
    }

    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>New Category</SheetTitle>
                    <SheetDescription>You can edit the availability of this category after saving.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col mt-8">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8 max-w-xl"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Desserts"
                                                {...field}
                                            />
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Add a description (Optional)"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Optional
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            <div className="flex space-x-2">
                                <Button variant={"outline"} onClick={() => setSheetOpen(false)}>Cancel</Button>
                                <Button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2"
                                    disabled={mutation.isPending}
                                >
                                    {mutation.isPending && <SpinnerIcon />}
                                    Save Changes
                                </Button>

                            </div>
                        </form>
                    </Form>
                </div>

            </SheetContent>


        </Sheet>
    )
}

export default CreateMenuCategoryForm