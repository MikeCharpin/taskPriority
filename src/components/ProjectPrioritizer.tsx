import { GoalSection } from "@/components/GoalSection"
import ProjectSection from "@/components/ProjectSection"
import ResultsSection from "@/components/ResultsSection"
import { GoalData, ProjectData, TaskData } from "@/lib/schema"
import { supabase } from "@/supabaseClient"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

interface ProjectPrioritizerProps {
    session: Session | null
}

const ProjectPrioritizer = ({ session }: ProjectPrioritizerProps) => {

    const [loading, setLoading] = useState(false)
    const [goalDataState, setGoalDataState] = useState<GoalData[]>(JSON.parse(localStorage.getItem("goals") ?? '[]'))
    const [projectDataState, setProjectDataState] = useState<ProjectData[]>(JSON.parse(localStorage.getItem("projects") ?? "[]"))
    const [taskDataState, setTaskDataState] = useState<TaskData[]>(JSON.parse(localStorage.getItem("tasks") ?? "[]"))

    const fetchGoals = async () => {
        try {
            const { data: goalData } = await supabase
            .from('goals')
            .select("*")
            .order('goalRank', {ascending: true})
            .throwOnError()
            if (goalData !== null) setGoalDataState(goalData)
            
        } catch (error){
            console.error("Error fetching Goals.", error)
        }
    }

     const fetchProjects = async () => {
        try {
            const { data: projectData } = await supabase
            .from('projects')
            .select("*")
            .order('projectRank', {ascending: true})
            .throwOnError()
            if (projectData !== null) setProjectDataState(projectData)
            
        } catch (error){
            console.error("Error fetching Projects.", error)
        }
    }

     const fetchTasks = async () => {
        try {
            const { data: taskData } = await supabase
            .from('tasks')
            .select("*")
            .order('taskRank', {ascending: true})
            .throwOnError()
            if (taskData !== null) setTaskDataState(taskData)
            
        } catch (error){
            console.error("Error fetching Tasks.", error)
        }
    }

    useEffect(() => {
        if(session === null) {
            console.log("Working offline")
        } else {
            console.log("Working online, fetching data.")
            setLoading(true)
            const fetchAllData = async () => {
                await Promise.all([
                    fetchGoals(),
                    fetchProjects(),
                    fetchTasks(),
                ])
            setLoading(false)
            }
            fetchAllData()
        }
    }, [session])
        
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
        const goalImportanceScore = goal.goalRank

        score += goalComplexityScore + goalExcitementScore - (goalImportanceScore * 2)

        return goal.goalScore = score
    }

    const calcProjectScore = (project: ProjectData) => {
        let score = 0
        const projectComplexityScore = processValue(project.projectComplexity)
        const projectExcitementScore = processValue(project.projectExcitement)
        const projectImportanceScore = project.projectRank

        score += projectComplexityScore + projectExcitementScore - (projectImportanceScore * 2)

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
       <main className=" flex flex-wrap justify-center items-start pt-6 gap-6">  
            <ResultsSection
              sortedProjectState={calcAllScores(projectDataState, goalDataState)}
              goalDataState={goalDataState}
            />
            
            <div className="flex flex-col w-full md:flex-row  md:w-auto justify-center items-center md:items-start gap-6 pb-4">
                <GoalSection
                    goalDataState={goalDataState}
                    setGoalDataState={setGoalDataState}
                    projectDataState={projectDataState}
                    setProjectDataState={setProjectDataState}
                    taskDataState={taskDataState}
                    setTaskDataState={setTaskDataState}
                    calcGoalScore={calcGoalScore}
                    session={session}
                />
                <ProjectSection
                    projectDataState={projectDataState}
                    setProjectDataState={setProjectDataState}
                    taskDataState={taskDataState}
                    setTaskDataState={setTaskDataState}
                    goalDataState={goalDataState}
                    calcProjectScore={calcProjectScore}
                    session={session}
                /> 
            </div>
            
            {loading ? <div>Loading...</div> : ""}
          </main>
    )
}

export default ProjectPrioritizer