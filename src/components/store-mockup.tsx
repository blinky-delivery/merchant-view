import { Edit2 } from "lucide-react"

interface StoreMockupProps {
    storeName: string

}

export default function StoreMockup({ storeName }: StoreMockupProps) {
    return (
        <div className="w-[375px] h-[812px] bg-white rounded-[40px] shadow-xl overflow-hidden border-[14px] border-gray-800 relative">
            {/* Store Header */}
            <div className="relative h-48">
                {/* Cover Image */}
                <div className="relative w-full h-full">
                    <img
                        src="/placeholder.svg"
                        alt="Store Cover"
                        width={375}
                        height={192}
                        className="object-cover w-full h-full"
                    />
                    {/* Edit Cover Button */}
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md" aria-label="Edit cover image">
                        <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                </div>

                {/* Store Logo */}
                <div className="absolute -bottom-12 left-4 w-24 h-24">
                    <div className="relative w-full h-full">
                        <img
                            src="/placeholder.svg?height"
                            alt="Store Logo"
                            width={96}
                            height={96}
                            className="object-cover rounded-full border-4 border-white shadow-lg"
                        />
                        {/* Edit Logo Button */}
                        <button
                            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md"
                            aria-label="Edit store logo"
                        >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Store Name */}
            <div className="pt-16 px-4">
                <h1 className="text-2xl font-bold">{storeName}</h1>
                <p className="text-gray-600">Fast Food • 4.5 ★ • 15-25 min</p>
            </div>

            {/* Simplified Content */}
            <div className="p-4 space-y-4 mt-4">
                <div className="h-16 bg-gray-100 rounded-lg"></div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
                <div className="h-16 bg-gray-100 rounded-lg"></div>
            </div>
        </div>
    )
}

