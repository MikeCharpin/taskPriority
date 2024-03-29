import { GoalData, ProjectData } from "@/lib/schema"
// import { format } from "date-fns"
import { Separator } from "./ui/separator"
import { CalendarHeartIcon } from "lucide-react"

interface ResultsSectionProps {
    sortedProjectState: ProjectData[],
    goalDataState: GoalData[],
}

export default function ResultsSection({ sortedProjectState, goalDataState}: ResultsSectionProps) {


    return (
        <div className="flex flex-col min-w-72 w-full max-w-sm items-center border-2 border-primary/90 rounded-2xl bg-gradient-to-br from-violet-500 to-orange-300 gap-2 p-2">
            <h1 className="text-xl text-primary font-semibold py-4">how about list</h1>
            {sortedProjectState.length == 0 ?
            <div className="bg-primary/10 rounded-2xl p-4 border-2 border-green-300/50">
                <span className="text-wrap">create a goal and a project to get started.</span>
            </div>
            :
                sortedProjectState.map((project) => 
                    <PriorityCard
                        key={project.projectId}
                        project={project}
                        goalDataState={goalDataState}
                    />
                )
            }
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
    // const targetDate = format(projectTargetDate, "PPP") 


    return (
        
            <div className="w-full border-2 border-primary/10 rounded-2xl">
                <div className="flex flex-col w-full rounded-2xl p-4 shadow-md " style={{ background }}>
                    <h2 className="text-wrap whitespace-normal font-bold pb-4">{ `${project.projectDesc}` }</h2>
                    <Separator className="bg-white " />
                    {daysRemaining > -7 ?
                        <div className="pt-2">
                            <span className="flex justify-center font-light gap-2"><CalendarHeartIcon />{`${daysRemaining} days or ${businessDaysRemaining} business days`}</span>
                        </div>
                    :
                        ""
                    }
                
                </div>
            </div>
        
    )
}