import { supabase } from "@/supabaseClient"

const deleteGoalFromDB = async (goalId: string) => {
    try {
    await supabase.from('tasks').delete().eq("taskGoal", goalId).throwOnError()
    console.log("Tasks deleted from database.")
    await supabase.from("projects").delete().eq('projectGoal', goalId).throwOnError()
    console.log("Projects removed from database.")
    await supabase.from('goals').delete().eq('goalId', goalId)
    console.log("Goal removed from database.")
    } catch (error) {
        console.error("Error removing goal from database.")
    } 
}

export default deleteGoalFromDB