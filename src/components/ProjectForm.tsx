import { GoalData, ProjectData } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
import * as z from "zod";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { PlusIcon, PencilIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import DatePickerWithPresets from "./ui/datePickerWithPresets";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/supabaseClient";
import updatedProjectInDB from "@/functions/updateProjectInDB";
import { Separator } from "@/components/ui/separator";

interface ProjectFormProps {
  mode: "add" | "edit"
  projectDataState: ProjectData[]
  setProjectDataState: React.Dispatch<React.SetStateAction<ProjectData[]>>
  goalDataState: GoalData[]
  calcProjectScore: (project: ProjectData) => number
  project?: ProjectData
  session: Session | null
}

const ProjectForm: React.FC<ProjectFormProps> = ({
    mode, 
    projectDataState, 
    setProjectDataState, 
    goalDataState, 
    calcProjectScore, 
    project, 
    session,
}) => {
    const [selectedGoalId, setSelectedGoalId] = useState<string | null>(project ? project.projectGoal : null);
    const handleGoalChange = (value: string) => setSelectedGoalId(value);
    const background = selectedGoalId?goalDataState.find((goal) => goal.goalId === selectedGoalId)?.goalColor: undefined;
    

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
        projectComplexity: z.string(),
        projectExcitement: z.string(),
        projectTimeframe: z.date(),
        projectRank: z.number(),
    })

    const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        projectId: project?.projectId || uuidv4(),
        projectScore: project?.projectScore || 0,
        projectPriorityScore: project?.projectPriorityScore || 0,
        projectGoal: project?. projectGoal || "",
        projectMotivation: project?.projectMotivation || "",
        projectStatus: project?.projectStatus || "active",
        projectDesc: project?.projectDesc || "",
        projectComplexity: project?. projectComplexity || "medium",
        projectExcitement: project?.projectExcitement || "medium",
        projectTimeframe: project?.projectTimeframe || new Date(),
        projectRank: project?.projectRank || 0,
    },
    });

    const { reset, formState } = form;
    const { isValid } = formState;

    const addProjectToDB = async (newProject: ProjectData) => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .insert<ProjectData>([newProject])
                .single()
            if (error) throw error
            console.log("New project added to database.", data)
        } catch (error) {
            console.error("Error adding project to database.", error)
        }
    }

    
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
        const projectIndex = projectDataState.findIndex(stateProject => stateProject.projectId === project?.projectId)
        const targetDateToString = new Date(data.projectTimeframe)
   
        const projectData = {
        inserted_at: new Date().toISOString(),
        user_id: !session ? "offlineUser" : session.user.id,
        projectId: data.projectId,
        projectScore: data.projectScore,
        projectPriorityScore: data.projectPriorityScore,
        projectGoal: data. projectGoal,
        projectMotivation: data.projectMotivation.trim(),
        projectStatus: data.projectStatus,
        projectDesc: data.projectDesc.trim(),
        projectComplexity: data. projectComplexity,
        projectExcitement: data.projectExcitement,
        projectTimeframe: targetDateToString,
        projectRank: 0,
        }
        calcProjectScore(projectData)
        const updatedProjectState = [...projectDataState];
        if (mode === "add") {
            projectData.projectId = uuidv4()
            updatedProjectState.push(projectData);
            addProjectToDB(projectData)
        } else if (mode === "edit" && projectIndex !== undefined) {
            updatedProjectState[projectIndex] = projectData;
            updatedProjectInDB(projectData)
        }
        setProjectDataState(updatedProjectState);
        reset();
        
        
    };

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" >
            {mode === "add" ? <PlusIcon /> : <PencilIcon />}
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" style={{ background }}>
            <DialogHeader>
            <DialogTitle>
                {mode === "add" ? "add a project" : "edit a project"}
            </DialogTitle>
            </DialogHeader>
            <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="projectGoal"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>project goal</FormLabel>
                                <Select onValueChange={(value) => {field.onChange(value); handleGoalChange(value); }} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Which goal are you working towards?" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {goalDataState && goalDataState.map((goal) => (
                                            <SelectItem value={goal.goalId} key={goal.goalId} >{goal.goalDesc}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                        <FormField
                        control={form.control}
                        name="projectDesc"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>what are you trying to accomplish in a month timeframe?</FormLabel>
                            <FormControl>
                                <Input placeholder="Get hired in the tech industry ASAP." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="projectMotivation"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>why this project?</FormLabel>
                            <FormDescription>optional</FormDescription>
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
                                    <FormLabel>target date</FormLabel>
                                    <FormControl>
                                        <DatePickerWithPresets 
                                            {...field} 
                                            initialValue={project === undefined ? undefined : new Date(project.projectTimeframe)}
                                            onChange={(date) => field.onChange(date)}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-wrap md:justify-between justify-start gap-6">
                            <FormField
                                control={form.control}
                                name="projectComplexity"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <Separator className="bg-primary" />
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
                                        <Separator className="bg-primary"/>
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
                                {mode === "add" ? <Button type="submit" disabled={!isValid}>add</Button> : <Button type="submit" disabled={!isValid}>save</Button>}
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </Form>
        </DialogContent>
        </Dialog>
    );
};

export default ProjectForm;
