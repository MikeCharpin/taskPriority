import { ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface TaskCardProps {
    key: string,
    index: number,
    task: TaskData,
    projectDataState: ProjectData[],
    background: string | undefined,
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    onTaskMoveUp: () => void,
    onTaskMoveDown: () => void,
}

export default function TaskCard({ task, index, projectDataState, background, setProjectDataState, onTaskMoveUp, onTaskMoveDown }: TaskCardProps) {

    return (
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-2xl p-4" style={{ background }}>
            <div className="flex justify-between items-center">
                <span>{task.taskDesc}</span>
                <TaskForm
                    mode={"edit"}
                    project={projectDataState[index]}
                    task={task}
                    index={index}
                    background={background}
                    projectDataState={projectDataState}
                    setProjectDataState={setProjectDataState}
                />
            </div>
            <div className="flex justify-center items-center gap-2">
                <Button variant={"ghost"} onClick={onTaskMoveDown}> <ArrowDownIcon/> </Button>
                
                <Button variant={"ghost"} onClick={onTaskMoveUp}> <ArrowUpIcon/> </Button>
            </div>
        </div>
    )
}