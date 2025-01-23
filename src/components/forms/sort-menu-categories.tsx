import { menuApi, MenuCategory } from "@/api/menuApi"

interface SortMenuCategoriesFormProps {
    menuId: string
    categories: MenuCategory[]
    children: React.ReactNode
}

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Sortable, SortableDragHandle, SortableItem } from "../ui/sortable"
import { GripVertical } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/main"
import FormSubmitButtons from "./form-submit-buttons"


const SortMenuCategoriesForm: React.FC<SortMenuCategoriesFormProps> = ({ menuId, categories, children }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [error, setError] = useState<string>('')

    const [sortedCategories, setSortedCategories] = useState(categories)
    const swapCategories = (index1: number, index2: number) => {
        setSortedCategories((prevCategories) => {
            const newCategories = [...prevCategories]
            const temp = newCategories[index1]
            newCategories[index1] = newCategories[index2]
            newCategories[index2] = temp
            return newCategories
        })
    }

    const resortMutation = useMutation({
        mutationFn: menuApi.resortMenuCategories,
        onError: (err) => setError(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['menu_categories', menuId] })
            setDialogOpen(false)

        }
    })

    const onSubmit = () => {
        resortMutation.mutate({
            menuId: menuId,
            newOrder: sortedCategories.map((category) => category.id),
        })
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rearrange Categories </DialogTitle>
                    <DialogDescription>Drag and drop to rearrange the categories</DialogDescription>
                </DialogHeader>
                <Sortable value={sortedCategories} onMove={({ activeIndex, overIndex }) => swapCategories(activeIndex, overIndex)}>
                    {sortedCategories.map((category) => (
                        <SortableItem key={category.id} value={category.id} asChild>
                            <div className="flex justify-between">
                                <div>
                                    {category.name}

                                </div>
                                <SortableDragHandle
                                    variant="outline"
                                    size="icon"
                                    className="size-8 shrink-0"
                                >
                                    <GripVertical />
                                </SortableDragHandle>
                            </div>
                        </SortableItem>
                    ))}
                </Sortable>
                <DialogFooter>

                    <FormSubmitButtons
                        isDisabled={resortMutation.isPending}
                        isLoading={resortMutation.isPending}
                        showCancel={true}
                        onCancel={() => setDialogOpen(false)}
                        onSubmit={onSubmit}
                    />

                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}

export default SortMenuCategoriesForm