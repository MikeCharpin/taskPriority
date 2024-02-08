import { cn } from "@/lib/utils"
import { useMediaQuery } from "@react-hook/media-query"
import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "./ui/label"
import { useEffect, useState } from "react"
import { Loader2Icon } from "lucide-react"
import { supabase } from '@/supabaseClient.js'
import { Session } from "@supabase/supabase-js"

interface AccountProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    session: Session | null
}

const Account: React.FC<AccountProps> = ({ open, setOpen, session }: AccountProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")  

     if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>display name</DialogTitle>
            <DialogDescription>
                what's your name?
            </DialogDescription>
            </DialogHeader>
            <AccountForm 
                className=""
                session={session}
            />
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>display name</DrawerTitle>
          <DrawerDescription>
            what's your name?
          </DrawerDescription>
        </DrawerHeader>
        <AccountForm
            className="px-4"
            session={session}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

interface AccountFormProps {
    className: string
    session: Session | null
}
 
function AccountForm({ className, session }: AccountFormProps) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState("")

  useEffect(() => {
    let ignore = false
    async function getProfile() {
      setLoading(true)
      const user = session ? session.user : null

      const { data, error } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', user?.id)
        .single()

      if (!ignore) {
        if (error) {
          console.warn(error)
        } else if (data) {
          setUsername(data.username)
        }
      }

      setLoading(false)
    }

    getProfile()

    return () => {
      ignore = true
    }
  }, [session])

  async function updateProfile(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    const user = session ? session.user : null

    const updates = {
      id: user?.id,
      username,
      updated_at: new Date(),
    }

    const { error } = await supabase.from('profiles').upsert(updates)

    if (error) {
      alert(error.message)
    } 
    setLoading(false)
  }
    
  return (
    <form onSubmit={updateProfile} className={cn("grid items-start gap-4", className)}>
        <div className="grid gap-2">
        <Label htmlFor="username">display name</Label>
        <Input type="text" id="username" value={username || 'friend'} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <Button type="submit" disabled={loading}>{loading ? <span className="flex items-center">saving &nbsp; <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /></span> : <span>save</span>}</Button>
        <Button onClick={() => supabase.auth.signOut()}>sign out 👋</Button>
    </form>
  )
}


export default Account