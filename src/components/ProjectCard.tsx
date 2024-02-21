import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import TaskForm from "./TaskForm";
import TaskCard from "./TaskCard";
import { ArrowDownIcon, ArrowUpIcon, CheckCircleIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
import ProjectForm from "./ProjectForm";
import { Session } from "@supabase/supabase-js";
import updatedProjectInDB from "@/functions/updateProjectInDB";
import deleteProjectFromDB from "@/functions/deleteProjectFromDB";
import { GoalData, ProjectData, TaskData } from "@/lib/schema";

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
        <div className=" flex flex-col w-full rounded-2xl p-2 border-2 border-primary/5" style={{ background }}>
            
            {project.projectStatus === "active" ?
                <div>
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
                                <Button variant={"destructive"} size={"icon"} onClick={() => deleteProject(project.projectId)}><Trash2Icon/></Button>
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
                                <div className="flex flex-col gap-6 bg-primary/30 p-2 rounded-xl">
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
                                <div className="flex flex-col gap-4 py-4">
                                    {completedTasks > 0 ? <span className="text-xl font-bold w-full text-center">🎉 completed tasks 🎉</span> : ""}
                                    {completedTasks > 0 ?
                                        projectTasks && projectTasks
                                            .filter(task => task.taskStatus === "completed")
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
                                            ))
                                    :
                                        ""
                                    }
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            :
                <div className="flex flex-col w-full">
                    <div className="py-2 text-lg font-normal whitespace-normal text-wrap ">{ project.projectDesc }</div>
                    <div className=" bg-primary/20 p-2 rounded-xl ">
                        <div className="flex flex-col w-full justify-between gap-2">
                            <Button className="border-2 border-primary/20 bg-primary/40 hover:bg-green-300/80" onClick={() => setProjectStatus("active")}><RefreshCwIcon/></Button>
                            <Button variant={"destructive"} onClick={() => deleteProject(project.projectId)}><Trash2Icon/></Button>
                        </div>
                   </div>
                </div>                
            }
            
        </div>
    )
}



export default ProjectCard