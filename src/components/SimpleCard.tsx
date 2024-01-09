import { Button } from "./ui/button";

export default function SimpleCard() {
    return (
        <div className="border-2 border-primary rounded-md px-8 py-4">
            <h1 className="pb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, eveniet!</h1>
            <nav className="flex justify-between items-center gap-2">
                <Button variant={"ghost"} className="text-3xl rotate-180"> <span className="translate-y-1">^</span> </Button>
                <Button variant={"outline"} className="text-lg"> edit </Button>
                <Button variant={"ghost"} className="text-3xl"> <span className="translate-y-1">^</span> </Button>
            </nav>
        </div>
    )
}