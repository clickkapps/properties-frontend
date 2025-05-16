import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

type Prop = {
    onSelectionChangedFn?: (date?: Date) => void
    defaultValue?: Date
    fromDate?: Date
    toDate?: Date
}
function DatePickerInput({defaultValue, onSelectionChangedFn, fromDate, toDate} : Prop) {
    const [date, setDate] = React.useState<Date|undefined>(defaultValue)

    const selectDateHandler = (date?: Date) => {
        setDate(date)
        if(onSelectionChangedFn) {
            onSelectionChangedFn(date)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={selectDateHandler}
                    initialFocus
                    fromDate={fromDate}
                    toDate={toDate}
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePickerInput