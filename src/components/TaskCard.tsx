import { ProjectData, TaskData } from "@/lib/schema";
import { Button } from "./ui/button";
import TaskForm from "./TaskForm";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Session } from "@supabase/supabase-js";
import updateTaskInDB from "@/functions/updateTaskInDB";
import deleteTaskFromDB from "@/functions/deleteTasksFromDB";

interface TaskCardProps {
    key: string,
    task: TaskData,
    project: ProjectData,
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    background: string | undefined,
    taskDataState: TaskData[],
    setTaskDataState: React.Dispatch<React.SetStateAction<TaskData[]>>,
    session: Session | null
}

export default function TaskCard({ 
    task, 
    project,
    background, 
    taskDataState,
    setTaskDataState,
    session,
}: TaskCardProps) {

    const projectTasks = taskDataState.filter(stateTask => stateTask.taskProject === task.taskProject).sort((a, b) => a.taskRank - b.taskRank)
    const taskIndex = projectTasks.findIndex((stateTask) => stateTask.taskId === task.taskId)


    const changeTaskRank = (taskId: string, direction: number) => {
        let updatedTaskData = [...taskDataState]
        const taskIndex = projectTasks.findIndex((stateTask) => stateTask.taskId === taskId)
        if (taskIndex === -1) {
            console.error("Could not find task.")
            return
        }
        const newIndex = Math.max(0, Math.min(projectTasks.length - 1, taskIndex + direction))
        const [task] = projectTasks.splice(taskIndex, 1)
        projectTasks.splice(newIndex, 0, task)
        projectTasks.forEach((task, taskIndex) => {
            task.taskRank = taskIndex + 1
        })

        const mergeTasks = (updatedTaskData: TaskData[], projectTasks: TaskData[]) => {
            const map: { [key: string]: TaskData} = {}
            projectTasks.forEach(task => {
                map[task.taskId] = task
            })

            const mergedTasks: TaskData[] = updatedTaskData.map(task => {
                const matchingTask = map[task.taskId]
                if(matchingTask) {
                    return matchingTask
                }
                return task
            })

            return mergedTasks
        }
        updatedTaskData = mergeTasks(updatedTaskData, projectTasks)
        

        try {
            Promise.all(updatedTaskData.map(async (updatedTaskData) => {
                await updateTaskInDB(updatedTaskData)
            }))
            setTaskDataState(updatedTaskData)
            console.log("Tasks reordered and updated in databse.")
        } catch (error) {
            console.error("Error updating tasks in database.", error)
        }
    }

    const setTaskStatus = (status: string) => {
       const updatedTaskData = [...taskDataState]
       const editedTask = updatedTaskData[taskIndex]
       if (editedTask) {
        editedTask.taskStatus = status
       } else {
        console.error("Task not found.", editedTask)
       }
       updatedTaskData[taskIndex] = editedTask
       updateTaskInDB(editedTask)
       setTaskDataState(updatedTaskData)
    }



    const deleteTask =  async (taskId: string) => {
        deleteTaskFromDB(taskId)
        setTaskDataState(taskDataState.filter((task) => task.taskId != taskId))
    }


    return (
        <div>
            
           {task.taskStatus === "active" ? 
                <div className="border-2 border-secondary/20 p-2 rounded-xl bg-secondary/80">
                    <div className="py-2 text-lg font-semibold whitespace-normal text-wrap min-h-12">{task.taskDesc}</div>
                    <div className="flex bg-primary/20 p-2 rounded-xl gap-2">
                        <div className="flex flex-col w-full justify-between">
                            <Button className="border-2 border-primary bg-primary/30 hover:bg-green-300/80" onClick={() => setTaskStatus("completed")}><CheckCircleIcon/></Button>
                        
                            <div className="flex justify-between">
                                <TaskForm
                                    mode={"edit"}
                                    task={task}
                                    project={project}
                                    background={background}
                                    taskDataState={taskDataState}
                                    setTaskDataState={setTaskDataState}
                                    session={session}
                                />
                                <Button variant={"destructive"} size={"icon"} className="p-2" onClick={() => deleteTask(task.taskId)}><Trash2Icon/></Button>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-center gap-2">
                            <Button variant={"ghost"} size={"icon"} className="border-2 border-primary/30 hover:bg-primary/20" onClick={() => changeTaskRank(task.taskId, -1)}> <ArrowUpIcon/> </Button>
                            <Button variant={"ghost"} size={"icon"} className="border-2 border-primary/30 hover:bg-primary/20" onClick={() => changeTaskRank(task.taskId, 1)}> <ArrowDownIcon/> </Button>
                        </div>
                    </div>
                </div>
            :
                <div className="border-2 border-primary/30 p-2 rounded-xl">
                    <div className="py-2 text-lg whitespace-normal text-wrap min-h-12">{task.taskDesc}</div>
                    <div className="flex justify-between items-center gap-2">
                        <Button variant={"ghost"} size={"icon"} onClick={() => setTaskStatus("active")} ><RefreshCwIcon/></Button>
                        <Button variant={"destructive"} size={"icon"} className="p-2" onClick={() => deleteTask(task.taskId)}><Trash2Icon/></Button>
                    </div>
                </div>
            }
        </div>
        
    )
}

