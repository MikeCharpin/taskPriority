import { ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";

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
            <span>{task.taskDesc}</span>
                <div className="flex justify-center items-center gap-2">
                    <Button variant={"ghost"} className="text-lg rotate-180" onClick={onTaskMoveDown}> <span className="translate-y-1">^</span> </Button>
                    <TaskForm 
                        mode={"edit"}
                        project={projectDataState[index]}
                        task={task}
                        index={index}
                        background={background}
                        projectDataState={projectDataState}
                        setProjectDataState={setProjectDataState}
                    />
                    <Button variant={"ghost"} className="text-lg" onClick={onTaskMoveUp}><span className="translate-y-1">^</span> </Button>
                </div>
        </div>
    )
}