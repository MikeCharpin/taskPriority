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
import { useState } from "react"
import { Loader2Icon } from "lucide-react"
import { supabase } from "@/supabaseClient"

interface LoginProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({ open, setOpen }: LoginProps) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")  

     if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>log in</DialogTitle>
            <DialogDescription>
              enter your email to receive a magic link.
            </DialogDescription>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>log in</DrawerTitle>
          <DrawerDescription>
            enter your email to receive a magic link.
          </DrawerDescription>
        </DrawerHeader>
        <LoginForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
 
function LoginForm({ className }: React.ComponentProps<"form">) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const getURL = () => {
      let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/'
      // Make sure to include `https://` when not localhost.
      url = url.includes('http') ? url : `https://${url}`
      // Make sure to include a trailing `/`.
      url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
      return url
    }
    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log("sending login")
        setLoading(true)
        const { error } = await supabase.auth.signInWithOtp({
           email,
            options: {
              emailRedirectTo: getURL()
            } })
        if (error) {
          alert(error.message)
        } else {
          alert('check your email for the login link!')
        }
        setLoading(false)
  }
  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleLogin}>
      <div className="grid gap-2">
        <Label htmlFor="email">email</Label>
        <Input type="email" id="email" defaultValue="shadcn@example.com" onChange={(e) => setEmail(e.target.value)} />
      </div>
      {loading ? <span className="text-center font-semibold">check your email for a sign in link 🥳</span> : ""}
      <Button type="submit" disabled={loading}>{loading ? <span className="flex items-center">sending &nbsp; <Loader2Icon className="mr-2 h-4 w-4 animate-spin" /></span> : <span>send magic link</span>}</Button>
    </form>
  )
}


export default Login