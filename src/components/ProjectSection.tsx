import { ProjectData } from "@/data/fakeData";
import ComplexCard from "./ComplexCard";
import { Button } from "./ui/button";


export default function ProjectSection({ data, setData }) {

    const allProjects: ProjectData[] = data.flatMap((goal) => 
        goal.goalProjects.map((project) =>  project)).map((project, index) => {
        return {
            ...project,
            projectImportance: index
        }
    })

    // const addImportance = allProjects.map((project, index) => {
    //     return {
    //         ...project,
    //         projectImportance: index
    //     }
    // })

    console.log(allProjects)
    
    const moveProject = (currentIndex: number, direction: number) => {
        const newIndex = Math.max(0, Math.min(allProjects.length - 1, currentIndex + direction))
        const updatedData: ProjectData[] = [...allProjects]
        const tempProject = updatedData[currentIndex]
        updatedData[currentIndex] = updatedData[newIndex]
        updatedData[newIndex] = tempProject
        setData(updatedData)
    }

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <h1 className="text-xl font-bold">Project Section</h1>
            <Button variant={"secondary"}>add project</Button>

            <section className="flex flex-col gap-4">
                {allProjects.map((project, index) => (
                    <ComplexCard
                            key={project.projectId}
                            desc={project.projectDesc}
                            tasks={project.projectTasks}
                            onMoveUp={() => moveProject(index, -1)}
                            onMoveDown={() => moveProject(index, 1)}
                        />
                ))}
            </section>
            
        </div>
    )
}