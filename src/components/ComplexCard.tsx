import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function ComplexCard({ desc, tasks, onMoveUp, onMoveDown }) {
    return (
        <div className="border-2 border-primary rounded-md px-8 py-4">
            <h1 className="pb-4">{ desc }</h1>
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
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.taskId}
                                    desc={task.taskDesc}
                                />
                            ))}
                        </section>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

function TaskCard({ desc }) {
    return (
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-md p-4">
            <span>{desc}</span>
                <div className="flex justify-center items-center gap-2">
                    <Button variant={"ghost"} className="text-lg rotate-180"> <span className="translate-y-1">^</span> </Button>
                    <Button variant={"outline"} className="text-sm"> edit </Button>
                    <Button variant={"ghost"} className="text-lg"><span className="translate-y-1">^</span> </Button>
                </div>
        </div>
    )
}