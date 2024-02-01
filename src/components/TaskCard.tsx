import { ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import TaskForm from "./TaskForm";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, LibrarySquareIcon, Trash2Icon } from "lucide-react";

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
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-2xl px-4 py-2" style={{ background }}>
            <span className="py-2 text-lg">{task.taskDesc}</span>
           
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button><CheckCircleIcon/></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p>🎉 mark task complete 🎉 </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <div className="flex justify-between items-center gap-2">
                        <TaskForm
                            mode={"edit"}
                            project={projectDataState[index]}
                            task={task}
                            index={index}
                            background={background}
                            projectDataState={projectDataState}
                            setProjectDataState={setProjectDataState}
                        />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant={"ghost"} size={"icon"}><LibrarySquareIcon/></Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>📚 archive task for now 📚</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant={"destructive"} size={"icon"} className="p-2"><Trash2Icon/></Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>🗑️ remove task 🗑️</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    
                </div>
                <div className="flex flex-col justify-between items-end p-0">
                    <Button variant={"ghost"} size={"icon"} className="p-0" onClick={onTaskMoveUp}> <ArrowUpIcon/> </Button>
                    <Button variant={"ghost"} size={"icon"} className="p-0" onClick={onTaskMoveDown}> <ArrowDownIcon/> </Button>
                </div>
                        </div>
            </div>
    )
}