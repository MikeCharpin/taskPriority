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
                    background={project.projectColor}
                />
            )}
            

        </div>
    )
}

interface PriortityCardProps {
    projectDesc: string,
    background: string | undefined,
    key: string
}

function PriorityCard({ projectDesc, background }: PriortityCardProps) {

    return (
        <div className=" max-w-[40dvh] min-w-[24rem] rounded-2xl px-8 py-4" style={{ background }}>
            {projectDesc}
        </div>
    )
}