import { ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";


import TaskForm from "./TaskForm";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";

interface TaskCardProps {
    key: string,
    task: TaskData,
    taskProjectId: string,
    projectDataState: ProjectData[],
    background: string | undefined,
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    onTaskMoveUp: () => void,
    onTaskMoveDown: () => void,
}




export default function TaskCard({ task, taskProjectId, projectDataState, background, setProjectDataState, onTaskMoveUp, onTaskMoveDown }: TaskCardProps) {
    
    const taskProject = projectDataState.find((project) => project.projectId === taskProjectId)
    const taskIndex = taskProject?.projectTasks.findIndex((projectTask) => projectTask.taskId === task.taskId)

    const setStatusActive = () => {
        const updatedProjectData = [...projectDataState]
        const updatedProject = updatedProjectData.find((project) => project.projectId === taskProjectId)
        const taskIndex = updatedProject?.projectTasks.findIndex((projectTask) => projectTask.taskId ===  task.taskId)
        if(!updatedProject || taskIndex === undefined){
            console.error("Project or index is undefined.")
            return
        }
        const projectIndex = updatedProjectData.findIndex((project) => project.projectId === taskProjectId)
        if(projectIndex === -1){
            console.error("Project index not found.")
            return
        }
        const editedTask = updatedProject.projectTasks.find((projectTask) => task.taskId === projectTask.taskId)
        if(editedTask) {
            console.log(editedTask)
            editedTask.taskStatus = "active"
            console.log(taskIndex)
            updatedProject.projectTasks[taskIndex] = editedTask
        } else {
            console.error("Task not found:", editedTask)
        }
        updatedProjectData[projectIndex] = updatedProject
        setProjectDataState(updatedProjectData)
    }   


    const setStatusComplete = () => {
        const updatedProjectData = [...projectDataState]
        const updatedProject = updatedProjectData.find((project) => project.projectId === taskProjectId)
        const taskIndex = updatedProject?.projectTasks.findIndex((projectTask) => projectTask.taskId ===  task.taskId)
        if(!updatedProject || taskIndex === undefined){
            console.error("Project or index is undefined.")
            return
        }
        const projectIndex = updatedProjectData.findIndex((project) => project.projectId === taskProjectId)
        if(projectIndex === -1){
            console.error("Project index not found.")
            return
        }
        const editedTask = updatedProject.projectTasks.find((projectTask) => task.taskId === projectTask.taskId)
        if(editedTask) {
            console.log(editedTask)
            editedTask.taskStatus = "completed"
            console.log(taskIndex)
            updatedProject.projectTasks[taskIndex] = editedTask
        } else {
            console.error("Task not found:", editedTask)
        }
        updatedProjectData[projectIndex] = updatedProject
        console.log(updatedProject)
        setProjectDataState(updatedProjectData)
    }   


    return (
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-2xl px-4 py-2" style={{ background }}>
            <span className="py-2 text-lg">{task.taskDesc}</span>
           {task.taskStatus === "active" ? 
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2 w-full">
                        <Button onClick={setStatusComplete}><CheckCircleIcon/></Button>
                        <div className="flex justify-between items-center gap-2">
                            <TaskForm
                                mode={"edit"}
                                task={task}
                                taskProject={taskProjectId}
                                index={taskIndex}
                                background={background}
                                projectDataState={projectDataState}
                                setProjectDataState={setProjectDataState}
                            />
                            
                        
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