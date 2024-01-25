import { GoalData, ProjectData } from "@/data/flatFakeData";
import ComplexCard from "./ComplexCard";
import AddProjectForm from "./AddProjectForm";


interface ProjectSectionProps {
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    goalDataState: GoalData[],
    calcProjectScore: (project: ProjectData) => number,
}

export default function ProjectSection({ projectDataState, setProjectDataState, goalDataState, calcProjectScore }: ProjectSectionProps) {
    
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
            <h1 className="text-xl font-bold">Project Section</h1>
            <AddProjectForm
                projectDataState={projectDataState}
                setProjectDataState={setProjectDataState}
                goalDataState={goalDataState}
                calcProjectScore={calcProjectScore}
            />

            <section className="flex flex-col gap-4">
                {projectDataState.map((project, index) => (
                    <ComplexCard
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
                ))}
            </section>
            
        </div>
    )
}