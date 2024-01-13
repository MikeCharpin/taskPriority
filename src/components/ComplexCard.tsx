import { ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface ComplexCardProps {
    key: number,
    projectDesc: string,
    projectTasks: TaskData[],
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    onMoveUp: () => void,
    onMoveDown: () => void,
}

const ComplexCard: React.FC<ComplexCardProps> = ({ projectDesc, projectTasks, projectDataState, setProjectDataState, onMoveUp, onMoveDown }) => {

    const moveTask = (currentIndex: number, direction: number) => {
        const newIndex = Math.max(0, Math.min(projectTasks.length - 1, currentIndex + direction))
        const updatedTaskData: TaskData[] = [...projectTasks]
        const tempTask = updatedTaskData[currentIndex]
        updatedTaskData[currentIndex] = updatedTaskData[newIndex]
        updatedTaskData[newIndex] = tempTask
        const taskId = updatedTaskData[0].taskId

        const findProjectIndexByTask = (taskId: number) => {
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
            <h1 className="pb-4">{ projectDesc }</h1>
            <nav className="flex justify-between items-center gap-2">
                <Button variant={"ghost"} className="text-3xl rotate-180 -translate-y-1" onClick={onMoveDown}> ^ </Button>
                <Button variant={"outline"} className="text-lg"> edit </Button>
                <Button variant={"ghost"} className="text-3xl translate-y-1" onClick={onMoveUp}> ^ </Button>
            </nav>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>tasks</AccordionTrigger>
                    <AccordionContent>
                        <div className="pb-4"><Button variant={"secondary"}>add task</Button></div>
                        <section className="flex flex-col gap-4">
                            {projectTasks && projectTasks.map((task, index) => (
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
    key: number,
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