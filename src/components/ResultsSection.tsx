import { GoalData, ProjectData } from "@/data/flatFakeData"
import { format } from "date-fns"

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
}

function PriorityCard({ project, goalDataState }: PriortityCardProps) {

    const projectColor = goalDataState.find((goal) => (goal.goalId === project.projectGoal))?.goalColor
    const background = projectColor
    const daysUntil = (targetDate: Date): number => {
        const targetDateTime = new Date(targetDate)
        const currentDate = new Date()
        const timeDifference = targetDateTime.getTime() - currentDate.getTime()
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        return daysDifference
    }

    const businessDaysUntil = (targetDate: Date): number => {
        const targetDateTime = new Date(targetDate)
        const currentDate = new Date()
        const timeDifference = targetDateTime.getTime() - currentDate.getTime()
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
        const weekends = Math.floor((currentDate.getDay() + daysDifference) / 7) * 2
        const businessDays = daysDifference - weekends
        return businessDays
    }
    
    const daysRemaining = daysUntil(project.projectTimeframe)
    const businessDaysRemaining = businessDaysUntil(project.projectTimeframe)
    const targetDate = format(project.projectTimeframe, "PPP") 

    return (
        
            <div className="flex flex-col max-w-[40dvh] min-w-[24rem] rounded-2xl px-8 py-4" style={{ background }}>
                <span> { project.projectDesc }</span>
                {daysRemaining > -7 ?
                    <div className="flex flex-col">
                        <span>{`${daysRemaining} days until ${targetDate}`}</span>
                        <span>{`${businessDaysRemaining} business days until ${targetDate}`}</span>
                    </div>
                :
                    ""
                }
                
            </div>
        
    )
}