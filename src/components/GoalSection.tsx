import { GoalData, ProjectData, TaskData } from "@/lib/schema";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import { Session } from "@supabase/supabase-js";
import updateGoalInDB from "@/functions/updateGoalInDB";

interface GoalSectionProps  {
    goalDataState: GoalData[], 
    setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>,
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>
    taskDataState: TaskData[]
    setTaskDataState: React.Dispatch<React.SetStateAction<TaskData[]>>
    calcGoalScore: (goal: GoalData) => number;
    workingOffline: boolean,
    session: Session | null
}


export function GoalSection({ 
    goalDataState, 
    setGoalDataState, 
    projectDataState, 
    setProjectDataState, 
    taskDataState,
    setTaskDataState,
    calcGoalScore, 
    workingOffline, 
    session 
}: GoalSectionProps ) {
    const activeGoals = goalDataState.filter((goal) => goal.goalStatus === "active").length
    const completedGoals = goalDataState.filter((goal) => goal.goalStatus === "completed").length

    const changeGoalRank = (goalId: string, direction: number) => {
        const goalIndex = goalDataState.findIndex((goal) => goal.goalId === goalId)
        if (goalIndex === -1) {
            console.error("Could not find goal.")
            return
        }
        const newIndex = Math.max(0, Math.min(goalDataState.length - 1, goalIndex + direction))
        const updatedGoalData = [...goalDataState]
        const [goal] = updatedGoalData.splice(goalIndex, 1)
        updatedGoalData.splice(newIndex, 0, goal)
        updatedGoalData.forEach((goal, index) => {
            goal.goalRank = index + 1
        })

        try {
                Promise.all(updatedGoalData.map(async (updatedGoalData) => {
                    await updateGoalInDB(updatedGoalData)
            }))
            setGoalDataState(updatedGoalData)
            console.log("Goals reordered and updated in the database.")
        } catch (error) {
            console.error("Error updateding goals in database.", error)
        }
        
    }



    return (
        <div className="flex flex-col justify-center items-center w-full bg-primary/20 rounded-2xl gap-2 p-2">
            <div className="flex justify-between items-start gap-4">
                <h1 className="text-xl font-bold">goals</h1>
                <GoalForm
                    mode={"add"}
                    goalDataState={goalDataState}
                    setGoalDataState={setGoalDataState}
                    calcGoalScore={calcGoalScore}
                    goal={undefined}
                    index={undefined}
                    workingOffline={workingOffline}
                    session={session}
                />
            </div>
            {activeGoals > 0 ? 
             goalDataState && goalDataState.filter(goals => goals.goalStatus === "active").map((goal, index) => (
                <GoalCard
                        key={goal.goalId}
                        goal={goal}
                        background={goal.goalColor}
                        index={index}
                        onMoveUp={() => changeGoalRank(goal.goalId, -1)}
                        onMoveDown={() => changeGoalRank(goal.goalId, 1)}
                        goalDataState={goalDataState}
                        calcGoalScore={calcGoalScore}
                        setGoalDataState={setGoalDataState}
                        projectDataState={projectDataState}
                        setProjectDataState={setProjectDataState}
                        setTaskDataState={setTaskDataState}
                        taskDataState={taskDataState}
                        workingOffline={workingOffline}
                        session={session}
                        />
             ))
            : 
                <span className="border-2 rounded-xl border-gray-300 p-2 text-center font-semibold">no active goals</span>
            }
            {completedGoals > 0 ? <span className="text-xl font-bold w-full text-center pt-4">🎉 completed goals 🎉</span> : ""}
            {completedGoals > 0 ?
                goalDataState && goalDataState.filter(goals => goals.goalStatus === "completed").map((goal, index) => (
                    <GoalCard
                        key={goal.goalId}
                        goal={goal}
                        background={goal.goalColor}
                        index={index}
                        onMoveUp={() => changeGoalRank(goal.goalId, -1)}
                        onMoveDown={() => changeGoalRank(goal.goalId, 1)}
                        goalDataState={goalDataState}
                        calcGoalScore={calcGoalScore}
                        setGoalDataState={setGoalDataState}
                        projectDataState={projectDataState}
                        setProjectDataState={setProjectDataState}
                        setTaskDataState={setTaskDataState}
                        taskDataState={taskDataState}
                        workingOffline={workingOffline}
                        session={session}
                    />
                ))
            :
                ""
            }
            
                
            

        </div>

    )
}