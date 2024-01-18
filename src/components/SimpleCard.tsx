import { GoalData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import EditGoalForm from "./EditGoalForm";

interface SimpleCardProps {
    goal: GoalData,
    index: number,
    onMoveUp: () => void,
    onMoveDown: () => void,
    calcGoalScore: (goal: GoalData) => number,
    goalDataState: GoalData[],
    setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>,
}

const SimpleCard: React.FC<SimpleCardProps> = ({ goal, index, onMoveUp, onMoveDown, calcGoalScore, goalDataState, setGoalDataState }) => {

    return (
        <div className="border-2 border-primary rounded-md px-8 py-4">
            <h1 className="pb-4">{ goal.goalDesc }</h1>
            <nav className="flex justify-between items-center gap-2">
                <Button variant={"ghost"} className="text-3xl rotate-180" onClick={onMoveDown}> <span className="translate-y-1">^</span> </Button>
                 <EditGoalForm
                    goal={goal}
                    index={index}
                    calcGoalScore={calcGoalScore}
                    goalDataState={goalDataState}
                    setGoalDataState={setGoalDataState}
                />
                <Button variant={"ghost"} className="text-3xl" onClick={onMoveUp}> <span className="translate-y-1" >^</span> </Button>
            </nav>
            
           
        </div>
    )
}

export default SimpleCard