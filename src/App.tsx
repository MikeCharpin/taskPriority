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

    const offlineSession = {
    "access_token": "offlineAccessToken",
    "token_type": "bearer",
    "expires_in": 3600,
    "expires_at": 2707523441,
    "refresh_token": "offlineRefreshToken",
    "user": {
        "id": "offlineId",
        "aud": "authenticated",
        "role": "authenticated",
        "email": "test@test.com",
        "email_confirmed_at": "2024-02-09T19:07:41.05978Z",
        "phone": "",
        "confirmation_sent_at": "2024-02-09T19:07:29.423365Z",
        "confirmed_at": "2024-02-09T19:07:41.05978Z",
        "last_sign_in_at": "2024-02-09T23:04:01.777962377Z",
        "app_metadata": {
            "provider": "email",
            "providers": [
                "email"
            ]
        },
        "user_metadata": {},
        "identities": [
            {
                "identity_id": "offlineIdentityId",
                "id": "offlineId",
                "user_id": "offlineId",
                "identity_data": {
                    "email": "test@test.com",
                    "email_verified": false,
                    "phone_verified": false,
                    "sub": "offlineId"
                },
                "provider": "email",
                "last_sign_in_at": "2024-02-09T19:07:29.421289Z",
                "created_at": "2024-02-09T19:07:29.421353Z",
                "updated_at": "2024-02-09T19:07:29.421353Z",
                "email": "test@test.com"
            }
        ],
        "created_at": "2024-02-09T19:07:29.415157Z",
        "updated_at": "2024-02-09T23:04:01.779675Z"
    }
  }

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
        <div className="flex flex-col">
          {session ? 
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
              session={offlineSession}
            />
            
            <ProjectPrioritizer
              session={offlineSession}
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
          <footer className="w-full h-16 flex flex-none justify-center items-center bg-black">
            <div>by Mike Charpin</div>
          </footer>
        </div>
    </ThemeProvider>
  )
}

export default App

