import ComplexCard from "./ComplexCard";


export default function ProjectSection() {
    return (
<div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <h1 className="text-xl font-bold">Project Section</h1>
            <ComplexCard />
            <ComplexCard />
            <ComplexCard />
            <ComplexCard />
            
        </div>
    )
}