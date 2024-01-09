import SimpleCard from "./SimpleCard";
import { Button } from "./ui/button";


export function GoalSection({ data }) {

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-4 border-2 border-blue-300 rounded-md">
            <h1 className="text-xl font-bold">Goal Section</h1>
            <div>
                <Button variant={"secondary"}>add goal</Button>
            </div>
            <section className="flex flex-col gap-4">
                {data.map((goal) => (
                    <SimpleCard 
                    key={goal.goalId}
                    desc={goal.goalDesc}
                    />
                ))}
            </section>

        </div>

    )
}