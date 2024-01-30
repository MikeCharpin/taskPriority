import { GoalData, ProjectData } from "@/data/flatFakeData"

interface ResultsSectionProps {
    sortedProjectState: ProjectData[],
    goalDataState: GoalData[]
}

export default function ResultsSection({ sortedProjectState, goalDataState }: ResultsSectionProps) {


    return (
        <div className="flex flex-col justify-start items-center border-2 rounded-md border-green-300 gap-4 p-4">
            <h1 className="text-xl text-primary font-bold">Priority List</h1>
            {sortedProjectState.map((project) => 
                <PriorityCard
                    key={project.projectId}
                    project={project}
                    goalDataState={goalDataState}
                />
            )}
            

        </div>
    )
}

interface PriortityCardProps {
    project: ProjectData
    goalDataState: GoalData[]
    key: string
}

function PriorityCard({ project, goalDataState }: PriortityCardProps) {

    const projectColor = goalDataState.find((goal) => (goal.goalId === project.projectGoal))?.goalColor
    const background = projectColor

    return (
        <div className=" max-w-[40dvh] min-w-[24rem] rounded-2xl px-8 py-4" style={{ background }}>
            { project.projectDesc }
        </div>
    )
}