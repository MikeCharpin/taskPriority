import { ProjectData } from "@/data/flatFakeData"

interface ResultsSectionProps {
    sortedProjectState: ProjectData[],
}

export default function ResultsSection({ sortedProjectState }: ResultsSectionProps) {


    return (
        <div className="flex flex-col justify-start items-center border-2 rounded-md border-green-300 gap-4 p-4">
            <h1 className="text-xl text-primary font-bold">Priority List</h1>
            {sortedProjectState.map((project) => 
                <PriorityCard
                    key={project.projectId}
                    projectDesc={project.projectDesc}
                />
            )}
            

        </div>
    )
}

interface PriortityCardProps {
    projectDesc: string,
    key: string
}

function PriorityCard({ projectDesc }: PriortityCardProps) {
    return (
        <div className=" max-w-[40dvh] border-2 border-primary rounded-md px-8 py-4">
            {projectDesc}
        </div>
    )
}