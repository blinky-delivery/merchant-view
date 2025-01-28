

import React, { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Sortable, SortableDragHandle, SortableItem } from "../ui/sortable"
import { GripVertical } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/main"
import FormSubmitButtons from "./form-submit-buttons"
import { Product, productApi } from "@/api/productApi"


interface SortProductsProps {
    menuCategoryId: string
    products: Product[]
    children: React.ReactNode
}

const SortProductsForm: React.FC<SortProductsProps> = ({ menuCategoryId, products, children }) => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [error, setError] = useState<string>('')

    const [sortedProducts, setSortedProducts] = useState(products)
    const swapCategories = (index1: number, index2: number) => {
        setSortedProducts((prevSort) => {
            const newSort = [...prevSort]
            const temp = newSort[index1]
            newSort[index1] = newSort[index2]
            newSort[index2] = temp
            return newSort
        })
    }

    const resortMutation = useMutation({
        mutationFn: productApi.resrtProducts,
        onError: (err) => setError(err.message),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['products', menuCategoryId] })
            setDialogOpen(false)

        }
    })

    const onSubmit = () => {
        resortMutation.mutate({
            menuCategoryId: menuCategoryId,
            newOrder: sortedProducts.map((category) => category.id),
        })
    }

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rearrange Items </DialogTitle>
                    <DialogDescription>Drag and drop to rearrange the items</DialogDescription>
                </DialogHeader>
                <Sortable value={sortedProducts} onMove={({ activeIndex, overIndex }) => swapCategories(activeIndex, overIndex)}>
                    {sortedProducts.map((product) => (
                        <SortableItem key={product.id} value={product.id} asChild>
                            <div className="flex justify-between">
                                <div>
                                    {product.name}

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

export default SortProductsForm