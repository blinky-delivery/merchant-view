import { Button } from "@/components/ui/button"
import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute('/')({ component: Index })

function Index() {
    return (
        <div className="w-full h-full flex items-cente justify-items-center place-items-center">
            <p>Welcome home</p>
            <Button onClick={() => alert("Alhamdulilah")}>Click me here</Button>
        </div>
    )
}