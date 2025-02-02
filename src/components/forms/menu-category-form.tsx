import { menuApi, MenuCategory } from "@/api/menuApi"
import { queryClient } from "@/main"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import FormSubmitButtons from "./form-submit-buttons"
import { useToast } from "@/hooks/use-toast"

interface MenuCategoryFormProps {
    storeId: string
    menuId: string
    onOpenChanges: (value: boolean) => void
    isOpen: boolean
    menuCategory?: MenuCategory


}

const MenuCategoryForm = ({ menuId, storeId, menuCategory, isOpen, onOpenChanges }: MenuCategoryFormProps) => {

    const { toast } = useToast()

    const onMutationSuccess = () => {
        queryClient.invalidateQueries({ queryKey: ['menu_categories', menuId] })
        onOpenChanges(false)
        const toastMessage = menuCategory == undefined ? 'Cateogry has been created.' : 'Cateogry has been updated.'
        toast({ title: toastMessage, })
    }

    const onMutatuionError = () => {
        onOpenChanges(false)
        toast({
            variant: 'destructive',
            title: "Uh oh! Something went wrong.",
        })
    }


    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Category name must be at least 2 characters.',
        }),
        description: z.string().max(255, {
            message: 'Max 255 characters'
        }),
    })

    const createMutation = useMutation({
        mutationFn: menuApi.createMenuCategory,
        onSuccess: onMutationSuccess,
        onError: onMutatuionError,
    })

    const updateMutation = useMutation({
        mutationFn: menuApi.updateMenuCategory,
        onSuccess: onMutationSuccess,
        onError: onMutatuionError,
    })

    const mutationIsPending = updateMutation.isPending || createMutation.isPending

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: menuCategory?.name,
            description: menuCategory?.description,
        },
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (menuCategory != undefined) {
            updateMutation.mutate({
                id: menuCategory.id,
                name: values.name,
                description: values.description,
            })

        } else {
            createMutation.mutate({
                menuId: menuId,
                name: values.name,
                description: values.description,
            })
        }



    }

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChanges}>

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
                            <FormSubmitButtons
                                isDisabled={mutationIsPending}
                                isLoading={mutationIsPending}
                                showCancel={true}
                                onCancel={() => onOpenChanges(false)}
                            />
                        </form>
                    </Form>
                </div>

            </SheetContent>


        </Sheet>
    )
}

export default MenuCategoryForm