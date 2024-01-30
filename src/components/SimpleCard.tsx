import { GoalData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import EditGoalForm from "./EditGoalForm";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface SimpleCardProps {
    goal: GoalData,
    background: string,
    index: number,
    onMoveUp: () => void,
    onMoveDown: () => void,
    calcGoalScore: (goal: GoalData) => number,
    goalDataState: GoalData[],
    setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>,
}

const SimpleCard: React.FC<SimpleCardProps> = ({ goal, background, index, onMoveUp, onMoveDown, calcGoalScore, goalDataState, setGoalDataState }) => {

    

    return (
        <div className=" rounded-2xl px-8 py-4" style={{ background }}>
            <h1 className="pb-4">{ goal.goalDesc }</h1>
            <nav className="flex justify-between items-center gap-2">
                <Button variant={"ghost"}  onClick={onMoveDown}><ArrowDownIcon/></Button>
                 <EditGoalForm
                    goal={goal}
                    index={index}
                    calcGoalScore={calcGoalScore}
                    goalDataState={goalDataState}
                    setGoalDataState={setGoalDataState}
                />
                <Button variant={"ghost"} onClick={onMoveUp}><ArrowUpIcon/></Button>
            </nav>
            
           
        </div>
    )
}

export default SimpleCard