import { Session } from "@supabase/supabase-js"
import NavMenuDropDown from "./NavMenuDropDown"

interface NavBarProps {
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
    setOpenAccount: React.Dispatch<React.SetStateAction<boolean>>
    setOpenModeToggle: React.Dispatch<React.SetStateAction<boolean>>
    session: Session | null
}

const NavBar = ({ setOpenLogin, setOpenModeToggle, session }: NavBarProps) => {

    
    return (
       <nav className="flex flex-wrap w-screen items-center justify-between bg-secondary p-6">
            <h1 className="text-2xl font-light">🌷 tulip tasks 🌷</h1>
            {session === null ? 
                <div className="flex flex-col  font-semibold bg-primary/20 p-4 rounded-xl">
                    <span> 🏡 you are working locally </span>
                    <span>login to save your data <button onClick={() => setOpenLogin(true)} >💾</button></span>
                </div> 
            : 
                ""
            }
            <NavMenuDropDown
           session={session}
           setOpenLogin={setOpenLogin}
           setOpenModeToggle={setOpenModeToggle}
           />           
        </nav>
    )
}

export default NavBar

