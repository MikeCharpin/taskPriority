import { GoalData, ProjectData } from "@/data/flatFakeData"

interface ResultsSectionProps {
    goalDataState: GoalData[],
    projectDataState: ProjectData[],
}

export default function ResultsSection({ goalDataState, projectDataState }: ResultsSectionProps) {

    const updatedProjectData: ProjectData[] = [...projectDataState]

    // Calculate the goal's priority score
    // Calculate the projects priority score
    // for each project, find the goal.goalID that matches the projectGoal and add the goal score to the project scorre
    // sort the projects in descending score and display them in the result list.

    return (
        <div className="flex flex-col justify-start items-center border-2 rounded-md border-green-300 gap-4 p-4">
            <h1 className="text-xl text-primary font-bold">Priority List</h1>
            <PriorityCard />
            <PriorityCard />
            <PriorityCard />
            <PriorityCard />
            <PriorityCard />
            <PriorityCard />
        </div>
    )
}

function PriorityCard() {
    return (
        <div className=" max-w-[40dvh] border-2 border-primary rounded-md px-8 py-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, accusantium!
        </div>
    )
}