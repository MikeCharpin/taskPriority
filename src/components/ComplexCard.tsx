import { GoalData, ProjectData, TaskData } from "@/data/flatFakeData";
import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import EditProjectForm from "./EditProjectForm";
import TaskForm from "./TaskForm";

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

    const projectGoalColor = goalDataState.find((goal) => (goal.goalId === project.projectGoal))?.goalColor

    const background = projectGoalColor

    return (
        <div className=" rounded-2xl px-8 py-4" style={{ background }}>
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
                        <TaskForm
                            mode={"add"}
                            project={project}
                            background={projectGoalColor}
                            projectDataState={projectDataState}
                            setProjectDataState={setProjectDataState}
                        />
                        <section className="flex flex-col gap-4">
                            {project.projectTasks && project.projectTasks.map((task, index) => (
                                <TaskCard
                                    key={task.taskId}
                                    index={index}
                                    task={task}
                                    projectDataState={projectDataState}
                                    background={projectGoalColor}
                                    setProjectDataState={setProjectDataState}
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
    index: number,
    task: TaskData,
    projectDataState: ProjectData[],
    background: string | undefined,
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    onTaskMoveUp: () => void,
    onTaskMoveDown: () => void,
}

function TaskCard({ task, index, projectDataState, background, setProjectDataState, onTaskMoveUp, onTaskMoveDown }: TaskCardProps) {

    return (
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-2xl p-4" style={{ background }}>
            <span>{task.taskDesc}</span>
                <div className="flex justify-center items-center gap-2">
                    <Button variant={"ghost"} className="text-lg rotate-180" onClick={onTaskMoveDown}> <span className="translate-y-1">^</span> </Button>
                    <TaskForm 
                        mode={"edit"}
                        project={projectDataState[index]}
                        task={task}
                        index={index}
                        background={background}
                        projectDataState={projectDataState}
                        setProjectDataState={setProjectDataState}
                    />
                    <Button variant={"ghost"} className="text-lg" onClick={onTaskMoveUp}><span className="translate-y-1">^</span> </Button>
                </div>
        </div>
    )
}

export default ComplexCard