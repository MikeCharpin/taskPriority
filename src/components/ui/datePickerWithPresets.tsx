import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DatePickerWithPresets = React.forwardRef<HTMLDivElement,
    { 
        className?: string
        onChange?: (date: Date | undefined) => void
        initialValue?: Date | undefined

    }
>(({ className, onChange, initialValue, }, ref) => {
    const [date, setDate] = React.useState<Date | undefined>(initialValue)

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        console.log(newDate)
        if(onChange) {
            onChange(newDate)
        }
    }

    return (
        <div ref={ref}  className={cn("grid gap-2", className)}>
            <Popover>
            <PopoverTrigger asChild>
                <Button
                variant={"outline"}
                className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                )}
                >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                onValueChange={(value) =>
                    handleDateChange(addDays(new Date(), parseInt(value)))
                }
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                </SelectContent>
                </Select>
                <div  className="rounded-md border">
                <Calendar 
                    initialFocus
                    mode="single" 
                    selected={date} 
                    onSelect={handleDateChange}
                    numberOfMonths={2} 
                />
                </div>
            </PopoverContent>
            </Popover>
        </div>
    )
})

export default DatePickerWithPresets