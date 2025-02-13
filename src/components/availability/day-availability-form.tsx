import { StoreAvailability } from "@/api/storeApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { TIME_MAPPING } from "@/constatnts"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

interface DayAvailabilityFormProps {
    day: string
    dayAvailabilities: StoreAvailability[]
    onAvailabilitiesChanged: (values: StoreAvailability[]) => void
}

const DayAvailabilityForm: React.FC<DayAvailabilityFormProps> = ({ day, dayAvailabilities, onAvailabilitiesChanged }) => {

    const [availabilities, setDayAvailability] = useState(dayAvailabilities)

    return <div className="flex flex-col">
        <div className="flex flex-row justify-between">
            <div>
                {day}
            </div>
            <div className='flex flex-row items-center space-x-4'>

                <div className="flex flex-col space-y-4">
                    <div className="flex flex-row items-center space-x-2">
                        <Select>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Closed" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>From</SelectLabel>
                                    {Object.entries(TIME_MAPPING).map(([key, value]) => (
                                        <SelectItem id={key} value={value}>{key}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="text-lg font-bold">
                            -
                        </div>
                        <Select>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Closed" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>To</SelectLabel>
                                    {Object.entries(TIME_MAPPING).map(([key, value]) => (
                                        <SelectItem id={key} value={value}>{key}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size={"sm"} className="w-10 h-10 rounded-full" ><Plus size={25} /></Button>

                    {availabilities.length === 0 && (
                        <div className='flex flex-row space-x-2 items-center font-semibold text-muted-foreground'>
                            <Checkbox id="closed" />
                            <label htmlFor="closed">Closed</label>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
}

export default DayAvailabilityForm