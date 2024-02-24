import { GoalData, ProjectData, TaskData } from "@/lib/schema";
import GoalCard from "./GoalCard";
import GoalForm from "./GoalForm";
import { Session } from "@supabase/supabase-js";
import updateGoalInDB from "@/functions/updateGoalInDB";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


interface GoalSectionProps  {
    goalDataState: GoalData[], 
    setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>,
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>
    taskDataState: TaskData[]
    setTaskDataState: React.Dispatch<React.SetStateAction<TaskData[]>>
    calcGoalScore: (goal: GoalData) => number;
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
    session 
}: GoalSectionProps ) {
    const activeGoalsCount = goalDataState.filter((goal) => goal.goalStatus === "active").length
    const completedGoalsCount = goalDataState.filter((goal) => goal.goalStatus === "completed").length

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
        <div className="flex flex-col min-w-72 w-full max-w-sm justify-center items-center p-2  bg-gradient-to-tr from-cyan-700 to-gray-400 rounded-2xl">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold mr-4">goals</h1>
                <GoalForm
                    mode={"add"}
                    goalDataState={goalDataState}
                    setGoalDataState={setGoalDataState}
                    calcGoalScore={calcGoalScore}
                    goal={undefined}
                    index={undefined}
                    session={session}
                />
            </div>
            <section className="flex flex-col gap-4 w-full pt-4">
                {activeGoalsCount > 0 ?
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
                            session={session}
                            />
                 ))
                :
                    <span className=" w-full border-2 rounded-2xl border-primary/50 p-2 text-center font-semibold">no active goals</span>
                }
            </section>
            <section className="w-full flex flex-col items-center gap-4">
                {completedGoalsCount > 0 ?
                    <Accordion type="single" collapsible>
                        <AccordionItem value="completed-tasks">
                            <AccordionTrigger className="text-xl font-bold w-full text-center p-2">🎉 completed goals 🎉</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2" >
                            {goalDataState && goalDataState.filter(goals => goals.goalStatus === "completed").map((goal, index) => (
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
                            session={session}
                        />
                    ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    
                :
                    ""
                }
            </section>
            
                
            

        </div>

    )
}