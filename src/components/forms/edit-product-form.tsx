import { queryClient } from "@/main";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { useMutation } from "@tanstack/react-query";
import { Input } from "../ui/input";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Textarea } from "../ui/textarea";
import FormSubmitButtons from "./form-submit-buttons";
import { productApi } from "@/api/productApi";
import { useImageSelectorDialogState } from "@/state/image-selector.store";
import { useEditProductForm } from "@/state/edit-product-form-store";
import ProductImage from "../menu/product-image";
import InfoLabel from "./info-label";
import { ImageStatus } from "@/api/imageApi";

export default function EditProductForm() {

    const { isOpen, product, menuCategory, primaryImage, setProductPrimaryImage, closeForm } = useEditProductForm()

    const { openProductImageSelecetor } = useImageSelectorDialogState()

    const [error, setError] = useState<string>("")


    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Item name is necessary",
        }),
        description: z.string().max(1000).optional(),
        price: z.coerce.number().min(0.5, {
            message: "Add a price for the item."
        }),
        taxRate: z.coerce.number().min(0).optional(),
    })

    const mutation = useMutation(
        {

            mutationFn: productApi.updateProduct,
            onError: (error: any) => setError(error.message)
        }
    )

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        form.reset({
            description: product?.description ?? undefined,
            name: product?.name,
            price: product?.price,
            taxRate: product?.taxRate ?? undefined,
        })
    }, [product])



    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (product && menuCategory) {
            mutation.mutate({
                menuCategoryId: menuCategory?.id,
                name: values.name,
                description: values.description === undefined ? null : values.description,
                price: values.price,
                taxRate: values.taxRate === undefined ? null : values.taxRate,
                primaryImageId: primaryImage?.id ?? null,
                productId: product.id,

            },
                {
                    onSuccess: ({ data: createdProduct }) => {
                        queryClient.invalidateQueries({ queryKey: ['products', menuCategory?.id] })
                        closeForm()
                    }
                }
            )
        }

    }

    if (!menuCategory || !product) return null

    return (
        <Sheet open={isOpen} onOpenChange={(open) => { if (!open) closeForm() }} >
            <SheetContent className="min-w-[600px] overflow-y-auto" >
                <SheetHeader>
                    <SheetTitle>Edit Item</SheetTitle>
                    {/* <SheetDescription>
                        You can edit the availability of this item after saving.
                    </SheetDescription> */}
                </SheetHeader>
                <div className='felx flex-col mt-8'>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-xl">
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Eg. 'Nachos'" {...field} />
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
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} placeholder="Add a mouthwatering description to help customers decide what to order. Include things like preparation methods, ingredients, and anything that makes the item unique." {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Optional
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>
                            {primaryImage?.status == ImageStatus.REVIEW && <InfoLabel
                                title="Photo Pending Review"
                                subtitle="It typically takes 2-3 days for Blinky to review your photo. Once approved, it'll appear on your Blinky menu."
                            />}
                            <div className="flex justify-between">
                                <div className="flex flex-col space-y-8">
                                    <FormField
                                        control={form.control}
                                        name='price'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center w-64 gap-2">
                                                        <Input type="number" placeholder="0.00" className="pr-8  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} />
                                                        <span className="text-muted-foreground pr-2">MAD</span>

                                                    </div>
                                                </FormControl>

                                            </FormItem>
                                        )}
                                    ></FormField>

                                    <FormField
                                        control={form.control}
                                        name='taxRate'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Item Tax Rate</FormLabel>
                                                <FormControl>
                                                    <div className="flex items-center w-64 gap-2">
                                                        <Input type="number" placeholder="0.00" className="pr-8  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" {...field} />
                                                        <span className="text-muted-foreground pr-2">%</span>

                                                    </div>
                                                </FormControl>

                                            </FormItem>
                                        )}
                                    ></FormField>
                                </div>

                                <ProductImage
                                    height={150}
                                    width={150}
                                    primaryImage={primaryImage}
                                    onEdit={() => {
                                        openProductImageSelecetor(product.id, (primaryImage) => {
                                            setProductPrimaryImage(primaryImage)
                                        })
                                    }}
                                    onRemove={() => { }}
                                />

                            </div>

                            <div className="mt-4 text-sm space-y-1">
                                <p className="font-semibold">Category</p>
                                <p className="text-muted-foreground">{menuCategory.name}</p>
                            </div>

                            <FormSubmitButtons
                                isDisabled={mutation.isPending}
                                isLoading={mutation.isPending}
                                showCancel={true}
                                onCancel={() => closeForm()}
                            />

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


