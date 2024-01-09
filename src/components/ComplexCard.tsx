import { Button } from "./ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function ComplexCard() {
    return (
        <div className="border-2 border-primary rounded-md px-8 py-4">
            <h1 className="pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, eveniet!</h1>
            <nav className="flex justify-between items-center gap-2">
                <Button variant={"ghost"} className="text-3xl rotate-180 -translate-y-1"> ^ </Button>
                <Button variant={"outline"} className="text-lg"> edit </Button>
                <Button variant={"ghost"} className="text-3xl translate-y-1"> ^ </Button>
            </nav>
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>tasks</AccordionTrigger>
                    <AccordionContent>
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                        <TaskCard />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

function TaskCard() {
    return (
        <div className="flex flex-col gap-2 border-2 border-gray-400 rounded-md p-4">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione, vitae!
                <div className="flex justify-center items-center gap-2">
                    <Button variant={"ghost"} className="text-lg rotate-180"> <div className="translate-y-1">^</div> </Button>
                    <Button variant={"outline"} className="text-sm"> edit </Button>
                    <Button variant={"ghost"} className="text-lg"><div className="translate-y-1">^</div> </Button>
                </div>
        </div>
    )
}