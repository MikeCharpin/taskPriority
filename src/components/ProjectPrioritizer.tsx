import { GoalSection } from "@/components/GoalSection"
import ProjectSection from "@/components/ProjectSection"
import ResultsSection from "@/components/ResultsSection"
import { GoalData, ProjectData, TaskData } from "@/data/flatFakeData"
import { supabase } from "@/supabaseClient"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

interface ProjectPrioritizerProps {
    session: Session | null
}


const ProjectPrioritizer = ({ session }: ProjectPrioritizerProps) => {
    const [loading, setLoading] = useState(false)
    const [goalDataState, setGoalDataState] = useState<GoalData[]>([])
    const [projectDataState, setProjectDataState] = useState<ProjectData[]>([])
    const [taskDataState, setTaskDataState] = useState<TaskData[]>([])
    const [workingOffline, setWorkingOffline] = useState(true)

    useEffect(() => {
        setWorkingOffline(session?.user.id === "offlineId")
    }, [session])

    const loadFromLocalStorage = () => {
        console.log("Loading from local storage")
        const storedGoalData = localStorage.getItem('goals')
        const storedProjectData = localStorage.getItem('projects')
        const storedTaskData = localStorage.getItem('tasks')
        setGoalDataState(storedGoalData ? JSON.parse(storedGoalData) : [])
        setProjectDataState(storedProjectData ? JSON.parse(storedProjectData) : [])
        setTaskDataState(storedTaskData ? JSON.parse(storedTaskData) : [])
    } 

    const fetchData = async (tableName: string, setDataState: React.Dispatch<any>, columnName: string) => {
        const { data, error } = await supabase
            .from(tableName)
            .select('*')
            .order(`${columnName}`, {ascending: true})
        if (error){
            console.error(`Error fetching ${tableName} data:`, error)
        } else {
            setDataState(data)
        } 
        
    }

    useEffect(() => {
        if(workingOffline) {
            console.log("Working offline, loading from local storage.")
            loadFromLocalStorage()
        } else {
            console.log("Working online, fetching data.")
            setLoading(true)
            const fetchAllData = async () => {
                await Promise.all([
                    fetchData('goals', setGoalDataState, "goalRank"),
                    fetchData("projects", setProjectDataState, "projectRank"),
                    fetchData('tasks', setTaskDataState, "taskRank"),
                ])
            }
            fetchAllData()
            setLoading(false)
        }
    }, [workingOffline])
        
    useEffect(() => {
        console.log("Saving to local storage.")
        localStorage.setItem('goals', JSON.stringify(goalDataState))
        localStorage.setItem('projects', JSON.stringify(projectDataState))
        localStorage.setItem('tasks', JSON.stringify(taskDataState))

    }, [goalDataState, projectDataState, taskDataState])




            

    


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
                  workingOffline={workingOffline}
                  session={session}
                />
                <ProjectSection
                  projectDataState={projectDataState}
                  setProjectDataState={setProjectDataState}
                  taskDataState={taskDataState}
                  setTaskDataState={setTaskDataState}
                  goalDataState={goalDataState}
                  calcProjectScore={calcProjectScore}
                  workingOffline={workingOffline}
                  session={session}
                /> 
                </div>
            </div>
            {loading ? <div>Loading...</div> : ""}
          </main>
    )
}

export default ProjectPrioritizer