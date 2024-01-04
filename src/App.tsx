import { ThemeProvider } from "@/components/theme-provider"
import { GoalSection } from "./components/GoalSection"
import "./styles/globals.css"
import { ModeToggle } from "./components/mode-toggle"
import ProjectSection from "./components/ProjectSection"
import ResultsSection from "./components/ResultsSection"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <nav className=" w-full flex items-center justify-between p-8 bg-black">
          <h1>Task Prioritizer</h1>
          <ModeToggle />
        </nav>
        <main className="flex w-full justify-center items-center p-4 ">
          <div className="flex flex-grow border-2 border-green-950">
            <ResultsSection />
          </div>
          {/* <div className="flex w-2/3 justify-center items-center border-2 border-white gap-2">
            <GoalSection />
            <ProjectSection />
          </div> */}
        </main>
        <footer className="w-full h-[4rem] flex flex-none justify-center items-center bg-black">
          <div>by Mike Charpin</div>
        </footer>
    </ThemeProvider>
  )
}

export default App
