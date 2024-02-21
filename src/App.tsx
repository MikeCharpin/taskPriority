import { ThemeProvider } from "@/components/theme-provider"
import "./styles/globals.css"
import { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import { supabase } from '@/supabaseClient.ts'
import { Session } from '@supabase/supabase-js'
import Account from "./components/Account"
import ProjectPrioritizer from "./components/ProjectPrioritizer"

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [openAccount, setOpenAccount] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col justify-between items-center h-dvh min-w-screen">
          {session !== null ? 
          <div>
            <NavBar
              setOpenLogin={setOpenLogin}
              setOpenAccount={setOpenAccount}
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
          <footer className="flex w-full h-16 justify-center items-center bg-black">
            <div>by Mike Charpin</div>
          </footer>
        </div>
    </ThemeProvider>
  )
}

export default App

