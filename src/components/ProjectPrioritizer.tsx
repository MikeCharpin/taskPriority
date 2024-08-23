import { GoalSection } from "@/components/GoalSection"
import ProjectSection from "@/components/ProjectSection"
import ResultsSection from "@/components/ResultsSection"
import { GoalData, ProjectData, TaskData } from "@/lib/schema"
import { supabase } from "@/supabaseClient"
import { Session } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

const tutorialGoals: GoalData[] = [
     {
        inserted_at: "2024-08-23T14:42:14.465Z",
        user_id: "offlineUser",
        goalId: "b3eaa102-8553-469d-871b-66db481df8c2",
        goalScore: 4,
        goalMotivation: "",
        goalStatus: "active",
        goalDesc: "I want users to understand how Tulip Tasks works.",
        goalComplexity: "high",
        goalExcitement: "high",
        goalRank: 1,
        goalColor: "#16A34A"
    },
    {
        inserted_at: "2024-08-23T14:43:21.864Z",
        user_id: "offlineUser",
        goalId: "2b7c9820-3e23-4ce1-8015-5bc34109df3d",
        goalScore: 2,
        goalMotivation: "",
        goalStatus: "active",
        goalDesc: "I am a goal you aspire to achieve in a month or two.",
        goalComplexity: "high",
        goalExcitement: "high",
        goalRank: 2,
        goalColor: "#7e22ce"
    },
    {
        inserted_at: "2024-08-23T14:43:54.916Z",
        user_id: "offlineUser",
        goalId: "0bf902c8-f704-45f4-9dfd-8b4c47720423",
        goalScore: -2,
        goalMotivation: "",
        goalStatus: "active",
        goalDesc: "Inform visitors of Tulip Tasks tech stack",
        goalComplexity: "medium",
        goalExcitement: "medium",
        goalRank: 3,
        goalColor: "#06b6d4"
    }
]

