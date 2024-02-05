import { GoalData, ProjectData } from "@/data/flatFakeData";
import SimpleCard from "./SimpleCard";
import GoalForm from "./GoalForm";

interface GoalSectionProps  {
    goalDataState: GoalData[], 
    setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>,
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>
    calcGoalScore: (goal: GoalData) => number;
}


export function GoalSection({ goalDataState, setGoalDataState, projectDataState, setProjectDataState, calcGoalScore }: GoalSectionProps ) {
    const activeGoals = goalDataState.filter((goal) => goal.goalStatus === "active").length
    const completedGoals = goalDataState.filter((goal) => goal.goalStatus === "completed").length

    const moveGoal = (currentIndex: number, direction: number) => {
        const newIndex = Math.max(0,Math.min(goalDataState.length - 1, currentIndex + direction))
        const updatedData = [...goalDataState]
        const tempGoal = updatedData[currentIndex]
        updatedData[currentIndex] = updatedData[newIndex]
        updatedData[newIndex] = tempGoal
        setGoalDataState(updatedData)
    }


    return (
        <div className="flex flex-col justify-center items-center p-4 border-2 border-blue-300 rounded-md gap-2">
            <div className="flex justify-between items-center pb-4">
                <h1 className="text-xl font-bold">Goal Section</h1>
                <GoalForm
                    mode={"add"}
                    goalDataState={goalDataState}
                    setGoalDataState={setGoalDataState}
                    calcGoalScore={calcGoalScore}
                />
            </div>
            {activeGoals > 0 ? 
             goalDataState && goalDataState.filter(goals => goals.goalStatus === "active").map((goal, index) => (
                <SimpleCard
                        key={goal.goalId}
                        goal={goal}
                        background={goal.goalColor}
                        index={index}
                        onMoveUp={() => moveGoal(index, -1)}
                        onMoveDown={() => moveGoal(index, 1)}
                        goalDataState={goalDataState}
                        calcGoalScore={calcGoalScore}
                        setGoalDataState={setGoalDataState}
                        projectDataState={projectDataState}
                        setProjectDataState={setProjectDataState}
                        />
             ))
            : 
                <span className="border-2 rounded-xl border-gray-300 p-2 text-center font-semibold">no active goals</span>
            }
            {completedGoals > 0 ? <span className="text-xl font-bold w-full text-center">🎉 completed 🎉</span> : ""}
            {completedGoals > 0 ?
                goalDataState && goalDataState.filter(goals => goals.goalStatus === "completed").map((goal, index) => (
                    <SimpleCard
                        key={goal.goalId}
                        goal={goal}
                        background={goal.goalColor}
                        index={index}
                        onMoveUp={() => moveGoal(index, -1)}
                        onMoveDown={() => moveGoal(index, 1)}
                        goalDataState={goalDataState}
                        calcGoalScore={calcGoalScore}
                        setGoalDataState={setGoalDataState}
                        projectDataState={projectDataState}
                        setProjectDataState={setProjectDataState}
                    />
                ))
            :
                ""
            }
            
                
            

        </div>

    )
}