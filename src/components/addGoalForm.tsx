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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { v4 as uuidv4 } from 'uuid';
import { GoalData } from "@/data/flatFakeData"
import { GradientPicker } from "./ui/GradientPicker"
import { useState } from "react"

const formSchema = z.object({
    goalId: z.string(),
    goalScore: z.number(),
    goalDesc: z.string().min(10, {
        message: "Goal must be at least 10 characters.",
    }).max(120, {
        message: "120 character limit."
    }),
    goalStatus: z.string(),
    goalMotivation: z.string(),
    goalComplexity: z.enum(["low", "medium", "high"], {
        required_error: "What are the complexity vibes of this goal?"
    }),
    goalExcitement: z.enum(["low", "medium", "high"], {
        required_error: "How pumped are you to achieve this goal?"
    }),
    goalColor: z.string(),
})

interface AddGoalFormProps {
    goalDataState: GoalData[],
    setGoalDataState: React.Dispatch<React.SetStateAction<GoalData[]>>,
    calcGoalScore: (goal: GoalData) => number,
}

export default function AddGoalForm({ goalDataState, setGoalDataState, calcGoalScore }: AddGoalFormProps ) {
    const [background, setBackground] = useState('#075985')
    

    const addGoal = (newGoal: GoalData) => {
        const updatedGoalState = [...goalDataState]
        updatedGoalState.push(newGoal)
        setGoalDataState(updatedGoalState)
        reset()
    }

  const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<z.infer<typeof formSchema>> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
        goalId: "",
        goalScore: 0,
        goalMotivation: "",
        goalStatus: "active",
        goalDesc: "",
        goalComplexity: "medium",
        goalExcitement: "medium",
        goalColor: "bg-[#115E59]"
    },
  })

    const { reset, formState } = form
    const { isValid } = formState

  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = (newGoal: GoalData) => {
    newGoal.goalId = uuidv4()
    newGoal.goalColor = background
    console.log(newGoal)
    calcGoalScore(newGoal)
    console.log(newGoal)
    addGoal(newGoal)
  }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary">add goal</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" style={{ background }}>
            <DialogHeader>
            <DialogTitle>add a goal</DialogTitle>
            <DialogDescription>
                Should be specific with metrics for success.
            </DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                    control={form.control}
                    name="goalDesc"
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
                    
                    <FormField
                        control={form.control}
                        name="goalComplexity"
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
                        name="goalExcitement"
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
                    <GradientPicker
                                    background={background}
                                    setBackground={setBackground}
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



