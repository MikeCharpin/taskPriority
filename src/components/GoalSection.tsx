import { GoalData } from "@/data/flatFakeData";
import SimpleCard from "./SimpleCard";

import AddGoalForm from "./addGoalForm";



export function GoalSection({ goalDataState, setGoalDataState }: {goalDataState: GoalData[], setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>}) {


    const moveGoal = (currentIndex: number, direction: number) => {
        const newIndex = Math.max(0,Math.min(goalDataState.length - 1, currentIndex + direction))
        const updatedData = [...goalDataState]
        const tempGoal = updatedData[currentIndex]
        updatedData[currentIndex] = updatedData[newIndex]
        updatedData[newIndex] = tempGoal
        setGoalDataState(updatedData)
    }


    return (
        <div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <h1 className="text-xl font-bold">Goal Section</h1>
            <AddGoalForm />

            <section className="flex flex-col gap-4">
                {goalDataState.map((goal, index) => (
                    <SimpleCard 
                    key={goal.goalId}
                    desc={goal.goalDesc}
                    onMoveUp={() => moveGoal(index, -1)}
                    onMoveDown={() => moveGoal(index, 1) }
                    />
                ))}
            </section>

        </div>

    )
}