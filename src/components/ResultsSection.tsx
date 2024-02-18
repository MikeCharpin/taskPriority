import { GoalData, ProjectData } from "@/lib/schema"
import { format } from "date-fns"
import { Separator } from "./ui/separator"

interface ResultsSectionProps {
    sortedProjectState: ProjectData[],
    goalDataState: GoalData[]
}

export default function ResultsSection({ sortedProjectState, goalDataState }: ResultsSectionProps) {


    return (
        <div className="flex flex-col center items-center border-2 rounded-2xl bg-primary/20 gap-2 p-2">
            <h1 className="text-xl text-primary font-semibold">how about list</h1>
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
    const projectTargetDate = new Date(project.projectTimeframe)
    const daysRemaining = daysUntil(projectTargetDate)
    const businessDaysRemaining = businessDaysUntil(projectTargetDate)
    const targetDate = format(projectTargetDate, "PPP") 

    return (
        
            <div className="flex flex-col rounded-2xl p-4" style={{ background }}>
                <h2 className="text-wrap whitespace-normal font-bold pb-4">{ `${project.projectDesc}` }</h2>
                <Separator className="bg-white " />
                {daysRemaining > -7 ?
                    <div className="flex flex-col pt-2 gap-2">
                        <span>{`${daysRemaining} days until ${targetDate}`}</span>
                        <span>{`${businessDaysRemaining} business days until ${targetDate}`}</span>
                    </div>
                :
                    ""
                }
                
            </div>
        
    )
}