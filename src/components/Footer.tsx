import { GithubIcon, LinkedinIcon, MessageCircleHeartIcon } from "lucide-react"

const Footer = () => {
  return (
    <section className="flex w-full min-h-16  gap-1 p-2  md:px-16 justify-between items-center bg-secondary">
      <span className="text-sm">by <strong>Mike Charpin</strong></span>
      <nav className="flex gap-1 md:gap-4 justify-between items-end">
          <a href="https://www.michaelcharpin.com/" className="text-xl">🧙‍♂️</a>
          <a href="https://github.com/MikeCharpin"><GithubIcon/></a>
          <a href="https://www.linkedin.com/in/michael-charpin/"><LinkedinIcon/></a>
          <a href="https://forms.gle/dxb7BCeih1A6ZdaCA"><MessageCircleHeartIcon/></a>
      </nav>
      <span className="text-bottom text-sm text-right">copyright &copy;&nbsp;{new Date().getFullYear()} Michael Charpin</span>
    </section>
  )
}

export default Footer