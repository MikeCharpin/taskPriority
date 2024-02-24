import { GoalData, ProjectData, TaskData } from "@/lib/schema";
import { Button } from "./ui/button";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, Trash2Icon } from "lucide-react";
import GoalForm from "./GoalForm";
import { Session } from "@supabase/supabase-js";
import updateGoalInDB from "@/functions/updateGoalInDB";
import deleteGoalFromDB from "@/functions/deleteGoalFromDB";
import CompletedCard from "./ui/completed-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


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
    

    return (
        <div className="w-full">
            {goal.goalStatus === "active" ? 
                <div className="border-2 border-primary/5 rounded-2xl">
                    <div className="w-full px-4 py-2 shadow-md rounded-2xl" style={{ background }}>
                        <h1 className="py-2 text-lg font-semibold text-wrap whitespace-normal min-h-12">{goal.goalDesc}</h1>
                        <div className="flex bg-primary/20 p-2 rounded-2xl gap-2">
                            <div className="flex flex-col w-full justify-between">
                                <Button className="border-2 border-primary bg-primary/40 hover:bg-green-300/80 shadow-md" onClick={() => setGoalStatus("completed")}><CheckCircleIcon/></Button>
                                <div className="flex justify-between">
                                    <GoalForm
                                        mode={"edit"}
                                        goal={goal}
                                        index={index}
                                        calcGoalScore={calcGoalScore}
                                        goalDataState={goalDataState}
                                        setGoalDataState={setGoalDataState}
                                        session={session}
                                    />
                                    <Popover>
                                        <PopoverTrigger><Trash2Icon/></PopoverTrigger>
                                        <PopoverContent className="flex gap-2 items-center w-50 bg-secondary shadow-lg border-2 border-red-600/70 rounded-2xl">
                                            <span className="font-semibold">delete forever?</span>
                                            <Button
                                            variant={"destructive"}
                                            size={"icon"}
                                            className="bg-red-900/70 hover:bg-red-900"
                                            onClick={() => deleteGoal(goal.goalId)}>
                                                <Trash2Icon/>
                                            </Button>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                </div>
                                <nav className="flex flex-col justify-between items-center gap-2">
                                    <Button variant={"ghost"} className="px-6 border-2 border-primary/70 hover:bg-primary/20 shadow-md" onClick={onMoveUp}><ArrowUpIcon/></Button>
                                    <Button variant={"ghost"} className="px-6 border-2 border-primary/70 hover:bg-primary/20 shadow-md" onClick={onMoveDown}><ArrowDownIcon/></Button>
                                </nav>
                    
                        </div>
                    </div>
                </div>
            : 
                <div className="rounded-2xl border-2 border-primary/5" style={{ background }}>
                   <CompletedCard
                        desc= {goal.goalDesc}
                        id= {goal.goalId}
                        reset= {setGoalStatus}
                        deleteitem={deleteGoal}
                    />
                </div>  
            }
            
        </div>
    )
}

export default GoalCard