import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Github,
  LifeBuoy,
  LogInIcon,
  PiggyBankIcon,
  SunIcon,
  MoonIcon,
  SquareUserRoundIcon,
  MessageCircleHeartIcon,
  UserCircle2Icon,
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"
import { Session } from "@supabase/supabase-js"


interface NavBarProps {
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
    setOpenAccount: React.Dispatch<React.SetStateAction<boolean>>
    session: Session | null
}

const NavBar = ({ setOpenLogin, session }: NavBarProps) => {
    const { setTheme } = useTheme()
    

    return (
       <nav className=" w-full flex items-center justify-between bg-secondary p-8">
            <h1>Task Prioritizer</h1>
            <div className="flex gap-4">
                {session ?
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-0 rounded-full">
                                    <Avatar>
                                        <AvatarImage src="src\assets\Scan173983.jpg" />
                                        <AvatarFallback>MC</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>what do you think so far?</DropdownMenuLabel>
                                <DropdownMenuItem>
                                    <MessageCircleHeartIcon className="mr-2 h-4 w-4" />
                                    <span><a href="https://forms.gle/dxb7BCeih1A6ZdaCA" target="_blank">send feedback 💌</a></span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <UserCircle2Icon className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuGroup>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                            <span>&nbsp;toggle mode</span>
                                            <span className="sr-only">Toggle theme</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                                Light
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                Dark
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Github className="mr-2 h-4 w-4" />
                                    <span> <a href="https://github.com/MikeCharpin/taskPriority" target="_blank">github</a></span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    <span>support for you</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <SquareUserRoundIcon className="mr-2 h-4 w-4" />
                                    <span><a href="https://www.michaelcharpin.com/" target="_blank">about me 🧙</a></span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <PiggyBankIcon className="mr-2 h-4 w-4" />
                                    <span>support for me 😄</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setOpenLogin(true)}>
                                        <LogInIcon className="mr-2 h-4 w-4" />
                                        <span>log out 👋</span>
                                    </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    
                :
                    <div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="p-0 rounded-full">
                                    <Avatar>
                                        <AvatarImage src="src\assets\circle-user-round.png" />
                                        <AvatarFallback>MC</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>log in to save your data</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setOpenLogin(true)}>
                                        <LogInIcon className="mr-2 h-4 w-4" />
                                        <span>log in 😻</span>
                                    </DropdownMenuItem>
                                
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <MessageCircleHeartIcon className="mr-2 h-4 w-4" />
                                    <span><a href="https://forms.gle/dxb7BCeih1A6ZdaCA" target="_blank">send feedback 💌</a></span>
                                </DropdownMenuItem>
                                <DropdownMenuGroup>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                            <span>&nbsp;toggle mode</span>
                                            <span className="sr-only">Toggle theme</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={() => setTheme("light")}>
                                                Light
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setTheme("dark")}>
                                                Dark
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Github className="mr-2 h-4 w-4" />
                                    <span> <a href="https://github.com/MikeCharpin/taskPriority" target="_blank">github</a></span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LifeBuoy className="mr-2 h-4 w-4" />
                                    <span>support for you 😵</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <SquareUserRoundIcon className="mr-2 h-4 w-4" />
                                    <span><a href="https://www.michaelcharpin.com/" target="_blank">about me 🧙</a></span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <PiggyBankIcon className="mr-2 h-4 w-4" />
                                    <span>support for me 😄</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                }
            </div>
        </nav>
    )
}

export default NavBar
