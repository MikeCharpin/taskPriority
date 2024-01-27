import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form"
import * as z from "zod"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { v4 as uuidv4 } from 'uuid';
import { GoalData, ProjectData } from "@/data/flatFakeData"

import DatePickerWithRange from "./PracticeDatePicker"

import React from "react"


const formSchema = z.object({
    projectId: z.string(),
    projectScore: z.number(),
    projectPriorityScore: z.number(),
    projectGoal: z.string(),
    projectDesc: z.string().min(10, {
        message: "Goal must be at least 10 characters.",
    }).max(120, {
        message: "120 character limit."
    }),
    projectStatus: z.string(),
    projectMotivation: z.string(),
    projectComplexity: z.enum(["low", "medium", "high"], {
        required_error: "What are the complexity vibes of this project?"
    }),
    projectExcitement: z.enum(["low", "medium", "high"], {
        required_error: "How pumped are you to achieve this project?"
    }),
    projectTimeframe: z.object({
        from: z.date(),
        to: z.date()
    }),
    projectTasks: z.array(z.object({
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
    }))
})

interface AddProjectFormProps {
    projectDataState: ProjectData[],
    setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>,
    goalDataState: GoalData[],
    calcProjectScore: (project: ProjectData) => number,
}


export default function AddProjectForm({ projectDataState, setProjectDataState, goalDataState, calcProjectScore}: AddProjectFormProps ) {

    const addProject = (newProject: ProjectData) => {
        newProject.projectId = uuidv4()
        calcProjectScore(newProject)
        const updatedGoalState = [...projectDataState]
        updatedGoalState.push(newProject)
        setProjectDataState(updatedGoalState)
        reset()
    }

    const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectId: "",
            projectScore: 0,
            projectPriorityScore: 0,
            projectGoal: "",
            projectMotivation: "",
            projectStatus: "active",
            projectDesc: "",
            projectComplexity: "medium",
            projectExcitement: "medium",
            projectTimeframe: {
                from: new Date(),
                to: new Date(),
            },
            projectTasks: [],
        },
    })

    const { reset, formState } = form
    const { isValid } = formState

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (newProject: z.infer<typeof formSchema>) => {
        addProject(newProject)
    }

  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary">add project</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
            <DialogTitle>add a project</DialogTitle>
            <DialogDescription>
                Should be specific with metrics for success.
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="projectGoal"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>goal</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Which goal are you working towards?" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {goalDataState && goalDataState.map((goal) => (
                                        <SelectItem value={goal.goalId} key={goal.goalId}>{goal.goalDesc}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the form description.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                    control={form.control}
                    name="projectDesc"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>What are you trying to accomplish?</FormLabel>
                        
                        <FormControl>
                            <Input placeholder="Get hired in the tech industry ASAP." {...field} />
                        </FormControl>
                        <FormDescription>
                            What are you working towards for the next month?
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="projectMotivation"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Why? What is your motivation?</FormLabel>
                        
                        <FormControl>
                            <Textarea placeholder="I enjoy the challange of the problem selving and building products that people will use. I also need to pay rent." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="projectTimeframe"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>When do you aim to start and complete your project?</FormLabel>
                        <FormControl>
                            <DatePickerWithRange {...field} />
                        </FormControl>
                        <FormDescription>
                            What are you working towards for the next month?
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                        control={form.control}
                        name="projectComplexity"
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
                        name="projectExcitement"
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
                            <Button type="submit" disabled={!isValid}>add</Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
    
  )
}



