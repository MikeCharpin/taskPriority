import { Session } from "@supabase/supabase-js"
import NavMenuDropDown from "./NavMenuDropDown"
import { useMediaQuery } from "@react-hook/media-query"

interface NavBarProps {
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>
    setOpenAccount: React.Dispatch<React.SetStateAction<boolean>>
    setOpenModeToggle: React.Dispatch<React.SetStateAction<boolean>>
    session: Session | null
}

const NavBar = ({ setOpenLogin, setOpenModeToggle, session }: NavBarProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")  

    
    return (
        <div>
            {isDesktop ?
            <nav className="flex flex-wrap w-screen items-center justify-between bg-secondary py-6 px-12">
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
            :
            <nav className="flex flex-col w-screen items-center justify-between bg-secondary p-6 gap-4">
                <div className="flex gap-6">
                    <h1 className="text-2xl font-light">🌷 tulip tasks 🌷</h1>
                    <NavMenuDropDown
                        session={session}
                        setOpenLogin={setOpenLogin}
                        setOpenModeToggle={setOpenModeToggle}
                    />
                </div>
                
                {session === null ?
                    <div className="flex flex-col  font-semibold bg-primary/20 p-4 rounded-xl">
                        <span> 🏡 you are working locally </span>
                        <span>login to save your data <button onClick={() => setOpenLogin(true)} >💾</button></span>
                    </div>
                :
                    ""
                }
            </nav>
            }
        </div>
       
    )
}

export default NavBar

