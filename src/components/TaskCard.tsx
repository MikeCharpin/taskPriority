import { ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";


import TaskForm from "./TaskForm";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, LibrarySquareIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";

interface TaskCardProps {
    key: string,
    index: number,
    task: TaskData,
    taskProject: string,
    projectDataState: ProjectData[],
    background: string | undefined,
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    onTaskMoveUp: () => void,
    onTaskMoveDown: () => void,
}




export default function TaskCard({ task, index, taskProject, projectDataState, background, setProjectDataState, onTaskMoveUp, onTaskMoveDown }: TaskCardProps) {

    const setStatusActive = () => {
        const updatedProjectData = [...projectDataState]
        const projectIndex = updatedProjectData.findIndex((project) => project.projectId === taskProject)
        const updatedTask = updatedProjectData[projectIndex].projectTasks.find((projectTask) => task.taskId === projectTask.taskId)
        if(updatedTask) {
            updatedTask.taskStatus = "active"
        } else {
            console.error("Task not found:", updatedTask)
        }
    }



    return (
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-2xl px-4 py-2" style={{ background }}>
            <span className="py-2 text-lg">{task.taskDesc}</span>
           {task.taskStatus === "active" ? 
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <Button><CheckCircleIcon/></Button>
                        <div className="flex justify-between items-center gap-2">
                            <TaskForm
                                mode={"edit"}
                                task={task}
                                taskProject={taskProject}
                                index={index}
                                background={background}
                                projectDataState={projectDataState}
                                setProjectDataState={setProjectDataState}
                            />
                            
                            <Button variant={"ghost"} size={"icon"}><LibrarySquareIcon/></Button>
                        
                            <Button variant={"destructive"} size={"icon"} className="p-2"><Trash2Icon/></Button>
                                    
                        </div>
                    </div>
                    <div className="flex flex-col justify-between items-end p-0">
                        <Button variant={"ghost"} size={"icon"} className="p-0" onClick={onTaskMoveUp}> <ArrowUpIcon/> </Button>
                        <Button variant={"ghost"} size={"icon"} className="p-0" onClick={onTaskMoveDown}> <ArrowDownIcon/> </Button>
                    </div>
                </div>
            :
                <div className="flex justify-between items-center gap-2">
        
                    <Button variant={"ghost"} size={"icon"} onClick={setStatusActive} ><RefreshCwIcon/></Button>
                
                    <Button variant={"destructive"} size={"icon"} className="p-2"><Trash2Icon/></Button>
                                    
                </div>
            }
        </div>
    )
}