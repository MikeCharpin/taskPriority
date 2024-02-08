import { ThemeProvider } from "@/components/theme-provider"
import { GoalSection } from "./components/GoalSection"
import "./styles/globals.css"
import ProjectSection from "./components/ProjectSection"
import ResultsSection from "./components/ResultsSection"
import { useEffect, useState } from "react"
import { GoalData, ProjectData } from "./data/flatFakeData"
import NavBar from "./components/NavBar"
import Login from "./components/Login"
import { supabase } from '@/supabaseClient.js'
import { Session } from '@supabase/supabase-js'
import Account from "./components/Account"

function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(false);
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


  const [goalDataState, setGoalDataState] = useState(() => {
    const storedGoalData = localStorage.getItem('goalData')
    return storedGoalData ? JSON.parse(storedGoalData) : []
  })
  const [ projectDataState, setProjectDataState ] = useState(() => {
    const storedProjectData = localStorage.getItem('projectData')
    return storedProjectData ? JSON.parse(storedProjectData) : []
  })

  localStorage.setItem('goalData', JSON.stringify(goalDataState))
  localStorage.setItem('projectData', JSON.stringify(projectDataState))

  useEffect(() => {
    const fetchData = async () => {
      if(!session) {
        const localGoalData = localStorage.getItem('goalData')
        const localProjectData = localStorage.getItem('projectData')
        if(localGoalData && localProjectData) {
          setGoalDataState(JSON.parse(localGoalData))
          setProjectDataState(JSON.parse(localProjectData))
        } else {
          setGoalDataState([])
          setProjectDataState([])
        }
        return
      }

      setLoading(true)
      try {
        const { data:goalDataResponse, error: goalError } = await supabase
          .from('goals')
          .select('*')
        const { data: projectDataResponse, error: projectError } = await supabase
          .from('projects')
          .select('*')
        
          if( goalError || projectError) {
            console.warn("Error fetching data:", goalError || projectError)
          } else {
            if (goalDataResponse && projectDataResponse) {
              setGoalDataState(goalDataResponse)
              setProjectDataState(projectDataResponse)

              localStorage.setItem('goalData', JSON.stringify(goalDataResponse))
              localStorage.setItem('projectData', JSON.stringify(projectDataResponse))
            } else {
              console.warn("Received null or undefined data.")
            }
          }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [session])


 


  

  const processValue = (value: string) => {
    if(value === "low"){
      return 1
    }
    if(value === "medium") {
      return 2
    }
    if(value === "high") {
      return 3
    }
    else {
      return 2
    }
  }

  const calcGoalScore = (goal: GoalData) => {
      let score = 0
      const goalComplexityScore = processValue(goal.goalComplexity)
      const goalExcitementScore = processValue(goal.goalExcitement)
      const goalImportanceScore = goalDataState.length - goalDataState.indexOf(goal)

      score += goalComplexityScore + goalExcitementScore + goalImportanceScore

      return goal.goalScore = score
  }

  const calcProjectScore = (project: ProjectData) => {
      let score = 0
      const projectComplexityScore = processValue(project.projectComplexity)
      const projectExcitementScore = processValue(project.projectExcitement)
      const projectImportanceScore = projectDataState.length - projectDataState.indexOf(project)

      score += projectComplexityScore + projectExcitementScore + projectImportanceScore

      return project.projectScore = score
  }

  const calcAllScores = (projectDataState: ProjectData[], goalDataState: GoalData[]) => {
    const updatedProjectDataState = [...projectDataState]
    const updatedGoalDataState = [...goalDataState]
    updatedGoalDataState.map((goal) => calcGoalScore(goal))
    updatedProjectDataState.map((project) => calcProjectScore(project))

    updatedProjectDataState.map((project) => {
      const projectGoal = updatedGoalDataState.find((goal) => goal.goalId === project.projectGoal)

      if(projectGoal){
        const projectPriorityScore = project.projectScore += projectGoal.goalScore
        project.projectPriorityScore = projectPriorityScore
      }
      return
    })
    return updatedProjectDataState.sort((a,b) => b.projectPriorityScore - a.projectPriorityScore).filter((project) => project.projectStatus === "active")
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col">
          <NavBar
            session={session}
            setOpenLogin={setOpenLogin}
            setOpenAccount={setOpenAccount}
            
          />
          {loading ? <div>Loading...</div> : ""}
          <main className="flex w-full flex-grow justify-center items-start p-8 gap-4">  
            <ResultsSection
              sortedProjectState={calcAllScores(projectDataState, goalDataState)}
              goalDataState={goalDataState}
            />
            <div className="flex flex-col justify-center items-center border-2 border-grey-100 px-4">
              <h1 className="py-2 text-2xl font-semibold">Control Panel</h1>
              <div className="flex w-2/3 justify-center items-start  gap-2 ">
                <GoalSection
                  goalDataState={goalDataState}
                  setGoalDataState={setGoalDataState}
                  projectDataState={projectDataState}
                  setProjectDataState={setProjectDataState}
                  calcGoalScore={calcGoalScore}
                />
                <ProjectSection
                  projectDataState={projectDataState}
                  setProjectDataState={setProjectDataState}
                  goalDataState={goalDataState}
                  calcProjectScore={calcProjectScore}
                />
                <Login
                  open={openLogin}
                  setOpen={setOpenLogin}
                />
                <Account
                  open={openAccount}
                  setOpen={setOpenAccount}
                  session={session}
                />
              </div>
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

