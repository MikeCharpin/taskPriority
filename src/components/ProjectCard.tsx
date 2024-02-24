import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, Trash2Icon } from "lucide-react";
import ProjectForm from "./ProjectForm";
import { Session } from "@supabase/supabase-js";
import updatedProjectInDB from "@/functions/updateProjectInDB";
import deleteProjectFromDB from "@/functions/deleteProjectFromDB";
import { GoalData, ProjectData, TaskData } from "@/lib/schema";
import CompletedCard from "./ui/completed-card";

interface ProjectCardProps {
    project: ProjectData,
    goalDataState: GoalData[],
    projectDataState: ProjectData[],
    taskDataState: TaskData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    setTaskDataState: React.Dispatch<React.SetStateAction<TaskData[]>>,
    calcProjectScore: (project: ProjectData) => number,
    onMoveUp: () => void,
    onMoveDown: () => void,
    session: Session | null,
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
    project, 
    goalDataState, 
    projectDataState,
    taskDataState, 
    setProjectDataState, 
    setTaskDataState,
    calcProjectScore, 
    onMoveUp, 
    onMoveDown,
    session,
 }) => {
    const projectGoalColor = goalDataState.find((goal) => (goal.goalId === project.projectGoal))?.goalColor
    const background = projectGoalColor
    const projectTasks = taskDataState.filter((task) => task.taskProject === project.projectId).sort((a, b) => a.taskRank - b.taskRank)
    const activeTasks = projectTasks.filter((task) => task.taskStatus === "active").length
    const completedTasks = projectTasks.filter((task) => task.taskStatus === "completed").length
    const projectIndex = projectDataState.findIndex((stateProject) => stateProject.projectId === project.projectId)

    const setProjectStatus = (status: string) => {
        const updatedProjectData = [...projectDataState]
        
        const editedProject = updatedProjectData[projectIndex]
        if(editedProject) {
            editedProject.projectStatus = status
        } else {
            console.error("Project not found:", editedProject)
        }
        updatedProjectData[projectIndex] = editedProject
        updatedProjectInDB(editedProject)
        setProjectDataState(updatedProjectData) 
    }



    const deleteProject = async (projectId: string) => {
        deleteProjectFromDB(projectId)
        setProjectDataState(projectDataState.filter(project => project.projectId != projectId))
        setTaskDataState(taskDataState.filter(task => task.taskProject !== projectId))
    }

    return (
        <div>
            {project.projectStatus === "active" ?
                <div className=" flex flex-col w-full rounded-2xl px-4 py-2 border-2 border-primary/5" style={{ background }}>
                    <div className="py-2 text-lg font-semibold whitespace-normal text-wrap min-h-12">{ project.projectDesc }</div>
                    <div className="flex bg-primary/20 p-2 rounded-xl gap-2">
                        <div className="flex flex-col w-full justify-between">
                            <Button className="border-2 border-primary bg-primary/30 hover:bg-green-300/80" onClick={() => setProjectStatus("completed")}><CheckCircleIcon/></Button>
                            <div className="flex justify-between">
                                <ProjectForm
                                    mode={"edit"}
                                    project={project}
                                    goalDataState={goalDataState}
                                    calcProjectScore={calcProjectScore}
                                    projectDataState={projectDataState}
                                    setProjectDataState={setProjectDataState}
                                    session={session}
                                />
                                <Popover>
                                    <PopoverTrigger><Trash2Icon/></PopoverTrigger>
                                    <PopoverContent className="flex gap-2 items-center w-50 bg-secondary shadow-lg border-2 border-red-600/70 rounded-xl">
                                        <span className="font-semibold">delete forever?</span>
                                        <Button 
                                        variant={"destructive"} 
                                        size={"icon"} 
                                        className="bg-red-900/70 hover:bg-red-900" 
                                        onClick={() => deleteProject(project.projectId)}>
                                            <Trash2Icon/>
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                        <nav className="flex flex-col justify-between items-center gap-2">
                            <Button variant={"ghost"} className="px-6 border-2 border-primary/30 hover:bg-primary/20"  onClick={onMoveUp}> <ArrowUpIcon/> </Button>
                            <Button variant={"ghost"} className="px-6 border-2 border-primary/30 hover:bg-primary/20"  onClick={onMoveDown}> <ArrowDownIcon/> </Button>
                        </nav>
                    </div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg">view tasks</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-6 border-2 border-primary/50 p-2 rounded-xl">
                                    <div className="flex justify-end items-center relative">
                                        <TaskForm
                                            mode={"add"}
                                            task={undefined}
                                            project={project}
                                            background={projectGoalColor}
                                            taskDataState={taskDataState}
                                            setTaskDataState={setTaskDataState}
                                            session={session}
                                        />
                                        <span className="text-xl font-bold text-center w-full z-10 absolute">⚡ active tasks ⚡</span>
                                    </div>
                                    {activeTasks > 0 ?
                                        projectTasks && projectTasks.filter(task => task.taskStatus === "active").map((task) => (
                                            <TaskCard
                                                key={task.taskId}
                                                task={task}
                                                project={project}
                                                projectDataState={projectDataState}
                                                background={projectGoalColor}
                                                setProjectDataState={setProjectDataState}
                                                taskDataState={taskDataState}
                                                setTaskDataState={setTaskDataState}
                                                session={session}
                                            />
                                        ))
                                    :
                                        <span className="border-2 rounded-xl border-gray-300 p-2 text-center font-semibold">no active tasks</span>
                                    }
                        
                                </div>
                                <div className="flex flex-col py-4 gap-2">
                                    {completedTasks > 0 ?
                                        <Accordion type="single" collapsible>
                                            <AccordionItem value="completed-tasks">
                                                <AccordionTrigger className="text-xl font-bold w-full text-center p-2">🎉 completed tasks 🎉</AccordionTrigger>
                                                <AccordionContent className="flex flex-col gap-2" >
                                               {projectTasks && projectTasks
                                            .filter((task) => task.taskStatus === "completed")
                                            .map((task) => (
                                                <TaskCard
                                                    key={task.taskId}
                                                    task={task}
                                                    project={project}
                                                    projectDataState={projectDataState}
                                                    background={projectGoalColor}
                                                    setProjectDataState={setProjectDataState}
                                                    taskDataState={taskDataState}
                                                    setTaskDataState={setTaskDataState}
                                                    session={session}
                                                />
                                            ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    :
                                        ""
                                    }
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            :
                <div className=" rounded-xl border-2 border-primary/5" style={{ background }}>
                    <CompletedCard
                            desc= {project.projectDesc}
                            id= {project.projectId}
                            reset= {setProjectStatus}
                            deleteitem={deleteProject}
                        />
                </div>            
            }
            
        </div>
    )
}



export default ProjectCard