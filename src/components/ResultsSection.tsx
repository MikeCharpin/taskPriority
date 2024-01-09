export default function ResultsSection() {
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