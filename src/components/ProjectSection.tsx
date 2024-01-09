import ComplexCard from "./ComplexCard";
import { Button } from "./ui/button";


export default function ProjectSection() {
    return (
<div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <h1 className="text-xl font-bold">Project Section</h1>
            <Button variant={"secondary"}>add project</Button>

            <section className="flex flex-col gap-4">
                <ComplexCard />
                <ComplexCard />
                <ComplexCard />
                <ComplexCard />
            </section>
            
        </div>
    )
}