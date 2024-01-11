import { Button } from "./ui/button";

interface SimpleCardProps {
    desc: string,
    onMoveUp: () => void,
    onMoveDown: () => void,

}

const SimpleCard: React.FC<SimpleCardProps> = ({ desc, onMoveUp, onMoveDown }) => {
    return (
        <div className="border-2 border-primary rounded-md px-8 py-4">
            <h1 className="pb-4">{ desc }</h1>
            <nav className="flex justify-between items-center gap-2">
                <Button variant={"ghost"} className="text-3xl rotate-180" onClick={onMoveDown}> <span className="translate-y-1">^</span> </Button>
                <Button variant={"outline"} className="text-lg"> edit </Button>
                <Button variant={"ghost"} className="text-3xl" onClick={onMoveUp}> <span className="translate-y-1" >^</span> </Button>
            </nav>
        </div>
    )
}

export default SimpleCard