import SimpleCard from "./SimpleCard";

export function GoalSection() {
    return (
        <div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <h1 className="text-xl font-bold">Goal Section</h1>
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            <SimpleCard />
            
        </div>
    )
}