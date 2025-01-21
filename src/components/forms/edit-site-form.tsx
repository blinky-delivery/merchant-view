import { StoreSite } from "@/api/storeApi";
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
interface EditSiteForm {
    site: StoreSite
}

export default function EditSiteForm({ site }: EditSiteForm) {

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Site namne must be at least 2 characters.",
        }),
        phone: z.string().min(10, {
            message: "Phone number must be minimum of 10 numbers"
        }),
        postalCode: z.string().min(5, {
            message: "Postal code must be at least 5 characters.",
        }),
        address: z.string().min(5, {
            message: "Address must be at least 5 characters.",
        }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: site?.name,
            address: site?.address,
            phone: site?.phone,
            postalCode: site?.postalCode,
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Change site settings</CardTitle>
                <CardDescription>Changes on these settings requires a review to be published.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className='grid w-full items-center gap-4'>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Site Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the site name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the name of your restaurant site.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the site address" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the address of your restaurant site.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name='phone'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the contact phone number" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the contact phone number for your restaurant site.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>

                            <FormField
                                control={form.control}
                                name='postalCode'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter the postal code" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the postal code for your restaurant site.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            ></FormField>


                        </div>
                    </form>
                </Form>

            </CardContent>

            <CardFooter className="flex justify-between">
                <Button variant="outline">Reset</Button>
                <Button>Save Changes</Button>
            </CardFooter>
        </Card>
    )
}