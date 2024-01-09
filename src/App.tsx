import { ThemeProvider } from "@/components/theme-provider"
import { GoalSection } from "./components/GoalSection"
import "./styles/globals.css"
import { ModeToggle } from "./components/mode-toggle"
import ProjectSection from "./components/ProjectSection"
import ResultsSection from "./components/ResultsSection"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-dvh flex flex-col">
          <nav className=" w-full flex items-center justify-between bg-secondary p-8">
            <h1>Task Prioritizer</h1>
            <ModeToggle />
          </nav>
          <main className="flex w-full flex-grow justify-center items-start p-8 gap-4">
              <ResultsSection />
            <div className="flex w-2/3 min-h-[80dvh] justify-center items-center border-2 border-white gap-2">
              <GoalSection />
              <ProjectSection />
            </div>
          </main>
          <footer className="w-full h-16 flex flex-none justify-center items-center bg-black">
            <div>by Mike Charpin</div>
          </footer>
        </div>
    </ThemeProvider>
  )
}

export default App
