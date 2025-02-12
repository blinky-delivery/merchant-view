import { StoreAvailability } from "@/api/storeApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

interface DayAvailabilityFormProps {
    day: string
    dayAvailabilities: StoreAvailability[]
    onAvailabilitiesChanged: (values: StoreAvailability[]) => void
}

const DayAvailabilityForm: React.FC<DayAvailabilityFormProps> = ({ day, dayAvailabilities, onAvailabilitiesChanged }) => {

    const [availabilities, setDayAvailability] = useState(dayAvailabilities)

    return <div className="flex flex-col">
        <div className="flex flex-row">
            {day}
        </div>
    </div>
}