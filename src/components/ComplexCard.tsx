import { GoalData, ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import EditProjectForm from "./EditProjectForm";

interface ComplexCardProps {
    key: string,
    index: number,
    project: ProjectData,
    goalDataState: GoalData[],
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    calcProjectScore: (project: ProjectData) => number,
    onMoveUp: () => void,
    onMoveDown: () => void,
}

const ComplexCard: React.FC<ComplexCardProps> = ({ project, index, goalDataState, projectDataState, setProjectDataState, calcProjectScore, onMoveUp, onMoveDown }) => {

    const moveTask = (currentIndex: number, direction: number) => {
        const newIndex = Math.max(0, Math.min(project.projectTasks.length - 1, currentIndex + direction))
        const updatedTaskData: TaskData[] = [...project.projectTasks]
        const tempTask = updatedTaskData[currentIndex]
        updatedTaskData[currentIndex] = updatedTaskData[newIndex]
        updatedTaskData[newIndex] = tempTask
        const taskId = updatedTaskData[0].taskId

        const findProjectIndexByTask = (taskId: string) => {
            const projectIndex = projectDataState.findIndex(project => 
                project.projectTasks.some(task => task.taskId === taskId)
            )
            return projectIndex
        }

       const projectIndex = findProjectIndexByTask(taskId)
        const updatedProjectData: ProjectData[] = [...projectDataState]
        updatedProjectData[projectIndex].projectTasks = updatedTaskData
        setProjectDataState(updatedProjectData)
    }

    return (
        <div className="border-2 border-primary rounded-md px-8 py-4">
            <h1 className="pb-4">{ project.projectDesc }</h1>
            <nav className="flex justify-between items-center gap-2">
                <Button variant={"ghost"} className="text-3xl rotate-180 -translate-y-1" onClick={onMoveDown}> ^ </Button>
                <EditProjectForm 
                    project={project}
                    index={index}
                    goalDataState={goalDataState}
                    calcProjectScore={calcProjectScore}
                    projectDataState={projectDataState}
                    setProjectDataState={setProjectDataState}
                />
                <Button variant={"ghost"} className="text-3xl translate-y-1" onClick={onMoveUp}> ^ </Button>
            </nav>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>tasks</AccordionTrigger>
                    <AccordionContent>
                        <div className="pb-4"><Button variant={"secondary"}>add task</Button></div>
                        <section className="flex flex-col gap-4">
                            {project.projectTasks && project.projectTasks.map((task, index) => (
                                <TaskCard
                                    key={task.taskId}
                                    taskDesc={task.taskDesc}
                                    onTaskMoveUp={() => moveTask(index, -1)}
                                    onTaskMoveDown={() => moveTask(index, 1)}
                                />
                            ))}
                        </section>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

interface TaskCardProps {
    key: string,
    taskDesc: string,
    onTaskMoveUp: () => void,
    onTaskMoveDown: () => void,
}

function TaskCard({ taskDesc, onTaskMoveUp, onTaskMoveDown }: TaskCardProps) {

    return (
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-md p-4">
            <span>{taskDesc}</span>
                <div className="flex justify-center items-center gap-2">
                    <Button variant={"ghost"} className="text-lg rotate-180" onClick={onTaskMoveDown}> <span className="translate-y-1">^</span> </Button>
                    <Button variant={"outline"} className="text-sm"> edit </Button>
                    <Button variant={"ghost"} className="text-lg" onClick={onTaskMoveUp}><span className="translate-y-1">^</span> </Button>
                </div>
        </div>
    )
}

export default ComplexCard