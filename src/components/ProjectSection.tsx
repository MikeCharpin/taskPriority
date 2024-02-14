import { GoalData, ProjectData } from "@/data/flatFakeData";
import ProjectCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";
import { SupabaseClient } from "@supabase/supabase-js";


interface ProjectSectionProps {
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    goalDataState: GoalData[],
    calcProjectScore: (project: ProjectData) => number,
    workingOffline: boolean,
    supabase: SupabaseClient

}

export default function ProjectSection({ projectDataState, setProjectDataState, goalDataState, calcProjectScore }: ProjectSectionProps) {
    
    const activeProjects = projectDataState.filter((projects) => projects.projectStatus === "active").length
    const completedProjects = projectDataState.filter((projects) => projects.projectStatus === "completed").length

    const moveProject = (currentIndex: number, direction: number) => {
        const newIndex = Math.max(0, Math.min(projectDataState.length - 1, currentIndex + direction))
        const updatedData: ProjectData[] = [...projectDataState]
        const tempProject = updatedData[currentIndex]
        updatedData[currentIndex] = updatedData[newIndex]
        updatedData[newIndex] = tempProject
        setProjectDataState(updatedData)
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <div className="flex justify-between">
                <h1 className="text-xl font-bold">Project Section</h1>
                <ProjectForm
                    mode={"add"}
                    projectDataState={projectDataState}
                    setProjectDataState={setProjectDataState}
                    goalDataState={goalDataState}
                    calcProjectScore={calcProjectScore}
                />
            </div>

            <section className="flex flex-col gap-4">
                {activeProjects > 0 ?
                    projectDataState && projectDataState.filter(projects => projects.projectStatus === "active").map((project, index) => (
                        <ProjectCard
                            key={project.projectId}
                            index={index}
                            project={project}
                            goalDataState={goalDataState}
                            projectDataState={projectDataState}
                            setProjectDataState={setProjectDataState}
                            calcProjectScore={calcProjectScore}
                            onMoveUp={() => moveProject(index, -1)}
                            onMoveDown={() => moveProject(index, 1)}
                        />
                    ))
                : 
                    <span className="border-2 rounded-xl border-gray-300 p-2 text-center font-semibold">no active projects</span>
                }
            </section>
             <section className="flex flex-col gap-4">
                {completedProjects> 0 ? <span className="text-xl font-bold w-full text-center">🎉 completed 🎉</span> : ""}
                {completedProjects > 0 ?
                    projectDataState && projectDataState.filter(projects => projects.projectStatus === "completed").map((project, index) => (
                        <ProjectCard
                            key={project.projectId}
                            index={index}
                            project={project}
                            goalDataState={goalDataState}
                            projectDataState={projectDataState}
                            setProjectDataState={setProjectDataState}
                            calcProjectScore={calcProjectScore}
                            onMoveUp={() => moveProject(index, -1)}
                            onMoveDown={() => moveProject(index, 1)}
                        />
                    ))
                : 
                    ""
                }
            </section>
            
        </div>
    )
}