const tutorialProjects: ProjectData[] = [
    {
        "inserted_at": "2024-08-23T17:27:14.472Z",
        "user_id": "offlineUser",
        "projectId": "5d70d192-03ea-4dd6-9874-177002aee5c9",
        "projectScore": 8,
        "projectPriorityScore": 8,
        "projectGoal": "b3eaa102-8553-469d-871b-66db481df8c2",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "Start by reading the \"how about list\"",
        "projectComplexity": "high",
        "projectExcitement": "high",
        "projectTimeframe": new Date("2025-01-04T05:00:00.000Z"),
        "projectRank": 1
    },
    {
        "inserted_at": "2024-08-23T14:55:45.391Z",
        "user_id": "offlineUser",
        "projectId": "c5a93b89-aa1f-4ee5-9449-1d37dbac2385",
        "projectScore": 6,
        "projectPriorityScore": 6,
        "projectGoal": "b3eaa102-8553-469d-871b-66db481df8c2",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "The \"how about list\" prioritizes goals and projects by complexity, excitement, and importance, encouraging you to spend your time on what projects align with your priorities and feelings.",
        "projectComplexity": "high",
        "projectExcitement": "high",
        "projectTimeframe": new Date("2024-09-01T04:00:00.000Z"),
        "projectRank": 2
    },
    {
        "inserted_at": "2024-08-23T15:34:45.738Z",
        "user_id": "offlineUser",
        "projectId": "0f93957b-ae85-4301-9d8f-66ce7c1c80a4",
        "projectScore": 2,
        "projectPriorityScore": 2,
        "projectGoal": "b3eaa102-8553-469d-871b-66db481df8c2",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "The app helps you organize your goals (lasting a month or more) into projects (spanning days or weeks), which are further divided into tasks (completable within a day).",
        "projectComplexity": "medium",
        "projectExcitement": "medium",
        "projectTimeframe": new Date("2024-09-20T04:00:00.000Z"),
        "projectRank": 3
    },
    {
        "inserted_at": "2024-08-23T14:24:48.921Z",
        "user_id": "offlineUser",
        "projectId": "f2360b7f-865e-4a99-ac79-47729a13892d",
        "projectScore": -2,
        "projectPriorityScore": -2,
        "projectGoal": "2b7c9820-3e23-4ce1-8015-5bc34109df3d",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "I am a project that will lead you to accomplishing your goal.",
        "projectComplexity": "medium",
        "projectExcitement": "medium",
        "projectTimeframe": new Date("2024-09-27T04:00:00.000Z"),
        "projectRank": 4
    },
    {
        "inserted_at": "2024-08-23T14:57:53.864Z",
        "user_id": "offlineUser",
        "projectId": "393a08e9-67de-4a15-a9e7-96cbb2955a59",
        "projectScore": -2,
        "projectPriorityScore": -2,
        "projectGoal": "b3eaa102-8553-469d-871b-66db481df8c2",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "Complexity and excitement metrics are entered when a goal or project is created.",
        "projectComplexity": "medium",
        "projectExcitement": "medium",
        "projectTimeframe": new Date("2024-09-13T04:00:00.000Z"),
        "projectRank": 5
    },
    {
        "inserted_at": "2024-08-23T14:56:14.652Z",
        "user_id": "offlineUser",
        "projectId": "3f9d2cf0-fbb0-4511-9da5-f3a4b048d707",
        "projectScore": -8,
        "projectPriorityScore": -8,
        "projectGoal": "0bf902c8-f704-45f4-9dfd-8b4c47720423",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "Tulip Tasks is a solo dev project, using Vite with React and TypeScript for the front-end, Supabase for real-time data and auth, plus local storage integration for account-free use, TailwindCSS with Shadcn for ui components.",
        "projectComplexity": "high",
        "projectExcitement": "high",
        "projectTimeframe": new Date("2024-10-08T04:00:00.000Z"),
        "projectRank": 6
    },
    {
        "inserted_at": "2024-08-23T14:23:09.507Z",
        "user_id": "offlineUser",
        "projectId": "c990a217-e93e-4239-b80b-7237f53a1992",
        "projectScore": -4,
        "projectPriorityScore": -4,
        "projectGoal": "b3eaa102-8553-469d-871b-66db481df8c2",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "The importance of a goal or project is determined by how high the goal or project is on your list.",
        "projectComplexity": "high",
        "projectExcitement": "high",
        "projectTimeframe": new Date("2024-09-30T04:00:00.000Z"),
        "projectRank": 7
    },
    {
        "inserted_at": "2024-08-23T15:41:38.539Z",
        "user_id": "offlineUser",
        "projectId": "8cc0ff04-8147-4be4-bfb4-4cd3d78a6268",
        "projectScore": -10,
        "projectPriorityScore": -10,
        "projectGoal": "b3eaa102-8553-469d-871b-66db481df8c2",
        "projectMotivation": "",
        "projectStatus": "active",
        "projectDesc": "Scoring: Each goal's score is the sum of complexity and excitement minus double its index-based importance rank. Project scores use the same method and add the related goal score.",
        "projectComplexity": "low",
        "projectExcitement": "low",
        "projectTimeframe": new Date("2024-09-11T04:00:00.000Z"),
        "projectRank": 8
    }
]

