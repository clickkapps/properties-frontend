import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Prop = {
    onSelectionChangedFn?: (range?: DateRange) => void,
    className?: string
    defaultValue?: DateRange
    fromDate?: Date
    toDate?: Date
}

function DateRangePickerInput({ defaultValue, className, onSelectionChangedFn, fromDate, toDate }: Prop) {

    const [date, setDate] = React.useState<DateRange | undefined>(defaultValue)

    const selectDateHandler = (range: DateRange | undefined ) => {
        setDate(range)
        if(onSelectionChangedFn) {
            onSelectionChangedFn(range)
        }
    }

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={selectDateHandler}
                        numberOfMonths={2}
                        fromDate={fromDate}
                        toDate={toDate}


                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default DateRangePickerInput
