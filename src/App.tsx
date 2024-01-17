import { ThemeProvider } from "@/components/theme-provider"
import { GoalSection } from "./components/GoalSection"
import "./styles/globals.css"
import { ModeToggle } from "./components/mode-toggle"
import ProjectSection from "./components/ProjectSection"
import ResultsSection from "./components/ResultsSection"
// import { fakeData } from "./data/fakeData"
import { useState } from "react"
import { flatFakeData } from "./data/flatFakeData"

function App() {
  const [goalDataState, setGoalDataState] = useState(flatFakeData.goalData)
  const [ projectDataState, setProjectDataState ] = useState(flatFakeData.projectData)



  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col">
          <nav className=" w-full flex items-center justify-between bg-secondary p-8">
            <h1>Task Prioritizer</h1>
            <ModeToggle />
          </nav>
          <main className="flex w-full flex-grow justify-center items-start p-8 gap-4">
              <ResultsSection />
            <div className="flex w-2/3 justify-center items-start border-2 border-grey-100 gap-2 px-4">
              <GoalSection
                goalDataState={goalDataState}
                setGoalDataState={setGoalDataState}
              />
              <ProjectSection
                projectDataState={projectDataState} 
                setProjectDataState={setProjectDataState}
                goalDataState={goalDataState}
              />
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

