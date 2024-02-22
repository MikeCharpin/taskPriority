import { RefreshCwIcon, Trash2Icon } from "lucide-react"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface CompletedCardProps {
    desc: string
    id: string
    reset: (status: string) => void
    deleteitem: (id: string) => Promise<void>
}

const CompletedCard = ({ desc, id, reset, deleteitem}: CompletedCardProps) => {

    return (
        <div className=" flex flex-col w-full border-2 border-primary/5 bg-primary/10 text-primary/50 py-2 px-4 rounded-xl">
            <div className=" text-lg whitespace-normal text-wrap min-h-12">{desc}</div>
            <div className="flex w-full justify-between items-center gap-2">
                <Button 
                className="border-2 border-primary/20 bg-primary/40 hover:bg-green-300/80" 
                variant={"ghost"} 
                size={"icon"} 
                onClick={() => reset("active")} >
                    <RefreshCwIcon/>
                </Button>
                <Popover>
                <PopoverTrigger><Trash2Icon/></PopoverTrigger>
                <PopoverContent className="flex gap-2 items-center w-50 bg-secondary shadow-lg border-2 border-red-600/70 rounded-xl">
                    <span className="font-semibold">delete forever?</span>
                    <Button 
                variant={"destructive"} 
                size={"icon"} 
                className="bg-red-900/70 hover:bg-red-900" 
                onClick={() => deleteitem(id)}>
                    <Trash2Icon/>
                </Button>
                </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}

export default CompletedCard