import { City, parametersApi, StoreType } from '@/api/parametersApi'
import { storeApplicationsApi } from '@/api/storeApplicationsApi'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import SpinnerIcon from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { Label } from '@radix-ui/react-label'
import { FieldApi, useForm } from '@tanstack/react-form'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../ui/command'
import { ApiResponse } from '@/api/axiosInstance'

interface ApplyForStoreFormData {
    name: string
    contactPhone: string
    numberOfSites: number
    storeType: number
    city: number
    address: string
    idCardFront: File
    idCardBack: File
    storeImage: File
}

export function ApplyForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {

    const citiesQuery = useQuery<ApiResponse<City[]>, Error>({
        queryKey: ['cities'],
        queryFn: parametersApi.getCities,
    })

    const storeTypesQuery = useQuery<ApiResponse<StoreType[]>, Error>({
        queryKey: ['storeTypes'],
        queryFn: parametersApi.getStoreTypes,
    })

    const [error, setError] = useState<string>("");


    const form = useForm<ApplyForStoreFormData>({
        defaultValues: {
            name: '',
            contactPhone: '',
            numberOfSites: 1,
            storeType: 0,
            city: 0,
            address: '',
            idCardBack: new File([], ''),
            idCardFront: new File([], ''),
            storeImage: new File([], ''),
        },

        onSubmit: (data) => {
            console.log('Form submitted with values:', data.value);
            applyMutation.mutate({
                name: data.value.name,
                contactPhone: data.value.contactPhone,
                numberOfSites: data.value.numberOfSites,
                storeType: data.value.storeType,
                city: data.value.city,
                address: data.value.address,
                id_card_front: data.value.idCardFront,
                id_card_back: data.value.idCardBack,
                store_image: data.value.storeImage,
            });

        },
    });


    const [cityOpen, setCityOpen] = useState(false)
    const [cityValue, setCityValue] = useState("")

    const [storeTypeOpen, setStoreTypeOpen] = useState(false)
    const [storeTypeValue, setStoreTypeValue] = useState("")

    const applyMutation = useMutation(
        {
            mutationFn: storeApplicationsApi.applyForStore,
            onError: (error: any) => {
                setError(error.message);
            }
        }
    )


    const handleFileChange = (field: FieldApi<ApplyForStoreFormData, any>, file: File) => {
        field.handleChange(file);
    };

    if (storeTypesQuery.isLoading || citiesQuery.isLoading) {
        return <SpinnerIcon />;
    }

    return (
        storeTypesQuery.isLoading || citiesQuery.isLoading ? <SpinnerIcon /> : (
            <div className='flex flex-col gap-4 p-6 md:p-10'>
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Apply for an online store</h1>
                    <p className="text-balance text-sm text-muted-foreground">
                        Enter your business details below to apply for an online store
                    </p>
                </div>

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        void form.handleSubmit();
                    }}
                    className={cn("grid gap-4 md:grid-cols-2", className)}
                    {...props}
                >


                    <form.Field

                        name="name"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value.trim()) return "Business name is required";
                                if (value.length < 2) return "Name must be at least 3 characters";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="relative grid gap-2">
                                <Label htmlFor="name">Business Name</Label>
                                <Input
                                    id="name"
                                    className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                                    <p className="absolute text-sm text-red-500 top-full left-0">{error}</p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="contactPhone"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value.trim()) return "Contact phone is required";
                                if (!/^\d+$/.test(value)) return "Phone number must be numeric";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="relative grid gap-2">
                                <Label htmlFor="contact-phone">Contact Phone</Label>
                                <Input
                                    id="contact-phone"
                                    className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                                    <p className="absolute text-sm text-red-500 top-full left-0">{error}</p>
                                ))}
                            </div>
                        )}
                    </form.Field>



                    <form.Field
                        name="storeType"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value) return "Store type is required";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => {
                            return (
                                <div className="relative grid gap-2">
                                    <Label htmlFor="store-type">Store Type</Label>
                                    <Popover open={storeTypeOpen} onOpenChange={setStoreTypeOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={storeTypeOpen}
                                                className="justify-between"
                                            >
                                                {storeTypeValue
                                                    ? storeTypesQuery.data?.data?.find((type) => type.name === storeTypeValue)?.name
                                                    : "Select a store type"}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="p-0">
                                            <Command>
                                                <CommandInput placeholder="Search store type ..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>No store type found</CommandEmpty>
                                                    <CommandGroup>
                                                        {storeTypesQuery.data?.data?.map((type) => (
                                                            <CommandItem
                                                                key={type.id}
                                                                value={type.name}
                                                                onSelect={(currentValue) => {
                                                                    setStoreTypeValue(currentValue === storeTypeValue ? "" : currentValue)
                                                                    setStoreTypeOpen(false)
                                                                    field.handleChange(storeTypesQuery.data?.data?.find((type) => type.name === currentValue)?.id || 0)
                                                                }}
                                                            >
                                                                {type.name}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        storeTypeValue === type.name ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>

                                            </Command>
                                        </PopoverContent>
                                    </Popover>

                                </div>
                            );
                        }}
                    </form.Field>

                    <form.Field
                        name="city"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value) return "City is required";
                                return undefined;
                            }
                        }}
                    >
                        {(field) =>
                        (
                            <div className='grid gap-2'>
                                <Label htmlFor="city">City</Label>
                                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={cityOpen}
                                            className=" justify-between"
                                        >
                                            {cityValue
                                                ? citiesQuery.data?.data?.find((city) => city.name === cityValue)?.name
                                                : "Select a city"}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className=" p-0">
                                        <Command>
                                            <CommandInput placeholder="Search city ..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>No city Found</CommandEmpty>
                                                <CommandGroup>
                                                    {citiesQuery.data?.data?.map((city) => (
                                                        <CommandItem
                                                            key={city.id}
                                                            value={city.name}
                                                            onSelect={(currentValue) => {
                                                                setCityValue(currentValue === cityValue ? "" : currentValue)
                                                                setCityOpen(false)
                                                                field.handleChange(citiesQuery.data?.data?.find((city) => city.name === currentValue)?.id || 0)
                                                            }}
                                                        >
                                                            {city.name}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    cityValue === city.name ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        )
                        }
                    </form.Field>
                    <form.Field
                        name="numberOfSites"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value) return "Number of sites is required";
                                if (value < 1) return "Must have at least one site";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="relative grid gap-2">
                                <Label htmlFor="number-of-sites">Number of Sites</Label>
                                <Input
                                    id="number-of-sites"
                                    type="number"
                                    className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => field.handleChange(Number(e.target.value))}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                                    <p className="absolute text-sm text-red-500 top-full left-0">{error}</p>
                                ))}
                            </div>
                        )}
                    </form.Field>


                    <form.Field
                        name="address"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value.trim()) return "Address is required";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="address">Address</Label>
                                <Input
                                    id="address"
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

                    <div className="my-5 md:col-span-2 flex flex-col items-center gap-2 text-center">
                        <h1 className="text-xl font-bold">Upload verification files</h1>
                        <p className="text-balance text-sm text-muted-foreground">
                            These files are required to verify your business existence
                        </p>
                    </div>

                    <form.Field
                        name="idCardFront"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value) return "ID card front image is required";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="id-card-front">ID Card Front</Label>
                                <Input
                                    id="id-card-front"
                                    type="file"
                                    className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleFileChange(field, file);
                                        }
                                    }}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                                    <p className="text-sm text-red-500">{error}</p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="idCardBack"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value) return "ID Card Back is required";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="id-card-back">ID Card Back</Label>
                                <Input
                                    id="id-card-back"
                                    type="file"
                                    className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleFileChange(field, file);
                                        }
                                    }}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                                    <p className="text-sm text-red-500">{error}</p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <form.Field
                        name="storeImage"
                        validators={{
                            onBlur: ({ value }) => {
                                if (!value) return "Store image is required";
                                return undefined;
                            }
                        }}
                    >
                        {(field) => (
                            <div className="grid gap-2">
                                <Label htmlFor="store-image">Store Image</Label>
                                <Input
                                    id="store-image"
                                    type="file"
                                    className={cn(field.state.meta.errors.length > 0 && "border-red-500")}
                                    onBlur={field.handleBlur}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleFileChange(field, file);
                                        }
                                    }}
                                />
                                {field.state.meta.isTouched && field.state.meta.errors.map((error) => (
                                    <p className="text-sm text-red-500">{error}</p>
                                ))}
                            </div>
                        )}
                    </form.Field>

                    <Button
                        type="submit"
                        className="md:col-span-2 w-full flex items-center justify-center gap-2"
                        disabled={applyMutation.isPending}
                    >
                        {applyMutation.isPending && <SpinnerIcon />}
                        Apply
                    </Button>
                </form>


            </div>
        ))
}