const tutorialTasks: TaskData[] = [
    {
        "inserted_at": "2024-08-23T14:24:57.863Z",
        "user_id": "offlineUser",
        "taskId": "61ff8481-94c0-450c-a973-f4bff8d3a1d7",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "I am a task that will take less than a day to complete.",
        "taskDuration": 75,
        "taskComplexity": "medium",
        "taskExcitement": "medium",
        "taskProject": "f2360b7f-865e-4a99-ac79-47729a13892d",
        "taskRank": 0,
        "taskGoal": "2b7c9820-3e23-4ce1-8015-5bc34109df3d"
    },
    {
        "inserted_at": "2024-08-23T15:47:55.455Z",
        "user_id": "offlineUser",
        "taskId": "dd2c6c6f-f95c-4956-b502-b7e0fd48cd9e",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Build a blanket fort!",
        "taskDuration": 135,
        "taskComplexity": "medium",
        "taskExcitement": "high",
        "taskProject": "c5a93b89-aa1f-4ee5-9449-1d37dbac2385",
        "taskRank": 0,
        "taskGoal": "b3eaa102-8553-469d-871b-66db481df8c2"
    },
    {
        "inserted_at": "2024-08-23T15:51:20.682Z",
        "user_id": "offlineUser",
        "taskId": "69c2f852-c93c-45ea-b05b-85a3eb67b6fe",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Dance in the kitchen with the dog.",
        "taskDuration": 30,
        "taskComplexity": "low",
        "taskExcitement": "high",
        "taskProject": "0f93957b-ae85-4301-9d8f-66ce7c1c80a4",
        "taskRank": 0,
        "taskGoal": "b3eaa102-8553-469d-871b-66db481df8c2"
    },
    {
        "inserted_at": "2024-08-23T15:53:46.830Z",
        "user_id": "offlineUser",
        "taskId": "f5aa23f6-41b7-416c-8ec3-93885dbfe3aa",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Tell the house plants they are loved and water them.",
        "taskDuration": 120,
        "taskComplexity": "low",
        "taskExcitement": "high",
        "taskProject": "393a08e9-67de-4a15-a9e7-96cbb2955a59",
        "taskRank": 0,
        "taskGoal": "b3eaa102-8553-469d-871b-66db481df8c2"
    },
    {
        "inserted_at": "2024-08-23T16:05:05.635Z",
        "user_id": "offlineUser",
        "taskId": "f9854f37-a452-45eb-be2f-279a45f2f3d9",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Listen to the newest episode of Runtime Rundown podcast.",
        "taskDuration": 60,
        "taskComplexity": "low",
        "taskExcitement": "high",
        "taskProject": "3f9d2cf0-fbb0-4511-9da5-f3a4b048d707",
        "taskRank": 0,
        "taskGoal": "0bf902c8-f704-45f4-9dfd-8b4c47720423"
    },
    {
        "inserted_at": "2024-08-23T15:55:23.886Z",
        "user_id": "offlineUser",
        "taskId": "3036e46b-cf5c-4d49-bb8a-532984705612",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Tasks are included for tracking but are not incorporated into the scoring.",
        "taskDuration": 105,
        "taskComplexity": "high",
        "taskExcitement": "medium",
        "taskProject": "f2360b7f-865e-4a99-ac79-47729a13892d",
        "taskRank": 0,
        "taskGoal": "2b7c9820-3e23-4ce1-8015-5bc34109df3d"
    },
    {
        "inserted_at": "2024-08-23T15:55:59.288Z",
        "user_id": "offlineUser",
        "taskId": "a38421d3-bb2f-4775-b22b-ea6371d921fc",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Touch grass",
        "taskDuration": 60,
        "taskComplexity": "high",
        "taskExcitement": "low",
        "taskProject": "c990a217-e93e-4239-b80b-7237f53a1992",
        "taskRank": 0,
        "taskGoal": "b3eaa102-8553-469d-871b-66db481df8c2"
    },
    {
        "inserted_at": "2024-08-23T16:01:44.420Z",
        "user_id": "offlineUser",
        "taskId": "c44c6f51-6001-4e57-9836-b523f5d5aa56",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Save Baldur's Gate from the Absolute.",
        "taskDuration": 480,
        "taskComplexity": "high",
        "taskExcitement": "high",
        "taskProject": "8cc0ff04-8147-4be4-bfb4-4cd3d78a6268",
        "taskRank": 0,
        "taskGoal": "b3eaa102-8553-469d-871b-66db481df8c2"
    },
    {
        "inserted_at": "2024-08-23T16:02:32.513Z",
        "user_id": "offlineUser",
        "taskId": "e15e48b8-c8d6-49d3-ac9e-407814920b69",
        "taskScore": 0,
        "taskStatus": "active",
        "taskDesc": "Go skateboarding",
        "taskDuration": 60,
        "taskComplexity": "medium",
        "taskExcitement": "high",
        "taskProject": "c990a217-e93e-4239-b80b-7237f53a1992",
        "taskRank": 0,
        "taskGoal": "b3eaa102-8553-469d-871b-66db481df8c2"
    }

]

interface ProjectPrioritizerProps {
    session: Session | null
}

const ProjectPrioritizer = ({ session }: ProjectPrioritizerProps) => {

    const getLocalStorageOrDummy = (key: string, tutorialData: GoalData[] | ProjectData[] | TaskData[]) => {
        const storedData = localStorage.getItem(key)
        if (storedData) {
            return JSON.parse(storedData)
        } else {
            localStorage.setItem(key, JSON.stringify(tutorialData))
            return tutorialGoals
        }
    }

    const [loading, setLoading] = useState(false)
    const [goalDataState, setGoalDataState] = useState<GoalData[]>(getLocalStorageOrDummy("goals", tutorialGoals))
    const [projectDataState, setProjectDataState] = useState<ProjectData[]>(getLocalStorageOrDummy("projects", tutorialProjects))
    const [taskDataState, setTaskDataState] = useState<TaskData[]>(getLocalStorageOrDummy("tasks", tutorialTasks))



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
       <main className=" flex flex-wrap justify-center items-start pt-6 gap-6 bg-gradient-to-tr from-zinc-700 to-zinc-900">  
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