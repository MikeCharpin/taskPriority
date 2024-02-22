    import { GoalData } from "@/lib/schema";    
    import React, { useState } from "react";
    import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import * as z from "zod";
    import { v4 as uuidv4 } from 'uuid';
    import { supabase } from '@/supabaseClient.ts'
    import { Button } from "@/components/ui/button";
    import {
        Form,
        FormControl,
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
    import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
    import { Textarea } from "@/components/ui/textarea";
    import { GradientPicker } from "./ui/GradientPicker";
    import { PlusIcon, PencilIcon } from "lucide-react";
    import { Session } from "@supabase/supabase-js";
import updateGoalInDB from "@/functions/updateGoalInDB";
import { Separator } from "./ui/separator";

    const formSchema = z.object({
        goalDesc: z.string().min(1, {
        message: "Goal must be at least 1 character.",
        }).max(255, {
        message: "255 character limit."
        }),
        goalMotivation: z.string(),
        goalComplexity: z.string().min(2,{ message: "how complex is the task?"}),
        goalExcitement: z.string().min(2,{ message: "how excited are you?"}),
        goalColor: z.string().min(2,{message: "what color would you like to asign to this goal?"}),
    });

    interface GoalFormProps {
        mode: "add" | "edit";
        goalDataState: GoalData[];
        setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>;
        calcGoalScore: (goal: GoalData) => number;
        goal: GoalData | undefined; 
        index: number | undefined; 
        session: Session | null,
    }

    const GoalForm: React.FC<GoalFormProps> = ({ 
        mode, 
        goalDataState, 
        setGoalDataState, 
        calcGoalScore, 
        goal, 
        index, 
        session,
     }) => {
    const [background, setBackground] = useState(goal?.goalColor || '#075985');

    const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        goalMotivation: goal?.goalMotivation || "",
        goalDesc: goal?.goalDesc || "",
        goalComplexity: goal?.goalComplexity || "medium",
        goalExcitement: goal?.goalExcitement || "medium",
        goalColor: goal?.goalColor || "bg-[#115E59]" ,
    },
    });

    const { reset, formState } = form;
    const { isValid } = formState;

    const addGoalToDB = async (newGoal: GoalData) => {
        try {
            const { data, error } = await supabase
                .from("goals")
                .insert<GoalData>([newGoal])
                .single()
            if (error) throw error
            console.log("New goal added to database", data)
        } catch(error: unknown) {
            console.error("Error adding goal to database.", error)
        }
    }

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (data) => {
        
        const goalData = {
            inserted_at: new Date().toISOString(),
            user_id: !session ? "offlineUser" : session.user.id,
            goalId: goal ? goal.goalId : uuidv4(),
            goalScore: goal ? goal.goalScore : 0,
            goalMotivation: data.goalMotivation.trim(),
            goalStatus: goal ? goal.goalStatus : "active",
            goalDesc: data.goalDesc.trim(),
            goalComplexity: data.goalComplexity,
            goalExcitement: data.goalExcitement,
            goalRank: goal ? goal.goalRank : goalDataState.length + 1,
            goalColor: background,
        }
            
        calcGoalScore(goalData);
        const updatedGoalState = [...goalDataState];

        if (mode === "edit") {
            updatedGoalState[index as number] = goalData;
            updateGoalInDB(goalData)
        } else if (mode === "add") {
            goalData.goalId = uuidv4()
            updatedGoalState.push(goalData);
            addGoalToDB(goalData)
        }
        setGoalDataState(updatedGoalState);
        reset();
        
    };

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">{mode === "add" ? <PlusIcon /> : <PencilIcon />}</Button>
        </DialogTrigger>
        <DialogContent className="" style={{ background }}>
            <DialogHeader>
            <DialogTitle>edit a goal</DialogTitle>
            <GradientPicker
                background={background}
                setBackground={setBackground}
            />
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="goalDesc"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>What are you trying to accomplish in a 6 month window?</FormLabel>
                        
                        <FormControl>
                            <Input placeholder="Get hired in the tech industry ASAP." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="goalMotivation"
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
                    
                    <div className="flex flex-wrap justify-start md:justify-between gap-6 ">
                        <FormField
                            control={form.control}
                            name="goalComplexity"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <Separator className="bg-primary"/>
                                <FormLabel className="text-2xl">complexity</FormLabel>
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
                            name="goalExcitement"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                <Separator className="bg-primary"/>
                                <FormLabel className="text-2xl">excitement</FormLabel>
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
    )
}

export default GoalForm