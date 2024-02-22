import { ThemeProvider } from "@/components/theme-provider"
import "./styles/globals.css"
import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import { supabase } from '@/supabaseClient.ts'
import { Session } from '@supabase/supabase-js'
import Account from "./components/Account"
import ProjectPrioritizer from "./components/ProjectPrioritizer"
import ModeToggleDialog from "./components/NavMenuDialog"
import Footer from "./components/Footer"

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [openAccount, setOpenAccount] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)
  const [openToggleMode, setOpenToggleMode] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="flex flex-col justify-between items-center h-dvh min-w-screen">
          {session !== null ? 
          <div>
            <NavBar
              setOpenLogin={setOpenLogin}
              setOpenAccount={setOpenAccount}
              setOpenModeToggle={setOpenToggleMode}
              session={session}
            />
            <ProjectPrioritizer
              session={session}
            />
          </div>
          :
          <div>
            <NavBar
              setOpenLogin={setOpenLogin}
              setOpenAccount={setOpenAccount}
              setOpenModeToggle={setOpenToggleMode}
              session={null}
            />
            
            <ProjectPrioritizer
              session={null}
            />
          </div>
          }
          
          <Login
            open={openLogin}
            setOpen={setOpenLogin}
          />
          <Account
            open={openAccount}
            setOpen={setOpenAccount}
            session={session}
          />
          <ModeToggleDialog
            open={openToggleMode}
            setOpen={setOpenToggleMode}
          />
          <Footer />
        </div>
    </ThemeProvider>
  )
}

export default App

