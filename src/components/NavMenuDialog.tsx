import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { MoonIcon, SunIcon, SunMoonIcon } from "lucide-react"

interface ModeToggleDialogProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ModeToggleDialog = ({ open, setOpen }: ModeToggleDialogProps) => {
    const { setTheme } = useTheme() 

    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dark:bg-cyan-950 bg-cyan-500 border-2 border-primary/5 rounded-xl shadow-xl h-64 w-2/3">
            <Button onClick={() => setTheme("light")}>
                <SunIcon/>&nbsp;light
            </Button>
            <Button onClick={() => setTheme("dark")}>
                <MoonIcon/>&nbsp;dark
            </Button>
            <Button onClick={() => setTheme("system")}>
                <SunMoonIcon/>&nbsp;system
            </Button>
        </DialogContent>
        </Dialog>
    )
}

export default ModeToggleDialog