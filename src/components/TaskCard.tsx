import { ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";

import TaskForm from "./TaskForm";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Session } from "@supabase/supabase-js";
import updateTaskInDB from "@/functions/updateTaskInDB";
import { supabase } from "@/supabaseClient";
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
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-2xl px-4 py-2" style={{ background }}>
            <span className="py-2 text-lg">{task.taskDesc}</span>
           {task.taskStatus === "active" ? 
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2 w-full">
                        <Button onClick={() => setTaskStatus("completed")}><CheckCircleIcon/></Button>
                        
                        <div className="flex justify-between items-center gap-2">
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
                    <div className="flex flex-col justify-between items-end p-0">
                        <Button variant={"ghost"} size={"icon"} className="p-0" onClick={() => changeTaskRank(task.taskId, -1)}> <ArrowUpIcon/> </Button>
                        <Button variant={"ghost"} size={"icon"} className="p-0" onClick={() => changeTaskRank(task.taskId, 1)}> <ArrowDownIcon/> </Button>
                    </div>
                </div>
            :
                <div className="flex justify-between items-center gap-2">
                    <Button variant={"ghost"} size={"icon"} onClick={() => setTaskStatus("active")} ><RefreshCwIcon/></Button>
                    <Button variant={"destructive"} size={"icon"} className="p-2" onClick={() => deleteTask(task.taskId)}><Trash2Icon/></Button>          
                </div>
            }
        </div>
        
    )
}

