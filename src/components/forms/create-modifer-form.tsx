import { StoreSite } from "@/api/storeApi"
import { menuApi } from '@/api/menuApi'
import { Input } from '@/components/ui/input'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import {
    useNavigate,
} from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { z } from 'zod'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import Select from 'react-select';
import {
    Select as CustomSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ChevronDown, ChevronUp, GripVertical, Plus, PlusIcon, TrashIcon } from "lucide-react"
import FormSubmitButtons from "./form-submit-buttons"
import { modifierApi } from "@/api/modifierApi"
import { Separator } from "../ui/separator"
import { Sortable, SortableDragHandle, SortableItem } from "../ui/sortable"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible"
import { Switch } from "../ui/switch"
import makeAnimated from 'react-select/animated';
import { Product, useProductsByNameQueryAndMenu } from "@/api/productApi"

interface CreateModifierFormProps {
    site: StoreSite
    storeId: string
    menuId: string
}

export default function CreateModifierForm({ site, menuId, storeId }: CreateModifierFormProps) {
    const navigate = useNavigate()
    const [error, setError] = useState<string>('')

    const [sheetOpen, setSheetOpen] = useState(false)
    const [rulesOpen, setRulesOpen] = useState(false)

    const formSchema = z.object({
        name: z.string().min(2, {
            message: 'Name must be at least 2 characters.',
        }),
        required: z.boolean(),
        multipleAllowed: z.boolean(),
        minQuantity: z.coerce.number().optional(),
        maxQuantity: z.coerce.number().optional(),
        maxFreeQuantity: z.coerce.number().optional(),
        options: z.array(
            z.object({
                name: z.string().min(2, {
                    message: 'Name must be at least 2 characters.',
                }),
                price: z.coerce.number().optional(),
            })
        ).min(1),
        productsIds: z.array(z.string())

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            required: false,
            multipleAllowed: false,
            productsIds: [],
            options: [
                {
                    name: '',
                }
            ]
        },
    })

    const { fields, append, move, remove } = useFieldArray({
        control: form.control,
        name: "options",
    })

    const createModifierMutation = useMutation({
        mutationFn: modifierApi.createModifier,
        onError: (error: any) => setError(error.message),
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createModifierMutation.mutate(
            {
                name: values.name,
                storeSiteId: site.id,
                menuId: menuId,
                required: values.required,
                multipleAllowed: values.multipleAllowed,
                maxFreeQuantity: values.maxFreeQuantity ?? 0,
                maxQuantity: values.maxQuantity ?? 0,
                minQuantity: values.minQuantity ?? 0,
                options: values.options.map((opt) => ({
                    name: opt.name,
                    price: opt.price ?? 0,
                })),
                productsIds: values.productsIds,
            },
            {
                onSuccess: ({ data }) => {
                    queryClient.invalidateQueries({ queryKey: ['menus', storeId] })
                    setSheetOpen(false)
                },
            },
        )
    }

    const [productNameQuery, setProductNameQuery] = useState('')
    const [products, setProducts] = useState<{ label: string, value: string }[]>([])
    const { data: productsData, isLoading: productsLoading } = useProductsByNameQueryAndMenu(menuId, productNameQuery)

    useEffect(() => {
        if (productsData) {
            setProducts(productsData.map((prodData) => ({ label: prodData.name, value: prodData.id })))
        }
    }, [productsData])

    const maxOptionsSelects = [
        { label: 'No Max', value: undefined },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
    ]

    const maxFeeOptionsSelects = [
        { label: 'No Max', value: undefined },
        { label: '1', value: 1 },
        { label: '2', value: 2 },
    ]

    const minOptionsSelects = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
    ]

    const animatedComponents = makeAnimated()


    if (!products) return null


    return (
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen} modal={true}>
            <SheetTrigger asChild>
                <Button className="space-x-1">
                    <PlusIcon /> <span>New Modifier</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="min-w-[600px] overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>New Modifier</SheetTitle>
                    <SheetDescription>
                        You can edit the availability of this modifier after saving.
                    </SheetDescription>
                </SheetHeader>

                <div className='felx flex-col mt-8'>
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
                                        <FormLabel className="text-lg">Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="E.g. 'Toppings'"
                                                {...field}
                                            />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>


                            <div className="flex flex-col space-y-4">
                                <div className="space-y-1">
                                    <h2 className="text-foreground font-semibold text-lg">Used in</h2>
                                    {form.watch().productsIds.length == 0 && <h3 className="text-muted-foreground">0 items</h3>}
                                </div>
                                <Select
                                    closeMenuOnSelect={false}
                                    isMulti={true}
                                    hideSelectedOptions={true}
                                    onChange={(value) => {
                                        const newSelectedProducts = value as { label: string, value: string }[]
                                        form.setValue('productsIds', newSelectedProducts.map((prod) => prod.value))
                                    }}
                                    options={products}
                                    isLoading={productsLoading}
                                    onInputChange={(query, _) => {
                                        if (query != productNameQuery) {
                                            setProductNameQuery(query)
                                        }
                                    }}
                                    noOptionsMessage={() => 'No products'}

                                />

                            </div>
                            <Separator />
                            <FormField
                                control={form.control}
                                name='options'
                                render={(field) => (
                                    <FormItem>
                                        <FormLabel>
                                            <div className="flex flex-col space-y-1">
                                                <h2 className="text-lg">Options</h2>
                                                <h3 className="text-muted-foreground font-normal text-base">Give your customers a list of options to choose from.</h3>
                                            </div>
                                        </FormLabel>
                                        <div className="h-1"></div>
                                        <Sortable
                                            value={fields}
                                            onMove={({ activeIndex, overIndex }) =>
                                                move(activeIndex, overIndex)
                                            }
                                            overlay={
                                                <div className="grid grid-cols-[0.5fr,1fr,auto,auto] items-center gap-2">
                                                    <div className="h-8 w-full rounded-sm bg-primary/10" />
                                                    <div className="h-8 w-full rounded-sm bg-primary/10" />
                                                    <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                                                    <div className="size-8 shrink-0 rounded-sm bg-primary/10" />
                                                </div>
                                            }
                                        >
                                            <div className="flex w-full flex-col gap-2">
                                                {fields.map((field, index) => (
                                                    <SortableItem key={field.id} value={field.id} asChild>
                                                        <div className="grid grid-cols-[1fr,0.5fr,auto,auto] items-center gap-2">

                                                            <FormField
                                                                control={form.control}
                                                                name={`options.${index}.name`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input className="h-8" {...field} />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />

                                                            <FormField
                                                                control={form.control}
                                                                name={`options.${index}.price`}
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormControl>
                                                                            <Input type="number" className="h-8" {...field} placeholder="0.0 MAD" />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />


                                                            <SortableDragHandle
                                                                variant="outline"
                                                                size="icon"
                                                                className="size-8 shrink-0"
                                                            >
                                                                <GripVertical />

                                                            </SortableDragHandle>
                                                            <Button
                                                                disabled={form.watch().options.length <= 1}
                                                                type="button"
                                                                variant="outline"
                                                                size="icon"
                                                                className="size-8 shrink-0"
                                                                onClick={() => remove(index)}
                                                            >
                                                                <TrashIcon
                                                                    className="size-4 text-destructive"
                                                                    aria-hidden="true"
                                                                />
                                                                <span className="sr-only">Remove</span>
                                                            </Button>
                                                        </div>
                                                    </SortableItem>
                                                ))}
                                            </div>
                                        </Sortable>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            className="w-fit space-x-1"
                                            onClick={() => append({ name: "" })}
                                        >
                                            <Plus size='16' />
                                            <span>Add option</span>
                                        </Button>

                                    </FormItem>)}
                            >

                            </FormField>

                            <Separator />

                            <Collapsible open={rulesOpen} onOpenChange={setRulesOpen}>
                                <div className="flex flex-col space-y-4">
                                    <div className="flex justify-between">
                                        <div className="flex flex-col space-y-1">
                                            <h2 className="text-foreground font-semibold text-lg">Rules</h2>
                                            <h3 className="text-muted-foreground">Set rules for the way your customers can select the options in this modifier.</h3>
                                        </div>
                                        <CollapsibleTrigger asChild>
                                            <Button variant={'ghost'}>
                                                {rulesOpen && <ChevronUp />}
                                                {!rulesOpen && <ChevronDown />}
                                            </Button>
                                        </CollapsibleTrigger>


                                    </div>
                                    <CollapsibleContent>
                                        <div className="flex flex-col space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="required"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                        <div className="space-y-0.5">
                                                            <FormLabel>Require a selection</FormLabel>
                                                            <FormDescription>
                                                                If you turn of this switch, customers will have to select at least one option in order to add the item to the cart.
                                                            </FormDescription>
                                                        </div>
                                                        <FormControl>
                                                            <Switch
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        </FormControl>
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="multipleAllowed"
                                                render={({ field }) => (
                                                    <div className="flex flex-col space-y-4 rounded-lg border p-3 shadow-sm">
                                                        <FormItem className="flex flex-row items-center justify-between">
                                                            <div className="space-y-0.5">
                                                                <FormLabel>Allow multiple selections</FormLabel>
                                                                <FormDescription>
                                                                    If you turn of this switch, customers will be able to select more than one option.
                                                                </FormDescription>
                                                            </div>
                                                            <FormControl>
                                                                <Switch
                                                                    checked={field.value}
                                                                    onCheckedChange={field.onChange}
                                                                />
                                                            </FormControl>
                                                        </FormItem>

                                                        {form.watch().required && (<FormField
                                                            control={form.control}
                                                            name="minQuantity"

                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <div className="flex flex-row items-center justify-between">
                                                                        <FormLabel>Minimum:</FormLabel>
                                                                        <div className="w-32">
                                                                            <CustomSelect onValueChange={field.onChange} defaultValue={minOptionsSelects[0].label}>
                                                                                <FormControl>
                                                                                    <SelectTrigger>
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>
                                                                                </FormControl>
                                                                                <SelectContent className="">
                                                                                    {minOptionsSelects.map((opt) => <SelectItem key={opt.label} value={opt.label}>{opt.label}</SelectItem>)}
                                                                                </SelectContent>
                                                                            </CustomSelect>
                                                                        </div>
                                                                    </div>

                                                                </FormItem>
                                                            )}
                                                        />)
                                                        }

                                                        <FormField
                                                            control={form.control}
                                                            name="maxQuantity"

                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <div className="flex flex-row items-center justify-between">
                                                                        <FormLabel>Maximum:</FormLabel>
                                                                        <div className="w-32">
                                                                            <CustomSelect onValueChange={field.onChange} defaultValue={maxFeeOptionsSelects[0].label}>
                                                                                <FormControl>
                                                                                    <SelectTrigger>
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>
                                                                                </FormControl>
                                                                                <SelectContent className="">
                                                                                    {maxOptionsSelects.map((opt) => <SelectItem key={opt.label} value={opt.label}>{opt.label}</SelectItem>)}
                                                                                </SelectContent>
                                                                            </CustomSelect>
                                                                        </div>
                                                                    </div>

                                                                </FormItem>
                                                            )}
                                                        />

                                                        <FormField
                                                            control={form.control}
                                                            name="maxFreeQuantity"

                                                            render={({ field }) => (
                                                                <FormItem>
                                                                    <div className="flex flex-row items-center justify-between">
                                                                        <FormLabel>Maximum Free:</FormLabel>
                                                                        <div className="w-32">
                                                                            <CustomSelect onValueChange={field.onChange} defaultValue={maxFeeOptionsSelects[0].label}>
                                                                                <FormControl>
                                                                                    <SelectTrigger>
                                                                                        <SelectValue />
                                                                                    </SelectTrigger>
                                                                                </FormControl>
                                                                                <SelectContent className="">
                                                                                    {maxOptionsSelects.map((opt) => <SelectItem key={opt.label} value={opt.label}>{opt.label}</SelectItem>)}
                                                                                </SelectContent>
                                                                            </CustomSelect>
                                                                        </div>
                                                                    </div>

                                                                </FormItem>
                                                            )}
                                                        />




                                                    </div>
                                                )}
                                            />
                                        </div>
                                    </CollapsibleContent>
                                </div>
                            </Collapsible>

                            <FormSubmitButtons
                                isDisabled={createModifierMutation.isPending}
                                isLoading={createModifierMutation.isPending}
                                showCancel={true}
                                onCancel={() => setSheetOpen(false)}
                            />
                        </form>
                    </Form>
                </div>
            </SheetContent>
        </Sheet>
    )
}