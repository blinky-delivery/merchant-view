import { StoreAvailability } from "@/api/storeApi"
import { useState } from "react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { TIME_MAPPING } from "@/constatnts"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"

interface TimeRangeInput {
    openTime?: string
    closeTime?: string
}
interface DayAvailabilityFormProps {
    day: string
    dayAvailabilities: StoreAvailability[]
    onAvailabilitiesChanged: (values: StoreAvailability[]) => void
}

const DayAvailabilityForm: React.FC<DayAvailabilityFormProps> = ({ day, dayAvailabilities, onAvailabilitiesChanged }) => {
    const initialTimeRanges: TimeRangeInput[] = dayAvailabilities.length ? dayAvailabilities : [{ openTime: undefined, closeTime: undefined }]
    const [timeRanges, setTimeRanges] = useState<TimeRangeInput[]>(initialTimeRanges)

    const onAddTimeRange = () => {
        setTimeRanges([...timeRanges, { openTime: undefined, closeTime: undefined }])
    }

    const [isClosedToday, setIsClosedToday] = useState(initialTimeRanges.every(timeRange => !timeRange.openTime && !timeRange.closeTime))
    const onTodayCloseChanged = (value: boolean) => {
        if (value) {
            setTimeRanges([{ openTime: undefined, closeTime: undefined }])
        }
        setIsClosedToday(value)
    }

    const canAddTimeRange = timeRanges.some(timeRange => timeRange.openTime && timeRange.closeTime) && timeRanges.length <= 2

    return <div className="flex flex-col">
        <div className="flex flex-row justify-between">
            <div>
                {day}
            </div>
            <div className='flex flex-row items-start space-x-4'>

                <div className="flex flex-col space-y-4">
                    {timeRanges.map((timeRange, timeRangeIndex) => (
                        <div className="flex flex-row items-center space-x-2">
                            <Select
                                disabled={isClosedToday}
                                defaultValue={timeRange.openTime}
                                onValueChange={(value) => {
                                    setTimeRanges(prev => {
                                        return prev.map((prevTimeRange, index) => {
                                            if (index === timeRangeIndex) {
                                                return { ...prevTimeRange, openTime: value }
                                            }
                                            return prevTimeRange
                                        })
                                    })
                                }}
                            >
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
                            <Select
                                disabled={isClosedToday}
                                defaultValue={timeRange.closeTime}
                                onValueChange={(value) => {
                                    setTimeRanges(prev => {
                                        return prev.map((prevTimeRange, index) => {
                                            if (index === timeRangeIndex) {
                                                return { ...prevTimeRange, closeTime: value }
                                            }
                                            return prevTimeRange
                                        })
                                    })
                                }}
                            >
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
                    ))}
                </div>
                <div className="flex flex-row space-x-2">
                    <Button size={"sm"} disabled={!canAddTimeRange} className="w-10 h-10 rounded-full" onClick={onAddTimeRange}><Plus size={25} /></Button>


                    <div className='flex flex-row space-x-2 items-center font-semibold text-muted-foreground'>
                        <Checkbox id="closed" checked={isClosedToday} onCheckedChange={onTodayCloseChanged} />
                        <label htmlFor="closed">Closed</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default DayAvailabilityForm