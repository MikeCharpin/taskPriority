import { GoalData, ProjectData, TaskData } from "./ProjectPrioritizer";
import { Button } from "./ui/button";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import GoalForm from "./GoalForm";
import { Session } from "@supabase/supabase-js";
import updateGoalInDB from "@/functions/updateGoalInDB";
import deleteGoalFromDB from "@/functions/deleteGoalFromDB";

interface GoalCardProps {
    goal: GoalData,
    background: string,
    index: number,
    onMoveUp: () => void,
    onMoveDown: () => void,
    calcGoalScore: (goal: GoalData) => number,
    goalDataState: GoalData[],
    setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>,
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    taskDataState: TaskData[],
    setTaskDataState: React.Dispatch<React.SetStateAction<TaskData[]>>,
    workingOffline: boolean
    session: Session | null
}

const GoalCard: React.FC<GoalCardProps> = ({ 
    goal, 
    background, 
    index, 
    onMoveUp, 
    onMoveDown, 
    calcGoalScore, 
    goalDataState, 
    setGoalDataState, 
    projectDataState, 
    setProjectDataState, 
    taskDataState,
    setTaskDataState,
    workingOffline, 
    session 
}) => {
    const goalIndex = goalDataState.findIndex((stateGoal) => stateGoal.goalId === goal.goalId)

    const setGoalStatus = (status: string) => {
        const updatedGoalData = [...goalDataState]
        const editedGoal = updatedGoalData[goalIndex]
        if(editedGoal) {
            editedGoal.goalStatus = status
        } else {
            console.error("Goal not found:", editedGoal)
        }
        updatedGoalData[goalIndex] = editedGoal
        updateGoalInDB(editedGoal)
        setGoalDataState(updatedGoalData)
        
        const updatedProjectData = [...projectDataState].map((stateProject) => {
            if(stateProject.projectGoal === goal.goalId && stateProject.projectStatus === "active") {
                return {
                    ...stateProject,
                    projectStatus: status,
                }
            } 
            return stateProject
        })
        setProjectDataState(updatedProjectData)
        
    }

    const deleteGoal = async (goalId: string) => {
        deleteGoalFromDB(goalId)
        setGoalDataState(goalDataState.filter((goal) => goal.goalId !== goalId))
        setProjectDataState(projectDataState.filter((project) => project.projectGoal !== goalId))
        setTaskDataState(taskDataState.filter((task) => task.taskGoal !== goalId))
    }

    // const deleteGoal = (goalId: string) => {
    //     if (workingOffline) {
    //         const updatedGoalData = [...goalDataState]
    //         updatedGoalData.splice(goalIndex, 1)
    //         setGoalDataState(updatedGoalData)
    //         const updatedProjectData = [...projectDataState]
    //         const remainingProjects = updatedProjectData.filter((stateProjects) => stateProjects.projectGoal !== goal.goalId)
    //         setProjectDataState(remainingProjects)
    //     } else {
    //         deleteGoal(goalId)
    //     }
    // }
    

    return (
        <div className="w-64 rounded-2xl px-4 py-4" style={{ background }}>
            <h1 className="pb-6 text-lg font-semibold">{ goal.goalDesc }</h1>
            {goal.goalStatus === "active" ? 
                <div>
                    <div className="flex bg-primary/20 p-2 rounded-xl">
                        <div className="flex flex-col w-full justify-between">
                            <Button onClick={() => setGoalStatus("completed")}><CheckCircleIcon/></Button>
                            <div className="flex justify-between">
                                <GoalForm
                                    mode={"edit"}
                                    goal={goal}
                                    index={index}
                                    calcGoalScore={calcGoalScore}
                                    goalDataState={goalDataState}
                                    setGoalDataState={setGoalDataState}
                                    workingOffline={workingOffline}
                                    session={session}
                                />
                                <Button variant={"destructive"} onClick={() => deleteGoal(goal.goalId)}><Trash2Icon/></Button>
                            </div>
                            </div>
                            <nav className="flex flex-col justify-between items-center gap-2">
                                <Button variant={"ghost"} className="p-2" onClick={onMoveUp}><ArrowUpIcon/></Button>
                                <Button variant={"ghost"} className="p-2" onClick={onMoveDown}><ArrowDownIcon/></Button>
                            </nav>
                        
                    </div>
                </div>
            : 
                <div>
                    <div className="flex bg-primary/20 p-2 rounded-xl ">
                        <div className="flex flex-col w-full justify-between">
                            <Button onClick={() => setGoalStatus("active")}><RefreshCwIcon/></Button>
                            <Button variant={"destructive"} onClick={() => deleteGoal(goal.goalId)}><Trash2Icon/></Button>
                        </div>
                   </div>
                </div>  
            }
            
        </div>
    )
}

export default GoalCard