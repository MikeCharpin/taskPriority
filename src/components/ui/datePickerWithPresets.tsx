import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useMediaQuery } from "@react-hook/media-query"

const DatePickerWithPresets = React.forwardRef<HTMLDivElement,
    { 
        className?: string
        onChange?: (date: Date | undefined) => void
        initialValue?: Date | undefined

    }
>(({ className, onChange, initialValue, }, ref) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")  

    const [date, setDate] = React.useState<Date | undefined>(initialValue)

    const handleDateChange = (newDate: Date | undefined) => {
        setDate(newDate)
        if(onChange) {
            onChange(newDate)
        }
    }

    return (
        <div ref={ref}  className={cn("grid gap-2", className)}>
            {isDesktop ? 
            <Dialog>
            <DialogTrigger asChild>
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
            </DialogTrigger>
            <DialogContent className="flex w-auto flex-col space-y-2 p-2 bg-cyan-900 rounded-2xl border-2 border-primary/20 shadow-xl">
                <Calendar 
                    initialFocus
                    mode="single" 
                    selected={date} 
                    onSelect={handleDateChange}
                    numberOfMonths={2} 
                />
            </DialogContent>
            </Dialog>
        :    
            <Dialog>
                <DialogTrigger asChild>
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
                </DialogTrigger>
                <DialogContent className="flex w-auto flex-col space-y-2 p-2 bg-cyan-900 rounded-2xl border-2 border-primary/20 shadow-xl">
                    <Calendar 
                        initialFocus
                        mode="single" 
                        selected={date} 
                        onSelect={handleDateChange}
                        numberOfMonths={2} 
                        className="max-h-[95dvh]"
                    />
                </DialogContent>
            </Dialog>
        }
        </div>
    )
})

export default DatePickerWithPresets