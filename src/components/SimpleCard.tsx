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
        <div className="w-64 rounded-2xl px-4 py-4" style={{ background }}>
            <div className="flex justify-between items-start">
                <span>{ goal.goalDesc }</span>
                
                <nav className="flex flex-col justify-end items-end">
                <Button variant={"ghost"} className="p-0" onClick={onMoveUp}><ArrowUpIcon/></Button>
                <Button variant={"ghost"} className="p-0" onClick={onMoveDown}><ArrowDownIcon/></Button>
            </nav>
            </div>
            <EditGoalForm
                goal={goal}
                index={index}
                calcGoalScore={calcGoalScore}
                goalDataState={goalDataState}
                setGoalDataState={setGoalDataState}
            />
            
        </div>
    )
}

export default SimpleCard