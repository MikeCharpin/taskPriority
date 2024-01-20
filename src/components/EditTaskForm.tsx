import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ProjectData, TaskData } from "@/data/flatFakeData"

const formSchema = z.object({
    taskId: z.string(),
    taskScore: z.number(),
    taskDesc: z.string().min(10, {
        message: "Goal must be at least 10 characters.",
    }).max(120, {
        message: "120 character limit."
    }),
    taskStatus: z.string(),
    taskDuration: z.number().default(1),
    taskComplexity: z.string(),
    taskExcitement: z.string(),
    taskProject:z.string(),
})

interface editTaskFormProps {
    task: TaskData,
    index: number,
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
}

export default function EditTaskForm({ task, index, projectDataState, setProjectDataState }: editTaskFormProps) {

    const editTask = (editedTask: TaskData) => {
        const updatedProjectState = [...projectDataState]
        const updatedProject = updatedProjectState.find((project) => project.projectId === editedTask.taskProject)

        if(updatedProject){
            const projectIndex = updatedProjectState.findIndex((project) => project.projectId === editedTask.taskProject)
            updatedProject.projectTasks[index] = editedTask
            updatedProjectState[projectIndex] = updatedProject
            console.log(updatedProjectState)
        } else {
            console.error('Project not found:', editedTask.taskProject)
        }
    
        setProjectDataState(updatedProjectState)
    }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        taskId: task.taskId,
        taskScore: task.taskScore,
        taskStatus: task.taskStatus,
        taskDesc: task.taskDesc,
        taskDuration: task.taskDuration,
        taskComplexity: task.taskComplexity,
        taskExcitement: task.taskExcitement,
        taskProject:task.taskProject,
    },
  })


  function onSubmit(editedTask: TaskData) {
    editTask(editedTask)

  }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary">edit task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>edit a task</DialogTitle>
            <DialogDescription>
                Should be specific with metrics for success.
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="taskDesc"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>What are you trying to accomplish?</FormLabel>
                        
                        <FormControl>
                            <Input placeholder="Get hired in the tech industry ASAP." {...field} />
                        </FormControl>
                        <FormDescription>
                            What are you working towards for the next 6 months?
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="taskDuration"
                    render={({ field: {value, onChange} }) => (
                        <FormItem>
                        <FormLabel>How long do you think this will take? {value}</FormLabel>
                        
                        <FormControl>
                            <Slider 
                                min={1}
                                max={100} 
                                step={10} 
                                defaultValue={[form.getValues("taskDuration")]} 
                                onValueChange={(vals) => {
                                    onChange(vals[0])
                                }}
                                value={[form.getValues("taskDuration")]}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="taskComplexity"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>complexity</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col justify-between items-startspace-y-1 gap-2"
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0 gap-2">
                                    <FormControl>
                                    <RadioGroupItem value="low" />
                                    </FormControl>
                                    <FormLabel className="flex items-center text-md">
                                        small &nbsp; <span className="text-3xl">🍰</span>
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 gap-2">
                                    <FormControl>
                                    <RadioGroupItem value="medium" />
                                    </FormControl>
                                    <FormLabel className="flex items-center text-2xl ">
                                        medium &nbsp; <span className="text-3xl">🔨</span>
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0 gap-2">
                                    <FormControl>
                                    <RadioGroupItem value="high" />
                                    </FormControl>
                                    <FormLabel className="flex items-center text-4xl">
                                        large &nbsp; <span className="text-3xl">🚀</span>
                                    </FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="taskExcitement"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>excitement</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col justify-between space-y-1 "
                                >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="low" />
                                    </FormControl>
                                    <FormLabel className="text-4xl">
                                    😟
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="medium" />
                                    </FormControl>
                                    <FormLabel className="text-4xl">
                                    😏
                                    </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                    <RadioGroupItem value="high" />
                                    </FormControl>
                                    <FormLabel className="text-4xl">
                                        😄
                                    </FormLabel>
                                </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit">save</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    
  )
}



