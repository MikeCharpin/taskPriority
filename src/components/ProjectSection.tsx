import { GoalData, ProjectData, TaskData } from "@/lib/schema";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import { Session } from "@supabase/supabase-js";
import updatedProjectInDB from "@/functions/updateProjectInDB";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



interface ProjectSectionProps {
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    taskDataState: TaskData[],
    setTaskDataState: React.Dispatch<React.SetStateAction<TaskData[]>>,
    goalDataState: GoalData[],
    calcProjectScore: (project: ProjectData) => number,
    session: Session | null
}

export default function ProjectSection({ 
    projectDataState, 
    setProjectDataState, 
    goalDataState, 
    taskDataState,
    setTaskDataState,
    calcProjectScore,
    session, 
}: ProjectSectionProps) {
    
    const activeProjects = projectDataState.filter((projects) => projects.projectStatus === "active").length
    const completedProjects = projectDataState.filter((projects) => projects.projectStatus === "completed").length

    const changeProjectRank = (projectId: string, direction: number) => {
        const projectIndex = projectDataState.findIndex((project) => project.projectId === projectId)
        if (projectIndex === -1) {
            console.error("Couldn't find project.")
            return
        }
        const newIndex = Math.max(0, Math.min(projectDataState.length - 1, projectIndex + direction))
        const updatedProjectData = [...projectDataState]
        const [project] = updatedProjectData.splice(projectIndex, 1)
        updatedProjectData.splice(newIndex, 0, project)
        updatedProjectData.forEach((project, projectIndex) => {
            project.projectRank = projectIndex + 1
        })

        try {
            Promise.all(updatedProjectData.map(async (updatedProjectData) => {
                await updatedProjectInDB(updatedProjectData)
            }))
            setProjectDataState(updatedProjectData)
            console.log("Projects reodered and updated in the database.")
        } catch (error) {
            console.error("Error updating projects in database.", error)
        }
    }

    return (
        <div className="flex flex-col min-w-72 w-full max-w-sm justify-center items-center p-2 bg-gradient-to-br from-amber-700 to-gray-400 rounded-2xl">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold mr-6">projects</h1>
                <ProjectForm
                    mode={"add"}
                    projectDataState={projectDataState}
                    setProjectDataState={setProjectDataState}
                    goalDataState={goalDataState}
                    calcProjectScore={calcProjectScore}
                    session={session}
                />
            </div>

            <section className="flex flex-col gap-4 w-full pt-2">
                {activeProjects > 0 ?
                    projectDataState && projectDataState.filter(projects => projects.projectStatus === "active").map((project) => (
                        <ProjectCard
                            key={project.projectId}
                            project={project}
                            goalDataState={goalDataState}
                            projectDataState={projectDataState}
                            setProjectDataState={setProjectDataState}
                            taskDataState={taskDataState}
                            setTaskDataState={setTaskDataState}
                            calcProjectScore={calcProjectScore}
                            onMoveUp={() => changeProjectRank(project.projectId, -1)}
                            onMoveDown={() => changeProjectRank(project.projectId, 1)}
                            session={session}
                        />
                    ))
                : 
                    <span className=" w-full border-2 rounded-2xl border-primary/50 p-2 text-center font-semibold">no active projects</span>
                }
            </section>
             <section className="flex flex-col gap-4 w-full">
                {completedProjects > 0 ?
                    <Accordion type="single" collapsible>
                        <AccordionItem value="completed-tasks">
                            <AccordionTrigger className="text-xl font-bold w-full text-center p-2">🎉 completed projects 🎉</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-2" >
                            {projectDataState && projectDataState.filter(projects => projects.projectStatus === "completed").map((project) => (
                        <ProjectCard
                            key={project.projectId}
                            project={project}
                            goalDataState={goalDataState}
                            projectDataState={projectDataState}
                            setProjectDataState={setProjectDataState}
                            taskDataState={taskDataState}
                            setTaskDataState={setTaskDataState}
                            calcProjectScore={calcProjectScore}
                            onMoveUp={() => changeProjectRank(project.projectId, -1)}
                            onMoveDown={() => changeProjectRank(project.projectId, 1)}
                            session={session}
                        />
                    ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                : 
                    ""
                }
            </section>
            
        </div>
    )
}