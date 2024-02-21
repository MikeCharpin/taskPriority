import { GoalData, ProjectData, TaskData } from "@/lib/schema";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import { Session } from "@supabase/supabase-js";
import updatedProjectInDB from "@/functions/updateProjectInDB";


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
        <div className="flex flex-col min-w-72 w-full max-w-md justify-center items-center p-2 border-2 bg-primary/20 rounded-2xl">
            <div className="flex justify-between items-start">
                <h1 className="text-xl font-bold">projects</h1>
                <ProjectForm
                    mode={"add"}
                    projectDataState={projectDataState}
                    setProjectDataState={setProjectDataState}
                    goalDataState={goalDataState}
                    calcProjectScore={calcProjectScore}
                    session={session}
                />
            </div>

            <section className="flex flex-col gap-4 w-full">
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
                    <span className="border-2 rounded-xl border-gray-300 p-2 text-center font-semibold">no active projects</span>
                }
            </section>
             <section className="flex flex-col gap-4">
                {completedProjects > 0 ? <span className="text-xl font-bold w-full text-center pt-4">🎉 completed projects 🎉</span> : ""}
                {completedProjects > 0 ?
                    projectDataState && projectDataState.filter(projects => projects.projectStatus === "completed").map((project) => (
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
                    ""
                }
            </section>
            
        </div>
    )
}