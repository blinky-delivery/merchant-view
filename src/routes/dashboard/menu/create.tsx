import { menuApi } from '@/api/menuApi'
import { Input } from '@/components/ui/input'
import SpinnerIcon from '@/components/ui/spinner'
import { queryClient } from '@/main'
import { useMutation } from '@tanstack/react-query'
import {
  createFileRoute,
  useNavigate,
  useRouteContext,
} from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

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
import { useStoreSites } from '@/api/storeApi'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const Route = createFileRoute('/dashboard/menu/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const context = useRouteContext({ from: '/dashboard' })
  const storeId = context.storeId as string
  const { data: sites, isLoading: sitesLoading } = useStoreSites(storeId)

  const navigate = useNavigate()
  const [error, setError] = useState<string>('')

  const formSchema = z.object({
    name: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    description: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    siteId: z.string().uuid(),
  })

  const createMenuMutation = useMutation({
    mutationFn: menuApi.createMenu,
    onError: (error: any) => setError(error.message),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      siteId: sites ? sites[0].id : '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createMenuMutation.mutate(
      {
        description: values.description,
        name: values.name,
        storeId: storeId,
        siteId: values.siteId,
      },
      {
        onSuccess: ({ data }) => {
          queryClient.invalidateQueries({ queryKey: ['menus', storeId] })
          navigate({
            to: '/dashboard/store/menu/$menuId',
            params: { menuId: data.id },
          })
        },
      },
    )
  }

  if (sitesLoading) {
    return <p>Loading...</p>
  }

  if (!sites) {
    return <p>Sites not found</p>
  }

  return (
    <div className="felx flex-col space-y-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Create a menu</h2>
        <p className="text-muted-foreground">
          Creating a menu is the first step towards showcasing your store 🚀
        </p>
      </div>

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
                <FormLabel>Menu name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter a descriptive menu name"
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

          <FormField
            control={form.control}
            name="siteId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Menu Site</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {sites.map((site) => (
                      <SelectItem key={site.id} value={site.id}>
                        {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  The store location for this menu
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2"
            disabled={createMenuMutation.isPending}
          >
            {createMenuMutation.isPending && <SpinnerIcon />}
            Create Menu
          </Button>
        </form>
      </Form>
    </div>
  )
}
