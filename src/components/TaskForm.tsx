import { ProjectData, TaskData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { v4 as uuidv4 } from "uuid";
import { PencilIcon, PlusIcon } from "lucide-react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/supabaseClient";
import updateTaskInDB from "@/functions/updateTaskInDB";

const formSchema = z.object({
    user_id: z.string(),
    taskId: z.string(),
    taskScore: z.number(),
    taskDesc: z
    .string()
    .min(10, {
        message: "Goal must be at least 10 characters.",
    })
    .max(120, {
        message: "120 character limit.",
    }),
    taskStatus: z.string(),
    taskDuration: z.number().default(1),
    taskComplexity: z.string(),
    taskExcitement: z.string(),
    taskProject: z.string(),
    taskRank: z.number(),
    taskGoal: z.string(),
});

interface TaskFormProps {
    mode: "add" | "edit"
    taskDataState: TaskData[]
    setTaskDataState: React.Dispatch<React.SetStateAction<TaskData[]>>
    project: ProjectData
    task?: TaskData
    background?: string | undefined   
    session: Session | null
}

export default function TaskForm({
    mode,
    taskDataState,
    setTaskDataState,
    project,
    task,
    background,
    session,
}: TaskFormProps) {


    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        user_id: session?.user.id,
        taskId: task?.taskId || uuidv4(),
        taskScore: task?.taskScore || 0,
        taskStatus: task?.taskStatus || "active",
        taskDesc: task?.taskDesc || "",
        taskDuration: task?.taskDuration || 15,
        taskComplexity: task?.taskComplexity || "medium",
        taskExcitement: task?.taskExcitement || "medium",
        taskProject: project.projectId,
        taskRank: task?.taskRank || 0,
        taskGoal: project.projectGoal,
    },
  });

  const addTaskToDB = async (newTask: TaskData) => {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .insert<TaskData>([newTask])
            .single()
        if (error) throw error
        console.log("New task added to DB.", data)
        } catch (error: unknown) {
        console.error("Error adding task to database.", error)
    }
    }
    const { reset, formState } = form;
    const { isValid } = formState;

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (task) => {
        const taskIndex = taskDataState.findIndex(stateTask => stateTask.taskId === task?.taskId)
        if (!session) {
            console.error("No user signed in.")
        } else {
            const taskData = {
                inserted_at: new Date().toString(),
                user_id: session.user.id,
                taskId: task.taskId,
                taskScore: task.taskScore,
                taskStatus: task.taskStatus,
                taskDesc: task.taskDesc.trim(),
                taskDuration: task.taskDuration,
                taskComplexity: task.taskComplexity,
                taskExcitement: task.taskExcitement,
                taskProject: task.taskProject,
                taskRank: task.taskRank,
                taskGoal: task.taskGoal,
            }
            const updatedTaskState = [...taskDataState]
            if (mode === "add") {
                taskData.taskId = uuidv4()
                addTaskToDB(taskData)
                updatedTaskState.push(taskData)
            } else if (mode === "edit" && taskIndex !== undefined) {
                updateTaskInDB(taskData)
                updatedTaskState[taskIndex] = taskData
            }
            setTaskDataState(updatedTaskState)
            reset()
        }
    }

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" size={"icon"} className="z-20">{mode === "add" ? <PlusIcon/> : <PencilIcon />}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" style={{ background }}>
            <DialogHeader>
            <DialogTitle>{mode === "add" ? "add a task" : "edit this task"}</DialogTitle>
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
                        <FormLabel>
                            How long do you think this will take?{" "}
                            {value % 60 === 0
                                ? `${Math.floor(value / 60)} hours`
                                : value < 60
                                ? `${value} minutes`
                                : `${Math.floor(value / 60)} hours & ${value % 60} minutes`
                            }
                        </FormLabel>
                        
                        <FormControl>
                            <Slider 
                                min={15}
                                max={480} 
                                step={15} 
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
                    
                    <div className="flex justify-center gap-16">
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
                                            <RadioGroupItem value="high" />
                                            </FormControl>
                                            <FormLabel className="text-4xl">
                                                😄
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
                                            <RadioGroupItem value="low" />
                                            </FormControl>
                                            <FormLabel className="text-4xl">
                                            😟
                                            </FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="submit" disabled={!isValid}>{mode === "add" ? "add" : "save"}</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    )


}