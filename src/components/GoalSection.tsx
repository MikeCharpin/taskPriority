import SimpleCard from "./SimpleCard";
import { Button } from "./ui/button";
import { GoalData } from "@/data/fakeData";


export function GoalSection({ data, setData }: {data: GoalData[], setData: React.Dispatch<React.SetStateAction<GoalData[]>>}) {

    const moveGoal = (currentIndex: number, direction: number) => {

        // console.log("Moving goal at index:", currentIndex, "Direction:", direction)
        const newIndex = Math.max(0, Math.min(data.length - 1, currentIndex + direction)) 
        // console.log("Generating newIndex:", newIndex)

        const updatedData: GoalData[] = [...data]
        console.log("Original data:", updatedData)

        const tempGoal = updatedData[currentIndex]
        updatedData[currentIndex] = updatedData[newIndex]
        updatedData[newIndex] = tempGoal
        
        console.log("New data:", updatedData)

        setData(updatedData)
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <h1 className="text-xl font-bold">Goal Section</h1>
            <div>
                <Button variant={"secondary"}>add goal</Button>
            </div>
            <section className="flex flex-col gap-4">
                {data.map((goal, index) => (
                    <SimpleCard 
                    key={goal.goalId}
                    desc={goal.goalDesc}
                    index={index}
                    onMoveUp={() => moveGoal(index, -1)}
                    onMoveDown={() => moveGoal(index, 1)}
                    />
                ))}
            </section>

        </div>

    )
}